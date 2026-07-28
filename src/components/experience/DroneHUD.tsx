"use client";

import { useEffect, useRef } from "react";

/**
 * Global cursor focus-reticle. A single, prominent camera reticle trails the
 * pointer across the whole site to reinforce the "you're the drone operator"
 * feel. Updated imperatively via rAF (no React re-renders); disabled for touch
 * devices and reduced-motion users. Never blocks clicks (pointer-events-none).
 */
export function DroneHUD() {
  const reticleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let tx = rx;
    let ty = ry;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    const follow = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="hud hidden md:block" aria-hidden="true">
      <div ref={reticleRef} className="hud-reticle">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
