"use client";

import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { locations } from "@/lib/content";

/**
 * Stylized interactive map of Sri Lanka. Hovering (or focusing) a pin reveals a
 * location card, and animated dashed "flight paths" connect the hotspots to
 * reinforce the travel theme. Purely presentational SVG — no map library, so it
 * stays fast and dependency-free.
 */
export function IslandMap() {
  const [active, setActive] = useState<string>(locations[0].slug);
  const current = locations.find((l) => l.slug === active) ?? locations[0];

  // Build a flight path connecting the pins in order.
  const pathD = locations
    .map((l, i) => `${i === 0 ? "M" : "L"} ${l.x} ${l.y}`)
    .join(" ");

  return (
    <div className="bg-skyline py-20 sm:py-24">
      <Section>
        <SectionHeading
          light
          eyebrow="Where we fly"
          title="Explore Sri Lanka's most cinematic spots"
          subtitle="Tap a location to see what makes it special. We plan routes around the light, the tides and your itinerary."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-sm">
            <svg viewBox="0 0 100 110" className="w-full drop-shadow-2xl" role="img" aria-label="Map of Sri Lanka with filming locations">
              {/* Island silhouette (stylized) */}
              <path
                d="M50 6 C63 8 72 20 74 34 C76 48 80 60 74 74 C69 86 60 98 50 104 C40 98 31 88 27 74 C23 60 24 46 27 34 C30 20 37 8 50 6 Z"
                fill="rgba(34,184,207,0.10)"
                stroke="rgba(34,184,207,0.5)"
                strokeWidth="0.8"
              />
              {/* Flight path */}
              <path d={pathD} fill="none" stroke="#f59e0b" strokeWidth="0.7" className="flight-path" opacity="0.8" />
              {/* Pins */}
              {locations.map((l) => {
                const isActive = l.slug === active;
                return (
                  <g
                    key={l.slug}
                    transform={`translate(${l.x} ${l.y})`}
                    className="cursor-pointer"
                    onMouseEnter={() => setActive(l.slug)}
                    onFocus={() => setActive(l.slug)}
                    tabIndex={0}
                    role="button"
                    aria-label={l.name}
                  >
                    {isActive && <circle r="4.5" fill="#f59e0b" opacity="0.25" />}
                    <circle r="2" fill={isActive ? "#f59e0b" : "#22b8cf"} stroke="#0b1f2a" strokeWidth="0.4" />
                  </g>
                );
              })}
            </svg>
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {locations.map((l) => (
                <button
                  key={l.slug}
                  type="button"
                  onMouseEnter={() => setActive(l.slug)}
                  onClick={() => setActive(l.slug)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    l.slug === active
                      ? "bg-sunset text-night"
                      : "bg-white/10 text-white/80 ring-1 ring-white/15 hover:bg-white/20"
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center gap-2 text-sunset">
                <Icon name="map-pin" size={20} />
                <h3 className="font-display text-2xl font-semibold text-white">{current.name}</h3>
              </div>
              <p className="mt-3 text-white/70">{current.blurb}</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
