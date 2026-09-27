import { getPhotoCredit } from "@/lib/photo-credits";

/**
 * Credit line under a drone photo. Creative Commons attribution licences
 * require the author and licence to be shown next to the photo.
 */
export function PhotoCredit({ slug, className = "" }: { slug: string; className?: string }) {
  const c = getPhotoCredit(slug);
  if (!c) return null;
  return (
    <p className={`text-xs text-night/45 ${className}`}>
      {c.note && <span className="mr-1 text-night/60">{c.note}</span>}
      Photo:{" "}
      <a href={c.source} target="_blank" rel="noopener noreferrer" className="underline hover:text-night/70">
        {c.author}
      </a>{" "}
      <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-night/70">
        {c.license}
      </a>
    </p>
  );
}
