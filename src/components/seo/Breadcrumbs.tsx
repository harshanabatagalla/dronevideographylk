import Link from "next/link";
import { JsonLd, breadcrumbJsonLd, type Crumb } from "@/lib/seo";

/** Visible breadcrumb trail plus matching BreadcrumbList schema. First crumb is always Home. */
export function Breadcrumbs({ items, light = true }: { items: Crumb[]; light?: boolean }) {
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  const base = light ? "text-white/60" : "text-night/55";
  const hover = light ? "hover:text-sunset" : "hover:text-ocean";
  const current = light ? "text-white/85" : "text-night/80";
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${base}`}>
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={current}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className={`tap transition ${hover}`}>
                      {c.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
