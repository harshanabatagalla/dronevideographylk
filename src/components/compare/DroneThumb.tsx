import Image from "next/image";
import type { CompareDrone } from "@/lib/compare";
import { getPhotoCredit } from "@/lib/photo-credits";

/**
 * Drone photo for the comparison pages. Only credited Creative Commons photos are used;
 * drones without one get a plain drawn outline with the name, never a photo of another model.
 * The parent sets the size and shape (it must be `relative`).
 */
export function DroneThumb({
  drone,
  sizes,
  priority = false,
}: {
  drone: CompareDrone;
  sizes: string;
  priority?: boolean;
}) {
  if (drone.image) {
    return (
      <Image
        src={drone.image}
        alt={drone.name}
        fill
        sizes={sizes}
        quality={60}
        loading={priority ? "eager" : undefined}
        fetchPriority={priority ? "high" : undefined}
        className="object-cover"
      />
    );
  }
  const round = drone.series === "Avata";
  return (
    <div role="img" aria-label={drone.name} className="absolute inset-0 grid place-items-center bg-night-700">
      <svg viewBox="0 0 120 80" className="w-3/5 max-w-40 text-white/70" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        {round ? (
          <>
            <circle cx="28" cy="22" r="16" opacity="0.7" />
            <circle cx="92" cy="22" r="16" opacity="0.7" />
            <circle cx="28" cy="58" r="16" opacity="0.7" />
            <circle cx="92" cy="58" r="16" opacity="0.7" />
            <rect x="44" y="28" width="32" height="24" rx="8" />
          </>
        ) : (
          <>
            <ellipse cx="22" cy="16" rx="16" ry="4" opacity="0.6" />
            <ellipse cx="98" cy="16" rx="16" ry="4" opacity="0.6" />
            <path d="M22 20 46 32M98 20 74 32" />
            <rect x="44" y="26" width="32" height="18" rx="7" />
            <circle cx="60" cy="52" r="6" />
            <path d="M46 42 28 56M74 42l18 14" opacity="0.7" />
          </>
        )}
      </svg>
      <span className="sr-only">{drone.name}</span>
    </div>
  );
}

/** Credit line for a drone photo, for use on dark or light backgrounds. */
export function CreditLine({ drone, dark = false }: { drone: CompareDrone; dark?: boolean }) {
  if (!drone.image) return <p className={`text-xs ${dark ? "text-white/60" : "text-night/65"}`}>Drawing. We have no free photo of this drone yet.</p>;
  const c = getPhotoCredit(drone.slug);
  if (!c) return null;
  const tone = dark ? "text-white/60 hover:text-white" : "text-night/65 hover:text-night";
  return (
    <p className={`text-xs ${dark ? "text-white/60" : "text-night/65"}`}>
      {c.note && <span>{c.note} </span>}
      Photo:{" "}
      <a href={c.source} target="_blank" rel="noopener noreferrer" className={`underline ${tone}`}>
        {c.author}
      </a>
      ,{" "}
      <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer" className={`underline ${tone}`}>
        {c.license}
      </a>
    </p>
  );
}
