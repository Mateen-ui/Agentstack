---
title: "Cursor Tutorial: Your First Session"
slug: "cursor-tutorial"
date: "2026-09-05"
excerpt: "A hands-on walkthrough from installing Cursor to understanding a codebase, making your first change, and knowing when to switch on Plan Mode."
tags: ["cursor", "tutorial", "getting-started"]
seo:
  primary_keyword: "Cursor tutorial"
  secondary_keywords:
    - "Cursor quickstart"
    - "how to use Cursor AI"
    - "Cursor first steps"
  longtail_keywords:
    - "Cursor tutorial for beginners"
    - "how to make your first change in Cursor"
    - "Cursor Plan Mode explained"
meta_description: "A beginner-friendly Cursor tutorial: install, sign in, explore a codebase with Agent, make a small change, review the diff, and when to switch to Plan Mode."
---

# Cursor Tutorial: Your First Session

This walks through using Cursor for the first time, from install to your first reviewed change.

## Step 1: Install and sign in

**macOS** needs 12 (Monterey) or later, with a native `.dmg` installer supporting both Apple Silicon and Intel. **Windows** needs 10 or later, with a native `.exe` installer. **Linux** installs are recommended via apt (Debian/Ubuntu) or dnf (RHEL/Fedora) package repositories rather than the portable AppImage, since the package managers provide desktop icons, automatic updates, and CLI tools out of the box:

```bash
# Debian/Ubuntu
curl -fsSL https://downloads.cursor.com/keys/anysphere.asc | gpg --dearmor | sudo tee /etc/apt/keyrings/cursor.gpg > /dev/null
echo "deb [arch=amd64,arm64 signed-by=/etc/apt/keyrings/cursor.gpg] https://downloads.cursor.com/aptrepo stable main" | sudo tee /etc/apt/sources.list.d/cursor.list > /dev/null
sudo apt update && sudo apt install cursor
```

Download from [cursor.com](https://cursor.com), open the app, sign up or sign in, then open a project folder with File > Open Folder.

## Step 2: Ask Agent to explain your codebase

Open Agent with `Cmd+I` (or `Ctrl+I` on Windows/Linux) and ask:

```text
Explain this codebase. Point me to the main entry points, key modules,
and anything I should read before making changes.
```

Agent searches your repo, reads relevant files, and summarizes how the project fits together — one of the fastest ways to orient yourself in code you didn't write.

## Step 3: Make one small, safe change

```text
Suggest three small, safe improvements in this codebase. Explain the
tradeoffs and wait for me to choose one.
```

Good first tasks are low-risk: copy fixes, small UI issues, minor cleanup. If you already know what you want changed, just describe it directly and the result you're after.

## Step 4: Review the diff

Cursor shows proposed changes as a diff, not a silent edit. When Agent finishes, review the diff and ask it to run whatever checks your project already has — tests, the type checker, linting, or a local build:

```text
run the test suite and tell me if anything broke
```

## Step 5: Use Plan Mode for anything bigger

Once the basics feel natural, switch to **Plan Mode** (press `Shift+Tab` in the agent input) for tasks that span multiple files, need research, or should be approved before any code gets written. Instead of editing immediately, Cursor will:

1. Research your codebase for relevant files
2. Ask clarifying questions about requirements
3. Produce a detailed implementation plan
4. Wait for your approval before building anything

This is the difference that matters most between a quick fix and a real feature: small changes don't need a plan reviewed first, but anything touching several files or an unfamiliar part of the codebase usually benefits from one.

## Step 6: Try a long-running goal

For work that spans several turns — "fix all flaky tests and make CI green" — use `/goal` to give Agent a persistent objective it keeps pursuing until it's fully done, rather than treating each message as a one-off task.

## Habits that make a real difference

- **Be specific about the outcome**, not just the symptom — "fix the login bug where users see a blank screen after wrong credentials" beats "fix the bug."
- **Let Agent explore before it edits.** Ask it to analyze the relevant module first; grounded context produces better changes than an immediate blind edit.
- **Use checkpoints, not just git, for exploratory work.** Checkpoints are automatic, local-only snapshots you can preview and restore from mid-session without touching your actual git history.
- **Queue follow-ups instead of interrupting.** While Agent works, type your next instruction and press Enter to queue it — Agent processes queued messages in order once the current task finishes, or press `Cmd+Enter` to interrupt immediately if something needs redirecting right now.

## What to look at next

Once you're comfortable with the basics, the highest-leverage next steps are usually [Rules and Memories](/posts/cursor-rules) for persistent project context, [Run Modes](/posts/cursor-agent-mode) for controlling how much Agent does without asking, and [MCP](/posts/cursor-mcp) for connecting Cursor to tools beyond your local files.
