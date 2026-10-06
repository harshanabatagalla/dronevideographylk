/**
 * Limits failed admin sign-ins per client IP: after 5 wrong passwords within 15
 * minutes, that IP is refused until the window has passed. Kept in memory, which
 * is enough for the single server process; a restart clears it.
 */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;

const failures = new Map<string, { count: number; first: number }>();

function current(ip: string, now: number) {
  const entry = failures.get(ip);
  if (entry && now - entry.first > WINDOW_MS) {
    failures.delete(ip);
    return undefined;
  }
  return entry;
}

export function isLockedOut(ip: string, now = Date.now()): boolean {
  return (current(ip, now)?.count ?? 0) >= MAX_FAILURES;
}

export function recordFailure(ip: string, now = Date.now()): void {
  const entry = current(ip, now);
  if (entry) entry.count += 1;
  else failures.set(ip, { count: 1, first: now });
  // Keep memory bounded if many different IPs try.
  if (failures.size > 5000) {
    for (const [key, value] of failures) if (now - value.first > WINDOW_MS) failures.delete(key);
  }
}

export function clearFailures(ip: string): void {
  failures.delete(ip);
}
