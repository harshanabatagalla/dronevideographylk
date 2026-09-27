/**
 * Drone shop catalog.
 *
 * DJI consumer drones from the Mavic Mini (the original "Mini 1") upward, all
 * under USD 5,000. Prices are DJI launch prices in USD for the listed kit and
 * are the single source of truth: the order API re-prices every cart from this
 * file, so a tampered client price can never reach an order.
 *
 * Product photos are real photos of each drone, used under Creative Commons
 * licences and credited in src/lib/photo-credits.ts. Models with no free photo
 * use a drawn illustration instead. DJI's own product photos are never used.
 *
 * Copy rules for this file: plain words a first-time buyer understands, short
 * sentences, no dashes or hyphens in customer-facing text.
 */

export type ShopSeries = "Mini" | "Flip" | "Air" | "Mavic" | "FPV";

export type Variant = {
  id: string;
  label: string;
  /** What is in the box. */
  includes: string;
  /** Price in Sri Lankan rupees. Left out when we have no confirmed price. */
  lkr?: number;
};

export type ShopProduct = {
  slug: string;
  /** Exact DJI model name. */
  name: string;
  series: ShopSeries;
  released: number;
  /** USD, for the kit described in `kit`. */
  price: number;
  /** What the price includes. */
  kit: string;
  /** Standard and combo options. The first one is the default. */
  variants?: Variant[];
  /** True when DJI has no official USD price and the figure is converted. */
  priceEstimated?: boolean;
  /** DJI has stopped making this model. */
  discontinued?: boolean;
  inStock: boolean;
  headline: string;
  purpose: string;
  bestFor: string[];
  wind: { ms: number; level: string; note: string };
  specs: { label: string; value: string }[];
  benefits: string[];
  issues: string[];
  goodToKnow: string[];
  image?: string;
};

export const SERIES: { key: ShopSeries; label: string; blurb: string }[] = [
  { key: "Mini", label: "Mini", blurb: "Small and light. Under 250 g. Easy to carry on a trip." },
  { key: "Flip", label: "Flip", blurb: "Very small, with covers around the propellers. Safe near people." },
  { key: "Air", label: "Air", blurb: "Medium size. Better in wind. Better camera." },
  { key: "Mavic", label: "Mavic", blurb: "The best cameras. Made for paid work." },
  { key: "FPV", label: "Goggle drones", blurb: "You fly them wearing goggles, as if you are sitting in the drone." },
];

const kmh = (ms: number) => Math.round(ms * 3.6);

export function windLabel(p: ShopProduct): string {
  return `${p.wind.ms} m/s (${kmh(p.wind.ms)} km/h), ${p.wind.level}`;
}

const KIT_BASIC = "Drone, remote and 1 battery";

