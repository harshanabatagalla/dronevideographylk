/**
 * Central site configuration.
 * In production these values are editable from the custom admin dashboard
 * (Settings module) and stored in Supabase. For the Phase 1 MVP they live here
 * as sensible defaults so the site renders without a database connection.
 */
export const site = {
  name: "dronevideography.lk",
  brand: "Drone Videography LK",
  tagline: "Sri Lanka, from above.",
  description:
    "Cinematic drone videography across Sri Lanka for travelers, weddings and events. Licensed, insured pilots filming your journey in stunning 4K/6K.",
  url: "https://dronevideography.lk",
  locale: "en_LK",
  // Contact — travelers strongly prefer WhatsApp, so it is first-class.
  whatsapp: "+94770000000",
  whatsappMessage:
    "Hi! I'm visiting Sri Lanka and I'd love a drone videography quote.",
  email: "hello@dronevideography.lk",
  phone: "+94 77 000 0000",
  address: "Colombo, Sri Lanka",
  // Social links — editable from the admin dashboard.
  socials: {
    instagram: "https://instagram.com/dronevideography.lk",
    youtube: "https://youtube.com/@dronevideography.lk",
    facebook: "https://facebook.com/dronevideography.lk",
    tiktok: "https://tiktok.com/@dronevideography.lk",
  },
} as const;

export function whatsappHref(message: string = site.whatsappMessage): string {
  const number = site.whatsapp.replace(/[^0-9]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Build a WhatsApp link from an explicit number (e.g. from admin settings). */
export function buildWhatsappHref(number: string, message: string): string {
  const digits = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { label: "Home", href: "/" },
  { label: "Our Fleet", href: "/fleet" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
] as const;
