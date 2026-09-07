// Central site configuration. Import this everywhere instead of
// hardcoding the domain, so changing to a custom domain later is a
// one-line edit (see README "Moving to a custom domain").

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://agentstack-vert.vercel.app";
export const SITE_NAME = "AgentStack";
export const SITE_TITLE = "AgentStack — The AI Coding Agents Blog";
export const SITE_DESCRIPTION =
  "A field guide to AI coding agents — how they work, which one to use, and how to run them without breaking production.";
export const SITE_TWITTER = "@agentstackhq"; // update if/when a real handle exists

// Default byline used on posts that don't set their own `author` in
// frontmatter. Replace with a real named author + bio once you have
// one — Google's guidance wants factual, verifiable credentials, so
// don't invent a person here.
export const DEFAULT_AUTHOR = {
  name: "AgentStack Editorial Team",
  slug: "editorial-team",
  bio: "AgentStack's editorial team researches and tests AI coding agents directly — installing each tool, running the same tasks across them, and writing up what actually happened.",
};

export const ORGANIZATION = {
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
};
