import { Section, SectionHeading, Button } from "@/components/ui/Section";
import { FootageGallery } from "@/components/footage/FootageGallery";
import { getFeaturedFootage } from "@/lib/db";

export async function FeaturedFootage() {
  const featured = await getFeaturedFootage();
  return (
    <Section className="py-20 sm:py-24">
      <SectionHeading
        eyebrow="Our work"
        title="Drone photos we took in Sri Lanka"
        subtitle="No stock images. Our team took every photo below with our own drones."
      />
      <div className="mt-12">
        <FootageGallery items={featured} />
      </div>
      <div className="mt-10 text-center">
        <Button href="/portfolio" variant="ghost" icon>
          See all our drone photos
        </Button>
      </div>
    </Section>
  );
}
