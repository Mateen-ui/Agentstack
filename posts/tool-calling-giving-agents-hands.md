---
title: "Tool Calling: Giving Agents Hands"
slug: "tool-calling-giving-agents-hands"
date: "2026-09-05"
excerpt: "The gap between an agent that can describe an action and one that can take it safely is mostly a schema-design problem, not a model problem."
tags: ["tool-use", "function-calling", "MCP"]
seo:
  primary_keyword: "AI agent tool calling"
  secondary_keywords:
    - "function calling best practices"
    - "MCP tool calling"
    - "AI agent schema design"
    - "how tool calling works in AI agents"
  longtail_keywords:
    - "tool calling best practices for LLM agents 2026"
    - "how to design JSON schemas for AI agent tools"
    - "what is the Model Context Protocol MCP"
meta_description: "How tool calling actually works in 2026, why schema quality determines reliability more than model choice, and the design rules that keep agents from hallucinating calls."
---

# Tool Calling: Giving Agents Hands

Tool calling is the mechanism that separates an agent from a chatbot: the ability to retrieve real-time data, run computations, and act on external systems instead of just describing what it would do. The critical architectural detail is easy to state and easy to forget: the model never executes anything directly. It outputs a structured tool call, and your application runtime is the one that actually runs it. That separation is the entire foundation of safe agent design.

## Where reliability actually lives

By 2026, every major frontier model supports native function calling with typed schemas, so the "does the model support tools" question is settled. The question that matters now is design quality, and it lives in three places:

1. **The JSON schema** you give the model for each tool.
2. **The plain-English descriptions** attached to the tool and its parameters.
3. **The error-handling logic** in your agent loop.

Vague parameter descriptions are the single biggest driver of hallucinated calls — get those three things right and a well-tuned model reliably picks the correct function, fills in valid arguments, and recovers gracefully when a call fails.

## MCP changed what "hand-writing schemas" means

The Model Context Protocol, open-sourced by Anthropic and since moved under vendor-neutral governance, has become the standard way tools are exposed to agents in 2026 — often described as a universal connector that lets any MCP-compatible agent discover and invoke any MCP-compatible server. Because MCP calls are typed by default, a lot of what used to be manual JSON-schema authoring and parameter-hallucination firefighting is now largely handled by the protocol itself. What's left for you to get right is tool *design*, not schema plumbing.

## Design rules worth following

- **One responsibility per tool.** A tool that does one clearly named thing is easier for the model to select correctly than a multi-purpose tool with a dozen optional parameters.
- **Idempotent where possible.** If a call can safely be retried without side effects, retries stop being a design risk.
- **A confirmation step or dry-run mode before destructive actions.** Anything that deletes, charges, or sends should not be a single unguarded call.
- **A hard cap on tool calls per run** — a common pattern is 10–15 — with graceful termination if the loop exceeds it, plus deduplication logic so an agent that calls the same function with the same arguments twice in a row surfaces the loop instead of repeating it silently.
- **Skip tools when you don't need them.** If the answer is already in the model's training data, can be injected as plain text, or the task is purely generative writing, a tool call adds latency and failure surface for no benefit. Tools exist for live external data and real-world side effects.

## The security angle

Tool loops expanded the threat model considerably — prompt injection now sits at the top of the OWASP LLM Top 10 precisely because tools connect the model to filesystems, shells, and credentials, not just text output. Strict schema enforcement (OpenAI's "strict mode," Anthropic's default schema conformance) blocks malformed calls from reaching execution, but that's necessary, not sufficient — it stops malformed calls, not malicious ones. Runtime interception, permission ladders, and pre-tool hooks that gate risky actions before they run are what actually contain a compromised loop.

The practical shift for 2026: tool calling reliability is now a design discipline you own, not a model capability you wait for.
