"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { buildWhatsappHref } from "@/lib/site";
import { formatPlannerDate, localDateInput } from "@/lib/dates";

type DroneOption = { slug: string; name: string };

/**
 * Pick a drone, a date and the locations, then send it to WhatsApp as either a
 * quote request or a booking. Nothing is stored: it opens WhatsApp with the
 * message written, and the visitor presses send.
 */
export function ShootPlanner({ drones, whatsapp }: { drones: DroneOption[]; whatsapp: string }) {
  const [drone, setDrone] = useState("");
  const [date, setDate] = useState("");
  const [locations, setLocations] = useState("");

  function send(kind: "quote" | "book") {
    const lines = [
      kind === "quote"
        ? "Hi! I would like a quotation for a drone shoot."
        : "Hi! I would like to book a drone shoot.",
      "",
      `Drone: ${drone || "you can choose for me"}`,
      `Date: ${formatPlannerDate(date) ?? "not fixed yet"}`,
      `Location: ${locations.trim() || "not decided yet"}`,
    ];
    const href = buildWhatsappHref(whatsapp, lines.join("\n"));
    const win = window.open(href, "_blank");
    if (win) win.opener = null;
    else window.location.href = href;
  }

  const field = "w-full rounded-xl border border-night/15 bg-white px-4 py-3 text-night focus:border-ocean focus:outline-none";
  // The visitor's own date. The page is built on the server, whose date can differ
  // around midnight, so the attribute is allowed to differ without a warning.
  const today = localDateInput();

  return (
    <div className="rounded-3xl border border-night/10 bg-white p-6 sm:p-7">
      <h2 className="font-display text-2xl font-medium text-night">Plan your shoot</h2>
      <p className="mt-1 text-sm text-night/65">
        Choose a drone, a date and where you want to film. We reply on WhatsApp.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <label className="text-sm">
          <span className="mb-1.5 block font-medium text-night">Drone</span>
          <select value={drone} onChange={(e) => setDrone(e.target.value)} className={field}>
            <option value="">Any drone, you choose</option>
            {drones.map((d) => (
              <option key={d.slug} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1.5 block font-medium text-night">Date</span>
          <input
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            suppressHydrationWarning
            className={field}
          />
        </label>

        <label className="text-sm">
          <span className="mb-1.5 block font-medium text-night">Location</span>
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="For example Ella, Mirissa"
            className={field}
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => send("quote")}
          className="btn btn-ghost"
        >
          <Icon name="whatsapp" size={18} /> Get a quotation
        </button>
        <button
          type="button"
          onClick={() => send("book")}
          className="btn btn-whatsapp"
        >
          <Icon name="whatsapp" size={18} /> Book now
        </button>
      </div>
      <p className="mt-3 text-xs text-night/65">
        Nothing is sent until you press send in WhatsApp.
      </p>
    </div>
  );
}
