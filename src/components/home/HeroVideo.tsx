"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero background video. The file is large, so phones and tablets get only the
 * poster image and never download it. Wider screens load it after the page is
 * ready, so it never competes with the content for bandwidth.
 */
export function HeroVideo({ src, type, poster }: { src: string; type: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const slow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!wide || saveData || slow) return;
    const id = window.setTimeout(() => setLoad(true), 400);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (load) ref.current?.load();
  }, [load]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      poster={poster}
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
