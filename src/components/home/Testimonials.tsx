import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { getTestimonials } from "@/lib/db";

/** Only real client reviews, added from the admin dashboard. Renders nothing until there are some. */
export async function Testimonials() {
  const testimonials = await getTestimonials();
  if (testimonials.length === 0) return null;
  return (
    <div className="bg-sand py-20 sm:py-24">
      <Section>
        <SectionHeading title="What our clients say" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 80} variant="scale">
              <figure className="flex h-full flex-col rounded-2xl border border-night/10 bg-white p-7">
                <div className="flex gap-0.5 text-sunset">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Icon key={idx} name="star" size={18} />
                  ))}
                </div>
                <blockquote className="relative mt-4 flex-1 text-night/75">“{t.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-night/10 pt-4">
                  <span className="text-2xl" aria-hidden>{t.countryFlag}</span>
                  <span>
                    <span className="block font-semibold text-night">{t.name}</span>
                    <span className="text-xs text-night/65">{t.country}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
