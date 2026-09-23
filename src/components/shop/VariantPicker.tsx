"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { formatLkr, type ShopProduct } from "@/lib/shop";
import { whatsappHref } from "@/lib/site";
import { AddToCartButton } from "./AddToCartButton";

/**
 * Kit chooser on a drone page: Standard or Fly More Combo. Only kits with a
 * confirmed rupee price can be ordered; the rest send the visitor to WhatsApp.
 */
export function VariantPicker({ product }: { product: ShopProduct }) {
  const variants = product.variants ?? [];
  const firstPriced = variants.findIndex((v) => typeof v.lkr === "number");
  const [active, setActive] = useState(firstPriced >= 0 ? firstPriced : 0);
  const chosen = variants[active];

  return (
    <div className="mt-6 rounded-2xl border border-night/10 bg-white p-5">
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-night">Choose your kit</legend>
        <div className="space-y-2">
          {variants.map((v, i) => (
            <label
              key={v.id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${
                i === active ? "border-ocean bg-ocean/5" : "border-night/15 hover:border-night/30"
              }`}
            >
              <input
                type="radio"
                name="kit"
                checked={i === active}
                onChange={() => setActive(i)}
                className="mt-1 accent-ocean"
              />
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-semibold text-night">{v.label}</span>
                  <span className="font-display text-lg font-semibold text-night">
                    {typeof v.lkr === "number" ? formatLkr(v.lkr) : <span className="text-sm font-normal text-night/50">Price on request</span>}
                  </span>
                </span>
                <span className="mt-0.5 block text-sm text-night/60">{v.includes}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {typeof chosen?.lkr === "number" && product.inStock ? (
          <AddToCartButton sku={`${product.slug}:${chosen.id}`} />
        ) : null}
        <a
          href={whatsappHref(
            `Hi! I would like the price and stock for the ${product.name} (${chosen?.label ?? "Standard"}).`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-night/15 px-5 py-3 text-sm font-semibold text-night transition hover:border-night/40"
        >
          <Icon name="whatsapp" size={18} /> Ask about price and stock
        </a>
      </div>

      <p className="mt-4 text-xs text-night/50">
        Prices follow the DJI distributor in Sri Lanka and can change. We confirm the final price and
        delivery before you pay. Payment is by bank transfer or cash on delivery.
      </p>
    </div>
  );
}
