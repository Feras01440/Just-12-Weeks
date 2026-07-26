# 12 Weeks — Product Documentation

This is the documentation root for **12 Weeks** (working name; also considered: "The 12 Week Challenge"). The product is in the **foundation phase**: strategy, research and specification precede all production development. No application code exists yet, deliberately.

## How to read this

Every document carries a status header:

- **Draft — awaiting founder review**: written, not yet approved.
- **Approved**: founder has signed off (recorded in `00-foundation/decision-log.md`).
- **Planned**: agreed to exist, not yet written. Gated on an earlier approval.

Nothing marked *Planned* is written until the gate before it is passed. This is intentional: the founder's brief requires explicit approval between phases.

## Structure

```
docs/
  00-foundation/          The source concept and its honest assessment
    founder-brief.md          Faithful transcription of the original handwritten brief
    concept-synthesis.md      Professional synthesis: strengths, weaknesses, risks
    assumptions-and-questions.md  Open questions requiring founder decisions
    decision-log.md           Running record of decisions and their rationale

  01-product/             What we are building and for whom      [partially drafted]
    product-vision.md         (planned — after founder answers Q1–Q12)
    product-thesis.md         (planned)
    target-audiences.md       Three segment hypotheses + recommendation
    prd.md                    (planned — after validation)
    scope.md                  (planned — MVP boundaries)
    programme-engine.md       (planned — universal 12-week engine spec)
    success-metrics.md        (planned)

  02-research/            How we validate before building        [partially drafted]
    user-research-plan.md     Founder-led discovery plan
    interview-script.md       (planned — included in outline within research plan)
    competitor-audit-framework.md  (planned)
    validation-evidence.md    (planned — filled during Stage 1)

  03-ux/                  Experience architecture                [planned]
    information-architecture.md, user-flows.md, content-strategy.md,
    engagement-model.md, accessibility-requirements.md

  04-brand/               Brand strategy and art direction       [planned]
    brand-strategy.md, art-direction-a.md, art-direction-b.md,
    art-direction-c.md, typography-strategy.md, colour-strategy.md,
    signature-experience.md, anti-generic-audit.md

  05-commercial/          Monetisation and launch                [planned]
    monetisation-options.md, pricing-experiments.md,
    subscription-requirements.md, launch-strategy.md

  06-content/             Programme content governance           [planned]
    programme-governance.md, research-standards.md,
    claims-policy.md, programme-template.md

  07-architecture/        Technical foundation                   [planned]
    system-context.md, container-architecture.md, domain-model.md,
    data-model.md, api-strategy.md, state-machines.md,
    architecture-decisions/

  08-security/            Privacy and security                   [planned]
    data-inventory.md, privacy-model.md, threat-model.md,
    retention-and-deletion.md, third-party-register.md

  09-quality/             Testing and release quality            [planned]
    test-strategy.md, device-matrix.md,
    accessibility-test-plan.md, release-checklist.md

  10-roadmap/             Staged delivery                        [partially drafted]
    delivery-roadmap.md       Stage 0–12 roadmap with approval gates
    risk-register.md          (planned)
    milestone-gates.md        (planned)
```

## Current state (26 July 2026)

Foundation Phase, first response delivered. Written so far:

| Document | Status |
|---|---|
| `00-foundation/founder-brief.md` | Draft — awaiting founder confirmation of transcription |
| `00-foundation/concept-synthesis.md` | Draft — awaiting founder review |
| `00-foundation/assumptions-and-questions.md` | Draft — **requires founder answers** |
| `00-foundation/decision-log.md` | Open — no decisions recorded yet |
| `01-product/target-audiences.md` | Draft — hypotheses only, unvalidated |
| `02-research/user-research-plan.md` | Draft — awaiting founder review |
| `10-roadmap/delivery-roadmap.md` | Draft — awaiting founder review |

**Next gate:** founder answers the questions in `00-foundation/assumptions-and-questions.md`. No design, no architecture, no code until then.
