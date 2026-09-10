---
title: "Cursor Rules: Persistent Instructions That Actually Stick"
slug: "cursor-rules"
date: "2026-09-05"
excerpt: "How Cursor's four rule types work, the frontmatter that controls when each applies, and how the newer Memories feature fits alongside them."
tags: ["cursor", "rules", "memories"]
seo:
  primary_keyword: "Cursor rules"
  secondary_keywords:
    - "Cursor .mdc files"
    - "Cursor AGENTS.md"
    - "Cursor Memories feature"
  longtail_keywords:
    - "how to create rules in Cursor"
    - "Cursor rules vs Memories vs AGENTS.md"
    - "Cursor rules not being applied"
meta_description: "How Cursor rules work: project rules, user rules, team rules, AGENTS.md, glob-scoped .mdc frontmatter, and the auto-generated Memories feature."
---

# Cursor Rules: Persistent Instructions That Actually Stick

Large language models don't retain memory between completions — every request starts fresh. Rules exist to close that gap: persistent, reusable context that gets included at the start of the model's context whenever they apply, so you're not re-explaining your project's conventions in every conversation.

## The four rule types

**Project rules** live in `.cursor/rules` as `.mdc` files, are version-controlled, and scoped by path pattern, manual invocation, or relevance. This is where most rules should live — committed to git so your whole team benefits.

**User rules** are global preferences set in Customize → Rules that apply across every project — good for communication style or personal coding conventions, but only used by Agent (Chat), not Inline Edit.

**Team rules** are managed centrally from the Cursor dashboard on Team and Enterprise plans, applied to every team member, and take precedence over project and user rules when guidance conflicts. Admins choose whether each is optional (users can disable it in Customize) or enforced (they can't).

**AGENTS.md** is a plain markdown file in your project root — no frontmatter, no metadata — for teams who want simple instructions without the structure of `.mdc` files. Cursor supports nested `AGENTS.md` files in subdirectories, too, with more specific instructions taking precedence over parent-directory ones.

## Why the file extension matters

A plain `.md` file dropped into `.cursor/rules` is silently ignored — project rules require the `.mdc` extension specifically, since that's what carries the frontmatter controlling when a rule applies. If you want plain markdown with no frontmatter, that's exactly what `AGENTS.md` is for instead.

## How frontmatter decides when a rule fires

| `alwaysApply` | `description` | `globs` | Behavior |
|---|---|---|---|
| `true` | — | — | Always included, every session |
| `false` | — | provided | Auto-attached when a matching file is in context |
| `false` | provided | omitted | Agent reads the description and decides if it's relevant |
| `false` | omitted | omitted | Only included when you `@`-mention the rule directly |

A rule scoped to `src/components/**/*.tsx` only loads into context when a matching file is actually part of the conversation — it doesn't bloat every session's context with frontend conventions that are irrelevant to a backend task.

## Writing rules that hold up

- **Keep rules under 500 lines**, split large ones into multiple composable files
- **Reference files instead of copying their content** — `@component-template.tsx` stays current as the template changes; a pasted copy goes stale silently
- **Skip what Agent already knows** — don't document `npm`, `git`, or common style conventions; Agent already has that. Rules should carry decisions specific to *your* project, not general knowledge
- **Start simple and add rules reactively** — when you notice Agent repeating the same mistake, write (or update) a rule for it rather than trying to anticipate every edge case up front

The two easiest ways to create one: type `/create-rule` in Agent and describe what you want, or open Customize → Rules → Add Rule.

## Memories: the newer, lighter alternative

Alongside rules, Cursor has a **Memories** feature: automatically generated, project-scoped facts a background model proposes from your actual conversations, which you approve before they're saved. Where rules are something you write deliberately, Memories capture things Cursor picked up along the way — a preference you stated once, a pattern it noticed. They're managed from Settings, where you can review, edit, or delete individual entries, and are scoped per-project by design — they don't follow you to a different repo or a different tool.

Rules and Memories aren't competing systems so much as different tools for different kinds of knowledge: rules for conventions you want to *state* once and enforce consistently, Memories for facts that emerge naturally and are worth *retaining* without you writing them down yourself.

## Importing rules from elsewhere

Cursor can pull `.mdc` files directly from a GitHub repository — public or private — through Customize → Rules → Add Rule → Remote Rule (GitHub). Imported rules land in `.cursor/rules/imported/<repoName>`, keeping their original relative paths, which is a fast way to adopt a team's or a well-known open-source project's rule set without recreating it by hand.

## If a rule isn't applying

Two most common causes: for `Apply Intelligently` rules, check that a `description` is actually set — without one, Agent has nothing to match relevance against. For `Apply to Specific Files` rules, confirm the glob pattern actually matches the files in your current context; a typo in the glob is a silent failure, not an error.
