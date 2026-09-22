---
title: "Codex CLI: Install, Sandbox Modes, and Everyday Commands"
slug: "codex-cli"
date: "2026-09-05"
excerpt: "Installing Codex CLI, understanding sandbox modes versus approval policies, and the commands and flags that come up in daily use."
tags: ["codex", "cli", "sandboxing"]
seo:
  primary_keyword: "Codex CLI"
  secondary_keywords:
    - "install Codex CLI"
    - "Codex sandbox mode"
    - "Codex approval policy"
  longtail_keywords:
    - "how to install Codex CLI"
    - "Codex CLI sandbox vs approval policy explained"
    - "Codex CLI commands reference"
meta_description: "How to install Codex CLI, the difference between sandbox modes and approval policies, everyday commands and flags, and how to run Codex safely in CI."
---

# Codex CLI: Install, Sandbox Modes, and Everyday Commands

Codex CLI runs locally in your terminal — inspecting files, proposing edits, running commands, and automating repeatable work without leaving the shell.

## Installing and signing in

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

npm and Homebrew installs are also available. The same command updates an existing install. Open a project directory and run `codex`; the first time, choose **Sign in with ChatGPT** or another available sign-in method (an API key also works, though some features may not be available on that path).

Once running, try:

```text
Tell me about this project
```

Codex's own advice worth taking seriously: create git checkpoints before and after a task so you can revert changes cleanly if something goes sideways.

## Sandbox mode vs. approval policy — the distinction that matters

These are two separate, independently configurable layers, not one combined setting:

- **Sandbox mode** — the technical ceiling on what a command can do: where it can write, whether it can reach the network.
- **Approval policy** — when Codex has to stop and ask you before acting, regardless of what the sandbox would technically allow.

| Sandbox mode | What it allows |
|---|---|
| `read-only` | Read files and run commands within a read-only sandbox; no writes |
| `workspace-write` | Read, edit, and run commands inside the working directory; network off by default |
| `danger-full-access` | No sandbox at all — full filesystem and network access |

| Approval policy | Behavior |
|---|---|
| `on-request` | Commands the sandbox allows run without asking; anything that would leave the sandbox or reach the network asks first |
| `never` | No approval prompts at all — the sandbox is now your only real boundary |
| granular | Fine-grained control: keep some prompt categories interactive (sandbox escalations, MCP prompts, skill-script approvals) while auto-rejecting others |

On launch, Codex checks whether the folder is version-controlled: a version-controlled folder gets the `Auto` preset (`workspace-write` + `on-request`) recommended by default; a non-version-controlled folder gets `read-only` recommended instead, until you explicitly trust it.

```bash
codex --sandbox workspace-write --ask-for-approval on-request   # Auto preset, explicit
codex --sandbox read-only --ask-for-approval on-request          # safe browsing/planning
codex --sandbox read-only --ask-for-approval never                # CI, fully non-interactive
codex --dangerously-bypass-approvals-and-sandbox                  # aka --yolo, use with real caution
```

**Protected paths.** Even in `workspace-write` mode, `.git`, `.agents`, and `.codex` directories inside the writable root stay read-only, recursively — Codex can edit your code but can't rewrite your git history or its own configuration out from under you.

## Everyday commands

Inside a session:

| Command | Does |
|---|---|
| `/init` | Create an AGENTS.md file with instructions for Codex |
| `/status` | Show current session configuration, including which directories are in the workspace |
| `/permissions` | Choose what Codex is allowed to do; switch to read-only mid-session |
| `/model` | Choose the model and reasoning effort |
| `/review` | Review changes and find issues without modifying the working tree |

From your shell:

| Command | Does |
|---|---|
| `codex` | Start an interactive session |
| `codex exec "task"` | Run non-interactively, for scripts and CI |
| `codex resume` | Reopen a recent chat from the current repo, or search across older ones |
| `codex mcp add` / `codex mcp list` | Connect and inspect MCP servers |
| `codex cloud` | Browse cloud chats and submit work to a configured environment from the terminal |
| `codex --image <path>` | Attach a screenshot, diagram, or design reference to a prompt |
| `codex --search` | Switch to live web search for a task that depends on current information |
| `codex sandbox <macos\|linux\|windows>` | Test what a specific command would be allowed to do under the sandbox, without actually running a task |

## Reviewing changes before you commit

`/review` (or the CLI's dedicated review presets — against a base branch in PR style, uncommitted changes, a specific commit, or custom instructions) reports prioritized findings **without modifying your working tree**. Worth running before every commit, not just before opening a PR — it's a read-only pass, so there's no reason not to.

## Network access, briefly

Network access is off by default even in `workspace-write` mode. Turning it on is explicit:

```toml
[sandbox_workspace_write]
network_access = true
```

Web search defaults to a cached mode — pre-indexed results rather than live page fetches — specifically to reduce exposure to prompt injection from arbitrary live content; treat even cached results as untrusted. `--search` (or `web_search = "live"`) switches to live browsing when a task genuinely needs current information the cache doesn't have.

## Running in CI

```bash
codex exec --sandbox workspace-write "fix the failing tests"
codex exec --sandbox read-only --ask-for-approval never "summarize open issues"
```

For CI specifically, `read-only` + `never` is usually the right combination unless the pipeline's whole job is to make changes — in which case scope `workspace-write` tightly and skip network access unless the task genuinely needs it.

## Telemetry, if you need it

Codex supports opt-in OpenTelemetry export — off by default — for teams that need an audit trail of tool approvals, prompts, and results. `log_user_prompt` stays `false` by default even when telemetry is on, since prompts can contain source code and sensitive data; only enable it if your policy explicitly calls for storing prompt contents.

## What to look at next

Once the basics feel natural, [Codex vs. Claude Code](/posts/codex-vs-claude-code) is the natural next read if you're deciding which to standardize on, or splitting work between the two.
