import { TONE } from "./colors";

/**
 * Score out of 100 drawn as a ring. The ring is a gauge, so a circle is the right shape.
 * `tone` picks the comparison colour: "a" is ocean, "b" is amber, "plain" is the neutral ink.
 */
export function ScoreRing({
  value,
  tone = "plain",
  dark = false,
  size = 64,
  label = "Score",
}: {
  value: number;
  tone?: "a" | "b" | "plain";
  dark?: boolean;
  size?: number;
  label?: string;
}) {
  const stroke =
    tone === "plain" ? (dark ? "#ffffff" : TONE.night) : dark ? TONE[tone].light : TONE[tone].ink;
  const ink = dark ? "#ffffff" : TONE.night;
  return (
    <svg
      viewBox="0 0 36 36"
      width={size}
      height={size}
      role="img"
      aria-label={`${label}: ${value} out of 100`}
      className="shrink-0"
    >
      <circle cx="18" cy="18" r="15.9155" fill="none" stroke={ink} strokeOpacity="0.15" strokeWidth="2.6" />
      <circle
        cx="18"
        cy="18"
        r="15.9155"
        fill="none"
        stroke={stroke}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeDasharray={`${Math.max(0, Math.min(100, value))} 100`}
        transform="rotate(-90 18 18)"
      />
      <text
        x="18"
        y="18"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill={ink}
        className="num font-display"
      >
        {value}
      </text>
    </svg>
  );
}
