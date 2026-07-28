/**
 * Dependency-free Supabase access (REST + Storage) using `fetch`.
 *
 * Two pieces of persistence move to Supabase so the app runs on serverless
 * hosts (e.g. Vercel) where the filesystem is read-only/ephemeral:
 *   1. The whole app "store" JSON lives in a single row of the `app_store`
 *      table (id = 1, `data` jsonb). This mirrors the original file-based store
 *      one-to-one, so the rest of the data layer is unchanged.
 *   2. Admin media uploads go to a public Storage bucket (default: `media`).
 *
 * All calls use the service-role key and run server-side only. When the env
 * vars are absent (local dev), the data layer falls back to the JSON file.
 */

const URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
export const STORAGE_BUCKET = process.env.SUPABASE_BUCKET ?? "media";

export function supabaseConfigured(): boolean {
  return Boolean(URL && KEY);
}

function authHeaders(extra: Record<string, string> = {}): Record<string, string> {
  return { apikey: KEY as string, Authorization: `Bearer ${KEY}`, ...extra };
}

/** Read the singleton store row. Returns null if the row doesn't exist yet. */
export async function sbGetStore<T>(): Promise<T | null> {
  const res = await fetch(`${URL}/rest/v1/app_store?id=eq.1&select=data`, {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Supabase store read failed: ${res.status} ${await res.text()}`);
  }
  const rows = (await res.json()) as { data: T }[];
  return rows.length ? rows[0].data : null;
}

/** Upsert the singleton store row. */
export async function sbPutStore<T>(data: T): Promise<void> {
  const res = await fetch(`${URL}/rest/v1/app_store`, {
    method: "POST",
    headers: authHeaders({
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    }),
    body: JSON.stringify({ id: 1, data }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Supabase store write failed: ${res.status} ${await res.text()}`);
  }
}

/** Upload a file to the public media bucket and return the public URL. */
export async function sbUploadMedia(
  filename: string,
  body: Blob,
  contentType: string,
): Promise<string> {
  const res = await fetch(`${URL}/storage/v1/object/${STORAGE_BUCKET}/${filename}`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": contentType, "x-upsert": "true" }),
    body,
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Supabase upload failed: ${res.status} ${await res.text()}`);
  }
  return `${URL}/storage/v1/object/public/${STORAGE_BUCKET}/${filename}`;
}
