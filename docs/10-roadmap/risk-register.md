# Risk Register

**Status:** Living document; reviewed at every stage gate. Likelihood/impact scored 1–5 (founder-stage calibration, not enterprise theatre). Owner is who watches it, not who caused it. Sources: concept synthesis §5/§7, research annexes A–D, red-team assessment (Annex C).

| ID | Risk | L | I | Score | Category | Mitigation | Trigger to re-score | Owner |
|----|------|---|---|-------|----------|------------|--------------------|-------|
| R-01 | Week-12/13 churn cliff: promise completes, subscribers leave | 4 | 5 | 20 | Commercial | Week-13 transition designed into engine from day one (Q13); next-goal sequencing; `05-commercial/week-13-retention-models.md` | Beta cohort week-13 behaviour | Product |
| R-02 | Paywall-before-value damages activation, ratings, refunds | 4 | 5 | 20 | Commercial | Q5/Q6 recommendations (value-first, honest intro pricing); paywall comprehension test G9 | Stage 1 pricing evidence; beta funnel | Product |
| R-03 | Content cost underestimated; programme ships shallow and falsifies the evidence-based promise | 4 | 5 | 20 | Content | Q3 (one flagship deep); governance framework; named reviewer budget line in Q9 answer | Q9 budget answer; authoring pilot | Founder + Content |
| R-04 | Generic-perception: read as another habit tracker in seconds | 3 | 5 | 15 | Brand/Product | Guidance-first experience (D-002) is the structural answer; anti-generic audit; signature system (Stage 3); Apple 4.3(b) saturation enforcement makes this a review risk too | Store-listing tests; Apple review outcome | Design |
| R-05 | Real-world attrition (~3–4% 30-day retention is the category's gravity) makes unit economics fail | 4 | 4 | 16 | Commercial | Recovery-first design; realistic metric targets (success-metrics.md benchmarks against real-world, not trial, rates); annual-plan emphasis decided on evidence | Beta D7/D30 | Product |
| R-06 | Solo-founder capacity: content + design + build + governance exceeds one person | 4 | 4 | 16 | Delivery | Q9 honesty; staged scope; contract expert review; roadmap durations padded for reality | Q9 answer; Stage 7 velocity | Founder |
| R-07 | Regulatory/store enforcement on pricing dark patterns if countdown offer ships | 2* | 5 | 10 | Legal | Q5 recommendation (never ship as written); paywall principles doc; *likelihood low only because recommendation is expected to be accepted | Q5 decision | Product |
| R-08 | Health-content harm or claim breach (weight-loss category, if chosen) | 2 | 5 | 10 | Safety | Content governance (`06-content/*`); 18+ gate (D-005); claims policy; qualified reviewer requirement; category choice Q1 | Q1 decision; reviewer audit | Content |
| R-09 | Age-inclusivity failure: product tests well 18–49 and fails 65+ | 3 | 4 | 12 | UX | D-001 design requirements; mandatory 65+ research quota; G6/G7 acceptance criteria; device matrix includes older/low-end devices | Stage 5 usability results per band | Design |
| R-10 | Guidance-first drift: features regress toward forms/dashboards under delivery pressure | 3 | 4 | 12 | Product | experience-principles.md acceptance tests (G1–G5) as release blockers; cross-doc audit checks | Any release review | Product |
| R-11 | Fitness-specific language/architecture leaks into universal platform (violates D-004) | 3 | 3 | 9 | Product | Cross-document audit sweep; engine archetype tests; brand language rules | Cross-doc audit findings | Product |
| R-12 | Name/trademark collision ("12 Weeks" vs *The 12 Week Year* et al.) | 3 | 3 | 9 | Legal/Brand | Q10 trademark screen before brand investment; naming territories in Stage 3 | Trademark search result | Founder |
| R-13 | Benchmark figures relied on are secondary-sourced and partly unverifiable from this environment | 3 | 3 | 9 | Research | Source audit (`02-research/source-audit.md`); correction log; re-verify before external use | Source audit verdicts | Product |
| R-14 | Seasonality mistimed launch (missing January/September windows) | 2 | 3 | 6 | Commercial | Roadmap timing awareness at Stage 6/7 planning | Stage 6 start date | Founder |
| R-15 | Subscription edge-case defects (restore, refund, expiry, offline entitlement) reach production | 3 | 4 | 12 | Engineering | Subscription lifecycle test suite (`09-quality/test-strategy.md`); sandbox edge-case pass at Stage 8; billing integrity monitored at rollout | Stage 8 test report | Engineering |
| R-16 | Sensitive-evidence feature built before need established (violates D-003), creating privacy liability without value | 2 | 4 | 8 | Privacy | Q12A gate before any photo feature; ADR-003 deliberately unresolved; data minimisation rules in privacy model | Q12A decision | Security |
| R-17 | Store rejection at Stage 10 (subscription disclosure, health claims, account deletion, data safety) | 2 | 4 | 8 | Compliance | Requirements built in from Stage 2 (`05-commercial/subscription-requirements.md`, `08-security/*`); pre-submission checklist | Stage 10 review outcome | Engineering |
| R-18 | Research recruitment stalls (especially 65+ band), delaying Stage 1 | 3 | 2 | 6 | Research | Multiple recruitment channels incl. offline; voucher budget; snowball question in script | Two weeks into Stage 1 | Founder |

## Review cadence

- Every stage gate: full register review; scores updated with evidence, not vibes.
- Any score ≥ 15: must have an active mitigation task on the roadmap, or the gate does not pass.
- New risks enter with the stage that discovers them; none are deleted, only closed with a dated note.

## Closed risks

| ID | Risk | Closed | How |
|----|------|--------|-----|
| R-C1 | Teeth-whitening category legal exposure | 2026-07-26 | Category cut from candidate list (synthesis §5.3; pending formal Q1 sign-off it stays out of all scope documents) |
| R-C2 | Minor-safety exposure from under-18 use of body-composition content | 2026-07-26 | 18+ product-wide (D-001/D-005); enforcement design still owed at Stage 2 (onboarding age screen) |
