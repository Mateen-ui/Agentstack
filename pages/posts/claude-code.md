---
title: "Claude Code: The Complete Guide"
slug: "claude-code"
date: "2026-09-05"
excerpt: "What Claude Code actually is, how it fits into the rest of AgentStack's coverage, and where to start depending on what you're trying to do."
tags: ["claude-code", "hub"]
type: "hub"
seo:
  primary_keyword: "Claude Code"
  secondary_keywords:
    - "Claude Code guide"
    - "what is Claude Code"
    - "Claude Code tutorial"
    - "Claude Code features"
  longtail_keywords:
    - "Claude Code complete guide 2026"
    - "how does Claude Code work"
    - "Claude Code vs other coding agents"
meta_description: "A hub for everything AgentStack covers on Claude Code: installation, commands, skills, hooks, MCP, subagents, and security, kept current with Anthropic's docs."
related:
  - claude-code-tutorial
  - claude-code-install
  - claude-code-commands
  - claude-code-skills
  - claude-code-hooks
  - claude-code-mcp
  - claude-code-subagents
  - claude-code-security
---

# Claude Code: The Complete Guide

Claude Code is Anthropic's agentic coding tool: it reads your codebase, edits files, runs commands, and works across your development tools from the terminal, an IDE, a desktop app, or the browser. Unlike autocomplete-style assistants, it runs its own loop — plan, act, check the result, repeat — until a task is done or it needs you.

This hub collects AgentStack's Claude Code coverage in one place. Each guide below goes deep on one part of the tool; this page is the map.

## What makes it different from autocomplete

The core distinction is the agentic loop. A model plans an action, calls a tool (read a file, run a command, edit code), observes the result, and decides the next step — without you approving each keystroke. Auto mode, the default starting permission mode on Pro, Max, and Team plans, runs a background classifier that reviews actions instead of you, so Claude edits most files and runs most commands without interrupting you for permission on routine work.

That loop is what makes the rest of this hub relevant: memory, tools, and guardrails all exist to keep an agentic loop useful and safe rather than a one-shot autocomplete suggestion.

## Where to start

- **New to Claude Code?** Start with [installation](/posts/claude-code-install) and the [tutorial](/posts/claude-code-tutorial) — install, log in, and make your first change.
- **Want it to remember your project's conventions?** [CLAUDE.md and auto memory](/posts/claude-code-tutorial) covers persistent context; [skills](/posts/claude-code-skills) covers reusable, invokable procedures.
- **Want it to connect to your other tools?** [MCP](/posts/claude-code-mcp) is how Claude Code reaches issue trackers, databases, browsers, and your own internal services.
- **Want deterministic control instead of relying on the model to remember a rule?** [Hooks](/posts/claude-code-hooks) run your own shell commands at fixed points in the agent's lifecycle — formatting after edits, blocking edits to protected files, notifying you when it needs input.
- **Working on a large or multi-part task?** [Subagents](/posts/claude-code-subagents) delegate side work to an isolated context so your main conversation doesn't fill up with search results and logs you'll never reference again.
- **Deploying it on a team or with sensitive code?** [Security](/posts/claude-code-security) covers the permission system, sandboxing, and prompt-injection protections.
- **Need a specific flag or slash command?** [Commands](/posts/claude-code-commands) is the reference.

## The shape of a session

Every session sits on the same four pieces, whichever surface you use:

1. **The model** does the reasoning — planning, interpreting your request, deciding what to do next.
2. **Tools** (Read, Edit, Bash, WebFetch, and MCP tools) let it act on your actual files, terminal, and connected services.
3. **Context** — CLAUDE.md files, auto memory, and whatever's in the conversation — is what it knows about your project without you re-explaining it every session.
4. **Permissions** decide what it can do without asking, what it must ask about, and what it can never do.

The rest of this hub is really about tuning those four things for your workflow: what gets automated (hooks), what gets delegated (subagents), what gets remembered (skills, CLAUDE.md), and what gets locked down (permissions, sandboxing).

## Available everywhere, same engine

Terminal, VS Code, JetBrains, the desktop app, and the web all connect to the same underlying engine, so a project's CLAUDE.md files, settings, and MCP servers work identically across all of them. That matters for teams: a skill or hook one person commits to a repo's `.claude/` directory works for every teammate, regardless of which surface they open Claude Code from.
