---
title: "Claude Code Commands: The Complete Reference"
slug: "claude-code-commands"
date: "2026-09-05"
excerpt: "Every shell command, session slash command, and CLI flag worth knowing, organized by what you're actually trying to do."
tags: ["claude-code", "commands", "cli"]
seo:
  primary_keyword: "Claude Code commands"
  secondary_keywords:
    - "Claude Code CLI reference"
    - "Claude Code slash commands"
    - "Claude Code flags"
  longtail_keywords:
    - "list of all Claude Code commands"
    - "Claude Code CLI flags reference"
    - "how to resume a Claude Code session"
meta_description: "A practical reference for Claude Code's shell commands, in-session slash commands, and the CLI flags you'll actually reach for."
---

# Claude Code Commands: The Complete Reference

Claude Code commands split into two categories that are easy to confuse: **shell commands**, run from your terminal before or between sessions, and **session commands** (slash commands), typed inside a running session.

## Shell commands you'll use daily

| Command | Does |
|---|---|
| `claude` | Start an interactive session |
| `claude "task"` | Start with an initial prompt |
| `claude -p "query"` | Run one-off query via SDK, then exit |
| `claude -c` | Continue the most recent conversation in this directory |
| `claude -r "<session>" "query"` | Resume a specific session by ID or name |
| `claude update` | Update to the latest version |
| `claude doctor` | Print installation/settings diagnostics without starting a session |
| `claude mcp` | Configure MCP servers |
| `claude agents` | Open agent view to monitor parallel background sessions |
| `claude --agent code-reviewer` | Run the whole session as a specific subagent |

Less common but useful: `claude project purge [path]` clears all local state for a project (transcripts, task lists, debug logs); `claude setup-token` generates a long-lived OAuth token for CI; `claude ultrareview [target]` runs a non-interactive deep review and can post findings straight to a GitHub PR with `--post`.

## In-session slash commands

Type `/` inside a running session to see everything available, including bundled skills. A few worth knowing by name:

- `/clear` — clear conversation history
- `/help` — list available commands
- `/compact` — manually trigger compaction to free context
- `/agents` — as of v2.1.198, prints a reminder to ask Claude or edit `.claude/agents/` directly rather than opening the old interactive wizard
- `/hooks` — browse configured hooks by event (read-only; edit settings JSON to change them)
- `/mcp` — check and manage connected MCP servers, including authentication
- `/skills` — list available skills, including ones synced from claude.ai
- `/skill-doctor` — reports which of your skills are unused and what each costs in context
- `/security-review` — run an on-demand security pass over changes on your current branch
- `/subtask` — fork the current conversation into a background task that inherits full context
- `/rewind` — undo via checkpoints

Bundled skills like `/debug`, `/code-review`, `/batch`, and `/loop` are also invoked with `/`, and are listed alongside built-in commands, marked "Skill" in the commands reference.

## CLI flags worth knowing

Claude Code has well over a hundred flags; `claude --help` doesn't list all of them. The ones that come up most in real usage:

| Flag | What it does |
|---|---|
| `--model` | Set the model for this session (`claude --model claude-sonnet-5`) |
| `--permission-mode` | Start in a specific mode: `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions` |
| `--add-dir` | Grant read/edit access to additional directories |
| `--dangerously-skip-permissions` | Skip permission prompts entirely — use with real caution |
| `--print`, `-p` | Print a response non-interactively, for scripting |
| `--output-format` | `text`, `json`, or `stream-json` for print mode |
| `--max-turns` | Cap the number of agentic turns (print mode) |
| `--max-budget-usd` | Hard dollar cap on API spend for a run |
| `--worktree`, `-w` | Start in an isolated git worktree |
| `--agent` | Run the session as a specific subagent from the start |
| `--resume`, `-r` | Resume a session by ID/name, or open the picker |
| `--settings` | Point at a settings JSON file or inline JSON for this session |
| `--append-system-prompt` | Add instructions to the default system prompt without replacing it |

## Scripting and automation

For CI or scripts, `-p` mode with `--output-format json` or `stream-json` is the pattern to reach for:

```bash
cat logs.txt | claude -p "summarize any errors" --output-format json
```

`--max-turns` and `--max-budget-usd` are worth setting explicitly in any automated pipeline — an unbounded agentic loop in CI is exactly the kind of thing that turns into a surprise bill. See [cost control for always-on agents](/posts/cost-control-for-always-on-agents) for what happens when nobody sets those caps.

## Where to look next

Slash commands and flags are the mechanics; what you actually build with them — reusable procedures, deterministic automation, delegated work — is covered in [skills](/posts/claude-code-skills), [hooks](/posts/claude-code-hooks), and [subagents](/posts/claude-code-subagents).
