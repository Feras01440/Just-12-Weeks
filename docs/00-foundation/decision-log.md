# Decision Log

**Status:** Active. Four founder decisions recorded 26 July 2026; all other product decisions remain open.

Every meaningful decision gets a row here once the founder approves it. A decision is not made because a document proposes it; it is made when it appears in this log with the founder's approval recorded. Documents elsewhere in `docs/` may recommend — only this log confirms.

Labels used throughout this documentation set:
**Founder requirement** · **Confirmed founder decision** · **Verified external fact** · **Evidence-supported inference** · **Professional recommendation** · **Unvalidated hypothesis** · **Founder decision required** · **Deferred technical decision**

## Confirmed decisions

| # | Date | Decision | Rationale | Revisit trigger | Approved by |
|---|------|----------|-----------|-----------------|-------------|
| D-000 | 2026-07-26 | Foundation-first process: strategy → validation → design → build, with explicit approval gates between stages | Concept spans regulated-adjacent categories where silent assumptions are dangerous | n/a — process decision | Founder (project brief) |
| **D-001 (FD-1)** | 2026-07-26 | **Adult and age-inclusive audience.** The product is for adults 18+, usable across adult life stages including 60s/70s+. The core audience is defined behaviourally, not by age: *"Adults aged 18+ who have a meaningful goal requiring sustained effort and who need structured guidance, encouragement and recovery support to remain consistent long enough to make meaningful progress."* Launch campaigns/flagship programmes may target narrower needs or channels, but never as the product's permanent identity or eligibility boundary. Research must sample 18–29, 30–49, 50–64 and 65+. Design must deliver strong legibility, scalable text, high contrast, plain language, clear navigation, low cognitive burden, reduced-motion support, accessible targets, and suitability for varied digital confidence. Individual programmes define their own suitability and exclusions. | Founder direction, 26 Jul 2026 | Founder instruction only | **Founder** |
| **D-002 (FD-2)** | 2026-07-26 | **Guidance-first, not tracker-first.** The product's primary role is to actively guide: a clear action for today; step-by-step guidance; why it matters; demonstrations; easier/standard/advanced alternatives; contextual help; recovery after missed days; weekly adaptation; preparation for what's next; meaningful encouragement; a strong week-12 completion. Permanent experience principle: *"Tell, show, guide and adapt before asking the user to record anything."* User input must be purposeful (safety, personalisation, guidance change, meaningful evidence). Progressive personalisation instead of a large onboarding questionnaire. Routine completion ≤ 1–2 lightweight interactions unless the activity genuinely requires more. The home experience must not be primarily dashboards, charts, forms, journals, manual statistics, photo prompts or information grids. | Founder direction, 26 Jul 2026 | Founder instruction only | **Founder** |
| **D-003 (FD-3)** | 2026-07-26 | **Programme-specific progress.** Body measurements, progress photographs and daily self-reporting are not central to the universal platform. Progress is defined per programme (guided-action completion, capability improvement, artefacts, demonstrations, milestones, checkpoints, optional measurements, optional photographs, weekly achievements, real-world outcomes). Photographs are optional, never required for completion, never pressured, never assumed. The former Q12 (photo storage) is replaced by Q12A (which programme types genuinely benefit from optional visual evidence) and Q12B (the private storage/sync model when justified); no local-vs-cloud decision before need, privacy model and technical requirements are established. | Founder direction, 26 Jul 2026 | Founder instruction only | **Founder** |
| **D-004 (FD-4)** | 2026-07-26 | **Preserve the broad platform vision.** The long-term product is a guided 12-week transformation platform for different meaningful goals. Brand, language, navigation, architecture, experience and programme engine must not become permanently fitness-specific before validation. A flagship launch programme is a launch-scope decision, not the product's identity; the engine must support different measurement systems; brand language must work across physical, educational, practical, creative and personal goals. **The flagship category remains unapproved; fitness/body composition is one candidate, not a decision.** | Founder direction, 26 Jul 2026 | Founder instruction only | **Founder** |
| D-005 | 2026-07-26 | 18+ age gate (consequence of D-001): the product is not offered to minors; age screening at onboarding. | Contained in FD-1 ("intended for adults aged 18 and over") | Founder instruction; store policy change | **Founder** |
| **D-006 (Q2)** | 2026-07-26 | **Stage 1 validation audience: "Age-inclusive Restarters"** — adults aged 18+ who have previously begun a meaningful goal requiring sustained effort but struggled to continue after motivation declined or life interrupted the plan. This is a **behavioural validation pattern, not an age-based target market**; recruitment and research materials must include participants across 18–29, 30–49, 50–64 and 65+. The pattern is **over-sampled to understand the hardest retention and recovery problem** — no material may imply the finished product is intended only for people with a history of failure. | Founder direction, 26 Jul 2026 | Stage-1 evidence (pattern fails kill-signals) → founder review | **Founder** |
| **D-007 (Q9, partial)** | 2026-07-26 | **Founder constraints recorded:** time — at least 15–20 hours/week (not yet certain); collaborators — solo founder currently; skills — third-year software engineering student, familiar with TypeScript, React, Next.js and AI-assisted development; can contribute to product and technical work, with specialist review expected for professional mobile UX, visual design, accessibility, security, programme expertise and store readiness; timing — no fixed release date, **quality gates take priority**; acquisition — not yet validated, testable organic channels to be prepared for Stage 1. **Year-one budget: not fixed** — founder requested guidance; scenarios provided in [`05-commercial/year-one-budget-scenarios.md`](../05-commercial/year-one-budget-scenarios.md); envelope to be confirmed after founder reviews them. | Founder answers, 26 Jul 2026 | Budget envelope confirmation; any change in time/collaborators | **Founder** |

