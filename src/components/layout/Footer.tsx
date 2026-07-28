import Link from "next/link";
import { nav, site, buildWhatsappHref } from "@/lib/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { SiteSettings } from "@/lib/db";

const socialIcons: { key: keyof SiteSettings["socials"]; icon: IconName; label: string }[] = [
  { key: "instagram", icon: "instagram", label: "Instagram" },
  { key: "youtube", icon: "youtube", label: "YouTube" },
  { key: "facebook", icon: "facebook", label: "Facebook" },
  { key: "tiktok", icon: "tiktok", label: "TikTok" },
];

export function Footer({ settings }: { settings?: SiteSettings }) {
  const socials = settings?.socials ?? site.socials;
  const email = settings?.email ?? site.email;
  const address = settings?.address ?? site.address;
  const waHref = buildWhatsappHref(
    settings?.whatsapp ?? site.whatsapp,
    settings?.whatsappMessage ?? site.whatsappMessage,
  );

  return (
    <footer className="bg-night text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-sunset text-night">
              <Icon name="play" size={18} />
            </span>
            <span className="font-display text-lg font-semibold">
              dronevideography<span className="text-sunset">.lk</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-white/60">{site.description}</p>
          <div className="mt-5 flex gap-3">
            {socialIcons
              .filter((s) => socials[s.key])
              .map((s) => (
                <a
                  key={s.key}
                  href={socials[s.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/80 ring-1 ring-white/10 transition hover:bg-sunset hover:text-night"
                >
                  <Icon name={s.icon} size={18} />
                </a>
              ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/60 transition hover:text-sunset">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li>
              <a href={waHref} className="inline-flex items-center gap-2 hover:text-sunset">
                <Icon name="whatsapp" size={16} /> WhatsApp us
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="hover:text-sunset">
                {email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <Icon name="map-pin" size={16} /> {address}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-white/40 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} {site.brand}. All rights reserved.</p>
          <p>Licensed &amp; insured drone pilots · Colombo, Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}
