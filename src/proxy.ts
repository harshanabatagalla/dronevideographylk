import { NextResponse, type NextRequest } from "next/server";
import { adminBase } from "@/lib/admin-path";

// Kept in sync with SESSION_COOKIE in src/lib/auth.ts. Defined locally so this
// file doesn't import the cookie and crypto helpers.
const SESSION_COOKIE = "dvlk_admin";

/**
 * Admin area address and guard.
 *  - When ADMIN_PATH is set, /admin answers like any missing page and the admin
 *    pages are served from that address instead (rewritten to /admin inside).
 *  - Visitors without a session cookie are sent to the login page. This is only
 *    a cheap presence check; the admin layout, login page and server actions do
 *    the real verification.
 */
export function proxy(request: NextRequest) {
  const base = adminBase();
  const hidden = base !== "/admin";
  const { pathname } = request.nextUrl;

  if (hidden && (pathname === "/admin" || pathname.startsWith("/admin/"))) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }
  if (pathname !== base && !pathname.startsWith(`${base}/`)) return NextResponse.next();

  const sub = pathname.slice(base.length);
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  if (sub !== "/login" && !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = `${base}/login`;
    url.search = "";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (!hidden) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = `/admin${sub}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // The admin address comes from the environment, so every page request comes
  // through here. Static files and API routes never do.
  matcher: ["/((?!_next/|api/|media/|uploads/|favicon.ico|icon.svg|apple-icon.png|robots.txt|sitemap.xml).*)"],
};
