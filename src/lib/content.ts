/**
 * Content models and Phase 1 seed data.
 *
 * These typed structures mirror the Supabase schema (see `supabase/schema.sql`).
 * The admin dashboard (Phase 2) writes to Supabase; the public site will then
 * read from Supabase using the same shapes. For the MVP we render from this
 * seed data so the site works with zero configuration.
 */

export type Spec = {
  /** lucide-style icon key rendered by the Icon component */
  icon: "clock" | "camera" | "signal" | "wind" | "mountain" | "sparkles";
  /** plain-language label a non-technical traveler understands */
  label: string;
  value: string;
};

export type Drone = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  /** short, benefit-led plain-language specs */
  specs: Spec[];
  bestFor: string[];
  /** youtube ids or hosted clips filmed with this drone */
  sampleFootage: string[];
  order: number;
};

export type Footage = {
  id: string;
  title: string;
  /** poster image shown before the video loads (fast LCP) */
  poster: string;
  /** youtube id for long-tail reels (free hosting + SEO) */
  youtubeId?: string;
  location: string;
  category: "Travel" | "Wedding" | "Event" | "Resort" | "Adventure";
  droneSlug: string;
  featured: boolean;
};

export type Location = {
  slug: string;
  name: string;
  /** approximate position on the stylized island map (0-100 percentage) */
  x: number;
  y: number;
  blurb: string;
};

export type Testimonial = {
  id?: string;
  name: string;
  country: string;
  countryFlag: string;
  quote: string;
  rating: number;
};

export type Package = {
  name: string;
  priceFrom: string;
  duration: string;
  includes: string[];
  highlight?: boolean;
};

/* ------------------------------------------------------------------ */
/* Seed data                                                           */
/* ------------------------------------------------------------------ */

export const drones: Drone[] = [
  {
    slug: "skymaster-pro",
    name: "SkyMaster Pro",
    tagline: "Our flagship cinema drone for jaw-dropping wide shots.",
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1200&q=70",
    specs: [
      { icon: "camera", label: "Video quality", value: "Stunning 4K — sharp enough for the big screen" },
      { icon: "clock", label: "Flight time", value: "~30 min per battery (we always carry spares)" },
      { icon: "signal", label: "Range", value: "Films you from up to 5 km away" },
      { icon: "wind", label: "Wind handling", value: "Stays steady even on breezy coastlines" },
      { icon: "mountain", label: "Best for", value: "Beaches, mountains and sweeping landscapes" },
    ],
    bestFor: ["Beaches", "Mountains", "Wide landscapes", "Weddings"],
    sampleFootage: ["ScMzIvxBSi4"],
    order: 1,
  },
  {
    slug: "coastal-cruiser",
    name: "Coastal Cruiser",
    tagline: "Compact and quiet — perfect for close-up travel moments.",
    image:
      "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=1200&q=70",
    specs: [
      { icon: "camera", label: "Video quality", value: "Crisp 4K with vivid tropical colours" },
      { icon: "clock", label: "Flight time", value: "~25 min per battery" },
      { icon: "signal", label: "Range", value: "Follows you smoothly up to 3 km away" },
      { icon: "sparkles", label: "Extra", value: "Super quiet — great around people and events" },
      { icon: "mountain", label: "Best for", value: "Surfing, markets, tight village lanes" },
    ],
    bestFor: ["Surf", "Events", "Street & markets", "Vlogs"],
    sampleFootage: ["ScMzIvxBSi4"],
    order: 2,
  },
  {
    slug: "summit-explorer",
    name: "Summit Explorer",
    tagline: "Built for the highlands — thin air, big drama.",
    image:
      "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?auto=format&fit=crop&w=1200&q=70",
    specs: [
      { icon: "camera", label: "Video quality", value: "Cinema 6K for ultra-detailed scenery" },
      { icon: "clock", label: "Flight time", value: "~34 min per battery" },
      { icon: "signal", label: "Range", value: "Reaches up to 6 km for epic reveals" },
      { icon: "wind", label: "Wind handling", value: "Confident in gusty mountain conditions" },
      { icon: "mountain", label: "Best for", value: "Tea country, waterfalls, sunrise peaks" },
    ],
    bestFor: ["Tea country", "Waterfalls", "Sunrise", "Hiking"],
    sampleFootage: ["ScMzIvxBSi4"],
    order: 3,
  },
];

