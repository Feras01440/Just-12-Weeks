# Scope — MVP and Beyond

**Status:** Draft for founder review at Gate 2. Category-neutral per D-004; entries conditional on open decisions are marked ⚠. Companion documents: [non-goals.md](non-goals.md), [feature-dependency-map.md](feature-dependency-map.md).

## Scoping principle

**Small in breadth, complete and premium in depth.** One excellent guided journey, whole — every state designed, every lapse survivable, every claim honest — beats any number of half-built features. Breadth (more programmes, more categories) is bought later with the engine the MVP proves.

## MVP scope (Stage 7 build)

### Content
- ⚠ Q1/Q3: **One flagship programme** (base case; second programme only if Q9 budget confirms), authored and reviewer-signed per governance framework, complete with demonstrations, alternatives at three levels, adaptation rules, milestone definitions, evidence menu, and week-13 handover content.
- One **orientation experience** (pre-week-1: how the programme works, what week 1 asks).

### Platform (all archetype-ready even with one launch programme)
- Onboarding: value explanation, 18+ screen, account, progressive personalisation (FR-01…04).
- Catalogue with full governance metadata; suitability screening; honest "not for you" path (FR-10…12).
- Daily loop: Today screen, Guided Action player, alternatives, ≤2-tap completion, contextual micro-questions, offline week (FR-20…25, NFR-03).
- Progress: journey view, weekly review, programme-defined evidence menu, export (FR-30…34; visual evidence only if the flagship's governance case justifies it — Q12A).
- Recovery: all four lapse states designed and shipped (FR-40); pause/resume/restart (FR-41); weekly adaptation v1 (FR-42 — rule-based, transparent).
- Completion: week-12 report; ⚠ Q13 week-13 transition v1 (at minimum: guided next-step choice, even if the "next" catalogue is small).
- Notifications: the closed purposeful catalogue (notification architecture §1) with full user control of engagement types; transactional and renewal-reminder notices excepted per E9 (FR-60).
- Commercial: ⚠ Q5/Q6 entitlement + paywall to paywall-principles; restore; graceful expiry; cancellation guidance (FR-70…72).
- Governance surface: author/reviewer/citations display; report-a-concern; programme versioning + emergency withdrawal plumbing (FR-80…82).
- Cross-cutting: accessibility NFR-01; performance NFR-02; privacy/security NFR-04/05; reliability NFR-06.

### Explicitly in scope but deliberately minimal at MVP
- Insights/history: the journey view and weekly reviews *are* the history; no separate analytics dashboards for users (D-002 — the app does the noticing).
- Tablet: adaptive layouts only (NFR-09).
- Week-13: v1 transition, not the full multi-cycle loop.

## Post-MVP scope (evidence-gated, in likely order)

1. **Programme #2–3** from a different archetype (proves D-004 publicly; demand evidence from catalogue "vote/waitlist" mechanic).
2. Week-13 full loop: maintenance mode and/or next-journey sequencing per Q13 evidence.
3. Adaptation v2: richer difficulty modelling from completion/asked-question signals (still transparent, still declinable).
4. Health-platform integrations if flagship category warrants (⚠ Q1; PSR-04).
5. ⚠ Q4 custom challenge builder — only after founder clarification and only if validated demand.
6. Localisation beyond UK English.
7. Cohort starts / accountability layer (retention evidence first; moderation cost honestly assessed).
8. Additional evidence tooling where programmes justify it (Q12A expansions, artefact galleries).

## Risks of overbuilding *(why the list above is short)*

Every addition before evidence: dilutes the flagship's depth (R-03), delays launch past seasonal windows (R-14), multiplies governance surface (R-08), and drifts the product toward the tracker-dashboard shape D-002 forbids (R-10). The costliest historical failure pattern in this category is shipping breadth that reviews as shallowness (Annex C §5.3).

## Risks of launching too narrowly *(honestly stated)*

One programme means: visitors whose goal isn't covered bounce (mitigated by waitlist/vote capture — which converts the miss into demand evidence); the platform claim (D-004) rests on architecture rather than visible catalogue at launch (mitigated by the Q3 stretch option of a second, different-archetype programme); single-programme dependence concentrates content risk on one author/reviewer chain (mitigated by governance workflow and versioning).

## Scope-change rule

Any scope addition or removal requires a decision-log entry naming the evidence, the cost accepted, and the item displaced. "It's small" is not evidence.
