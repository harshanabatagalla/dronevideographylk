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
  title: "Buy DJI Drones in Sri Lanka",
  description:
    "Buy DJI drones in Sri Lanka, from the Mavic Mini to the Mavic 3 Cine, with batteries, propellers and tools. Rupee prices, standard and Fly More Combo kits.",
  path: "/shop",
});

export default function ShopPage() {
  const products = getProducts();
  return (
    <>
      <header className="relative overflow-hidden bg-cinema noise pb-16 pt-32">
        <div className="aurora" />
        <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
          <Breadcrumbs items={[{ name: "Shop", path: "/shop" }]} />
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            <Icon name="cart" size={14} /> Drone shop
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-white text-balance sm:text-5xl md:text-6xl">
            Buy a <span className="text-gradient">DJI drone</span> from working drone pilots
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
              className="inline-flex items-center gap-2 rounded-full bg-sunset px-6 py-3 text-sm font-semibold text-night transition hover:bg-amber-400"
            >
              <Icon name="whatsapp" size={18} /> Help me pick a drone
            </a>
          </div>
        </div>
      </header>

      <Section className="py-12">
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          <Note icon="shield" title="How payment works">
            Place your order and we confirm stock and delivery by WhatsApp or email. Then pay by bank
            transfer or cash on delivery.
          </Note>
          <Note icon="signal" title="About prices">
            Prices are in Sri Lankan rupees and follow the DJI distributor here. Some older models
            have no set price, so ask us and we will check.
          </Note>
          <Note icon="map-pin" title="Flying in Sri Lanka">
            Drones must be registered with the Civil Aviation Authority of Sri Lanka (CAASL) before you
            fly.{" "}
            <Link href={RULES_PATH} className="font-semibold text-ocean hover:underline">
              See the drone rules
            </Link>
            .
          </Note>
        </div>

        <ShopGrid products={products} />
        <AccessoryGrid />
      </Section>
    </>
  );
}

function Note({
  icon,
  title,
  children,
}: {
  icon: "shield" | "signal" | "map-pin";
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-night/10 bg-white p-5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-ocean/10 text-ocean">
        <Icon name={icon} size={18} />
      </span>
      <p className="mt-3 font-semibold text-night">{title}</p>
      <p className="mt-1 text-sm text-night/65">{children}</p>
    </div>
  );
}
