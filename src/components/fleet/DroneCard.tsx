import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { whatsappHref } from "@/lib/site";
import type { Drone } from "@/lib/content";

/**
 * Drone card for the dark band on the home page: a photo with the name over it,
 * three plain spec rows, who the drone is best for, and two actions.
 */
export function DroneCard({ drone }: { drone: Drone }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-night-800">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={drone.image}
          alt={`${drone.name} camera drone`}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 384px"
          className="object-cover transition-transform duration-700 ease-out-strong group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
        <div className="absolute inset-x-5 bottom-4">
          <h3 className="font-display text-2xl font-medium text-white">{drone.name}</h3>
          <p className="mt-1 text-sm text-white/75">{drone.tagline}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <dl className="divide-y divide-white/10 border-y border-white/10 text-sm">
          {drone.specs.slice(0, 3).map((s) => (
            <div key={s.label} className="flex items-baseline justify-between gap-4 py-2.5">
              <dt className="shrink-0 text-white/60">{s.label}</dt>
              <dd className="text-right text-white/90">{s.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 text-sm leading-relaxed text-white/65">
          <span className="text-white/85">Best for: </span>
          {drone.bestFor.join(", ")}
        </p>

        <div className="mt-auto flex items-center gap-3 pt-6">
          <Link
            href={`/fleet/${drone.slug}`}
            className="tap inline-flex items-center gap-1 text-sm font-semibold text-sunset transition-colors duration-150 hover:text-amber-300"
          >
            {drone.name} details <Icon name="arrow-right" size={14} />
          </Link>
          <a
            href={whatsappHref(`Hi! I'd like to book the ${drone.name} drone for my Sri Lanka trip.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm ml-auto"
          >
            <Icon name="whatsapp" size={14} /> Enquire
          </a>
        </div>
      </div>
    </article>
  );
}
