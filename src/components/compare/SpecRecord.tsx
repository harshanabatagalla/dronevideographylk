import { areaScores, GROUPS, rows, type AreaId, type CompareDrone } from "@/lib/compare";
import { TONE } from "./colors";

/**
 * Every spec, grouped by area. Each group says which drone leads it, each row marks
 * the better value and draws how far apart the two are. Tapping a spec name opens a
 * short explanation. Built from <details>, so it all works without JavaScript and every
 * word is in the page source.
 */
export function SpecRecord({ a, b }: { a: CompareDrone; b: CompareDrone }) {
  const all = rows(a, b);
  const sa = areaScores(a);
  const sb = areaScores(b);
  return (
    <div className="space-y-4">
      {GROUPS.map((g, i) => {
        const list = all.filter((r) => r.spec.group === g.id);
        const scored = g.id !== "about";
        const as = scored ? sa[g.id as AreaId] : 0;
        const bs = scored ? sb[g.id as AreaId] : 0;
        const lead = !scored ? null : as === bs ? "Level" : as > bs ? `${a.short} leads, ${as} to ${bs}` : `${b.short} leads, ${bs} to ${as}`;
        const leadTone = !scored || as === bs ? "text-night/70" : as > bs ? "text-ocean" : "text-sunset-ink";
        return (
          <details key={g.id} open className="group rounded-3xl border border-night/10 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-xl font-semibold text-night">
                {i + 1}. {g.label}
              </h3>
              <span className="flex items-center gap-3">
                {lead && <span className={`text-sm font-semibold ${leadTone}`}>{lead}</span>}
                <span aria-hidden="true" className="text-2xl font-light leading-none text-ocean transition-transform duration-200 ease-out-strong group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>

            <div role="table" aria-label={`${g.label}: ${a.name} and ${b.name}`} className="border-t border-night/10 text-sm">
              <div role="row" className="hidden grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_10rem] gap-4 px-6 py-3 text-night/65 sm:grid">
                <span role="columnheader">Spec</span>
                <span role="columnheader" className="text-ocean">{a.short}</span>
                <span role="columnheader" className="text-sunset-ink">{b.short}</span>
                <span role="columnheader" className="text-right">Difference</span>
              </div>
              <div className="divide-y divide-night/10 sm:border-t sm:border-night/10">
                {list.map((r) => (
                  <div
                    role="row"
                    key={r.spec.id}
                    className="grid grid-cols-2 gap-x-4 gap-y-1.5 px-5 py-3.5 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_10rem] sm:items-start sm:gap-4 sm:px-6"
                  >
                    <div role="rowheader" className="col-span-2 sm:col-span-1">
                      <details className="group/help">
                        <summary className="inline cursor-pointer list-none text-night/80 underline decoration-night/30 decoration-dotted underline-offset-4 hover:decoration-night [&::-webkit-details-marker]:hidden">
                          {r.spec.label}
                        </summary>
                        <p className="mt-2 max-w-sm text-night/70">{r.spec.help}</p>
                      </details>
                    </div>
                    {(["a", "b"] as const).map((side) => (
                      <div role="cell" key={side} className="min-w-0">
                        <span className="sr-only">{side === "a" ? a.short : b.short}: </span>
                        <span className={r.winner === side ? "font-semibold text-night" : "text-night/70"}>
                          {r[side]}
                        </span>
                      </div>
                    ))}
                    <div role="cell" className="col-span-2 sm:col-span-1 sm:text-right">
                      {r.winner && (
                        <span className="flex items-center gap-2 sm:justify-end">
                          <span aria-hidden="true" className="h-1.5 w-12 shrink-0 overflow-hidden rounded bg-night/10">
                            <span
                              className="block h-full rounded"
                              style={{ width: `${Math.max(8, Math.round(r.gap * 100))}%`, background: TONE[r.winner].fill }}
                            />
                          </span>
                          <span className={`text-xs font-semibold ${r.winner === "a" ? "text-ocean" : "text-sunset-ink"}`}>
                            <span className="sr-only">{r.winner === "a" ? a.short : b.short} is better{r.margin ? ", " : ""}</span>
                            {r.margin || "better"}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
}
