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
