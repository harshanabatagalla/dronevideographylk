import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { WhatWeFilm } from "@/components/home/WhatWeFilm";
import { FleetTeaser } from "@/components/home/FleetTeaser";
import { FlightOverIsland } from "@/components/experience/FlightOverIsland";
import { FeaturedFootage } from "@/components/home/FeaturedFootage";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { HomeFaq } from "@/components/home/HomeFaq";
import { FinalCTA } from "@/components/home/FinalCTA";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Drone Videography in Sri Lanka | ${site.brand}`,
  description: site.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhatWeFilm />
      <FeaturedFootage />
      <FleetTeaser />
      <FlightOverIsland />
      <HowItWorks />
      <Testimonials />
      <HomeFaq />
      <FinalCTA />
    </>
  );
}
