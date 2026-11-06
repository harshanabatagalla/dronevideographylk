import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import type { Crumb } from "@/lib/seo";

/** Dark page header used by inner pages: breadcrumbs, the page's only H1, and an intro. */
export function PageHero({
  crumbs,
  title,
  intro,
  children,
}: {
  crumbs: Crumb[];
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="bg-night pb-14 pt-28 sm:pb-16 sm:pt-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.1] text-white text-balance sm:text-5xl">
          {title}
        </h1>
        {intro && <div className="mt-5 max-w-2xl space-y-3 text-lg text-white/75">{intro}</div>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}
