"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
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

/**
 * "Where we film": one strip of location cards, rendered once for every screen.
 * On md and up the section is tall and an inner panel sticks to the viewport
 * while the strip pans left with scroll progress (rAF, no libraries). Below md
 * the same strip is a native horizontal snap scroller and no transform runs.
 */
export function FlightTrack({ waypoints }: { waypoints: Waypoint[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Work only happens on scroll/resize while the section is on screen, and only on
  // wide screens. An always-running rAF loop here used to read layout every frame
  // from page load, which Lighthouse flagged as forced reflow and which slowed
  // first paint on phones.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (reduce || !wrap || !track) return;
    const wide = window.matchMedia("(min-width: 768px)");

    let raf = 0;
    let current = -1;
    let visible = false;
    const update = () => {
      raf = 0;
      if (!wide.matches) {
        track.style.transform = "";
        return;
      }
      // Read everything first, then write, so the browser lays out once.
      const total = wrap.offsetHeight - window.innerHeight;
      const top = wrap.getBoundingClientRect().top;
      const distance = track.scrollWidth - window.innerWidth;
      const p = total > 0 ? Math.min(Math.max(-top, 0), total) / total : 0;
      track.style.transform = `translate3d(${-(p * distance)}px, 0, 0)`;
      if (markerRef.current) markerRef.current.style.left = `${p * 100}%`;
      const idx = Math.min(waypoints.length - 1, Math.floor(p * waypoints.length + 0.35));
      if (idx !== current) {
        current = idx;
        setActive(idx);
      }
    };
    const schedule = () => {
      if (visible && !raf) raf = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    });
    observer.observe(wrap);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    wide.addEventListener("change", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      wide.removeEventListener("change", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [waypoints.length]);

  const pinHeight = { "--pin-h": `${(waypoints.length + 1) * 80}vh` } as CSSProperties;

  return (
    <section aria-labelledby="where-we-film" className="bg-night text-white">
      <div ref={wrapRef} style={pinHeight} className="relative md:h-[var(--pin-h)]">
        <div className="relative bg-cinema noise px-5 py-20 md:sticky md:top-0 md:flex md:h-screen md:flex-col md:overflow-hidden md:px-0 md:py-0">
          <div className="aurora hidden opacity-30 md:block" />

          <div className="relative z-10 flex items-end justify-between md:px-8 md:pt-24 lg:px-16">
            <div>
              <span className="tape text-white/50">Locations</span>
              <h2 id="where-we-film" className="mt-2 font-display text-4xl font-semibold text-white sm:text-5xl">
                Where we <span className="text-gradient">film</span>
              </h2>
            </div>
            <div className="hidden text-right md:block">
              <div className="tape text-white/40">Location</div>
              <div className="font-mono text-lg text-sunset transition-all">
                {String(active + 1).padStart(2, "0")} · {waypoints[active]?.location}
              </div>
            </div>
          </div>

          <div className="relative z-10 md:flex md:flex-1 md:items-center">
            <div
              ref={trackRef}
              className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:mt-0 md:h-[62vh] md:snap-none md:items-stretch md:gap-6 md:overflow-visible md:pb-0 md:pl-8 md:pr-[20vw] md:will-change-transform lg:gap-8 lg:pl-16"
            >
              {waypoints.map((wp, i) => (
                <article
                  key={wp.id}
                  className="group relative h-[64vh] shrink-0 basis-[85%] snap-center overflow-hidden rounded-3xl border border-white/10 md:h-auto md:basis-auto md:w-[74vw] md:rounded-[2rem] lg:w-[52vw]"
                >
                  <Image
                    src={wp.poster}
                    alt={photoAlt(wp.title, wp.location)}
                    fill
                    sizes="(max-width: 767px) 85vw, (max-width: 1023px) 74vw, 52vw"
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
                  <div className="scanlines" />

                  <span className="pointer-events-none absolute right-4 top-3 font-display text-6xl font-bold leading-none text-white/15 md:right-6 md:top-4 md:text-[7rem] md:text-white/10">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="hud-corner tl hidden !border-white/40 md:block" />
                  <span className="hud-corner br hidden !border-white/40 md:block" />

                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 lg:p-9">
                    <span className="tape rounded-full border border-white/25 px-2 py-0.5 text-white/70">{wp.category}</span>
                    <h3 className="mt-2 font-display text-3xl font-semibold text-white md:mt-3 md:text-4xl lg:text-5xl">
                      {wp.location}
                    </h3>
                    <p className="mt-1 max-w-md text-sm text-white/75 md:mt-2 md:text-base">{wp.blurb}</p>
                  </div>
                </article>
              ))}

              <article className="relative flex h-[64vh] shrink-0 basis-[85%] snap-center flex-col justify-center gap-5 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:h-auto md:basis-auto md:w-[74vw] md:rounded-[2rem] md:px-10 lg:w-[40vw]">
                <span className="tape text-white/40">More places</span>
                <h3 className="font-display text-3xl font-semibold leading-tight text-white lg:text-5xl">
                  Filming somewhere <span className="text-gradient">else?</span>
                </h3>
                <p className="max-w-sm text-white/70">
                  We film across the island. See the places we know well, or tell us where you are going.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/locations"
                    className="glow-sunset inline-flex w-fit items-center gap-2 rounded-full bg-sunset px-6 py-3.5 text-sm font-semibold text-night transition hover:-translate-y-0.5 hover:bg-amber-400"
                  >
                    Our filming locations <Icon name="arrow-right" size={16} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5"
                  >
                    Plan your shoot
                  </Link>
                </div>
              </article>
            </div>
          </div>

          <div className="relative z-10 hidden px-8 pb-14 md:block lg:px-16">
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
    </section>
  );
}
