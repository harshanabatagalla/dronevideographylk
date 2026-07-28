import type { ReactNode } from "react";

export function AdminHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-semibold text-night">{title}</h1>
        {description && <p className="mt-1 text-night/60">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-night/10 bg-white p-6 ${className}`}>{children}</div>
  );
}

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
  placeholder,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  type?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-night">
        {label} {required && <span className="text-coral">*</span>}
      </span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-night/15 bg-white px-4 py-2.5 text-night focus:border-ocean focus:outline-none"
      />
      {hint && <span className="mt-1 block text-xs text-night/50">{hint}</span>}
    </label>
  );
}

export function Textarea({
  label,
  name,
  defaultValue,
  rows = 4,
  placeholder,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-night">{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-xl border border-night/15 bg-white px-4 py-2.5 font-mono text-[13px] text-night focus:border-ocean focus:outline-none"
      />
      {hint && <span className="mt-1 block text-xs text-night/50">{hint}</span>}
    </label>
  );
}

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="inline-flex items-center gap-2 rounded-full bg-sunset px-6 py-2.5 text-sm font-semibold text-night transition hover:bg-amber-400"
    >
      {children}
    </button>
  );
}
