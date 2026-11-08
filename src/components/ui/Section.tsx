import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "./Icon";

/** Section wrapper with consistent vertical rhythm and max width. */
export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-5 sm:px-8 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

/**
 * Section title. "split" (the default) puts the title on the left and the short
 * explanation on the right on wide screens, "left" stacks them, "center" is for the
 * rare section that really is a single centred statement.
 */
export function SectionHeading({
  title,
  subtitle,
  align = "split",
  light = false,
}: {
  title: string;
  subtitle?: string;
  align?: "split" | "left" | "center";
  light?: boolean;
}) {
  const h2 = (
    <h2
      className={`font-display text-3xl font-medium text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${
        light ? "text-white" : "text-night"
      }`}
    >
      {title}
    </h2>
  );
  const sub = subtitle && (
    <p className={`max-w-md text-lg ${light ? "text-white/70" : "text-night/70"}`}>{subtitle}</p>
  );

  if (align === "center") {
    return (
      <div className="mx-auto max-w-2xl text-center">
        {h2}
        {subtitle && <div className="mt-4 [&>p]:mx-auto [&>p]:max-w-none">{sub}</div>}
      </div>
    );
  }
  if (align === "split" && subtitle) {
    return (
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
        {h2}
        <div className="lg:justify-self-end">{sub}</div>
      </div>
    );
  }
  return (
    <div className="max-w-2xl">
      {h2}
      {subtitle && <div className="mt-4">{sub}</div>}
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost" | "light";
  size?: "md" | "lg";
  icon?: boolean;
} & Partial<ComponentProps<typeof Link>>;

/** Link styled as a button. The look lives in the .btn classes in globals.css. */
export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  icon = false,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`btn btn-${variant} ${size === "lg" ? "btn-lg" : ""} ${className}`}
      {...rest}
    >
      {children}
      {icon && (
        <span className="btn-arrow">
          <Icon name="arrow-right" size={18} />
        </span>
      )}
    </Link>
  );
}
