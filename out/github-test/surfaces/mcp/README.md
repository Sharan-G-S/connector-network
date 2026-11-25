# Tasks API — MCP server

A stdio MCP server exposing 19 tool(s), one per operation.

```bash
CN_BASE_URL=https://api.tasks.example/v1 CN_TOKEN=... node server.mjs
```

Speaks newline-delimited JSON-RPC: `initialize` → `tools/list` → `tools/call`.
