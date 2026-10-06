/**
 * Public address of the admin area.
 *
 * The admin pages live under /admin in the code. When ADMIN_PATH is set in the
 * server environment (for example "/studio-k7q2m9x4p1"), they are only reachable
 * there: proxy.ts rewrites that address to /admin and answers /admin itself with
 * a 404. The repository is public, so the address is only ever set in the
 * server's .env.production and never committed.
 */
const VALID = /^\/[a-z0-9-]{8,64}$/;

export function adminBase(): string {
  const value = process.env.ADMIN_PATH?.trim().toLowerCase();
  return value && VALID.test(value) && value !== "/admin" ? value : "/admin";
}

/** Public URL of an admin page: adminHref("/drones") gives "<address>/drones". */
export function adminHref(path = ""): string {
  return `${adminBase()}${path}`;
}

/** True when a path is inside the public admin address (used to vet redirects). */
export function isAdminHref(path: string): boolean {
  const base = adminBase();
  return path === base || path.startsWith(`${base}/`) || path.startsWith(`${base}?`);
}
