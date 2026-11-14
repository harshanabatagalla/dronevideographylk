"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";

export type PickerOption = { slug: string; name: string; group: string };

/**
 * Two drone menus and a Compare button. With JavaScript it goes straight to the
 * comparison page; without it, the form asks /compare/go, which redirects there.
 */
export function ComparePicker({
  options,
  a = "",
  b = "",
  dark = true,
  submitLabel = "Compare",
}: {
  options: PickerOption[];
  a?: string;
  b?: string;
  dark?: boolean;
  submitLabel?: string;
}) {
  const router = useRouter();
  const id = useId();
  const [x, setX] = useState(a);
  const [y, setY] = useState(b);
  const same = Boolean(x) && x === y;
  const ready = Boolean(x && y) && !same;
  const groups = [...new Set(options.map((o) => o.group))];

  const field = dark
    ? "border-white/25 bg-night-800 text-white"
    : "border-night/20 bg-white text-night";
  const labelTone = dark ? "text-white/70" : "text-night/70";

  const select = (name: "a" | "b", value: string, set: (v: string) => void, label: string) => (
    <label className="block min-w-0">
      <span className={`mb-1.5 block text-sm font-medium ${labelTone}`}>{label}</span>
      <select
        name={name}
        id={`${id}-${name}`}
        value={value}
        onChange={(e) => set(e.target.value)}
        required
        className={`w-full rounded-lg border px-3 py-3 text-base ${field}`}
      >
        <option value="" disabled>
          Choose a drone
        </option>
        {groups.map((g) => (
          <optgroup key={g} label={g}>
            {options
              .filter((o) => o.group === g)
              .map((o) => (
                <option key={o.slug} value={o.slug}>
                  {o.name}
                </option>
              ))}
          </optgroup>
        ))}
      </select>
    </label>
  );

  return (
    <form
      action="/compare/go"
      method="get"
      onSubmit={(e) => {
        e.preventDefault();
        if (ready) router.push(`/compare/${x}-vs-${y}`);
      }}
      className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto] sm:items-end"
    >
      {select("a", x, setX, "First drone")}
      <button
        type="button"
        onClick={() => {
          setX(y);
          setY(x);
        }}
        aria-label="Swap the two drones"
        className={`grid h-12 w-12 place-items-center justify-self-center rounded-lg border transition-colors duration-150 ${
          dark ? "border-white/25 text-white hover:border-white/60" : "border-night/20 text-night hover:border-night/50"
        }`}
      >
        {/* Two opposite arrows: up and down on phones, where the menus stack, left and right beside them. */}
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="sm:rotate-90">
          <path d="M8 20V4M4.5 7.5 8 4l3.5 3.5M16 4v16M12.5 16.5 16 20l3.5-3.5" />
        </svg>
      </button>
      {select("b", y, setY, "Second drone")}
      <button type="submit" disabled={!ready} className="btn btn-primary h-12">
        {submitLabel}
      </button>
      <p role="status" className={`text-sm sm:col-span-4 ${same ? (dark ? "text-sunset" : "text-sunset-ink") : "sr-only"}`}>
        {same ? "Pick two different drones." : ""}
      </p>
    </form>
  );
}
