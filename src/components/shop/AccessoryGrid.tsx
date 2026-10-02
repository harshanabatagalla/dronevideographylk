import { Icon } from "@/components/ui/Icon";
import { accessories, formatLkr, type AccessoryCategory } from "@/lib/shop";
import { whatsappHref } from "@/lib/site";
import { AddToCartButton } from "./AddToCartButton";

const GROUPS: { key: AccessoryCategory; title: string; blurb: string; icon: "drone" | "wind" | "shield" }[] = [
  { key: "Batteries", title: "Batteries and charging", blurb: "One battery is never enough for a real shoot.", icon: "drone" },
  { key: "Propellers", title: "Propellers and guards", blurb: "Cheap to replace, and they wear out with every sandy take off.", icon: "wind" },
  { key: "Tools and care", title: "Tools and care", blurb: "Small things that keep a drone flying and the lens clean.", icon: "shield" },
];

/** Spares and tools, grouped. Items without a set price link to WhatsApp. */
export function AccessoryGrid() {
  return (
    <div id="accessories" className="mt-20 scroll-mt-24">
      <h2 className="font-display text-3xl font-semibold text-night">Spares and accessories</h2>
      <p className="mt-2 max-w-2xl text-night/65">
        Batteries, propellers and tools for the drones we sell. Tell us which drone you fly and we
        will send the right part.
      </p>

      {GROUPS.map((g) => {
        const items = accessories.filter((a) => a.category === g.key);
        if (items.length === 0) return null;
        return (
          <section key={g.key} className="mt-10">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-night">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-ocean/10 text-ocean">
                <Icon name={g.icon} size={18} />
              </span>
              {g.title}
            </h3>
            <p className="mt-1 text-sm text-night/65">{g.blurb}</p>

            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((a) => (
                <li key={a.slug} className="flex h-full flex-col rounded-2xl border border-night/10 bg-white p-5">
                  <p className="font-semibold text-night">{a.name}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ocean">Fits {a.fits}</p>
                  <p className="mt-2 text-sm text-night/65">{a.note}</p>
                  <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-night/10 pt-4">
                    {typeof a.lkr === "number" ? (
                      <>
                        <p className="font-display text-xl font-semibold text-night">{formatLkr(a.lkr)}</p>
                        <AddToCartButton sku={`acc:${a.slug}`} size="sm" />
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-night/65">Price on request</p>
                        <a
                          href={whatsappHref(`Hi! What is the price for the ${a.name}?`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-night/15 px-4 py-2 text-xs font-semibold text-night transition hover:border-night/40"
                        >
                          <Icon name="whatsapp" size={14} /> Ask price
                        </a>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
