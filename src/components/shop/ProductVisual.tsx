import Image from "next/image";
import type { ShopProduct, ShopSeries } from "@/lib/shop";

const SERIES_TINT: Record<ShopSeries, string> = {
  Mini: "from-ocean/40 via-night-700 to-night",
  Flip: "from-coral/40 via-night-700 to-night",
  Air: "from-teal/45 via-night-700 to-night",
  Mavic: "from-sunset/40 via-night-700 to-night",
  FPV: "from-ocean-light/35 via-night-700 to-night",
};

/**
 * Product image. Uses `product.image` when set; otherwise a branded tile with a
 * drone outline and the model name, so no stock photo of the wrong drone is
 * ever shown next to a price.
 */
export function ProductVisual({
  product,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: {
  product: ShopProduct;
  priority?: boolean;
  sizes?: string;
}) {
  if (product.image) {
    return (
      <Image
        src={product.image}
        alt={product.name}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${SERIES_TINT[product.series]}`}
      role="img"
      aria-label={product.name}
    >
      <svg viewBox="0 0 120 64" className="w-1/2 max-w-44 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <ellipse cx="22" cy="14" rx="16" ry="4" opacity="0.6" />
        <ellipse cx="98" cy="14" rx="16" ry="4" opacity="0.6" />
        <path d="M22 18 46 30M98 18 74 30" />
        <rect x="44" y="24" width="32" height="18" rx="7" />
        <circle cx="60" cy="48" r="6" />
        <path d="M46 40 28 52M74 40l18 12" opacity="0.7" />
      </svg>
      <p className="mt-4 px-4 text-center font-display text-lg font-semibold text-white">{product.name}</p>
    </div>
  );
}
