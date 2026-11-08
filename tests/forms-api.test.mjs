import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadTs } from './helpers/load-ts.mjs';

const respond = { NextResponse: { json: (body, init = {}) => ({ status: init.status ?? 200, body }) } };

function setup() {
  const saved = { enquiries: [], orders: [], emails: [] };
  const catalog = {
    'a:standard': { sku: 'a:standard', name: 'Drone A', sub: 'Standard', lkr: 1000 },
    'b:standard': { sku: 'b:standard', name: 'Drone B', sub: 'Standard' }, // no price yet
  };
  const mocks = {
    'next/server': respond,
    '@/lib/db': {
      addEnquiry: async (e) => { saved.enquiries.push(e); },
      addOrder: async (o) => { const order = { ...o, ref: 'DV-TEST01' }; saved.orders.push(order); return order; },
    },
    '@/lib/email': { sendNotification: async (m) => { saved.emails.push(m); return true; } },
    '@/lib/shop': { getSku: (sku) => catalog[sku] },
  };
  return {
    saved,
    contact: loadTs('src/app/api/contact/route.ts', { mocks }).POST,
    orders: loadTs('src/app/api/orders/route.ts', { mocks }).POST,
  };
}

let ipCounter = 0;
const post = (body, ip = `10.0.0.${++ipCounter}`) =>
  new Request('http://localhost/api', {
    method: 'POST',
    body: typeof body === 'string' ? body : JSON.stringify(body),
    headers: { 'x-forwarded-for': ip },
  });

const goodContact = { name: 'Sam Traveller', email: 'sam@example.com', message: 'I would like a quote please', country: 'Canada' };
const goodOrder = (items) => ({
  items, name: 'Sam Traveller', email: 'sam@example.com', phone: '+94 77 123 4567',
  address: '12 Beach Road', city: 'Galle', payment: 'cash-on-delivery',
});

test('contact: odd input gets a clean error, never a 500', async () => {
  const { contact } = setup();
  assert.equal((await contact(post('null'))).status, 400);
  assert.equal((await contact(post('[]'))).status, 400);
  assert.equal((await contact(post('"text"'))).status, 400);
  assert.equal((await contact(post('{not json'))).status, 400);
  assert.equal((await contact(post({ ...goodContact, name: 123 }))).status, 422);
  assert.equal((await contact(post({ ...goodContact, email: { a: 1 } }))).status, 422);
  assert.equal((await contact(post({ ...goodContact, message: ['x'] }))).status, 422);
  assert.equal((await contact(post({ ...goodContact, email: 'nope' }))).status, 422);
});

test('contact: a valid enquiry is stored and emailed', async () => {
  const { contact, saved } = setup();
  const res = await contact(post(goodContact));
  assert.deepEqual(res, { status: 200, body: { ok: true } });
  assert.equal(saved.enquiries.length, 1);
  assert.equal(saved.enquiries[0].email, 'sam@example.com');
  assert.equal(saved.emails.length, 1);
  assert.equal(saved.emails[0].replyTo, 'sam@example.com');
});

test('contact: long fields are cut to a safe size and the subject stays on one line', async () => {
  const { contact, saved } = setup();
  await contact(post({ ...goodContact, name: 'Sam\r\nBcc: victim@example.com', message: 'm'.repeat(10_000), locations: 'l'.repeat(5000) }));
  assert.equal(saved.enquiries[0].message.length, 4000);
  assert.equal(saved.enquiries[0].locations.length, 300);
  assert.ok(!/[\r\n]/.test(saved.emails[0].subject));
});

test('contact: a body over the size limit is refused', async () => {
  const { contact, saved } = setup();
  const res = await contact(post({ ...goodContact, message: 'x'.repeat(30_000) }));
  assert.equal(res.status, 413);
  assert.equal(saved.enquiries.length, 0);
});

test('contact: the hidden field marks a bot, which is ignored quietly', async () => {
  const { contact, saved } = setup();
  const res = await contact(post({ ...goodContact, company: 'Spam Ltd' }));
  assert.equal(res.status, 200);
  assert.equal(saved.enquiries.length, 0);
  assert.equal(saved.emails.length, 0);
});

test('contact: one visitor can send 6 messages an hour, then is asked to wait', async () => {
  const { contact, saved } = setup();
  const ip = '203.0.113.7';
  for (let i = 0; i < 6; i++) assert.equal((await contact(post(goodContact, ip))).status, 200);
  assert.equal((await contact(post(goodContact, ip))).status, 429);
  assert.equal(saved.enquiries.length, 6);
  assert.equal((await contact(post(goodContact, '203.0.113.8'))).status, 200, 'another visitor is not blocked');
});

test('orders: odd input gets a clean error, never a 500', async () => {
  const { orders } = setup();
  assert.equal((await orders(post('null'))).status, 400);
  assert.equal((await orders(post('{bad'))).status, 400);
  assert.equal((await orders(post(goodOrder([null])))).status, 422);
  assert.equal((await orders(post(goodOrder(['a:standard'])))).status, 422);
  assert.equal((await orders(post({ ...goodOrder([{ sku: 'a:standard', qty: 1 }]), name: 5 }))).status, 422);
  assert.equal((await orders(post(goodOrder([])))).status, 422);
});

test('orders: an item that is not valid stops the order instead of being dropped', async () => {
  const { orders, saved } = setup();
  const unknown = await orders(post(goodOrder([{ sku: 'a:standard', qty: 1 }, { sku: 'nope:standard', qty: 1 }])));
  assert.equal(unknown.status, 422);
  assert.equal((await orders(post(goodOrder([{ sku: 'a:standard', qty: 0 }])))).status, 422);
  assert.equal((await orders(post(goodOrder([{ sku: 'a:standard', qty: 1.5 }])))).status, 422);
  assert.equal((await orders(post(goodOrder([{ sku: 'a:standard', qty: 11 }])))).status, 422);
  assert.equal(saved.orders.length, 0);
});

test('orders: an item with no price is explained, not hidden', async () => {
  const { orders } = setup();
  const res = await orders(post(goodOrder([{ sku: 'b:standard', qty: 1 }])));
  assert.equal(res.status, 409);
  assert.match(res.body.error, /Drone B/);
});

test('orders: the same item twice is added together and the total comes from the server price', async () => {
  const { orders, saved } = setup();
  const res = await orders(post({ ...goodOrder([{ sku: 'a:standard', qty: 2, price: 1 }, { sku: 'a:standard', qty: 3 }]), total: 1 }));
  assert.equal(res.status, 200);
  assert.equal(res.body.total, 5000);
  assert.equal(saved.orders[0].items.length, 1);
  assert.equal(saved.orders[0].items[0].qty, 5);
  assert.equal(saved.orders[0].items[0].price, 1000);
  const tooMany = await orders(post(goodOrder([{ sku: 'a:standard', qty: 6 }, { sku: 'a:standard', qty: 6 }])));
  assert.equal(tooMany.status, 422);
});

test('orders: the subject stays on one line and the visitor is rate limited', async () => {
  const { orders, saved } = setup();
  const ip = '198.51.100.9';
  await orders(post({ ...goodOrder([{ sku: 'a:standard', qty: 1 }]), name: 'Sam\r\nBcc: victim@example.com' }, ip));
  assert.ok(!/[\r\n]/.test(saved.emails[0].subject));
  for (let i = 0; i < 5; i++) await orders(post(goodOrder([{ sku: 'a:standard', qty: 1 }]), ip));
  assert.equal((await orders(post(goodOrder([{ sku: 'a:standard', qty: 1 }]), ip))).status, 429);
});
