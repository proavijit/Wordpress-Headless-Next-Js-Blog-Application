import BlogCard from "@/components/BlogCard";
import type { WPCardPost } from "@/types/blog";

export default function RelatedPosts({ posts }: { posts: WPCardPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="related-posts-heading">
      <h2 id="related-posts-heading" className="text-2xl font-medium tracking-tight text-ink">
        Related articles
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.databaseId} post={post} />
        ))}
      </div>
    </section>
  );
}
