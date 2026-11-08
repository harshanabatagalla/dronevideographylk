import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadTs, fakeProcess } from './helpers/load-ts.mjs';

const nextHeaders = { cookies: async () => ({ get() {}, set() {}, delete() {} }) };
const auth = (env) => loadTs('src/lib/auth.ts', { mocks: { 'next/headers': nextHeaders }, process: fakeProcess({ env }) });

test('production without settings: the login is closed, "admin" does not work', () => {
  const a = auth({ NODE_ENV: 'production' });
  assert.equal(a.checkPassword('admin'), false);
  assert.equal(a.checkPassword(''), false);
  assert.equal(a.verifyToken('anything.at-all'), false);
  assert.throws(() => a.createToken(), /not configured/);
  assert.equal(a.usingDefaults(), true);
});

test('production with only one of the two settings is still closed', () => {
  assert.equal(auth({ NODE_ENV: 'production', ADMIN_PASSWORD: 'correct horse' }).checkPassword('correct horse'), false);
  const noPassword = auth({ NODE_ENV: 'production', AUTH_SECRET: 'long random secret value' });
  assert.equal(noPassword.checkPassword('admin'), false);
});

test('production with both settings: right password passes, wrong ones fail', () => {
  const a = auth({ NODE_ENV: 'production', ADMIN_PASSWORD: 'correct horse', AUTH_SECRET: 'long random secret value' });
  assert.equal(a.checkPassword('correct horse'), true);
  assert.equal(a.checkPassword('correct horsf'), false);
  assert.equal(a.checkPassword('correct'), false);
  assert.equal(a.checkPassword('correct horse and more'), false);
  assert.equal(a.checkPassword('admin'), false);
  assert.equal(a.usingDefaults(), false);
});

test('a session token works with its own settings and not with others', () => {
  const env = { NODE_ENV: 'production', ADMIN_PASSWORD: 'correct horse', AUTH_SECRET: 'long random secret value' };
  const token = auth(env).createToken();
  assert.equal(auth(env).verifyToken(token), true);
  assert.equal(auth(env).verifyToken(token + 'x'), false);
  assert.equal(auth(env).verifyToken(undefined), false);
  assert.equal(auth({ ...env, AUTH_SECRET: 'a different secret' }).verifyToken(token), false);
  assert.equal(auth({ ...env, ADMIN_PASSWORD: 'a new password' }).verifyToken(token), false, 'changing the password signs everyone out');
});

test('an expired token is refused', () => {
  const env = { NODE_ENV: 'production', ADMIN_PASSWORD: 'p', AUTH_SECRET: 's' };
  const a = auth(env);
  const realNow = Date.now;
  const token = a.createToken();
  Date.now = () => realNow() + 8 * 24 * 3600 * 1000;
  try {
    assert.equal(a.verifyToken(token), false);
  } finally {
    Date.now = realNow;
  }
});

test('development still works without settings, for local use only', () => {
  const a = auth({ NODE_ENV: 'development' });
  assert.equal(a.checkPassword('admin'), true);
  assert.equal(a.verifyToken(a.createToken()), true);
});
