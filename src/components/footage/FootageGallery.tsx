"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { droneName, type Footage } from "@/lib/content";
import { photoAlt } from "@/lib/alt";

/**
 * Responsive footage grid with an accessible lightbox. Items with a YouTube id
 * are videos, loaded (privacy-enhanced embed) only when a user clicks play.
 * Items without one are photos and open full size.
 */
export function FootageGallery({
  items,
  filterable = false,
}: {
  items: Footage[];
  filterable?: boolean;
}) {
  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category)))];
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<Footage | null>(null);

  const visible = filter === "All" ? items : items.filter((i) => i.category === filter);

  return (
    <div>
      {filterable && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === c
                  ? "bg-ocean text-white"
                  : "border border-night/15 text-night/70 hover:border-ocean/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActive(f)}
            className="cinematic-frame group relative aspect-video overflow-hidden rounded-2xl text-left"
            aria-label={f.youtubeId ? `Play ${f.title}` : `View photo: ${f.title}`}
          >
            <Image
              src={f.poster}
              alt={photoAlt(f.title, f.location)}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 z-10 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
            {f.youtubeId && (
              <span className="absolute left-1/2 top-1/2 z-10 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-night shadow-lg transition group-hover:scale-110">
                <Icon name="play" size={24} />
              </span>
            )}
            <span className="absolute bottom-0 left-0 z-10 p-4">
              <span className="block font-semibold text-white">{f.title}</span>
              <span className="mt-0.5 flex items-center gap-2 text-xs text-white/70">
                <Icon name="map-pin" size={12} /> {f.location}
                {f.droneSlug && ` · ${droneName(f.droneSlug)}`}
              </span>
            </span>
            <span className="absolute right-3 top-3 z-10 rounded-full bg-night/70 px-3 py-1 text-xs font-medium text-white">
              {f.category}
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-night/90 p-4 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
        >
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 text-white">
              <h3 className="font-display text-lg font-semibold">{active.title}</h3>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <Icon name="close" size={20} />
              </button>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
              {active.youtubeId ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1&rel=0`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <Image
                  src={active.poster}
                  alt={photoAlt(active.title, active.location)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
