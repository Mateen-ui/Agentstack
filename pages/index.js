import Link from "next/link";
import { format } from "date-fns";
import Layout from "../components/Layout";
import { getSortedPostsData } from "../lib/posts";
import FieldNotesCubes from "../components/FieldNotesCubes";

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <section className="mb-16">
        <h1 className="font-display font-semibold text-[2.1rem] sm:text-[2.5rem] leading-[1.15] text-ink mb-4 max-w-xl">
          Everything you need to actually run AI coding agents.
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-lg">
          No hype, no affiliate rankings — just field-tested guides on Claude Code, Cursor, Windsurf, and the rest of the agentic coding stack, from setup to security.
        </p>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-line">
          <h2 className="font-display font-semibold text-sm tracking-wide text-muted">
            Latest guides
          </h2>
          <span className="font-mono text-xs text-muted">{allPostsData.length} posts</span>
        </div>

        <ul>
          {allPostsData.map(({ slug, title, date, excerpt, readingTime }) => (
            <li key={slug} className="border-b border-line last:border-b-0">
              <Link href={`/posts/${slug}`} className="group grid grid-cols-[5.5rem_1fr] sm:grid-cols-[7rem_1fr] gap-4 py-6 items-baseline">
                <span className="font-mono text-xs text-muted pt-1">
                  {format(new Date(date), "MMM d, yyyy")}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-lg text-ink group-hover:text-accent transition-colors">
                    {title}
                  </h3>
                  <p className="text-muted mt-1.5 leading-relaxed">{excerpt}</p>
                  <span className="inline-block mt-2 text-xs font-mono text-muted">
                    {readingTime} min read
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
            <FieldNotesCubes />
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
