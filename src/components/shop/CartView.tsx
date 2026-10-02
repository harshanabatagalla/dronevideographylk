"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { formatLkr, getSku } from "@/lib/shop";
import { whatsappHref } from "@/lib/site";
import { useCart } from "./CartProvider";
import Image from "next/image";

type Placed = { ref: string; total: number; payment: string };

export function CartView() {
  const { lines, ready, setQty, remove, clear } = useCart();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState<Placed | null>(null);

  const items = lines
    .map((l) => ({ line: l, item: getSku(l.sku) }))
    .filter((x): x is { line: typeof x.line; item: NonNullable<typeof x.item> } => Boolean(x.item?.lkr));
  const total = items.reduce((sum, { line, item }) => sum + (item.lkr ?? 0) * line.qty, 0);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, items: lines }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Something went wrong.");
      setPlaced({ ref: json.ref, total: json.total, payment: String(data.payment) });
      clear();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-teal/30 bg-teal/5 p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal/15 text-teal">
          <Icon name="check" size={28} />
        </span>
        <h2 className="mt-4 font-display text-2xl font-semibold text-night">Order received</h2>
        <p className="mt-2 text-night/70">
          Your order number is <strong className="text-night">{placed.ref}</strong>. Total{" "}
          {formatLkr(placed.total)}.
        </p>
        <p className="mt-2 text-night/65">
          We will contact you to confirm stock, delivery and the final price in rupees.
          {placed.payment === "bank-transfer"
            ? " Bank details are sent with the confirmation."
            : " You pay the courier when the drone arrives."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappHref(`Hi! I just placed order ${placed.ref} on your website.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-sunset px-6 py-3 text-sm font-semibold text-night transition hover:bg-amber-400"
          >
            <Icon name="whatsapp" size={18} /> Message us about it
          </a>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-night/15 px-6 py-3 text-sm font-semibold text-night hover:border-night/40"
          >
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  if (!ready) {
    return <p className="text-night/65">Loading your cart…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-night/20 bg-white p-10 text-center">
        <p className="text-night/65">Your cart is empty.</p>
        <Link
          href="/shop"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-sunset px-6 py-3 text-sm font-semibold text-night hover:bg-amber-400"
        >
          Browse drones <Icon name="arrow-right" size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <div>
        <ul className="space-y-4">
          {items.map(({ line, item }) => (
            <li key={item.sku} className="flex gap-4 rounded-2xl border border-night/10 bg-white p-4">
              <Link href={item.href} className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-night/5">
                {item.image && (
                  <Image src={item.image} alt={item.name} fill sizes="128px" className="object-cover" />
                )}
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link href={item.href} className="font-semibold text-night hover:text-ocean">
                      {item.name}
                    </Link>
                    <p className="text-xs text-night/65">{item.sub}</p>
                  </div>
                  <p className="shrink-0 font-semibold text-night">{formatLkr((item.lkr ?? 0) * line.qty)}</p>
                </div>
                <div className="mt-auto flex items-center gap-3 pt-3">
                  <div className="flex items-center rounded-full border border-night/15">
                    <button
                      type="button"
                      onClick={() => setQty(item.sku, line.qty - 1)}
                      className="grid h-8 w-8 place-items-center text-night/70 hover:text-night"
                      aria-label={`One less ${item.name}`}
                    >
                      <Icon name="minus" size={14} />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{line.qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(item.sku, line.qty + 1)}
                      className="grid h-8 w-8 place-items-center text-night/70 hover:text-night"
                      aria-label={`One more ${item.name}`}
                    >
                      <Icon name="plus" size={14} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.sku)}
                    className="inline-flex items-center gap-1 text-xs text-night/65 hover:text-coral"
                  >
                    <Icon name="trash" size={14} /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-sand/70 px-5 py-4">
          <span className="font-medium text-night/70">Total</span>
          <span className="font-display text-2xl font-semibold text-night">{formatLkr(total)}</span>
        </div>
        <p className="mt-2 text-xs text-night/65">
          Prices in Sri Lankan rupees. We confirm stock, the final price and any delivery cost before you pay.
        </p>
      </div>

      <form onSubmit={onSubmit} className="h-fit space-y-4 rounded-3xl border border-night/10 bg-white p-6">
        <h2 className="font-display text-xl font-semibold text-night">Your details</h2>
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <Field label="Full name" name="name" autoComplete="name" required />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
        <Field label="Phone / WhatsApp" name="phone" type="tel" autoComplete="tel" required />
        <Field label="Delivery address" name="address" autoComplete="street-address" required />
        <Field label="City" name="city" autoComplete="address-level2" required />

        <fieldset>
          <legend className="mb-1.5 text-sm font-medium text-night">How will you pay?</legend>
          <div className="space-y-2">
            <PayOption value="bank-transfer" title="Bank transfer" text="We send bank details when we confirm." defaultChecked />
            <PayOption value="cash-on-delivery" title="Cash on delivery" text="Pay the courier when it arrives." />
          </div>
        </fieldset>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-night">Notes (optional)</span>
          <textarea
            name="notes"
            rows={3}
            placeholder="Anything we should know, like a preferred delivery time"
            className="w-full rounded-xl border border-night/15 bg-white px-4 py-3 text-night focus:border-ocean focus:outline-none"
          />
        </label>

        {status === "error" && <p className="rounded-lg bg-coral/10 px-4 py-3 text-sm text-coral">{error}</p>}

        <button
          type="submit"
          disabled={status === "sending"}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-sunset px-6 py-3.5 text-sm font-semibold text-night transition hover:bg-amber-400 disabled:opacity-60"
        >
          {status === "sending" ? "Sending order…" : `Place order · ${formatLkr(total)}`}
        </button>
        <p className="text-center text-xs text-night/65">Nothing is charged now. We confirm first.</p>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-night">
        {label} {required && <span className="text-coral">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-night/15 bg-white px-4 py-3 text-night focus:border-ocean focus:outline-none"
      />
    </label>
  );
}

function PayOption({
  value,
  title,
  text,
  defaultChecked = false,
}: {
  value: string;
  title: string;
  text: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-night/15 p-3 has-[:checked]:border-ocean has-[:checked]:bg-ocean/5">
      <input type="radio" name="payment" value={value} defaultChecked={defaultChecked} className="mt-1 accent-ocean" />
      <span>
        <span className="block text-sm font-semibold text-night">{title}</span>
        <span className="text-xs text-night/65">{text}</span>
      </span>
    </label>
  );
}
