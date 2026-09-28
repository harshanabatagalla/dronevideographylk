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
  icon: "clock" | "camera" | "signal" | "wind" | "mountain" | "drone";
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
  /** youtube id for long-tail reels (free hosting + SEO). Without one the item is a photo. */
  youtubeId?: string;
  location: string;
  category:
    | "Heritage"
    | "Mountains"
    | "Waterfalls"
    | "Coast"
    | "Lakes and Rivers"
    | "Travel"
    | "Wedding"
    | "Event"
    | "Resort"
    | "Adventure";
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

/* ------------------------------------------------------------------ */
/* Seed data                                                           */
/* ------------------------------------------------------------------ */

// Our fly ready fleet.
export const drones: Drone[] = [
  {
    slug: "dji-air-3",
    name: "DJI Air 3",
    tagline: "Our main drone for weddings, events and wide landscape shots.",
    image: "/media/fleet/dji-air-3-v2.webp",
    specs: [
      { icon: "camera", label: "Video quality", value: "Two cameras, wide and 3x zoom. 4K at 60 fps" },
      { icon: "clock", label: "Flight time", value: "Up to 46 minutes per battery" },
      { icon: "signal", label: "Range", value: "Strong signal up to 20 km" },
      { icon: "wind", label: "Wind handling", value: "Steady in strong wind, up to 12 m/s" },
      { icon: "mountain", label: "Best for", value: "Weddings, hotels and wide landscapes" },
    ],
    bestFor: ["Weddings", "Events", "Hotels", "Landscapes"],
    sampleFootage: [],
    order: 1,
  },
  {
    slug: "dji-air-3s",
    name: "DJI Air 3S",
    tagline: "Big 1 inch camera with a night sensor. Our best all round drone.",
    image: "/media/fleet/dji-air-3s-v2.webp",
    specs: [
      { icon: "camera", label: "Video quality", value: "1 inch main camera (50 MP) and 3x zoom. 4K at 60 fps" },
      { icon: "clock", label: "Flight time", value: "Up to 45 minutes per battery" },
      { icon: "signal", label: "Range", value: "Strong signal up to 20 km" },
      { icon: "wind", label: "Wind handling", value: "Steady in strong wind, up to 12 m/s" },
      { icon: "mountain", label: "Best for", value: "Low light, hotels and property" },
    ],
    bestFor: ["Low light", "Hotels", "Property", "Landscapes"],
    sampleFootage: [],
    order: 2,
  },
  {
    slug: "dji-mavic-4-pro",
    name: "DJI Mavic 4 Pro",
    tagline: "Our flagship. Three cameras and the sharpest pictures we own.",
    image: "/media/fleet/dji-mavic-4-pro-v2.webp",
    specs: [
      { icon: "camera", label: "Video quality", value: "100 MP Hasselblad camera and two zoom cameras. 6K at 60 fps" },
      { icon: "clock", label: "Flight time", value: "Up to 51 minutes per battery" },
      { icon: "signal", label: "Range", value: "Strong signal up to 30 km" },
      { icon: "wind", label: "Wind handling", value: "Steady in strong wind, up to 12 m/s" },
      { icon: "mountain", label: "Best for", value: "Commercial films and high end photos" },
    ],
    bestFor: ["Commercial", "Weddings", "Tourism", "Photography"],
    sampleFootage: [],
    order: 3,
  },
  {
    slug: "dji-avata-360",
    name: "DJI Avata 360",
    tagline: "Films every direction at once. You choose the angle after the flight.",
    image: "/media/fleet/dji-avata-360-v2.webp",
    specs: [
      { icon: "camera", label: "Video quality", value: "360 degree camera. 8K at 60 fps, or 4K at 60 fps on one lens" },
      { icon: "clock", label: "Flight time", value: "Up to 23 minutes per battery" },
      { icon: "signal", label: "Range", value: "Strong signal up to 20 km" },
      { icon: "drone", label: "Extra", value: "Covered propellers and sensors all round, so it is safe indoors" },
      { icon: "mountain", label: "Best for", value: "Hotel walk throughs and event openers" },
    ],
    bestFor: ["Hotels", "Events", "Indoor", "360 video"],
    sampleFootage: [],
    order: 4,
  },
  {
    slug: "dji-avata-2",
    name: "DJI Avata 2",
    tagline: "Goggle drone for fast, close flying through spaces.",
    image: "/media/fleet/dji-avata-2-v2.webp",
    specs: [
      { icon: "camera", label: "Video quality", value: "4K at 60 fps, very wide view" },
      { icon: "clock", label: "Flight time", value: "Up to 23 minutes per battery" },
      { icon: "signal", label: "Range", value: "Strong signal up to 13 km" },
      { icon: "drone", label: "Extra", value: "Covered propellers, so it is safer near people" },
      { icon: "mountain", label: "Best for", value: "Venue tours, parties and action" },
    ],
    bestFor: ["Venue tours", "Events", "Action"],
    sampleFootage: [],
    order: 5,
  },
  {
    slug: "dji-avata",
    name: "DJI Avata",
    tagline: "Our first goggle drone. Still the one for tight indoor shots.",
    image: "/media/fleet/dji-avata-v2.webp",
    specs: [
      { icon: "camera", label: "Video quality", value: "4K at 60 fps, very wide view" },
      { icon: "clock", label: "Flight time", value: "Up to 18 minutes per battery" },
      { icon: "signal", label: "Range", value: "Strong signal up to 10 km" },
      { icon: "drone", label: "Extra", value: "Covered propellers for flying close to walls" },
      { icon: "mountain", label: "Best for", value: "Indoor tours and tight spaces" },
    ],
    bestFor: ["Indoor", "Tight spaces", "Tours"],
    sampleFootage: [],
    order: 6,
  },
  {
    slug: "dji-mavic-air-2",
    name: "DJI Mavic Air 2",
    tagline: "Long flights and steady video over open ground.",
    image: "/media/fleet/dji-mavic-air-2-v2.webp",
    specs: [
      { icon: "camera", label: "Video quality", value: "4K at 60 fps, 48 MP photos" },
      { icon: "clock", label: "Flight time", value: "Up to 34 minutes per battery" },
      { icon: "signal", label: "Range", value: "Signal up to 10 km" },
      { icon: "wind", label: "Wind handling", value: "Holds steady in normal coastal wind" },
      { icon: "mountain", label: "Best for", value: "Beaches, fields and time lapse" },
    ],
    bestFor: ["Beaches", "Long flights", "Time lapse"],
    sampleFootage: [],
    order: 7,
  },
  {
    slug: "dji-mini-2",
    name: "DJI Mini 2",
    tagline: "Small and quiet. Good for temples, villages and tight spaces.",
    image: "/media/fleet/dji-mini-2-v2.webp",
    specs: [
      { icon: "camera", label: "Video quality", value: "4K at 30 fps" },
      { icon: "clock", label: "Flight time", value: "Up to 31 minutes per battery" },
      { icon: "signal", label: "Range", value: "Signal up to 10 km" },
      { icon: "drone", label: "Extra", value: "Weighs 249 g and stays quiet near people" },
      { icon: "mountain", label: "Best for", value: "Villages, temples and travel clips" },
    ],
    bestFor: ["Travel", "Tight spaces", "Quiet shoots"],
    sampleFootage: [],
    order: 8,
  },
];

