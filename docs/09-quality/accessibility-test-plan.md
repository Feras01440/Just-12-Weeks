# Accessibility Test Plan

**Status:** Draft for Gate 6/8. Executes `03-ux/accessibility-requirements.md`. Three layers: automated (every PR), protocol (every release), human (Stage 5, Stage 9, and annually). Failures are release blockers by policy — this plan exists to make that enforceable, not aspirational.

## 1. Automated (CI, every PR)

- Static analysis: missing labels/traits on interactive elements; contrast tokens verified against measured ratios (colour-strategy CI check); touch-target lint (≥44pt/48dp) on layout definitions; focus-order declarations present for new screens; string-lint incl. plain-language heuristics (sentence length ceilings in guidance strings).
- Snapshot sweeps: every screen at 200% text both themes (truncation = failure — "wrap, not truncate" is a defect class); reduced-motion snapshot parity (the designed still exists and renders).
- Media pipeline law (re-asserted as test): demonstration media without captions/transcript fails the *content* build (content-delivery §3).

## 2. Release protocol (manual, per release, ~half a day, checklist-driven)

Run on the configured accessibility devices (device-matrix): 

1. **Screen-reader journeys** (VoiceOver on P5, TalkBack on P2): the five E2E journeys end-to-end by screen reader alone — first-start, daily loop (player incl. variant switch + timer announcements), recovery conversation, weekly review, paywall+purchase (sandbox) and restore. Pass = completable without sighted rescue, announcements meaningful, order logical.
2. **Text scaling:** daily loop + paywall + report at largest platform accessibility sizes (beyond 200%) — usable, nothing clipped, G9 comprehension text intact.
3. **Reduced motion + transparency:** signature object states, week-turn, completion moment — designed-equal stills verified against their specs (not "animation absent").
4. **Keyboard/switch operability:** full daily loop via external keyboard (iOS) and switch scan (spot-check cadence: quarterly).
5. **Colour-vision sweep:** protan/deutan/tritan simulation over Journey, variants, semantic states — meaning survives (shape/label twins present).
6. **One-handed protocol** (P4): daily loop thumb-only, both hands tested.
7. **Voice Control / Voice Access spot-check:** primary actions nameable and invokable.
8. **Haptic alternatives:** completion/milestone confirmations perceivable with haptics off (visual+announced twins).

## 3. Human testing (the part automation can't fake)

- **Stage 5 (pre-build):** prototype sessions include screen-reader-primary participants and low-digital-confidence 65+ participants (research plan quotas) — accessibility findings feed wireframes *before* code.
- **Stage 9 (beta):** recruited cohort includes assistive-tech daily users (target ≥5: screen reader, large-text-always, switch/voice if reachable) with a direct feedback channel and paid respect for their time (Q9 line item ~£300–500).
- **Annual (live):** one commissioned external accessibility review if budget allows (~£2–4k) — internal protocols drift toward their own blind spots.

## 4. Defect policy

Severity A (blocks an assistive-tech user from a core journey) = release blocker, no exceptions. Severity B (degraded but passable) = next release with a named owner; three unresolved Bs escalate to A by policy (drift prevention). Every A/B logged with its WCAG/requirement reference — the audit trail store reviews and any future procurement will ask for.

## 5. Coverage ledger

A standing table (appended each release) mapping accessibility-requirements sections → last verified date → method → result. WCAG 2.2 AA criteria tracked individually where applicable to native mobile; "not applicable" entries argued, not assumed.
