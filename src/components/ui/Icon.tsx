import type { SVGProps } from "react";

/**
 * Lightweight inline icon set — avoids shipping an icon library so the bundle
 * stays tiny and pages load fast (a stated project goal).
 */
export type IconName =
  | "clock"
  | "camera"
  | "signal"
  | "wind"
  | "mountain"
  | "sparkles"
  | "shield"
  | "play"
  | "map-pin"
  | "whatsapp"
  | "phone"
  | "mail"
  | "instagram"
  | "youtube"
  | "facebook"
  | "tiktok"
  | "arrow-right"
  | "menu"
  | "close"
  | "star"
  | "check"
  | "cart"
  | "plus"
  | "minus"
  | "trash"
  | "drone"
  | "travel-film"
  | "wedding"
  | "resort"
  | "surf"
  | "estate"
  | "landscape";

const paths: Record<IconName, React.ReactNode> = {
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  camera: (
    <>
      <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L19 6h0a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  signal: (
    <>
      <path d="M5 18a10 10 0 0 1 14 0" />
      <path d="M8.5 15a5 5 0 0 1 7 0" />
      <circle cx="12" cy="18" r="1" />
    </>
  ),
  wind: (
    <>
      <path d="M3 8h11a3 3 0 1 0-3-3" />
      <path d="M3 12h16a3 3 0 1 1-3 3" />
      <path d="M3 16h8a2.5 2.5 0 1 1-2.5 2.5" />
    </>
  ),
  mountain: (
    <>
      <path d="m3 19 6-11 4 7 2-3 6 7z" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6z" />
      <path d="M18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  play: <path d="M8 5.5v13l11-6.5z" />,
  "map-pin": (
    <>
      <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  whatsapp: (
    <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.6-1.2A9 9 0 1 0 12 3zm4.4 12.2c-.2.6-1.1 1.1-1.6 1.1-.4 0-.9.2-3-1s-3.3-3.6-3.5-3.8-1-1.3-1-2.5.6-1.8.9-2c.2-.3.5-.3.6-.3h.5c.2 0 .4 0 .6.5l.7 1.7c0 .2.1.3 0 .5l-.4.6c-.2.2-.3.4-.1.7s.7 1.2 1.5 1.9c1 .9 1.7 1.1 2 1.3s.4.1.6-.1l.7-.8c.2-.3.4-.2.6-.1l1.6.8c.2.1.4.2.4.3.1.2.1.7 0 1z" />
  ),
  phone: (
    <path d="M6.6 10.8a12 12 0 0 0 5.6 5.6l1.9-1.9c.3-.3.7-.4 1.1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .5 1 1V19c0 .6-.4 1-1 1A16 16 0 0 1 4 6c0-.6.4-1 1-1h2.7c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.3 1.1z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="16.5" cy="7.5" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3.5" />
      <path d="M10.5 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M14 8.5V7c0-.7.3-1 1-1h1.5V3.5H14c-2 0-3.5 1.3-3.5 3.4V8.5H8V11h2.5v9.5H14V11h2.2l.3-2.5z" />
  ),
  tiktok: (
    <path d="M14 4c.4 2 1.8 3.4 3.8 3.6v2.5c-1.4 0-2.7-.4-3.8-1.1v5.6a5 5 0 1 1-5-5c.3 0 .6 0 .9.1v2.6a2.4 2.4 0 1 0 1.7 2.3V4z" />
  ),
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  star: (
    <path
      d="m12 4 2.3 4.7 5.2.8-3.7 3.6.9 5.1L12 15.8 7.3 18.3l.9-5.1L4.5 9.5l5.2-.8z"
      fill="currentColor"
      stroke="none"
    />
  ),
  check: <path d="m5 12 4 4 10-10" />,
  cart: (
    <>
      <path d="M3 4h2l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2" />
      <circle cx="9.5" cy="19.5" r="1.3" />
      <circle cx="17" cy="19.5" r="1.3" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  drone: (
    <>
      <path d="M9.6 9.6 6.1 6.1M14.4 9.6l3.5-3.5M9.6 14.4l-3.5 3.5M14.4 14.4l3.5 3.5" />
      <rect x="9" y="9" width="6" height="6" rx="2" />
      <circle cx="4.6" cy="4.6" r="2.5" />
      <circle cx="19.4" cy="4.6" r="2.5" />
      <circle cx="4.6" cy="19.4" r="2.5" />
      <circle cx="19.4" cy="19.4" r="2.5" />
      <path d="M11 15.6h2" />
    </>
  ),
  "travel-film": (
    <>
      <ellipse strokeDasharray="1.8 2.4" cx="12" cy="16.6" rx="8.8" ry="3.7" />
      <path d="M12 3.2c2.2 0 3.9 1.8 3.9 3.9 0 2.9-3.9 6.8-3.9 6.8S8.1 10 8.1 7.1c0-2.1 1.7-3.9 3.9-3.9z" />
      <circle cx="12" cy="7.1" r="1.35" />
    </>
  ),
  "wedding": (
    <>
      <path strokeDasharray="1.8 2.4" d="M3.4 7.6c2.4-2.6 5.3-3.9 8.6-3.9s6.2 1.3 8.6 3.9" />
      <circle cx="9.4" cy="16.8" r="3.7" />
      <circle cx="15" cy="16.8" r="3.7" />
      <path d="M12.2 8.2l2 2.3-2 2.3-2-2.3z" />
    </>
  ),
  "resort": (
    <>
      <path strokeDasharray="1.8 2.4" d="M2.8 6c2.1-1.9 4.4-2.9 6.9-2.9" />
      <rect x="2.6" y="13" width="11.2" height="7.2" rx="2.6" />
      <path d="M5.1 16.9c1.2-1 2.3-1 3.5 0s2.3 1 3.5 0" />
      <path d="M18.8 20.2c.1-4.2.3-7.4.6-9.6" />
      <path d="M19.4 10.6c-1.4-1.8-3.4-2.2-5.4-1 .9-.1 1.9.2 2.9.9" />
      <path d="M19.4 10.6c1.2-1.9 3-2.4 4.2-1.4-.8.1-1.6.6-2.3 1.4" />
      <path d="M19.4 10.6c-.6-2.1 0-3.8 1.6-4.8-.3.9-.3 1.9 0 2.9" />
    </>
  ),
  "surf": (
    <>
      <path strokeDasharray="1.8 2.4" d="M2.6 5.4c2.3-1.7 4.8-2.5 7.4-2.5" />
      <path d="M2.8 18.4c3.6.2 6-1.4 7.6-4.4 1.6-3 3.6-4.8 6.4-4.8 2.6 0 4.5 1.6 5.4 4" />
      <path d="M22.2 13.2c-1.5-1-3.1-.8-4.3.6-.9 1-1.3 2.2-1.2 3.6" />
      <path d="M2.6 20.8c2.9 1.2 5.9 1.2 8.8 0s5.9-1.2 8.8 0" />
    </>
  ),
  "estate": (
    <>
      <path strokeDasharray="1.8 2.4" d="M3.4 6.6c2.5-2.4 5.4-3.6 8.6-3.6s5.9 1.2 8.4 3.5" />
      <path d="M6.2 20.4v-7.2l5.8-4.3 5.8 4.3v7.2z" />
      <path d="M10.2 20.4v-3.7h3.6v3.7" />
      <path d="M4.3 13.9 12 8.2l7.7 5.7" />
    </>
  ),
  "landscape": (
    <>
      <path strokeDasharray="1.8 2.4" d="M2.8 8.2c1.5-1.8 3.2-2.8 5.1-3" />
      <circle cx="17.6" cy="6.2" r="2.4" />
      <path d="M2.6 20.2l6-7.1 3.6 4.2 2.6-3 6.6 5.9z" />
      <path d="M8.6 13.1l2.2 7.1" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M9 7V4.5h6V7" />
      <path d="M6.5 7l1 12.5h9l1-12.5" />
    </>
  ),
};

export function Icon({
  name,
  size = 24,
  ...props
}: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