// Our own drone photos (DJI originals on the studio drive, locations checked by GPS,
// cinematic grade applied on export).
export const footage: Footage[] = [
  {
    id: "sigiriya-rock-pidurangala",
    title: "Sigiriya Rock and Pidurangala",
    poster: "/media/portfolio/sigiriya-rock-pidurangala.webp",
    location: "Sigiriya",
    category: "Heritage",
    droneSlug: "",
    featured: true,
  },
  {
    id: "gartmore-falls",
    title: "Gartmore Falls",
    poster: "/media/portfolio/gartmore-falls.webp",
    location: "Maskeliya",
    category: "Waterfalls",
    droneSlug: "",
    featured: true,
  },
  {
    id: "hiriketiya-bay",
    title: "Hiriketiya Bay",
    poster: "/media/portfolio/hiriketiya-bay.webp",
    location: "Hiriketiya",
    category: "Coast",
    droneSlug: "",
    featured: true,
  },
  {
    id: "kandy-lake-dusk",
    title: "Kandy Lake at Dusk",
    poster: "/media/portfolio/kandy-lake-dusk.webp",
    location: "Kandy",
    category: "Lakes and Rivers",
    droneSlug: "",
    featured: true,
  },
  {
    id: "lakegala-peak-meemure",
    title: "Lakegala Peak, Meemure",
    poster: "/media/portfolio/lakegala-peak-meemure.webp",
    location: "Meemure",
    category: "Mountains",
    droneSlug: "",
    featured: true,
  },
  {
    id: "arippu-doric-sunset",
    title: "Sunset at the Doric, Arippu",
    poster: "/media/portfolio/arippu-doric-sunset.webp",
    location: "Arippu",
    category: "Coast",
    droneSlug: "",
    featured: true,
  },
  {
    id: "sigiriya-sunset",
    title: "Sigiriya at Sunset",
    poster: "/media/portfolio/sigiriya-sunset.webp",
    location: "Sigiriya",
    category: "Heritage",
    droneSlug: "",
    featured: false,
  },
  {
    id: "knuckles-rice-terraces",
    title: "Rice Terraces, Knuckles Range",
    poster: "/media/portfolio/knuckles-rice-terraces.webp",
    location: "Knuckles",
    category: "Mountains",
    droneSlug: "",
    featured: false,
  },
  {
    id: "hills-around-ella",
    title: "Hills around Ella",
    poster: "/media/portfolio/hills-around-ella.webp",
    location: "Ella",
    category: "Mountains",
    droneSlug: "",
    featured: false,
  },
  {
    id: "bambarakanda-falls",
    title: "Bambarakanda Falls",
    poster: "/media/portfolio/bambarakanda-falls.webp",
    location: "Bambarakanda",
    category: "Waterfalls",
    droneSlug: "",
    featured: false,
  },
  {
    id: "kalpitiya-sand-islands",
    title: "Sand Islands off Kalpitiya",
    poster: "/media/portfolio/kalpitiya-sand-islands.webp",
    location: "Kalpitiya",
    category: "Coast",
    droneSlug: "",
    featured: false,
  },
  {
    id: "kalpitiya-lagoon-island",
    title: "Island Lagoon off Kalpitiya",
    poster: "/media/portfolio/kalpitiya-lagoon-island.webp",
    location: "Kalpitiya",
    category: "Coast",
    droneSlug: "",
    featured: false,
  },
  {
    id: "arugam-bay-lagoon",
    title: "Lagoon and Beach near Arugam Bay",
    poster: "/media/portfolio/arugam-bay-lagoon.webp",
    location: "Arugam Bay",
    category: "Coast",
    droneSlug: "",
    featured: false,
  },
  {
    id: "bomburu-ella",
    title: "Bomburu Ella",
    poster: "/media/portfolio/bomburu-ella.webp",
    location: "Uva Paranagama",
    category: "Waterfalls",
    droneSlug: "",
    featured: false,
  },
  {
    id: "lakshapana-falls",
    title: "Lakshapana Falls",
    poster: "/media/portfolio/lakshapana-falls.webp",
    location: "Lakshapana",
    category: "Waterfalls",
    droneSlug: "",
    featured: false,
  },
  {
    id: "aberdeen-falls",
    title: "Aberdeen Falls",
    poster: "/media/portfolio/aberdeen-falls.webp",
    location: "Ginigathhena",
    category: "Waterfalls",
    droneSlug: "",
    featured: false,
  },
  {
    id: "kandalama-reservoir",
    title: "Kandalama Reservoir",
    poster: "/media/portfolio/kandalama-reservoir.webp",
    location: "Kandalama",
    category: "Lakes and Rivers",
    droneSlug: "",
    featured: false,
  },
  {
    id: "moragahakanda-reservoir",
    title: "Moragahakanda Reservoir",
    poster: "/media/portfolio/moragahakanda-reservoir.webp",
    location: "Moragahakanda",
    category: "Lakes and Rivers",
    droneSlug: "",
    featured: false,
  },
  {
    id: "mahaweli-river-somawathiya",
    title: "Mahaweli River",
    poster: "/media/portfolio/mahaweli-river-somawathiya.webp",
    location: "Somawathiya",
    category: "Lakes and Rivers",
    droneSlug: "",
    featured: false,
  },
  {
    id: "mahaweli-reservoir-hills",
    title: "Mahaweli Reservoir from the Hills",
    poster: "/media/portfolio/mahaweli-reservoir-hills.webp",
    location: "Central Hills",
    category: "Lakes and Rivers",
    droneSlug: "",
    featured: false,
  },
  {
    id: "sea-of-clouds-sunrise",
    title: "Sea of Clouds at Sunrise",
    poster: "/media/portfolio/sea-of-clouds-sunrise.webp",
    location: "Central Hills",
    category: "Mountains",
    droneSlug: "",
    featured: false,
  },
  {
    id: "theppukulama-mountain",
    title: "Theppukulama Mountain",
    poster: "/media/portfolio/theppukulama-mountain.webp",
    location: "Balakaduwa",
    category: "Mountains",
    droneSlug: "",
    featured: false,
  },
];

