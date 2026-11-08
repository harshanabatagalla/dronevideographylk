import Image from "next/image";
import { Button } from "@/components/ui/Section";
import { photoAlt } from "@/lib/alt";

export type Waypoint = {
  id: string;
  title: string;
  poster: string;
  location: string;
  category: string;
  blurb: string;
};

/**
 * "Where we film": a directory of places, each with a small photo, then a prompt for
 * places not on the list. The photos are already shown large in the gallery above, so
 * here they are thumbnails and the place names carry the section.
 */
export function FlightTrack({ waypoints }: { waypoints: Waypoint[] }) {
  return (
    <section aria-labelledby="where-we-film" className="bg-night-800 py-20 text-white sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <h2
          id="where-we-film"
          className="font-display text-3xl font-medium text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
        >
          Where we film
        </h2>

        <ul className="mt-10 grid gap-x-14 border-b border-white/15 lg:grid-cols-2">
          {waypoints.map((wp) => (
            <li key={wp.id} className="flex gap-5 border-t border-white/15 py-6">
              <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-40">
                <Image
                  src={wp.poster}
                  alt={photoAlt(wp.title, wp.location)}
                  fill
                  quality={60}
                  sizes="160px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-white/65">{wp.category}</p>
                <h3 className="mt-0.5 font-display text-2xl font-medium text-white">{wp.location}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75">{wp.blurb}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h3 className="font-display text-2xl font-medium text-white sm:text-3xl">Filming somewhere else?</h3>
            <p className="mt-3 text-white/70">
              We film across the island. See the places we know well, or tell us where you are going.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/locations" icon>
              Our filming locations
            </Button>
            <Button href="/contact" variant="light">
              Plan your shoot
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
