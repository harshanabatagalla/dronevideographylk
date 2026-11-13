"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * The darkened photo behind the hero text. It is decoration under a dark overlay, so it
 * waits until the page has loaded: the headline, the CSS and the fonts get the network
 * first, and the photo fades in a moment later. Before that the hero is plain night blue,
 * which keeps the white text readable.
 */
export function HeroPoster({ src }: { src: string }) {
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const go = () => setShow(true);
    if (document.readyState === "complete") {
      const t = window.setTimeout(go, 0);
      return () => window.clearTimeout(t);
    }
    window.addEventListener("load", go, { once: true });
    return () => window.removeEventListener("load", go);
  }, []);

  if (!show) return null;
  return (
    <Image
      src={src}
      alt=""
      fill
      quality={60}
      // A 16:9 photo cropped to cover. Under the overlay a phone needs far fewer pixels
      // than the screen has, so phones get a small file.
      sizes="(max-width: 767px) 480px, 100vw"
      onLoad={() => setLoaded(true)}
      className={`object-cover transition-opacity duration-700 ease-out-strong ${loaded ? "opacity-100" : "opacity-0"}`}
    />
  );
}