export const products: ShopProduct[] = [
  /* ------------------------------ Mini ------------------------------ */
  {
    slug: "dji-mavic-mini",
    name: "DJI Mavic Mini",
    series: "Mini",
    released: 2019,
    price: 399,
    kit: KIT_BASIC,
    image: "/media/shop/dji-mavic-mini-v2.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, remote and 1 battery" },
      { id: "combo", label: "Fly More Combo", includes: "Drone, remote, 3 batteries, charging hub, spare propellers and a bag" },
    ],
    discontinued: true,
    inStock: true,
    headline: "The first DJI Mini. A low cost drone to learn on.",
    purpose:
      "This is the drone that started the Mini range. It is a good first drone if you want to learn to fly before you spend more. The photos and videos are fine for social media on a sunny day.",
    bestFor: ["First drone", "Learning to fly", "Holiday clips"],
    wind: {
      ms: 8,
      level: "Level 4",
      note: "Good on calm days. On the beach or in the hills it gets pushed around. Fly it in the morning or late afternoon when the wind is low.",
    },
    specs: [
      { label: "Camera", value: "Small sensor, 12 MP photos" },
      { label: "Video", value: "2.7K, 30 fps" },
      { label: "Flight time", value: "Up to 30 minutes" },
      { label: "Signal range", value: "Up to 4 km" },
      { label: "Sees obstacles", value: "Only below it" },
      { label: "Weight", value: "249 g" },
    ],
    benefits: [
      "Very light. Fits in a jacket pocket.",
      "Cheap to fix if you crash while learning.",
      "The camera stays steady, so videos look smooth.",
      "You control it with the DJI Fly app on your phone.",
    ],
    issues: [
      "The signal drops near buildings and in busy towns.",
      "No 4K video.",
      "It cannot see trees in front of it or behind it.",
      "Spare batteries and parts are getting hard to find.",
    ],
    goodToKnow: [
      "DJI does not make this drone any more. We have limited stock.",
      "It cannot follow you by itself.",
    ],
  },
  {
    slug: "dji-mini-se",
    name: "DJI Mini SE",
    series: "Mini",
    released: 2021,
    price: 299,
    kit: KIT_BASIC,
    image: "/media/shop/dji-mini-se-v2.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, remote and 1 battery" },
      { id: "combo", label: "Fly More Combo", includes: "Drone, remote, 3 batteries, charging hub, spare propellers and a bag" },
    ],
    discontinued: true,
    inStock: true,
    headline: "Almost the same as the Mavic Mini, for less money.",
    purpose:
      "The Mini SE has the same body and camera as the Mavic Mini, with stronger motors. It is good for practice and simple holiday videos if you do not need 4K.",
    bestFor: ["Small budget", "Practice", "Young pilots"],
    wind: {
      ms: 8,
      level: "Level 4",
      note: "Fine in a light breeze. Stay away from windy beaches and hill tops.",
    },
    specs: [
      { label: "Camera", value: "Small sensor, 12 MP photos" },
      { label: "Video", value: "2.7K, 30 fps" },
      { label: "Flight time", value: "Up to 30 minutes" },
      { label: "Signal range", value: "Up to 4 km" },
      { label: "Sees obstacles", value: "Only below it" },
      { label: "Weight", value: "249 g" },
    ],
    benefits: [
      "The cheapest way to own a DJI drone.",
      "It holds still in the air, even for beginners.",
      "It flies back to you by itself if the signal is lost.",
      "Folds small for travel.",
    ],
    issues: [
      "Short signal range compared with newer Minis.",
      "Photos and videos look grainy after sunset.",
      "It cannot see branches in front of it.",
      "No 4K, so videos look soft on a big TV.",
    ],
    goodToKnow: ["DJI does not make this drone any more. The Mini 4K replaced it."],
  },
  {
    slug: "dji-mini-2",
    name: "DJI Mini 2",
    series: "Mini",
    released: 2020,
    price: 449,
    kit: KIT_BASIC,
    image: "/media/shop/dji-mini-2-v2.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, remote and 1 battery" },
      { id: "combo", label: "Fly More Combo", includes: "Drone, remote, 3 batteries, charging hub, spare propellers and a bag" },
    ],
    discontinued: true,
    inStock: true,
    headline: "Small drone with 4K video and a strong signal.",
    purpose:
      "The Mini 2 was the first Mini with 4K video. Its signal reaches much further than the Mavic Mini. It is a good small drone for travel videos.",
    bestFor: ["Travel videos", "Beginners who want 4K", "Social media"],
    wind: {
      ms: 10.5,
      level: "Level 5",
      note: "Much stronger than the Mavic Mini. It holds its place in normal wind. On the coast, keep extra battery to fly back against the wind.",
    },
    specs: [
      { label: "Camera", value: "Small sensor, 12 MP photos" },
      { label: "Video", value: "4K, 30 fps" },
      { label: "Flight time", value: "Up to 31 minutes" },
      { label: "Signal range", value: "Up to 10 km" },
      { label: "Sees obstacles", value: "Only below it" },
      { label: "Weight", value: "249 g" },
    ],
    benefits: [
      "Sharp 4K video.",
      "Strong signal that rarely drops.",
      "A good low cost 4K drone.",
      "Handles wind better than the first Mini.",
    ],
    issues: [
      "It cannot see obstacles in front or behind.",
      "It cannot follow you by itself.",
      "Colours are harder to fix when you edit.",
      "The camera cable can break in a hard crash.",
    ],
    goodToKnow: ["DJI does not make this drone any more. The Mini 4K replaced it."],
  },
  {
    slug: "dji-mini-2-se",
    name: "DJI Mini 2 SE",
    series: "Mini",
    released: 2023,
    price: 339,
    kit: KIT_BASIC,
    image: "/media/shop/dji-mini-2-se-v2.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, remote and 1 battery" },
      { id: "combo", label: "Fly More Combo", includes: "Drone, remote, 3 batteries, charging hub, spare propellers and a bag" },
    ],
    inStock: true,
    headline: "Low price Mini with a long range signal.",
    purpose:
      "The Mini 2 SE is a beginner drone. The camera is not 4K, but the signal is strong and reaches up to 10 km. Choose it if a steady signal matters more to you than picture quality.",
    bestFor: ["Beginners", "Simple travel clips", "A gift for a new pilot"],
    wind: {
      ms: 10.7,
      level: "Level 5",
      note: "Steady in a normal sea breeze. Do not fly it on very windy days.",
    },
    specs: [
      { label: "Camera", value: "Small sensor, 12 MP photos" },
      { label: "Video", value: "2.7K, 30 fps" },
      { label: "Flight time", value: "Up to 31 minutes" },
      { label: "Signal range", value: "Up to 10 km" },
      { label: "Sees obstacles", value: "Only below it" },
      { label: "Weight", value: "Under 249 g" },
    ],
    benefits: [
      "Strong signal for the price.",
      "Very easy to fly. Ready made moves with one tap.",
      "Light and small. Fits in any bag.",
      "Spare batteries are cheap.",
    ],
    issues: [
      "No 4K video.",
      "It cannot see obstacles in front or behind.",
      "Photos cannot be saved in RAW format for editing.",
      "Video gets grainy in low light.",
    ],
    goodToKnow: ["For 4K at a similar price, look at the DJI Mini 4K."],
  },
  {
    slug: "dji-mini-4k",
    name: "DJI Mini 4K",
    series: "Mini",
    released: 2024,
    price: 299,
    kit: KIT_BASIC,
    image: "/media/shop/dji-mini-4k-v2.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, remote and 1 battery" },
      { id: "combo", label: "Fly More Combo", includes: "Drone, remote, 3 batteries, charging hub, spare propellers and a bag", lkr: 144500 },
    ],
    inStock: true,
    headline: "The cheapest DJI drone with 4K video.",
    purpose:
      "The Mini 4K is the lowest price DJI drone that films in 4K. It is made for beginners and travellers who want sharp video without paying for extra features.",
    bestFor: ["Beginners", "4K on a budget", "Holidays"],
    wind: {
      ms: 10.7,
      level: "Level 5",
      note: "Steady in a normal sea breeze. Watch the wind warning in the app when you fly over water.",
    },
    specs: [
      { label: "Camera", value: "Small sensor, 12 MP photos" },
      { label: "Video", value: "4K, 30 fps" },
      { label: "Flight time", value: "Up to 31 minutes" },
      { label: "Signal range", value: "Up to 10 km" },
      { label: "Sees obstacles", value: "Only below it" },
      { label: "Weight", value: "Under 249 g" },
    ],
    benefits: [
      "4K video at a low price.",
      "2x zoom while filming in 4K.",
      "Flies back to you by itself.",
      "Light enough for long walks and hikes.",
    ],
    issues: [
      "It cannot see obstacles in front, behind or at the sides.",
      "It cannot follow you by itself.",
      "Sunrise and sunset shots look grainy.",
      "Colours are harder to fix when you edit.",
    ],
    goodToKnow: ["Good value if you mostly fly in open places like beaches and fields."],
  },
  {
    slug: "dji-mini-3",
    name: "DJI Mini 3",
    series: "Mini",
    released: 2022,
    price: 469,
    kit: KIT_BASIC,
    image: "/media/shop/dji-mini-3-v3.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, remote and 1 battery" },
      { id: "combo", label: "Fly More Combo (DJI RC)", includes: "Drone, DJI RC remote with screen, batteries, propellers and a bag", lkr: 225500 },
    ],
    inStock: true,
    headline: "Bigger camera sensor and long flights, at a fair price.",
    purpose:
      "The Mini 3 has a bigger camera sensor than the Mini 2, so sunset and evening shots look cleaner. It flies for up to 38 minutes. It does not avoid obstacles, so fly it in open spaces.",
    bestFor: ["Sunrise and sunset", "Travel videos", "Upright videos for Reels"],
    wind: {
      ms: 10.7,
      level: "Level 5",
      note: "Steady in normal wind. The long battery life gives you time to fly back against the wind.",
    },
    specs: [
      { label: "Camera", value: "Larger sensor (1/1.3 inch), 12 MP photos" },
      { label: "Video", value: "4K HDR, 30 fps" },
      { label: "Flight time", value: "Up to 38 minutes (51 with the bigger battery)" },
      { label: "Signal range", value: "Up to 10 km" },
      { label: "Sees obstacles", value: "Only below it" },
      { label: "Weight", value: "Under 249 g" },
    ],
    benefits: [
      "Cleaner evening shots than the Mini 2 or Mini 4K.",
      "The camera turns sideways for upright phone videos.",
      "Long flight time on one battery.",
      "HDR keeps detail in bright skies.",
    ],
    issues: [
      "It cannot see obstacles in front or behind.",
      "It cannot follow you by itself.",
      "Slow motion is limited.",
      "The bigger battery makes it weigh more than 250 g.",
    ],
    goodToKnow: ["If you want obstacle sensing and follow mode, look at the Mini 4 Pro."],
  },
  {
    slug: "dji-mini-3-pro",
    name: "DJI Mini 3 Pro",
    series: "Mini",
    released: 2022,
    price: 759,
    kit: KIT_BASIC,
    image: "/media/shop/dji-mini-3-pro-v2.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, remote and 1 battery" },
      { id: "combo", label: "Fly More Combo", includes: "Drone, remote, 3 batteries, charging hub, spare propellers and a bag" },
    ],
    inStock: true,
    headline: "The first Mini that sees obstacles and follows you.",
    purpose:
      "The Mini 3 Pro can see obstacles in front and behind, and it can follow you by itself. It films 4K at 60 fps. It is a good pick for people who make videos of themselves.",
    bestFor: ["Content creators", "Follow shots", "Travel vlogs"],
    wind: {
      ms: 10.7,
      level: "Level 5",
      note: "Handles normal wind well. In strong gusts the follow mode gets shaky, so fly it yourself.",
    },
    specs: [
      { label: "Camera", value: "Larger sensor (1/1.3 inch), 48 MP photos" },
      { label: "Video", value: "4K, 60 fps" },
      { label: "Flight time", value: "Up to 34 minutes (47 with the bigger battery)" },
      { label: "Signal range", value: "Up to 12 km" },
      { label: "Sees obstacles", value: "Front, back and below" },
      { label: "Weight", value: "Under 249 g" },
    ],
    benefits: [
      "Follows you while you walk, cycle or surf.",
      "Sees obstacles in front and behind.",
      "Has a flat colour mode that is good for editing.",
      "The camera turns sideways for upright phone videos.",
    ],
    issues: [
      "It cannot see obstacles at the sides, so it can hit trees when it moves sideways.",
      "Follow mode was weak at first and needed updates.",
      "The camera sticks out and can get knocked in a crash.",
      "The Mini 4 Pro replaced it, so ask us about stock first.",
    ],
    goodToKnow: ["This price is with the basic remote. The remote with a built in screen costs more."],
  },
  {
    slug: "dji-mini-4-pro",
    name: "DJI Mini 4 Pro",
    series: "Mini",
    released: 2023,
    price: 759,
    kit: KIT_BASIC,
    image: "/media/shop/dji-mini-4-pro-v2.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, remote and 1 battery" },
      { id: "combo", label: "Fly More Combo Plus (RC 2)", includes: "Drone, RC 2 remote with screen, 3 Plus batteries, charging hub, propellers, bag and tools", lkr: 324500 },
    ],
    inStock: true,
    headline: "Sees obstacles on every side, and still weighs under 250 g.",
    purpose:
      "The Mini 4 Pro sees obstacles all around it and follows you by itself. The video is good enough for paid work. For most people this is the best Mini to buy.",
    bestFor: ["Everyday use", "Travel and vlogs", "Your first paid jobs"],
    wind: {
      ms: 10.7,
      level: "Level 5",
      note: "Steady in normal coastal wind. It is still a small drone, so do not fly far out over the sea on windy days.",
    },
    specs: [
      { label: "Camera", value: "Larger sensor (1/1.3 inch), 48 MP photos" },
      { label: "Video", value: "4K HDR, 60 fps. Slow motion at 100 fps" },
      { label: "Flight time", value: "Up to 34 minutes (45 with the bigger battery)" },
      { label: "Signal range", value: "Up to 20 km" },
      { label: "Sees obstacles", value: "All sides" },
      { label: "Weight", value: "Under 249 g" },
    ],
    benefits: [
      "Sees obstacles on all sides, so it is safer near trees.",
      "Has a flat colour mode that is good for editing.",
      "Very strong signal.",
      "Follows you smoothly from any side.",
    ],
    issues: [
      "Obstacle sensing does not work well at night or over water.",
      "The price goes up fast with extra batteries and the screen remote.",
      "It can get too hot if you leave it on in the sun before take off.",
      "The propellers wear out fast if you take off from sand.",
    ],
    goodToKnow: [
      "This price is with the basic remote. The remote with a built in screen costs more.",
      "Use a landing pad on sand or grass.",
    ],
  },
  {
    slug: "dji-mini-5-pro",
    name: "DJI Mini 5 Pro",
    series: "Mini",
    released: 2025,
    price: 799,
    kit: KIT_BASIC,
    image: "/media/shop/dji-mini-5-pro-v3.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, remote and 1 battery" },
      { id: "combo", label: "Fly More Combo", includes: "Drone, remote, 3 batteries, charging hub, propellers and a bag", lkr: 369500 },
    ],
    priceEstimated: true,
    inStock: true,
    headline: "The first Mini with a 1 inch camera sensor.",
    purpose:
      "The Mini 5 Pro has a big 1 inch camera sensor, so night and evening shots look much cleaner. It also has a laser sensor at the front that helps it see obstacles in the dark. Choose it if you want top picture quality in a small drone.",
    bestFor: ["Night and evening", "Serious video makers", "Travel films"],
    wind: {
      ms: 12,
      level: "Level 6",
      note: "The best Mini in wind so far. It handles the coast better than older Minis. An Air drone is still steadier in strong gusts.",
    },
    specs: [
      { label: "Camera", value: "Big 1 inch sensor, 50 MP photos" },
      { label: "Video", value: "4K HDR, 60 fps. Slow motion at 120 fps" },
      { label: "Flight time", value: "Up to 36 minutes" },
      { label: "Signal range", value: "Up to 20 km" },
      { label: "Sees obstacles", value: "All sides, plus a laser sensor at the front" },
      { label: "Weight", value: "About 250 g" },
    ],
    benefits: [
      "The biggest camera sensor in any Mini. Cleaner night shots.",
      "The laser sensor helps it avoid obstacles in the dark.",
      "The camera can tilt for upright and creative shots.",
      "Handles wind better than older Minis.",
    ],
    issues: [
      "It weighs right on the 250 g line, so check the rules where you fly.",
      "New model, so spare parts are still hard to find.",
      "It costs almost the same as the Air 3S, which is better in wind.",
      "Large video files need a fast memory card.",
    ],
    goodToKnow: ["DJI has no official US dollar price for this drone. Our price is an estimate. We will confirm it with you."],
  },

  /* ------------------------------ Flip ------------------------------ */
  {
    slug: "dji-flip",
    name: "DJI Flip",
    series: "Flip",
    released: 2025,
    price: 439,
    kit: KIT_BASIC,
    image: "/media/shop/dji-flip-v2.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, remote and 1 battery" },
      { id: "combo", label: "Fly More Combo", includes: "Drone, remote, 3 batteries, charging hub, spare propellers and a bag" },
    ],
    inStock: true,
    headline: "A small drone with covers around the propellers. Safe near people.",
    purpose:
      "The Flip has full covers around its propellers. It can take off from your hand and follow you without the remote. It is made for vlogs and family trips.",
    bestFor: ["Vlogs", "Family trips", "Close shots of people"],
    wind: {
      ms: 10.7,
      level: "Level 5",
      note: "The covers catch the wind. Fly it on calm or light wind days, and keep it close on the beach.",
    },
    specs: [
      { label: "Camera", value: "Larger sensor (1/1.3 inch), 48 MP photos" },
      { label: "Video", value: "4K HDR, 60 fps. Slow motion at 100 fps" },
      { label: "Flight time", value: "Up to 31 minutes" },
      { label: "Signal range", value: "Up to 13 km" },
      { label: "Sees obstacles", value: "Only in front" },
      { label: "Weight", value: "Under 249 g" },
    ],
    benefits: [
      "The covers make it much safer around people.",
      "Takes off from your hand and lands back in it.",
      "Same camera sensor size as the Mini 4 Pro.",
      "Folds flat to carry.",
    ],
    issues: [
      "Only sees obstacles in front.",
      "The covers make it bigger and slower than a Mini.",
      "Less steady than a Mini in strong wind.",
      "It can lose you in a crowd when it follows you.",
    ],
    goodToKnow: ["Great for selfies and group shots. For wide landscape videos, choose a Mini or an Air."],
  },

  /* ------------------------------- Air ------------------------------- */
  {
    slug: "dji-mavic-air-2",
    name: "DJI Mavic Air 2",
    series: "Air",
    released: 2020,
    price: 799,
    kit: KIT_BASIC,
    image: "/media/shop/dji-mavic-air-2-v2.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, remote and 1 battery" },
      { id: "combo", label: "Fly More Combo", includes: "Drone, remote, 3 batteries, charging hub, spare propellers and a bag" },
    ],
    discontinued: true,
    inStock: true,
    headline: "A proven medium size drone with smooth 4K video.",
    purpose:
      "The Mavic Air 2 is bigger than a Mini. It has a 48 MP camera and long flights. It is a good step up if you fly where it is windy and want steadier video.",
    bestFor: ["Windy places", "Landscape videos", "Time lapse"],
    wind: {
      ms: 10.5,
      level: "Level 5",
      note: "Heavier than a Mini, so it feels steadier in gusts.",
    },
    specs: [
      { label: "Camera", value: "Half inch sensor, 48 MP photos" },
      { label: "Video", value: "4K, 60 fps" },
      { label: "Flight time", value: "Up to 34 minutes" },
      { label: "Signal range", value: "Up to 10 km" },
      { label: "Sees obstacles", value: "Front, back and below" },
      { label: "Weight", value: "570 g" },
    ],
    benefits: [
      "Long flight time for its size.",
      "Follows you by itself.",
      "Good time lapse and panorama modes.",
      "Steadier than a Mini in real wind.",
    ],
    issues: [
      "Smaller camera sensor than the Air 2S.",
      "It cannot see obstacles at the sides.",
      "Old model, so parts are harder to find.",
      "Over 250 g, so more rules apply.",
    ],
    goodToKnow: ["DJI does not make this drone any more. The Air 3 or Air 3S is the newer choice."],
  },
  {
    slug: "dji-air-2s",
    name: "DJI Air 2S",
    series: "Air",
    released: 2021,
    price: 999,
    kit: KIT_BASIC,
    image: "/media/shop/dji-air-2s-v2.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, remote and 1 battery" },
      { id: "combo", label: "Fly More Combo", includes: "Drone, remote, 3 batteries, charging hub, spare propellers and a bag" },
    ],
    discontinued: true,
    inStock: true,
    headline: "Big 1 inch camera sensor in a medium size drone.",
    purpose:
      "The Air 2S was the first Air drone with a 1 inch sensor. Photos and videos have much more detail. It is good for photographers and for filming houses and land.",
    bestFor: ["Photographers", "Houses and land", "Landscape videos"],
    wind: {
      ms: 10.7,
      level: "Level 5",
      note: "Steady in normal wind. It is heavier than a Mini, so gusts move it less.",
    },
    specs: [
      { label: "Camera", value: "Big 1 inch sensor, 20 MP photos" },
      { label: "Video", value: "5.4K, 30 fps. 4K, 60 fps" },
      { label: "Flight time", value: "Up to 31 minutes" },
      { label: "Signal range", value: "Up to 12 km" },
      { label: "Sees obstacles", value: "Front, back, above and below" },
      { label: "Weight", value: "595 g" },
    ],
    benefits: [
      "The big sensor gives rich detail and good colour.",
      "Has a flat colour mode that is good for editing.",
      "Small enough to carry all day.",
      "Good value today.",
    ],
    issues: [
      "It cannot see obstacles at the sides.",
      "You need lens filters in bright sun.",
      "Shorter flights than newer Air drones.",
      "It can get too hot on the ground in strong sun.",
    ],
    goodToKnow: ["DJI does not make this drone any more. Ask us about stock first."],
  },
  {
    slug: "dji-air-3",
    name: "DJI Air 3",
    series: "Air",
    released: 2023,
    price: 1099,
    kit: KIT_BASIC,
    image: "/media/shop/dji-air-3-v2.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, remote and 1 battery" },
      { id: "combo", label: "Fly More Combo", includes: "Drone, remote, 3 batteries, charging hub, spare propellers and a bag" },
    ],
    inStock: true,
    headline: "Two cameras and up to 46 minutes in the air.",
    purpose:
      "The Air 3 has two cameras. One is wide. The other zooms in 3 times. You get more kinds of shots, and the battery lasts a very long time.",
    bestFor: ["Travel films", "Weddings and events", "Zoomed in shots"],
    wind: {
      ms: 12,
      level: "Level 6",
      note: "Good in strong wind on the coast and in the hills. A good choice for Ella, Nuwara Eliya and the south coast.",
    },
    specs: [
      { label: "Camera", value: "2 cameras, wide and 3x zoom, 48 MP" },
      { label: "Video", value: "4K HDR, 60 fps. Slow motion at 100 fps" },
      { label: "Flight time", value: "Up to 46 minutes" },
      { label: "Signal range", value: "Up to 20 km" },
      { label: "Sees obstacles", value: "All sides" },
      { label: "Weight", value: "720 g" },
    ],
    benefits: [
      "Very long flight time on one battery.",
      "The zoom camera makes mountains look bigger and closer.",
      "Sees obstacles on all sides.",
      "Strong in wind for its size.",
    ],
    issues: [
      "The main camera sensor is smaller than the Air 2S.",
      "Obstacle sensing does not work well at night.",
      "The zoom camera is weaker in low light.",
      "Heavier than a Mini, so it must be registered in most places.",
    ],
    goodToKnow: ["The Air 3S is newer, but the Air 3 is still a strong buy if you want long flights."],
  },
  {
    slug: "dji-air-3s",
    name: "DJI Air 3S",
    series: "Air",
    released: 2024,
    price: 1099,
    kit: KIT_BASIC,
    image: "/media/shop/dji-air-3s-v2.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, remote and 1 battery" },
      { id: "combo", label: "Fly More Combo (RC-N3)", includes: "Drone, RC-N3 remote, 3 batteries, charging hub, ND filters, propellers and a bag", lkr: 419500 },
    ],
    inStock: true,
    headline: "A big 1 inch camera, a zoom camera, and a night sensor.",
    purpose:
      "The Air 3S has a big 1 inch main camera and a 3x zoom camera. A laser sensor at the front helps it see obstacles at night. For most people starting paid drone work, this is the one to buy.",
    bestFor: ["Paid video work", "Night and city shots", "Hotels and houses"],
    wind: {
      ms: 12,
      level: "Level 6",
      note: "Very good in strong wind. A safe choice for beach hotels, cliffs and mountains.",
    },
    specs: [
      { label: "Camera", value: "Big 1 inch main camera (50 MP) and 3x zoom camera (48 MP)" },
      { label: "Video", value: "4K HDR, 60 fps. Slow motion at 120 fps" },
      { label: "Flight time", value: "Up to 45 minutes" },
      { label: "Signal range", value: "Up to 20 km" },
      { label: "Sees obstacles", value: "All sides, plus a laser sensor at the front" },
      { label: "Weight", value: "724 g" },
    ],
    benefits: [
      "The big sensor gives clean pictures in low light.",
      "The laser sensor makes night flights safer.",
      "Two cameras give you more kinds of shots.",
      "Long flights and very good in wind.",
    ],
    issues: [
      "Too heavy for the under 250 g rules.",
      "The zoom camera is grainy at night.",
      "Extra batteries and kits cost a lot.",
      "Large video files need fast memory cards.",
    ],
    goodToKnow: ["This is our top pick for people starting paid drone work."],
  },

  /* ------------------------------ Mavic ------------------------------ */
  {
    slug: "dji-mavic-3",
    name: "DJI Mavic 3",
    series: "Mavic",
    released: 2021,
    price: 2199,
    kit: KIT_BASIC,
    image: "/media/shop/dji-mavic-3-v2.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, remote and 1 battery" },
      { id: "combo", label: "Fly More Combo", includes: "Drone, remote, 3 batteries, charging hub, spare propellers and a bag" },
    ],
    discontinued: true,
    inStock: true,
    headline: "A large Hasselblad camera plus a zoom camera.",
    purpose:
      "The Mavic 3 has a large Hasselblad camera sensor and a second camera that can zoom in up to 28 times. It is made for professional photo and video work.",
    bestFor: ["Professional video", "Weddings", "Business photos"],
    wind: {
      ms: 12,
      level: "Level 6",
      note: "Big and heavy, so it stays very steady in strong wind.",
    },
    specs: [
      { label: "Camera", value: "Large Hasselblad sensor, 20 MP, plus zoom camera" },
      { label: "Video", value: "5.1K, 50 fps. 4K, 120 fps" },
      { label: "Flight time", value: "Up to 46 minutes" },
      { label: "Signal range", value: "Up to 15 km" },
      { label: "Sees obstacles", value: "All sides" },
      { label: "Weight", value: "895 g" },
    ],
    benefits: [
      "The large sensor keeps detail in bright and dark areas.",
      "You can change the lens opening to control light.",
      "Very long flight time.",
      "Steady enough for paid work.",
    ],
    issues: [
      "Zoom shots look poor past 7x.",
      "Some features were missing when it first came out.",
      "Large files need a strong computer to edit.",
      "The Mavic 3 Pro replaced it.",
    ],
    goodToKnow: ["DJI does not make this drone any more. The Mavic 3 Pro is the newer version."],
  },
  {
    slug: "dji-mavic-3-classic",
    name: "DJI Mavic 3 Classic",
    series: "Mavic",
    released: 2022,
    price: 1599,
    kit: KIT_BASIC,
    image: "/media/shop/dji-mavic-3-classic-v3.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, remote and 1 battery" },
      { id: "combo", label: "Fly More Combo", includes: "Drone, remote, 3 batteries, charging hub, spare propellers and a bag" },
    ],
    inStock: true,
    headline: "The Mavic 3 main camera for less money.",
    purpose:
      "The Mavic 3 Classic has the same large Hasselblad camera as the Mavic 3, but no zoom camera. It suits professionals who want top picture quality and only need one camera.",
    bestFor: ["Landscape photos", "Houses and land", "Documentaries"],
    wind: {
      ms: 12,
      level: "Level 6",
      note: "Very steady in strong wind. Good for open coast and mountain spots.",
    },
    specs: [
      { label: "Camera", value: "Large Hasselblad sensor, 20 MP" },
      { label: "Video", value: "5.1K, 50 fps. 4K, 120 fps" },
      { label: "Flight time", value: "Up to 46 minutes" },
      { label: "Signal range", value: "Up to 15 km" },
      { label: "Sees obstacles", value: "All sides" },
      { label: "Weight", value: "895 g" },
    ],
    benefits: [
      "Top camera sensor for less money.",
      "You can change the lens opening to control light.",
      "Long flights and very good in wind.",
      "Great for high quality photos.",
    ],
    issues: [
      "No zoom camera.",
      "Bigger and heavier to carry.",
      "5.1K video needs a fast computer to edit.",
      "Spare batteries are expensive.",
    ],
    goodToKnow: ["A cheaper way to get Mavic picture quality."],
  },
  {
    slug: "dji-mavic-3-pro",
    name: "DJI Mavic 3 Pro",
    series: "Mavic",
    released: 2023,
    price: 2199,
    kit: "Drone, remote with screen and 1 battery",
    image: "/media/shop/dji-mavic-3-pro-v2.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, remote with screen and 1 battery" },
      { id: "combo", label: "Fly More Combo", includes: "Drone, remote, 3 batteries, charging hub, spare propellers and a bag" },
    ],
    inStock: true,
    headline: "Three cameras in one drone.",
    purpose:
      "The Mavic 3 Pro has three cameras. One is a large Hasselblad main camera. The other two zoom in 3 times and 7 times. It is made for people who film for clients and need many kinds of shots in one flight.",
    bestFor: ["Business videos", "Weddings and events", "Wildlife from far away"],
    wind: {
      ms: 12,
      level: "Level 6",
      note: "Very steady in strong wind. A safe choice for paid jobs where every flight counts.",
    },
    specs: [
      { label: "Camera", value: "Large Hasselblad main camera, plus 3x and 7x zoom cameras" },
      { label: "Video", value: "5.1K, 50 fps. 4K, 120 fps" },
      { label: "Flight time", value: "Up to 43 minutes" },
      { label: "Signal range", value: "Up to 15 km" },
      { label: "Sees obstacles", value: "All sides" },
      { label: "Weight", value: "958 g" },
    ],
    benefits: [
      "Three camera views without landing.",
      "Film animals from far away without scaring them.",
      "All cameras have a flat colour mode for editing.",
      "Very steady for client work.",
    ],
    issues: [
      "The 7x camera is weak in low light.",
      "Heavy and big for long hikes.",
      "Extras cost a lot.",
      "Obstacle sensing does not work at night.",
    ],
    goodToKnow: ["This price includes the remote with a built in screen."],
  },
  {
    slug: "dji-mavic-4-pro",
    name: "DJI Mavic 4 Pro",
    series: "Mavic",
    released: 2025,
    price: 2199,
    kit: KIT_BASIC,
    image: "/media/shop/dji-mavic-4-pro-v2.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, remote and 1 battery" },
      { id: "combo", label: "Fly More Combo", includes: "Drone, remote, 3 batteries, charging hub, propellers and a bag", lkr: 1099000 },
    ],
    priceEstimated: true,
    inStock: true,
    headline: "A 100 MP Hasselblad camera that can turn all the way round.",
    purpose:
      "The Mavic 4 Pro is DJI's newest top drone in this range. Its main camera takes 100 MP photos, and it has two zoom cameras. The camera can turn in a full circle. It is for professionals who want the best pictures.",
    bestFor: ["Top level business work", "Hotel and tourism films", "Art photos"],
    wind: {
      ms: 12,
      level: "Level 6",
      note: "Heavy and powerful. It stays steady in strong wind over cliffs and the open sea.",
    },
    specs: [
      { label: "Camera", value: "Large Hasselblad sensor, 100 MP, plus 2 zoom cameras" },
      { label: "Video", value: "6K HDR, 60 fps. 4K, 120 fps" },
      { label: "Flight time", value: "Up to 51 minutes" },
      { label: "Signal range", value: "Up to 30 km" },
      { label: "Sees obstacles", value: "All sides, also in low light" },
      { label: "Weight", value: "About 1,063 g" },
    ],
    benefits: [
      "The sharpest camera in any DJI drone in this shop.",
      "The camera turns in a full circle for new kinds of shots.",
      "The longest flight time in this shop.",
      "A very strong signal for long flights.",
    ],
    issues: [
      "The heaviest drone here. Plan for the travel weight.",
      "100 MP photos take up a lot of space.",
      "New model, so spare parts are still limited.",
      "No official US dollar price.",
    ],
    goodToKnow: ["DJI has no official US dollar price for this drone. Our price is an estimate. We will confirm it with you."],
  },
  {
    slug: "dji-mavic-3-pro-cine",
    name: "DJI Mavic 3 Pro Cine",
    series: "Mavic",
    released: 2023,
    price: 4799,
    kit: "Drone, top remote with screen, 3 batteries and a 1 TB drive",
    image: "/media/shop/dji-mavic-3-pro-cine-v2.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, top remote with screen, 3 batteries and a 1 TB drive" },
    ],
    inStock: true,
    headline: "The Mavic 3 Pro, made for film crews.",
    purpose:
      "This is the Mavic 3 Pro with a 1 TB drive inside. It records the very high quality video files that film and TV editors use. It is for film crews and big advertising jobs.",
    bestFor: ["Film and TV", "Big advertising jobs", "Work where colour must be exact"],
    wind: {
      ms: 12,
      level: "Level 6",
      note: "Same body as the Mavic 3 Pro, so it is just as steady in strong wind.",
    },
    specs: [
      { label: "Camera", value: "Large Hasselblad main camera, plus 3x and 7x zoom cameras" },
      { label: "Video", value: "5.1K, with Apple ProRes files for film editors" },
      { label: "Flight time", value: "Up to 43 minutes" },
      { label: "Signal range", value: "Up to 15 km" },
      { label: "Sees obstacles", value: "All sides" },
      { label: "Weight", value: "963 g" },
    ],
    benefits: [
      "The highest quality video files for editing.",
      "A 1 TB drive inside for long recordings.",
      "Comes with DJI's brightest remote with a screen.",
      "Three cameras in one drone.",
    ],
    issues: [
      "The video files are huge and need fast drives.",
      "Costs much more than the normal Mavic 3 Pro.",
      "Too much drone for social media or small jobs.",
      "Heavy to travel with.",
    ],
    goodToKnow: ["Only sold as this full kit."],
  },
  {
    slug: "dji-mavic-3-cine",
    name: "DJI Mavic 3 Cine",
    series: "Mavic",
    released: 2021,
    price: 4999,
    kit: "Drone, top remote with screen, 3 batteries and a 1 TB drive",
    image: "/media/shop/dji-mavic-3-cine-v2.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, top remote with screen, 3 batteries and a 1 TB drive" },
    ],
    discontinued: true,
    inStock: true,
    headline: "The first Mavic 3, made for film crews.",
    purpose:
      "The Mavic 3 Cine records very high quality video files to a 1 TB drive inside the drone. It is for film crews who need the best video files from a small drone.",
    bestFor: ["Film making", "Documentaries", "TV"],
    wind: {
      ms: 12,
      level: "Level 6",
      note: "Very steady in strong wind, like all Mavic 3 drones.",
    },
    specs: [
      { label: "Camera", value: "Large Hasselblad sensor, 20 MP, plus zoom camera" },
      { label: "Video", value: "5.1K, with Apple ProRes files for film editors" },
      { label: "Flight time", value: "Up to 46 minutes" },
      { label: "Signal range", value: "Up to 15 km" },
      { label: "Sees obstacles", value: "All sides" },
      { label: "Weight", value: "899 g" },
    ],
    benefits: [
      "Top quality video files.",
      "A 1 TB drive inside for long recordings.",
      "Flies longer than the Mavic 3 Pro Cine.",
      "Comes with DJI's brightest remote with a screen.",
    ],
    issues: [
      "The Mavic 3 Pro Cine replaced it.",
      "Zoom shots look poor past 7x.",
      "Very large files.",
      "The most expensive drone in this shop.",
    ],
    goodToKnow: ["DJI does not make this drone any more. Only sold as this full kit."],
  },

  /* ------------------------------- FPV ------------------------------- */
  {
    slug: "dji-fpv",
    name: "DJI FPV",
    series: "FPV",
    released: 2021,
    price: 1299,
    kit: "Drone, goggles, remote and 1 battery",
    image: "/media/shop/dji-fpv-v2.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, goggles, remote and 1 battery" },
    ],
    discontinued: true,
    inStock: true,
    headline: "A very fast drone you fly with goggles. Up to 140 km/h.",
    purpose:
      "You fly the DJI FPV while wearing goggles, so you see what the drone sees. It is very fast. It is great for filming cars, boats and fast sports.",
    bestFor: ["Fast action", "Chasing cars and boats", "Pilots with experience"],
    wind: {
      ms: 13.8,
      level: "Level 6",
      note: "Strong motors make it very good in wind. Be careful when flying fast over the sea.",
    },
    specs: [
      { label: "Camera", value: "Small sensor, 12 MP" },
      { label: "Video", value: "4K, 60 fps" },
      { label: "Flight time", value: "Up to 20 minutes" },
      { label: "Signal range", value: "Up to 10 km" },
      { label: "Sees obstacles", value: "Front and below, in normal mode" },
      { label: "Weight", value: "795 g" },
    ],
    benefits: [
      "Top speed of 140 km/h.",
      "A normal mode makes it easier to learn.",
      "An emergency brake stops it and holds it in the air.",
      "The goggles feel like you are flying.",
    ],
    issues: [
      "Crashes happen often, and repairs cost a lot.",
      "Short flight time.",
      "The camera is not as good as other DJI drones.",
      "Some people feel sick wearing goggles for long.",
    ],
    goodToKnow: [
      "DJI does not make this drone any more.",
      "Have a friend watch the drone while you wear the goggles.",
    ],
  },
  {
    slug: "dji-avata",
    name: "DJI Avata",
    series: "FPV",
    released: 2022,
    price: 1168,
    kit: "Drone, goggles, motion controller and 1 battery",
    image: "/media/shop/dji-avata-v3.webp",
    variants: [
      { id: "standard", label: "Standard", includes: "Drone, goggles, motion controller and 1 battery" },
    ],
    discontinued: true,
    inStock: true,
    headline: "A small goggle drone for flying indoors and up close.",
    purpose:
      "The Avata is a small goggle drone with guards around its propellers. It is good for flying through hotels, temples and forests, and for smooth tour videos in one shot.",
    bestFor: ["Hotel tours", "Indoor flights", "Close up flying"],
    wind: {
      ms: 10.7,
      level: "Level 5",
      note: "Fine in normal wind. The battery is short, so turn back early when flying against the wind.",
    },
    specs: [
      { label: "Camera", value: "Medium sensor, 48 MP, very wide view" },
      { label: "Video", value: "4K, 60 fps" },
      { label: "Flight time", value: "Up to 18 minutes" },
      { label: "Signal range", value: "Up to 10 km" },
      { label: "Sees obstacles", value: "Only below it" },
      { label: "Weight", value: "410 g" },
    ],
    benefits: [
      "The guards protect it from small bumps.",
      "The motion controller makes goggle flying easy to learn.",
      "Great for smooth indoor tour videos.",
      "It can flip itself back over after a crash.",
    ],
    issues: [
      "Short flight time.",
      "Loud, so people notice it indoors.",
      "It cannot see obstacles in front.",
      "The Avata 2 replaced it.",
    ],
    goodToKnow: ["DJI does not make this drone any more. The Avata 2 is the newer model."],
  },
  {
    slug: "dji-avata-2",
    name: "DJI Avata 2",
    series: "FPV",
    released: 2024,
    price: 999,
    kit: "Drone, goggles, motion controller and 1 battery",
    image: "/media/shop/dji-avata-2-v2.webp",
    variants: [
      { id: "standard", label: "Fly More Combo (3 batteries)", includes: "Drone, goggles, motion controller, 3 batteries and charging hub", lkr: 389500 },
    ],
    inStock: true,
    headline: "An easy goggle drone. Flips and rolls with one button.",
    purpose:
      "The Avata 2 is DJI's newest small goggle drone. It is made for tour videos of hotels and venues, and for exciting shots with flips and rolls.",
    bestFor: ["Hotel and venue tours", "Event videos", "New goggle pilots"],
    wind: {
      ms: 10.7,
      level: "Level 5",
      note: "Steady in normal wind. The battery is short, so keep it close on windy days.",
    },
    specs: [
      { label: "Camera", value: "Larger sensor (1/1.3 inch), 12 MP, very wide view" },
      { label: "Video", value: "4K, 60 fps" },
      { label: "Flight time", value: "Up to 23 minutes" },
      { label: "Signal range", value: "Up to 13 km" },
      { label: "Sees obstacles", value: "Below and behind" },
      { label: "Weight", value: "377 g" },
    ],
    benefits: [
      "Flips and rolls with one button.",
      "Better in low light than the first Avata.",
      "The goggles give a sharp, clear view.",
      "Great for tour videos in one shot.",
    ],
    issues: [
      "It cannot see obstacles in front.",
      "Short flight time compared with normal drones.",
      "The guards can crack after hard crashes.",
      "Not everyone likes the motion controller.",
    ],
    goodToKnow: ["Have a friend watch the drone while you wear the goggles."],
  },
];

