---
title: "OpenAI Codex: The Complete Guide"
slug: "openai-codex"
date: "2026-09-05"
excerpt: "What Codex is across its different surfaces, how the CLI's sandbox and approval model works, and where to start depending on what you're trying to do."
tags: ["codex", "hub"]
type: "hub"
seo:
  primary_keyword: "OpenAI Codex"
  secondary_keywords:
    - "Codex guide"
    - "what is OpenAI Codex"
    - "Codex CLI"
    - "Codex features"
  longtail_keywords:
    - "OpenAI Codex complete guide 2026"
    - "how does Codex CLI work"
    - "Codex vs other coding agents"
meta_description: "A hub for everything AgentStack covers on OpenAI Codex: the CLI, sandboxing and approvals, subagents, MCP, and how it compares to Claude Code."
related:
  - codex-cli
  - codex-vs-claude-code
---

# OpenAI Codex: The Complete Guide

Codex is OpenAI's coding agent, available across several surfaces: the ChatGPT desktop app and web (no installation, runs in the cloud), the Codex CLI (runs locally in your terminal), a Codex IDE extension (VS Code, Cursor, Windsurf), and Codex cloud (isolated, OpenAI-managed containers for parallel or long-running tasks). This hub focuses on the CLI, since that's the surface most developers reach for first, but the underlying agent — and its configuration through `AGENTS.md`, hooks, subagents, and MCP — is broadly shared across surfaces.

## What makes Codex distinctive

Codex's defining design choice is a two-layer security model, described plainly in its own documentation: a **sandbox mode** controls what Codex can technically do (where it can write, whether it can reach the network), and a separate **approval policy** controls when it must stop and ask you before acting. These are independent settings, not one combined "autonomy level" — you can run a fully sandboxed, zero-approval session, or a wide-open sandbox that still asks before anything risky.

By default, network access is off entirely, and writes are limited to the current workspace. On a fresh, version-controlled project, Codex recommends the `Auto` preset (`workspace-write` + `on-request` approvals): it reads, edits, and runs commands in your working directory without asking, but stops to ask before touching anything outside it or reaching the network.

## Where to start

- **New to Codex?** Start with [the CLI guide](/posts/codex-cli) — install, sign in, and run your first task.
- **Deciding between Codex and Claude Code?** [Codex vs. Claude Code](/posts/codex-vs-claude-code) compares their permission models, tool systems, and configuration approaches directly.
- **Want to script or automate Codex?** `codex exec` runs a task non-interactively — see the CLI guide for the flags that matter for CI.
- **Working across a larger codebase?** Codex supports subagents for delegating focused investigation, the same general pattern covered in [Claude Code subagents](/posts/claude-code-subagents), though the configuration mechanics differ.

## The shape of a Codex session

- **Sandbox mode** — `read-only`, `workspace-write`, or `danger-full-access` — sets the technical ceiling on what a command can touch.
- **Approval policy** — `on-request`, `never`, or a granular policy covering specific categories (sandbox escalations, MCP prompts, skill-script approvals) — sets when you're asked.
- **AGENTS.md** — project-level and global instructions Codex reads at session start, the rough equivalent of Claude Code's CLAUDE.md.
- **MCP servers** — connect Codex to external tools via `codex mcp add`, configurable in `~/.codex/config.toml`.

## Safety monitoring, separately from sandboxing

Codex layers an asynchronous safety monitor on top of the sandbox and approval system — it can pause a task mid-run if it detects potentially unsafe model behavior, independent of whether the sandbox or approval policy already permitted the action. This monitoring doesn't replace sandboxing or approvals; an action can pass automatic approval review and still have the broader task paused by safety monitoring afterward. Worth knowing before you lean on `--dangerously-bypass-approvals-and-sandbox` (aliased `--yolo`) for anything beyond a fully trusted, disposable environment.

## Version control as part of the workflow

Codex's own guidance treats git discipline as part of using it safely, not an afterthought: work on a feature branch, keep `git status` clean before delegating a task, prefer patch-based review (`git diff`/`git apply`) over editing tracked files directly, and commit frequently so a bad change is a small, easy revert rather than a tangled one.
