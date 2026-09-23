"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";

export type CartLine = { sku: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  /** False until the saved cart has been read from the browser. */
  ready: boolean;
  add: (sku: string, qty?: number) => void;
  setQty: (sku: string, qty: number) => void;
  remove: (sku: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "dvlk_cart";
const MAX_QTY = 10;

const CartContext = createContext<CartContextValue | null>(null);

const EMPTY: CartLine[] = [];

function load(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as CartLine[]) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed
      // carts saved before kits existed stored a bare slug
      .map((l) => (typeof (l as { slug?: string }).slug === "string" ? { sku: `${(l as { slug?: string }).slug}:standard`, qty: l.qty } : l))
      .filter((l) => typeof l.sku === "string" && Number.isInteger(l.qty) && l.qty > 0);
  } catch {
    return [];
  }
}

/* A tiny external store over localStorage, read with useSyncExternalStore so
   the server render (empty cart) and the browser hydrate without a mismatch. */
let snapshot: CartLine[] | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): CartLine[] {
  if (snapshot === null) snapshot = load();
  return snapshot;
}

function setSnapshot(next: CartLine[]) {
  snapshot = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage blocked (private mode). The cart still works for this visit.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep carts in sync across open tabs.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      snapshot = load();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const noopSubscribe = () => () => {};

/** Cart state kept in the visitor's browser. Prices are never stored here;
 *  the order API prices every line from the server-side catalog. */
export function CartProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
  const ready = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const add = useCallback((sku: string, qty = 1) => {
    const prev = getSnapshot();
    const existing = prev.find((l) => l.sku === sku);
    setSnapshot(
      existing
        ? prev.map((l) => (l.sku === sku ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l))
        : [...prev, { sku, qty: Math.min(MAX_QTY, qty) }],
    );
  }, []);

  const setQty = useCallback((sku: string, qty: number) => {
    const prev = getSnapshot();
    setSnapshot(
      qty <= 0
        ? prev.filter((l) => l.sku !== sku)
        : prev.map((l) => (l.sku === sku ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)),
    );
  }, []);

  const remove = useCallback((sku: string) => {
    setSnapshot(getSnapshot().filter((l) => l.sku !== sku));
  }, []);

  const clear = useCallback(() => setSnapshot([]), []);

  const value = useMemo(
    () => ({ lines, count: lines.reduce((n, l) => n + l.qty, 0), ready, add, setQty, remove, clear }),
    [lines, ready, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
