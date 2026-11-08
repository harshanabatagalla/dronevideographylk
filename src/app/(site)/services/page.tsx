import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { EnquiryCta, WhatsAppLink } from "@/components/booking/EnquiryCta";
import { BookingSteps } from "@/components/services/ServiceBlocks";
import { PRICE_FACTORS, services, servicePath, SERVICES_PATH } from "@/lib/services";
import { PERMIT_PATH, RULES_PATH } from "@/lib/drone-rules";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Drone Filming Services in Sri Lanka",
  description:
    "Drone videography and photography in Sri Lanka for trips, weddings, hotels and property. See what each shoot includes, what changes the price and how to book.",
  path: SERVICES_PATH,
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Drone Services", path: SERVICES_PATH }]}
        title="Drone filming services in Sri Lanka"
        intro={
          <p>
            We film and photograph from the air for travellers, couples, hotels and property owners across Sri
            Lanka. Choose a service below, or send us your plan and we will suggest the right shoot.
          </p>
        }
      >
        <WhatsAppLink message="Hi! I'd like to ask about a drone shoot in Sri Lanka. My plan is: ">
          Ask about your shoot
        </WhatsAppLink>
      </PageHero>

      <Section className="py-16">
        <ul className="border-t border-night/20">
          {services.map((s) => (
            <li key={s.slug} className="border-b border-night/15">
              <Link
                href={servicePath(s.slug)}
                className="group grid gap-x-10 gap-y-2 py-7 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_11rem] md:items-baseline"
              >
                <h2 className="font-display text-2xl font-medium text-night transition-colors duration-150 group-hover:text-ocean">
                  {s.h1}
                </h2>
                <p className="max-w-xl leading-relaxed text-night/70">{s.cardText}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-ocean md:justify-end">
                  {s.label}
                  <span className="transition-transform duration-200 ease-out-strong group-hover:translate-x-1">
                    <Icon name="arrow-right" size={14} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="pb-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-night/10 bg-white p-7">
            <h2 className="font-display text-2xl font-medium text-night">How much does drone filming cost?</h2>
            <p className="mt-3 leading-relaxed text-night/70">
              There is no single price, because every shoot is different. These things change the price:
            </p>
            <ul className="mt-4 space-y-2.5">
              {PRICE_FACTORS.map((f) => (
                <li key={f} className="flex items-start gap-3 text-night/75">
                  <span className="mt-1 shrink-0 text-teal">
                    <Icon name="check" size={12} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-4 leading-relaxed text-night/70">
              Send us your plan and we will send you a price before you book. Our guide to{" "}
              <Link href="/blog/drone-videography-cost-in-sri-lanka" className="font-semibold text-ocean hover:underline">
                drone videography cost in Sri Lanka
              </Link>{" "}
              explains each factor.
            </p>
          </section>

          <section className="rounded-3xl border border-night/10 bg-sand/60 p-7">
            <h2 className="font-display text-2xl font-medium text-night">Drone permits for your shoot</h2>
            <p className="mt-3 leading-relaxed text-night/70">
              Every outdoor drone flight in Sri Lanka needs approval from the Civil Aviation Authority of Sri
              Lanka (CAASL), and some places need more. When we fly for you, we handle the approval as the operator.
              For hotels, venues and private land we also need the owner&apos;s permission, usually as a short
              letter.
            </p>
            <p className="mt-3 leading-relaxed text-night/70">
              Protected places such as Sigiriya, national parks and restricted areas need extra approvals, and
              some cannot be flown at all.
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm font-semibold">
              <Link href={RULES_PATH} className="inline-flex items-center gap-1 text-ocean hover:underline">
                Sri Lanka drone rules for tourists <Icon name="arrow-right" size={14} />
              </Link>
              <Link href={PERMIT_PATH} className="inline-flex items-center gap-1 text-ocean hover:underline">
                How to get a drone permit in Sri Lanka <Icon name="arrow-right" size={14} />
              </Link>
            </div>
          </section>
        </div>
      </Section>

      <div className="bg-sand py-16">
        <Section>
          <h2 className="font-display text-2xl font-medium text-night sm:text-3xl">How booking works</h2>
          <div className="mt-8">
            <BookingSteps />
          </div>
        </Section>
      </div>

      <EnquiryCta message="Hi! I'd like to book a drone shoot in Sri Lanka. My date and location are: " />
    </>
  );
}
