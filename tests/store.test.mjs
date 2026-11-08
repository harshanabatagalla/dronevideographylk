import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadTs, fakeProcess } from './helpers/load-ts.mjs';

// The real data layer, run against a temporary folder instead of the live .data folder.
function freshStore() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dvlk-store-'));
  const mocks = {
    './content': { drones: [], footage: [], testimonials: [] },
    './site': { site: { whatsapp: '+94000000000', whatsappMessage: 'Hi', email: 'a@b.co', phone: '+94 0', address: 'Colombo', socials: {} } },
    './supabase': { supabaseConfigured: () => false },
  };
  const db = loadTs('src/lib/db.ts', { mocks, process: fakeProcess({ cwd: dir }) });
  const file = path.join(dir, '.data', 'store.json');
  return { db, dir, file, read: () => JSON.parse(fs.readFileSync(file, 'utf8')) };
}

const enquiry = (n) => ({ name: `Person ${n}`, email: 'p@example.com', country: 'LK', dates: '', locations: '', shootType: '', message: `message ${n}` });

test('a store that does not exist yet is created', async () => {
  const s = freshStore();
  assert.equal((await s.db.getEnquiries()).length, 0);
  assert.ok(fs.existsSync(s.file));
});

test('many requests at the same moment all keep their data and the file stays valid', async () => {
  const s = freshStore();
  await Promise.all(Array.from({ length: 60 }, (_, i) => s.db.addEnquiry(enquiry(i))));
  assert.equal(s.read().enquiries.length, 60);
  const orders = await Promise.all(
    Array.from({ length: 20 }, () => s.db.addOrder({ items: [], total: 0, currency: 'LKR', customer: {}, payment: 'bank-transfer', notes: '' })),
  );
  assert.equal(new Set(orders.map((o) => o.ref)).size, 20, 'every order has its own reference');
  assert.equal(s.read().orders.length, 20);
  assert.equal(s.read().enquiries.length, 60, 'orders did not remove enquiries');
});

test('saves leave no temporary files behind', async () => {
  const s = freshStore();
  await Promise.all([s.db.addEnquiry(enquiry(1)), s.db.addEnquiry(enquiry(2))]);
  const leftovers = fs.readdirSync(path.dirname(s.file)).filter((f) => f.endsWith('.tmp'));
  assert.deepEqual(leftovers, []);
});

test('an unreadable store is never replaced with sample data', async () => {
  const s = freshStore();
  fs.mkdirSync(path.dirname(s.file), { recursive: true });
  const broken = '{"enquiries":[{"name":"A real customer"';
  fs.writeFileSync(s.file, broken);
  await assert.rejects(s.db.addEnquiry(enquiry(1)), /not valid JSON/);
  await assert.rejects(s.db.getOrders(), /not valid JSON/);
  assert.equal(fs.readFileSync(s.file, 'utf8'), broken, 'the file was not touched');
  const copies = fs.readdirSync(path.dirname(s.file)).filter((f) => f.includes('.unreadable-'));
  assert.equal(copies.length > 0, true, 'a copy was kept for recovery');
});

test('a failed save does not leave the lost change in memory', async () => {
  const s = freshStore();
  await s.db.addEnquiry(enquiry(1));
  // Make the next save fail by putting a folder where the temporary file would go.
  const tmp = `${s.file}.${process.pid}.tmp`;
  fs.mkdirSync(tmp);
  await assert.rejects(s.db.addEnquiry(enquiry(2)));
  fs.rmdirSync(tmp);
  assert.equal((await s.db.getEnquiries()).length, 1, 'only the saved enquiry is visible');
  await s.db.addEnquiry(enquiry(3));
  assert.equal(s.read().enquiries.length, 2);
});

test('one backup per day is kept', async () => {
  const s = freshStore();
  await s.db.addEnquiry(enquiry(1));
  await s.db.addEnquiry(enquiry(2));
  const backups = fs.readdirSync(path.join(path.dirname(s.file), 'backups'));
  assert.equal(backups.length, 1);
  assert.match(backups[0], /^store-\d{4}-\d{2}-\d{2}\.json$/);
});

test('old backups are removed after 14 days', async () => {
  const s = freshStore();
  await s.db.addEnquiry(enquiry(1));
  const dir = path.join(path.dirname(s.file), 'backups');
  for (let d = 1; d <= 20; d++) fs.writeFileSync(path.join(dir, `store-2020-01-${String(d).padStart(2, '0')}.json`), '{}');
  fs.unlinkSync(path.join(dir, fs.readdirSync(dir).find((f) => !f.startsWith('store-2020'))));
  await s.db.addEnquiry(enquiry(2)); // makes today's backup and prunes
  assert.equal(fs.readdirSync(dir).length, 14);
});
