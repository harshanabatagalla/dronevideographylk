/**
 * Drone comparison: the specs we compare, how each drone is scored, and the
 * differences between two drones. Pages under /compare read everything from here,
 * so the numbers, the wording and the scores can never drift apart.
 *
 * Scoring, in plain words (the /compare page explains the same thing to readers):
 * every scored spec is placed on a 0 to 1 line between the weakest and the best
 * drone on this page. Sensor area, bitrate, video size, zoom, weight and folded size
 * use a log scale, so one extreme model does not flatten everyone else. Each area
 * score is the weighted average of its specs, and the overall score is the weighted
 * average of the five areas (AREA_WEIGHTS), out of 100.
 */
import { drones, LINKS, SENSORS, type CompareDrone, type LogProfile } from "./compare-data";

export { drones, SENSORS };
export type { CompareDrone };

export const COMPARE_PATH = "/compare";
/** Date the specs were last checked against DJI. Used for the sitemap and the source note. */
export const COMPARE_UPDATED = "2026-11-14";
export const SOURCE_CHECKED = "14 November 2026";
export const SOURCE_URL = "https://www.dji.com/products/comparison-consumer-drones";

export type AreaId = "camera" | "video" | "flight" | "safety" | "travel";
export type GroupId = AreaId | "about";

export const AREAS: { id: AreaId; label: string; blurb: string }[] = [
  { id: "camera", label: "Camera", blurb: "Sensor size, photo detail, zoom and lens" },
  { id: "video", label: "Video", blurb: "Video size, frame rates, bitrate and colour" },
  { id: "flight", label: "Flight", blurb: "Time in the air, wind, speed and height" },
  { id: "safety", label: "Safety", blurb: "Obstacle sensors, covered propellers and signal" },
  { id: "travel", label: "Travel", blurb: "Weight, the 250 g line, folded size and storage" },
];

/** Record groups: the five scored areas plus general facts that are not scored. */
export const GROUPS: { id: GroupId; label: string }[] = [
  { id: "about", label: "General" },
  ...AREAS.map((a) => ({ id: a.id, label: a.label })),
];

/* ------------------------------------------------------------------ */
/* Small formatters                                                    */
/* ------------------------------------------------------------------ */

const kmh = (ms: number) => Math.round(ms * 3.6);
const num = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 2 });
const round1 = (n: number) => Math.round(n * 10) / 10;
const times = (n: number) => `${num(round1(n))} times`;

