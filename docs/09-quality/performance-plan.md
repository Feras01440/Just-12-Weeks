# Performance Plan

**Status:** Draft for Gate 6. Budgets, measurement and the enforcement loop. All budgets are **measured on P1, the low-end Android reference** (device-matrix) unless stated — flagship numbers flatter and lie.

## 1. Budgets (NFR-02 made specific)

| Metric | Budget (P1) | Notes |
|--------|-------------|-------|
| Cold start → Today interactive | < 2.5s | Bundled orientation path; no network on the critical path |
| Warm open → Today interactive | < 1.0s | The daily moment; the one users feel most |
| Player open (cached content) | < 800ms | Text/steps first; media hydrates after |
| Completion tap → confirmed state | < 150ms perceived | Local write-ahead; sync invisible |
| Signature-object animation | 60fps sustained; zero dropped-frame *sequences* | ADR-001's Stage-6 spike gate; reduced fidelity tier for P1 if needed — *designed*, not accidental |
| Screen transitions | < 300ms, 60fps | Motion philosophy compliance incl. P1 |
| App size (initial download) | ≤ 60MB | Programme media on demand (content-delivery) |
| Content cache ceiling | ~200MB managed | LRU beyond pinned weeks |
| Memory (foreground steady) | < 350MB on P1 | Media decode discipline |
| Battery: daily-loop session | Unmeasurable-by-user drain; background ≈ 0 (no polling — NFR-08) | Verified in battery-saver suites |
| Sync round (week manifest + ops) | < 3s on throttled 3G-class | Delta discipline (api §3) |
| Crash-free sessions | ≥ 99.5% | Guardrail metric (success-metrics) |
| ANR rate (Android) | < 0.2% | Play vitals threshold with margin |

## 2. Measurement infrastructure

CI perf suite on device farm nightly (cold/warm start, player open, frame metrics on signature flows) with budget-regression failure; field telemetry (D23, no user IDs): start times, frame drops on named flows, sync durations, media-fetch failures — aggregated against budgets weekly; Play vitals / Xcode metrics watched as the platform's own truth; every release's perf delta reported in the release checklist (no silent regressions).

## 3. Design-side rules that keep the budgets honest

Media: pre-encoded variants, decode-size caps on P1, no autoplaying video off-screen; lists virtualised; the Journey's 12-week visualisation renders from summaries, not raw event replay; JS-thread discipline (if ADR-001 confirms RN): signature/motion on native-driven rails only, JS work sliced off interaction paths; image caching bounded; no third-party SDK on the startup path (register rule with perf teeth); cold-start work deferred aggressively (everything after Today's first frame is negotiable).

## 4. Slow-network & failure behaviour (performance's honesty half)

Throttled profiles (3G-class, 400ms RTT, 1% loss) in the nightly suite for: first-open (bundled path must fully work), catalogue browse (cached-first), sync, media fetch (progressive, cancellable, never blocking guidance — F07 law). Timeouts tuned to feel *decisive* (fail → designed offline state fast) rather than hopeful spinners; spinner-time itself budgeted (no indeterminate spinner >2s without words).

## 5. Escalation

A budget breach at Stage 6/7 is triaged as scope pressure, not tolerated drift: fix, descope the cause, or *formally* revise the budget with founder sign-off (decision-log entry — budgets are promises to the P1 user, D-001's least-served constituent). The Stage-6 motion spike (ADR-001 condition) is this plan's first live fire.
