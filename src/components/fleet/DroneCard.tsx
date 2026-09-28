import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { whatsappHref } from "@/lib/site";
import type { Drone } from "@/lib/content";

/**
 * Premium dark drone card (used on the home fleet teaser).
 * Cinematic image header with floating name, plain-language spec quick-list
 * and a dual call-to-action. Designed to sit on a dark cinematic band.
 */
export function DroneCard({ drone }: { drone: Drone }) {
  return (
    <article className="hover-lift group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur hover:border-white/25 hover:shadow-2xl hover:shadow-black/40">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={drone.image}
          alt={`${drone.name} camera drone`}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
          Drone
        </span>
        <div className="absolute inset-x-4 bottom-4">
          <h3 className="font-display text-2xl font-semibold text-white">{drone.name}</h3>
          <p className="mt-1 text-sm text-white/70">{drone.tagline}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <ul className="space-y-3">
          {drone.specs.slice(0, 3).map((s) => (
            <li key={s.label} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sunset/15 text-sunset">
                <Icon name={s.icon} size={16} />
              </span>
              <span className="text-sm">
                <span className="block text-[11px] font-semibold uppercase tracking-wide text-white/45">
                  {s.label}
                </span>
                <span className="text-white/80">{s.value}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {drone.bestFor.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
          <Link
            href={`/fleet/${drone.slug}`}
            className="tap inline-flex items-center gap-1 text-sm font-semibold text-sunset transition hover:text-amber-300"
          >
            {drone.name} details <Icon name="arrow-right" size={14} />
          </Link>
          <a
            href={whatsappHref(`Hi! I'd like to book the ${drone.name} drone for my Sri Lanka trip.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-sunset px-4 py-2 text-xs font-semibold text-night transition hover:bg-amber-400"
          >
            <Icon name="whatsapp" size={14} /> Enquire
          </a>
        </div>
      </div>
    </article>
  );
}
