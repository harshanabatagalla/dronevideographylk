/** The mark on its own: a drone seen from above (four rotors around a body) on an amber tile. */
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
      <rect width="32" height="32" rx="7" fill="#f59e0b" />
      <g fill="none" stroke="#0b1f2a" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="8.5" cy="8.5" r="3.3" />
        <circle cx="23.5" cy="8.5" r="3.3" />
        <circle cx="8.5" cy="23.5" r="3.3" />
        <circle cx="23.5" cy="23.5" r="3.3" />
        <path d="M11 11l2.2 2.2M21 11l-2.2 2.2M11 21l2.2-2.2M21 21l-2.2-2.2" strokeWidth="2" />
      </g>
      <rect x="12.5" y="12.5" width="7" height="7" rx="2" fill="#0b1f2a" />
    </svg>
  );
}

/** Mark plus the name. Used inside a link in the header, the footer and on error pages. */
export function Logo({ size = 36 }: { size?: number }) {
  return (
    <>
      <LogoMark size={size} />
      <span className="font-display text-lg font-semibold tracking-tight">
        dronevideography<span className="text-sunset">.lk</span>
      </span>
    </>
  );
}
