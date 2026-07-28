import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { DroneShowcase } from "@/components/fleet/DroneShowcase";
import { getDrones } from "@/lib/db";
import { whatsappHref } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Drone Fleet",
  description:
    "Meet our fleet of professional camera drones. Every specification explained in plain language so you can pick the perfect drone for your Sri Lanka shoot.",
  path: "/fleet",
});

export default async function FleetPage() {
  const drones = await getDrones();
  return (
    <>
      {/* Immersive header */}
      <header className="relative flex min-h-[70vh] items-center overflow-hidden bg-cinema noise pt-24">
        <div className="aurora" />
        <div className="relative mx-auto w-full max-w-6xl px-5 text-center sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            <Icon name="sparkles" size={14} /> The fleet
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.02] text-white text-balance sm:text-6xl md:text-7xl">
            Pick your <span className="text-gradient">camera in the sky</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
            No confusing tech jargon — just what each drone does best, in plain
            English. Every flight is handled by a licensed, insured pilot.
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
              Explore drones <Icon name="arrow-right" size={16} />
            </a>
          </div>
          <div className="scroll-cue mt-14 flex justify-center text-white/50">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          </div>
        </div>
      </header>

      {/* Alternating product showcases */}
      <div id="fleet">
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
            Tell us where you&apos;re headed and what you want to capture — we&apos;ll
            match the perfect drone (and pilot) to your itinerary.
          </p>
          <a
            href={whatsappHref("Hi! Here's my itinerary — which drone do you recommend?")}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-sunset mt-8 inline-flex items-center gap-2 rounded-full bg-sunset px-8 py-4 text-sm font-semibold text-night transition hover:-translate-y-0.5 hover:bg-amber-400"
          >
            <Icon name="whatsapp" size={18} /> Chat with a pilot
          </a>
          <p className="mt-6">
            <Link href="/portfolio" className="text-sm font-medium text-white/60 hover:text-white">
              Or watch what these drones can do →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

