import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BOOKING_STEPS } from "@/lib/services";

export function HowItWorks() {
  return (
    <Section className="pb-8 pt-20 sm:pb-12 sm:pt-28">
      <SectionHeading
        title="How booking works"
        subtitle="You can book everything on WhatsApp, even before you arrive in Sri Lanka."
      />
      {/* The steps are a sequence, so they are numbered, but they are not boxed. */}
      <ol className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
        {BOOKING_STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 60} as="li">
            <div className="border-t-2 border-night pt-5">
              <p aria-hidden="true" className="num font-display text-5xl font-medium leading-none text-night">
                {i + 1}
              </p>
              <h3 className="mt-5 text-xl font-semibold text-night">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-night/70">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