export const locations: Location[] = [
  { slug: "sigiriya", name: "Sigiriya", x: 55, y: 42, blurb: "An old rock fortress in the jungle." },
  { slug: "ella", name: "Ella", x: 62, y: 66, blurb: "Misty hills, Nine Arch Bridge and tea estates." },
  { slug: "mirissa", name: "Mirissa", x: 44, y: 88, blurb: "Palm trees, calm bays and whale watching." },
  { slug: "nuwara-eliya", name: "Nuwara Eliya", x: 52, y: 62, blurb: "Cool hills and tea fields." },
  { slug: "galle", name: "Galle", x: 38, y: 84, blurb: "Old fort walls by the Indian Ocean." },
  { slug: "kandy", name: "Kandy", x: 50, y: 55, blurb: "A lake city in the hills." },
  { slug: "knuckles", name: "Knuckles", x: 55, y: 50, blurb: "Mountain peaks, forest and old rice terraces." },
  { slug: "meemure", name: "Meemure", x: 58, y: 51, blurb: "A remote village below the sharp peak of Lakegala." },
  { slug: "bambarakanda", name: "Bambarakanda", x: 56, y: 68, blurb: "The tallest waterfall in Sri Lanka." },
  { slug: "kalpitiya", name: "Kalpitiya", x: 28, y: 34, blurb: "Sand islands and a calm lagoon on the west coast." },
  { slug: "maskeliya", name: "Maskeliya", x: 46, y: 64, blurb: "Tea hills, a reservoir and tall waterfalls." },
  { slug: "hiriketiya", name: "Hiriketiya", x: 52, y: 90, blurb: "A small horseshoe bay on the south coast." },
  { slug: "arippu", name: "Arippu", x: 33, y: 22, blurb: "Old colonial ruins on the sea cliffs of Mannar." },
  { slug: "arugam-bay", name: "Arugam Bay", x: 80, y: 66, blurb: "Lagoons, rocks and long beaches on the east coast." },
  { slug: "kandalama", name: "Kandalama", x: 54, y: 40, blurb: "A large reservoir near Dambulla and Sigiriya." },
  { slug: "somawathiya", name: "Somawathiya", x: 66, y: 36, blurb: "The Mahaweli River winding through forest." },
];

// Real client reviews only, added from the admin dashboard. The original seed
// entries were placeholders, not real clients, so the site starts with none.
export const testimonials: Testimonial[] = [];

export function getDrone(slug: string): Drone | undefined {
  return drones.find((d) => d.slug === slug);
}

export function droneName(slug: string): string {
  return getDrone(slug)?.name ?? slug;
}
