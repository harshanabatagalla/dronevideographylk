import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappHref } from "@/lib/site";
import type { Drone } from "@/lib/content";

/**
 * DJI-style full-width product showcase for a single drone.
 * Big product image floating on a lit "stage", oversized name,
 * plain-language spec highlights and a dual call-to-action.
 * Sections alternate image side based on `index`.
 */
export function DroneShowcase({ drone, index }: { drone: Drone; index: number }) {
  const reversed = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <section className="relative overflow-hidden bg-cinema noise py-20 sm:py-28">
      <div className="aurora opacity-60" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Product image on a lit stage */}
        <Reveal
          variant={reversed ? "right" : "left"}
          className={reversed ? "lg:order-2" : ""}
        >
          <div className="stage relative aspect-[5/4] w-full">
            <div className="animate-float absolute inset-0">
              <Image
                src={drone.image}
                alt={`${drone.name} camera drone`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="rounded-[2rem] object-cover shadow-2xl shadow-black/50 ring-1 ring-white/10"
              />
              <div className="cinematic-frame absolute inset-0 rounded-[2rem]" />
            </div>
            <span className="absolute -left-3 -top-3 font-display text-7xl font-bold text-white/10 sm:text-8xl">
              {number}
            </span>
          </div>
        </Reveal>

        {/* Content */}
        <Reveal
          variant={reversed ? "left" : "right"}
          delay={120}
          className={reversed ? "lg:order-1" : ""}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sunset">
              Camera in the sky · {number}
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl">
              {drone.name}
            </h2>
            <p className="mt-4 max-w-md text-lg text-white/70">{drone.tagline}</p>

            {/* Spec highlights */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {drone.specs.slice(0, 4).map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-2xl p-4 transition hover:border-white/25"
                >
                  <span className="mb-2 grid h-9 w-9 place-items-center rounded-lg bg-sunset/15 text-sunset">
                    <Icon name={s.icon} size={18} />
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-white/45">
                    {s.label}
                  </p>
                  <p className="mt-0.5 text-sm text-white/85">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Best-for chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {drone.bestFor.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappHref(
                  `Hi! I'd like to book the ${drone.name} drone for my Sri Lanka trip.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-sunset inline-flex items-center gap-2 rounded-full bg-sunset px-7 py-3.5 text-sm font-semibold text-night transition hover:-translate-y-0.5 hover:bg-amber-400"
              >
                <Icon name="whatsapp" size={18} /> Book this drone
              </a>
              <Link
                href={`/fleet/${drone.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5"
              >
                Learn more <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
