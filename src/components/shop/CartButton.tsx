"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { useCart } from "./CartProvider";

export function CartButton() {
  const { count } = useCart();
  return (
    <Link
      href="/shop/cart"
      aria-label={count > 0 ? `Cart, ${count} item${count === 1 ? "" : "s"}` : "Cart"}
      className="relative grid h-10 w-10 place-items-center rounded-full text-white/85 transition hover:bg-white/10 hover:text-white"
    >
      <Icon name="cart" size={22} />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-sunset px-1 text-[11px] font-bold text-night">
          {count}
        </span>
      )}
    </Link>
  );
}
