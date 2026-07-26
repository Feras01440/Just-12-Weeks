# Data Model Notes (Pre-Schema)

**Status:** Draft for Gate 6. Deliberately **not** a physical schema (unfinalised by instruction). These are the constraints, shapes and decisions the eventual schema must honour — written so the Stage-6 schema work is transcription, not invention.

## 1. Storage shape decisions (conceptual)

- **Relational core** (accounts, challenges, entitlements, governance, audit): the domain is relationship-dense and integrity-critical — relational is the honest default. Document/JSON columns for programme-defined payloads (completion models, contextual answers, review structures) where shape varies per programme: *structured envelope, flexible interior*, schema-validated at the application layer against the ProgrammeVersion's definitions.
- **Content as artefacts, not rows:** ProgrammeVersions live as content-addressed bundles in object storage; the database stores manifests, hashes and states. Content queries are catalogue-shaped, not join-shaped.
- **Device-local store** mirrors the challenge tree + current content week: SQLite, same conceptual model, plus the write-ahead queue (operation log with idempotency keys) — the sync protocol replays the log, the server reconciles.

## 2. The ten commandments for the eventual schema

1. Every user-owned row reachable from `User` by a deletion walker (no orphan islands — deletion is a graph traversal that must terminate).
2. Idempotency keys on every client-originated write (`Completion`, `ContextualAnswer`, `MeasurementEntry`, purchase submissions).
3. Append-only tables stay append-only (`AuditEvent`, `AdaptationEvent`, `ContentReview`) — corrections are new events, never updates.
4. Time is stored as UTC instants + the user's timezone at write; *scheduled* semantics (ChallengeDay dates) are local-date-typed, not instant-typed (the DST/travel bug class, killed at the type level).
5. Soft state (lifecycle) transitions via state-machine-checked application code only — no direct state column writes from anywhere else.
6. Sensitive-adjacent fields (goal wording, review free-text, evidence refs) tagged at column level (classification from `08-security/data-classification.md`) so export/deletion/access tooling is generated from the schema, not maintained beside it.
7. Financial rows (`Purchase`) immutable + separately backed up; entitlement state derivable from event replay (event-sourced entitlements at minimum for the billing domain).
8. No PII in keys, logs or analytics joins; the analytics ID lives in exactly one mapping row, deletable.
9. Programme-defined payloads always carry their defining version (self-describing rows — a `ContextualAnswer` knows which question version asked it).
10. Every index justified by a named query; every hot query named before launch (the performance plan's data section).

## 3. Volumetrics honesty (founder-scale)

Per active user-week: ≤7 completions, ≤7 contextual answers, ≤1 review, ≤2 measurement entries, 0–3 evidence items — trivially small data. The design centre is **integrity and privacy tooling**, not throughput. The one growth-shaped table is `AuditEvent` (partition/archive plan from day one).

## 4. Backup & restore requirements

Nightly full + continuous WAL-class backup of the relational core; object storage versioning on content (immutability makes this cheap); evidence store (if built — ADR-003) backed up under the same encryption envelope as primary; **restore drill before beta** (Gate-8 item) and quarterly; deletion interacts with backups per retention policy (deletion executes on live + ages out of backups within the stated window — the policy the privacy notice must state honestly).

## 5. Migration posture

Schema migrations forward-only, reversible-by-restore; content-bundle format versioned (a v1 app must reject a v3 bundle gracefully, offline-safe); the sync protocol carries its version — old clients degrade to read-only sync rather than corrupt (the lifecycle's abandon-detection tolerates stale clients).
