import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BOOKING_STEPS } from "@/lib/services";

export function HowItWorks() {
  return (
    <Section className="py-20 sm:py-24">
      <SectionHeading
        title="How booking works"
        subtitle="You can book everything on WhatsApp, even before you arrive in Sri Lanka."
      />
      <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {BOOKING_STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 90} variant="up" as="li">
            <div className="h-full rounded-2xl border border-night/10 bg-white p-7">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sunset font-display text-lg font-semibold text-night">
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-night">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-night/65">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
