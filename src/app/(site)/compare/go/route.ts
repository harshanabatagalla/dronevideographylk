import type { NextRequest } from "next/server";
import { COMPARE_PATH, comparePath, getCompareDrone } from "@/lib/compare";

/**
 * The drone picker's form posts here when JavaScript is off. It sends the visitor
 * to the comparison page, or back to /compare when the choice is not valid.
 * The Location header is relative, so the redirect stays on the public host behind
 * Cloudflare instead of the server's own address.
 */
export function GET(request: NextRequest) {
  const a = request.nextUrl.searchParams.get("a") ?? "";
  const b = request.nextUrl.searchParams.get("b") ?? "";
  const ok = a !== b && getCompareDrone(a) && getCompareDrone(b);
  return new Response(null, {
    status: 303,
    headers: { Location: ok ? comparePath(a, b) : COMPARE_PATH, "Cache-Control": "no-store" },
  });
}
