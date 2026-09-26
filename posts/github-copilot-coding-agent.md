---
title: "GitHub Copilot Cloud Agent: Autonomous Background Development"
slug: "github-copilot-coding-agent"
date: "2026-09-05"
excerpt: "How to assign real tasks to Copilot's cloud agent, its actual limits (59 minutes, one repo, one branch), and how it compares to agent mode."
tags: ["github-copilot", "coding-agent", "cloud-agent"]
seo:
  primary_keyword: "GitHub Copilot coding agent"
  secondary_keywords:
    - "GitHub Copilot cloud agent"
    - "assign issue to Copilot"
    - "Copilot cloud agent limitations"
  longtail_keywords:
    - "how to assign a task to GitHub Copilot cloud agent"
    - "GitHub Copilot cloud agent execution time limit"
    - "GitHub Copilot cloud agent vs agent mode"
meta_description: "How GitHub Copilot's cloud agent (coding agent) works: assigning tasks, the 59-minute execution limit, customization with hooks and skills, and real limitations."
---

# GitHub Copilot Cloud Agent: Autonomous Background Development

Copilot's cloud agent — what many still call "coding agent" — works independently in the background to complete development tasks, much like delegating an issue to a human teammate. It researches the repository, creates an implementation plan, makes code changes on a branch, and can open a pull request when it's ready, all inside its own ephemeral GitHub Actions-powered environment.

## How to assign it work

Four entry points, all covered in GitHub's own documentation:

- **Assign a GitHub issue to Copilot**, the same way you'd assign it to a teammate.
- **Ask Copilot Chat on GitHub.com** to research, plan, and make changes — you can request a pull request immediately or let it iterate first.
- **Ask from other surfaces**, including VS Code.
- **@mention `@copilot` in a comment** on an existing pull request to ask for further changes.

You can also set up automations to run cloud agent on a schedule or in response to events like an issue being opened, and assign security alerts to it directly from security campaigns.

## Why this differs from a traditional IDE assistant

The framing GitHub itself uses is worth internalizing: with an IDE assistant, coding happens locally and synchronously, and everything about the session besides what you actually commit is untracked and lost to time. With cloud agent, the entire loop — research, planning, code changes — happens on GitHub, every step lands in a commit and shows up in visible logs, and branch creation, commit messages, and pushes are automated rather than manual chores. That transparency is also what opens the door to team collaboration mid-task, not just a faster version of solo work.

## The limits that actually shape how you should use it

Four constraints from GitHub's own documentation define what cloud agent is and isn't suited for:

- **One repository per task.** It cannot make coordinated changes across multiple repos in a single run.
- **One branch, one pull request per task.**
- **A hard 59-minute execution ceiling per session** — not configurable upward. If a task risks running long, break it into smaller, more focused tasks rather than hoping it finishes in time.
- **Limited context by default.** It only sees the repository it's working in unless you explicitly widen MCP access to cover more.

Branch protection rules that restrict commit authorship can block cloud agent entirely unless you explicitly add it as a bypass actor — worth checking before you assign it a task and wonder why nothing happened.

## Customization options

- **Custom instructions** — repository- or organization-level context on how to build, test, and validate changes.
- **MCP servers** — the GitHub MCP server and Playwright MCP server are enabled by default; repository-level MCP settings apply to both cloud agent and Copilot code review.
- **Custom agents** — specialized versions of Copilot tuned for specific task types (a frontend-focused agent, a documentation agent, a testing agent), each with its own prompts and tool access.
- **Hooks** — custom shell commands at defined points during execution, for validation, logging, security scanning, or workflow automation.
- **Skills** — packaged instructions, scripts, and resources for specialized tasks.
- **Copilot Memory** (public preview, Pro/Pro+/Max plans) — lets cloud agent retain useful details it's worked out about a repository across sessions, rather than rediscovering context from scratch every time.

## What it costs

Cloud agent consumes GitHub Actions minutes and AI credits; credit consumption depends on the model used and tokens processed. Within your plan's included minutes and credits, there's no additional charge — worth checking your plan's limits before assigning it a heavy batch of tasks, since Actions minutes specifically can run out faster than expected on a busy repo.

## Where this fits next to agent mode

Cloud agent and [agent mode](/posts/github-copilot-agent-mode) aren't competing for the same job. Reach for cloud agent when a task is well-scoped enough to describe in an issue and doesn't need your live attention — the "nice to have" backlog items that would otherwise sit untouched. Reach for agent mode when you want to stay in the loop, iterate turn by turn, or work on something exploratory that's hard to fully specify up front. Many teams use both: cloud agent clearing routine backlog work in parallel while agent mode handles the day's active feature work.
