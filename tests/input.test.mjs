import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadTs } from './helpers/load-ts.mjs';

const { text, oneLine, isEmail, isRecord, readJson } = loadTs('src/lib/input.ts');
const { rateLimited, ipFromHeaders } = loadTs('src/lib/rate-limit.ts');
const { formatPlannerDate, localDateInput } = loadTs('src/lib/dates.ts');

test('text() only accepts strings, clips them and removes control characters', () => {
  assert.equal(text(123, 10), '');
  assert.equal(text(null, 10), '');
  assert.equal(text({ a: 1 }, 10), '');
  assert.equal(text('  hello  ', 10), 'hello');
  assert.equal(text('abcdef', 3), 'abc');
  assert.equal(text('a\u0000b\u001bc', 10), 'abc');
  assert.equal(text('line one\nline two', 50), 'line one\nline two');
});

test('oneLine() never keeps a line break, so it cannot add an email header', () => {
  const attack = oneLine('Sam\r\nBcc: victim@example.com', 100);
  assert.ok(!/[\r\n]/.test(attack));
  assert.equal(attack, 'Sam Bcc: victim@example.com');
  assert.equal(oneLine('a    b\n\nc', 100), 'a b c');
  assert.equal(oneLine('x'.repeat(500), 120).length, 120);
});

test('isEmail() and isRecord()', () => {
  assert.equal(isEmail('a@b.co'), true);
  assert.equal(isEmail('not an email'), false);
  assert.equal(isEmail('a@b'), false);
  assert.equal(isEmail(`${'a'.repeat(250)}@b.co`), false);
  assert.equal(isRecord({}), true);
  assert.equal(isRecord(null), false);
  assert.equal(isRecord([]), false);
  assert.equal(isRecord('x'), false);
});

test('readJson() refuses bad and oversized bodies without throwing', async () => {
  const post = (body, headers = {}) => new Request('http://localhost/api', { method: 'POST', body, headers });
  assert.deepEqual(await readJson(post('{"a":1}'), 100), { ok: true, data: { a: 1 } });
  assert.deepEqual(await readJson(post('null'), 100), { ok: true, data: null });
  assert.deepEqual(await readJson(post('not json'), 100), { ok: false, status: 400 });
  assert.deepEqual(await readJson(post(''), 100), { ok: false, status: 400 });
  assert.deepEqual(await readJson(post('{"a":"' + 'x'.repeat(200) + '"}'), 100), { ok: false, status: 413 });
  assert.deepEqual(await readJson(post('{}', { 'content-length': '999999' }), 100), { ok: false, status: 413 });
});

test('rateLimited() allows the limit, blocks after it and resets after the window', () => {
  const t = 1_000_000;
  for (let i = 0; i < 3; i++) assert.equal(rateLimited('k1', 3, 1000, t), false);
  assert.equal(rateLimited('k1', 3, 1000, t), true);
  assert.equal(rateLimited('other', 3, 1000, t), false, 'another key is not affected');
  assert.equal(rateLimited('k1', 3, 1000, t + 1001), false, 'new window');
});

test('ipFromHeaders() trusts only the last forwarded address', () => {
  const h = (o) => new Headers(o);
  assert.equal(ipFromHeaders(h({ 'x-forwarded-for': '6.6.6.6, 1.2.3.4' })), '1.2.3.4');
  assert.equal(ipFromHeaders(h({ 'x-forwarded-for': '1.2.3.4' })), '1.2.3.4');
  assert.equal(ipFromHeaders(h({ 'x-real-ip': '9.9.9.9' })), '9.9.9.9');
  assert.equal(ipFromHeaders(h({})), 'unknown');
});

test('formatPlannerDate() shows the chosen day in every time zone', () => {
  const zone = process.env.TZ;
  for (const tz of ['America/New_York', 'Pacific/Honolulu', 'Asia/Colombo', 'UTC']) {
    process.env.TZ = tz;
    assert.equal(formatPlannerDate('2026-08-12'), '12 August 2026', tz);
  }
  process.env.TZ = zone;
  assert.equal(formatPlannerDate(''), null);
  assert.equal(formatPlannerDate('2026-02-31'), null);
  assert.equal(formatPlannerDate('12/08/2026'), null);
});

test('localDateInput() uses the local calendar day, not the UTC day', () => {
  assert.equal(localDateInput(new Date(2026, 7, 12, 23, 30)), '2026-08-12');
  assert.equal(localDateInput(new Date(2026, 0, 5, 0, 10)), '2026-01-05');
});