/** "a, b and c". */
export function joinList(parts: string[]): string {
  if (parts.length <= 1) return parts.join("");
  return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function sensorArea(d: CompareDrone): number {
  const s = SENSORS[d.sensor];
  return s.w * s.h;
}

export function sensingCount(d: CompareDrone): number {
  return Object.values(d.sensing).filter(Boolean).length;
}

export function sensingLabel(d: CompareDrone): string {
  const s = d.sensing;
  if (sensingCount(d) === 5) return "All directions";
  if (sensingCount(d) === 1 && s.down) return "Below only, for landing";
  const parts = [
    s.front && "front",
    s.back && "back",
    s.sides && "sides",
    s.up && "above",
    s.down && "below",
  ].filter((p): p is string => Boolean(p));
  return cap(joinList(parts));
}

export function weightLabel(d: CompareDrone): string {
  return d.weightLabel ?? `${num(d.weightG)} g`;
}

export const under250 = (d: CompareDrone) => d.weightG < 250;

const LOG_VALUE: Record<LogProfile, number> = { none: 0, dcinelike: 0.5, dlogm: 0.8, dlog: 1 };
const LOG_LABEL: Record<LogProfile, string> = {
  none: "No",
  dcinelike: "D Cinelike",
  dlogm: "D Log M",
  dlog: "D Log and D Log M",
};

/* ------------------------------------------------------------------ */
/* Specs                                                               */
/* ------------------------------------------------------------------ */

export type Spec = {
  id: string;
  label: string;
  group: GroupId;
  /** One or two plain sentences on why this spec matters. */
  help: string;
  /** The number compared. Yes or no specs return 1 or 0. */
  get: (d: CompareDrone) => number;
  show: (d: CompareDrone) => string;
  /** Left out for facts that are shown but not scored. */
  better?: "higher" | "lower";
  weight?: number;
  /** Turns the value before it is placed on the 0 to 1 line (a log scale, for example). */
  scale?: (v: number) => number;
  yesNo?: boolean;
  /** Why the winner wins, as a short heading. */
  reason?: string | ((win: CompareDrone, lose: CompareDrone) => string);
  /** How far ahead the winner is, in a few words. */
  margin?: (win: CompareDrone, lose: CompareDrone) => string;
  /** What the winner gives you, for "Pick it if you want ...". */
  want?: string | ((win: CompareDrone, lose: CompareDrone) => string);
};

const log = (v: number) => Math.log(v);
const yes = (b: boolean) => (b ? 1 : 0);

export const SPECS: Spec[] = [
  /* ------------------------------ General ------------------------------ */
  {
    id: "released",
    label: "Released",
    group: "about",
    help: "The year DJI launched it. Newer drones usually get firmware updates for longer.",
    get: (d) => d.released,
    show: (d) => String(d.released),
  },
  {
    id: "status",
    label: "Still made",
    group: "about",
    help: "Whether DJI still lists it as a current model. Older models get harder to find parts and batteries for.",
    get: (d) => yes(d.current),
    show: (d) => (d.current ? "Yes" : "No, DJI has stopped making it"),
  },

  /* ------------------------------ Camera ------------------------------ */
  {
    id: "cameras",
    label: "Cameras",
    group: "camera",
    help: "How many cameras the drone carries. A second or third camera is a zoom lens, except on the Avata 360, which uses two lenses to film all around.",
    get: (d) => d.cameras,
    show: (d) => d.camerasLabel,
    better: "higher",
    weight: 1,
    reason: "More cameras",
    margin: (w, l) => `${w.cameras} against ${l.cameras}`,
    want: "more cameras to choose from",
  },
  {
    id: "sensor",
    label: "Main camera sensor",
    group: "camera",
    help: "A bigger sensor gathers more light, so sunrise, sunset and night shots stay clean instead of grainy. Of all the camera specs, this one changes picture quality the most.",
    get: sensorArea,
    show: (d) => SENSORS[d.sensor].label,
    better: "higher",
    weight: 3,
    scale: log,
    reason: "Bigger camera sensor",
    margin: (w, l) => {
      const r = sensorArea(w) / sensorArea(l);
      return r >= 1.15 ? `${times(r)} the area` : "slightly bigger";
    },
    want: "a bigger camera sensor",
  },
  {
    id: "photo",
    label: "Photo resolution",
    group: "camera",
    help: "More megapixels let you crop and print large. Past about 20 MP the size of the sensor matters more than the pixel count.",
    get: (d) => d.photoMp,
    show: (d) => d.photoLabel ?? `${d.photoMp} MP`,
    better: "higher",
    weight: 1,
    scale: log,
    reason: "More detailed photos",
    margin: (w, l) => `${num(w.photoMp - l.photoMp)} MP more`,
    want: "more detailed photos",
  },
  {
    id: "zoom",
    label: "Zoom camera",
    group: "camera",
    help: "A zoom camera brings far things closer without losing detail. It makes mountains look bigger behind a subject and lets you film people and buildings from further away.",
    get: (d) => d.zoomMm ?? 24,
    show: (d) => (d.zoomMm ? `Yes, ${d.zoomLabel}` : "No"),
    better: "higher",
    weight: 1.5,
    scale: log,
    reason: (w, l) => (l.zoomMm ? "Longer zoom camera" : "Has a zoom camera"),
    margin: (w, l) => {
      if (!l.zoomMm) return "only one has zoom";
      const r = (w.zoomMm ?? 24) / l.zoomMm;
      return r >= 1.15 ? `${times(r)} longer` : "slightly longer";
    },
    want: (w, l) => (l.zoomMm ? "a longer zoom" : "a zoom camera"),
  },
  {
    id: "aperture",
    label: "Lens aperture",
    group: "camera",
    help: "A lower f number lets in more light. f/1.7 lets in more than twice the light of f/2.8, which helps in the evening.",
    get: (d) => d.aperture,
    show: (d) => `f/${d.aperture.toFixed(1)}${d.adjustableAperture ? " to f/11" : ""}`,
    better: "lower",
    weight: 0.75,
    reason: "Brighter lens",
    margin: (w, l) => {
      const r = (l.aperture / w.aperture) ** 2;
      return r >= 1.15 ? `${times(r)} the light` : "a little more light";
    },
    want: "a brighter lens",
  },
  {
    id: "adjustable",
    label: "Adjustable aperture",
    group: "camera",
    help: "The lens can close down to f/11 to handle bright sun and keep more of a scene sharp. Drones with a fixed lens need ND filters for that.",
    get: (d) => yes(d.adjustableAperture),
    show: (d) => (d.adjustableAperture ? "Yes" : "No"),
    better: "higher",
    weight: 0.5,
    yesNo: true,
    reason: "Adjustable aperture",
    want: "an adjustable aperture",
  },
  {
    id: "raw",
    label: "RAW photos",
    group: "camera",
    help: "RAW (DNG) photos keep more detail in bright skies and dark shadows, so you can recover them when you edit.",
    get: (d) => yes(d.raw),
    show: (d) => (d.raw ? "Yes" : "No, JPEG only"),
    better: "higher",
    weight: 0.5,
    yesNo: true,
    reason: "Shoots RAW photos",
    want: "RAW photos",
  },

  /* ------------------------------ Video ------------------------------ */
  {
    id: "video",
    label: "Largest video size",
    group: "video",
    help: "More pixels give room to crop and straighten a shot later. Most screens still show 4K or less. The Avata 360 figure is for a full 360 picture.",
    get: (d) => d.videoWidth,
    show: (d) => d.videoLabel,
    better: "higher",
    weight: 1.5,
    scale: log,
    reason: "Bigger video size",
    margin: (w, l) => `${w.videoLabel} against ${l.videoLabel}`,
    want: "bigger video",
  },
  {
    id: "fps4k",
    label: "4K frame rate",
    group: "video",
    help: "Frames per second in 4K. At 100 or 120 fps you can slow a 4K shot down four or five times and keep it smooth.",
    get: (d) => d.fps4k,
    show: (d) => (d.fps4k ? `Up to ${d.fps4k} fps` : "No 4K"),
    better: "higher",
    weight: 2,
    reason: (w, l) => (l.fps4k ? "Faster 4K frame rate" : "Records 4K video"),
    margin: (w, l) => (l.fps4k ? `${w.fps4k} against ${l.fps4k} fps` : "the other has no 4K"),
    want: (w, l) => (l.fps4k ? "smoother 4K slow motion" : "4K video"),
  },
  {
    id: "slowmo",
    label: "Slow motion",
    group: "video",
    help: "The highest frame rate at any size. Played at normal speed, 240 fps footage runs ten times slower than real life.",
    get: (d) => d.slowFps,
    show: (d) => d.slowLabel,
    better: "higher",
    weight: 1,
    reason: "Slower slow motion",
    margin: (w, l) => `${w.slowFps} against ${l.slowFps} fps`,
    want: "slower slow motion",
  },
  {
    id: "bitrate",
    label: "Video bitrate",
    group: "video",
    help: "How much data each second of video gets. More data keeps fine detail in waves, leaves and crowds.",
    get: (d) => d.bitrate,
    show: (d) => d.bitrateLabel ?? `${num(d.bitrate)} Mbps`,
    better: "higher",
    weight: 1,
    scale: log,
    reason: "Higher video bitrate",
    margin: (w, l) => {
      const r = w.bitrate / l.bitrate;
      return r >= 1.5 ? `${times(r)} the data` : `${num(w.bitrate - l.bitrate)} Mbps more`;
    },
    want: "more detail in moving scenes",
  },
  {
    id: "tenbit",
    label: "10 bit colour",
    group: "video",
    help: "10 bit video stores over a billion colours against about 16 million in 8 bit, so skies and sunsets keep smooth steps when you edit.",
    get: (d) => yes(d.tenBit),
    show: (d) => (d.tenBit ? "Yes" : "No, 8 bit"),
    better: "higher",
    weight: 1,
    yesNo: true,
    reason: "Records 10 bit colour",
    want: "10 bit colour",
  },
  {
    id: "log",
    label: "Flat colour profile",
    group: "video",
    help: "A flat, low contrast look that keeps more detail in bright and dark parts of the frame for colour grading. DJI calls it D Log M or D Log.",
    get: (d) => LOG_VALUE[d.log],
    show: (d) => LOG_LABEL[d.log],
    better: "higher",
    weight: 1,
    reason: (w, l) => (l.log === "none" ? "Has a flat colour profile" : "More grading choice"),
    margin: (w, l) => `${LOG_LABEL[w.log]} against ${LOG_LABEL[l.log] === "No" ? "none" : LOG_LABEL[l.log]}`,
    want: (w, l) => (l.log === "none" ? "a flat profile for colour grading" : "more colour grading choice"),
  },

  /* ------------------------------ Flight ------------------------------ */
  {
    id: "flight",
    label: "Flight time",
    group: "flight",
    help: "DJI's figure for one battery, flying steadily with no wind. In real use plan on about three quarters of it, because you land with charge to spare.",
    get: (d) => d.flightMin,
    show: (d) => `${d.flightMin} min${d.flightMinPlus ? `, ${d.flightMinPlus} min with the Plus battery` : ""}`,
    better: "higher",
    weight: 3,
    reason: "Longer flight time",
    margin: (w, l) => `${w.flightMin - l.flightMin} min more`,
    want: "longer flights",
  },
  {
    id: "wind",
    label: "Wind resistance",
    group: "flight",
    help: "The strongest wind DJI says it can handle. Beaches and hill country often get strong afternoon wind, so a higher figure means fewer cancelled flights.",
    get: (d) => d.windMs,
    show: (d) => `${num(d.windMs)} m/s (${kmh(d.windMs)} km/h)`,
    better: "higher",
    weight: 2,
    reason: "Handles stronger wind",
    margin: (w, l) => `${num(round1(w.windMs - l.windMs))} m/s more`,
    want: "steadier flying in wind",
  },
  {
    id: "speed",
    label: "Top speed",
    group: "flight",
    help: "Top speed in Sport mode. Extra speed also helps a drone fly home against a head wind.",
    get: (d) => d.speedMs,
    show: (d) => `${num(d.speedMs)} m/s (${kmh(d.speedMs)} km/h)`,
    better: "higher",
    weight: 1,
    reason: "Faster",
    margin: (w, l) => `${kmh(w.speedMs) - kmh(l.speedMs)} km/h faster`,
    want: "more speed",
  },
  {
    id: "altitude",
    label: "Highest takeoff point",
    group: "flight",
    help: "The highest ground it can take off from. Pidurutalagala, the highest point in Sri Lanka, is 2,524 m, so every drone here can take off anywhere on the island.",
    get: (d) => d.altitudeM,
    show: (d) => `${num(d.altitudeM)} m`,
    better: "higher",
    weight: 0.25,
    reason: "Takes off from higher ground",
    margin: (w, l) => `${num(w.altitudeM - l.altitudeM)} m higher`,
    want: "high mountain trips abroad",
  },
  {
    id: "battery",
    label: "Battery",
    group: "flight",
    help: "Energy and weight of one standard battery. Airlines ask for approval above 100 Wh, and every battery here is under that.",
    get: (d) => d.batteryWh,
    show: (d) => `${num(d.batteryWh)} Wh, ${num(d.batteryG)} g`,
  },

  /* ------------------------------ Safety ------------------------------ */
  {
    id: "sensing",
    label: "Obstacle sensing",
    group: "safety",
    help: "The directions in which the drone can see obstacles and stop. A sensor below only helps with landing and holding a hover, not with trees ahead.",
    get: sensingCount,
    show: sensingLabel,
    better: "higher",
    weight: 3,
    reason: "Sees obstacles in more directions",
    margin: (w, l) => {
      const n = sensingCount(w) - sensingCount(l);
      return `${n} more ${n === 1 ? "direction" : "directions"}`;
    },
    want: "obstacle sensors on more sides",
  },
  {
    id: "lidar",
    label: "Night sensor (LiDAR)",
    group: "safety",
    help: "A laser sensor at the front keeps seeing obstacles in the dark, when camera based sensors stop working.",
    get: (d) => yes(d.lidar),
    show: (d) => (d.lidar ? "Yes, at the front" : "No"),
    better: "higher",
    weight: 1,
    yesNo: true,
    reason: "LiDAR sensor for low light",
    want: "safer flying after sunset",
  },
  {
    id: "guards",
    label: "Covered propellers",
    group: "safety",
    help: "Guards around the propellers make the drone safer near people and indoors, and a light bump is less likely to end the flight.",
    get: (d) => yes(d.guards),
    show: (d) => (d.guards ? "Yes, built in" : "No"),
    better: "higher",
    weight: 1,
    yesNo: true,
    reason: "Covered propellers",
    want: "covered propellers for flying near people",
  },
  {
    id: "range",
    label: "Signal range",
    group: "safety",
    help: "DJI's range with a clear view and no interference. The higher figure applies where a stronger signal is allowed, the lower one under the CE rules used in Europe. You must keep the drone in sight, so this really tells you how well the link holds near trees and buildings.",
    get: (d) => d.rangeKm,
    show: (d) => `${d.rangeKm} km (${d.rangeCeKm} km under CE rules)`,
    better: "higher",
    weight: 1,
    reason: "Longer signal range",
    margin: (w, l) => `${w.rangeKm - l.rangeKm} km more`,
    want: "a stronger signal",
  },
  {
    id: "link",
    label: "Video link",
    group: "safety",
    help: "DJI's system for the live picture and the controls. Newer versions hold the picture better near walls and trees. O4+ is the newest.",
    get: (d) => LINKS.indexOf(d.link),
    show: (d) => d.link,
    better: "higher",
    weight: 1,
    reason: "Newer video link",
    margin: (w, l) => `${w.link} against ${l.link}`,
    want: "a newer video link",
  },
  {
    id: "liveview",
    label: "Live view",
    group: "safety",
    help: "The quality of the picture you see on the phone, remote or goggles while flying.",
    get: (d) => Number.parseInt(d.liveView, 10),
    show: (d) => d.liveView,
  },

  /* ------------------------------ Travel ------------------------------ */
  {
    id: "weight",
    label: "Weight",
    group: "travel",
    help: "Takeoff weight with the battery. A lighter drone is easier to carry on hikes and fits a day bag.",
    get: (d) => d.weightG,
    show: weightLabel,
    better: "lower",
    weight: 2,
    scale: log,
    reason: "Lighter",
    margin: (w, l) => {
      const g = l.weightG - w.weightG;
      return `${num(g < 10 ? round1(g) : Math.round(g))} g lighter`;
    },
    want: "a lighter drone",
  },
  {
    id: "under250",
    label: "Under 250 g",
    group: "travel",
    help: "In Sri Lanka a drone of 250 g or more needs public liability insurance. Every camera drone still has to be registered with CAASL, whatever it weighs.",
    get: (d) => yes(under250(d)),
    show: (d) =>
      under250(d) ? (d.plusOver250 ? "Yes, with the standard battery" : "Yes") : "No, insurance needed in Sri Lanka",
    better: "higher",
    weight: 1.5,
    yesNo: true,
    reason: "Under 250 g, so no drone insurance in Sri Lanka",
    want: "no drone insurance in Sri Lanka",
  },
  {
    id: "size",
    label: "Folded size",
    group: "travel",
    help: "Length, width and height folded, without propellers. Smaller fits a camera bag or a big jacket pocket.",
    get: (d) => (d.size[0] * d.size[1] * d.size[2]) / 1000,
    show: (d) => `${d.size.join(" × ")} mm${d.folds ? "" : ", does not fold"}`,
    better: "lower",
    weight: 1,
    scale: log,
    reason: "Smaller to carry",
    margin: (w, l) => {
      const vol = (d: CompareDrone) => d.size[0] * d.size[1] * d.size[2];
      const r = vol(l) / vol(w);
      return r >= 1.3 ? `${times(r)} smaller` : `${Math.round((1 - 1 / r) * 100)}% smaller`;
    },
    want: "a smaller bag",
  },
  {
    id: "storage",
    label: "Built in storage",
    group: "travel",
    help: "Storage inside the drone, so it keeps recording if you forget the memory card or fill it.",
    get: (d) => d.storageGB,
    show: (d) => d.storageLabel ?? (d.storageGB ? `${d.storageGB} GB` : "None, memory card only"),
    better: "higher",
    weight: 0.5,
    reason: "More built in storage",
    margin: (w, l) => `${w.storageGB - l.storageGB} GB more`,
    want: "built in storage",
  },
];

export const scoredSpecs = SPECS.filter((s) => s.better);
export const specsIn = (group: GroupId) => SPECS.filter((s) => s.group === group);

/* ------------------------------------------------------------------ */
/* Scores                                                              */
/* ------------------------------------------------------------------ */

const ranges = new Map<string, [number, number]>();
for (const s of scoredSpecs) {
  const t = drones.map((d) => (s.scale ? s.scale(s.get(d)) : s.get(d)));
  ranges.set(s.id, [Math.min(...t), Math.max(...t)]);
}

/** Where a drone sits on the 0 to 1 line for one spec. 1 is the best drone on this page. */
export function specScore(s: Spec, d: CompareDrone): number {
  const [lo, hi] = ranges.get(s.id) ?? [0, 0];
  if (hi === lo) return 0.5;
  const v = s.scale ? s.scale(s.get(d)) : s.get(d);
  const n = (v - lo) / (hi - lo);
  return s.better === "lower" ? 1 - n : n;
}

const areaCache = new Map<string, Record<AreaId, number>>();

/** Area scores out of 100. */
export function areaScores(d: CompareDrone): Record<AreaId, number> {
  const hit = areaCache.get(d.slug);
  if (hit) return hit;
  const out = {} as Record<AreaId, number>;
  for (const a of AREAS) {
    const specs = scoredSpecs.filter((s) => s.group === a.id);
    const total = specs.reduce((sum, s) => sum + (s.weight ?? 1), 0);
    const got = specs.reduce((sum, s) => sum + (s.weight ?? 1) * specScore(s, d), 0);
    out[a.id] = Math.round((got / total) * 100);
  }
  areaCache.set(d.slug, out);
  return out;
}

/**
 * How much each area counts in the overall score. Camera counts a little more and
 * travel a little less: picture quality is why people buy a camera drone, and weight
 * alone should not lift a beginner drone past a professional one.
 */
export const AREA_WEIGHTS: Record<AreaId, number> = { camera: 1.25, video: 1, flight: 1, safety: 1, travel: 0.75 };

/** Overall score out of 100: the weighted average of the five area scores. */
export function score(d: CompareDrone): number {
  const a = areaScores(d);
  const total = AREAS.reduce((sum, x) => sum + AREA_WEIGHTS[x.id], 0);
  return Math.round(AREAS.reduce((sum, x) => sum + a[x.id] * AREA_WEIGHTS[x.id], 0) / total);
}

/** Every drone, best score first. Ties go to the newer drone. */
export function ranking(): CompareDrone[] {
  return [...drones].sort((a, b) => score(b) - score(a) || b.released - a.released);
}

export function rankOf(d: CompareDrone): number {
  return ranking().findIndex((x) => x.slug === d.slug) + 1;
}

/* ------------------------------------------------------------------ */
/* Lookups and pairs                                                    */
/* ------------------------------------------------------------------ */

export function getCompareDrone(slug: string): CompareDrone | undefined {
  return drones.find((d) => d.slug === slug);
}

export const pairSlug = (a: string, b: string) => `${a}-vs-${b}`;
export const pairPath = (a: string, b: string) => `${COMPARE_PATH}/${pairSlug(a, b)}`;

/** Splits "dji-air-3s-vs-dji-mini-5-pro" into two known drones, or null. */
export function parsePair(slug: string): [CompareDrone, CompareDrone] | null {
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return null;
  const a = getCompareDrone(parts[0]);
  const b = getCompareDrone(parts[1]);
  if (!a || !b || a.slug === b.slug) return null;
  return [a, b];
}

/**
 * Comparisons people search for most. These pages are listed in the sitemap and
 * open to search engines; any other pair still works but is kept out of the index,
 * so hundreds of near identical pages never compete with these.
 */
export const POPULAR: [string, string][] = [
  ["dji-mini-5-pro", "dji-mini-4-pro"],
  ["dji-mini-5-pro", "dji-air-3s"],
  ["dji-air-3s", "dji-air-3"],
  ["dji-air-3s", "dji-mavic-4-pro"],
  ["dji-mavic-4-pro", "dji-mavic-3-pro"],
  ["dji-lito-x1", "dji-lito-1"],
  ["dji-lito-x1", "dji-mini-4-pro"],
  ["dji-lito-x1", "dji-mini-5-pro"],
  ["dji-avata-360", "dji-avata-2"],
  ["dji-flip", "dji-mini-4-pro"],
  ["dji-lito-x1", "dji-flip"],
  ["dji-mini-5-pro", "dji-flip"],
  ["dji-lito-1", "dji-mini-4k"],
  ["dji-mini-4-pro", "dji-air-3"],
  ["dji-mini-4-pro", "dji-mini-3-pro"],
  ["dji-mini-4-pro", "dji-mini-3"],
  ["dji-mini-3-pro", "dji-mini-3"],
  ["dji-mini-3", "dji-mini-4k"],
  ["dji-mini-4k", "dji-mini-2-se"],
  ["dji-mini-2", "dji-mini-4k"],
  ["dji-mini-se", "dji-mini-2"],
  ["dji-air-3s", "dji-mavic-3-pro"],
  ["dji-mavic-3-classic", "dji-air-3s"],
  ["dji-mavic-3-pro", "dji-mavic-3-classic"],
  ["dji-mavic-3", "dji-mavic-3-pro"],
  ["dji-air-2s", "dji-air-3s"],
  ["dji-air-2s", "dji-mini-4-pro"],
  ["dji-mavic-air-2", "dji-air-3"],
  ["dji-mavic-2-pro", "dji-air-3s"],
  ["dji-mavic-2-pro", "dji-mavic-2-zoom"],
];

const popularKey = (a: string, b: string) => [a, b].sort().join("|");
const popularSet = new Map(POPULAR.map(([a, b]) => [popularKey(a, b), [a, b] as [string, string]]));

/** The popular pair in its listed order, if this pair is one of them in either order. */
export function popularPair(a: string, b: string): [string, string] | undefined {
  return popularSet.get(popularKey(a, b));
}

export const isPopularExact = (a: string, b: string) => {
  const p = popularPair(a, b);
  return Boolean(p && p[0] === a && p[1] === b);
};

/** Link to compare two drones, in the popular order when there is one. */
export function comparePath(a: string, b: string): string {
  const p = popularPair(a, b);
  return p ? pairPath(p[0], p[1]) : pairPath(a, b);
}

/** Popular comparisons that include this drone. */
export function popularWith(slug: string): [string, string][] {
  return POPULAR.filter(([a, b]) => a === slug || b === slug);
}

/** Drones worth comparing next: the same series first, then the closest overall score. */
export function similarTo(d: CompareDrone, exclude: string[] = [], n = 6): CompareDrone[] {
  const skip = new Set([d.slug, ...exclude]);
  const s = score(d);
  return drones
    .filter((x) => !skip.has(x.slug))
    .sort(
      (x, y) =>
        Number(y.series === d.series) - Number(x.series === d.series) ||
        Number(y.current) - Number(x.current) ||
        Math.abs(score(x) - s) - Math.abs(score(y) - s),
    )
    .slice(0, n);
}

/* ------------------------------------------------------------------ */
/* Differences between two drones                                      */
/* ------------------------------------------------------------------ */

export type Row = {
  spec: Spec;
  a: string;
  b: string;
  /** Which drone is better on this spec, or null for a tie or a fact that is not scored. */
  winner: "a" | "b" | null;
  /** 0 to 1: how far apart they are on the spec's 0 to 1 line. */
  gap: number;
  /** The gap times the spec's weight, used to sort the biggest differences. */
  impact: number;
  margin: string;
};

export function rows(a: CompareDrone, b: CompareDrone): Row[] {
  return SPECS.map((spec) => {
    const va = spec.get(a);
    const vb = spec.get(b);
    let winner: Row["winner"] = null;
    if (spec.better && va !== vb) {
      const aWins = spec.better === "higher" ? va > vb : va < vb;
      winner = aWins ? "a" : "b";
    }
    const gap = spec.better ? Math.abs(specScore(spec, a) - specScore(spec, b)) : 0;
    const win = winner === "a" ? a : b;
    const lose = winner === "a" ? b : a;
    return {
      spec,
      a: spec.show(a),
      b: spec.show(b),
      winner,
      gap,
      impact: gap * (spec.weight ?? 1),
      margin: winner && spec.margin ? spec.margin(win, lose) : "",
    };
  });
}

export function reasonText(row: Row, a: CompareDrone, b: CompareDrone): string {
  const win = row.winner === "a" ? a : b;
  const lose = row.winner === "a" ? b : a;
  const r = row.spec.reason;
  return typeof r === "function" ? r(win, lose) : (r ?? row.spec.label);
}

export function wantText(row: Row, a: CompareDrone, b: CompareDrone): string {
  const win = row.winner === "a" ? a : b;
  const lose = row.winner === "a" ? b : a;
  const w = row.spec.want;
  return typeof w === "function" ? w(win, lose) : (w ?? row.spec.label.toLowerCase());
}

/** Specs where `side` wins, biggest difference first. */
export function advantages(a: CompareDrone, b: CompareDrone, side: "a" | "b"): Row[] {
  return rows(a, b)
    .filter((r) => r.winner === side)
    .sort((x, y) => y.impact - x.impact);
}

/** The largest differences, optionally within one area. */
export function biggestDifferences(a: CompareDrone, b: CompareDrone, area?: AreaId, n = 5): Row[] {
  return rows(a, b)
    .filter((r) => r.winner && (!area || r.spec.group === area))
    .sort((x, y) => y.impact - x.impact)
    .slice(0, n);
}

/** Areas each drone leads in. */
export function areaLeads(a: CompareDrone, b: CompareDrone): { a: AreaId[]; b: AreaId[] } {
  const sa = areaScores(a);
  const sb = areaScores(b);
  return {
    a: AREAS.filter((x) => sa[x.id] > sb[x.id]).map((x) => x.id),
    b: AREAS.filter((x) => sb[x.id] > sa[x.id]).map((x) => x.id),
  };
}

const areaLabel = (id: AreaId) => AREAS.find((a) => a.id === id)?.label.toLowerCase() ?? id;

/** The verdict at the top of a comparison, in two short sentences. */
export function ruling(a: CompareDrone, b: CompareDrone): { winner: CompareDrone | null; text: string } {
  const sa = score(a);
  const sb = score(b);
  const leads = areaLeads(a, b);
  if (sa === sb) {
    return {
      winner: null,
      text: `It is a tie at ${sa} points each. The ${a.short} leads in ${leads.a.length} of 5 areas and the ${b.short} in ${leads.b.length}.`,
    };
  }
  const [w, l, ws, ls, wl, ll] =
    sa > sb ? [a, b, sa, sb, leads.a, leads.b] : [b, a, sb, sa, leads.b, leads.a];
  const tail =
    ll.length > wl.length
      ? `, even though the ${l.short} leads in ${ll.length} of 5 areas.`
      : ll.length === wl.length
        ? `, and each drone leads in ${wl.length} of the 5 areas.`
        : ` and leads in ${wl.length} of 5 areas.`;
  return { winner: w, text: `Get the ${w.name}. It scores ${ws} against ${ls}${tail}` };
}

/** "Pick the Air 3S if you want a bigger camera sensor, longer flights and a zoom camera." */
export function pickIf(a: CompareDrone, b: CompareDrone, side: "a" | "b", n = 3): string {
  const d = side === "a" ? a : b;
  const other = side === "a" ? b : a;
  const wins = advantages(a, b, side).filter((r) => r.spec.want);
  // One reason per area first, so the line is not three ways of saying "it is smaller".
  const picked: Row[] = [];
  const areas = new Set<GroupId>();
  for (const r of wins) {
    if (areas.has(r.spec.group)) continue;
    areas.add(r.spec.group);
    picked.push(r);
  }
  for (const r of wins) if (!picked.includes(r)) picked.push(r);
  const wants = picked.slice(0, n).map((r) => wantText(r, a, b));
  if (!wants.length) {
    return `The ${d.short} does not beat the ${other.short} on any spec we score, so the choice comes down to price.`;
  }
  return `Pick the ${d.short} if you want ${joinList(wants)}.`;
}

export function areaLabelOf(id: AreaId): string {
  return areaLabel(id);
}

/** Visible text for the writing test: every label, help text and value on the pages. */
export function compareTexts(): string[] {
  const out: string[] = [];
  for (const a of AREAS) out.push(a.label, a.blurb);
  for (const s of SPECS) {
    out.push(s.label, s.help);
    if (typeof s.reason === "string") out.push(s.reason);
    if (typeof s.want === "string") out.push(s.want);
  }
  for (const d of drones) {
    out.push(d.name, d.headline, d.note ?? "");
    for (const s of SPECS) out.push(s.show(d));
  }
  for (const x of drones) {
    for (const y of drones) {
      if (x.slug === y.slug) continue;
      for (const r of rows(x, y)) if (r.winner) out.push(r.margin, reasonText(r, x, y), wantText(r, x, y));
      out.push(ruling(x, y).text, pickIf(x, y, "a"), pickIf(x, y, "b"));
    }
  }
  return out.filter(Boolean);
}
