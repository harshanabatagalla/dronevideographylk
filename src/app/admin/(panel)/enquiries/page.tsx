import { getEnquiries } from "@/lib/db";
import { setEnquiryStatusAction } from "@/app/admin/actions";
import { AdminHeading } from "@/components/admin/form";

const STATUS_STYLES: Record<string, string> = {
  new: "bg-sunset/15 text-sunset",
  handled: "bg-teal/15 text-teal",
  archived: "bg-night/10 text-night/65",
};

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries();

  return (
    <div>
      <AdminHeading title="Enquiries" description="Messages sent through the contact form." />

      {enquiries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-night/20 bg-white p-10 text-center text-night/65">
          No enquiries yet. Submissions from the contact form will appear here.
        </div>
      ) : (
        <ul className="space-y-4">
          {enquiries.map((e) => (
            <li key={e.id} className="rounded-2xl border border-night/10 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-night">
                    {e.name}{" "}
                    <span className={`ml-2 rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[e.status]}`}>
                      {e.status}
                    </span>
                  </p>
                  <p className="text-sm text-night/65">
                    <a href={`mailto:${e.email}`} className="hover:text-ocean">
                      {e.email}
                    </a>
                    {e.country && ` · ${e.country}`}
                  </p>
                </div>
                <time className="text-xs text-night/65">
                  {new Date(e.createdAt).toLocaleString()}
                </time>
              </div>

              <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm text-night/70 sm:grid-cols-2">
                {e.shootType && (
                  <div>
                    <dt className="inline font-medium text-night">Shoot: </dt>
                    <dd className="inline">{e.shootType}</dd>
                  </div>
                )}
                {e.dates && (
                  <div>
                    <dt className="inline font-medium text-night">Dates: </dt>
                    <dd className="inline">{e.dates}</dd>
                  </div>
                )}
                {e.locations && (
                  <div>
                    <dt className="inline font-medium text-night">Locations: </dt>
                    <dd className="inline">{e.locations}</dd>
                  </div>
                )}
              </dl>

              {e.message && <p className="mt-3 rounded-xl bg-sand/60 p-3 text-sm text-night/75">{e.message}</p>}

              <div className="mt-4 flex flex-wrap gap-2">
                {(["new", "handled", "archived"] as const)
                  .filter((status) => status !== e.status)
                  .map((status) => (
                    <form key={status} action={setEnquiryStatusAction}>
                      <input type="hidden" name="id" value={e.id} />
                      <input type="hidden" name="status" value={status} />
                      <button
                        type="submit"
                        className="rounded-lg border border-night/15 px-3 py-1.5 text-xs font-medium text-night/70 transition hover:border-ocean/40"
                      >
                        Mark {status}
                      </button>
                    </form>
                  ))}
                <a
                  href={`mailto:${e.email}`}
                  className="rounded-lg bg-sunset px-3 py-1.5 text-xs font-semibold text-night transition hover:bg-amber-400"
                >
                  Reply
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
