import Link from "next/link";
import Layout from "../../components/Layout";
import Breadcrumbs from "../../components/Breadcrumbs";
import AuthorByline from "../../components/AuthorByline";
import RelatedPosts from "../../components/RelatedPosts";
import { getAllPostSlugs, getPostData, getRelatedPosts } from "../../lib/posts";
import { SITE_URL, SITE_NAME, DEFAULT_AUTHOR } from "../../lib/site";

export default function Post({ postData, related }) {
  const keywords = postData.seo
    ? [postData.seo.primary_keyword, ...(postData.seo.secondary_keywords || [])]
        .filter(Boolean)
        .join(", ")
    : undefined;

  const canonical = `/posts/${postData.slug}`;
  const pageUrl = `${SITE_URL}${canonical}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: postData.title,
    description: postData.excerpt,
    datePublished: new Date(postData.date).toISOString(),
    dateModified: new Date(postData.updated).toISOString(),
    author: {
      "@type": postData.author === DEFAULT_AUTHOR.name ? "Organization" : "Person",
      name: postData.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Guides", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: postData.title, item: pageUrl },
    ],
  };

  return (
    <Layout
      title={postData.title}
      description={postData.excerpt}
      keywords={keywords}
      canonical={canonical}
      ogType="article"
      jsonLd={[articleJsonLd, breadcrumbJsonLd]}
    >
      <Breadcrumbs items={[{ name: "Guides", href: "/" }, { name: postData.title }]} />
      <article>
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
        <AuthorByline
          author={postData.author}
          date={postData.date}
          updated={postData.updated}
          readingTime={postData.readingTime}
        />
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
      <RelatedPosts posts={related} />
      <div className="mt-10">
        <Link href="/" className="text-sm font-mono text-muted hover:text-accent transition-colors">
          ← all guides
        </Link>
      </div>
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
  const related = getRelatedPosts(postData.slug, postData.tags, 3);
  return {
    props: {
      postData,
      related,
    },
  };
}
