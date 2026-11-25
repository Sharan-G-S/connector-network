# Deterministic Codegen & MCP↔SDK Conversion — Research Map

> **Goal.** The Connector Network must convert any API source into surfaces (SDK · MCP · CLI · docs)
> **as per standard** and **reliably at every run**: the same API doc, given *k* times, produces
> byte-identical, spec-correct output every time. We call this the **Pass^k guarantee** — *all k runs
> agree*, not best-of-k.
>
> This doc maps (1) the external landscape — Stainless, Fern, Speakeasy, Kiota, OpenAPI Generator,
> RFC 8785, MCP↔OpenAPI tooling — onto (2) this project's existing machinery, and (3) gives a
> concrete Pass^k design wired to the IR hash you already compute.
>
> Sourced from a fact-checked research sweep (23 sources, 20 verified claims, 5 refuted). Citations inline.

---

## 0. TL;DR — where you already stand

Your pipeline is **already ~70% of a Pass^k system** because the IR layer is content-addressed and
order-stable. The gap is at the *render* stage (no harness asserts byte-identical surfaces across runs)
and a few un-pinned non-determinism vectors (filesystem read order, any timestamps in emitted output,
network `$ref` fetches).

| Pass^k primitive | Industry technique | This repo | Status |
|---|---|---|---|
| Canonical input | RFC 8785 JCS (recursive key sort) | [canonicalize.ts](../packages/ir-core/src/canonicalize.ts) | ✅ JCS-equivalent |
| Content identity | sha256 over canonical form | [hash.ts](../packages/ir-core/src/hash.ts) `irHash` | ✅ |
| Position-independent IDs | identity-based, not file order | [identity.ts](../packages/ir-core/src/identity.ts) | ✅ |
| Stable ordering | sorted maps everywhere | [build.ts:31](../packages/ir-core/src/build.ts#L31), [plan.ts:99](../packages/projection/src/plan.ts#L99) | ✅ |
| Pinned generator version | Speakeasy `gen.lock`, Fern docker tags | — | ⚠️ missing |
| Golden/snapshot tests | reproducible-builds rebuild-and-compare | `*.test.ts` exist; no surface-hash snapshot | ⚠️ partial |
| Pass^k harness (k-run equality) | — (your differentiator) | — | ❌ to build |

---

## Part 1 — The external landscape

### 1.1 Stainless (closed-source, commercial)
- **SDK generator** turns an OpenAPI spec + a `stainless.yml` config into idiomatic SDKs; it powers
  the official OpenAI, Anthropic, and Cloudflare SDKs.
  → https://www.stainless.com/blog/announcing-the-stainless-sdk-generator
- **MCP from the SDK, not the spec.** Stainless derives the MCP server as a **subpackage of the
  generated TypeScript SDK** (`packages/mcp-server`). Rather than one tool per operation, it offers a
  **two-tool "code-execution + docs-search" architecture** to stay token-efficient on large APIs.
  *(Verified 3-0. Note: the "more accurate than one-tool-per-method" superiority claim was refuted —
  Stainless supports per-operation tools too; the code-exec mode is an option, not the only mode.)*
  → https://www.stainless.com/docs/mcp/
  → https://www.stainless.com/blog/lessons-from-openapi-to-mcp-server-conversion/
  → https://www.stainless.com/blog/generate-mcp-servers-from-openapi-specs/
- **Relevance to you:** validates your "one IR fans out to many surfaces" thesis, but with a twist —
  they treat **MCP as a *projection of the SDK***, whereas you project MCP and SDK as *siblings from
  the IR*. Yours is cleaner for round-tripping (SDK→IR→MCP and MCP→IR→SDK both work); theirs couples
  MCP to TS-SDK internals.

### 1.2 Fern (open-source core, commercial cloud)
- **IR-centric architecture** — exactly your model. Fern ingests **OpenAPI / AsyncAPI / Protobuf
  (gRPC) / OpenRPC**, normalizes to its own IR, then runs **containerized, version-pinned generators**
  declared in `generators.yml` (`fern generate --local` runs them in Docker). *(Verified 3-0.)*
  → https://github.com/fern-api/fern
- **8+ idiomatic SDK languages** (TS, Python, Java, Go, Ruby, C#, PHP, Rust, Swift) plus **MCP servers
  derived from the same API definition**. *(Verified 3-0.)*
  → https://buildwithfern.com/post/rust-sdk-generator
  → https://buildwithfern.com/post/cli-generator (their CLI generator — directly parallels your `cli` surface)
- **Refuted claims (don't repeat them):** Fern does **not** ingest GraphQL, and its MCP "live
  execution" is unconfirmed — treat Fern MCP as partly-managed/docs-oriented.
- **The two Pass^k primitives to copy from Fern:** **(a) pin the generator version**, **(b) run it in a
  hermetic container** so OS/locale/toolchain can't leak in. You have (a) within reach via a lockfile;
  (b) is your biggest untapped reproducibility lever.
- **Comparison reading:** https://buildwithfern.com/post/open-source-vs-closed-source-sdk-generators
  and https://buildwithfern.com/post/openapi-code-generation-enterprise

### 1.3 Speakeasy (commercial) — the lockfile model to copy
- Generates SDKs **and** MCP servers from OpenAPI.
- **`gen.lock`**: Speakeasy tracks generated-SDK state in a lockfile with a **content checksum**; when
  the checksum changes, it triggers a patch version bump. This is *exactly* the artifact you want for
  surfaces — a per-surface content hash that gates "did anything actually change?" *(Verified 3-0.)*
  → https://www.speakeasy.com/docs/sdks/manage/versioning
- **MCP from OpenAPI** via the **`x-speakeasy-mcp`** OpenAPI extension (annotate operations → tools),
  drawn from 50 production servers. *(Verified 3-0.)*
  → https://www.speakeasy.com/blog/generating-mcp-from-openapi-lessons-from-50-production-servers
  → https://www.speakeasy.com/docs/model-context-protocol
- **Vendor comparison framework:** https://www.speakeasy.com/blog/comparison-sdk-generators-openapi
  · https://www.speakeasy.com/blog/choosing-an-sdk-vendor

### 1.4 Kiota (Microsoft, open-source) — the cautionary tale
- **Codegen is non-deterministic *by default*.** Kiota issue **#2442**: identical input produced
  **different output across runs**. Root cause = **randomized hash/dictionary iteration order**. Fixed
  by sorting collections before emit. *(Verified 3-0.)*
  → https://github.com/microsoft/kiota/issues/2442
- **Refuted:** that idempotency was an *explicit stated design goal* — it was a bug they fixed, not a
  guarantee they advertised. Lesson: **determinism is not free; you must engineer and *test* for it.**
- This is the single most important external data point for your Pass^k goal: the #1 cause of codegen
  non-determinism in the wild is **unordered map/set/dict iteration**, not logic bugs.

### 1.5 OpenAPI Generator / general landscape
- The widely-used OSS baseline (templated, many languages). Determinism varies by template/language;
  the same hash-ordering and timestamp pitfalls apply. Use it as a **conformance oracle** (does our
  output for surface X resemble the community-standard shape?), not as a determinism reference.

### 1.6 The determinism toolkit (standards & theory)
- **RFC 8785 — JSON Canonicalization Scheme (JCS).** Defines a byte-identical JSON serialization via
  **recursive lexicographic (UTF-16 code-unit) sorting of object keys** + canonical number formatting
  + minimal whitespace. This is the formal standard your `canonicalize.ts` approximates. *(Verified 3-0.)*
  → https://www.rfc-editor.org/rfc/rfc8785.html · https://www.rfc-editor.org/info/rfc8785/
  → Strict implementation walkthrough: https://dev.to/lenny321/json-canon-a-strict-rfc-8785-implementation-in-go-for-deterministic-json-3mfg
- **Reproducible Builds — stable outputs.** The canonical checklist for deterministic artifacts: sort
  inputs, strip/normalize timestamps, fix locale, avoid filesystem-order dependence, pin tool
  versions. *(Verified 3-0, via Kiota cross-ref.)* → https://reproducible-builds.org/docs/stable-outputs/
- **pass@k vs Pass^k.** Standard **pass@k** measures *probability at least one of k samples passes*
  (best-of-k — a generative/LLM metric). *(Verified 3-0.)* Your **"Pass^k"** is the **opposite and
  stricter** target: *all k runs must be identical and correct*. For a **deterministic** generator
  (no LLM in the hot path), Pass^k collapses to "the function is pure" — provable by **rebuild-and-
  compare**, not statistics. The moment an LLM enters the path (e.g. repair/naming), Pass^k requires
  either pinned temperature-0 + cached decisions, or a frozen human-approved artifact.
  → Reliability-of-generation framing: https://arxiv.org/pdf/2510.04265

### 1.7 MCP ↔ OpenAPI conversion ecosystem
- **openapi-mcp-generator** (OSS): converts any **OpenAPI 3.0+** spec into an MCP server.
  `getToolsFromOpenApi` walks operations → tools; **`json-schema-to-zod`** turns each operation's
  parameters/body schema into a **Zod `inputSchema`**. *(Verified 3-0.)*
  → https://github.com/harsha-iiiv/openapi-mcp-generator
- **The mapping rule both directions:** *OpenAPI operation ⇄ MCP tool*; *operation params + requestBody
  ⇄ tool `inputSchema` (JSON Schema)*; *2xx response schema ⇄ tool result shape*. This is precisely
  your IR's `IrOperation { input[], output[] }` — your IR is the natural **bidirectional pivot**.
- **Round-tripping** (MCP server → spec) is the under-served capability; your repo already does it
  (`cn acquire --mcp "node server.mjs" --command` re-derives tools). No external source measured
  round-trip fidelity — **this is a differentiator you can claim with a test, not a vendor can.**

---

## Part 2 — Mapping the landscape onto Connector Network

```
            Stainless / Fern / Speakeasy           THIS REPO
            ────────────────────────────           ─────────────────────────────────────────
 ingest     normalize many formats → IR            ingest/: adapt → assemble → validate → repair
 canonical  (mostly internal)                      ir-core/canonicalize.ts  ← align to RFC 8785
 identity   IR with stable refs                    ir-core/identity.ts  (op id = identity, not order)
 hash       Speakeasy gen.lock checksum            ir-core/hash.ts  irHash = sha256(canonical)   ✅
 plan       generator config (stainless.yml,       projection/plan.ts  (sorted resources/models/ops)
            generators.yml)
 render     containerized, version-pinned          projection/{sdk-typescript,sdk-python,mcp,cli,docs}.ts
 verify     (varies; Kiota learned the hard way)   ❌  NO per-surface hash / k-run equality harness yet
 MCP        from SDK (Stainless) or                projection/mcp.ts  — sibling of SDK from the SAME IR  ✅
            x-speakeasy-mcp extension              (cleaner for round-trip than SDK-coupled MCP)
```

**What you already do better than the field:** MCP and SDK are **co-equal projections of one IR**, so
*both* `SDK→IR→MCP` and `MCP→IR→SDK` work and round-trip. Stainless couples MCP to the TS SDK; Fern's
MCP is partly managed. Your symmetry is the architectural moat — protect it with round-trip tests.

**What the field does that you don't yet:** (1) a **per-surface content lock** (Speakeasy `gen.lock`),
(2) **version-pinned, hermetic generation** (Fern docker), (3) an **explicit determinism test** born
from pain (Kiota #2442).

---

## Part 3 — The Pass^k guarantee: concrete design

### 3.1 Definition (make it testable)
> **Pass^k holds for input S** iff running the full pipeline on S, k times, in independent processes,
> yields **byte-identical** `ir.json` **and** byte-identical bytes for **every file** under
> `surfaces/`, **and** every surface passes its standard conformance gate (tsc-clean / py_compile-clean
> / MCP tools.json re-derives / OpenAPI lints clean).

Two halves: **reproducibility** (k runs agree) **and** **correctness** (each run is spec-valid). You
need *both* — k identical-but-wrong runs is not Pass^k.

### 3.2 Determinism vectors — handled vs. at-risk

| Vector | Risk | Status in repo | Action |
|---|---|---|---|
| Object-key order in IR | hash drift | sorted in `canonicalize.ts` | ✅ formalize as RFC 8785 |
| Operation order | diff churn | sorted `id→method→path` [build.ts:31](../packages/ir-core/src/build.ts#L31) | ✅ |
| Map/Set iteration in projection | **Kiota #2442 class of bug** | `plan.ts` sorts before emit | ✅ keep auditing every generator |
| `Object.entries(ir.schemas)` render order | field/model order drift | `plan.ts:113` sorts models by class | ✅ verify each generator re-sorts, never trusts input order |
| Filesystem `readdir` order (SDK/GitHub acquire) | input order drift | check `acquire/` adapters | ⚠️ **sort all directory listings** |
| Timestamps / "generated at" in output | byte drift | `DO_NOT_EDIT` banner has no date ✅ | ⚠️ grep for `Date`, `toISOString`, `pinnedAt` leaking into surfaces |
| `Math.random` / UUIDs | byte drift | — | ⚠️ ban in projection; lint rule |
| Network `$ref` / remote spec fetch | content drift between runs | acquire pins commit SHA ✅ | ⚠️ pin/snapshot remote `$ref` targets too |
| Locale-sensitive sort (`localeCompare`) | order differs by `LANG` | used in `plan.ts` | ⚠️ pin to `localeCompare(b,'en-US')` or use code-unit `<` |
| Generator version | output changes across releases | not pinned | ⚠️ add `cn.lock` (see 3.4) |
| LLM repair drafter (future) | non-deterministic by nature | repair is offline/deterministic today ✅ | keep frozen-artifact seam; never LLM in hot path un-cached |

> **Locale is a sleeper bug.** `localeCompare` without a fixed locale can reorder identifiers between a
> dev's machine and CI. Either pass an explicit locale or sort by raw UTF-16 (`a < b`) to match RFC 8785
> and your own `canonicalize.ts` (which uses `Array.prototype.sort` default = code-unit order).

### 3.3 The verification harness (your missing piece)
Add a `cn verify` mode + a vitest suite that operationalizes Pass^k against the hash you already have:

```
for each fixture S, for run in 1..k (k≥3, fresh process each):
    run pipeline → collect irHash  AND  sha256 of each surface file
assert: all k irHashes equal            (IR reproducibility — you already compute irHash)
assert: all k surface-file hash-trees equal   (surface reproducibility — NEW)
assert: run-1 surfaces pass conformance gates  (correctness: tsc/py_compile/mcp re-derive/lint)
assert: surface hash-tree == committed golden   (snapshot: catches *intended* changes loudly)
```

- **Cross-environment matrix** (the real test of Pass^k): run the k loop across **different OS / Node
  version / `LANG` locale / CPU**. Reproducible-builds.org calls this out; it's where latent
  `localeCompare`/`readdir`/timestamp bugs surface.
- **Golden files**: commit the surface hash-tree (a `surfaces.lock` like Speakeasy `gen.lock`). A diff
  means *either* a real spec change *or* a determinism regression — the test forces you to tell which.

### 3.4 Standardize & pin (the `cn.lock` artifact)
Borrow Speakeasy's lockfile + Fern's version pinning:

```jsonc
// cn.lock — committed; gates "did output legitimately change?"
{
  "irHash": "sha256:…",                 // from ir-core/hash.ts (exists)
  "generatorVersion": "cn-ir/1 + projection@<pkg version>",  // pin BOTH IR schema and generator
  "canonicalization": "RFC8785",        // declare the standard
  "surfaces": {                         // Speakeasy gen.lock-style per-surface checksum
    "sdk/typescript": "sha256:…",
    "sdk/python":     "sha256:…",
    "mcp":            "sha256:…",
    "cli":            "sha256:…",
    "docs":           "sha256:…"
  }
}
```

### 3.5 Implementation checklist (ordered by leverage)
1. **`cn verify` + k-run vitest harness** (3.3) — turns "Pass^k" from a wish into a CI gate. *Highest leverage.*
2. **`surfaces.lock` / `cn.lock`** per-surface content hashes (3.4) — Speakeasy's gate, catches drift loudly.
3. **Pin sorts & ban entropy** — fix `localeCompare` locale; sort every `readdir`; lint-ban
   `Date`/`Math.random`/UUID in `projection/`. *(Kills the Kiota #2442 bug class.)*
4. **Formalize canonicalization as RFC 8785** — upgrade `canonicalize.ts` to full JCS (number
   formatting + UTF-16 sort) so the standard is *named*, not just *approximated*.
5. **Hermetic generation** (Fern's lever) — pin Node + deps; optionally containerize `cn project` for
   the cross-environment guarantee.
6. **Round-trip tests** — `SDK→IR→MCP→IR'` assert `IR.hash == IR'.hash`; protect your symmetry moat.
7. **LLM seam discipline** — if/when the repair drafter goes LLM, keep it temperature-0 + cache its
   `{target,op,value,reason}` decisions as a frozen artifact; never let it run un-cached in the Pass^k path.

---

## Part 4 — Curated resources

### Vendors / tools
| Resource | Why it matters | Link |
|---|---|---|
| Stainless — MCP docs | MCP-from-SDK architecture; two-tool code-exec mode | https://www.stainless.com/docs/mcp/ |
| Stainless — OpenAPI→MCP lessons | conversion gotchas | https://www.stainless.com/blog/lessons-from-openapi-to-mcp-server-conversion/ |
| Stainless — SDK generator announce | config-driven idiomatic SDKs | https://www.stainless.com/blog/announcing-the-stainless-sdk-generator |
| Fern — repo (`generators.yml`, IR) | **closest architecture to yours**; pinned containers | https://github.com/fern-api/fern |
| Fern — CLI generator | parallels your `cli` surface | https://buildwithfern.com/post/cli-generator |
| Fern — OSS vs closed SDK gen | strategic framing | https://buildwithfern.com/post/open-source-vs-closed-source-sdk-generators |
| Speakeasy — versioning / `gen.lock` | **copy the per-surface checksum lockfile** | https://www.speakeasy.com/docs/sdks/manage/versioning |
| Speakeasy — MCP from 50 prod servers | `x-speakeasy-mcp`, real-world mapping | https://www.speakeasy.com/blog/generating-mcp-from-openapi-lessons-from-50-production-servers |
| Speakeasy — SDK generator comparison | landscape table | https://www.speakeasy.com/blog/comparison-sdk-generators-openapi |
| Kiota — issue #2442 | **the canonical codegen non-determinism bug** | https://github.com/microsoft/kiota/issues/2442 |
| openapi-mcp-generator | OpenAPI→MCP via `json-schema-to-zod` | https://github.com/harsha-iiiv/openapi-mcp-generator |

### Standards / theory
| Resource | Why it matters | Link |
|---|---|---|
| RFC 8785 — JSON Canonicalization Scheme | **the standard your `canonicalize.ts` should cite** | https://www.rfc-editor.org/rfc/rfc8785.html |
| Reproducible Builds — stable outputs | the determinism checklist (sort/strip-time/pin/locale) | https://reproducible-builds.org/docs/stable-outputs/ |
| json-canon (strict JCS walkthrough) | reference implementation notes | https://dev.to/lenny321/json-canon-a-strict-rfc-8785-implementation-in-go-for-deterministic-json-3mfg |
| arXiv 2510.04265 | generation-reliability framing (pass@k context) | https://arxiv.org/pdf/2510.04265 |

---

## Appendix — open questions the research could NOT close
- No public source **measured** byte-identical reproducibility of Stainless/Fern output across runs —
  their Pass^k is *inferred from architecture*, not proven. **You can be the one who proves it for your
  own pipeline** via the 3.3 harness.
- **MCP-server → spec round-tripping** fidelity is unmeasured industry-wide — your strongest
  differentiator if you test it.
- Whether vendors **internally content-hash their IR** (as you do) is undisclosed.
