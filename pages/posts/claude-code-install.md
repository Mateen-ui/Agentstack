---
title: "How to Install Claude Code (2026 Guide)"
slug: "claude-code-install"
date: "2026-09-05"
excerpt: "System requirements, every install method for macOS, Linux, and Windows, and how to verify, update, and uninstall Claude Code."
tags: ["claude-code", "install", "setup"]
seo:
  primary_keyword: "install Claude Code"
  secondary_keywords:
    - "Claude Code system requirements"
    - "Claude Code Windows install"
    - "claude code npm install"
  longtail_keywords:
    - "how to install Claude Code on Windows"
    - "Claude Code install command not found"
    - "how to update Claude Code"
meta_description: "Every way to install Claude Code — native installer, Homebrew, WinGet, apt/dnf/apk, and npm — plus system requirements, verification, updates, and uninstall steps."
---

# How to Install Claude Code (2026 Guide)

Claude Code runs on macOS 13+, Windows 10 1809+/Server 2019+, Ubuntu 20.04+, Debian 10+, and Alpine Linux 3.19+, needs 4 GB+ RAM on an x64 or ARM64 processor, an internet connection, and a supported shell (Bash, Zsh, PowerShell, or CMD). You'll also need a Claude Pro, Max, Team, or Enterprise subscription, a Claude Console account, or access through a supported cloud provider — the free Claude.ai plan doesn't include Claude Code.

## The fastest path: native install

The recommended install method for macOS, Linux, and WSL is a single curl command:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

On Windows PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

On Windows CMD:

```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

Native installations auto-update in the background, so this is the lowest-maintenance option. If the install fails with a `403`, a `syntax error near unexpected token '<'`, or another curl error, Anthropic's troubleshooting guide maps specific errors to fixes.

## Alternative install methods

- **Homebrew**: `brew install --cask claude-code` (stable channel) or `claude-code@latest` for the newest releases as they ship. Homebrew installs don't auto-update — run `brew upgrade claude-code` periodically.
- **WinGet**: `winget install Anthropic.ClaudeCode`. Also doesn't auto-update; run `winget upgrade Anthropic.ClaudeCode` to refresh.
- **Linux package managers**: signed apt, dnf, and apk repositories are available for Debian/Ubuntu, Fedora/RHEL, and Alpine, each with `stable` and `latest` channels. These require verifying the Anthropic signing key fingerprint (`31DD DE24 DDFA B679 F42D 7BD2 BAA9 29FF 1A7E CACE`) before trusting it.
- **npm**: `npm install -g @anthropic-ai/claude-code`. As of v2.1.198 this requires Node.js 22+. The npm package pulls in a native binary per platform — it doesn't run through Node at execution time. Never use `sudo npm install -g`, since that risks permission issues; fix permission errors properly instead.

## Windows: native vs. WSL

You can run Claude Code natively on Windows or inside WSL:

| Option | Requires | Sandboxing | Best for |
|---|---|---|---|
| Native Windows | None (Git for Windows optional) | Not supported | Windows-native projects |
| WSL 2 | WSL 2 enabled | Supported | Linux toolchains, sandboxed execution |
| WSL 1 | WSL 1 enabled | Not supported | Fallback if WSL 2 unavailable |

On native Windows, installing Git for Windows is optional but recommended — it gives Claude Code the Bash tool via Git Bash. Without it, Claude Code falls back to a PowerShell tool for running shell commands.

## Verify the install

```bash
claude --version
```

A working install prints a version number followed by `(Claude Code)`. For a deeper check — installation health, settings-file validation, Remote Control eligibility — run `claude doctor`, which prints diagnostics without starting a session.

## Updates

Native installs check for updates on startup and periodically while running, downloading in the background and applying them on your next launch. You can pin a release channel with the `autoUpdatesChannel` setting (`"latest"` for immediate releases or `"stable"` for a build about a week behind that skips major-regression releases), or set a version floor with `minimumVersion` so a channel switch never downgrades you. Homebrew, WinGet, and Linux package manager installs require manual updates through their own commands.

To disable auto-updates entirely (useful if you distribute Claude Code through your own channel), set `DISABLE_AUTOUPDATER` or, for a harder block on manual updates too, `DISABLE_UPDATES` in your settings' `env` block.

## Uninstalling

Removal steps differ by install method — native installs are removed by deleting `~/.local/bin/claude` and `~/.local/share/claude`; Homebrew, WinGet, and Linux package managers each have their own removal command. Removing `~/.claude` and `~/.claude.json` deletes all settings, allowed tools, MCP configurations, and session history, so back up anything you want to keep first. If the VS Code extension, JetBrains plugin, or desktop app is still installed, they'll recreate `~/.claude/` on their next run — uninstall those first for a clean removal.
