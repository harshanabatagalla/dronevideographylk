"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatLkr, lowestPrice, SERIES, windLabel, type ShopProduct, type ShopSeries } from "@/lib/shop";
import { Icon } from "@/components/ui/Icon";
import { ProductVisual } from "./ProductVisual";
import { AddToCartButton } from "./AddToCartButton";

type Sort = "price-asc" | "price-desc" | "newest";

export function ShopGrid({ products }: { products: ShopProduct[] }) {
  const [series, setSeries] = useState<ShopSeries | "all">("all");
  const [sort, setSort] = useState<Sort>("price-asc");

  const visible = useMemo(() => {
    const list = series === "all" ? products : products.filter((p) => p.series === series);
    const price = (p: ShopProduct) => lowestPrice(p) ?? Number.MAX_SAFE_INTEGER;
    return [...list].sort((a, b) =>
      sort === "price-asc" ? price(a) - price(b) : sort === "price-desc" ? price(b) - price(a) : b.released - a.released,
    );
  }, [products, series, sort]);

  const tab = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      active ? "bg-night text-white" : "bg-white text-night/70 ring-1 ring-night/10 hover:ring-night/30"
    }`;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by series">
          <button type="button" className={tab(series === "all")} onClick={() => setSeries("all")}>
            All ({products.length})
          </button>
          {SERIES.map((s) => (
            <button key={s.key} type="button" className={tab(series === s.key)} onClick={() => setSeries(s.key)}>
              {s.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-night/65">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-full border border-night/15 bg-white px-3 py-2 text-sm text-night focus:border-ocean focus:outline-none"
          >
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="newest">Newest first</option>
          </select>
        </label>
      </div>

      {series !== "all" && (
        <p className="mt-4 text-sm text-night/65">{SERIES.find((s) => s.key === series)?.blurb}</p>
      )}

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li key={p.slug}>
            <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-night/10 bg-white transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-night/5">
              <Link href={`/shop/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden">
                <ProductVisual product={p} />
                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-black/35 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                    {p.released}
                  </span>
                  {p.discontinued && (
                    <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-night">
                      No longer made
                    </span>
                  )}
                </div>
              </Link>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl font-semibold text-night">
                  <Link href={`/shop/${p.slug}`} className="hover:text-ocean">
                    {p.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-night/65">{p.headline}</p>

                <ul className="mt-4 space-y-1.5 text-sm text-night/70">
                  <li className="flex items-start gap-2">
                    <Icon name="wind" size={16} className="mt-0.5 shrink-0 text-ocean" />
                    Wind: {windLabel(p)}
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="clock" size={16} className="mt-0.5 shrink-0 text-ocean" />
                    {p.specs.find((s) => s.label === "Flight time")?.value}
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="camera" size={16} className="mt-0.5 shrink-0 text-ocean" />
                    {p.specs.find((s) => s.label === "Video")?.value}
                  </li>
                </ul>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-night/10 pt-4">
                  <div>
                    {(() => {
                      const from = lowestPrice(p);
                      const priced = p.variants?.find((v) => v.lkr === from);
                      return from ? (
                        <>
                          <p className="font-display text-2xl font-semibold text-night">{formatLkr(from)}</p>
                          <p className="text-xs text-night/65">{priced?.label}</p>
                        </>
                      ) : (
                        <>
                          <p className="font-display text-lg font-semibold text-night/70">Price on request</p>
                          <p className="text-xs text-night/65">Ask us for today&apos;s price</p>
                        </>
                      );
                    })()}
                  </div>
                  {(() => {
                    const from = lowestPrice(p);
                    const priced = p.variants?.find((v) => v.lkr === from);
                    return from && priced && p.inStock ? (
                      <AddToCartButton sku={`${p.slug}:${priced.id}`} size="sm" />
                    ) : (
                      <Link href={`/shop/${p.slug}`} className="tap text-sm font-semibold text-ocean hover:underline">
                        See details
                      </Link>
                    );
                  })()}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
