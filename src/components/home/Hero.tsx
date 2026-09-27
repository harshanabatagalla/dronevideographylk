import { Button } from "@/components/ui/Section";
import { HeroVideo } from "./HeroVideo";
import { Icon } from "@/components/ui/Icon";
import { HeroHUD } from "@/components/experience/HeroHUD";
import { BookButton } from "@/components/booking/BookingDialog";
import { getSettings } from "@/lib/db";

const TICKER = [
  "Sigiriya",
  "Ella",
  "Mirissa",
  "Galle Fort",
  "Nuwara Eliya",
  "Kandy",
  "Yala",
  "Arugam Bay",
  "Nine Arch Bridge",
];

/**
 * Full-bleed cinematic hero. A drone-footage background video (managed from the
 * admin dashboard) plays behind the content, with a poster image shown instantly
 * for a fast, latency-free first paint. Mobile-first: type and spacing scale up.
 */
export async function Hero() {
  const settings = await getSettings();
  const { heroVideo, heroPoster } = settings.media;
  const videoType = heroVideo.endsWith(".webm") ? "video/webm" : "video/mp4";
  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-night">
      <HeroVideo src={heroVideo} type={videoType} poster={heroPoster} />
      <div className="absolute inset-0 bg-gradient-to-b from-night/85 via-night/55 to-night" />
      <div className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/25 to-transparent" />
      <div className="aurora opacity-40" />
      <div className="noise absolute inset-0" />
      <div className="scanlines" />
      <HeroHUD />

      {/* Headline + CTAs — vertically centered, scales on every screen, never clipped */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="mx-auto w-full max-w-6xl px-5 pb-4 pt-24 sm:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 tape text-white backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sunset opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sunset" />
              </span>
              Now booking across Sri Lanka
            </span>

            <h1 className="mt-5 font-display font-bold uppercase text-white kinetic-line">
              <span className="block text-outline-sunset text-[2.75rem] leading-[0.9] sm:text-7xl lg:text-8xl">Fly</span>
              <span className="block text-gradient text-[2.75rem] leading-[0.9] sm:text-7xl lg:text-8xl">Sri Lanka</span>
              <span className="block text-2xl text-white/90 sm:text-5xl lg:text-6xl">from above.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
              Drone videos of your trip, wedding or event in Sri Lanka. Filmed in 4K
              and 6K by licensed and insured pilots.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <BookButton
                className="glow-sunset inline-flex items-center justify-center gap-2 rounded-full bg-sunset px-7 py-3.5 text-sm font-semibold text-night transition hover:-translate-y-0.5 hover:bg-amber-400"
              >
                <Icon name="whatsapp" size={18} /> Book a drone video
              </BookButton>
              <Button href="/portfolio" variant="light" icon>
                See our videos
              </Button>
            </div>
            <dl className="mt-7 grid max-w-md grid-cols-3 gap-4 text-white sm:gap-6">
              {[
                { n: "4K / 6K", l: "Video quality" },
                { n: "20+", l: "Locations" },
                { n: "100%", l: "Licensed & insured" },
              ].map((s) => (
                <div key={s.l} className="border-l border-white/15 pl-3 sm:pl-4">
                  <dt className="font-display text-xl font-semibold text-sunset sm:text-2xl">{s.n}</dt>
                  <dd className="text-[0.7rem] text-white/70 sm:text-xs">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Scroll-to-takeoff cue — in flow, above the ticker (never overlaps content) */}
      <div className="pointer-events-none relative z-10 flex flex-col items-center gap-1 pb-3">
        <span className="tape text-white/75">Scroll down</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4 animate-bounce text-sunset"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </div>

      {/* Looping location ticker */}
      <div className="relative z-10 border-t border-white/10 bg-night/50 py-3 backdrop-blur-sm">
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="marquee gap-10 pr-10">
            {[...TICKER, ...TICKER].map((place, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center gap-2 text-sm font-medium uppercase tracking-widest text-white/60"
              >
                <Icon name="map-pin" size={14} /> {place}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
