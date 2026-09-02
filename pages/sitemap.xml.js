import { getSortedPostsData } from "../lib/posts";

const SITE_URL = "https://your-domain.com";

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  ${posts
    .map(
      ({ slug, date }) => `
  <url>
    <loc>${SITE_URL}/posts/${slug}</loc>
    <lastmod>${new Date(date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("")}
</urlset>`;
}

// This page is never rendered directly — getServerSideProps
// intercepts the request and returns raw XML instead.
export default function SiteMap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const posts = getSortedPostsData();
  const sitemap = generateSiteMap(posts);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}
