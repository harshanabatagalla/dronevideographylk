import { Section, SectionHeading, Button } from "@/components/ui/Section";
import { FootageGallery } from "@/components/footage/FootageGallery";
import { getFeaturedFootage } from "@/lib/db";

export async function FeaturedFootage() {
  const featured = await getFeaturedFootage();
  return (
    <Section className="py-20 sm:py-24">
      <SectionHeading
        eyebrow="Real footage"
        title="Shots we've actually captured"
        subtitle="No stock clips — every frame below was filmed by our team across the island."
      />
      <div className="mt-12">
        <FootageGallery items={featured} />
      </div>
      <div className="mt-10 text-center">
        <Button href="/portfolio" variant="ghost" icon>
          See the full portfolio
        </Button>
      </div>
    </Section>
  );
}
