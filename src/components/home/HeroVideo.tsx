"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero background video. Phones and tablets never download it; they only see the
 * optimized poster image rendered behind this element by Hero. Wider screens load
 * it once the page has finished loading and the browser is idle.
 */
export function HeroVideo({ src, type }: { src: string; type: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const slow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!wide || saveData || slow) return;
    // Start only once the page has fully loaded and the browser is idle, so the
    // video never competes with the page's own images and scripts.
    let idle = 0;
    let timer = 0;
    const start = () => {
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(() => setLoad(true), { timeout: 2000 });
      } else {
        timer = window.setTimeout(() => setLoad(true), 1000);
      }
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (idle) window.cancelIdleCallback(idle);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (load) ref.current?.load();
  }, [load]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full bg-transparent object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    >
      {load && <source src={src} type={type} />}
    </video>
  );
}
