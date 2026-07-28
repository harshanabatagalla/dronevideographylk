import { Section, SectionHeading } from "@/components/ui/Section";
import { FootageGallery } from "@/components/footage/FootageGallery";
import { getFootage } from "@/lib/db";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Portfolio — Real Drone Footage from Sri Lanka",
  description:
    "Watch real aerial drone footage filmed across Sri Lanka — Sigiriya, Ella, Mirissa, tea country and more. Travel films, weddings and events in 4K.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const footage = await getFootage();
  return (
    <>
      <div className="bg-skyline pb-16 pt-32">
        <Section>
          <SectionHeading
            light
            eyebrow="Portfolio"
            title="Real footage, real locations"
            subtitle="Filter by the kind of film you're dreaming of. Tap any clip to watch."
          />
        </Section>
      </div>
      <Section className="py-16">
        <FootageGallery items={footage} filterable />
      </Section>
    </>
  );
}
