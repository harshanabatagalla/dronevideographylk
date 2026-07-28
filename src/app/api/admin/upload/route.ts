import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { getSettings, saveSettings } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { supabaseConfigured, sbUploadMedia } from "@/lib/supabase";

export const runtime = "nodejs";
export const maxDuration = 60;

const ALLOWED: Record<string, { exts: string[]; mimePrefix: string }> = {
  heroVideo: { exts: [".mp4", ".webm", ".mov"], mimePrefix: "video/" },
  heroPoster: { exts: [".jpg", ".jpeg", ".png", ".webp", ".avif"], mimePrefix: "image/" },
};

const MAX_BYTES = 100 * 1024 * 1024; // 100 MB safety cap

/**
 * Admin-only media upload. Accepts a single file plus a `key` identifying which
 * homepage slot it targets (heroVideo | heroPoster). Files are written to
 * /public/uploads and the resulting public path is stored in site settings.
 */
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const key = String(form.get("key") ?? "");
  const file = form.get("file");

  const rule = ALLOWED[key];
  if (!rule) {
    return NextResponse.json({ error: "Invalid upload target" }, { status: 400 });
  }
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large" }, { status: 413 });
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!rule.exts.includes(ext) || !file.type.startsWith(rule.mimePrefix)) {
    return NextResponse.json({ error: `Unsupported file type for ${key}` }, { status: 415 });
  }

  const filename = `${key}-${randomUUID()}${ext}`;

  // Production: Supabase Storage. Local dev: write to /public/uploads.
  let publicPath: string;
  if (supabaseConfigured()) {
    publicPath = await sbUploadMedia(filename, file, file.type);
  } else {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.writeFile(path.join(uploadsDir, filename), bytes);
    publicPath = `/uploads/${filename}`;
  }

  const settings = await getSettings();
  await saveSettings({
    ...settings,
    media: { ...settings.media, [key]: publicPath },
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");

  return NextResponse.json({ path: publicPath });
}
