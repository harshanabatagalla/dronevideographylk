import Image from "next/image";
import { Button } from "@/components/ui/Section";
import { HeroVideo } from "./HeroVideo";
import { Icon } from "@/components/ui/Icon";
import { BookButton } from "@/components/booking/BookingDialog";
import { getSettings } from "@/lib/db";

/**
 * Full-bleed hero. A drone-footage background video (managed from the admin
 * dashboard) plays behind the content, with a poster image shown instantly
 * for a fast first paint. Two plain dark gradients keep the text readable.
 */
export async function Hero() {
  const settings = await getSettings();
  const { heroVideo, heroPoster } = settings.media;
  const videoType = heroVideo.endsWith(".webm") ? "video/webm" : "video/mp4";
  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-night">
      {/* Lighthouse measures the headline text as the LCP element on phones and desktop,
          not this darkened poster. A preload in <head> made it compete with the CSS and
          fonts the text needs, so it loads eagerly at low priority: React does not
          preload low priority images, and mobile LCP improved from 3.3 s to 3.0 s.
          It is a 16:9 photo cropped to cover, so in portrait its rendered width follows
          the screen height. 75vh (not the full 178vh) is enough under the dark overlay. */}
      <Image
        src={heroPoster}
        alt=""
        fill
        loading="eager"
        fetchPriority="low"
        quality={60}
        sizes="(orientation: portrait) 75vh, 100vw"
        className="object-cover"
      />
      <HeroVideo src={heroVideo} type={videoType} />
      <div className="absolute inset-0 bg-gradient-to-b from-night/85 via-night/55 to-night" />
      <div className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/25 to-transparent" />

      <div className="relative z-10 flex flex-1 items-center">
        <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-[2.6rem] font-semibold leading-[1.05] text-white text-balance sm:text-6xl lg:text-7xl">
              Drone videography in Sri Lanka
            </h1>

            <p className="mt-6 max-w-xl text-base text-white/80 sm:text-lg">
              Drone filming and photography for travellers, hotels, weddings and property across Sri Lanka.
              We help with the drone permits. Send us your date and location.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <BookButton
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sunset px-7 py-3.5 text-sm font-semibold text-night transition-colors hover:bg-amber-400"
              >
                <Icon name="whatsapp" size={18} /> Check availability
              </BookButton>
              <Button href="/services" variant="light" icon>
                Our drone services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
