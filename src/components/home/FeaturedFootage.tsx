import { Section, SectionHeading, Button } from "@/components/ui/Section";
import { FootageGallery } from "@/components/footage/FootageGallery";
import { getFeaturedFootage } from "@/lib/db";

export async function FeaturedFootage() {
  const featured = await getFeaturedFootage();
  return (
    <Section className="cv pb-20 [--cv-d:960px] [--cv-m:1620px] sm:pb-28">
      <SectionHeading
        title="Drone photos we took in Sri Lanka"
        subtitle="No stock images. Our team took every photo below with our own drones."
      />
      <div className="mt-12">
        <FootageGallery items={featured} feature />
      </div>
      <div className="mt-10">
        <Button href="/portfolio" variant="ghost" icon>
          See all our drone photos
        </Button>
      </div>
    </Section>
  );
}
