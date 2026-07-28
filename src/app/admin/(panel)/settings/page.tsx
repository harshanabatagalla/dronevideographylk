import { getSettings } from "@/lib/db";
import { saveSettingsAction } from "@/app/admin/actions";
import { AdminHeading, Card, Field, SubmitButton } from "@/components/admin/form";
import { MediaUploader } from "@/components/admin/MediaUploader";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const s = await getSettings();

  return (
    <div>
      <AdminHeading title="Settings" description="Update contact details and social media links shown across the site." />

      {saved && (
        <div className="mb-6 rounded-2xl border border-teal/30 bg-teal/5 px-4 py-3 text-sm text-teal">
          Settings saved.
        </div>
      )}

      <div className="mb-6 grid max-w-3xl gap-4">
        <Card>
          <h2 className="mb-1 font-display text-xl font-semibold text-night">Homepage hero media</h2>
          <p className="mb-4 text-sm text-night/60">
            Upload the background video and its poster image for the homepage hero.
            The poster shows instantly while the video streams in, so the page
            loads with no delay.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <MediaUploader
              label="Hero background video"
              name="heroVideo"
              kind="video"
              accept="video/mp4,video/webm,video/quicktime"
              currentPath={s.media.heroVideo}
              hint="MP4 or WebM. Keep it short and compressed for fast loading."
            />
            <MediaUploader
              label="Hero poster image"
              name="heroPoster"
              kind="image"
              accept="image/*"
              currentPath={s.media.heroPoster}
              hint="Shown instantly before the video plays."
            />
          </div>
        </Card>
      </div>

      <form action={saveSettingsAction} className="grid max-w-3xl gap-6">
        <Card>
          <h2 className="mb-4 font-display text-xl font-semibold text-night">Contact</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="WhatsApp number" name="whatsapp" defaultValue={s.whatsapp} hint="Include country code, e.g. +94771234567" />
            <Field label="Phone" name="phone" defaultValue={s.phone} />
            <Field label="Email" name="email" type="email" defaultValue={s.email} />
            <Field label="Address" name="address" defaultValue={s.address} />
          </div>
          <div className="mt-4">
            <Field label="Default WhatsApp message" name="whatsappMessage" defaultValue={s.whatsappMessage} />
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 font-display text-xl font-semibold text-night">Social media links</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Instagram" name="instagram" defaultValue={s.socials.instagram} placeholder="https://instagram.com/…" />
            <Field label="YouTube" name="youtube" defaultValue={s.socials.youtube} placeholder="https://youtube.com/@…" />
            <Field label="Facebook" name="facebook" defaultValue={s.socials.facebook} placeholder="https://facebook.com/…" />
            <Field label="TikTok" name="tiktok" defaultValue={s.socials.tiktok} placeholder="https://tiktok.com/@…" />
          </div>
        </Card>

        <div>
          <SubmitButton>Save settings</SubmitButton>
        </div>
      </form>
    </div>
  );
}
