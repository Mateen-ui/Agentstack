import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";
import { DEFAULT_AUTHOR } from "./site";

const postsDirectory = path.join(process.cwd(), "posts");

function withDefaults(slug, data, stats) {
  return {
    slug,
    readingTime: Math.ceil(stats.minutes),
    ...data,
    // Fall back to the post date if no explicit "last verified/updated"
    // date is set in frontmatter -- every page should have both per the
    // technical checklist.
    updated: data.updated || data.date,
    author: data.author || DEFAULT_AUTHOR.name,
  };
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const stats = readingTime(matterResult.content);

    return withDefaults(slug, matterResult.data, stats);
  });

  return allPostsData.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  return fileNames.map((fileName) => ({
    params: { slug: fileName.replace(/\.md$/, "") },
  }));
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const stats = readingTime(matterResult.content);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    contentHtml,
    ...withDefaults(slug, matterResult.data, stats),
  };
}

// Simple related-posts lookup: rank other posts by number of shared
// tags, so every article page links to a few genuinely relevant
// others instead of a random "recent posts" list. This is the
// internal-linking layer the roadmap's Content Map depends on until
// dedicated hub pages exist for each cluster.
export function getRelatedPosts(currentSlug, currentTags = [], limit = 3) {
  const all = getSortedPostsData().filter((p) => p.slug !== currentSlug);
  const tagSet = new Set(currentTags || []);

  const scored = all.map((p) => {
    const shared = (p.tags || []).filter((t) => tagSet.has(t)).length;
    return { post: p, shared };
  });

  scored.sort((a, b) => {
    if (b.shared !== a.shared) return b.shared - a.shared;
    return new Date(b.post.date) - new Date(a.post.date);
  });

  return scored.slice(0, limit).map((s) => s.post);
}
