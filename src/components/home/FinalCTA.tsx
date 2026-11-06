import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { CloudflareEmailOff } from "@/components/ui/CloudflareEmailOff";
import { BookButton } from "@/components/booking/BookingDialog";
import { getSettings } from "@/lib/db";

export async function FinalCTA() {
  const settings = await getSettings();
  return (
    <div className="bg-night">
      <Section className="py-24 text-center sm:py-32">
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.1] text-white text-balance sm:text-6xl">
          Need drone footage in Sri Lanka?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
          Send us your date and location. We check the place and the approvals it needs, then send you a plan
          and a price.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <BookButton
            className="inline-flex items-center gap-2 rounded-full bg-sunset px-8 py-4 text-sm font-semibold text-night transition-colors hover:bg-amber-400"
          >
            <Icon name="whatsapp" size={18} /> Check availability on WhatsApp
          </BookButton>
          <CloudflareEmailOff>
            <a
              href={`mailto:${settings.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Email us
            </a>
          </CloudflareEmailOff>
        </div>
      </Section>
    </div>
  );
}
