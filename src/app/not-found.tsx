import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { RULES_PATH } from "@/lib/drone-rules";
import { SERVICES_PATH } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Page not found | ${site.brand}` },
  robots: { index: false, follow: true },
};

const links = [
  { href: "/", label: "Home page", text: "Drone videography in Sri Lanka" },
  { href: SERVICES_PATH, label: "Drone services", text: "Travel, wedding, hotel, property and photo shoots" },
  { href: RULES_PATH, label: "Sri Lanka drone rules", text: "What tourists need before they fly" },
  { href: "/portfolio", label: "Portfolio", text: "Drone photos we took across the island" },
  { href: "/contact", label: "Contact", text: "Ask about your shoot" },
];

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-cinema noise text-white">
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
        <Link href="/" className="flex w-fit items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-sunset text-night">
            <Icon name="play" size={18} />
          </span>
          <span className="font-display text-lg font-semibold">
            dronevideography<span className="text-sunset">.lk</span>
          </span>
        </Link>

        <p className="mt-16 text-sm font-semibold uppercase tracking-[0.18em] text-sunset">Error 404</p>
        <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">We could not find that page</h1>
        <p className="mt-4 max-w-xl text-lg text-white/70">
          The link may be old, or the page may have moved. These pages should help:
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block h-full rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-sunset/50"
              >
                <span className="font-semibold text-white">{l.label}</span>
                <span className="mt-1 block text-sm text-white/60">{l.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
