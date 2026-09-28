/**
 * Central site configuration.
 * In production these values are editable from the custom admin dashboard
 * (Settings module) and stored in Supabase. For the Phase 1 MVP they live here
 * as sensible defaults so the site renders without a database connection.
 */
export const site = {
  name: "dronevideography.lk",
  brand: "Drone Videography LK",
  tagline: "Drone filming and photography across Sri Lanka.",
  description:
    "Drone videography and photography across Sri Lanka for travellers, hotels, weddings and property. We help with drone permits. Send your date on WhatsApp.",
  url: "https://dronevideography.lk",
  locale: "en_LK",
  // Contact — travelers strongly prefer WhatsApp, so it is first-class.
  whatsapp: "+94775406357",
  whatsappMessage:
    "Hi! I'm visiting Sri Lanka and I'd love a drone videography quote.",
  email: "hello@dronevideography.lk",
  phone: "+94 77 540 6357",
  address: "Colombo, Sri Lanka",
  // Social links, editable from the admin dashboard. Only add profiles that exist:
  // the YouTube handle that used to sit here returned 404.
  socials: {
    instagram: "https://instagram.com/dronevideography.lk",
    youtube: "",
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
  { label: "Services", href: "/services" },
  { label: "Our Drones", href: "/fleet" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Locations", href: "/locations" },
  { label: "Drone Rules", href: "/sri-lanka-drone-rules" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
] as const;
