---
title: "Claude Code Subagents: Delegate Without Flooding Context"
slug: "claude-code-subagents"
date: "2026-09-05"
excerpt: "When to delegate to a subagent instead of working in your main conversation, the built-in agents Claude already uses, and how to write your own."
tags: ["claude-code", "subagents"]
seo:
  primary_keyword: "Claude Code subagents"
  secondary_keywords:
    - "Claude Code custom agents"
    - "how to create a subagent Claude Code"
    - "Claude Code Explore agent"
  longtail_keywords:
    - "how to create a custom subagent in Claude Code"
    - "Claude Code subagent vs skill"
    - "Claude Code background agents"
meta_description: "How Claude Code subagents work: built-in Explore and Plan agents, writing your own with frontmatter, tool restrictions, and when to delegate versus stay in the main conversation."
---

# Claude Code Subagents: Delegate Without Flooding Context

A subagent runs in its own context window with its own system prompt, tool access, and permissions. Use one whenever a side task would flood your main conversation with search results, logs, or file contents you won't reference again — the subagent absorbs that noise and returns only a summary.

## Built-in subagents you're already using

Claude Code delegates to these automatically, without you configuring anything:

- **Explore** — a fast, read-only agent for searching and analyzing codebases. As of v2.1.198, it inherits the main conversation's model (capped at Opus on the Claude API) rather than always running on Haiku.
- **Plan** — a research agent used during plan mode to gather codebase context before presenting a plan, also read-only.
- **General-purpose** — a capable agent for complex, multi-step tasks needing both exploration and action; this is what Claude reaches for when a task doesn't fit a more specialized agent.

Explore and Plan both skip your CLAUDE.md files and git status to keep research fast and cheap — every custom subagent loads both by default.

## Writing your own

Subagents are markdown files with YAML frontmatter, easiest created by asking Claude directly:

```text
Create a personal code-improver subagent in ~/.claude/agents/ that scans
files and suggests improvements for readability, performance, and best
practices. Make it read-only and have it use Sonnet.
```

The result:

```markdown
---
name: code-improver
description: Scans files and suggests improvements for readability, performance, and best practices. Use after writing or modifying code.
tools: Read, Grep, Glob
model: sonnet
---

You are a code improvement specialist. For each issue you find, explain
the problem, show the current code, and provide an improved version.
```

Only `name` and `description` are required. `tools` restricts what it can touch — omitting Write and Edit here makes it genuinely read-only, not just instructed to be.

## Where subagent files live

| Location | Scope |
|---|---|
| `.claude/agents/` | This project — commit it for your team |
| `~/.claude/agents/` | All your projects |
| Plugin `agents/` directory | Wherever the plugin's enabled |
| Managed settings | Organization-wide |

## The frontmatter fields worth knowing beyond the basics

- **`tools`** / **`disallowedTools`** — allowlist or denylist. If both are set, `disallowedTools` applies first, then `tools` is resolved against what's left.
- **`permissionMode`** — override the inherited permission mode for just this subagent: `plan` for a strictly read-only researcher, `bypassPermissions` (with real caution) for a fully autonomous one.
- **`memory`** — gives the subagent a persistent directory (`user`, `project`, or `local` scope) that survives across conversations, so a code-reviewer subagent can build up a knowledge base of patterns and recurring issues over weeks rather than starting fresh every time.
- **`skills`** — preloads full skill content into the subagent's context at startup, rather than relying on it to discover and invoke the skill mid-task.
- **`isolation: worktree`** — runs the subagent against an isolated copy of the repository in a separate git worktree, so its edits don't touch your working checkout until you merge them.

## Delegation patterns worth using

**Isolate high-volume operations.** "Use a subagent to run the test suite and report only the failing tests" keeps the full test output — which can be enormous — out of your main context entirely.

**Run parallel research.** "Research the authentication, database, and API modules in parallel using separate subagents" works well when the investigation paths don't depend on each other; Claude synthesizes the findings afterward.

**Chain subagents.** "Use the code-reviewer subagent to find performance issues, then use the optimizer subagent to fix them" — each returns its result to the main conversation, which passes the relevant piece to the next.

## When to stay in the main conversation instead

Subagents aren't free — a subagent that isn't a fork starts with zero context and needs time to gather it. Stay in the main conversation when the task needs frequent back-and-forth, when planning/implementation/testing share significant context you'd otherwise have to re-explain, or when latency matters more than context savings for a quick, targeted change.

## Foreground vs. background

Background subagents run concurrently while you keep working; when one needs a permission decision, the prompt surfaces in your main session labeled with which subagent is asking. Foreground subagents block the conversation until they finish. In an interactive session, Claude Code runs subagents in the background by default (fork mode); non-interactive mode with `-p` defaults to foreground unless you turn fork mode on.

For a coordinated team of subagents working together rather than one at a time, see [agent teams](/posts/claude-code-subagents#agent-teams) — a step beyond individual delegation, worth its own dedicated piece as this cluster grows.
