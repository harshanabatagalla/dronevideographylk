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
  | "instagram"
  | "youtube"
  | "facebook"
  | "tiktok"
  | "arrow-right"
  | "menu"
  | "close"
  | "star"
  | "check";

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
