# AgentStack — The AI Coding Agents Blog

A niche tech blog covering AI coding agents (Claude Code, Cursor, Windsurf, Copilot, and the rest of the agentic dev-tool stack) — built with Next.js and Markdown, styled with a custom design system.

## Why this niche

AI coding agents is one of the fastest-growing, highest-demand topics in tech right now: massive search volume, a genuinely underserved audience (most existing content is either thin affiliate listicles or vendor marketing), and real reader value in cutting through the noise. The five launch posts are original, researched guides — not rewrites — covering fundamentals, tool selection, security, workflow, and terminology.

## Brand

- **Name:** AgentStack
- **Logo:** an abstract "agent loop" mark — the plan → act → observe cycle that defines how these tools work, rendered as a looping arrow in indigo (`#4B3FF2`) and teal (`#0E9C8C`)
- **Palette:** cool paper white (`#F5F6FA`), near-black ink (`#14161C`), indigo accent (`#4B3FF2`), teal secondary (`#0E9C8C`) — deliberately not the dark-mode-with-neon-green look most dev-tool sites default to
- **Type:** Space Grotesk for headlines, IBM Plex Sans for body text, IBM Plex Mono for code and metadata

## Getting started

```bash
npm install
npm run dev
```
Visit http://localhost:3000

```bash
npm run build
npm run start
```

## Writing a new post

Add a `.md` file to `posts/` with frontmatter:

```markdown
---
title: "Your Post Title"
date: "2026-09-05"
excerpt: "One or two sentences shown on the homepage list."
tags: ["fundamentals"]
---

Your content in Markdown.
```

The filename becomes the URL: `posts/my-post.md` → `/posts/my-post`.

## What's included

- 5 original, researched launch posts (~700-900 words each):
  1. What Is an AI Coding Agent? — beginner fundamentals
  2. Claude Code vs. Cursor vs. Windsurf vs. Copilot — decision framework, not a ranking
  3. The Security Risks of AI Coding Agents — slopsquatting, prompt injection, context leakage, overprivileged access
  4. Get More Out of Your AI Coding Agent — practical workflow habits
  5. Agentic Coding Terms Glossary — the vocabulary that shows up in every tool's docs
- Custom logo (SVG, no external assets)
- Favicon
- Fully responsive layout

## Growing the content

Good next posts, based on what's trending in the space: a "how to set up Claude Code for a real project" walkthrough, an MCP servers explainer, a background/cloud agents deep-dive, and a running "what changed this month" digest — this space updates fast enough that a monthly changelog post would itself be a strong recurring feature.

## Deploying

Standard Next.js app — deploys free on Vercel (connect your GitHub repo at vercel.com) or Netlify.

## Tech stack

Next.js · Tailwind CSS · gray-matter + remark (Markdown parsing) · reading-time

## SEO technical foundations (P0)

Implemented against the roadmap's Technical Checklist:

- Fixed `public/robots.txt` (was emitting garbled text instead of a `Sitemap:` line).
- Centralized site config in `lib/site.js` — one place to change the domain, site name, and default author.
- Canonical URLs, Open Graph, and Twitter Card tags on every page (`components/Layout.js`; homepage sets its own since it doesn't use `Layout`).
- JSON-LD structured data: `Article` + `BreadcrumbList` on every post, `WebSite` + `Organization` on the homepage.
- Author byline + bio system (`lib/site.js` → `DEFAULT_AUTHOR`, shown via `components/AuthorByline.js`). **Replace the placeholder "AgentStack Editorial Team" with a real named author and factual credentials** once you have one — don't invent one, Google's guidance specifically wants verifiable expertise.
- Explicit `updated` (last-verified) date per post, separate from `date` (published) — falls back to `date` if unset. Only bump `updated` in frontmatter when you've actually re-checked the content.
- Every post now declares `section: "guide" | "field-note"` in frontmatter — this drives which homepage row it appears in, replacing the old hardcoded arrays so new posts show up automatically.
- Internal linking: `Breadcrumbs` component on post pages, plus a `getRelatedPosts()` helper (`lib/posts.js`) that surfaces posts sharing tags at the bottom of each article.
- Trust/E-E-A-T pages: `/how-we-test` (methodology — currently a template, fill in specifics once your benchmark process is running) and `/editorial-policy` (independence, correction handling), linked from every page's footer and from `/about`.
- `sitemap.xml` now uses each post's `updated` date for `<lastmod>` and includes the new trust pages.
- Removed a stray duplicate image (`bg-network (1).jpg`) from `public/`.

### Still open from the roadmap (not code-level, or needs a decision from you)

- **Custom domain**: site is still on `agentstack-vert.vercel.app`. Once you buy/point a domain, update `NEXT_PUBLIC_SITE_URL` (or the fallback in `lib/site.js`) and the hardcoded URL in `public/robots.txt`.
- **Real author identity**: see above — the byline currently reads "AgentStack Editorial Team" everywhere.
- **Hub pages** (`/guides/ai-coding-agents`, `/guides/claude-code`, etc.), the comparison/benchmark content cluster, and the two interactive tools from the Content Map are net-new content, not technical fixes — next phase.
- **Core Web Vitals**: can't be measured until this is deployed and live; the homepage does hotlink several Unsplash/Picsum images which is worth revisiting for LCP once you have real analytics.
