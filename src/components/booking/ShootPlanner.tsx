"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { buildWhatsappHref } from "@/lib/site";

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
      `Date: ${date ? new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "not fixed yet"}`,
      `Location: ${locations.trim() || "not decided yet"}`,
    ];
    const href = buildWhatsappHref(whatsapp, lines.join("\n"));
    const win = window.open(href, "_blank");
    if (win) win.opener = null;
    else window.location.href = href;
  }

  const field = "w-full rounded-xl border border-night/15 bg-white px-4 py-3 text-night focus:border-ocean focus:outline-none";
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="rounded-3xl border border-night/10 bg-white p-6 shadow-lg shadow-night/5 sm:p-7">
      <h2 className="font-display text-2xl font-semibold text-night">Plan your shoot</h2>
      <p className="mt-1 text-sm text-night/60">
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
          <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className={field} />
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
          className="inline-flex items-center gap-2 rounded-full border border-night/15 px-6 py-3 text-sm font-semibold text-night transition hover:border-night/40"
        >
          <Icon name="whatsapp" size={18} /> Get a quotation
        </button>
        <button
          type="button"
          onClick={() => send("book")}
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
        >
          <Icon name="whatsapp" size={18} /> Book now
        </button>
      </div>
      <p className="mt-3 text-xs text-night/50">
        Nothing is sent until you press send in WhatsApp.
      </p>
    </div>
  );
}