export const footage: Footage[] = [
  {
    id: "sigiriya-dawn",
    title: "Sigiriya at Dawn",
    poster:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=70",
    youtubeId: "ScMzIvxBSi4",
    location: "Sigiriya",
    category: "Travel",
    droneSlug: "skymaster-pro",
    featured: true,
  },
  {
    id: "ella-nine-arch",
    title: "Nine Arch Bridge, Ella",
    poster:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=70",
    youtubeId: "ScMzIvxBSi4",
    location: "Ella",
    category: "Travel",
    droneSlug: "summit-explorer",
    featured: true,
  },
  {
    id: "mirissa-coast",
    title: "Mirissa Coastline",
    poster:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=70",
    youtubeId: "ScMzIvxBSi4",
    location: "Mirissa",
    category: "Adventure",
    droneSlug: "coastal-cruiser",
    featured: true,
  },
  {
    id: "tea-country",
    title: "Tea Country Sunrise",
    poster:
      "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1200&q=70",
    youtubeId: "ScMzIvxBSi4",
    location: "Nuwara Eliya",
    category: "Travel",
    droneSlug: "summit-explorer",
    featured: true,
  },
  {
    id: "beach-wedding",
    title: "Beach Wedding, Bentota",
    poster:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=70",
    youtubeId: "ScMzIvxBSi4",
    location: "Bentota",
    category: "Wedding",
    droneSlug: "skymaster-pro",
    featured: true,
  },
  {
    id: "galle-fort",
    title: "Galle Fort from Above",
    poster:
      "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=70",
    youtubeId: "ScMzIvxBSi4",
    location: "Galle",
    category: "Resort",
    droneSlug: "coastal-cruiser",
    featured: false,
  },
];

export const locations: Location[] = [
  { slug: "sigiriya", name: "Sigiriya", x: 55, y: 42, blurb: "Ancient rock fortress rising from the jungle." },
  { slug: "ella", name: "Ella", x: 62, y: 66, blurb: "Misty hills, Nine Arch Bridge and tea estates." },
  { slug: "mirissa", name: "Mirissa", x: 44, y: 88, blurb: "Palm-fringed bays and whale-watching coast." },
  { slug: "nuwara-eliya", name: "Nuwara Eliya", x: 52, y: 62, blurb: "Cool highlands and endless tea country." },
  { slug: "galle", name: "Galle", x: 38, y: 84, blurb: "Colonial fort walls meeting the Indian Ocean." },
  { slug: "kandy", name: "Kandy", x: 50, y: 55, blurb: "Sacred lakeside city wrapped in hills." },
];

export const testimonials: Testimonial[] = [
  {
    name: "Emma & Jack",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    quote:
      "Our honeymoon film gave us goosebumps. They knew exactly where to fly for that golden light over Mirissa.",
    rating: 5,
  },
  {
    name: "Lukas M.",
    country: "Germany",
    countryFlag: "🇩🇪",
    quote:
      "Professional, punctual and the 4K footage of Ella is unreal. Handled all the permits so we just enjoyed the trip.",
    rating: 5,
  },
  {
    name: "Sophie D.",
    country: "Australia",
    countryFlag: "🇦🇺",
    quote:
      "Booked over WhatsApp in minutes. The surf reel from Weligama looks like a travel commercial.",
    rating: 5,
  },
];

export const packages: Package[] = [
  {
    name: "Half-Day Escape",
    priceFrom: "$149",
    duration: "Up to 4 hours, one location",
    includes: ["1 drone + pilot", "Edited highlight reel (60–90s)", "4K footage delivery", "Basic colour grade"],
  },
  {
    name: "Full-Day Adventure",
    priceFrom: "$279",
    duration: "Up to 8 hours, two locations",
    includes: ["Choice of drone", "Cinematic edit (2–3 min)", "Raw + edited files", "Licensed & insured pilot", "Permit handling"],
    highlight: true,
  },
  {
    name: "Multi-Day / Event",
    priceFrom: "Custom",
    duration: "Weddings, tours & itineraries",
    includes: ["Multiple drones", "Full film + social cuts", "Ground + aerial coverage", "Dedicated producer"],
  },
];

export function getDrone(slug: string): Drone | undefined {
  return drones.find((d) => d.slug === slug);
}

export function droneName(slug: string): string {
  return getDrone(slug)?.name ?? slug;
}
