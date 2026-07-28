import Link from "next/link";
import { getDrones, getDrone } from "@/lib/db";
import { saveDroneAction, deleteDroneAction } from "@/app/admin/actions";
import { AdminHeading, Card, Field, Textarea, SubmitButton } from "@/components/admin/form";
import { ConfirmButton } from "@/components/admin/ConfirmButton";

export default async function AdminDronesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const drones = await getDrones();
  const editing = edit ? await getDrone(edit) : undefined;

  const specsText = editing?.specs.map((s) => `${s.icon} | ${s.label} | ${s.value}`).join("\n") ?? "";

  return (
    <div>
      <AdminHeading title="Drones" description="Add devices and edit their plain-language specifications." />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <Card>
          <h2 className="font-display text-xl font-semibold text-night">
            {editing ? `Edit: ${editing.name}` : "Add a drone"}
          </h2>
          <form action={saveDroneAction} className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" required defaultValue={editing?.name} />
              <Field
                label="Slug"
                name="slug"
                defaultValue={editing?.slug}
                placeholder="auto from name"
                hint="URL id, e.g. skymaster-pro"
              />
            </div>
            <Field label="Tagline" name="tagline" defaultValue={editing?.tagline} />
            <Field label="Image URL" name="image" defaultValue={editing?.image} placeholder="https://…" />
            <Textarea
              label="Specs (one per line)"
              name="specs"
              defaultValue={specsText}
              rows={6}
              placeholder={"camera | Video quality | Stunning 4K\nclock | Flight time | ~30 min per battery"}
              hint="Format: icon | label | value. Icons: clock, camera, signal, wind, mountain, sparkles"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Best for (comma separated)"
                name="bestFor"
                defaultValue={editing?.bestFor.join(", ")}
                placeholder="Beaches, Mountains"
              />
              <Field
                label="Sample footage (YouTube IDs)"
                name="sampleFootage"
                defaultValue={editing?.sampleFootage.join(", ")}
                placeholder="ScMzIvxBSi4"
              />
            </div>
            <Field label="Display order" name="order" type="number" defaultValue={editing?.order ?? drones.length + 1} />

            <div className="flex items-center gap-3 pt-2">
              <SubmitButton>{editing ? "Save changes" : "Add drone"}</SubmitButton>
              {editing && (
                <Link href="/admin/drones" className="text-sm text-night/60 hover:text-night">
                  Cancel
                </Link>
              )}
            </div>
          </form>
        </Card>

        <div>
          <h2 className="mb-4 font-display text-xl font-semibold text-night">
            Current fleet ({drones.length})
          </h2>
          <ul className="space-y-3">
            {drones.map((d) => (
              <li key={d.slug} className="flex items-center gap-4 rounded-2xl border border-night/10 bg-white p-4">
                {d.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={d.image} alt="" className="h-14 w-20 rounded-lg object-cover" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-night">{d.name}</p>
                  <p className="truncate text-sm text-night/55">{d.tagline}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/admin/drones?edit=${d.slug}`}
                    className="rounded-lg border border-night/15 px-3 py-1.5 text-sm text-night/70 hover:border-ocean/40"
                  >
                    Edit
                  </Link>
                  <form action={deleteDroneAction}>
                    <input type="hidden" name="slug" value={d.slug} />
                    <ConfirmButton
                      message={`Delete ${d.name}?`}
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
