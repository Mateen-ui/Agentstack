---
title: "Claude Code Security: How It Actually Protects Your Code"
slug: "claude-code-security"
date: "2026-09-05"
excerpt: "The permission system, sandboxing, and prompt-injection protections behind Claude Code — and the best practices worth adopting before you give it broad access to a real repo."
tags: ["claude-code", "security"]
seo:
  primary_keyword: "Claude Code security"
  secondary_keywords:
    - "Claude Code permissions"
    - "Claude Code sandboxing"
    - "Claude Code prompt injection"
  longtail_keywords:
    - "is Claude Code safe to use"
    - "Claude Code security best practices"
    - "how does Claude Code protect against prompt injection"
meta_description: "How Claude Code's permission system, sandboxing, and prompt-injection protections work, plus practical security best practices for using it on real codebases."
---

# Claude Code Security: How It Actually Protects Your Code

Claude Code only has the permissions you grant it, and you're responsible for reviewing what it proposes before approving. That's the baseline the rest of the security model builds on.

## The permission architecture

In Manual mode, Claude Code starts read-only. Editing files, running tests, or executing commands requires your approval first, and you choose whether to approve once or allow it going forward. A built-in set of read-only commands (`ls`, `cat`, `git status`) runs without asking.

In auto mode — the default starting mode on Pro, Max, and Team plans — a separate classifier model reviews actions instead of you and blocks the ones it judges unsafe, following a defined set of rules for what it approves outright, what it escalates to the classifier, and what still needs your explicit approval. Your own ask/deny rules still apply on top, and your organization can turn auto mode off entirely.

## Built-in protections

- **Sandboxed Bash tool** — filesystem and network isolation for shell commands, configurable with `/sandbox`, that reduces permission prompts while maintaining containment.
- **Working directory boundary** — in Manual mode, Claude Code can only write inside the folder it was started in (and subfolders), and asks before reading paths outside that boundary at all.
- **Accept Edits mode** — auto-approves file edits and a fixed set of filesystem commands (`mkdir`, `touch`, `rm`, `mv`, `cp`, `sed`) scoped to the working directory; anything else, or anything outside that path, still prompts.
- **Prompt fatigue mitigation** — allowlisting frequently-used safe commands per-user, per-codebase, or per-organization, so you're not re-approving the same harmless command every session.

## Prompt injection protections

Prompt injection — an attacker embedding instructions in content Claude Code reads, aiming to hijack its behavior — is the primary way an agent with tool access gets exploited. Claude Code's defenses:

- **Context-aware analysis** that looks at the full request rather than pattern-matching in isolation
- **Isolated context windows for web fetch**, so a malicious page can't inject instructions directly into your main conversation
- **Network command approval** — `curl` and `wget` aren't auto-approved by default even for otherwise-trusted sessions; they prompt in Manual mode like any other non-read-only command
- **Trust verification** on first-time codebase runs and new MCP servers — a repo you clone can't silently launch processes or connect servers without your explicit approval

Practical best practices layered on top: review suggested commands before approving, avoid piping untrusted content directly into a session, verify changes to genuinely critical files by hand, and use VMs when interacting with external web services through Claude Code.

## MCP-specific risk

The list of allowed MCP servers lives in your own source-controlled settings, which is deliberate — it means the servers Claude Code can reach are visible in your repo, not hidden in some global config. Anthropic reviews connectors against listing criteria before adding them to the official directory, but does not security-audit or manage any individual MCP server. The practical implication: write your own MCP servers or use ones from providers you actually trust, and configure per-server permissions rather than granting broad access by default.

## Cloud execution security

Claude Code on the web runs each session in an isolated, Anthropic-managed VM by default, with network access limited and configurable down to specific domains, credentials handled through a secure proxy with scoped tokens rather than your raw GitHub token, git pushes restricted to the current branch, and all operations logged for audit. Sessions your organization routes to a self-hosted environment instead run on your own infrastructure, where isolation and network egress become your deployment's responsibility rather than Anthropic's.

## Security best practices for teams

- Use managed settings to enforce organization-wide permission standards rather than relying on individual configuration
- Share approved permission configurations through version control so the whole team inherits the same baseline
- Monitor usage through OpenTelemetry metrics rather than assuming default behavior is being followed
- Audit or block mid-session settings changes with `ConfigChange` hooks — see [hooks](/posts/claude-code-hooks) for the mechanics
- For genuinely sensitive repositories, consider dev containers for an additional isolation layer beyond the built-in sandbox

## Reporting a vulnerability

If you find a security issue in Claude Code itself: don't disclose it publicly, report it through Anthropic's HackerOne program with detailed reproduction steps, and allow time for a fix before any public disclosure.

No permission system, sandbox, or classifier makes an agent with real tool access risk-free — the honest framing is significant risk reduction, not elimination. The practices above are what keep that risk proportional to what you're actually asking Claude Code to do.
