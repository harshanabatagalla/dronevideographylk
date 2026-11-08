import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { ShopGrid } from "@/components/shop/ShopGrid";
import { AccessoryGrid } from "@/components/shop/AccessoryGrid";
import { getProducts } from "@/lib/shop";
import { whatsappHref } from "@/lib/site";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RULES_PATH } from "@/lib/drone-rules";

export const metadata = pageMetadata({
  title: "DJI Drone Prices in Sri Lanka",
  description:
    "DJI drone prices in Sri Lanka, from the Mavic Mini to the Mavic 3 Cine, with batteries, propellers and tools. Rupee prices, standard and Fly More Combo kits.",
  path: "/shop",
});

export default function ShopPage() {
  const products = getProducts();
  return (
    <>
      <header className="bg-night pb-16 pt-32">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <Breadcrumbs items={[{ name: "Shop", path: "/shop" }]} />
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.1] text-white text-balance sm:text-5xl md:text-6xl">
            Buy a DJI drone from working drone pilots
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/70">
            DJI drones from the Mavic Mini to the Mavic 3 Cine, with spare batteries, propellers and
            tools. Each drone comes as a standard kit or a Fly More Combo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappHref("Hi! Can you help me choose a DJI drone to buy?")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <Icon name="whatsapp" size={18} /> Help me pick a drone
            </a>
          </div>
        </div>
      </header>

      <Section className="py-12">
        <div className="mb-14 grid gap-8 md:grid-cols-3">
          <Note title="How payment works">
            Place your order and we confirm stock and delivery by WhatsApp or email. Then pay by bank
            transfer or cash on delivery.
          </Note>
          <Note title="About prices">
            Prices are in Sri Lankan rupees and follow the DJI distributor here. Some older models
            have no set price, so ask us and we will check.
          </Note>
          <Note title="Flying in Sri Lanka">
            Drones must be registered with the Civil Aviation Authority of Sri Lanka (CAASL) before you
            fly.{" "}
            <Link href={RULES_PATH} className="font-semibold text-ocean hover:underline">
              See the drone rules
            </Link>
            .
          </Note>
        </div>

        <h2 className="mb-6 font-display text-2xl font-medium text-night sm:text-3xl">
          DJI drones and prices
        </h2>
        <ShopGrid products={products} />
        <AccessoryGrid />
      </Section>
    </>
  );
}

function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t-2 border-night pt-4">
      <p className="font-semibold text-night">{title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-night/70">{children}</p>
    </div>
  );
}
