import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { n: "01", title: "Pick a package", text: "Choose a half day, full day or event package. Or ask us to plan one for you." },
  { n: "02", title: "Share your plan", text: "Send us your dates and places on WhatsApp. We take care of permits and planning." },
  { n: "03", title: "Get your film", text: "We film and edit your video. You also get short clips for social media." },
];

export function HowItWorks() {
  return (
    <Section className="py-20 sm:py-24">
      <SectionHeading
        eyebrow="How it works"
        title="Your drone video in 3 steps"
        subtitle="You can book everything on WhatsApp. No long emails."
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
