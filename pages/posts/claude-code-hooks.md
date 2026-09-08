---
title: "Claude Code Hooks: Deterministic Automation"
slug: "claude-code-hooks"
date: "2026-09-05"
excerpt: "Hooks give Claude Code deterministic control that doesn't depend on the model remembering a rule. Here's how to set up the ones that pay off fastest."
tags: ["claude-code", "hooks", "automation"]
seo:
  primary_keyword: "Claude Code hooks"
  secondary_keywords:
    - "Claude Code automation"
    - "Claude Code PreToolUse hook"
    - "Claude Code auto-format hook"
  longtail_keywords:
    - "how to set up hooks in Claude Code"
    - "Claude Code hook not firing"
    - "block Claude Code from editing files"
meta_description: "How Claude Code hooks work — deterministic shell commands triggered at specific lifecycle events — with working examples for formatting, blocking edits, and notifications."
---

# Claude Code Hooks: Deterministic Automation

Skills and CLAUDE.md rules rely on the model choosing to follow them. Hooks don't — they're shell commands Claude Code runs automatically at specific points in its lifecycle, so a rule like "always run the formatter after an edit" happens every time, not just when the model remembers to.

## Your first hook: a desktop notification

Add to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code needs your attention\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

(Linux uses `notify-send`; Windows PowerShell uses a `MessageBox` call.) Type `/hooks` inside a session to confirm it registered — that menu is read-only, so edits happen in the settings file itself.

## Four hooks worth setting up first

**Auto-format after every edit.** A `PostToolUse` hook matched to `Edit|Write` that pipes the changed file through Prettier:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write" }]
      }
    ]
  }
}
```

**Block edits to protected files.** A `PreToolUse` script that checks the target path against patterns like `.env`, `package-lock.json`, and `.git/`, exiting with code 2 to block the edit and pass a reason back to Claude.

**Re-inject context after compaction.** When the context window fills up, compaction summarizes the conversation and can lose detail. A `SessionStart` hook matched on `compact` re-injects a reminder (recent commits, current sprint, "use Bun not npm") right after.

**Audit configuration changes.** A `ConfigChange` hook that appends every settings or skill-file change to a log — useful for compliance, and for noticing when something in your setup changed without you touching it.

## How hooks actually communicate

Hooks talk to Claude Code through stdin, stdout, stderr, and exit codes:

- **Exit 0**: no objection. For `PreToolUse`, this doesn't approve the action — the normal permission flow still applies.
- **Exit 2**: block the action. Write the reason to stderr; where it lands depends on the event, but for most tool-related events it's fed back to Claude as feedback so it can adjust.
- **Structured JSON on stdout with exit 0**: for finer control than exit codes alone — denying with a specific reason, or auto-approving a specific permission prompt via `PermissionRequest`.

When multiple hooks match the same event, they all run to completion, and for `PreToolUse` the most restrictive verdict wins in the order deny, defer, ask, allow — one hook returning `deny` doesn't stop a sibling hook's side effects from happening.

## The full event list, grouped

Claude Code fires dozens of named events across a session's lifecycle. The ones that come up most:

- **Tool events**: `PreToolUse` (before a call, can block it), `PostToolUse` (after success), `PostToolUseFailure`
- **Session events**: `SessionStart`, `SessionEnd`, `PreCompact`/`PostCompact`
- **Conversational events**: `UserPromptSubmit`, `Stop` (when Claude finishes responding), `Notification`
- **Subagent events**: `SubagentStart`, `SubagentStop`
- **Config and environment**: `ConfigChange`, `CwdChanged`, `FileChanged`

## Beyond shell commands

Most hooks use `"type": "command"`, but three other types exist for cases a shell script can't handle well: `"type": "http"` posts event data to a URL, useful for a shared team audit service; `"type": "prompt"` sends a single-turn judgment call to a fast model (Haiku by default) instead of hardcoding logic — good for "is this task actually done?" checks a `Stop` hook can ask before letting Claude finish; and `"type": "agent"` spawns a full subagent that can read files and run commands to verify a condition, at real cost, for cases where the decision genuinely needs to inspect the codebase rather than just the event data.

## Where hooks fit relative to skills and subagents

Reach for a hook when the rule needs to hold every time, with no dependence on the model remembering. Reach for a [skill](/posts/claude-code-skills) when you want reusable instructions the model applies with judgment. Reach for a [subagent](/posts/claude-code-subagents) when the work itself needs an isolated context, not just a triggered side effect. The three compose — a skill can define its own hooks in frontmatter, scoped to just the turn that invokes it.
