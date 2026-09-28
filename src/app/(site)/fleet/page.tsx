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
      {/* Immersive header */}
      <header className="relative flex min-h-[70vh] items-center overflow-hidden bg-cinema noise pt-24">
        <div className="aurora" />
        <div className="relative mx-auto w-full max-w-6xl px-5 text-center sm:px-8">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ name: "Our Drones", path: "/fleet" }]} />
          </div>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            <Icon name="drone" size={14} /> Our drones
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.02] text-white text-balance sm:text-6xl md:text-7xl">
            The <span className="text-gradient">drones we use</span> in Sri Lanka
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
              className="glow-sunset inline-flex items-center gap-2 rounded-full bg-sunset px-7 py-3.5 text-sm font-semibold text-night transition hover:-translate-y-0.5 hover:bg-amber-400"
            >
              <Icon name="whatsapp" size={18} /> Help me choose
            </a>
            <a
              href="#fleet"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5"
            >
              See the drones <Icon name="arrow-right" size={16} />
            </a>
          </div>
          <div className="scroll-cue mt-14 flex justify-center text-white/50">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
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
      <section className="relative overflow-hidden bg-cinema-soft py-20">
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
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
            className="glow-sunset mt-8 inline-flex items-center gap-2 rounded-full bg-sunset px-8 py-4 text-sm font-semibold text-night transition hover:-translate-y-0.5 hover:bg-amber-400"
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

