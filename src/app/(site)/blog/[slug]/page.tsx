import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Faq } from "@/components/ui/Faq";
import { EnquiryCta, WhatsAppLink } from "@/components/booking/EnquiryCta";
import { Toc } from "@/components/guides/GuideParts";
import { Inline } from "@/components/blog/Inline";
import { PostBody } from "@/components/blog/PostBody";
import { PostRow } from "@/components/blog/PostRow";
import {
  BLOG_PATH,
  contents,
  formatDate,
  getPhoto,
  getPost,
  getRelated,
  postPath,
  posts,
  readingMinutes,
  wordCount,
} from "@/lib/blog";
import { photoAlt } from "@/lib/alt";
import { articleJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const photo = getPhoto(post.cover);
  const base = pageMetadata({
    title: post.seoTitle,
    description: post.description,
    path: postPath(post.slug),
    type: "article",
    image: photo?.poster,
  });
  return {
    ...base,
    keywords: post.keywords,
    openGraph: { ...base.openGraph, type: "article", publishedTime: post.published, modifiedTime: post.updated },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const photo = getPhoto(post.cover);
  const related = getRelated(post);
  const toc = contents(post);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: post.title,
          description: post.description,
          path: postPath(post.slug),
          datePublished: post.published,
          dateModified: post.updated,
          type: "BlogPosting",
          image: photo?.poster,
          keywords: post.keywords,
          wordCount: wordCount(post),
        })}
      />
      <PageHero
        crumbs={[
          { name: "Blog", path: BLOG_PATH },
          { name: post.seoTitle, path: postPath(post.slug) },
        ]}
        title={post.title}
        intro={<p>{post.excerpt}</p>}
      >
        <p className="text-sm text-white/70">
          By the Drone Videography LK team. Published <time dateTime={post.published}>{formatDate(post.published)}</time>
          {post.updated !== post.published && (
            <>
              , updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
            </>
          )}
          . {readingMinutes(post)} min read.
        </p>
      </PageHero>

      <Section className="py-12 sm:py-16">
        {/* minmax(0, ...) lets wide tables scroll inside the column instead of stretching the page. */}
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,42rem)_1fr] lg:gap-16">
          <article className="min-w-0">
            {/* On a phone the contents list sits above the text. On wide screens it is the sticky sidebar. */}
            <details className="group mb-8 rounded-2xl border border-night/15 bg-white lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-night [&::-webkit-details-marker]:hidden">
                On this page
                <span
                  aria-hidden="true"
                  className="text-2xl font-light leading-none text-ocean transition-transform duration-200 ease-out-strong group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <ol className="space-y-2.5 px-5 pb-5 text-base">
                {toc.map((it) => (
                  <li key={it.id}>
                    <a href={`#${it.id}`} className="tap text-night/80 hover:text-ocean">
                      {it.title}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            {photo && (
              <figure>
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-night/5">
                  <Image
                    src={photo.poster}
                    alt={photoAlt(photo.title, photo.location)}
                    fill
                    loading="eager"
                    fetchPriority="high"
                    quality={60}
                    sizes="(max-width: 1024px) 92vw, 672px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2.5 text-sm text-night/70">
                  Photo: {photo.title}, taken by our team with our own drone.
                </figcaption>
              </figure>
            )}

            <div className="mt-9 space-y-5 text-xl leading-relaxed text-night">
              {post.intro.map((text) => (
                <p key={text}>
                  <Inline text={text} />
                </p>
              ))}
            </div>

            <div className="mt-12">
              <PostBody blocks={post.blocks} />
            </div>

            {post.faqs.length > 0 && (
              <section id="questions" className="mt-16 scroll-mt-28">
                <h2 className="font-display text-3xl font-medium text-night sm:text-[2rem]">Questions people ask</h2>
                <div className="mt-6">
                  <Faq items={post.faqs.map((f) => ({ q: f.q, a: <p>{f.a}</p> }))} />
                </div>
              </section>
            )}
          </article>

          <aside className="lg:pt-1">
            <div className="space-y-6 lg:sticky lg:top-28">
              <Toc items={toc} />
              <div className="rounded-3xl bg-night p-6 text-white">
                <p className="font-display text-xl font-medium">Planning a shoot?</p>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Send us the date and the place. We check the approvals and send you a plan and a price.
                </p>
                <div className="mt-5">
                  <WhatsAppLink message={post.ctaMessage} className="btn btn-primary btn-sm">
                    Message us
                  </WhatsAppLink>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <Section className="pb-16 sm:pb-20">
          <h2 className="font-display text-2xl font-medium text-night sm:text-3xl">Keep reading</h2>
          <ul className="mt-6 border-t border-night/20">
            {related.map((p) => (
              <PostRow key={p.slug} post={p} />
            ))}
          </ul>
        </Section>
      )}

      <EnquiryCta message={post.ctaMessage} />
    </>
  );
}
