import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { photoAlt } from "@/lib/alt";

export type Waypoint = {
  id: string;
  title: string;
  poster: string;
  location: string;
  category: string;
  blurb: string;
};

/** "Where we film": a plain grid of location photos, then a prompt for places not on the list. */
export function FlightTrack({ waypoints }: { waypoints: Waypoint[] }) {
  return (
    <section aria-labelledby="where-we-film" className="bg-night-800 py-20 text-white sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <h2 id="where-we-film" className="font-display text-4xl font-semibold text-white sm:text-5xl">
          Where we film
        </h2>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {waypoints.map((wp) => (
            <li key={wp.id} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={wp.poster}
                alt={photoAlt(wp.title, wp.location)}
                fill
                quality={60}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 384px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-sm text-white/70">{wp.category}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-white">{wp.location}</h3>
                <p className="mt-1 text-sm text-white/75">{wp.blurb}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 max-w-xl">
          <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">Filming somewhere else?</h3>
          <p className="mt-3 text-white/70">
            We film across the island. See the places we know well, or tell us where you are going.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 rounded-full bg-sunset px-6 py-3.5 text-sm font-semibold text-night transition-colors hover:bg-amber-400"
            >
              Our filming locations <Icon name="arrow-right" size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Plan your shoot
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
