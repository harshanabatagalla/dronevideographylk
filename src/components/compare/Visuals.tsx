import type { ReactNode } from "react";
import { SENSORS, sensorArea, sensingLabel, under250, weightLabel, type CompareDrone } from "@/lib/compare";
import { TONE, type Side } from "./colors";

/**
 * Drawings that show a difference instead of listing it: sensor and folded size to
 * scale, weight against the 250 g line, flight time, and which sides sense obstacles.
 * Every shape comes straight from the spec data.
 */
export function VisualCompare({ a, b }: { a: CompareDrone; b: CompareDrone }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card title="Camera sensor, to scale" caption={sensorCaption(a, b)}>
        <SensorDrawing a={a} b={b} />
      </Card>
      <Card title="Folded size from above, to scale" caption="Drawn at the same scale on every comparison, with a bank card beside them.">
        <SizeDrawing a={a} b={b} />
      </Card>
      <Card title="Weight and the 250 g line" caption="Takeoff weight with the standard battery. Every camera drone must be registered with CAASL, whatever it weighs.">
        <WeightLine a={a} b={b} />
      </Card>
      <Card title="Time in the air on one battery" caption="DJI's figures, with no wind. Plan on about three quarters of it when you fly.">
        <FlightBars a={a} b={b} />
      </Card>
      <div className="md:col-span-2">
        <Card title="Where each drone sees obstacles" caption="Seen from above, front at the top. A filled side has obstacle sensors.">
          <SensingDrawing a={a} b={b} />
        </Card>
      </div>
    </div>
  );
}

function Card({ title, caption, children }: { title: string; caption: string; children: ReactNode }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-night/10 bg-white p-5 sm:p-6">
      <h3 className="font-display text-lg font-semibold text-night">{title}</h3>
      <div className="mt-4 flex-1">{children}</div>
      <figcaption className="mt-4 text-sm text-night/70">{caption}</figcaption>
    </figure>
  );
}

function Key({ d, side, children }: { d: CompareDrone; side: Side; children: ReactNode }) {
  return (
    <p className="flex items-baseline gap-2 text-sm">
      <span aria-hidden="true" className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: TONE[side].fill }} />
      <span>
        <span className={`font-semibold ${side === "a" ? "text-ocean" : "text-sunset-ink"}`}>{d.short}</span>{" "}
        <span className="text-night/75">{children}</span>
      </span>
    </p>
  );
}

/* ------------------------------ Sensor ------------------------------ */

function sensorCaption(a: CompareDrone, b: CompareDrone): string {
  const ra = sensorArea(a);
  const rb = sensorArea(b);
  if (a.sensor === b.sensor) return "Both use the same size of sensor. Sizes are close approximations of each sensor type.";
  const [big, small, r] = ra > rb ? [a, b, ra / rb] : [b, a, rb / ra];
  return `The ${big.short} sensor has about ${Math.round(r * 10) / 10} times the area of the ${small.short} sensor. Sizes are close approximations of each sensor type.`;
}

function SensorDrawing({ a, b }: { a: CompareDrone; b: CompareDrone }) {
  const k = 170 / SENSORS["4/3"].w;
  const base = 142;
  const shapes = ([["a", a], ["b", b]] as [Side, CompareDrone][])
    .map(([side, d]) => ({ side, d, w: SENSORS[d.sensor].w * k, h: SENSORS[d.sensor].h * k }))
    .sort((x, y) => y.w * y.h - x.w * x.h);
  const same = a.sensor === b.sensor;
  // The biggest sensor on our list, as a faint outline, so small sensors still have a size to read against.
  const ref = SENSORS["4/3"];
  const showRef = a.sensor !== "4/3" && b.sensor !== "4/3";
  return (
    <div>
      <svg viewBox="0 0 190 150" className="h-auto w-full max-w-xs" role="img" aria-label={`Sensor sizes: ${a.short} ${SENSORS[a.sensor].label}, ${b.short} ${SENSORS[b.sensor].label}`}>
        {showRef && (
          <g>
            <rect x={8} y={base - ref.h * k} width={ref.w * k} height={ref.h * k} rx="1.5" fill="none" stroke={TONE.night} strokeOpacity="0.3" strokeDasharray="3 3" />
            <text x={13} y={base - ref.h * k + 11} fontSize="8" fill={TONE.night} fillOpacity="0.6">
              4/3 inch, as in a Mavic, for scale
            </text>
          </g>
        )}
        {shapes.map((s, i) => (
          <rect
            key={s.side}
            x={8}
            y={base - s.h}
            width={s.w}
            height={s.h}
            rx="1.5"
            fill={TONE[s.side].fill}
            fillOpacity={same ? 0.12 : 0.14 + i * 0.06}
            stroke={TONE[s.side].ink}
            strokeWidth="1.2"
            strokeDasharray={same && i === 1 ? "4 3" : undefined}
          />
        ))}
      </svg>
      <div className="mt-3 space-y-1">
        <Key d={a} side="a">{SENSORS[a.sensor].label}, about {Math.round(sensorArea(a))} mm²</Key>
        <Key d={b} side="b">{SENSORS[b.sensor].label}, about {Math.round(sensorArea(b))} mm²</Key>
      </div>
    </div>
  );
}

