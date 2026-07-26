# API Strategy

**Status:** Draft for Gate 6. Style, contracts and rules for the platform API — one consumer that matters (our app), one privileged consumer (admin portal). No public API at MVP (non-goal; revisit with partnerships evidence).

## 1. Style

**Resource-oriented HTTPS/JSON** with a small number of *intent endpoints* where REST contorts (e.g. `POST /challenges/{id}/recovery-choice`) — the lifecycle's transitions are commands, and pretending they're PATCHes breeds bugs. Versioned path prefix (`/v1`); additive evolution preferred; breaking changes = new version with sunset windows (mobile fleets upgrade slowly — every contract lives ≥12 months).

## 2. The contract set (MVP surface, ~25 endpoints)

- **Auth/account:** session establishment (platform sign-in exchange), profile, consents, deletion request, export request.
- **Catalogue:** programme list + detail (governance metadata included — FR-80 is API-shaped), waitlist vote.
- **Challenge:** start (post-suitability), state fetch, **sync** (the workhorse: batched operation log up, authoritative state + next-week manifest down), recovery-choice, pause/resume, schedule change, abandon, restart.
- **Reviews & evidence:** weekly review submit, measurement entries, evidence upload intents (ADR-003-gated — endpoint *designed*, built only if Q12A lands yes), report fetch.
- **Entitlements:** receipt submission (belt), entitlement state (braces — server notifications are the real source), restore.
- **Notifications:** preference set, token registration.
- **Governance (user-facing):** content-concern report.
- **Admin (separate auth, separate audit):** publishing pipeline, kill-switch, support lookups, report queue.

## 3. Sync protocol rules (the endpoint that is the product)

Batched, idempotent operation log (each op: type, payload, client timestamp, idempotency key); server replies with authoritative challenge state + deltas + content-week manifest; conflicts resolved by domain rules (user facts kept, ordering server-assigned, duplicates collapsed); resumable (cursor-based); tolerant of weeks-old clients (lifecycle absorbs absence — the protocol must too). Payload discipline: sync carries *state*, never content media (CDN's job).

## 4. Cross-cutting rules

- **AuthN/Z:** short-lived access tokens + refresh; device-bound where platforms allow; admin = separate identity provider + role model (author/reviewer/operator per governance §5); every privileged read of user data logged to `AuditEvent` (support-access transparency).
- **Privacy at the contract:** requests carry the minimum (no device fingerprints, no location); analytics proxy endpoint enforces the allowed-properties whitelist server-side (the spec's prohibitions are code, not policy).
- **Idempotency everywhere money or state moves** (header-keyed); retries safe by construction.
- **Errors:** typed problem-details (code, human-safe message key, retryability flag) — client maps to content-strategy error voice; no stack traces, no vendor error passthrough.
- **Rate limiting:** per-token, generous for the app's honest patterns, hostile to scraping; brute-force lockouts on auth with account-holder notification.
- **Observability:** request IDs end-to-end; billing and deletion paths traced at 100%; SLO instrumentation (p95 latency per endpoint class).

## 5. Contract governance

OpenAPI as the single source (generated clients per ADR-001's stack); contract tests in CI both directions (app-side fixtures + server-side compliance); no undocumented endpoints — the admin surface included (its audit story depends on contract clarity).
