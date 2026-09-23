"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export type Waypoint = {
  id: string;
  title: string;
  poster: string;
  location: string;
  category: string;
  blurb: string;
  altitude: number;
};

/**
 * Signature "flight over the island" — a scroll-pinned horizontal journey.
 * The section is tall; an inner panel sticks to the viewport while the film
 * strip of waypoints pans left, driven by scroll progress (rAF, no libraries).
 * On touch / small screens it degrades to a horizontal snap-scroll strip.
 */
export function FlightTrack({ waypoints }: { waypoints: Waypoint[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    let current = -1;
    const update = () => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (wrap && track) {
        const total = wrap.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-wrap.getBoundingClientRect().top, 0), total);
        const p = total > 0 ? scrolled / total : 0;
        const distance = track.scrollWidth - window.innerWidth;
        track.style.transform = `translate3d(${-(p * distance)}px, 0, 0)`;
        if (markerRef.current) markerRef.current.style.left = `${p * 100}%`;
        const idx = Math.min(waypoints.length - 1, Math.floor(p * waypoints.length + 0.35));
        if (idx !== current) {
          current = idx;
          setActive(idx);
        }
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [waypoints.length]);

  return (
    <section aria-label="A drone flight across Sri Lanka" className="bg-night text-white">
      {/* ---- Pinned horizontal flight (md+) ---- */}
      <div
        ref={wrapRef}
        className="relative hidden md:block"
        style={{ height: `${(waypoints.length + 1) * 80}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-cinema noise">
          <div className="aurora opacity-30" />

          {/* header row */}
          <div className="relative z-10 flex items-end justify-between px-8 pt-24 lg:px-16">
            <div>
              <span className="tape text-white/50">Locations</span>
              <h2 className="mt-2 font-display text-4xl font-semibold text-white sm:text-5xl">
                Where we <span className="text-gradient">film</span>
              </h2>
            </div>
            <div className="hidden text-right sm:block">
              <div className="tape text-white/40">Location</div>
              <div className="font-mono text-lg text-sunset transition-all">
                {String(active + 1).padStart(2, "0")} · {waypoints[active]?.location}
              </div>
            </div>
          </div>

          {/* the moving film strip */}
          <div className="relative z-10 flex flex-1 items-center">
            <div
              ref={trackRef}
              className="flex h-[62vh] items-stretch gap-6 pl-8 pr-[20vw] will-change-transform lg:gap-8 lg:pl-16"
            >
              {waypoints.map((wp, i) => (
                <article
                  key={wp.id}
                  className="group relative w-[74vw] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 lg:w-[52vw]"
                >
                  <Image
                    src={wp.poster}
                    alt={wp.title}
                    fill
                    sizes="60vw"
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
                  <div className="scanlines" />

                  {/* giant waypoint number */}
                  <span className="pointer-events-none absolute right-6 top-4 font-display text-[7rem] font-bold leading-none text-white/10">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* corner brackets to echo the HUD */}
                  <span className="hud-corner tl !border-white/40" />
                  <span className="hud-corner br !border-white/40" />

                  <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9">
                    <div className="flex items-center gap-3 tape text-white/70">
                      <span className="rounded-full border border-white/25 px-2 py-0.5">{wp.category}</span>
                      <span>ALT {wp.altitude}m</span>
                    </div>
                    <h3 className="mt-3 font-display text-4xl font-semibold text-white lg:text-5xl">
                      {wp.location}
                    </h3>
                    <p className="mt-2 max-w-md text-white/75">{wp.blurb}</p>
                  </div>
                </article>
              ))}

              {/* end-of-flight CTA panel */}
              <article className="relative flex w-[74vw] shrink-0 flex-col justify-center gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] px-10 lg:w-[40vw]">
                <span className="tape text-white/40">Get started</span>
                <h3 className="font-display text-4xl font-semibold leading-tight text-white lg:text-5xl">
                  Plan your shoot <span className="text-gradient">with us.</span>
                </h3>
                <p className="max-w-sm text-white/70">
                  Tell us where you are going and we will plan the shots.
                </p>
                <a
                  href="/contact"
                  className="glow-sunset inline-flex w-fit items-center gap-2 rounded-full bg-sunset px-6 py-3.5 text-sm font-semibold text-night transition hover:-translate-y-0.5 hover:bg-amber-400"
                >
                  Plan your shoot <Icon name="arrow-right" size={16} />
                </a>
              </article>
            </div>
          </div>

          {/* flight-path progress rail */}
          <div className="relative z-10 px-8 pb-14 lg:px-16">
            <div className="relative h-px w-full flight-rail">
              <div ref={markerRef} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: "0%" }}>
                <span className="block h-3 w-3 rounded-full bg-sunset shadow-[0_0_16px_4px_rgba(245,158,11,0.6)]" />
              </div>
            </div>
            <div className="mt-4 flex justify-between tape text-white/40">
              <span>Start</span>
              <span>{waypoints.length} locations</span>
              <span>End</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Mobile snap strip ---- */}
      <div className="bg-cinema noise px-5 py-20 md:hidden">
        <span className="tape text-white/50">Locations</span>
        <h2 className="mt-2 font-display text-4xl font-semibold text-white">
          Where we <span className="text-gradient">film</span>
        </h2>
        <div className="filmstrip no-scrollbar mt-8 gap-4 pb-4">
          {waypoints.map((wp, i) => (
            <article key={wp.id} className="relative h-[64vh] overflow-hidden rounded-3xl border border-white/10">
              <Image src={wp.poster} alt={wp.title} fill sizes="85vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
              <span className="pointer-events-none absolute right-4 top-3 font-display text-6xl font-bold text-white/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="tape text-white/70">{wp.category} · ALT {wp.altitude}m</div>
                <h3 className="mt-2 font-display text-3xl font-semibold text-white">{wp.location}</h3>
                <p className="mt-1 text-sm text-white/75">{wp.blurb}</p>
              </div>
            </article>
          ))}

          {/* end-of-flight CTA — last card in the strip, like desktop */}
          <article className="relative flex h-[64vh] flex-col justify-center gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <span className="tape text-white/40">Get started</span>
            <h3 className="font-display text-3xl font-semibold leading-tight text-white">
              Plan your shoot <span className="text-gradient">with us.</span>
            </h3>
            <p className="text-white/70">
              Tell us where you are going and we will plan the shots.
            </p>
            <a
              href="/contact"
              className="glow-sunset inline-flex w-fit items-center gap-2 rounded-full bg-sunset px-6 py-3.5 text-sm font-semibold text-night transition hover:-translate-y-0.5 hover:bg-amber-400"
            >
              Plan your shoot <Icon name="arrow-right" size={16} />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
