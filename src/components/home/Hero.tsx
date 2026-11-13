import { Button } from "@/components/ui/Section";
import { HeroVideo } from "./HeroVideo";
import { HeroPoster } from "./HeroPoster";
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
      {/* The headline text is the LCP element. Lighthouse's mobile model counts every
          request that starts before that paint, so the decorative poster now waits for
          the load event (HeroPoster) instead of competing with the CSS and fonts. */}
      <HeroPoster src={heroPoster} />
      <HeroVideo src={heroVideo} type={videoType} />
      <div className="absolute inset-0 bg-gradient-to-b from-night/85 via-night/55 to-night" />
      <div className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/25 to-transparent" />

      <div className="relative z-10 flex flex-1 items-center">
        <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-[2.6rem] font-medium leading-[1.04] text-white text-balance sm:text-6xl lg:text-7xl">
              Drone videography in Sri Lanka
            </h1>

            <p className="mt-6 max-w-xl text-base text-white/80 sm:text-lg">
              Drone filming and photography for travellers, hotels, weddings and property across Sri Lanka.
              We help with the drone permits. Send us your date and location.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <BookButton className="btn btn-primary btn-lg">
                <Icon name="whatsapp" size={18} /> Check availability
              </BookButton>
              <Button href="/services" variant="light" size="lg" icon>
                Our drone services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
