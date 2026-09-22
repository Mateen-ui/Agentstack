---
title: "Codex vs. Claude Code: How the Permission Models Actually Differ"
slug: "codex-vs-claude-code"
date: "2026-09-05"
excerpt: "Both are terminal-native coding agents with sandboxing, hooks, subagents, and MCP. The real differences are in how autonomy is structured and configured, not which one is 'more capable.'"
tags: ["codex", "claude-code", "comparison"]
seo:
  primary_keyword: "Codex vs Claude Code"
  secondary_keywords:
    - "OpenAI Codex vs Claude Code"
    - "Codex CLI vs Claude Code CLI"
    - "which coding agent to use"
  longtail_keywords:
    - "Codex vs Claude Code which is better"
    - "Codex vs Claude Code permission model comparison"
    - "should I use Codex or Claude Code"
meta_description: "A direct comparison of Codex CLI and Claude Code: sandboxing and approval models, hooks, subagents, MCP configuration, and which fits which workflow."
---

# Codex vs. Claude Code: How the Permission Models Actually Differ

Codex CLI and Claude Code are both terminal-native agents that read your codebase, propose and make edits, run commands, and support hooks, subagents, and MCP. The meaningful differences aren't in raw capability — they're in how each structures autonomy, and that shapes which one fits a given workflow better.

## Permission architecture: two layers vs. one dial

This is the single biggest structural difference. **Codex separates sandbox mode from approval policy** — two independent settings. Sandbox mode (`read-only`, `workspace-write`, `danger-full-access`) sets the technical ceiling on what a command can touch; approval policy (`on-request`, `never`, or granular category rules) sets when you're asked, regardless of what the sandbox allows. You can combine a tight sandbox with zero prompts, or a loose sandbox with heavy prompting — the two axes are orthogonal.

**Claude Code uses permission modes as a single combined setting** — Manual, Auto (classifier-reviewed), Accept Edits, and so on — where each mode bundles a level of technical permission and a level of prompting together, rather than letting you set them independently. Claude Code's Auto mode routes decisions through a background classifier that reviews actions in your place; Codex's equivalent is `approvals_reviewer = "auto_review"`, a separate reviewer agent that evaluates only the requests that already require approval under your chosen policy, layered on top of the sandbox rather than replacing it.

Neither approach is strictly safer — Codex's split model gives more precise control if you want it; Claude Code's combined modes are simpler to reason about at a glance.

## Default posture out of the box

Both default to restrictive network access and scoped write permissions, but the specifics differ. Codex's `workspace-write` mode keeps network access off entirely until you explicitly enable it in config; Claude Code's sandboxed Bash tool provides filesystem and network isolation configurable via `/sandbox`, with network requests limited to a curated set of destinations by default rather than off entirely. Both require explicit action to widen the boundary, and both treat "wide open" (`--yolo`/`--dangerously-bypass-approvals-and-sandbox` for Codex, `--dangerously-skip-permissions` for Claude Code) as something you reach for deliberately, not a default worth normalizing.

## Configuration files: AGENTS.md vs. CLAUDE.md

Codex reads project- and user-level `AGENTS.md` files; Claude Code reads `CLAUDE.md` files at the same scopes, plus auto-generated memory. Functionally similar — both are where you put standing project context so you're not re-explaining conventions every session — but they're not interchangeable files; each tool reads its own format and ignores the other's by default.

## Hooks and hard rules

Both support deterministic automation beyond what you can guarantee through instructions alone. Claude Code's hooks fire on named lifecycle events (`PreToolUse`, `PostToolUse`, `SessionStart`, and dozens more) and communicate back through exit codes and structured JSON. Codex's equivalent surface is its own hooks system plus the granular approval policy itself, which can auto-approve or auto-reject specific categories of action as configuration rather than a triggered script. The practical effect is similar — rules that hold regardless of what the model decides to do — but the mechanics and event vocabulary differ enough that a hook written for one doesn't port directly to the other.

## Subagents: similar concept, different plumbing

Both support delegating focused work to an isolated agent so the main conversation's context doesn't fill up with search results and intermediate findings. Claude Code's subagents are markdown files with YAML frontmatter (`tools`, `model`, `permissionMode`) stored in `.claude/agents/`; Codex's subagent support is reached through its CLI/config surface rather than a dedicated markdown format, and its own documentation is candid that subagents consume more tokens than a comparable single-agent run — worth weighing before defaulting to delegation for every side task in either tool.

## MCP: both support it, configuration differs

Both connect to Model Context Protocol servers — `claude mcp add` for Claude Code, `codex mcp add` for Codex, each with their own config file (`.mcp.json` vs. `~/.codex/config.toml`) and scope model. Claude Code layers `local`/`project`/`user` scopes with git-committable project config; Codex's MCP servers live in the TOML config and can be scoped per-profile. Neither tool's MCP layer inherently trusts a server — both require explicit connection approval, and Codex specifically elicits approval for any connector tool call that advertises a destructive side effect.

## Where each tends to fit better

Neither is categorically "safer" or "more capable" — the fit depends on what you're optimizing for:

- **Want fine-grained, independently tunable control over sandbox vs. prompting?** Codex's two-layer model gives you that directly.
- **Want a smaller number of well-understood modes to reason about quickly?** Claude Code's combined permission modes are easier to hold in your head.
- **Running fully non-interactive CI?** Both support it cleanly — `codex exec --sandbox read-only --ask-for-approval never` and Claude Code's `-p` print mode with `--max-turns`/`--max-budget-usd` caps are the respective patterns.
- **Standardizing across a team already invested in one ecosystem?** ChatGPT/OpenAI shops lean Codex; Claude/Anthropic shops lean Claude Code — the deeper integration (billing, admin controls, model access) usually decides this before the CLI feature set does.

Many teams covered on AgentStack use both — Claude Code for exploratory and multi-step feature work, Codex for scoped, CI-triggered tasks — rather than treating the choice as exclusive. See [Claude Code security](/posts/claude-code-security) and this article's sandbox comparison above before granting either one broad, unattended access to a repository you can't afford to have misused.
