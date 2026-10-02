"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Progressive scroll-reveal wrapper. The server HTML is visible as is; once
 * JavaScript runs, only content that is still below the screen is hidden and
 * then animated in. Content already on screen never fades, and nothing stays
 * hidden if the script fails to load. Motion is skipped when reduced.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  variant?: "up" | "left" | "right" | "scale";
}) {
  const ref = useRef<HTMLDivElement>(null);
  // "static": plain server HTML. "hidden": below the screen, waiting. "shown": animated in.
  const [state, setState] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let first = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (first) {
          first = false;
          // Any part already on screen (or above it) stays as rendered.
          if (entry.boundingClientRect.top < window.innerHeight) {
            observer.disconnect();
            return;
          }
          setState("hidden");
        }
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const base = variant === "up" ? "reveal" : `reveal-${variant}`;
  const Component = Tag as "div";
  return (
    <Component
      ref={ref}
      className={`${state === "static" ? "" : base} ${state === "shown" ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