export function getProducts(): ShopProduct[] {
  return products;
}

export function getProduct(slug: string): ShopProduct | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/* ----------------------------- Accessories ----------------------------- */

export type AccessoryCategory = "Batteries" | "Propellers" | "Tools and care";

export type ShopAccessory = {
  slug: string;
  name: string;
  category: AccessoryCategory;
  /** Which drones it fits, in plain words. */
  fits: string;
  note: string;
  lkr?: number;
};

/** Spares and tools. Prices we have confirmed are shown; the rest are on request. */
export const accessories: ShopAccessory[] = [
  {
    slug: "battery-mini-3-4-series",
    name: "Intelligent Flight Battery, Mini 3 and Mini 4 series",
    category: "Batteries",
    fits: "Mini 3, Mini 3 Pro, Mini 4 Pro",
    note: "A spare battery doubles your flying time. Most shoots need two or three.",
    lkr: 34500,
  },
  {
    slug: "battery-mini-2-series",
    name: "Intelligent Flight Battery, Mini 2 series",
    category: "Batteries",
    fits: "Mini 2, Mini 2 SE, Mini 4K",
    note: "Spare battery for the older Mini drones.",
  },
  {
    slug: "battery-air-series",
    name: "Intelligent Flight Battery, Air series",
    category: "Batteries",
    fits: "Air 3, Air 3S",
    note: "Spare battery for the Air drones.",
  },
  {
    slug: "battery-mavic-3-series",
    name: "Intelligent Flight Battery, Mavic 3 series",
    category: "Batteries",
    fits: "Mavic 3, Mavic 3 Classic, Mavic 3 Pro",
    note: "Spare battery for the Mavic 3 drones.",
  },
  {
    slug: "charging-hub-mini",
    name: "Two Way Charging Hub, Mini series",
    category: "Batteries",
    fits: "Mini 3, Mini 4 Pro",
    note: "Charges batteries one after the other and can also charge your phone.",
  },
  {
    slug: "propellers-mini",
    name: "Spare propellers, Mini series",
    category: "Propellers",
    fits: "Mini 2, Mini 3, Mini 4 Pro",
    note: "Propellers wear out fast on sandy take offs. Keep a spare pair in the bag.",
  },
  {
    slug: "propellers-air",
    name: "Spare propellers, Air series",
    category: "Propellers",
    fits: "Air 3, Air 3S",
    note: "One spare pair per flying day is a sensible habit.",
  },
  {
    slug: "propellers-mavic-3",
    name: "Spare propellers, Mavic 3 series",
    category: "Propellers",
    fits: "Mavic 3, Mavic 3 Pro",
    note: "Low noise propellers for the Mavic 3 drones.",
  },
  {
    slug: "propeller-guards-mini",
    name: "Propeller guards, Mini series",
    category: "Propellers",
    fits: "Mini 3, Mini 4 Pro",
    note: "Covers the propellers so the drone is safer to fly near people and indoors.",
  },
  {
    slug: "landing-pad",
    name: "Landing pad, 75 cm",
    category: "Tools and care",
    fits: "All drones",
    note: "Keeps sand and grass out of the motors. Useful on every beach shoot.",
  },
  {
    slug: "screwdriver-kit",
    name: "Screwdriver and propeller tool kit",
    category: "Tools and care",
    fits: "All DJI drones",
    note: "For changing propellers and tightening screws in the field.",
  },
  {
    slug: "gimbal-protector",
    name: "Gimbal protector",
    category: "Tools and care",
    fits: "Mini, Air and Mavic series",
    note: "Protects the camera while the drone is in your bag. Replace it if yours is cracked.",
  },
  {
    slug: "cleaning-kit",
    name: "Lens cleaning kit",
    category: "Tools and care",
    fits: "All drones",
    note: "Blower, brush and microfibre cloth. Salt air leaves a film on the lens.",
  },
];