## Explicitly NOT approved (recorded to prevent drift)

Per founder instruction, none of the following is decided, and no document may treat them as decided:

1. The flagship programme category (fitness/body composition is a **candidate only**)
2. Any age-specific marketing segment as product identity
3. Final pricing
4. Final monetisation model
5. Final product name
6. Final technology stack
7. Final visual direction
8. Photograph-storage architecture (Q12A/Q12B open)
9. Final programme catalogue size

## Pending decisions (Founder decision required)

Full context in [assumptions-and-questions.md](assumptions-and-questions.md); consolidated register in [open-decisions-register.md](open-decisions-register.md) once the foundation set is complete.

| Ref | Decision needed | Blocks |
|-----|-----------------|--------|
| Q1 | First-release goal categories / flagship programme (launch scope only, per D-004) — **explicitly held open by founder, 26 Jul 2026** | Content plan, launch positioning |
| Q3 | Launch depth: one flagship vs 2–3 programmes — **held open** | Content budget, roadmap |
| Q4 | Meaning of "other 12 needed list" in the original brief | Engine scope (custom challenges?) |
| Q5 | Countdown-offer position (recommendation: never ship as written) — monetisation **held open** | Paywall design, compliance |
| Q6 | Free-tier boundary — **held open** | Monetisation, activation funnel |
| Q7 | Content authorship model | Cost, credibility, governance |
| Q8 | "3D designs": literal or premium-feel intent | Art direction, tech, performance |
| Q9 (residual) | Year-one budget envelope — scenarios provided, founder to confirm | Content model depth, specialist reviews, device lab |
| Q10 | Naming direction (incl. *The 12 Week Year* proximity screen) — **held open** | Brand work (Stage 3) |
| Q12A | Which programme types genuinely benefit from optional visual evidence | Evidence model detail |
| Q12B | Private storage/sync model for justified visual evidence — **held open** (ADR-003) | Architecture (deferred technical decision) |
| Q13 | Week-13 retention model emphasis | Monetisation, content roadmap |

Also explicitly held open by founder instruction (26 Jul 2026): brand territory, mobile framework (ADR-001 stays provisional), final pricing, final visual design, final programme count.
Resolved and removed from pending: former Q11 (age policy) → D-001/D-005; former Q12 → replaced by Q12A/Q12B per D-003; **Q2 → D-006**; Q9 core facts → D-007 (budget envelope residual).

## Deferred technical decisions

Recorded so they are not silently made: mobile framework (ADR-001 provisional, unapproved); content platform (ADR-002 provisional, unapproved); sensitive-evidence storage (ADR-003 deliberately unresolved pending Q12A/Q12B); physical database schema; notification provider; analytics vendor.
