import type { ReactNode } from "react";

export type FaqItem = { q: string; a: ReactNode };

/**
 * Plain HTML question list. Uses <details> so every answer is in the page source
 * (crawlable, works without JavaScript). No FAQPage schema on purpose: Google only
 * shows FAQ rich results for government and health sites.
 * Ruled rows, no box: a hairline between questions and a plus that turns into a cross.
 */
export function Faq({ items, id }: { items: FaqItem[]; id?: string }) {
  return (
    <div id={id} className="divide-y divide-night/15 border-y border-night/15">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-semibold text-night [&::-webkit-details-marker]:hidden">
            <h3 className="text-base sm:text-lg">{item.q}</h3>
            <span
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-2xl font-light leading-none text-ocean transition-transform duration-200 ease-out-strong group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="max-w-2xl space-y-3 pb-6 leading-relaxed text-night/75">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
