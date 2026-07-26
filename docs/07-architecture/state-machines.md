# State Machines & Critical Sequences

**Status:** Draft for Gate 6. The three machines that carry correctness (challenge, programme publishing, entitlement) plus the sequences where money, safety or data could be lost. Application code enforces these; nothing else writes state (data-model commandment 5).

## 1. Challenge lifecycle

Canonical machine in [`01-product/challenge-lifecycle.md`](../../docs/01-product/challenge-lifecycle.md) §2 (Mermaid there; single source — not duplicated to avoid drift). Architectural obligations: transitions are server-validated commands (api §1); device-side detection (lapse) is advisory until server confirmation; every transition appends an `AuditEvent`; timers (7d/21d/28d) run server-side as the guarantee layer.

## 2. Programme publishing

```mermaid
stateDiagram-v2
    [*] --> draft
    draft --> in_review: workflow gates 1-4 passed
    in_review --> revisions: reviewer raises issues
    revisions --> in_review: resolved
    in_review --> approved: reviewer signs (recorded)
    approved --> published: governance checklist complete, owner publishes
    published --> update_in_review: MINOR/MAJOR change proposed
    update_in_review --> published: new version published (old deprecated per rules)
    published --> deprecated: superseded, no new starts
    published --> withdrawn: planned withdrawal
    published --> removed: EMERGENCY kill-switch
    deprecated --> withdrawn
    removed --> published: corrected version restored
    withdrawn --> [*]
```

Tooling enforcement: `approved` unreachable without a `ContentReview` row signed by a qualified reviewer for class-2 content (governance §7 — structural, not procedural); `removed` triggers fallback-content serving + affected-user messaging jobs atomically.

## 3. Entitlement machine (billing truth)

```mermaid
stateDiagram-v2
    [*] --> none
    none --> active: verified purchase (server notification or verified receipt)
    active --> grace: renewal payment failed (store grace window)
    grace --> active: payment recovered
    grace --> hold: grace exhausted (Play hold state)
    hold --> active: recovered
    hold --> expired: hold exhausted
    active --> expired: cancellation reaches term end
    active --> revoked: refund/chargeback
    expired --> active: repurchase/resubscribe
    revoked --> [*]
```

Rules: transitions driven **only** by verified store server events (App Store Server Notifications / Play RTDN) or server-verified receipts; client receipt submission is a hint, never truth; every transition audited; device tokens carry short-TTL entitlement claims with offline grace ≥ store grace (F18 honesty); `revoked` messaging is factual, never punitive.

## 4. Critical sequences

### 4.1 Purchase (the money path)
```mermaid
sequenceDiagram
    participant U as User
    participant App
    participant Store as App Store/Play
    participant API
    participant Jobs
    U->>App: Choose plan (paywall)
    App->>Store: Purchase flow (StoreKit2/Play Billing)
    Store-->>App: Transaction result
    App->>API: Submit transaction (idempotency key)
    API->>Store: Verify server-side
    Store-->>API: Verified status
    API->>API: Entitlement machine transition + AuditEvent
    Store--)API: Server notification (authoritative, may arrive first or later)
    API->>API: Idempotent reconciliation (no double grant)
    API-->>App: Entitlement claim (signed, TTL)
    App-->>U: Confirmation (what, renewal date, where to manage)
    Note over Jobs: Renewal reminder scheduled (E9)
```

### 4.2 Offline week → sync (the data path)
```mermaid
sequenceDiagram
    participant U as User
    participant App
    participant DB as Local SQLite
    participant API
    U->>App: Complete action (offline)
    App->>DB: Write-ahead op (idempotency key) — UI confirms instantly
    Note over App: days later, connectivity returns
    App->>API: Sync batch (op log + cursor)
    API->>API: Replay ops idempotently, lifecycle validates ordering
    API-->>App: Authoritative state + deltas + week manifest
    App->>DB: Reconcile (user facts never lost)
    App->>API: Ack cursor
```

### 4.3 Emergency content removal (the safety path)
```mermaid
sequenceDiagram
    participant Op as Owner/Reviewer
    participant Admin
    participant API
    participant Jobs
    participant App
    Op->>Admin: Invoke kill-switch (confirm-twice, logged)
    Admin->>API: Remove activity/programme (FR-82)
    API->>API: Publishing machine → removed + AuditEvent
    API->>Jobs: Fan-out - flag bundles, queue user messaging
    App->>API: Next sync/fetch
    API-->>App: Manifest marks content removed + fallback ref
    App-->>App: Serves authored fallback ("today's session is paused while we review it")
    Note over Jobs: Affected active challenges messaged in plain language
```

### 4.4 Account deletion (the trust path)
```mermaid
sequenceDiagram
    participant U as User
    participant App
    participant API
    participant Jobs
    U->>App: Delete account (F20 confirmations, export offered)
    App->>API: Deletion request (authenticated)
    API->>API: Mark pending + AuditEvent, revoke sessions
    API-->>App: Acknowledged (timeline stated)
    API->>Jobs: Execute deletion walker (retention policy verbatim)
    Jobs->>Jobs: Erase user graph + evidence media, pseudonymise financial/audit minimums
    Jobs-->>U: Email confirmation of execution
```

## 5. Invariants under test (Gate-6/8 checklist hooks)

No path grants entitlement without server verification · no sequence loses a user fact on crash/retry/conflict · kill-switch propagates ≤ one sync cycle · deletion walker terminates and proves coverage (schema-generated — data-model commandment 6) · every diagram above has an automated test twin (quality strategy).
