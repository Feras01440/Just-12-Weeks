# Release Checklist

**Status:** Standing instrument from Stage 7 onward. Every store release runs this list top to bottom; a named human signs each section; exceptions require a decision-log entry naming the accepted risk. This is the operational teeth of every promise made in `docs/` — sections reference their source documents.

## 1. Scope integrity
☐ Every change in this release maps to scope.md or a decision-log entry (no drive-by features) ☐ No non-goal violations (N-01…N-29 spot-sweep) ☐ Anti-scope tripwires reviewed (new charts? new required inputs? re-engagement notifications? category-specific universal strings?)

## 2. Experience principles (G-criteria — release blockers)
☐ G1 do/how/why without data entry (sampled screens) ☐ G2 completion ≤3 taps median (analytics of RC build) ☐ G3 zero required free-text in daily loop ☐ G4 onboarding question count ≤5 ☐ G5 all four lapse states flow-complete ☐ G8 notification opt-out ≤2 taps ☐ G9 paywall comprehension evidence current (any paywall change re-tests) ☐ G10 lexicon lint zero violations

## 3. State matrix
☐ Changed flows re-verified across: loading · empty · error · offline · permission-denied · entitlement-expired · 200% text · dark mode · reduced motion · small/large screens · slow network · interruption/resume (test-strategy §3)

## 4. Quality suites
☐ Unit/contract green ☐ E2E five journeys green on device farm ☐ Visual regression reviewed (signature states approved by design) ☐ Performance budgets on P1 (no unapproved regressions; report attached) ☐ Security regression (authz matrix, consent gates, deletion coverage, money invariants) ☐ Offline/sync torture green

## 5. Subscription & money (any release touching commerce, and monthly regardless)
☐ E1–E10 sandbox matrix (purchase/restore/grace/hold/revoke/reminders) ☐ Paywall-principles checklist on every live paywall variant ☐ Prices/copy match store products exactly ☐ Refund-rate + billing-anomaly dashboards reviewed

## 6. Accessibility (accessibility-test-plan §2)
☐ Screen-reader journeys (VoiceOver + TalkBack) ☐ Max-text pass ☐ Reduced-motion parity ☐ Colour-vision sweep on changed surfaces ☐ Severity-A count = 0; Severity-B ledger updated

## 7. Content & governance (any release shipping content changes)
☐ Bundle validation (schema/hashes/captions) ☐ Governance records current (reviewer signatures for class-2) ☐ Claims-policy pass on changed content ☐ Changelog user-rendering honest ☐ Kill-switch drill within last 90 days

## 8. Privacy & data
☐ Data inventory delta reviewed (new data? forms updated?) ☐ Apple privacy labels / Play Data safety still accurate ☐ Analytics events added this release are in the spec with purposes ☐ Deletion-walker coverage test green ☐ Privacy notice version consistent

## 9. Store hygiene
☐ Screenshots/metadata claims-policy compliant and current ☐ Age rating unchanged or re-declared ☐ Release notes honest and human (content-strategy voice) ☐ Phased rollout configured (Play staged / App Store phased) ☐ Rollback plan named (what we do at crash-spike threshold: halt rollout, hotfix path)

## 10. Observability & support readiness
☐ Alerts healthy (no silenced pages) ☐ Dashboards for launch-watch metrics (crash-free, billing integrity, sync failures, opt-out rate) ☐ Support macros updated for changes ☐ Known-issues list published internally

## 11. Sign-off
☐ Engineering ☐ Design (incl. anti-generic spot-audit on changed screens) ☐ Content/governance (where applicable) ☐ Founder (go/no-go recorded in decision log for major releases)

---
*Post-release (within 48h):* rollout health review (crash/billing/reviews) at 10%→50%→100% gates; any guardrail breach halts rollout per §9's plan; day-7 mini-report against success-metrics for major releases.
