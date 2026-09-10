---
title: "Cursor: The Complete Guide"
slug: "cursor"
date: "2026-09-05"
excerpt: "What Cursor is, how its agent, rules, memories, and MCP fit together, and where to start depending on what you're trying to do."
tags: ["cursor", "hub"]
type: "hub"
seo:
  primary_keyword: "Cursor AI"
  secondary_keywords:
    - "Cursor guide"
    - "what is Cursor"
    - "Cursor tutorial"
    - "Cursor features"
  longtail_keywords:
    - "Cursor complete guide 2026"
    - "how does Cursor AI work"
    - "Cursor vs other coding agents"
meta_description: "A hub for everything AgentStack covers on Cursor: getting started, agent mode and run modes, rules, MCP, and security, kept current with Cursor's own docs."
related:
  - cursor-tutorial
  - cursor-agent-mode
  - cursor-rules
  - cursor-mcp
  - cursor-security
---

# Cursor: The Complete Guide

Cursor is a code editor — a fork of VS Code — built around an AI agent that understands your codebase, plans and builds features, fixes bugs, reviews changes, and works with the tools you already use. Unlike a chat window bolted onto an editor, Cursor's agent is built into the editing experience itself: it reads files, proposes edits as a diff you review, runs terminal commands, and searches the web when it needs current information.

This hub collects AgentStack's Cursor coverage. Each guide below goes deep on one part; this page is the map.

## The three components of Cursor's agent

Every agent run in Cursor rests on the same three pieces:

1. **Instructions** — the system prompt plus your [rules](/posts/cursor-rules), which guide how the agent behaves in your specific project.
2. **Tools** — file editing, codebase search, terminal execution, browser control, image generation, and any [MCP servers](/posts/cursor-mcp) you've connected.
3. **Model** — the specific model you pick for a task; Cursor tunes its instructions and tool set per model as new ones ship, so you don't have to hand-tune prompts for each.

## Where to start

- **New to Cursor?** Start with the [tutorial](/posts/cursor-tutorial) — install, sign in, and make your first change.
- **Want to control how much the agent does without asking?** [Agent mode and Run Modes](/posts/cursor-agent-mode) covers autonomy levels from full manual approval to Auto-review.
- **Want it to follow your project's conventions automatically?** [Rules](/posts/cursor-rules) covers project rules, AGENTS.md, and the newer auto-generated Memories feature.
- **Want it to reach your other tools?** [MCP](/posts/cursor-mcp) connects Cursor to databases, issue trackers, design tools, and your own internal services.
- **Deploying it on a team or with sensitive code?** [Security](/posts/cursor-security) covers approval guardrails, network restrictions, and workspace trust.

## What's distinctive about Cursor specifically

A few things set Cursor apart from other agentic editors covered on AgentStack:

- **Plan Mode** — toggled with Shift+Tab — has the agent research your codebase, ask clarifying questions, and produce a detailed implementation plan before writing any code, rather than diving straight into edits.
- **Checkpoints** — automatic snapshots before significant changes, separate from git, that let you preview and roll back the agent's work without touching your actual version history.
- **`/goal`** — gives the agent a long-lived objective ("fix all flaky tests and make CI green") it keeps working toward across multiple turns, rather than treating every message as an isolated task.
- **Memories** — a newer, lighter-weight alternative to hand-writing rules: a background model proposes project-scoped facts it picked up during conversations, which you approve before they're saved.

## Same agent, several surfaces

Cursor's agent is available in the editor, a dedicated Agents Window for running several tasks in parallel, a CLI for terminal and CI use, and Cloud Agents that run in an isolated VM rather than on your machine. Rules, MCP servers, and most settings carry across all of them, so a `.cursor/rules` file or `.cursor/mcp.json` you commit to a repo works the same way regardless of which surface a teammate opens Cursor from.
