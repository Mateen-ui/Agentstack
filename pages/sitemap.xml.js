import { getSortedPostsData } from "../lib/posts";
import { SITE_URL } from "../lib/site";

const STATIC_PAGES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.5" },
  { path: "/how-we-test", changefreq: "monthly", priority: "0.5" },
  { path: "/editorial-policy", changefreq: "yearly", priority: "0.3" },
];

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${STATIC_PAGES.map(
    (p) => `
  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  ).join("")}
  ${posts
    .map(
      ({ slug, updated }) => `
  <url>
    <loc>${SITE_URL}/posts/${slug}</loc>
    <lastmod>${new Date(updated).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("")}
</urlset>`;
}

// This page is never rendered directly -- getServerSideProps
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
