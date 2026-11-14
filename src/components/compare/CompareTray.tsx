"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

/**
 * A small tray that collects two drones to compare. "+" buttons on the ranking and on
 * comparison pages add a drone; when two are in, the tray links to their comparison.
 * The choice lives in this browser only (localStorage), and the page works without it.
 */

const KEY = "dvlk-compare-tray";
const EVENT = "compare-tray";

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.filter((s): s is string => typeof s === "string").slice(0, 2) : [];
  } catch {
    return [];
  }
}

function write(list: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list.slice(0, 2)));
  } catch {
    // Private mode or storage blocked: the tray simply does not remember.
  }
  window.dispatchEvent(new Event(EVENT));
}

let cache: { raw: string; list: string[] } = { raw: "", list: [] };
function snapshot(): string[] {
  const list = read();
  const raw = list.join("|");
  if (raw !== cache.raw) cache = { raw, list };
  return cache.list;
}
const empty: string[] = [];
function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function useTray(): string[] {
  return useSyncExternalStore(subscribe, snapshot, () => empty);
}

function toggle(slug: string) {
  const list = read();
  if (list.includes(slug)) write(list.filter((s) => s !== slug));
  else write([...list, slug].slice(-2));
}

/** "+ Compare" button for one drone. */
export function AddToCompare({ slug, name, className = "" }: { slug: string; name: string; className?: string }) {
  const tray = useTray();
  const added = tray.includes(slug);
  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={added}
      aria-label={added ? `Remove ${name} from the compare tray` : `Add ${name} to the compare tray`}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors duration-150 ${
        added ? "border-ocean bg-ocean text-white" : "border-night/20 text-night hover:border-night/50"
      } ${className}`}
    >
      <span aria-hidden="true" className="text-base leading-none">{added ? "✓" : "+"}</span>
      {added ? "Added" : "Compare"}
    </button>
  );
}

/** The tray itself, pinned to the bottom left of the comparison pages. */
export function CompareTray({ names }: { names: Record<string, string> }) {
  // The server snapshot is empty, so the tray first appears after hydration.
  const tray = useTray().filter((s) => names[s]);
  if (tray.length === 0) return null;
  const ready = tray.length === 2;
  return (
    <div
      role="region"
      aria-label="Compare tray"
      className="safe-bottom fixed left-4 z-40 mb-14 flex max-w-[calc(100vw-2rem)] flex-wrap items-center gap-2 rounded-xl bg-night p-2 pl-3 text-sm text-white shadow-lg shadow-black/30 sm:mb-0"
    >
      <span className="font-display font-semibold">Compare</span>
      {tray.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => toggle(s)}
          aria-label={`Remove ${names[s]}`}
          className="rounded-md bg-white/10 px-2.5 py-1.5 hover:bg-white/20"
        >
          {names[s]} <span aria-hidden="true">×</span>
        </button>
      ))}
      {ready ? (
        <Link href={`/compare/${tray[0]}-vs-${tray[1]}`} className="btn btn-primary btn-sm">
          See comparison
        </Link>
      ) : (
        <span className="px-1 text-white/70">Add one more</span>
      )}
    </div>
  );
}
