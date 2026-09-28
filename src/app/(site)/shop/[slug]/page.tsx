import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ProductVisual } from "@/components/shop/ProductVisual";
import { PhotoCredit } from "@/components/shop/PhotoCredit";
import { VariantPicker } from "@/components/shop/VariantPicker";
import { getProduct, getProducts, lowestPrice, SERIES, windLabel } from "@/lib/shop";
import { site } from "@/lib/site";
import { fitDescription, pageMetadata, JsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RULES_PATH } from "@/lib/drone-rules";

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return pageMetadata({ title: "Drone not found", path: `/shop/${slug}` });
  return pageMetadata({
    title: `${p.name} Price in Sri Lanka`,
    description: fitDescription([
      `${p.name} price in Sri Lanka.`,
      p.headline,
      "See the kit, wind handling and common problems before you buy.",
      `Wind resistance ${windLabel(p)}.`,
    ]),
    path: `/shop/${p.slug}`,
  });
}

export default async function ShopProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.purpose,
    brand: { "@type": "Brand", name: "DJI" },
    ...(lowestPrice(p)
      ? {
          offers: {
            "@type": "Offer",
            url: `${site.url}/shop/${p.slug}`,
            priceCurrency: "LKR",
            price: lowestPrice(p),
            availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            itemCondition: "https://schema.org/NewCondition",
          },
        }
      : {}),
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <div className="bg-skyline pb-8 pt-28">
        <Section>
          <Breadcrumbs
            items={[
              { name: "Shop", path: "/shop" },
              { name: p.name, path: `/shop/${p.slug}` },
            ]}
          />
        </Section>
      </div>

      <Section className="py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="cinematic-frame relative aspect-[4/3] overflow-hidden rounded-3xl">
              <ProductVisual product={p} priority sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <PhotoCredit slug={p.slug} className="mt-2" />
            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.specs.map((s) => (
                <div key={s.label} className="rounded-2xl border border-night/10 bg-white p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-night/45">{s.label}</dt>
                  <dd className="mt-1 text-sm text-night/80">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ocean">
              {SERIES.find((s) => s.key === p.series)?.label} · {p.released}
              {p.discontinued && " · No longer made"}
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-night sm:text-5xl">{p.name}</h1>
            <p className="mt-3 text-lg text-night/70">{p.headline}</p>

            <VariantPicker product={p} />

            <Block icon="mountain" title="What it is good for">
              <p>{p.purpose}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.bestFor.map((tag) => (
                  <span key={tag} className="rounded-full bg-sand px-3 py-1 text-sm font-medium text-night/70">
                    {tag}
                  </span>
                ))}
              </div>
            </Block>

            <Block icon="wind" title="How it handles wind">
              <p className="font-semibold text-night">{windLabel(p)}</p>
              <p className="mt-1">{p.wind.note}</p>
            </Block>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <ListCard icon="check" tone="good" title={`Why buy the ${p.name}`} items={p.benefits} />
          <ListCard icon="shield" tone="warn" title="Common problems" items={p.issues} />
        </div>

        <div className="mt-6 rounded-3xl border border-night/10 bg-white p-6">
          <h2 className="font-display text-xl font-semibold text-night">Good to know</h2>
          <ul className="mt-3 space-y-2 text-night/70">
            {p.goodToKnow.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="text-sunset">•</span>
                {t}
              </li>
            ))}
            <li className="flex gap-2">
              <span className="text-sunset">•</span>
              <span>
                Register your drone with the Civil Aviation Authority of Sri Lanka (CAASL) before flying.{" "}
                <Link href={RULES_PATH} className="font-semibold text-ocean hover:underline">
                  Read the Sri Lanka drone rules
                </Link>
                .
              </span>
            </li>
          </ul>
        </div>
      </Section>
    </>
  );
}

function Block({ icon, title, children }: { icon: IconName; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-night">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-ocean/10 text-ocean">
          <Icon name={icon} size={18} />
        </span>
        {title}
      </h2>
      <div className="mt-2 text-night/70">{children}</div>
    </section>
  );
}

function ListCard({
  icon,
  tone,
  title,
  items,
}: {
  icon: IconName;
  tone: "good" | "warn";
  title: string;
  items: string[];
}) {
  const badge = tone === "good" ? "bg-teal/15 text-teal" : "bg-coral/15 text-coral";
  return (
    <div className="rounded-3xl border border-night/10 bg-white p-6">
      <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-night">
        <span className={`grid h-8 w-8 place-items-center rounded-lg ${badge}`}>
          <Icon name={icon} size={18} />
        </span>
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5 text-night/75">
        {items.map((t) => (
          <li key={t} className="flex gap-2">
            <span className={tone === "good" ? "text-teal" : "text-coral"}>•</span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
