# sandbox-agent

Cloudflare Worker: natural language → Workers AI code generation → SSE streaming

## Live
```
https://sandbox.agentknowledgeworkers.com
```

## Architecture
```
User request → Workers AI (@cf/meta/llama-3.1-8b-instruct) → generated JS code
→ SSE stream: [thinking] → [code] → [stdout/stderr] → [done]
→ KV execution history per user
```

## Note on execution
CF Workers permanently block `eval()` and `new Function()` for security.
The production execution path uses Cloudflare Containers (ContainerMcpAgent DO).
This Worker handles: auth, AI generation, SSE streaming, KV history.

## Deploy
```bash
npm install -g wrangler
wrangler deploy
```