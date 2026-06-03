# sandbox-agent

Cloudflare Worker — natural language to code generation via Workers AI with SSE streaming

## Stack

- Backend: `coworkers-agent` Worker at agentknowledgeworkers.com
- AI: `@cf/meta/llama-3.1-8b-instruct` via Cloudflare Workers AI (no Anthropic key)
- Auth: email allowlist + session cookie

## Part of [managedcoworkers.com](https://managedcoworkers.com)
