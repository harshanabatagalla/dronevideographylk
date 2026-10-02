import type { ReactNode } from "react";

/**
 * Wraps email links in Cloudflare's email_off markers. Without them Cloudflare
 * rewrites every address in the page and injects a render-blocking decoder
 * script, which delays first paint on every page that shows the footer. The
 * address is already public in the page's structured data, so the rewrite
 * gave no real protection.
 */
export function CloudflareEmailOff({ children }: { children: ReactNode }) {
  return (
    <>
      <span hidden dangerouslySetInnerHTML={{ __html: "<!--email_off-->" }} />
      {children}
      <span hidden dangerouslySetInnerHTML={{ __html: "<!--/email_off-->" }} />
    </>
  );
}
