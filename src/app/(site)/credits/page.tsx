import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PHOTO_CREDITS } from "@/lib/photo-credits";
import { getProduct } from "@/lib/shop";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Photo Credits",
  description:
    "Credits for the drone photos used on this site. Each one is used under its Creative Commons licence.",
  path: "/credits",
});

export default function CreditsPage() {
  const rows = Object.entries(PHOTO_CREDITS);
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
          {rows.map(([slug, c]) => {
            const product = getProduct(slug);
            return (
              <li key={slug} className="flex flex-wrap items-baseline justify-between gap-2 p-5">
                <span>
                  <Link href={`/shop/${slug}`} className="font-semibold text-night hover:text-ocean">
                    {product?.name ?? slug}
                  </Link>
                  <span className="ml-2 text-sm text-night/60">by {c.author}</span>
                </span>
                <span className="flex gap-4 text-sm">
                  <a href={c.source} target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                    Original photo
                  </a>
                  <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer" className="text-night/60 hover:underline">
                    {c.license}
                  </a>
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 max-w-3xl text-sm text-night/60">
          Photos marked share alike may be reused under the same licence. We crop and resize them for
          the page, and nothing else. We do not use DJI&apos;s own product photos, because those are
          copyrighted. DJI, Mavic, Mini, Air and Avata are trademarks of their owner. This shop is not
          run by DJI.
        </p>
      </Section>
    </>
  );
}