export function getAccessory(slug: string): ShopAccessory | undefined {
  return accessories.find((a) => a.slug === slug);
}

/* ------------------------------ Pricing ------------------------------- */

/** Rupees, e.g. "Rs 324,500". */
export function formatLkr(amount: number): string {
  return `Rs ${new Intl.NumberFormat("en-LK", { maximumFractionDigits: 0 }).format(amount)}`;
}

/** The cheapest confirmed price for a drone, if we have one. */
export function lowestPrice(p: ShopProduct): number | undefined {
  const prices = (p.variants ?? []).map((v) => v.lkr).filter((n): n is number => typeof n === "number");
  return prices.length ? Math.min(...prices) : undefined;
}

/** One buyable thing: a drone in a chosen kit, or an accessory. */
export type Sku = { sku: string; name: string; sub: string; lkr?: number; href: string; image?: string };

export function getSku(sku: string): Sku | undefined {
  if (sku.startsWith("acc:")) {
    const a = getAccessory(sku.slice(4));
    return a && { sku, name: a.name, sub: a.fits, lkr: a.lkr, href: "/shop#accessories" };
  }
  const [slug, variantId] = sku.split(":");
  const p = getProduct(slug);
  const v = p?.variants?.find((x) => x.id === variantId);
  return p && v
    ? { sku, name: p.name, sub: v.label, lkr: v.lkr, href: `/shop/${p.slug}`, image: p.image }
    : undefined;
}
