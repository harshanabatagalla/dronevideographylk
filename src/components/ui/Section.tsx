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

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      <h2
        className={`text-3xl sm:text-4xl font-semibold text-balance ${
          light ? "text-white" : "text-night"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg ${light ? "text-white/70" : "text-night/70"}`}>{subtitle}</p>
      )}
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost" | "light";
  icon?: boolean;
} & Partial<ComponentProps<typeof Link>>;

export function Button({ children, href, variant = "primary", icon = false, ...rest }: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunset";
  const styles = {
    primary: "bg-sunset text-night hover:bg-amber-400",
    ghost: "border border-night/15 text-night hover:border-night/40 hover:bg-night/5",
    light: "border border-white/40 text-white hover:bg-white/10",
  }[variant];

  return (
    <Link href={href} className={`${base} ${styles}`} {...rest}>
      {children}
      {icon && <Icon name="arrow-right" size={18} />}
    </Link>
  );
}
