import { format } from "date-fns";
import Link from "next/link";
import Layout from "../../components/Layout";
import { getAllPostSlugs, getPostData } from "../../lib/posts";

export default function Post({ postData }) {
  return (
    <Layout title={postData.title} description={postData.excerpt}>
      <Link href="/" className="text-sm font-mono text-muted hover:text-accent transition-colors">
        ← all guides
      </Link>

      <article className="mt-6">
        {postData.tags && postData.tags.length > 0 && (
          <div className="flex gap-2 mb-4">
            {postData.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2 py-0.5 rounded-full border border-line text-accent2"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h1 className="font-display font-semibold text-3xl sm:text-[2.3rem] leading-tight text-ink mb-3">
          {postData.title}
        </h1>
        <div className="text-sm text-muted mb-10 font-mono">
          {format(new Date(postData.date), "MMMM d, yyyy")} · {postData.readingTime} min read
        </div>
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug);
  return {
    props: {
      postData,
    },
  };
}
