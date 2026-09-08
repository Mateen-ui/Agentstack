---
title: "Claude Code + MCP: Connecting External Tools"
slug: "claude-code-mcp"
date: "2026-09-05"
excerpt: "How to connect an MCP server to Claude Code end to end, where configuration actually lives on disk, and how to fix the connection errors you'll actually hit."
tags: ["claude-code", "mcp", "integrations"]
seo:
  primary_keyword: "Claude Code MCP"
  secondary_keywords:
    - "Claude Code MCP server"
    - "how to add MCP server Claude Code"
    - "Model Context Protocol Claude Code"
  longtail_keywords:
    - "how to connect MCP server to Claude Code"
    - "Claude Code MCP failed to connect"
    - "Claude Code mcp.json configuration"
meta_description: "Connecting Claude Code to MCP servers: the claude mcp add command, scopes, .mcp.json format, OAuth sign-in, and fixes for the most common connection failures."
---

# Claude Code + MCP: Connecting External Tools

The Model Context Protocol lets Claude Code use tools beyond its built-in set — searching an issue tracker, querying a database, controlling a browser — by connecting to MCP servers that run on your machine or as hosted services.

## Connect a server in three commands

```bash
claude mcp add --transport http claude-code-docs https://code.claude.com/docs/mcp
claude mcp list
claude
```

`claude mcp add` registers the server; `claude mcp list` shows its connection status. A local `stdio` server — one that runs as a subprocess rather than a hosted URL — looks slightly different:

```bash
claude mcp add playwright -- npx -y @playwright/mcp@latest
```

Everything after `--` is the command Claude Code runs to start the server.

## Reading connection status

| Status | Meaning |
|---|---|
| `✔ Connected` | Ready to use |
| `! Connected · tools fetch failed` | Connected but couldn't list tools — run `claude mcp get <name>` for the detail |
| `! Needs authentication` | Reachable but needs a browser sign-in or a token |
| `✘ Failed to connect` | Server didn't respond |
| `⏸ Pending approval` | A project-scoped server you haven't approved yet |

## Where configuration actually lives

| Scope | File | Available to |
|---|---|---|
| `local` (default) | `~/.claude.json`, under this project's entry | Only you, this project |
| `project` | `.mcp.json` in the project root | Everyone who clones the repo |
| `user` | `~/.claude.json`, top-level `mcpServers` key | Only you, all projects |

`project` scope is the one worth committing to version control — teammates who clone the repo get a one-time approval prompt, then it connects for them too. Scope is fixed at add time; changing it means removing and re-adding with a different `--scope` flag.

## Editing `.mcp.json` directly

Worth doing by hand for project-scope servers since the file is checked in and doubles as configuration-as-code:

```json
{
  "mcpServers": {
    "claude-code-docs": {
      "type": "http",
      "url": "https://code.claude.com/docs/mcp"
    },
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

The first time Claude Code sees a project-scoped server, it asks you to approve it — so a repo you clone can't launch processes on your machine without consent.

## Servers that require sign-in

Hosted services like Sentry, Linear, and Notion run behind OAuth. Add the server URL, then run `/mcp` inside a session, select the server, and choose Authenticate — your browser opens the sign-in page. Servers that use a static token instead take it at add time with `--header "Authorization: Bearer <token>"`.

## Fixing the connection errors you'll actually hit

- **"No MCP servers configured"** — usually means you ran `claude mcp add` from a different project (local-scoped servers are tied to the project directory), or edited a config file at the wrong path. The only correct files are `~/.claude.json` and `<project>/.mcp.json`.
- **"Failed to connect" / "Connection error"** — for HTTP servers, `curl -I <url>` tells you a lot: a `404`/`405` means the server is up (many MCP endpoints only answer POST), a `401`/`403` means it's up and needs auth, no response at all means a network or URL problem. For stdio servers, run the configured command directly in your terminal to surface the underlying error.
- **Connection timed out at startup** — a stdio server's first run can be slow while `npx` downloads the package. Raise the default 30-second timeout with `MCP_TIMEOUT=60000`.
- **Server connects but no tools appear** — usually a missing required environment variable, like an API key. Pass it with `--env KEY=value` on `claude mcp add`.

## Scoping MCP to a subagent instead of the whole session

You don't have to expose every server to the main conversation. In a subagent's frontmatter, the `mcpServers` field lets you attach a server — inline or by reference — that only that subagent sees, keeping its tool descriptions out of your main context entirely:

```yaml
---
name: browser-tester
description: Tests features in a real browser using Playwright
mcpServers:
  - playwright:
      type: stdio
      command: npx
      args: ["-y", "@playwright/mcp@latest"]
---
```

This matters more than it sounds: every connected server's tool names and descriptions load into every session's context, so scoping heavy or rarely-needed servers to the subagents that actually use them keeps your main conversation's context budget free. See [subagents](/posts/claude-code-subagents) for the rest of what scoped configuration like this can do.
