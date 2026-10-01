"use client";

import { useEffect, useRef } from "react";

/**
 * Hero-scoped HUD: corner brackets and live camera telemetry rendered only
 * within the hero section (not across the whole page). The timecode runs via
 * rAF and is updated imperatively so it never re-renders React.
 */
export function HeroHUD() {
  const tcRef = useRef<HTMLSpanElement>(null);

  // The timecode is only shown from md up, so it only ticks there, only while the
  // hero is on screen, and at 25 fps (the rate it displays) instead of every frame.
  useEffect(() => {
    const el = tcRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wide = window.matchMedia("(min-width: 768px)");
    const pad = (n: number) => String(Math.floor(Math.max(n, 0))).padStart(2, "0");
    const start = performance.now();
    let timer = 0;
    let visible = false;
    const tick = () => {
      const s = (performance.now() - start) / 1000;
      el.textContent = `${pad(s / 3600)}:${pad((s / 60) % 60)}:${pad(s % 60)}:${pad((s * 25) % 25)}`;
    };
    const sync = () => {
      const run = visible && wide.matches;
      if (run && !timer) timer = window.setInterval(tick, 40);
      if (!run && timer) {
        window.clearInterval(timer);
        timer = 0;
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(el.closest("section") ?? el);
    wide.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      wide.removeEventListener("change", sync);
      if (timer) window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 bottom-14 z-20 font-mono text-white/70" aria-hidden="true">
      <span className="hud-corner tl hidden md:block" />
      <span className="hud-corner tr hidden md:block" />
      <span className="hud-corner bl hidden md:block" />
      <span className="hud-corner br hidden md:block" />

      {/* Telemetry sits below the header; corners stay at the very top */}
      <div className="absolute left-12 top-20 hidden h-[26px] items-center gap-2 text-[0.6rem] uppercase tracking-[0.18em] md:flex">
        <span className="blink text-[#fb5b5b]">●</span> REC
        <span ref={tcRef} className="ml-1 text-white/85">00:00:00:00</span>
      </div>
      <div className="absolute right-12 top-20 hidden h-[26px] items-center gap-3 text-[0.6rem] uppercase tracking-[0.18em] md:flex">
        <span>ALT 0000m</span>
        <span className="text-white/85">7.8731&deg;N 80.7718&deg;E</span>
      </div>
    </div>
  );
}
