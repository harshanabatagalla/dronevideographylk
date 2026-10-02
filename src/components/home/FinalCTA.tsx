import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { CloudflareEmailOff } from "@/components/ui/CloudflareEmailOff";
import { BookButton } from "@/components/booking/BookingDialog";
import { getSettings } from "@/lib/db";

export async function FinalCTA() {
  const settings = await getSettings();
  return (
    <div className="relative overflow-hidden bg-cinema noise">
      <div className="aurora" />
      <Section className="relative py-24 text-center sm:py-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
          <Icon name="camera" size={14} /> Book a drone shoot
        </span>
        <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-white text-balance sm:text-6xl">
          Need drone footage <span className="text-gradient">in Sri Lanka?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
          Send us your date and location. We check the place and the approvals it needs, then send you a plan
          and a price.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <BookButton
            className="glow-sunset inline-flex items-center gap-2 rounded-full bg-sunset px-8 py-4 text-sm font-semibold text-night transition hover:-translate-y-0.5 hover:bg-amber-400"
          >
            <Icon name="whatsapp" size={18} /> Check availability on WhatsApp
          </BookButton>
          <CloudflareEmailOff>
            <a
              href={`mailto:${settings.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition hover:border-white/50 hover:bg-white/5"
            >
              Email us
            </a>
          </CloudflareEmailOff>
        </div>
      </Section>
    </div>
  );
}
