import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { WhatWeFilm } from "@/components/home/WhatWeFilm";
import { FleetTeaser } from "@/components/home/FleetTeaser";
import { FlightOverIsland } from "@/components/experience/FlightOverIsland";
import { FeaturedFootage } from "@/components/home/FeaturedFootage";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhatWeFilm />
      <FleetTeaser />
      <FeaturedFootage />
      <FlightOverIsland />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

