import { Section, SectionHeading } from "@/components/ui/Section";
import { FootageGallery } from "@/components/footage/FootageGallery";
import { getFootage } from "@/lib/db";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Portfolio: Real Drone Photos from Sri Lanka",
  description:
    "See real drone photos taken by our team across Sri Lanka, including Sigiriya, Kandy, Ella, Meemure and the Knuckles range.",
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
            subtitle="Every photo was taken by our team with our own drones. Tap any photo to see it full size."
          />
        </Section>
      </div>
      <Section className="py-16">
        <FootageGallery items={footage} filterable />
      </Section>
    </>
  );
}
