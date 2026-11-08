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
      <span className="inline-flex min-h-10 items-center rounded-md bg-night/10 px-5 py-2.5 text-sm font-semibold text-night/65">
        Out of stock
      </span>
    );
  }

  const pad = size === "sm" ? "btn-sm min-h-10" : "min-h-12";

  return (
    <span className="inline-flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => {
          add(sku);
          setAdded(true);
        }}
        className={`btn btn-primary ${pad}`}
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
