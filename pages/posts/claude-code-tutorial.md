---
title: "Claude Code Tutorial: Your First Session"
slug: "claude-code-tutorial"
date: "2026-09-05"
excerpt: "A hands-on walkthrough from installing Claude Code to making your first code change, committing it, and knowing what to try next."
tags: ["claude-code", "tutorial", "getting-started"]
seo:
  primary_keyword: "Claude Code tutorial"
  secondary_keywords:
    - "Claude Code quickstart"
    - "how to use Claude Code"
    - "Claude Code first steps"
  longtail_keywords:
    - "Claude Code tutorial for beginners"
    - "how to make your first code change with Claude Code"
    - "Claude Code essential commands"
meta_description: "A beginner-friendly Claude Code tutorial: install, log in, ask your first question, make a code change, use git, and the essential commands to know."
---

# Claude Code Tutorial: Your First Session

This walks through using Claude Code for the first time, from install to your first committed change.

## Step 1: Install and log in

Install with the native installer (see the [install guide](/posts/claude-code-install) for platform-specific options), then open a terminal in a project directory and run:

```bash
claude
```

You'll be prompted to log in on first use. If you've set the `ANTHROPIC_API_KEY` environment variable, Claude Code skips the browser login and asks you to approve the key instead. You can log in with a Claude Pro/Max/Team/Enterprise subscription, a Claude Console account, or through a supported enterprise cloud provider (Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry).

## Step 2: Ask your first question

Claude Code reads your project files as needed — you don't manually add context. Try:

```text
what does this project do?
```

or something more targeted:

```text
where is the main entry point?
```

You can also ask Claude Code about its own capabilities directly: "what can Claude Code do?" or "how do I create custom skills in Claude Code?"

## Step 3: Make a change

```text
add a hello world function to the main file
```

Claude Code locates the right file and shows you the change. Auto mode — the default starting permission mode on Pro, Max, and Team plans for interactive terminal sessions — lets a background classifier review most actions instead of prompting you every time; on other plans, Manual mode starts instead and asks before edits. Press `Shift+Tab` at any point to cycle permission modes for the current session.

## Step 4: Use git conversationally

```text
what files have I changed?
commit my changes with a descriptive message
create a new branch called feature/quickstart
```

Claude Code handles the actual git commands; you describe the intent.

## Step 5: Fix a bug or refactor

Describe the problem in plain language rather than pointing at line numbers:

```text
there's a bug where users can submit empty forms - fix it
refactor the authentication module to use async/await instead of callbacks
write unit tests for the calculator functions
```

For a bug, Claude Code locates the relevant code, traces the issue, implements a fix, and runs tests if any exist.

## Essential commands to know

**From your shell** (before starting or resuming a session):

| Command | What it does |
|---|---|
| `claude` | Start interactive mode |
| `claude "task"` | Start with an initial prompt |
| `claude -p "query"` | Run one query, then exit |
| `claude -c` | Continue the most recent conversation in this directory |
| `claude -r` | Resume a previous conversation |

**Inside a running session:**

| Command | What it does |
|---|---|
| `/clear` | Clear conversation history |
| `/help` | Show available commands |
| `/exit` or Ctrl+D twice | Exit Claude Code |

See the full [commands reference](/posts/claude-code-commands) for everything else.

## Habits that make a real difference

- **Be specific.** "Fix the login bug where users see a blank screen after wrong credentials" gets a better result than "fix the bug."
- **Break big tasks into steps.** Numbered instructions in one message work well for multi-part tasks.
- **Let Claude explore before it edits.** Asking it to "analyze the database schema" first, before asking for a change, gives it grounded context to work from.
- **Use `/` to see what's available.** Both built-in commands and any skills you've added show up there, with Tab completion.

## What to look at next

Once the basics feel natural, the highest-leverage next steps are usually [CLAUDE.md and auto memory](/posts/claude-code-tutorial#claude-md) for persistent project context, [skills](/posts/claude-code-skills) for packaging repeatable workflows, and [MCP](/posts/claude-code-mcp) for connecting Claude Code to tools beyond your local filesystem.
