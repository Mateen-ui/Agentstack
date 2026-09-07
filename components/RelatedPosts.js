import Link from "next/link";
import { format } from "date-fns";

export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <aside className="mt-16 pt-10 border-t border-line">
      <h2 className="font-display font-semibold text-xl text-ink mb-5">Related guides</h2>
      <div className="grid gap-5 sm:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block group border border-line rounded-lg p-4 hover:border-accent transition-colors"
          >
            <div className="text-xs font-mono text-muted mb-2">
              {format(new Date(post.date), "MMM d, yyyy")}
            </div>
            <h3 className="font-display font-medium text-sm text-ink group-hover:text-accent transition-colors leading-snug">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </aside>
  );
}
