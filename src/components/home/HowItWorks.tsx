import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { n: "01", title: "Pick a package", text: "Choose a half-day, full-day or event package — or ask us for a custom itinerary." },
  { n: "02", title: "Share your plan", text: "Tell us your dates, locations and vibe over WhatsApp. We handle permits and logistics." },
  { n: "03", title: "Get your film", text: "We fly, edit and deliver a cinematic film plus social-ready cuts, ready to share." },
];

export function HowItWorks() {
  return (
    <Section className="py-20 sm:py-24">
      <SectionHeading
        eyebrow="How it works"
        title="From idea to cinematic film in 3 steps"
        subtitle="Booked entirely on WhatsApp — no long email chains, no stress on your holiday."
      />
      <div className="relative mt-14 grid gap-6 md:grid-cols-3">
        <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-night/15 to-transparent md:block" />
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 90} variant="up">
            <div className="hover-lift relative h-full rounded-2xl border border-night/10 bg-white p-7 hover:border-sunset/40 hover:shadow-xl hover:shadow-night/5">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sunset to-coral font-display text-xl font-bold text-night shadow-lg shadow-amber-500/20">
                {s.n}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-night">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-night/65">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
