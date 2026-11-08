"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { CartButton } from "@/components/shop/CartButton";
import { BookButton } from "@/components/booking/BookingDialog";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState({ pathname, open: false });
  const open = menu.open;
  if (menu.pathname !== pathname) setMenu({ pathname, open: false });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    // Reading scrollY right after hydration forces a layout; wait until the first frame
    // has painted, when layout is already clean, to pick up a restored scroll position.
    let timer = 0;
    const raf = requestAnimationFrame(() => {
      timer = window.setTimeout(onScroll);
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`safe-top safe-x fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-night" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-white" aria-label="dronevideography.lk home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap text-sm font-medium transition-colors ${
                  active ? "text-sunset" : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <CartButton />
          <BookButton
            className="btn btn-primary btn-sm whitespace-nowrap"
          >
            <Icon name="whatsapp" size={18} /> Book Now
          </BookButton>
        </nav>

        <div className="flex items-center gap-1 xl:hidden">
          <CartButton />
          <button
            type="button"
            onClick={() => setMenu({ pathname, open: !open })}
            className="grid h-10 w-10 place-items-center rounded-lg text-white xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <Icon name={open ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="safe-pb border-t border-white/10 bg-night/95 px-5 py-4 xl:hidden" aria-label="Mobile">
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
              <BookButton
                onClick={() => setMenu({ pathname, open: false })}
                className="btn btn-primary btn-block"
              >
                <Icon name="whatsapp" size={18} /> Book a drone video
              </BookButton>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
