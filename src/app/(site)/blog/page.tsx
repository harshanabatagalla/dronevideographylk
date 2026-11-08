import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { EnquiryCta } from "@/components/booking/EnquiryCta";
import { PostMeta, PostRow } from "@/components/blog/PostRow";
import { BLOG_PATH, CATEGORIES, getPhoto, postPath, posts } from "@/lib/blog";
import { photoAlt } from "@/lib/alt";
import { blogJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

const TITLE = "Drone Videography Blog: Sri Lanka Guides";
const DESCRIPTION =
  "Plain guides to drone videography in Sri Lanka: places to film, the best time of year, the drone rules and permits, what a shoot costs and which drone to use.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: BLOG_PATH });

export default function BlogPage() {
  const [first] = posts;
  const photo = getPhoto(first.cover);
  const topics = CATEGORIES.map((c) => ({
    ...c,
    // The featured guide has its own block at the top, so it is not listed twice.
    items: posts.filter((p) => p.category === c.id && p.slug !== first.slug),
  })).filter((c) => c.items.length > 0);

  return (
    <>
      <JsonLd
        data={blogJsonLd({
          name: "Drone Videography Blog for Sri Lanka",
          description: DESCRIPTION,
          path: BLOG_PATH,
          posts: posts.map((p) => ({ headline: p.title, path: postPath(p.slug), datePublished: p.published })),
        })}
      />
      <PageHero
        crumbs={[{ name: "Blog", path: BLOG_PATH }]}
        title="Drone videography blog for Sri Lanka"
        intro={
          <p>
            Plain guides to filming with a drone in Sri Lanka: where to go, when to go, what the rules say, what a
            shoot costs and which drone to use. Written for travellers, couples and hotel owners by the team that
            does the flying.
          </p>
        }
      >
        <p className="text-sm text-white/70">{posts.length} guides in five topics.</p>
      </PageHero>

      <Section className="py-14 sm:py-16">
        <Link href={postPath(first.slug)} className="group grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-12">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-night/5">
            {photo && (
              <Image
                src={photo.poster}
                alt={photoAlt(photo.title, photo.location)}
                fill
                loading="eager"
                fetchPriority="high"
                quality={60}
                sizes="(max-width: 1024px) 92vw, 640px"
                className="object-cover transition-transform duration-500 ease-out-strong group-hover:scale-[1.03]"
              />
            )}
          </div>
          <div>
            <PostMeta post={first} />
            <h2 className="mt-2 font-display text-3xl font-medium leading-tight text-night transition-colors duration-150 group-hover:text-ocean sm:text-4xl">
              {first.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-night/75">{first.excerpt}</p>
            <p className="mt-5 font-semibold text-ocean">Start with this guide</p>
          </div>
        </Link>

        <nav aria-label="Topics" className="mt-14 flex flex-wrap gap-2">
          {topics.map((t) => (
            <a
              key={t.id}
              href={`#${t.id.toLowerCase()}`}
              className="rounded-md border border-night/20 px-4 py-2 text-sm font-medium text-night/75 transition-colors duration-150 hover:border-ocean hover:text-ocean"
            >
              {t.label} <span className="text-night/70">({t.items.length})</span>
            </a>
          ))}
        </nav>

        {topics.map((t) => (
          <section key={t.id} id={t.id.toLowerCase()} className="mt-14 scroll-mt-28">
            <h2 className="font-display text-2xl font-medium text-night sm:text-3xl">{t.label}</h2>
            <p className="mt-2 max-w-2xl text-night/70">{t.description}</p>
            <ul className="mt-6 border-t border-night/20">
              {t.items.map((p) => (
                <PostRow key={p.slug} post={p} showCategory={false} />
              ))}
            </ul>
          </section>
        ))}
      </Section>

      <EnquiryCta message="Hi! I'd like drone filming in Sri Lanka. My dates and places are: " />
    </>
  );
}
