"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useCart } from "./CartProvider";

export function AddToCartButton({
  sku,
  disabled = false,
  size = "md",
}: {
  sku: string;
  disabled?: boolean;
  size?: "sm" | "md";
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  if (disabled) {
    return (
      <span className="inline-flex min-h-10 items-center rounded-full bg-night/10 px-5 py-2.5 text-sm font-semibold text-night/65">
        Out of stock
      </span>
    );
  }

  const pad = size === "sm" ? "min-h-10 px-4 py-2.5 text-xs" : "min-h-12 px-6 py-3 text-sm";

  return (
    <span className="inline-flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => {
          add(sku);
          setAdded(true);
        }}
        className={`inline-flex items-center gap-2 rounded-full bg-sunset font-semibold text-night transition hover:bg-amber-400 ${pad}`}
      >
        <Icon name={added ? "check" : "cart"} size={size === "sm" ? 14 : 18} />
        {added ? "Added" : "Add to cart"}
      </button>
      {added && (
        <Link href="/shop/cart" className="text-sm font-semibold text-ocean hover:underline">
          View cart
        </Link>
      )}
    </span>
  );
}
