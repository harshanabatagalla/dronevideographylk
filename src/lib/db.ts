import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import {
  drones as seedDrones,
  footage as seedFootage,
  testimonials as seedTestimonials,
  type Drone,
  type Footage,
  type Testimonial,
} from "./content";
import { site } from "./site";
import { supabaseConfigured, sbGetStore, sbPutStore } from "./supabase";

/**
 * Server-side data layer for the public site and admin dashboard.
 *
 * Persistence strategy (cost-optimized):
 *  - Locally / by default it writes to a JSON file in `.data/store.json`, so the
 *    admin dashboard is fully functional with zero configuration.
 *  - The Supabase schema in `supabase/schema.sql` mirrors these shapes; swapping
 *    the read/write helpers below for Supabase REST calls is the only change
 *    needed to move persistence to the cloud (see `SUPABASE_*` env vars).
 *
 * Note: on serverless hosts the filesystem is ephemeral, so configure Supabase
 * before going to production. In local development the JSON store persists.
 *
 * The file holds every enquiry and order, so it is handled carefully:
 *  - Changes run one at a time (see `mutate`), so two requests at once cannot
 *    overwrite each other.
 *  - Each save writes a temporary file and renames it over the store, so a
 *    crash can never leave half a file behind.
 *  - A file that cannot be read is never replaced with sample data. The app
 *    refuses to start from it and keeps a copy next to it for recovery.
 *  - One copy of the store per day is kept in `.data/backups`, for 14 days.
 */

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  country: string;
  dates: string;
  locations: string;
  shootType: string;
  message: string;
  status: "new" | "handled" | "archived";
  createdAt: string;
};

export type SiteSettings = {
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  phone: string;
  address: string;
  socials: {
    instagram: string;
    youtube: string;
    facebook: string;
    tiktok: string;
  };
  /** Homepage hero media, manageable from the admin dashboard. */
  media: {
    /** Background video shown behind the hero (served from /public). */
    heroVideo: string;
    /** Poster image shown instantly while the video buffers (fast LCP). */
    heroPoster: string;
  };
};

export type StoredTestimonial = Testimonial & { id: string };

export type OrderItem = { slug: string; name: string; price: number; qty: number };

export type Order = {
  id: string;
  /** Short human-friendly reference shown to the customer, e.g. DV-7K3Q9M. */
  ref: string;
  items: OrderItem[];
  total: number;
  currency: "LKR";
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  payment: "bank-transfer" | "cash-on-delivery";
  notes: string;
  status: "new" | "confirmed" | "paid" | "shipped" | "cancelled";
  createdAt: string;
};

type Store = {
  drones: Drone[];
  footage: Footage[];
  testimonials: StoredTestimonial[];
  enquiries: Enquiry[];
  orders?: Order[];
  settings: SiteSettings;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_PATH = path.join(DATA_DIR, "store.json");
const BACKUP_DIR = path.join(DATA_DIR, "backups");
const BACKUP_DAYS = 14;

function defaultSettings(): SiteSettings {
  return {
    whatsapp: site.whatsapp,
    whatsappMessage: site.whatsappMessage,
    email: site.email,
    phone: site.phone,
    address: site.address,
    socials: { ...site.socials },
    media: {
      heroVideo: "/media/hero_background.mp4",
      heroPoster: "/media/portfolio/sigiriya-rock-pidurangala.webp",
    },
  };
}

function seed(): Store {
  return {
    drones: seedDrones.map((d) => ({ ...d })),
    footage: seedFootage.map((f) => ({ ...f })),
    testimonials: seedTestimonials.map((t) => ({ ...t, id: t.id ?? randomUUID() })),
    enquiries: [],
    settings: defaultSettings(),
  };
}

let cache: Store | null = null;

function isMissing(err: unknown): boolean {
  return (err as NodeJS.ErrnoException | undefined)?.code === "ENOENT";
}

async function readFile(): Promise<Store> {
  let raw: string;
  try {
    raw = await fs.readFile(STORE_PATH, "utf8");
  } catch (err) {
    if (!isMissing(err)) throw err;
    // First run: there is no store yet, so start from the sample data.
    const fresh = seed();
    await writeFile(fresh);
    return fresh;
  }
  try {
    return JSON.parse(raw) as Store;
  } catch (err) {
    // Never start over from sample data here: the next save would overwrite every
    // enquiry and order. Keep a copy of the unreadable file and stop.
    const copy = `${STORE_PATH}.unreadable-${Date.now()}`;
    await fs.copyFile(STORE_PATH, copy).catch(() => undefined);
    throw new Error(`The data store is not valid JSON. A copy was kept at ${copy}. ${String(err)}`);
  }
}

async function read(): Promise<Store> {
  // Production / serverless: read from Supabase (no in-memory cache so admin
  // edits are reflected immediately across instances).
  if (supabaseConfigured()) {
    const data = await sbGetStore<Store>();
    if (data) return data;
    const seeded = seed();
    await sbPutStore(seeded);
    return seeded;
  }
  // Local dev and the single server: JSON file store.
  if (!cache) cache = await readFile();
  return cache;
}

async function writeFile(store: Store): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${STORE_PATH}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(store, null, 2), "utf8");
  await fs.rename(tmp, STORE_PATH);
  await backupOncePerDay().catch((err) => console.error("Store backup failed", err));
}

