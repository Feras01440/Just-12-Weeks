# 12 Weeks — Product Documentation

Documentation root for **12 Weeks** (working name — final name is an open decision, Q10). A guided 12-week transformation platform for adults 18+: guidance-first, evidence-based, recovery-designed. The product is in the **foundation phase**: no production code, no final visual design — deliberately, by founder instruction.

## Governing decisions

Four confirmed founder decisions override everything else (full text: [`00-foundation/decision-log.md`](00-foundation/decision-log.md)):

1. **D-001** Adult (18+) and age-inclusive; audience defined behaviourally, never primarily by age.
2. **D-002** Guidance-first, never tracker-first: *"tell, show, guide and adapt before asking the user to record anything."*
3. **D-003** Progress is programme-specific; measurements/photos are optional per-programme tools, never the platform's spine.
4. **D-004** The broad platform vision is preserved; any flagship launch category is launch scope, not identity. **The flagship category is not yet chosen.**

Open decisions live in [`00-foundation/assumptions-and-questions.md`](00-foundation/assumptions-and-questions.md) (Q1–Q13) and the [open-decisions register](00-foundation/open-decisions-register.md). Labels used throughout: Founder requirement · Confirmed founder decision · Verified external fact · Evidence-supported inference · Professional recommendation · Unvalidated hypothesis · Founder decision required · Deferred technical decision.

## Map

```
docs/
  00-foundation/   Founder brief (transcribed + directions), concept synthesis,
                   open questions, decision log, review report, work log
  01-product/      Vision, thesis, experience principles, PRD, scope, non-goals,
                   dependency map, success metrics, analytics spec,
                   programme engine + authoring/adaptation/evidence/lifecycle
  02-research/     User research plan, source audit + correction log,
                   competitor audit (31 products), review themes, market
                   opportunity, gaps & risks, annexes A–E
  03-ux/           IA, navigation, 23 core flows, Today/recovery/week-12
                   experience specs, content strategy, accessibility requirements
  04-brand/        Brand strategy, three art-direction territories (A/B/C),
                   typography & colour strategies, signature-experience
                   candidates, anti-generic audit
  05-commercial/   Monetisation options, pricing experiments, paywall
                   principles, subscription compliance register, week-13 models
  06-content/      Programme governance, research standards, claims policy,
                   programme template, review workflow, content versioning
  07-architecture/ C4 context & containers, domain model, data-model notes,
                   API strategy, state machines, notification & content
                   delivery architectures, ADR-001/002/003
  08-security/     Data inventory & classification, privacy model, threat
                   model, retention & deletion, third-party register,
                   abuse cases, security requirements
  09-quality/      Test strategy, device matrix, accessibility test plan,
                   performance plan, release checklist
  10-roadmap/      Stage 0–12 delivery roadmap, risk register, milestone gates
```

## Status (26 July 2026)

**Foundation set complete and internally audited** (see [`00-foundation/foundation-review-report.md`](00-foundation/foundation-review-report.md) and [`work-completed.md`](00-foundation/work-completed.md)). Every document is **Draft — awaiting founder review** unless marked otherwise inside; provisional recommendations are explicitly reversible and unapproved. Planned-but-ungated items that remain deliberately unwritten: `01-product/prd` deep per-category extensions (post-Q1), `02-research/validation-evidence.md` (filled during Stage 1), interview-script.md (lives inside the research plan until Stage 1), competitor-audit-framework.md (superseded by the executed audit; the framework lives in its §2), design-system component library (post-Gate-3 by rule).

**Next gate:** founder reviews the [foundation review report](00-foundation/foundation-review-report.md) and answers the [open decisions](00-foundation/open-decisions-register.md). Stage 1 recruitment, brand-territory selection, and any build wait behind that gate.
