import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappHref } from "@/lib/site";
import type { Drone } from "@/lib/content";

/**
 * Full-width section for a single drone: a photo, its name and tagline,
 * plain-language spec highlights and two calls to action.
 * Sections alternate image side based on `index`.
 */
export function DroneShowcase({ drone, index }: { drone: Drone; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <section className="border-t border-white/10 bg-night py-20 sm:py-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal
          variant={reversed ? "right" : "left"}
          className={reversed ? "lg:order-2" : ""}
        >
          <div className="relative aspect-[5/4] w-full">
            <Image
              src={drone.image}
              alt={`${drone.name} camera drone`}
              fill
              sizes="(max-width: 1024px) 100vw, 576px"
              className="rounded-3xl object-cover"
            />
          </div>
        </Reveal>

        <Reveal
          variant={reversed ? "left" : "right"}
          delay={120}
          className={reversed ? "lg:order-1" : ""}
        >
          <div>
            <h2 className="font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl">
              {drone.name}
            </h2>
            <p className="mt-4 max-w-md text-lg text-white/70">{drone.tagline}</p>

            {/* Spec highlights */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {drone.specs.slice(0, 4).map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-night-800 p-4">
                  <span className="text-sunset">
                    <Icon name={s.icon} size={20} />
                  </span>
                  <p className="mt-3 text-sm text-white/60">{s.label}</p>
                  <p className="mt-0.5 text-sm text-white/90">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Best-for tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {drone.bestFor.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/70"
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
                className="inline-flex items-center gap-2 rounded-full bg-sunset px-7 py-3.5 text-sm font-semibold text-night transition-colors hover:bg-amber-400"
              >
                <Icon name="whatsapp" size={18} /> Book this drone
              </a>
              <Link
                href={`/fleet/${drone.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                What we use the {drone.name} for <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
