import type { ReactNode } from "react";

export type FaqItem = { q: string; a: ReactNode };

/**
 * Plain HTML question list. Uses <details> so every answer is in the page source
 * (crawlable, works without JavaScript). No FAQPage schema on purpose: Google only
 * shows FAQ rich results for government and health sites.
 */
export function Faq({ items, id }: { items: FaqItem[]; id?: string }) {
  return (
    <div id={id} className="divide-y divide-night/10 rounded-3xl border border-night/10 bg-white">
      {items.map((item) => (
        <details key={item.q} className="group p-5 sm:p-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-night">
            <h3 className="text-base sm:text-lg">{item.q}</h3>
            <span
              aria-hidden="true"
              className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ocean/10 text-ocean transition group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="mt-3 space-y-3 leading-relaxed text-night/70">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
