import Image from "next/image";
import Link from "next/link";
import { formatDate, getPhoto, postPath, readingMinutes, type BlogPost } from "@/lib/blog";

/** Category, date and reading time as one plain sentence fragment. */
export function PostMeta({ post, className = "" }: { post: BlogPost; className?: string }) {
  return (
    <p className={`text-sm text-night/70 ${className}`}>
      {post.category},{" "}
      <time dateTime={post.published} className="whitespace-nowrap">
        {formatDate(post.published)}
      </time>
      , <span className="whitespace-nowrap">{readingMinutes(post)} min read</span>
    </p>
  );
}

/**
 * One post as a ruled row: a small photo, the title, the first lines and the meta line.
 * Used on the blog list, under every post and on the home page. Put rows inside a list
 * that has a top border, and each row adds its own bottom border.
 */
export function PostRow({ post, sizes = "(max-width: 640px) 120px, 224px" }: { post: BlogPost; sizes?: string }) {
  const photo = getPhoto(post.cover);
  return (
    <li className="border-b border-night/15">
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
          <PostMeta post={post} />
          <h3 className="mt-1.5 font-display text-xl font-medium leading-snug text-night transition-colors duration-150 group-hover:text-ocean sm:text-2xl">
            {post.title}
          </h3>
          <p className="mt-2 hidden max-w-2xl leading-relaxed text-night/75 sm:block">{post.excerpt}</p>
        </div>
      </Link>
    </li>
  );
}
