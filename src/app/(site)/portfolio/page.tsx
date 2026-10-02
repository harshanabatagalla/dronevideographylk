import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { FootageGallery } from "@/components/footage/FootageGallery";
import { getFootage } from "@/lib/db";
import { servicePath } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Drone Photos of Sri Lanka: Our Portfolio",
  description:
    "Real drone photos taken by our own team across Sri Lanka: Sigiriya, Kandy, the Knuckles, Ella, the waterfalls and the coast. No stock images.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const footage = await getFootage();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Portfolio", path: "/portfolio" }]}
        eyebrow="Portfolio"
        title="Our drone photos from Sri Lanka"
        intro={
          <p>
            Every photo here was taken by our team with our own drones. We checked the location of each one by
            GPS. Tap any photo to see it full size.
          </p>
        }
      />
      <Section className="py-16">
        <FootageGallery items={footage} filterable eagerCount={3} />
        <p className="mx-auto mt-12 max-w-2xl text-center text-night/70">
          Want photos like these of your trip, hotel or property?{" "}
          <Link href={servicePath("drone-photography")} className="font-semibold text-ocean hover:underline">
            See our drone photography service
          </Link>{" "}
          or{" "}
          <Link href="/locations" className="font-semibold text-ocean hover:underline">
            the places we film
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
