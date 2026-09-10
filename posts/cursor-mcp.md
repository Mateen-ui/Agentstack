---
title: "Cursor + MCP: Connecting External Tools"
slug: "cursor-mcp"
date: "2026-09-05"
excerpt: "How to connect an MCP server to Cursor, the three transport types, static OAuth for providers that need it, and the security practices worth following."
tags: ["cursor", "mcp", "integrations"]
seo:
  primary_keyword: "Cursor MCP"
  secondary_keywords:
    - "Cursor MCP server"
    - "how to add MCP server Cursor"
    - "Cursor mcp.json configuration"
  longtail_keywords:
    - "how to connect MCP server to Cursor"
    - "Cursor MCP allowlist"
    - "Cursor mcp.json examples"
meta_description: "Connecting Cursor to MCP servers: mcp.json configuration, transport types, static OAuth setup, enterprise allowlisting, and security best practices."
---

# Cursor + MCP: Connecting External Tools

Model Context Protocol connects Cursor's agent to external tools and data sources — Google Drive, Notion, a database, your own internal API — so Agent can use them directly during a conversation instead of you manually pasting context in.

## Two ways to install a server

**One-click, from the Marketplace.** Open Customize in the sidebar, browse the Cursor Marketplace for official plugins, and click "Add to Cursor" — it installs and authenticates via OAuth automatically. For community servers, browse cursor.directory.

**Manual, via `mcp.json`.** For custom or self-hosted servers:

```json title=".cursor/mcp.json — local stdio server"
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "mcp-server"],
      "env": { "API_KEY": "value" }
    }
  }
}
```

```json title="Remote HTTP/SSE server"
{
  "mcpServers": {
    "server-name": {
      "url": "http://localhost:3000/mcp",
      "headers": { "API_KEY": "value" }
    }
  }
}
```

Put project-specific servers in `.cursor/mcp.json` and commit it so your team gets the same tools. Put servers you want everywhere in `~/.cursor/mcp.json`.

## The three transports

| Transport | Runs | Deployment | Users | Auth |
|---|---|---|---|---|
| `stdio` | Local | Cursor manages the process | Single user | Manual (env vars) |
| `SSE` | Local or remote | Deployed as a server | Multiple users | OAuth |
| `Streamable HTTP` | Local or remote | Deployed as a server | Multiple users | OAuth |

`stdio` is the right default for a personal tool running on your own machine. Remote transports make sense when a team shares one server instance.

## Config interpolation

`mcp.json` supports variables in `command`, `args`, `env`, `url`, and `headers`:

- `${env:NAME}` — an environment variable
- `${userHome}` — your home directory
- `${workspaceFolder}` — the project root containing `.cursor/mcp.json`
- `${workspaceFolderBasename}` — that folder's name

```json
{
  "mcpServers": {
    "local-server": {
      "command": "python",
      "args": ["${workspaceFolder}/tools/mcp_server.py"],
      "env": { "API_KEY": "${env:API_KEY}" }
    }
  }
}
```

Use this for secrets rather than hardcoding them directly in a file you might commit.

## Static OAuth, for providers that need it

Most OAuth servers work through dynamic client registration automatically. Some — Figma and Linear among them — require a fixed Client ID and a whitelisted redirect URL instead. For those, add an `auth` block:

```json
{
  "mcpServers": {
    "oauth-server": {
      "url": "https://api.example.com/mcp",
      "auth": {
        "CLIENT_ID": "${env:MCP_CLIENT_ID}",
        "CLIENT_SECRET": "${env:MCP_CLIENT_SECRET}",
        "scopes": ["read", "write"]
      }
    }
  }
}
```

Cursor uses fixed OAuth redirect URLs you register with the provider: `https://www.cursor.com/agents/mcp/oauth/callback` for web and Cloud Agents, `http://localhost:8787/callback` for the desktop app. Register both if your team authenticates from either surface.

## Approval, not blind trust

Every MCP connection needs your approval once. After that, **each individual tool call still needs its own approval** unless you've pre-approved it via an MCP allowlist — connecting a server doesn't hand it a blank check. In Auto-review Run Mode, allowlisted tools run immediately and everything else routes through the classifier, the same pattern as shell commands. See [Run Modes](/posts/cursor-agent-mode) for how that classifier decision actually works.

## Enterprise controls

Team and Enterprise admins manage two separate things: **distribution** (making a server available to team members via a team marketplace) and **policy** (an MCP Allowlist restricting which servers and tools users may run at all, configured in Team Settings). Allowlist entries approve local `stdio` servers by command pattern and remote servers by URL pattern, with optional per-server tool allowlists — leaving a tool allowlist empty permits every tool from that approved server. Local servers also get a per-server network mode: allow all, allowlist-only, deny all, or no sandboxing.

## Security practices worth following

- Only install servers from developers or repositories you actually trust — Cursor's Marketplace listing doesn't imply an independent security audit of every server
- Review what data and APIs a server can reach before connecting it, especially for anything touching sensitive systems
- Use API keys scoped to the minimum permissions the server needs, not a broad admin credential
- For sensitive integrations, read the server's source before connecting — MCP servers can access external services and execute code on your behalf, and "verified in the Marketplace" is not the same guarantee as "audited"

## Debugging a server that won't connect

Open the Output panel (`Cmd+Shift+U`) and select "MCP Logs" from the dropdown — it shows server initialization, tool calls, and error messages in one place. A server that crashes or times out doesn't take down others; Cursor isolates failures per-server, so check that specific server's logs rather than assuming a systemic problem.
