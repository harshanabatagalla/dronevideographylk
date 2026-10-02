import Link from "next/link";
import { getTestimonials } from "@/lib/db";
import { saveTestimonialAction, deleteTestimonialAction } from "@/app/admin/actions";
import { AdminHeading, Card, Field, Textarea, SubmitButton } from "@/components/admin/form";
import { ConfirmButton } from "@/components/admin/ConfirmButton";

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const testimonials = await getTestimonials();
  const editing = edit ? testimonials.find((t) => t.id === edit) : undefined;

  return (
    <div>
      <AdminHeading title="Testimonials" description="Showcase reviews from happy travelers." />

      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <Card>
          <h2 className="font-display text-xl font-semibold text-night">
            {editing ? `Edit review` : "Add a testimonial"}
          </h2>
          <form action={saveTestimonialAction} className="mt-5 space-y-4">
            <input type="hidden" name="id" defaultValue={editing?.id ?? ""} />
            <Field label="Name" name="name" required defaultValue={editing?.name} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Country" name="country" defaultValue={editing?.country} placeholder="United Kingdom" />
              <Field label="Flag emoji" name="countryFlag" defaultValue={editing?.countryFlag} placeholder="🇬🇧" />
            </div>
            <Textarea label="Quote" name="quote" defaultValue={editing?.quote} rows={4} />
            <Field label="Rating (1–5)" name="rating" type="number" defaultValue={editing?.rating ?? 5} />

            <div className="flex items-center gap-3 pt-2">
              <SubmitButton>{editing ? "Save changes" : "Add testimonial"}</SubmitButton>
              {editing && (
                <Link href="/admin/testimonials" className="text-sm text-night/65 hover:text-night">
                  Cancel
                </Link>
              )}
            </div>
          </form>
        </Card>

        <div>
          <h2 className="mb-4 font-display text-xl font-semibold text-night">
            All testimonials ({testimonials.length})
          </h2>
          <ul className="space-y-3">
            {testimonials.map((t) => (
              <li key={t.id} className="rounded-2xl border border-night/10 bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-night">
                      {t.countryFlag} {t.name}{" "}
                      <span className="text-sm font-normal text-sunset">{"★".repeat(t.rating)}</span>
                    </p>
                    <p className="mt-1 text-sm text-night/65">“{t.quote}”</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Link
                      href={`/admin/testimonials?edit=${t.id}`}
                      className="rounded-lg border border-night/15 px-3 py-1.5 text-sm text-night/70 hover:border-ocean/40"
                    >
                      Edit
                    </Link>
                    <form action={deleteTestimonialAction}>
                      <input type="hidden" name="id" value={t.id} />
                      <ConfirmButton
                        message={`Delete review from ${t.name}?`}
                        className="rounded-lg border border-coral/30 px-3 py-1.5 text-sm text-coral hover:bg-coral/10"
                      >
                        Delete
                      </ConfirmButton>
                    </form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
