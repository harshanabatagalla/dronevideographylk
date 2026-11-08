import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/**
 * Minimal, dependency-free admin authentication.
 *  - A single admin password (env `ADMIN_PASSWORD`) gates the dashboard.
 *  - On login we set an HMAC-signed session cookie (signed with `AUTH_SECRET`).
 *  - The proxy does a cheap cookie-presence check; this module does the real
 *    cryptographic verification inside server components / actions.
 *
 * In production the login is closed when either value is missing. The built in
 * development values below are never used there, so a server started without
 * its settings cannot be opened with the password "admin".
 */

export const SESSION_COOKIE = "dvlk_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret(): string | null {
  if (process.env.AUTH_SECRET) return process.env.AUTH_SECRET;
  return process.env.NODE_ENV === "production" ? null : "dev-insecure-secret-change-me";
}

function adminPassword(): string | null {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  return process.env.NODE_ENV === "production" ? null : "admin";
}

/**
 * The key sessions are signed with: the secret plus the current password, so
 * changing the password signs everyone out. Null when either is missing.
 */
function signingKey(): string | null {
  const s = secret();
  const p = adminPassword();
  return s && p ? `${s}\u0000${p}` : null;
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

function sign(payload: string, key: string): string {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

export function createToken(): string {
  const key = signingKey();
  if (!key) throw new Error("Admin login is not configured (ADMIN_PASSWORD and AUTH_SECRET are required).");
  const payload = b64url(
    JSON.stringify({ sub: "admin", exp: Math.floor(Date.now() / 1000) + MAX_AGE }),
  );
  return `${payload}.${sign(payload, key)}`;
}

export function verifyToken(token: string | undefined): boolean {
  const key = signingKey();
  if (!key || !token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = sign(payload, key);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof data.exp === "number" && data.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function checkPassword(password: string): boolean {
  const expected = adminPassword();
  if (!expected || !signingKey()) return false;
  // Compare fixed length digests, so the time taken does not reveal the password length.
  const a = createHash("sha256").update(password).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(SESSION_COOKIE)?.value);
}

export async function startSession(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, createToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/** True when ADMIN_PASSWORD or AUTH_SECRET is missing (shown as a warning; the login is closed in production). */
export function usingDefaults(): boolean {
  return !process.env.AUTH_SECRET || !process.env.ADMIN_PASSWORD;
}
