import Link from "next/link";
import { getDrones, getFootage, getTestimonials, getEnquiries } from "@/lib/db";
import { usingDefaults } from "@/lib/auth";
import { Icon, type IconName } from "@/components/ui/Icon";

export default async function AdminOverview() {
  const [drones, footage, testimonials, enquiries] = await Promise.all([
    getDrones(),
    getFootage(),
    getTestimonials(),
    getEnquiries(),
  ]);
  const newEnquiries = enquiries.filter((e) => e.status === "new").length;

  const stats: { label: string; value: number; href: string; icon: IconName }[] = [
    { label: "Drones", value: drones.length, href: "/admin/drones", icon: "signal" },
    { label: "Footage", value: footage.length, href: "/admin/footage", icon: "camera" },
    { label: "Testimonials", value: testimonials.length, href: "/admin/testimonials", icon: "star" },
    { label: "New enquiries", value: newEnquiries, href: "/admin/enquiries", icon: "whatsapp" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-night">Dashboard</h1>
      <p className="mt-1 text-night/60">Manage everything on your site from here.</p>

      {usingDefaults() && (
        <div className="mt-6 rounded-2xl border border-sunset/40 bg-sunset/10 p-4 text-sm text-night/80">
          <strong>Heads up:</strong> you&apos;re using the default admin password. Set{" "}
          <code>ADMIN_PASSWORD</code> and <code>AUTH_SECRET</code> in <code>.env.local</code> before
          going live.
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-night/10 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-night/5"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-ocean/10 text-ocean">
              <Icon name={s.icon} size={20} />
            </span>
            <p className="mt-4 font-display text-3xl font-semibold text-night">{s.value}</p>
            <p className="text-sm text-night/60">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <QuickAction href="/admin/drones" title="Add a drone" text="Add devices and edit plain-language specs." />
        <QuickAction href="/admin/footage" title="Upload footage" text="Add drone shots and feature them on the homepage." />
        <QuickAction href="/admin/settings" title="Update links" text="Change social profiles and contact details." />
        <QuickAction href="/admin/enquiries" title="View enquiries" text="Read and manage customer messages." />
      </div>
    </div>
  );
}

function QuickAction({ href, title, text }: { href: string; title: string; text: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-2xl border border-night/10 bg-white p-5 transition hover:border-ocean/40"
    >
      <span>
        <span className="block font-semibold text-night">{title}</span>
        <span className="text-sm text-night/60">{text}</span>
      </span>
      <Icon name="arrow-right" size={20} className="text-ocean" />
    </Link>
  );
}
