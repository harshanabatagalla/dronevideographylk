import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { getDrones, getFootage } from "@/lib/db";
import { BOOKING_STEPS } from "@/lib/services";
import { photoAlt } from "@/lib/alt";

/** A few photos from the portfolio, by footage id. Missing ids are skipped. */
export async function PhotoGrid({ ids, caption }: { ids: string[]; caption?: string }) {
  const footage = await getFootage();
  const items = ids.map((id) => footage.find((f) => f.id === id)).filter((f) => f !== undefined);
  if (items.length === 0) return null;
  return (
    <figure>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f) => (
          <div key={f.id} className="overflow-hidden rounded-2xl border border-night/10 bg-white">
            {/* Skipped until near the screen, so photos lower down do not load at once.
                The aspect ratio keeps the space while it waits. */}
            <div className="relative aspect-[4/3] [content-visibility:auto]">
              <Image
                src={f.poster}
                alt={photoAlt(f.title, f.location)}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 384px"
                quality={60}
                className="object-cover"
              />
            </div>
            <p className="flex items-center gap-2 px-4 py-3 text-sm text-night/70">
              <Icon name="map-pin" size={14} /> {f.title}
            </p>
          </div>
        ))}
      </div>
      {caption && <figcaption className="mt-3 text-sm text-night/65">{caption}</figcaption>}
    </figure>
  );
}

/** The drones from our own list that suit a shoot, linking to their pages. */
export async function DroneList({ slugs }: { slugs: string[] }) {
  const drones = await getDrones();
  const items = slugs.map((s) => drones.find((d) => d.slug === s)).filter((d) => d !== undefined);
  if (items.length === 0) return null;
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((d) => (
        <li key={d.slug}>
          <Link
            href={`/fleet/${d.slug}`}
            className="flex h-full items-start gap-3 rounded-2xl border border-night/10 bg-white p-4 transition hover:border-ocean/40"
          >
            <span className="mt-0.5 shrink-0 text-ocean">
              <Icon name="drone" size={20} />
            </span>
            <span>
              <span className="block font-semibold text-night">{d.name}</span>
              <span className="text-sm text-night/65">{d.tagline}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function BookingSteps({ light = false }: { light?: boolean }) {
  return (
    <ol className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
      {BOOKING_STEPS.map((s, i) => (
        <li key={s.title} className={`border-t-2 pt-5 ${light ? "border-white/70" : "border-night"}`}>
          <p
            aria-hidden="true"
            className={`num font-display text-4xl font-medium leading-none ${light ? "text-white" : "text-night"}`}
          >
            {i + 1}
          </p>
          <h3 className={`mt-4 font-semibold ${light ? "text-white" : "text-night"}`}>{s.title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${light ? "text-white/75" : "text-night/70"}`}>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
