# Programme Adaptation Model

**Status:** Draft for Gate 2. v1 is deliberately rule-based and transparent; learned personalisation is a later evolution, never a silent one. Implements D-002 ("…and adapt") and the recovery philosophy.

## 1. Why adaptation exists

A 12-week plan written for an ideal week meets real weeks: illness, workload, travel, low days, unexpectedly fast progress. Without adaptation the user experiences a widening gap between plan and life — the classic abandonment mechanism. Adaptation's job: **keep the plan honest about the user's actual capacity while protecting the programme's integrity** (a lightened path through the same journey, not a different journey).

## 2. Principles

1. **Transparent.** Every adaptation is announced in plain language — what changed, why, and what it means for the goal ("You've chosen the easier version three times this week, so next week starts a step gentler and rebuilds. Your week-12 aim is unchanged."). No silent difficulty manipulation, ever.
2. **Declinable.** The user can keep the standard plan against advice (except where a programme's safety rules say otherwise — then the programme says so explicitly).
3. **Bounded.** Adaptation moves within the programme author's declared envelope (`adaptation_hooks`, variant ranges, insertable consolidation content). The engine never generates novel exercise/content — it recomposes authored material.
4. **Bidirectional.** Struggling users get consolidation; cruising users get the advanced lane offered — under-challenge kills motivation as surely as over-challenge (goal-setting evidence: difficulty matters, Annex D §2).
5. **Weekly cadence, daily exceptions.** The composition of next week adapts at the weekly boundary (with the weekly review as its natural moment); within a day, the only adaptation is variant choice — no mid-week plan churn.

## 3. Inputs (all derived; no interrogation)

| Signal | Source | Notes |
|--------|--------|-------|
| Completion pattern | Daily loop | Which days, which roles (core/rest), trailing 2-week window |
| Variant selections | `alternative_selected` | Direction and frequency |
| Checkpoint outcomes | Checkpoint days | pass / partial / retry |
| Contextual answers | Micro-questions | Only those declared as adaptation inputs (e.g. "was today's version too much, about right, too easy?") |
| Lapse events | Lifecycle states | Feeds recovery composition (§5) |
| User overrides | Adaptation prompts | Declines teach the model's bounds for this user |

Explicitly not inputs: measurement values by default (a physical programme may declare a safety-relevant exception, e.g. pacing caps — reviewer-approved); anything the analytics spec prohibits; engagement time.

## 4. Rule families (v1)

Authors parameterise these per programme; the engine executes:

- **R1 Consolidation insertion.** Trigger: completion < programme-defined threshold (typically <4/7) for a week, or ≥3 easier-variant days. Effect: next week opens with 1–2 consolidation days recapping the current material before advancing; week themes shift right within the author's slack (weeks 11–12 content protected by design — authors build slack in weeks 4/8/interstitials).
- **R2 Variant re-defaulting.** Trigger: consistent easier (or advanced) selection ≥3 days. Effect: next week's default presentation becomes that variant, with the other lanes still visible ("standard" relabelled relative to the user — no shame gradient).
- **R3 Checkpoint branching.** Trigger: checkpoint partial/retry. Effect: programme-authored branch — targeted revisit days, then checkpoint retry; pass → continue; second partial → author-defined path (often: adjust the week-12 aim honestly, per archetype §6).
- **R4 Pace adjustment (skill/creative).** Trigger: exercises completing far under/over estimated time, or "stuck" contextual answers. Effect: re-chunking of upcoming units within authored bounds (split a dense unit; merge two light ones).
- **R5 Scope negotiation (creative archetype).** Trigger: phase slippage beyond buffer days. Effect: the programme's authored "honest descope" options (a smaller finished piece) offered as a *choice*, framed as craft, not failure.
- **R6 Deload/lighten (physical archetype).** Trigger: post-lapse return, or fatigue signals the programme declares. Effect: authored lighter week variant; safety notes surfaced.
- **R7 Advanced lane.** Trigger: sustained advanced-variant selection + checkpoint passes. Effect: offer (never impose) the programme's stretch track.

## 5. Recovery composition (with the lifecycle)

On lapse re-entry the engine composes from authored material, per recovery-experience spec: 2–6 days missed → "re-entry day" (authored light version of the current week's core) then resume; 7+ → fresh-start week re-entry (R6-style lightened week, then continue); pause → schedule shift with no content penalty. Adaptation and recovery share machinery; recovery is adaptation at its most important moment.

## 6. What adaptation must never do

Never: silently change difficulty; use guilt framing in any adaptation message ("since you keep failing…" is lexicon-banned); adapt week-12 *promise* without an explicit, user-acknowledged conversation (R3/R5 paths); punish declines by withholding features; generate unauthored content; adapt based on data the user can't see.

## 7. Authoring obligations (contract with the authoring model)

Every programme ships: variant coverage for every core day; ≥2 consolidation units per phase; buffer slack totalling ≥6 days across the 12 weeks; authored re-entry/lighten variants; checkpoint branch content; descope options (creative); adaptation-message templates in the programme's voice, pre-cleared against the blame lexicon. A programme that cannot meet these is not publishable (governance checklist).

## 8. Evolution path (post-MVP, decision-gated)

v2 candidates: per-user difficulty modelling from checkpoint + variant history; smarter re-entry sizing; cross-cycle carryover ("your last journey's pattern suggests…"). Conditions: same transparency rules; analytics-spec-compatible features only; an ADR + decision-log entry before any learned model ships. The transparency principle is permanent, not a v1 limitation.
