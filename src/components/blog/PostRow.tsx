import Image from "next/image";
import Link from "next/link";
import { getPhoto, postPath, readingMinutes, type BlogPost } from "@/lib/blog";

/**
 * Category and reading time. Every guide was published the same day, so a date on each row
 * would be noise; the date lives on the post page and in its schema. Inside a topic section
 * the category repeats the heading, so lists there pass showCategory={false}.
 */
export function PostMeta({
  post,
  showCategory = true,
  className = "",
}: {
  post: BlogPost;
  showCategory?: boolean;
  className?: string;
}) {
  return (
    <p className={`text-sm text-night/70 ${className}`}>
      {showCategory && <>{post.category}, </>}
      <span className="whitespace-nowrap">{readingMinutes(post)} min read</span>
    </p>
  );
}

/**
 * One post as a ruled row: a small photo, the title, the first lines and the meta line.
 * Used on the blog list, under every post and on the home page. Put rows inside a list
 * that has a top border, and each row adds its own bottom border.
 */
export function PostRow({
  post,
  showCategory = true,
  sizes = "(max-width: 640px) 120px, 224px",
}: {
  post: BlogPost;
  showCategory?: boolean;
  sizes?: string;
}) {
  const photo = getPhoto(post.cover);
  return (
    // Long lists (31 guides on the blog page) are skipped until near the screen.
    <li className="border-b border-night/15 [contain-intrinsic-block-size:auto_170px] [content-visibility:auto]">
      <Link
        href={postPath(post.slug)}
        className="group grid grid-cols-[7.5rem_1fr] items-start gap-4 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8 sm:py-7"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-night/5 sm:aspect-video">
          {photo && (
            <Image
              src={photo.poster}
              alt=""
              fill
              quality={60}
              sizes={sizes}
              className="object-cover transition-transform duration-500 ease-out-strong group-hover:scale-[1.04]"
            />
          )}
        </div>
        <div className="min-w-0">
          <PostMeta post={post} showCategory={showCategory} />
          <h3 className="mt-1.5 font-display text-xl font-medium leading-snug text-night transition-colors duration-150 group-hover:text-ocean sm:text-2xl">
            {post.title}
          </h3>
          <p className="mt-2 hidden max-w-2xl leading-relaxed text-night/75 sm:block">{post.excerpt}</p>
        </div>
      </Link>
    </li>
  );
}
