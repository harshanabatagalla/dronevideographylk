import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { CloudflareEmailOff } from "@/components/ui/CloudflareEmailOff";
import { BookButton } from "@/components/booking/BookingDialog";
import { getSettings } from "@/lib/db";

export async function FinalCTA() {
  const settings = await getSettings();
  return (
    <div className="bg-night">
      <Section className="py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <h2 className="font-display text-4xl font-medium leading-[1.08] text-white text-balance sm:text-6xl">
            Need drone footage in Sri Lanka?
          </h2>
          <div>
            <p className="max-w-md text-lg text-white/75">
              Send us your date and location. We check the place and the approvals it needs, then send you a
              plan and a price.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <BookButton className="btn btn-primary btn-lg">
                <Icon name="whatsapp" size={18} /> Check availability on WhatsApp
              </BookButton>
              <CloudflareEmailOff>
                <a href={`mailto:${settings.email}`} className="btn btn-light btn-lg">
                  Email us
                </a>
              </CloudflareEmailOff>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
