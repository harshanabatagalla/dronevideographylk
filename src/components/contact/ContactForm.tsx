"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { ALL_COUNTRIES, COMMON_COUNTRIES } from "@/lib/countries";
import { postJson } from "@/lib/api-client";

const shootTypes = [
  "Travel video",
  "Wedding or event",
  "Hotel or resort",
  "Surf or outdoor trip",
  "Property or land",
  "Drone photos",
  "Other",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      await postJson("/api/contact", data);
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-teal/30 bg-teal/5 p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal/15 text-teal">
          <Icon name="check" size={28} />
        </span>
        <h3 className="mt-4 font-display text-2xl font-semibold text-night">Thank you!</h3>
        <p className="mt-2 text-night/65">
          We&apos;ve received your enquiry and will reply within 24 hours. For a faster response,
          message us on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <Field label="Your name" name="name" autoComplete="name" maxLength={120} required />
      <Field label="Email" name="email" type="email" autoComplete="email" maxLength={254} required />
      <label className="text-sm">
        <span className="mb-1.5 block font-medium text-night">Country</span>
        <select
          name="country"
          autoComplete="country-name"
          defaultValue=""
          className="w-full rounded-xl border border-night/15 bg-white px-4 py-3 text-night focus:border-ocean focus:outline-none"
        >
          <option value="">Choose your country</option>
          <optgroup label="Most common">
            {COMMON_COUNTRIES.map((c) => (
              <option key={`common-${c}`} value={c}>
                {c}
              </option>
            ))}
          </optgroup>
          <optgroup label="All countries">
            {ALL_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </optgroup>
        </select>
      </label>
      <Field label="Travel dates" name="dates" maxLength={120} placeholder="For example 12 to 20 August" />
      <Field label="Locations" name="locations" maxLength={300} placeholder="For example Ella, Mirissa" className="sm:col-span-2" />

      <label className="sm:col-span-2 text-sm">
        <span className="mb-1.5 block font-medium text-night">Type of shoot</span>
        <select
          name="shootType"
          className="w-full rounded-xl border border-night/15 bg-white px-4 py-3 text-night focus:border-ocean focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Choose one…
          </option>
          {shootTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="sm:col-span-2 text-sm">
        <span className="mb-1.5 block font-medium text-night">Tell us about your plans</span>
        <textarea
          name="message"
          rows={5}
          maxLength={4000}
          required
          placeholder="What do you want us to film?"
          className="w-full rounded-xl border border-night/15 bg-white px-4 py-3 text-night focus:border-ocean focus:outline-none"
        />
      </label>

      {status === "error" && (
        <p role="alert" className="sm:col-span-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-sunset px-7 py-3.5 text-sm font-semibold text-night transition hover:bg-amber-400 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
          {status !== "sending" && <Icon name="arrow-right" size={18} />}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
  maxLength,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
  className?: string;
}) {
  return (
    <label className={`text-sm ${className}`}>
      <span className="mb-1.5 block font-medium text-night">
        {label} {required && <span className="text-coral">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        className="w-full rounded-xl border border-night/15 bg-white px-4 py-3 text-night focus:border-ocean focus:outline-none"
      />
    </label>
  );
}
