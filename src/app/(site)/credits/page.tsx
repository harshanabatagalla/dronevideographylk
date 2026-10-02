import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PHOTO_CREDITS } from "@/lib/photo-credits";
import { getProduct } from "@/lib/shop";
import { getDrone } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Photo Credits",
  description:
    "Credits for the drone photos used on this site. Each one is used under its Creative Commons licence.",
  path: "/credits",
});

/** Where a credited photo is shown: its shop page, or our drone page. Null if it is no longer used. */
function usedOn(slug: string): { name: string; href: string } | null {
  const product = getProduct(slug);
  if (product) return { name: product.name, href: `/shop/${slug}` };
  const drone = getDrone(slug);
  if (drone) return { name: drone.name, href: `/fleet/${slug}` };
  return null;
}

export default function CreditsPage() {
  const rows = Object.entries(PHOTO_CREDITS)
    .map(([slug, c]) => ({ slug, c, page: usedOn(slug) }))
    .filter((r) => r.page !== null);
  return (
    <>
      <div className="bg-skyline pb-10 pt-32">
        <Section>
          <h1 className="font-display text-4xl font-semibold text-white">Photo credits</h1>
          <p className="mt-2 max-w-2xl text-white/70">
            The aerial photos on this site were taken by our own team. The drone product photos in the
            shop were taken by the photographers below and are used under their Creative Commons
            licences.
          </p>
        </Section>
      </div>

      <Section className="py-12">
        <ul className="divide-y divide-night/10 rounded-3xl border border-night/10 bg-white">
          {rows.map(({ slug, c, page }) => {
            return (
              <li key={slug} className="flex flex-wrap items-baseline justify-between gap-2 p-5">
                <span>
                  <Link href={page!.href} className="font-semibold text-night hover:text-ocean">
                    {page!.name}
                  </Link>
                  <span className="ml-2 text-sm text-night/65">by {c.author}</span>
                </span>
                <span className="flex gap-4 text-sm">
                  <a href={c.source} target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                    Original photo
                  </a>
                  <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer" className="text-night/65 hover:underline">
                    {c.license}
                  </a>
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 max-w-3xl text-sm text-night/65">
          Photos marked share alike may be reused under the same licence. We crop and resize them for
          the page, and nothing else. We do not use DJI&apos;s own product photos, because those are
          copyrighted. DJI, Mavic, Mini, Air and Avata are trademarks of their owner. This shop is not
          run by DJI.
        </p>
      </Section>
    </>
  );
}
