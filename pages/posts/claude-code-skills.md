---
title: "Claude Code Skills: Package Your Workflows"
slug: "claude-code-skills"
date: "2026-09-05"
excerpt: "How Claude Code skills work, when to write one instead of a CLAUDE.md rule, and the frontmatter fields that actually matter."
tags: ["claude-code", "skills"]
seo:
  primary_keyword: "Claude Code skills"
  secondary_keywords:
    - "Claude Code SKILL.md"
    - "how to create a Claude Code skill"
    - "Claude Code custom commands"
  longtail_keywords:
    - "how to create a skill in Claude Code"
    - "Claude Code skills vs CLAUDE.md"
    - "Claude Code skill frontmatter reference"
meta_description: "How Claude Code skills work: creating a SKILL.md, frontmatter fields, dynamic context injection, running skills in a subagent, and when to reach for one."
---

# Claude Code Skills: Package Your Workflows

A skill is a `SKILL.md` file with instructions that Claude Code adds to its toolkit. Claude uses it when relevant, or you invoke it directly with `/skill-name`. The rule of thumb for when to write one: you keep pasting the same instructions into chat, or a section of your CLAUDE.md has grown into a multi-step procedure rather than a fact.

The practical advantage over CLAUDE.md content is loading cost. CLAUDE.md loads into every session; a skill's body loads only when it's actually invoked, so long reference material costs almost nothing until you need it.

Custom commands and skills have merged: a file at `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md` both create `/deploy` and behave the same way. Skills add extra features — supporting files, invocation control, subagent execution — that plain command files don't have.

## Your first skill

```bash
mkdir -p ~/.claude/skills/summarize-changes
```

Save this to `~/.claude/skills/summarize-changes/SKILL.md`:

```yaml
---
description: Summarizes uncommitted changes and flags anything risky. Use when the user asks what changed, wants a commit message, or asks to review their diff.
---

## Current changes
!`git diff HEAD`

## Instructions
Summarize the changes above in two or three bullet points, then list any risks you notice.
```

The `` !`git diff HEAD` `` line is dynamic context injection: Claude Code runs the command and substitutes its output before Claude ever sees the file. Test it by asking "What did I change?" (automatic invocation) or typing `/summarize-changes` (direct invocation).

## Where skills live and who they're for

| Location | Path | Scope |
|---|---|---|
| Personal | `~/.claude/skills/<name>/SKILL.md` | All your projects |
| Project | `.claude/skills/<name>/SKILL.md` | This project only |
| Plugin | `<plugin>/skills/<name>/SKILL.md` | Wherever the plugin's enabled |
| Enterprise | Deployed via managed settings | Your whole organization |

Project skills are the ones worth committing to version control — they give your whole team the same `/deploy` or `/review-pr` command. Personal skills follow you across every project on your machine.

## Frontmatter fields that matter most

Only `description` is really recommended — it's what Claude matches against to decide when to load the skill automatically. A few others worth knowing:

- **`disable-model-invocation: true`** — only you can invoke it, never Claude automatically. Use this for anything with side effects: `/deploy`, `/commit`, `/send-slack-message`. You don't want the model deciding to deploy because the code "looks ready."
- **`allowed-tools`** — pre-approves specific tools for the turn that invokes the skill, so a `/commit` skill can run `git add` and `git commit` without a permission prompt every time.
- **`context: fork`** — runs the skill in an isolated subagent rather than the main conversation. Useful for research-style skills that would otherwise flood your context with search results.
- **`model`** — override which model runs while this skill is active, useful for cheap, high-frequency skills you don't want burning your best model's budget.

## Reference content vs. task content

Skills split naturally into two shapes. **Reference content** — API conventions, style guides, domain knowledge — runs inline and adds knowledge Claude applies to ongoing work. **Task content** — deployments, commits, code generation — gives step-by-step instructions for a specific action, and is usually paired with `disable-model-invocation: true` since you want to control exactly when it fires.

Keep the body itself lean: once loaded, a skill's content stays in context for the rest of the session (barring compaction), so every line is a recurring token cost. State what to do, not why, the same discipline you'd apply to CLAUDE.md.

## Bundled skills worth knowing

Claude Code ships with skills like `/code-review`, `/debug`, `/batch`, and `/loop` already available. Three work together specifically to run and verify your app against its actual behavior rather than just tests: `/run` launches and drives it, `/verify` confirms a change does what it should, and `/run-skill-generator` records the launch recipe once so later runs don't have to rediscover it.

## Debugging a skill that won't trigger

If Claude doesn't use a skill when you expect it to: check that the description includes the words a user would actually say, confirm the skill shows up when you ask "what skills are available?", and try invoking it directly with `/skill-name` to at least confirm the file itself works. Malformed frontmatter YAML is a common silent failure — the skill body still loads with `/skill-name`, but Claude has no description to match against, so it never triggers automatically. `claude plugin validate` on your skills directory catches this without hunting through files by hand.
