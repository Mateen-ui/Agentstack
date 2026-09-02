---
title: "Agentic Coding Terms You'll Actually Run Into (A Working Glossary)"
date: "2026-08-31"
excerpt: "Agent loop, MCP, context window, sandboxing — the vocabulary that shows up in every tool's docs, defined in plain language."
tags: ["fundamentals", "reference"]
---

The vocabulary around AI coding agents got dense fast. This is a working reference for the terms that actually show up in tool docs and comparisons — not an exhaustive AI glossary, just the words you'll hit while evaluating or using these tools.

## Agent loop

The core cycle every coding agent runs: **plan** the approach, **act** by editing files or running commands, **observe** the result (test output, errors, file state), and **revise** if something didn't work. A single task might run this loop many times before the agent reports back. This is the defining mechanic that separates an "agent" from an autocomplete tool.

## Agent mode / Composer

The feature inside IDE-native tools (Cursor's Composer, for example) that hands control to the agent for a broader, multi-file task, as opposed to line-by-line inline suggestions. You describe the task, the agent proposes and applies changes across however many files it needs to touch.

## Context window

The amount of text — code, conversation history, file contents — a model can actually "see" at once when working on a task. A larger context window lets an agent reason about more of your codebase simultaneously, but it isn't free: some tools cap how much history or memory an agent retains between sessions specifically to control cost and reduce the risk of stale or sensitive information quietly accumulating.

## MCP (Model Context Protocol)

An open standard for connecting an AI agent to external tools and data sources — a database, a project management tool, an internal API — without custom-building the integration for every combination of agent and tool. If a tool's docs mention "MCP servers," it means the agent can be extended to talk to whatever you connect through that protocol.

## Sandboxing

Running an agent's shell commands and file edits inside an isolated environment instead of directly on your real machine or production systems. This limits the damage a mistaken or manipulated command can do — a sandboxed agent that gets tricked into running something destructive only destroys the sandbox.

## Slopsquatting

An attack where someone registers a package name that AI models commonly hallucinate when suggesting a dependency, filling it with malicious code and betting an agent (or a developer copying its suggestion) installs it without checking that the package is real.

## Prompt injection

Hidden instructions planted somewhere an agent will read — a code comment, a README, a file — intended to make the agent do something the person who wrote the visible prompt didn't ask for, like exfiltrating a secret. It's the agentic-AI equivalent of a SQL injection: untrusted input being interpreted as instructions instead of data.

## Background / cloud agent

An agent that runs on a remote, configured copy of your repository — its own environment, dependencies, and secrets — rather than only inside your local editor. This is what makes it possible to kick off several tasks in parallel and come back to finished pull requests instead of watching one task at a time run locally.

## Terminal-native vs. IDE-native

Two broad shapes of coding agent. Terminal-native agents (Claude Code, Codex CLI) run as a command-line process with no editor UI, narrating their plan and actions as plain text. IDE-native agents (Cursor, Windsurf) live inside a full code editor, showing diffs and changes inline as they happen. Neither is strictly better — they suit different workflows, and many developers use both.

## Least privilege (as applied to agents)

The security principle that an agent should only have access to the files, credentials, and commands it actually needs for the task in front of it — not standing, unrestricted access to your whole repository and shell "just in case." Increasingly treated as a core selection criterion for choosing a tool, not just a configuration afterthought.
