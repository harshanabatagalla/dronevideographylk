"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { adminHref, isAdminHref } from "@/lib/admin-path";
import { clearFailures, isLockedOut, recordFailure } from "@/lib/login-throttle";
import {
  isAuthenticated,
  startSession,
  endSession,
  checkPassword,
} from "@/lib/auth";
import {
  upsertDrone,
  deleteDrone,
  upsertFootage,
  deleteFootage,
  upsertTestimonial,
  deleteTestimonial,
  saveSettings,
  setEnquiryStatus,
  setOrderStatus,
  getSettings,
  newId,
  type Enquiry,
  type Order,
  type SiteSettings,
} from "@/lib/db";
import type { Drone, Footage, Spec } from "@/lib/content";

/* ------------------------------- Auth ------------------------------- */

/** The visitor's IP. nginx appends the real address last to X-Forwarded-For; earlier entries can be forged. */
async function clientIp(): Promise<string> {
  const forwarded = (await headers()).get("x-forwarded-for");
  return forwarded?.split(",").pop()?.trim() || "unknown";
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const requested = String(formData.get("next") ?? "");
  const next = isAdminHref(requested) ? requested : adminHref();
  const ip = await clientIp();
  if (isLockedOut(ip)) {
    redirect(adminHref(`/login?error=locked&next=${encodeURIComponent(next)}`));
  }
  if (!checkPassword(password)) {
    recordFailure(ip);
    // Slows down password guessing without bothering a real admin.
    await new Promise((resolve) => setTimeout(resolve, 600));
    redirect(adminHref(`/login?error=${isLockedOut(ip) ? "locked" : "1"}&next=${encodeURIComponent(next)}`));
  }
  clearFailures(ip);
  await startSession();
  redirect(next);
}

export async function logoutAction() {
  await endSession();
  redirect(adminHref("/login"));
}

async function assertAuth() {
  if (!(await isAuthenticated())) redirect(adminHref("/login"));
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitLines(value: string): string[] {
  return value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function splitCsv(value: string): string[] {
  return value
    .split(",")
    .map((l) => l.trim())
    .filter(Boolean);
}

const SPEC_ICONS: Spec["icon"][] = ["clock", "camera", "signal", "wind", "mountain", "drone"];

/* ------------------------------ Drones ------------------------------ */

export async function saveDroneAction(formData: FormData) {
  await assertAuth();
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim() || slugify(name);
  if (!name || !slug) redirect(adminHref("/drones?error=1"));

  // Specs entered one per line as: icon | label | value
  const specs: Spec[] = splitLines(String(formData.get("specs") ?? "")).map((line) => {
    const [rawIcon, label, ...rest] = line.split("|").map((p) => p.trim());
    const icon = (SPEC_ICONS.includes(rawIcon as Spec["icon"]) ? rawIcon : "camera") as Spec["icon"];
    return { icon, label: label ?? "", value: rest.join(" | ") };
  });

  const drone: Drone = {
    slug,
    name,
    tagline: String(formData.get("tagline") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
    specs,
    bestFor: splitCsv(String(formData.get("bestFor") ?? "")),
    sampleFootage: splitCsv(String(formData.get("sampleFootage") ?? "")),
    order: Number(formData.get("order") ?? 0) || 0,
  };

  await upsertDrone(drone);
  revalidatePath("/");
  revalidatePath("/fleet");
  revalidatePath(`/fleet/${slug}`);
  revalidatePath("/admin/drones");
  redirect(adminHref("/drones"));
}

export async function deleteDroneAction(formData: FormData) {
  await assertAuth();
  const slug = String(formData.get("slug") ?? "");
  if (slug) await deleteDrone(slug);
  revalidatePath("/");
  revalidatePath("/fleet");
  revalidatePath("/admin/drones");
  redirect(adminHref("/drones"));
}

/* ------------------------------ Footage ----------------------------- */

export async function saveFootageAction(formData: FormData) {
  await assertAuth();
  const id = String(formData.get("id") ?? "").trim() || newId();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) redirect(adminHref("/footage?error=1"));

  const item: Footage = {
    id,
    title,
    poster: String(formData.get("poster") ?? "").trim(),
    youtubeId: String(formData.get("youtubeId") ?? "").trim() || undefined,
    location: String(formData.get("location") ?? "").trim(),
    category: (String(formData.get("category") ?? "Travel") as Footage["category"]),
    droneSlug: String(formData.get("droneSlug") ?? "").trim(),
    featured: formData.get("featured") === "on",
  };

  await upsertFootage(item);
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/admin/footage");
  redirect(adminHref("/footage"));
}

export async function deleteFootageAction(formData: FormData) {
  await assertAuth();
  const id = String(formData.get("id") ?? "");
  if (id) await deleteFootage(id);
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/admin/footage");
  redirect(adminHref("/footage"));
}

/* --------------------------- Testimonials --------------------------- */

export async function saveTestimonialAction(formData: FormData) {
  await assertAuth();
  const id = String(formData.get("id") ?? "").trim() || newId();
  const name = String(formData.get("name") ?? "").trim();
  const quote = String(formData.get("quote") ?? "").trim();
  if (!name || !quote) redirect(adminHref("/testimonials?error=1"));

  await upsertTestimonial({
    id,
    name,
    quote,
    country: String(formData.get("country") ?? "").trim(),
    countryFlag: String(formData.get("countryFlag") ?? "").trim(),
    rating: Math.min(5, Math.max(1, Number(formData.get("rating") ?? 5) || 5)),
  });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect(adminHref("/testimonials"));
}

export async function deleteTestimonialAction(formData: FormData) {
  await assertAuth();
  const id = String(formData.get("id") ?? "");
  if (id) await deleteTestimonial(id);
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect(adminHref("/testimonials"));
}

/* ------------------------------ Settings ---------------------------- */

export async function saveSettingsAction(formData: FormData) {
  await assertAuth();
  const current = await getSettings();
  const settings: SiteSettings = {
    whatsapp: String(formData.get("whatsapp") ?? current.whatsapp).trim(),
    whatsappMessage: String(formData.get("whatsappMessage") ?? current.whatsappMessage).trim(),
    email: String(formData.get("email") ?? current.email).trim(),
    phone: String(formData.get("phone") ?? current.phone).trim(),
    address: String(formData.get("address") ?? current.address).trim(),
    socials: {
      instagram: String(formData.get("instagram") ?? "").trim(),
      youtube: String(formData.get("youtube") ?? "").trim(),
      facebook: String(formData.get("facebook") ?? "").trim(),
      tiktok: String(formData.get("tiktok") ?? "").trim(),
    },
    media: current.media,
  };
  await saveSettings(settings);
  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  redirect(adminHref("/settings?saved=1"));
}

/* ------------------------------ Enquiries --------------------------- */

export async function setEnquiryStatusAction(formData: FormData) {
  await assertAuth();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "new") as Enquiry["status"];
  if (id) await setEnquiryStatus(id, status);
  revalidatePath("/admin/enquiries");
  redirect(adminHref("/enquiries"));
}

/* ------------------------------ Orders ------------------------------ */

const ORDER_STATUSES: Order["status"][] = ["new", "confirmed", "paid", "shipped", "cancelled"];

export async function setOrderStatusAction(formData: FormData) {
  await assertAuth();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as Order["status"];
  if (id && ORDER_STATUSES.includes(status)) await setOrderStatus(id, status);
  revalidatePath("/admin/orders");
  redirect(adminHref("/orders"));
}