/* ------------------------------ Size ------------------------------ */

function SizeDrawing({ a, b }: { a: CompareDrone; b: CompareDrone }) {
  // Top view: width across, length front to back.
  // One millimetre is the same length on every page, so a Mini and a Mavic look as different as they are.
  const card = { w: 54, l: 86 };
  const k = 0.5;
  const gap = 14;
  const maxL = Math.max(a.size[0], b.size[0], card.l);
  const items: { key: string; x: number; w: number; l: number; side?: Side }[] = [];
  let x = 2;
  for (const [side, d] of [["a", a], ["b", b]] as [Side, CompareDrone][]) {
    items.push({ key: side, x, w: d.size[1] * k, l: d.size[0] * k, side });
    x += d.size[1] * k + gap;
  }
  items.push({ key: "card", x, w: card.w * k, l: card.l * k });
  const width = x + card.w * k + 2;
  const height = maxL * k + 4;
  const line = (d: CompareDrone) => `${d.size[0]} × ${d.size[1]} mm from above, ${d.size[2]} mm tall${d.folds ? "" : ", does not fold"}`;
  return (
    <div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width * 2}
        height={height * 2}
        className="h-auto max-w-full"
        role="img"
        aria-label={`Folded size: ${a.short} ${a.size.join(" by ")} mm, ${b.short} ${b.size.join(" by ")} mm`}
      >
        {items.map((it) => (
          <rect
            key={it.key}
            x={it.x}
            y={2 + maxL * k - it.l}
            width={it.w}
            height={it.l}
            rx={it.side ? 6 : 3}
            fill={it.side ? TONE[it.side].fill : "none"}
            fillOpacity={it.side ? 0.15 : 0}
            stroke={it.side ? TONE[it.side].ink : TONE.night}
            strokeOpacity={it.side ? 1 : 0.45}
            strokeWidth="1.2"
            strokeDasharray={it.side ? undefined : "3 2"}
          />
        ))}
      </svg>
      <div className="mt-3 space-y-1">
        <Key d={a} side="a">{line(a)}</Key>
        <Key d={b} side="b">{line(b)}</Key>
        <p className="flex items-baseline gap-2 text-sm text-night/75">
          <span aria-hidden="true" className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm border border-dashed border-night/50" />
          Bank card, 86 × 54 mm
        </p>
      </div>
    </div>
  );
}

/* ------------------------------ Weight ------------------------------ */

