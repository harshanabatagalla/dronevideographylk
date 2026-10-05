import { redirect } from "next/navigation";
import { loginAction } from "@/app/admin/actions";
import { isAuthenticated, usingDefaults } from "@/lib/auth";
import { adminHref } from "@/lib/admin-path";
import { Icon } from "@/components/ui/Icon";

export const metadata = { title: "Admin Login", robots: { index: false } };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  // A real check, not just cookie presence: a stale cookie (for example after the
  // signing secret changes) must not bounce between this page and the dashboard.
  if (await isAuthenticated()) redirect(adminHref());
  const { error, next = adminHref() } = await searchParams;

  return (
    <div className="grid min-h-screen place-items-center bg-skyline px-5">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <div className="flex items-center gap-2 text-white">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-sunset text-night">
            <Icon name="play" size={18} />
          </span>
          <span className="font-display text-lg font-semibold">
            dronevideography<span className="text-sunset">.lk</span>
          </span>
        </div>
        <h1 className="mt-6 font-display text-2xl font-semibold text-white">Admin sign in</h1>
        <p className="mt-1 text-sm text-white/60">Manage drones, footage, enquiries and more.</p>

        <form action={loginAction} className="mt-6 space-y-4">
          <input type="hidden" name="next" value={next} />
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-white/80">Password</span>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-sunset focus:outline-none"
              placeholder="••••••••"
            />
          </label>

          {error && (
            <p className="rounded-lg bg-coral/15 px-4 py-2.5 text-sm text-coral">
              {error === "locked"
                ? "Too many wrong passwords. Please wait 15 minutes and try again."
                : "Incorrect password. Please try again."}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-sunset px-6 py-3 text-sm font-semibold text-night transition hover:bg-amber-400"
          >
            Sign in
          </button>
        </form>

        {usingDefaults() && (
          <p className="mt-5 rounded-lg bg-white/5 px-4 py-3 text-xs text-white/60">
            Dev mode: set <code className="text-sunset">ADMIN_PASSWORD</code> and{" "}
            <code className="text-sunset">AUTH_SECRET</code> in <code>.env.local</code>. Default
            password is <code className="text-sunset">admin</code>.
          </p>
        )}
      </div>
    </div>
  );
}
