# Delivery Operating Model

**Status:** Active — implements Confirmed founder decision D-008. How this project runs day to day: heavy preparation and execution are performed by the delivery team's implementers; the Founder reviews major evidence, decides important product questions and approves quality gates. Roles are named neutrally throughout the repository. Companions: [work-packet-template.md](work-packet-template.md), [review-gate-template.md](review-gate-template.md), [handoff-standard.md](handoff-standard.md), [autonomous-work-policy.md](autonomous-work-policy.md).

## 1. Roles

| Role | Responsibilities | Cannot |
|------|------------------|--------|
| **Founder** | Vision, taste, commercial direction; significant spending (per the [staged capital plan](../05-commercial/staged-capital-plan.md)); irreversible decisions; gate approvals; decision-log sign-off | Be required for routine execution; be assumed available >3–5 h in ordinary weeks (6–8 h at gates) |
| **Product lead** | Translates founder decisions into work packets; keeps scope, non-goals and open-decisions registers coherent; owns the roadmap | Approve its own packets; make founder-reserved decisions |
| **Implementer** | Executes work packets: research, documentation, analysis, engineering, testing; produces evidence with the work | Approve own substantial work (maker–checker); exceed packet scope silently; spend beyond gate caps |
| **Independent reviewer** | Reviews substantial work against acceptance criteria and the project's standing instruments (claims policy, lexicons, decision compliance); has not contributed to the work under review | Rubber-stamp; review work they materially shaped |
| **Security reviewer** | Reviews changes touching data, auth, money, privacy surfaces against `08-security/*` | Be skipped on those surfaces |
| **Content reviewer** | Named, credentialed review of programme content per `06-content/programme-governance.md` | Be the content's author (class-2 rule) |

One person or system may hold multiple roles across *different* packets, but never maker and checker on the same substantial packet: **"The creator of substantial work cannot be the sole approver of that work."** *Substantial* = anything that feeds a gate, changes a register, touches money/data/safety surfaces, or will be shown outside the project. Trivial mechanical changes (typo fixes, link repairs) need no independent review, only the standard commit discipline.

## 2. The work cycle

1. **Frame** — product lead drafts a work packet (template) from the roadmap/registers; founder sees packets only when they contain a reserved decision or spending trigger.
2. **Execute** — implementer completes the packet autonomously within the [autonomous-work policy](autonomous-work-policy.md), producing the deliverable *and its evidence* (sources, checks run, limitations).
3. **Check** — independent reviewer verifies against the packet's acceptance criteria + standing instruments; findings return to the implementer; material disagreements escalate per §4.
4. **Log** — outcomes land in the relevant registers (decision log, risk register, correction log, dashboards) per the [handoff standard](handoff-standard.md).
5. **Gate** — at stage boundaries, the founder reviews the gate pack (review-gate template) and approves, redirects, or stops. Gates never pass by default or by silence.

## 3. Decision classes

| Class | Examples | Who decides |
|-------|----------|-------------|
| **Irreversible / identity** | Name, brand territory, flagship category, public launch, any Gate-E spend, safety-boundary changes | **Founder only**, at a gate or explicit decision request |
| **Costly-to-reverse** | Architecture hardening (ADR approval), monetisation model, publishing anything publicly | Founder, on a prepared options memo |
| **Reversible-with-record** | Provisional recommendations, document structure, research method details, internal tooling | Product lead/implementer, logged; founder may override at any gate |
| **Routine** | Drafting, analysis, refactors within scope, fixes | Implementer, normal review flow |

When in doubt, a decision is treated as one class more serious than it appears.

## 4. Escalation rules

Escalate to the founder (asynchronously, batched unless urgent) when: a reserved decision blocks work · an escalation trigger in D-009 fires · evidence contradicts a confirmed founder decision · spend would exceed a gate cap · a safety/legal/trust issue appears · maker and checker disagree materially after one resolution round. Escalations arrive as a one-page memo: question, options, evidence, recommendation, deadline-if-any. Everything else proceeds.

## 5. Stop conditions (work halts without founder sign-off)

Any Stage-1 stop signal (`02-research/stage1-pack/decision-criteria.md`) · a gate failing its checklist · discovery of fabricated or untraceable evidence anywhere (work stops until the correction log resolves it) · any action that would contact users, publish materially, spend beyond caps, or touch production without explicit approval · security incident (SR-9 runbook).

## 6. Git and repository requirements

Per [`CONTRIBUTING.md`](../../CONTRIBUTING.md): human-owned authorship, purpose-based commits in logical groups, neutral branch names, professional pull requests, no tool/vendor attribution, no session links, no secrets. Additional operating rules: work lands via pull request to the working branch (currently `product-foundation/v1` until PR #2 resolves; feature branches thereafter); registers update **in the same commit group** as the work that changes them; force-push only `--force-with-lease`, never on `main`, never after review starts.

## 7. Security boundaries

Implementers operate with least privilege: no production credentials in research/design phases; third-party tools only from the [register](../08-security/third-party-register.md); participant/user data handled only per the consent procedures; no data leaves approved storage. The security reviewer signs any packet that changes these boundaries.

## 8. Quality gates

The existing gate system ([milestone-gates.md](milestone-gates.md)) is the backbone; this model adds: every gate pack is assembled by the product lead, checked by the independent reviewer, and decided by the founder within the D-008 time envelope (gate packs are designed to be decidable in ≤2 hours of reading — the review-gate template enforces a one-page front sheet).

## 9. Travel and asynchronous operation

The model assumes the founder may be unavailable for days at a time: nothing routine waits on the founder; escalations queue in a single "founder inbox" document ordered by urgency; gates are scheduled, not ambushed — the founder gets the gate pack ≥72 hours before a decision is requested; a standing weekly summary (validation dashboard + spend line + escalation queue) is producible in ≤10 founder-minutes of reading; if the founder is unreachable and a hard stop condition fires, work stops rather than guesses.
