import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { DroneShowcase } from "@/components/fleet/DroneShowcase";
import { getDrones, getSettings } from "@/lib/db";
import { ShootPlanner } from "@/components/booking/ShootPlanner";
import { whatsappHref } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata = pageMetadata({
  title: "Our Drones for Filming in Sri Lanka",
  description:
    "The DJI drones we use for filming in Sri Lanka, from the small Mini 2 to the Mavic 4 Pro. What each one is good at, explained in plain words, so you can choose.",
  path: "/fleet",
});

export default async function FleetPage() {
  const [drones, settings] = await Promise.all([getDrones(), getSettings()]);
  return (
    <>
      <header className="bg-night pb-20 pt-32">
        <div className="mx-auto w-full max-w-6xl px-5 text-center sm:px-8">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ name: "Our Drones", path: "/fleet" }]} />
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-medium leading-[1.1] text-white text-balance sm:text-5xl md:text-6xl">
            The drones we use in Sri Lanka
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
            We use different drones depending on the place, the weather and the shots you want. Here is what
            each one is good at, in plain English. A licensed, insured pilot flies every one.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappHref("Hi! Can you help me choose the right drone for my trip?")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              <Icon name="whatsapp" size={18} /> Help me choose
            </a>
            <a
              href="#fleet"
              className="btn btn-light btn-lg"
            >
              See the drones <Icon name="arrow-right" size={16} />
            </a>
          </div>
        </div>
      </header>

      {/* Plan a shoot: drone, date, location, then WhatsApp */}
      <div className="relative z-10 mx-auto -mt-10 w-full max-w-5xl px-5 sm:px-8">
        <ShootPlanner
          drones={drones.map((d) => ({ slug: d.slug, name: d.name }))}
          whatsapp={settings.whatsapp}
        />
      </div>

      {/* Alternating product showcases */}
      <div id="fleet" className="mt-12">
        {drones.map((d, i) => (
          <DroneShowcase key={d.slug} drone={d} index={i} />
        ))}
      </div>

      {/* Closing CTA band */}
      <section className="bg-night py-20">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-display text-3xl font-medium text-white sm:text-4xl">
            Still not sure which one?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            Tell us where you are going and what you want to film. We will pick
            the right drone and pilot for you.
          </p>
          <a
            href={whatsappHref("Hi! Here is my plan. Which drone do you recommend?")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg mt-8"
          >
            <Icon name="whatsapp" size={18} /> Chat with a pilot
          </a>
          <p className="mt-6 flex flex-col items-center gap-2 text-sm font-medium sm:flex-row sm:justify-center sm:gap-6">
            <Link href="/portfolio" className="text-white/60 hover:text-white">
              See photos we took with these drones
            </Link>
            <Link href="/shop" className="text-white/60 hover:text-white">
              Want to buy a DJI drone? Visit our shop
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

