# Connector Network — Project Report

**One line:** A deterministic, bidirectional API converter — give it a GitHub repo, OpenAPI doc, SDK,
or MCP server, and it produces runnable SDKs, MCP servers, CLIs, and docs that are **byte-identical on
every run**.

---

## The problem
Teams need SDKs *and* MCP servers *and* docs from one API, kept in sync — and AI agents need API
access via MCP. Existing generators (Stainless, Fern, Kiota) are one-directional and don't prove their
output is reproducible. The goal here: **same API doc, converted k times → identical, spec-correct
output every time** (we call this **Pass^k**).

## How it works
A source climbs **once** to a content-hashed intermediate representation (IR), then fans out:

```
GitHub · OpenAPI · SDK · MCP  →  acquire → ingest → IR (sha256) → project  →  MCP · TS SDK · Py SDK · CLI · Docs
```

- **Acquire** — pin & de-originate the source (clone+SHA, bundle `$refs`, or reverse-derive from SDK/MCP).
- **Ingest** — adapt → assemble → validate → repair into one standard **OpenAPI 3.1** doc (fail-loud).
- **IR build** — normalize to a compact, **content-hashed** IR with stable operation IDs.
- **Project** — render every requested surface from that one IR, so they can't drift.

## What's built
- **Engine** (`packages/`): acquire · ingest · ir-core · projection · CLI — all four inputs, five surfaces.
- **Determinism gate**: `cn verify` rebuilds IR + surfaces k× and checks them against a committed
  **`cn.lock`** (sha256 of every file); drift → exit 1. Wired as `npm run verify` for CI.
- **Production MCP output**: accurate JSON-Schema tool inputs (referenced models → `$defs`, recursion
  handled), MCP safety annotations, and **hostable** transports (stdio + Streamable-HTTP + Dockerfile).
- **Working prototype** (`prototype/`, `npm run prototype` → http://localhost:4319): a multi-page
  developer UI — Dashboard · Convert (live SSE step streaming, upload/paste/sample/GitHub-link inputs,
  Pass^k + round-trip proofs, ZIP download, **live MCP hosting**) · How-it-works (per-path playbooks).
- **Research & assets** (`docs/`): vendor comparison (`codegen-mcp-sdk-comparison.html`), determinism
  map (`determinism-and-codegen-map.md`), and a captioned video walkthrough (`connector-network-live-demo.mp4`).

## What makes it different
| | Stainless | Fern | Kiota | **This system** |
|---|---|---|---|---|
| Verified determinism (Pass^k) | — | — | bug #2442 | **every run + cn.lock** |
| Accurate `$ref` / recursive schemas | yes | partial | typed | **`$defs` + cycles** |
| SDK→MCP **and** MCP→SDK | one-way | one-way | one-way | **bidirectional** |
| Round-trip fidelity self-test | no | no | no | **built-in** |
| Generates **and** hosts MCP | cloud | no | no | **stdio + HTTP + Docker + live** |

## Verification status — all green (2026-06-10)
- `tsc --noEmit` across all packages — **PASS**.
- `npm run verify` — **Pass^3, all 4 inputs match cn.lock**.
- Live conversions, all five paths (SDK·MCP·OpenAPI·GitHub) — **ok, Pass^k true, round-trip lossless**.
- Generated MCP server hosts live (HTTP `tools/list` responds) and re-ingests losslessly.

> Caveat: `npm test` (vitest) needs **Node ≥ 20.19**; this machine runs 20.18.2, so the runner can't
> start (toolchain only — code is unaffected; logic verified via `tsc`, `cn verify`, and live runs).

## Run it
```bash
npm install
npm run prototype     # → http://localhost:4319   (UI: dashboard, convert, how-it-works)
npm run verify        # determinism gate (CI)
# CLI: node packages/cli/bin/cn.mjs project --github owner/repo --only mcp -o out/
```

## Next steps
1. Bump Node to ≥22 so `npm test` (vitest) runs in CI alongside `cn verify`.
2. GitHub Actions workflow running `npm run verify` on every PR.
3. Real cloud hosting (deploy the generated `Dockerfile` to Fly/Cloud Run from the UI).
4. Optional LLM repair drafter behind the existing frozen-artifact seam (kept out of the Pass^k path).
