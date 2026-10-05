import Link from "next/link";
import { getFootage, getDrones } from "@/lib/db";
import { saveFootageAction, deleteFootageAction } from "@/app/admin/actions";
import { AdminHeading, Card, Field, SubmitButton } from "@/components/admin/form";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { adminHref } from "@/lib/admin-path";

const CATEGORIES = ["Heritage", "Mountains", "Waterfalls", "Coast", "Lakes and Rivers", "Travel", "Wedding", "Event", "Resort", "Adventure"];

export default async function AdminFootagePage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const [footage, drones] = await Promise.all([getFootage(), getDrones()]);
  const editing = edit ? footage.find((f) => f.id === edit) : undefined;

  return (
    <div>
      <AdminHeading title="Footage" description="Add drone shots and choose which appear on the homepage." />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <Card>
          <h2 className="font-display text-xl font-semibold text-night">
            {editing ? `Edit: ${editing.title}` : "Add footage"}
          </h2>
          <form action={saveFootageAction} className="mt-5 space-y-4">
            <input type="hidden" name="id" defaultValue={editing?.id ?? ""} />
            <Field label="Title" name="title" required defaultValue={editing?.title} />
            <Field label="Poster image URL" name="poster" defaultValue={editing?.poster} placeholder="https://…" />
            <Field
              label="YouTube video ID"
              name="youtubeId"
              defaultValue={editing?.youtubeId}
              placeholder="ScMzIvxBSi4"
              hint="The id after watch?v= — free hosting + good SEO"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Location" name="location" defaultValue={editing?.location} placeholder="Ella" />
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-night">Category</span>
                <select
                  name="category"
                  defaultValue={editing?.category ?? "Travel"}
                  className="w-full rounded-xl border border-night/15 bg-white px-4 py-2.5 text-night focus:border-ocean focus:outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-night">Filmed with</span>
              <select
                name="droneSlug"
                defaultValue={editing?.droneSlug ?? drones[0]?.slug ?? ""}
                className="w-full rounded-xl border border-night/15 bg-white px-4 py-2.5 text-night focus:border-ocean focus:outline-none"
              >
                {drones.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={editing?.featured}
                className="h-4 w-4 rounded border-night/30 accent-sunset"
              />
              <span className="font-medium text-night">Feature on homepage</span>
            </label>

            <div className="flex items-center gap-3 pt-2">
              <SubmitButton>{editing ? "Save changes" : "Add footage"}</SubmitButton>
              {editing && (
                <Link href={adminHref("/footage")} className="text-sm text-night/65 hover:text-night">
                  Cancel
                </Link>
              )}
            </div>
          </form>
        </Card>

        <div>
          <h2 className="mb-4 font-display text-xl font-semibold text-night">
            All footage ({footage.length})
          </h2>
          <ul className="space-y-3">
            {footage.map((f) => (
              <li key={f.id} className="flex items-center gap-4 rounded-2xl border border-night/10 bg-white p-4">
                {f.poster && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={f.poster} alt={`${f.title} thumbnail`} className="h-14 w-20 rounded-lg object-cover" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-night">
                    {f.title} {f.featured && <span className="text-sunset">★</span>}
                  </p>
                  <p className="truncate text-sm text-night/65">
                    {f.location} · {f.category}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={adminHref(`/footage?edit=${f.id}`)}
                    className="rounded-lg border border-night/15 px-3 py-1.5 text-sm text-night/70 hover:border-ocean/40"
                  >
                    Edit
                  </Link>
                  <form action={deleteFootageAction}>
                    <input type="hidden" name="id" value={f.id} />
                    <ConfirmButton
                      message={`Delete "${f.title}"?`}
                      className="rounded-lg border border-coral/30 px-3 py-1.5 text-sm text-coral hover:bg-coral/10"
                    >
                      Delete
                    </ConfirmButton>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
