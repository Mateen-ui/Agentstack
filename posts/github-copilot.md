---
title: "GitHub Copilot: The Complete Guide"
slug: "github-copilot"
date: "2026-09-05"
excerpt: "How Copilot's agent mode, cloud agent, CLI, and MCP fit together, and where to start depending on whether you want synchronous help or autonomous background work."
tags: ["github-copilot", "hub"]
type: "hub"
seo:
  primary_keyword: "GitHub Copilot"
  secondary_keywords:
    - "GitHub Copilot guide"
    - "GitHub Copilot agent mode"
    - "GitHub Copilot coding agent"
    - "GitHub Copilot features"
  longtail_keywords:
    - "GitHub Copilot complete guide 2026"
    - "GitHub Copilot agent mode vs coding agent"
    - "how does GitHub Copilot work"
meta_description: "A hub for everything AgentStack covers on GitHub Copilot: agent mode, cloud coding agent, MCP, and how the two autonomy models differ."
related:
  - github-copilot-agent-mode
  - github-copilot-coding-agent
  - github-copilot-mcp
---

# GitHub Copilot: The Complete Guide

GitHub Copilot has grown well past its original autocomplete role into a family of related but distinct agent surfaces: **agent mode** for real-time, synchronous work inside your IDE, **cloud agent** (formerly "coding agent") for autonomous, asynchronous background work that opens its own pull requests, **Copilot CLI** for the terminal, and **code review** for automated PR feedback. This hub focuses on the two most consequential for day-to-day development — agent mode and cloud agent — plus MCP, the mechanism that connects any of them to external tools.

## The distinction that matters most: synchronous vs. asynchronous

This is the split worth understanding before anything else. **Agent mode** is a real-time collaborator: you give it a natural-language prompt in your IDE, it determines the steps, edits files, runs terminal commands, and iterates — but it's operating in your local environment, in the moment, with you watching. **Cloud agent** is the opposite shape: you assign it a task (via a GitHub issue, a Copilot Chat prompt, or an `@copilot` mention on a PR), it goes to work autonomously in an isolated, GitHub Actions-powered environment, and comes back with a pull request when it's done — no live supervision required.

Neither replaces the other. Agent mode suits exploratory work and tasks where you want to stay in the loop turn by turn. Cloud agent suits well-scoped backlog items — bug fixes, test coverage, documentation, technical debt — that don't need your attention while they're being worked on.

## Where to start

- **Want Copilot working alongside you in real time?** [Agent mode](/posts/github-copilot-agent-mode) covers how it works, what it can do, and when to use it over plain edit suggestions.
- **Want to delegate a well-defined task entirely?** [Cloud agent](/posts/github-copilot-coding-agent) covers assigning issues, the 59-minute execution limit, and its real limitations.
- **Want to connect either to external tools and data?** [MCP](/posts/github-copilot-mcp) covers the GitHub MCP server, toolset customization, and where MCP is and isn't yet supported.

## What both surfaces share

Custom instructions, custom agents, hooks, and skills all work across both agent mode and cloud agent, though the configuration surface differs slightly between an IDE session and a cloud task. Both can be extended with MCP servers — the GitHub MCP server and Playwright MCP server are enabled by default for cloud agent and Copilot code review specifically.

## A caution worth repeating up front

Cloud agent's own documentation is direct that reviewing its output shifts real responsibility onto you: it can only work on one repository and one branch per task, has a hard 59-minute execution ceiling per session, and — like any coding agent — can produce plausible-looking code nobody has actually thought through yet. Treat its pull requests with the same review rigor as a human contributor's, not less, precisely because the speed can tempt you to skim.
