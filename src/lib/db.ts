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
  // Local dev: JSON file store.
  if (cache) return cache;
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    cache = JSON.parse(raw) as Store;
  } catch {
    cache = seed();
    await write(cache);
  }
  return cache;
}

async function write(store: Store): Promise<void> {
  if (supabaseConfigured()) {
    await sbPutStore(store);
    return;
  }
  cache = store;
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
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
  const s = await read();
  const idx = s.drones.findIndex((d) => d.slug === drone.slug);
  if (idx >= 0) s.drones[idx] = drone;
  else s.drones.push(drone);
  await write(s);
}

export async function deleteDrone(slug: string): Promise<void> {
  const s = await read();
  s.drones = s.drones.filter((d) => d.slug !== slug);
  await write(s);
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
  const s = await read();
  const idx = s.footage.findIndex((f) => f.id === item.id);
  if (idx >= 0) s.footage[idx] = item;
  else s.footage.push(item);
  await write(s);
}

export async function deleteFootage(id: string): Promise<void> {
  const s = await read();
  s.footage = s.footage.filter((f) => f.id !== id);
  await write(s);
}

/* --------------------------- Testimonials -------------------------- */

export async function getTestimonials(): Promise<StoredTestimonial[]> {
  const s = await read();
  return s.testimonials;
}

export async function upsertTestimonial(t: StoredTestimonial): Promise<void> {
  const s = await read();
  const idx = s.testimonials.findIndex((x) => x.id === t.id);
  if (idx >= 0) s.testimonials[idx] = t;
  else s.testimonials.push(t);
  await write(s);
}

export async function deleteTestimonial(id: string): Promise<void> {
  const s = await read();
  s.testimonials = s.testimonials.filter((t) => t.id !== id);
  await write(s);
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
  const s = await read();
  s.settings = settings;
  await write(s);
}

/* ---------------------------- Enquiries ---------------------------- */

export async function getEnquiries(): Promise<Enquiry[]> {
  const s = await read();
  return [...s.enquiries].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addEnquiry(
  data: Omit<Enquiry, "id" | "status" | "createdAt">,
): Promise<void> {
  const s = await read();
  s.enquiries.push({
    ...data,
    id: randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
  });
  await write(s);
}

export async function setEnquiryStatus(id: string, status: Enquiry["status"]): Promise<void> {
  const s = await read();
  const e = s.enquiries.find((x) => x.id === id);
  if (e) e.status = status;
  await write(s);
}

/* ------------------------------ Orders ----------------------------- */

export async function getOrders(): Promise<Order[]> {
  const s = await read();
  return [...(s.orders ?? [])].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addOrder(
  data: Omit<Order, "id" | "ref" | "status" | "createdAt">,
): Promise<Order> {
  const s = await read();
  const order: Order = {
    ...data,
    id: randomUUID(),
    ref: `DV-${randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase()}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  s.orders = [...(s.orders ?? []), order];
  await write(s);
  return order;
}

export async function setOrderStatus(id: string, status: Order["status"]): Promise<void> {
  const s = await read();
  const o = (s.orders ?? []).find((x) => x.id === id);
  if (o) o.status = status;
  await write(s);
}

export function newId(): string {
  return randomUUID();
}