function WeightLine({ a, b }: { a: CompareDrone; b: CompareDrone }) {
  const max = Math.max(1100, a.weightG, b.weightG);
  const pos = (g: number) => `${(g / max) * 100}%`;
  // Labels on the right half end at their tick, labels on the left half start at it,
  // so a heavy drone's label never runs past the card edge on a phone.
  const marker = (d: CompareDrone, side: Side, above: boolean) => {
    const share = d.weightG / max;
    const anchor = share > 0.5 ? { right: `${(1 - share) * 100}%` } : { left: pos(d.weightG) };
    const vertical = above ? { top: 0 } : { bottom: 0 };
    return (
      <>
        <p
          className={`absolute whitespace-nowrap text-xs font-semibold ${side === "a" ? "text-ocean" : "text-sunset-ink"} ${
            share > 0.5 ? "text-right" : ""
          }`}
          style={{ ...anchor, ...vertical }}
        >
          {d.short}, {weightLabel(d)}
        </p>
        <span
          aria-hidden="true"
          className="absolute block h-8 w-0.5 -translate-x-1/2"
          style={{ left: pos(d.weightG), background: TONE[side].ink, ...(above ? { top: "1.25rem" } : { bottom: "1.25rem" }) }}
        />
      </>
    );
  };
  return (
    <div>
      <div className="relative h-28" role="img" aria-label={`Weight: ${a.short} ${weightLabel(a)}, ${b.short} ${weightLabel(b)}. The insurance line is 250 g.`}>
        {marker(a, "a", true)}
        {marker(b, "b", false)}
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded bg-night/10">
          <div className="h-full rounded-l bg-teal/35" style={{ width: pos(250) }} />
        </div>
        <span aria-hidden="true" className="absolute top-1/2 h-6 w-0.5 -translate-y-1/2 bg-night/60" style={{ left: pos(250) }} />
        {[a, b].map((d, i) => (
          <span
            key={d.slug}
            aria-hidden="true"
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
            style={{ left: pos(d.weightG), background: TONE[i === 0 ? "a" : "b"].ink }}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-night/65">
        <span>0 g</span>
        <span>250 g line</span>
        <span>{max.toLocaleString("en-US")} g</span>
      </div>
      <p className="mt-3 text-sm text-night/75">
        {under250(a) && under250(b)
          ? "Both are under 250 g, so neither needs drone insurance in Sri Lanka."
          : !under250(a) && !under250(b)
            ? "Both are 250 g or more, so both need public liability insurance in Sri Lanka."
            : `Only the ${(under250(a) ? a : b).short} is under 250 g. The ${(under250(a) ? b : a).short} needs public liability insurance in Sri Lanka.`}
        {[a, b].some((d) => under250(d) && d.plusOver250) && " The larger Plus battery takes a Mini or Lito over 250 g."}
      </p>
    </div>
  );
}

/* ------------------------------ Flight time ------------------------------ */

function FlightBars({ a, b }: { a: CompareDrone; b: CompareDrone }) {
  const max = 60;
  const bar = (d: CompareDrone, side: Side) => (
    <div>
      <p className="flex items-baseline justify-between gap-3 text-sm">
        <span className={`font-semibold ${side === "a" ? "text-ocean" : "text-sunset-ink"}`}>{d.short}</span>
        <span className="num text-night/80">
          {d.flightMin} min{d.flightMinPlus ? `, ${d.flightMinPlus} with the Plus battery` : ""}
        </span>
      </p>
      <div className="relative mt-1.5 h-3 rounded bg-night/8" aria-hidden="true">
        {d.flightMinPlus && (
          <div className="absolute inset-y-0 left-0 rounded" style={{ width: `${(d.flightMinPlus / max) * 100}%`, background: TONE[side].fill, opacity: 0.3 }} />
        )}
        <div className="absolute inset-y-0 left-0 rounded" style={{ width: `${(d.flightMin / max) * 100}%`, background: TONE[side].fill }} />
      </div>
      <p className="mt-1 text-xs text-night/65">About {Math.round(d.flightMin * 0.75)} min of real flying per battery</p>
    </div>
  );
  return (
    <div className="space-y-5">
      {bar(a, "a")}
      {bar(b, "b")}
      <div className="flex justify-between text-xs text-night/65" aria-hidden="true">
        <span>0</span>
        <span>30 min</span>
        <span>60 min</span>
      </div>
    </div>
  );
}

/* ------------------------------ Sensing ------------------------------ */

function SensingDrawing({ a, b }: { a: CompareDrone; b: CompareDrone }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {([["a", a], ["b", b]] as [Side, CompareDrone][]).map(([side, d]) => (
        <div key={side} className="flex items-center gap-4">
          <TopView d={d} side={side} />
          <div className="text-sm">
            <p className={`font-semibold ${side === "a" ? "text-ocean" : "text-sunset-ink"}`}>{d.short}</p>
            <p className="mt-1 text-night/80">{sensingLabel(d)}</p>
            <p className="mt-1 text-night/65">
              Above: {d.sensing.up ? "yes" : "no"}. Below: {d.sensing.down ? "yes" : "no"}.
            </p>
            {d.lidar && <p className="mt-1 text-night/65">LiDAR at the front for low light.</p>}
            {d.guards && <p className="mt-1 text-night/65">Covered propellers.</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

function TopView({ d, side }: { d: CompareDrone; side: Side }) {
  const on = TONE[side].fill;
  const off = TONE.night;
  const arc = (path: string, active: boolean) => (
    <path d={path} fill="none" stroke={active ? on : off} strokeOpacity={active ? 1 : 0.15} strokeWidth="6" strokeLinecap="round" />
  );
  return (
    <svg viewBox="0 0 100 100" className="h-28 w-28 shrink-0" role="img" aria-label={`${d.short} obstacle sensing: ${sensingLabel(d)}`}>
      {arc("M30 14 A44 44 0 0 1 70 14", d.sensing.front)}
      {arc("M30 86 A44 44 0 0 0 70 86", d.sensing.back)}
      {arc("M14 30 A44 44 0 0 0 14 70", d.sensing.sides)}
      {arc("M86 30 A44 44 0 0 1 86 70", d.sensing.sides)}
      <g stroke={TONE.night} strokeOpacity="0.55" strokeWidth="2" fill="none">
        <path d="M42 42 30 30M58 42 70 30M42 58 30 70M58 58 70 70" />
        <circle cx="30" cy="30" r="7" />
        <circle cx="70" cy="30" r="7" />
        <circle cx="30" cy="70" r="7" />
        <circle cx="70" cy="70" r="7" />
      </g>
      <rect x="40" y="38" width="20" height="24" rx="6" fill={TONE.night} fillOpacity="0.85" />
      <circle cx="50" cy="40" r="3" fill="#ffffff" />
      {d.sensing.down && <circle cx="50" cy="52" r="3.5" fill={on} />}
    </svg>
  );
}