async function backupOncePerDay(): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);
  const target = path.join(BACKUP_DIR, `store-${today}.json`);
  await fs.mkdir(BACKUP_DIR, { recursive: true });
  try {
    await fs.access(target);
    return; // today's copy already exists
  } catch {
    // not made yet
  }
  await fs.copyFile(STORE_PATH, target);
  const old = (await fs.readdir(BACKUP_DIR)).filter((f) => /^store-\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort();
  for (const name of old.slice(0, Math.max(0, old.length - BACKUP_DAYS))) {
    await fs.unlink(path.join(BACKUP_DIR, name)).catch(() => undefined);
  }
}

let queue: Promise<unknown> = Promise.resolve();

/**
 * Runs one change to the store at a time: read, change, save. Without this two
 * requests at once can both read the old data and the second save drops the
 * first request's change, or both write the file at the same moment and corrupt it.
 */
function mutate<T>(change: (store: Store) => T | Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    const store = await read();
    try {
      const result = await change(store);
      if (supabaseConfigured()) await sbPutStore(store);
      else await writeFile(store);
      return result;
    } catch (err) {
      // The change may be half applied in memory. Reload from disk on the next read.
      cache = null;
      throw err;
    }
  });
  queue = run.catch(() => undefined);
  return run;
}

/* ----------------------------- Drones ----------------------------- */

export async function getDrones(): Promise<Drone[]> {
  const s = await read();
  return [...s.drones].sort((a, b) => a.order - b.order);
}

export async function getDrone(slug: string): Promise<Drone | undefined> {
  const s = await read();
  return s.drones.find((d) => d.slug === slug);
}

export async function upsertDrone(drone: Drone): Promise<void> {
  await mutate((s) => {
    const idx = s.drones.findIndex((d) => d.slug === drone.slug);
    if (idx >= 0) s.drones[idx] = drone;
    else s.drones.push(drone);
  });
}

export async function deleteDrone(slug: string): Promise<void> {
  await mutate((s) => {
    s.drones = s.drones.filter((d) => d.slug !== slug);
  });
}

/* ----------------------------- Footage ----------------------------- */

export async function getFootage(): Promise<Footage[]> {
  const s = await read();
  return s.footage;
}

export async function getFeaturedFootage(): Promise<Footage[]> {
  const s = await read();
  return s.footage.filter((f) => f.featured);
}

export async function upsertFootage(item: Footage): Promise<void> {
  await mutate((s) => {
    const idx = s.footage.findIndex((f) => f.id === item.id);
    if (idx >= 0) s.footage[idx] = item;
    else s.footage.push(item);
  });
}

export async function deleteFootage(id: string): Promise<void> {
  await mutate((s) => {
    s.footage = s.footage.filter((f) => f.id !== id);
  });
}

/* --------------------------- Testimonials -------------------------- */

export async function getTestimonials(): Promise<StoredTestimonial[]> {
  const s = await read();
  return s.testimonials;
}

export async function upsertTestimonial(t: StoredTestimonial): Promise<void> {
  await mutate((s) => {
    const idx = s.testimonials.findIndex((x) => x.id === t.id);
    if (idx >= 0) s.testimonials[idx] = t;
    else s.testimonials.push(t);
  });
}

export async function deleteTestimonial(id: string): Promise<void> {
  await mutate((s) => {
    s.testimonials = s.testimonials.filter((t) => t.id !== id);
  });
}

/* ----------------------------- Settings ---------------------------- */

export async function getSettings(): Promise<SiteSettings> {
  const s = await read();
  // Backfill fields added after the store was first seeded.
  const defaults = defaultSettings();
  return {
    ...defaults,
    ...s.settings,
    socials: { ...defaults.socials, ...s.settings.socials },
    media: { ...defaults.media, ...s.settings.media },
  };
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  await mutate((s) => {
    s.settings = settings;
  });
}

/* ---------------------------- Enquiries ---------------------------- */

export async function getEnquiries(): Promise<Enquiry[]> {
  const s = await read();
  return [...s.enquiries].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addEnquiry(
  data: Omit<Enquiry, "id" | "status" | "createdAt">,
): Promise<void> {
  await mutate((s) => {
    s.enquiries.push({
      ...data,
      id: randomUUID(),
      status: "new",
      createdAt: new Date().toISOString(),
    });
  });
}

export async function setEnquiryStatus(id: string, status: Enquiry["status"]): Promise<void> {
  await mutate((s) => {
    const e = s.enquiries.find((x) => x.id === id);
    if (e) e.status = status;
  });
}

/* ------------------------------ Orders ----------------------------- */

export async function getOrders(): Promise<Order[]> {
  const s = await read();
  return [...(s.orders ?? [])].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addOrder(
  data: Omit<Order, "id" | "ref" | "status" | "createdAt">,
): Promise<Order> {
  return mutate((s) => {
    const order: Order = {
      ...data,
      id: randomUUID(),
      ref: `DV-${randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase()}`,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    s.orders = [...(s.orders ?? []), order];
    return order;
  });
}

export async function setOrderStatus(id: string, status: Order["status"]): Promise<void> {
  await mutate((s) => {
    const o = (s.orders ?? []).find((x) => x.id === id);
    if (o) o.status = status;
  });
}

export function newId(): string {
  return randomUUID();
}
