import { Section, SectionHeading, Button } from "@/components/ui/Section";
import { PostRow } from "@/components/blog/PostRow";
import { posts } from "@/lib/blog";

/** Three guides on the home page, so readers and search engines find the blog from the top page. */
export function LatestPosts() {
  return (
    <Section className="cv pb-8 pt-8 [--cv-d:815px] [--cv-m:775px] sm:pb-12">
      <SectionHeading
        title="Read before you book"
        subtitle="Plain guides to the places, the weather, the rules and the cost of drone filming in Sri Lanka."
      />
      <ul className="mt-10 border-t border-night/20">
        {posts.slice(0, 3).map((p) => (
          <PostRow key={p.slug} post={p} />
        ))}
      </ul>
      <div className="mt-8">
        <Button href="/blog" variant="ghost" icon>
          See all guides
        </Button>
      </div>
    </Section>
  );
}
