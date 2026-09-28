import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BOOKING_STEPS } from "@/lib/services";

export function HowItWorks() {
  return (
    <Section className="py-20 sm:py-24">
      <SectionHeading
        eyebrow="How it works"
        title="How booking works"
        subtitle="You can book everything on WhatsApp, even before you arrive in Sri Lanka."
      />
      <div className="relative mt-14">
      <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-night/15 to-transparent lg:block" />
      <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {BOOKING_STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 90} variant="up" as="li">
            <div className="hover-lift relative h-full rounded-2xl border border-night/10 bg-white p-7 hover:border-sunset/40 hover:shadow-xl hover:shadow-night/5">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sunset to-coral font-display text-xl font-bold text-night shadow-lg shadow-amber-500/20">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-night">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-night/65">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
      </div>
    </Section>
  );
}
