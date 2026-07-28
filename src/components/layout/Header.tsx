"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site, buildWhatsappHref } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

export function Header({
  whatsapp = site.whatsapp,
  whatsappMessage = site.whatsappMessage,
}: {
  whatsapp?: string;
  whatsappMessage?: string;
}) {
  const pathname = usePathname();
  const waHref = buildWhatsappHref(whatsapp, whatsappMessage);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-night/90 backdrop-blur-md shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-white" aria-label={`${site.brand} home`}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-sunset text-night">
            <Icon name="play" size={18} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            dronevideography<span className="text-sunset">.lk</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-sunset" : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-sunset px-5 py-2.5 text-sm font-semibold text-night transition hover:bg-amber-400"
          >
            <Icon name="whatsapp" size={18} /> Book Now
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <Icon name={open ? "close" : "menu"} size={24} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-night/95 px-5 py-4 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-3 text-white/90 hover:bg-white/5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-sunset px-5 py-3 font-semibold text-night"
              >
                <Icon name="whatsapp" size={18} /> Book on WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
