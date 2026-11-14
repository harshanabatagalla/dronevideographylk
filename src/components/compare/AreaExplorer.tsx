"use client";

import { useState } from "react";
import { TONE } from "./colors";

export type DiffItem = { label: string; a: string; b: string; winner: "a" | "b"; margin: string };
export type AreaPoint = { id: string; label: string; a: number; b: number };

/**
 * Five sided chart of the area scores for two drones, with the area names as buttons.
 * Choosing an area shows that area's biggest differences in the table beside it.
 * Everything shown here is worked out on the server and passed in as plain text.
 */
export function AreaExplorer({
  aName,
  bName,
  areas,
  lists,
}: {
  aName: string;
  bName: string;
  areas: AreaPoint[];
  lists: Record<string, DiffItem[]>;
}) {
  const [area, setArea] = useState<string>("all");
  const items = lists[area] ?? [];
  const current = areas.find((x) => x.id === area);

  const R = 28;
  const n = areas.length;
  const angle = (i: number) => (-90 + (360 / n) * i) * (Math.PI / 180);
  const point = (i: number, v: number) => {
    const r = R * Math.max(0.04, v / 100);
    return [50 + r * Math.cos(angle(i)), 50 + r * Math.sin(angle(i))];
  };
  const poly = (side: "a" | "b") => areas.map((x, i) => point(i, x[side]).join(",")).join(" ");
  const ring = (f: number) => areas.map((_, i) => point(i, f * 100).join(",")).join(" ");

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
      <div>
        <p className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm font-medium">
          <span className="flex items-center gap-2 text-ocean">
            <span aria-hidden="true" className="h-0.5 w-5 bg-ocean" />
            {aName}
          </span>
          <span className="flex items-center gap-2 text-sunset-ink">
            <span aria-hidden="true" className="h-0.5 w-5 bg-sunset" />
            {bName}
          </span>
        </p>
        <div className="relative mx-auto mt-2 aspect-square w-full max-w-sm">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {[0.25, 0.5, 0.75, 1].map((f) => (
              <polygon key={f} points={ring(f)} fill="none" stroke={TONE.night} strokeOpacity="0.12" strokeWidth="0.3" />
            ))}
            {areas.map((_, i) => {
              const [x, y] = point(i, 100);
              return <line key={i} x1="50" y1="50" x2={x} y2={y} stroke={TONE.night} strokeOpacity="0.12" strokeWidth="0.3" />;
            })}
            <polygon points={poly("b")} fill={TONE.b.fill} fillOpacity="0.16" stroke={TONE.b.ink} strokeWidth="0.7" strokeLinejoin="round" />
            <polygon points={poly("a")} fill={TONE.a.fill} fillOpacity="0.16" stroke={TONE.a.ink} strokeWidth="0.7" strokeLinejoin="round" />
          </svg>
          {areas.map((x, i) => {
            const lx = 50 + 41 * Math.cos(angle(i));
            const ly = 50 + 41 * Math.sin(angle(i));
            const active = area === x.id;
            return (
              <button
                key={x.id}
                type="button"
                aria-pressed={active}
                onClick={() => setArea(active ? "all" : x.id)}
                style={{ left: `${lx}%`, top: `${ly}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md px-2 py-1 text-center text-sm leading-tight transition-colors duration-150 ${
                  active ? "bg-night text-white" : "text-night hover:bg-night/5"
                }`}
              >
                <span className="block font-semibold">{x.label}</span>
                <span className="num block text-xs">
                  <span className={active ? "text-ocean-light" : "text-ocean"}>{x.a}</span>{" "}
                  <span className={active ? "text-white/75" : "text-night/70"}>to</span>{" "}
                  <span className={active ? "text-sunset" : "text-sunset-ink"}>{x.b}</span>
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-center text-sm text-night/70">
          {area === "all" ? (
            "Tap an area to see its biggest differences."
          ) : (
            <button type="button" onClick={() => setArea("all")} className="font-semibold text-ocean hover:underline">
              Show all areas again
            </button>
          )}
        </p>
      </div>

      <div className="rounded-3xl border border-night/10 bg-white">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-night/10 px-5 py-4">
          <h3 className="font-display text-xl font-semibold text-night">
            Biggest differences{current ? `: ${current.label}` : ""}
          </h3>
          <a href="#record" className="text-sm font-semibold text-ocean hover:underline">
            Every spec
          </a>
        </div>
        {items.length ? (
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Biggest differences between the {aName} and the {bName}
            </caption>
            <thead>
              <tr className="text-night/65">
                <th scope="col" className="px-5 py-3 font-medium">Spec</th>
                <th scope="col" className="px-3 py-3 font-medium text-ocean">{aName}</th>
                <th scope="col" className="px-5 py-3 font-medium text-sunset-ink">{bName}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-night/10 border-t border-night/10">
              {items.map((it) => (
                <tr key={it.label} className="align-top">
                  <th scope="row" className="px-5 py-3 font-medium text-night/80">{it.label}</th>
                  {(["a", "b"] as const).map((side) => (
                    <td key={side} className={`${side === "a" ? "px-3" : "px-5"} py-3`}>
                      <span className={it.winner === side ? "font-semibold text-night" : "text-night/65"}>{it[side]}</span>
                      {it.winner === side && it.margin && (
                        <span className={`mt-0.5 block text-xs font-semibold ${side === "a" ? "text-ocean" : "text-sunset-ink"}`}>
                          {it.margin}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="px-5 py-6 text-night/70">These two drones are level in this area.</p>
        )}
      </div>
    </div>
  );
}
