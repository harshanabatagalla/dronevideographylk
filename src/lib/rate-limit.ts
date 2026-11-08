/**
 * A simple request limiter for the public forms. Counts requests per key in a
 * fixed window, in memory. That is enough for the single server process; a
 * restart clears the counts.
 */
const hits = new Map<string, { count: number; reset: number }>();

/** True when `key` has used up its `limit` requests in the current window. Every call counts as a request. */
export function rateLimited(key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  const entry = hits.get(key);
  if (!entry || now >= entry.reset) {
    hits.set(key, { count: 1, reset: now + windowMs });
    // Keep memory bounded if many different visitors send requests.
    if (hits.size > 5000) for (const [k, v] of hits) if (now >= v.reset) hits.delete(k);
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}

/**
 * The visitor's IP address. nginx appends the real address last to X-Forwarded-For;
 * earlier entries can be forged by the visitor, so only the last one is used.
 */
export function ipFromHeaders(headers: Headers): string {
  const last = headers.get("x-forwarded-for")?.split(",").pop()?.trim();
  return last || headers.get("x-real-ip")?.trim() || "unknown";
}
