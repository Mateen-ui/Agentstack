---
title: "OpenCode: The Open-Source, Model-Agnostic Coding Agent"
slug: "opencode"
date: "2026-09-05"
excerpt: "What sets OpenCode apart from Claude Code, Cursor, Codex, and Copilot — no vendor lock-in, bring-your-own-provider, and a fully open codebase — plus how to get started."
tags: ["opencode", "open-source"]
type: "hub"
seo:
  primary_keyword: "OpenCode AI"
  secondary_keywords:
    - "OpenCode coding agent"
    - "open source AI coding agent"
    - "OpenCode vs Claude Code"
  longtail_keywords:
    - "what is OpenCode AI coding agent"
    - "OpenCode install and setup guide"
    - "best open source alternative to Claude Code"
meta_description: "What OpenCode is, how it differs from proprietary agents like Claude Code and Cursor, installation options, Plan/Build modes, and where it fits in your workflow."
---

# OpenCode: The Open-Source, Model-Agnostic Coding Agent

Every other agent in this hub — Claude Code, Cursor, Codex, GitHub Copilot — ties you to one company's models and, in most cases, a subscription. OpenCode takes a structurally different position: it's fully open source under the MIT license, model-agnostic across dozens of providers, and available as a terminal interface, desktop app, or IDE extension rather than being anchored to one surface.

## What actually makes it different

Three things distinguish OpenCode from the proprietary agents covered elsewhere on AgentStack:

- **No vendor lock-in.** Configure API keys for any supported LLM provider — Anthropic, OpenAI, Google, AWS Bedrock, Groq, Azure OpenAI, OpenRouter, and others — and switch between them per project or per task. If a new model ships tomorrow, you're not waiting on one vendor to add support.
- **Fully open source.** The entire codebase is auditable, forkable, and open to contributions — a meaningfully different trust model than a proprietary agent you can only inspect through its documented behavior.
- **Bring-your-own-cost.** Since you supply your own provider API keys (or use OpenCode Zen, a curated set of pre-tested models), you pay providers directly for usage rather than a bundled subscription markup. Some providers offer free tiers or subscription-based auth, so cost varies by what you connect.

## Installing it

```bash
curl -fsSL https://opencode.ai/install | bash
```

Also available via npm (`npm install -g opencode-ai`), Homebrew, Arch's package manager, Chocolatey, Scoop, Mise, or Docker. On Windows, running under WSL is the recommended path for full feature compatibility.

## Getting a project set up

```bash
cd /path/to/project
opencode
```

Then, inside the session:

```text
/connect
```

walks you through selecting a provider and entering your API key. Once connected, run:

```text
/init
```

This analyzes your project and generates an `AGENTS.md` file in the project root — OpenCode's own documentation specifically recommends committing this to git, since it's what helps OpenCode (and any teammate using it) understand your project's structure and conventions on every future session, the same role CLAUDE.md plays for Claude Code.

## Plan mode vs. Build mode

Press **Tab** to switch between OpenCode's two core modes:

- **Plan mode** disables OpenCode's ability to make changes and instead has it propose *how* it would implement a request — read-only by design, so you can review an approach before any code gets touched.
- **Build mode** is where it actually executes: editing files, running commands, and iterating on the result.

The recommended flow for anything non-trivial: describe the feature in Plan mode, review and refine the plan (including dropping in reference images — OpenCode can scan images dragged into the terminal), then switch to Build mode once you're satisfied and ask it to proceed.

## Undo and redo, built in

```text
/undo
```

reverts the most recent change and restores your original prompt so you can adjust and retry — runnable multiple times in a row for multiple changes. `/redo` reapplies what you just undid. This is a lower-friction safety net than relying on git alone for every small course-correction.

## Extensibility

OpenCode's configuration surface covers custom tools, rules, subagents, model selection, themes, keybinds, custom slash commands, code formatters, permissions, policies, LSP servers, MCP servers, and Agent Skills — a comparably deep configuration story to Claude Code's, built around the same general categories (persistent context, deterministic automation, delegated agents, external tool connections) but with OpenCode's own file formats and command syntax rather than shared ones.

## Sharing a session

```text
/share
```

generates a link to the current conversation, copied to your clipboard — useful for pairing or getting a second opinion on an approach. Conversations aren't shared by default; this is an explicit, per-session action.

## Where it fits

OpenCode is worth serious consideration if avoiding vendor lock-in matters to your team, you already have API keys across multiple providers and want to route different tasks to different models, you want an agent you or your security team can actually audit rather than trust by reputation, or you need it to work in an air-gapped or otherwise restricted environment where a proprietary agent's telemetry and licensing wouldn't fit. If you've already standardized on one ecosystem — Anthropic, OpenAI, or GitHub — and value the tighter first-party integration (billing, admin controls, official support) over model flexibility, one of the other agents covered in this hub is likely the better default instead.
