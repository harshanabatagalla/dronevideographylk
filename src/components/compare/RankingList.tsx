"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ScoreRing } from "./ScoreRing";
import { AddToCompare } from "./CompareTray";

export type RankRow = {
  slug: string;
  name: string;
  short: string;
  series: string;
  released: number;
  current: boolean;
  under250: boolean;
  score: number;
  areas: { id: string; label: string; value: number }[];
  weight: string;
  weightG: number;
  flight: number;
  sensor: string;
  image?: string;
  /** Link to this drone's most useful comparison. */
  href: string;
  versus: string;
};

type Filter = "all" | "current" | "light" | string;
type Sort = "score" | "flight" | "weight" | "newest" | string;

/**
 * Every drone on the page, ranked by score. Filters and sort run in the browser; the
 * server renders the full list in score order, so it reads fine without JavaScript.
 */
export function RankingList({ rows, series }: { rows: RankRow[]; series: string[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("score");

  const list = useMemo(() => {
    const shown = rows.filter((r) =>
      filter === "all" ? true : filter === "current" ? r.current : filter === "light" ? r.under250 : r.series === filter,
    );
    const area = (r: RankRow) => r.areas.find((a) => a.id === sort)?.value ?? 0;
    return [...shown].sort((x, y) => {
      if (sort === "score") return y.score - x.score;
      if (sort === "flight") return y.flight - x.flight || y.score - x.score;
      if (sort === "weight") return x.weightG - y.weightG || y.score - x.score;
      if (sort === "newest") return y.released - x.released || y.score - x.score;
      return area(y) - area(x) || y.score - x.score;
    });
  }, [rows, filter, sort]);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All drones" },
    { id: "current", label: "Still made" },
    { id: "light", label: "Under 250 g" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div role="group" aria-label="Filter the ranking" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                filter === f.id ? "border-night bg-night text-white" : "border-night/20 text-night hover:border-night/50"
              }`}
            >
              {f.label}
            </button>
          ))}
          <label className="sr-only" htmlFor="rank-series">Series</label>
          <select
            id="rank-series"
            value={series.includes(filter) ? filter : ""}
            onChange={(e) => setFilter(e.target.value || "all")}
            className="rounded-lg border border-night/20 bg-white px-3 py-2 text-sm text-night"
          >
            <option value="">Any series</option>
            {series.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm text-night/70">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-night/20 bg-white px-3 py-2 text-sm text-night"
          >
            <option value="score">Overall score</option>
            {rows[0]?.areas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label} score
              </option>
            ))}
            <option value="flight">Longest flight time</option>
            <option value="weight">Lightest first</option>
            <option value="newest">Newest first</option>
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-night/65" aria-live="polite">
        {list.length} {list.length === 1 ? "drone" : "drones"}
      </p>

      <ol className="mt-3 divide-y divide-night/10 rounded-3xl border border-night/10 bg-white">
        {list.map((r, i) => (
          <li key={r.slug} className="grid grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 p-4 sm:grid-cols-[2rem_4.5rem_minmax(0,1fr)_auto] sm:px-6 lg:grid-cols-[2rem_5rem_minmax(0,1.2fr)_minmax(0,1fr)_auto_auto]">
            <span className="num font-display text-lg font-semibold text-night/70">{i + 1}</span>
            <span className="relative hidden aspect-[4/3] overflow-hidden rounded-lg bg-night-700 sm:block">
              {r.image ? (
                <Image src={r.image} alt="" fill sizes="80px" quality={60} className="object-cover" />
              ) : (
                <span aria-hidden="true" className="grid h-full place-items-center text-xs font-semibold text-white/70">DJI</span>
              )}
            </span>
            <div className="min-w-0">
              <Link href={r.href} className="font-display text-lg font-semibold text-night hover:text-ocean">
                {r.name}
              </Link>
              <p className="text-sm text-night/65">
                {r.released}
                {r.current ? "" : ", no longer made"}. {r.weight}, {r.flight} min, {r.sensor} sensor
              </p>
              <p className="text-sm">
                <Link href={r.href} className="text-ocean hover:underline">
                  Compare with the {r.versus}
                </Link>
              </p>
            </div>
            <div className="col-span-3 grid grid-cols-5 gap-2 sm:col-span-4 lg:col-span-1 lg:col-start-4 lg:row-start-1">
              {r.areas.map((a) => (
                <div key={a.id} title={`${a.label}: ${a.value} out of 100`}>
                  <span className="block truncate text-xs text-night/65">{a.label}</span>
                  <span className="mt-1 block h-1.5 overflow-hidden rounded bg-night/10" aria-hidden="true">
                    <span className="block h-full rounded bg-ocean" style={{ width: `${Math.max(3, a.value)}%` }} />
                  </span>
                  <span className="num text-xs font-semibold text-night/80">{a.value}</span>
                </div>
              ))}
            </div>
            <div className="col-start-3 row-start-1 sm:col-start-4 lg:col-start-5">
              <ScoreRing value={r.score} size={52} label={`${r.name} score`} />
            </div>
            <div className="col-span-3 sm:col-span-4 lg:col-span-1 lg:col-start-6 lg:row-start-1">
              <AddToCompare slug={r.slug} name={r.name} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
