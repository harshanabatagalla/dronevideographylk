/**
 * Helpers for reading untrusted request data. None of them throw: a value of the
 * wrong type becomes an empty string, so a bad request gets a clean 4xx answer
 * instead of a 500.
 */

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Everything below space except tab and newline, plus DEL. Carriage returns are
// removed on purpose, so a value can never add a line to an email header.
const CONTROL = /[\u0000-\u0008\u000b-\u001f\u007f]/g;

/** A string of at most `max` characters, trimmed, without control characters. Newlines are kept. */
export function text(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(CONTROL, "").trim().slice(0, max);
}

/** Like text(), but on one line. Use it for names, subjects and anything that goes in an email header. */
export function oneLine(value: unknown, max: number): string {
  return text(value, max * 2).replace(/\s+/g, " ").trim().slice(0, max);
}

export function isEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export type JsonResult = { ok: true; data: unknown } | { ok: false; status: 400 | 413 };

/** Reads a JSON request body, refusing anything larger than `maxBytes`. */
export async function readJson(request: Request, maxBytes: number): Promise<JsonResult> {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > maxBytes) return { ok: false, status: 413 };
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return { ok: false, status: 400 };
  }
  if (raw.length > maxBytes) return { ok: false, status: 413 };
  try {
    return { ok: true, data: JSON.parse(raw) };
  } catch {
    return { ok: false, status: 400 };
  }
}
