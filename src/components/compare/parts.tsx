import Link from "next/link";
import { comparePath, drones, getCompareDrone, score, type CompareDrone } from "@/lib/compare";
import type { Series } from "@/lib/compare-data";
import { formatLkr, getProduct, lowestPrice } from "@/lib/shop";
import { getDrone } from "@/lib/content";
import type { PickerOption } from "./ComparePicker";
import { DroneThumb } from "./DroneThumb";
import { ScoreRing } from "./ScoreRing";

const SERIES_ORDER: Series[] = ["Mini", "Lito", "Flip", "Air", "Mavic", "Avata"];

/** Menu options for the drone picker, grouped by series, newest first in each group. */
export function pickerOptions(): PickerOption[] {
  return SERIES_ORDER.flatMap((s) =>
    drones
      .filter((d) => d.series === s)
      .sort((x, y) => Number(y.current) - Number(x.current) || y.released - x.released)
      .map((d) => ({ slug: d.slug, name: d.name, group: `${s} series` })),
  );
}

export const seriesList = () => SERIES_ORDER.filter((s) => drones.some((d) => d.series === s));

/** Our shop page for this drone and its price line, when we sell it. */
export function shopInfo(d: CompareDrone): { href: string; price: string } | null {
  const p = getProduct(d.slug);
  if (!p) return null;
  const from = lowestPrice(p);
  return { href: `/shop/${p.slug}`, price: from ? `from ${formatLkr(from)}` : "ask us for today's price" };
}

/** Our fleet page, when we fly this drone on paid shoots. */
export function fleetHref(d: CompareDrone): string | null {
  return getDrone(d.slug) ? `/fleet/${d.slug}` : null;
}

/** Cards for comparison pairs: two photos, the names and both scores. */
export function PairCards({ pairs }: { pairs: [string, string][] }) {
  const items = pairs
    .map(([x, y]) => [getCompareDrone(x), getCompareDrone(y)] as const)
    .filter((p): p is readonly [CompareDrone, CompareDrone] => Boolean(p[0] && p[1]));
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(([a, b]) => (
        <li key={`${a.slug}|${b.slug}`}>
          <Link
            href={comparePath(a.slug, b.slug)}
            className="group block h-full rounded-3xl border border-night/10 bg-white p-4 transition-colors duration-150 hover:border-ocean/40"
          >
            <span className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
              <span className="relative block aspect-[4/3] overflow-hidden rounded-xl">
                <DroneThumb drone={a} sizes="(max-width: 640px) 40vw, 160px" />
              </span>
              <span className="font-display text-sm text-night/70">vs</span>
              <span className="relative block aspect-[4/3] overflow-hidden rounded-xl">
                <DroneThumb drone={b} sizes="(max-width: 640px) 40vw, 160px" />
              </span>
            </span>
            <span className="mt-3 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-3">
              <span className="min-w-0">
                <span className="block font-semibold leading-snug text-ocean group-hover:underline">{a.short}</span>
                <span className="num text-sm text-night/65">{score(a)} points</span>
              </span>
              <span />
              <span className="min-w-0 text-right">
                <span className="block font-semibold leading-snug text-sunset-ink group-hover:underline">{b.short}</span>
                <span className="num text-sm text-night/65">{score(b)} points</span>
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Small card for one drone, with its score, used for "other drones to compare". */
export function DroneMini({ d, href, cta }: { d: CompareDrone; href: string; cta: string }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-night/10 bg-white p-4">
      <span className="relative block aspect-[4/3] overflow-hidden rounded-xl">
        <DroneThumb drone={d} sizes="(max-width: 640px) 45vw, 200px" />
      </span>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold leading-snug text-night">{d.short}</p>
          <p className="text-sm text-night/65">
            {d.released}
            {d.current ? "" : ", no longer made"}
          </p>
        </div>
        <ScoreRing value={score(d)} size={44} label={`${d.name} score`} />
      </div>
      <Link href={href} className="mt-3 text-sm font-semibold text-ocean hover:underline">
        {cta}
      </Link>
    </div>
  );
}
