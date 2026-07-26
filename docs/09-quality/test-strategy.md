# Test Strategy

**Status:** Draft for Gate 6/8. Shape: a honest pyramid (fast unit core, contract-tested seams, few but ruthless end-to-end journeys) plus the specialist suites this product's promises require (subscription lifecycle, offline/sync, accessibility, recovery flows). Principle: **every promise in the specs has a test that would catch its betrayal.**

## 1. Layers

### Unit (the bulk)
Domain logic: lifecycle state machine (every transition + every *rejected* transition), lapse detection over scheduled-days (DST/timezone/pause arithmetic — the bug class killed at data-model commandment 4 gets its regression suite), adaptation rules R1–R7 (trigger thresholds, envelope bounds, decline handling), completion idempotency, entitlement machine (all store-event orderings incl. out-of-order arrival), schedule reshaping, report assembly from partial evidence, notification cadence caps and quiet hours, string-lint (lexicons) as tests.

### Contract & integration
OpenAPI contract tests both directions (api §5); sync protocol: op-log replay under duplication/reordering/staleness (weeks-old client fixture); store server-notification fixtures (Apple/Google samples incl. grace/hold/revoke); content-bundle validation (schema, hash, caption-presence — the pipeline's law as tests); analytics proxy whitelist (prohibited-property canaries rejected); deletion-walker coverage generated from classification tags (CI-failing on unwalked tables).

### End-to-end (few, brutal)
The five journeys that define the product, on device farm iOS+Android: (1) first launch → suitability → start → day-1 completion; (2) offline week → reconnect sync integrity; (3) lapse 4 days → recovery conversation → re-entry; (4) purchase → restore on second device → expiry grace behaviour (sandbox); (5) week-12 completion → report → transition. Plus the destructive pair: account deletion end-to-end (with export), and kill-switch propagation (staging drill automated).

## 2. Specialist suites

- **Subscription lifecycle:** the E1–E10 matrix (subscription-requirements) against sandbox: purchase, restore, upgrade/downgrade proration messaging, grace, hold, revoke, reminder scheduling. Runs pre-release and weekly on schedule (store behaviour drifts).
- **Offline/sync torture:** airplane-mode weeks, mid-write kills (NFR-06 write-ahead proof), clock changes, storage-full, cache eviction mid-programme, mixed-version prevention (versioning §5).
- **Recovery-flow correctness:** every lapse threshold boundary (1/2/6/7/28 days) including pause interactions and scheduled-gap non-triggers (F11–F14 fixtures).
- **Accessibility:** the [accessibility-test-plan](accessibility-test-plan.md) — automated axe-class checks in CI + the manual protocol.
- **Visual regression:** screenshot suite across the state matrix (below) on reference devices, both themes, 100%/200% text; signature-object states pixel-tracked (the brand's face doesn't drift silently).
- **Performance:** budgets from [performance-plan](performance-plan.md) as CI gates on the low-end reference.
- **Security regression:** authz matrix, consent gates, log-scrubbing canaries, money-path invariants (SR-10).

## 3. The state matrix (every important feature crosses it)

`loading · empty · error · offline · permission-denied · entitlement-expired · large-text(200%) · dark-mode · reduced-motion · small-screen · large-screen · slow-network(throttled) · interrupted(kill/resume)` — the release checklist instantiates this per flow (F01–F23); a flow ships when its matrix row is green, not when its happy path demos well.

## 4. Test data & environments

Fixture programmes: one per archetype (the Gate-2 paper-test artefacts graduate into permanent test content — including a deliberately pathological one: heaviest media, longest steps, densest questions); staging wired to store sandboxes with test accounts per scenario (fresh, subscribed, grace, revoked, family-shared); time-travel harness for lifecycle timers (no waiting 28 real days); seeded low-end device lab per [device-matrix](device-matrix.md).

## 5. Quality gates in the pipeline

Every PR: units + contracts + lint (strings, accessibility, schema, secrets). Nightly: E2E + visual + perf on device farm. Pre-release: full specialist suites + manual protocol (exploratory testing charters: recovery empathy, paywall comprehension, first-open confusion hunting). Beta (Stage 9): real-world telemetry against success-metrics guardrails. **No green, no ship** — and the checklist's sign-off is a named human, not a dashboard.

## 6. Beta & localisation & store-submission testing

Beta: TestFlight/Play internal → closed tracks per roadmap Stage 9 (cohort seeding across age bands per D-001, device spread per matrix); store-submission dry-runs at Stage 8 (metadata, screenshots, privacy forms validated against inventory) so Stage 10 is mechanical; localisation testing deferred with N-26 but pseudo-locale runs (length-stress strings) are in the visual suite *now* — layout that survives pseudo-German survives most futures.
