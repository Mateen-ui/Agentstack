---
title: "Cursor Agent Mode: Run Modes Explained"
slug: "cursor-agent-mode"
date: "2026-09-05"
excerpt: "How Cursor's Run Modes control agent autonomy — from manual approval on every command to the Auto-review classifier — and which one is actually right for you."
tags: ["cursor", "agent-mode", "run-modes"]
seo:
  primary_keyword: "Cursor agent mode"
  secondary_keywords:
    - "Cursor Run Modes"
    - "Cursor Auto-review"
    - "Cursor autonomous mode"
  longtail_keywords:
    - "how does Cursor agent mode work"
    - "Cursor Auto-review vs manual approval"
    - "how to make Cursor run commands automatically"
meta_description: "How Cursor's Run Modes work: manual approval, allowlists, and the Auto-review classifier that sandboxes and screens shell, MCP, and fetch calls automatically."
---

# Cursor Agent Mode: Run Modes Explained

By default, Cursor's agent needs your approval before running terminal commands. Run Modes are what let you change that — deciding how much autonomy the agent gets for shell commands, MCP tool calls, and fetch requests, without you approving every single one.

## The modes, from most to least manual

**Manual approval (default).** Every terminal command, MCP tool call, and fetch request stops and waits for you. Reading files and searching code never require approval regardless of mode; editing workspace files also happens without approval by default, except for configuration files, which always need explicit sign-off.

**Allowlist.** You pre-approve specific commands or patterns that run without prompting every time — the simplest way to cut down repeated approvals for commands you already trust.

**Auto-review.** The mode Cursor recommends for most people. A background classifier reviews shell, MCP, and fetch calls in place of you, following a defined order: it checks whether a shell command can run inside a sandbox (limited file and network access) first; commands that need full system access — writes outside the workspace, privileged operations — go to the classifier instead, which decides whether to run them, block them, or ask you. Sandboxing and the classifier are separate, complementary layers: sandboxing controls *where* a supported command runs, not whether Auto-review's classifier reviews it.

## Setting it up

In the desktop app: **Settings > Agents > Approvals & Execution**. Auto-review applies uniformly across shell commands, MCP tool calls, and Fetch requests — you're not configuring each separately.

## What's actually protected, mode or no mode

A few guardrails hold regardless of which Run Mode you're in:

- **Network requests are restricted by default** to GitHub, direct link retrieval, and web search providers — the agent can't make arbitrary outbound requests even in Auto-review.
- **Configuration file edits always need approval**, even under Auto-review or an allowlist — workspace settings changes are treated as sensitive regardless of mode.
- **MCP connections themselves always need approval once**, and every individual tool call from that server still needs approval afterward unless you've added it to an [MCP allowlist](/posts/cursor-mcp) — Run Modes govern execution, not the initial trust decision to connect a server at all.

## The honest framing: best-effort, not a hard boundary

Cursor is direct about this in its own documentation: Run Modes — from the simplest allowlist through the Auto-review classifier — are **best-effort guardrails, not a hard security boundary**. AI can behave unexpectedly because of prompt injection, hallucination, or other failure modes the classifier doesn't catch every time. Treat Auto-review as a way to reduce approval fatigue on genuinely low-risk actions, not as a substitute for reviewing what the agent actually did.

## Workspace trust as a separate layer

Cursor also supports VS Code's workspace trust model, disabled by default. When enabled, opening an unfamiliar project prompts you to choose normal or restricted mode; restricted mode disables AI features entirely. For a repo you don't trust, the practical advice from Cursor itself is simpler than configuring restricted mode: open it in a plain text editor instead. Organizations can enforce workspace trust across a team through MDM.

## Picking a mode for your situation

- **Solo work on your own trusted codebase:** Auto-review is the reasonable default — it removes friction on routine work while keeping the classifier as a check on anything unusual.
- **Working with an unfamiliar or freshly-cloned repo:** stay on manual approval, or enable workspace trust, until you've had a chance to look at what's actually in it.
- **CI or automated pipelines:** allowlist the specific, known-safe commands the pipeline needs rather than reaching for Auto-review, which is tuned for interactive use with a human able to notice something odd.
- **Regulated or security-sensitive work:** layer controls rather than picking one — pair Auto-review or an allowlist with `.cursorignore` to block sensitive files entirely, and treat the classifier as one layer among several, not the only one. See [Cursor security](/posts/cursor-security) for the fuller picture.
