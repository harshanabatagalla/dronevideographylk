import { NextResponse, type NextRequest } from "next/server";

// Kept in sync with SESSION_COOKIE in src/lib/auth.ts. Defined locally so this
// edge-runtime middleware doesn't import the Node-only auth module.
const SESSION_COOKIE = "dvlk_admin";

/**
 * Guards the admin area. Does a cheap cookie-presence check here (edge runtime);
 * full cryptographic verification happens in the admin layout / server actions.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  if (!isLogin && !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isLogin && hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
