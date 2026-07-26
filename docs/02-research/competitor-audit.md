# Competitor Audit — Consolidated

**Status:** Complete first pass, 26 July 2026 (31 products studied across ten categories). Evidence base: [Annex B](annex-b-market-landscape.md) (15 products), [Annex E](annex-e-competitor-extension.md) (16 products), verified per [source audit](source-audit.md). This document is the *analysis*; per-product sourcing lives in the annexes. FACTs below trace to annex citations; **[INT]** marks interpretation. Nothing here is a design to copy — the audit exists to locate the gap and the traps.

## 1. Coverage

| Category | Products studied |
|----------|------------------|
| Habit tracking | Streaks, Habitica, Way of Life, HabitBull, Strides, Atoms |
| Guided fitness | Centr, Nike Training Club, NHS Couch to 5K (+ Zen Labs C25K), The Body Coach, 90 Day Challenge |
| Skill learning | Duolingo, Mimo, Yousician, Brilliant |
| Goal planning/execution | Strides (dual), GoalsWon, The 12 Week Year "Achieve" |
| Coaching | Noom, Future, Coach.me, GoalsWon |
| Behaviour change | Fabulous, Finch, Noom |
| Journaling | Stoic, Day One |
| Fixed-duration challenges | 75 Hard (official), Reset75, Her 75, 30 Day Fitness Challenge (Leap), Gymshark 66, "66 Days" niche apps |
| Accountability/commitment | StickK, Beeminder, Coach.me |
| Personal development | Fabulous, Atoms, The 12 Week Year ecosystem, Sleep Cycle (design benchmark) |

## 2. The audit framework, answered across the field

**Positioning.** Two crowded poles: *utility trackers* (record what you decide to do — Streaks, Strides, Way of Life) and *content libraries* (here are 500 workouts — NTC, Centr, Gymshark). The guided middle — "we decide today's step with you, adapt it, and get you to a defined end" — is occupied mainly by **humans at 10–20× app pricing** (Future $149–199/mo; GoalsWon ~$100/mo; Coach.me $87+/mo) and by single-domain fixed-length programmes (C25K, Body Coach). **[INT]** No at-scale product generalises guided fixed-duration transformation across goal domains at software prices — this is the same gap seen from a second, wider dataset, now with the pricing-corridor evidence to bound it (£0 free tier → ~£30–130/yr software → £900+/yr humans).

**Onboarding & paywall timing (the field's self-inflicted wound).** FACTS: Centr takes card details after a 4–6-question quiz, before first value; Her 75's forced post-questionnaire paywall preceded its May-2026 ranking collapse (single-source, COR-01); Mimo interrupts onboarding with a 14-day-trial screen; Brilliant's dominant complaint is surprise annual renewal after trial; Future takes payment before the first workout but *after* a persuasive human-matching moment. Counter-examples: NTC/NHS C25K/Gymshark (no paywall ever), Finch (generous free tier, monetises attachment), Yousician (paywall after first real session). **[INT]** The evidence is one-directional: pay-before-value correlates with the field's worst trust profiles; value-first correlates with its best. This audit *independently reconfirms* the Q5/Q6 recommendations.

**Daily experience & input burden.** The tracker pole demands the most input (Strides/HabitBull: everything is manual logging) and gives the least direction. The guided pole (C25K's voice-coached intervals, Future's coach-built sessions, Centr's planner) demands almost nothing but attendance. **[INT]** Input burden and guidance quality are *inversely* correlated across the entire field — strong external validation of D-002. Yousician's assessment-by-doing (play; be placed) is the best onboarding-input pattern seen: observe, don't interrogate.

**Recovery after missed days (the emptiest column in the market).** Documented recovery design exists in exactly four places (Annex E cross-cutting finding): NHS C25K (repeat-a-week is normal and sanctioned), Way of Life ("skip" as a legitimate third state), Mimo (pre-purchasable streak freeze — plan for absence in advance), Beeminder (legitimacy check + no-questions refund on derail). Everything else punishes (Habitica HP loss), guilts (Duolingo's documented notification pressure), or ignores (libraries don't notice you left). **[INT]** Recovery-as-content (authored re-entry days, fresh-start weeks) exists nowhere in the studied field. It is the clearest open differentiator and the hardest to bolt on, because it is content + engine, not copy.

**Progress models.** Streak-chains dominate (Duolingo, Habitica, niche 66-day apps) despite the documented anxiety literature; libraries count sessions; Noom's "psychology" progress collapsed into weigh-ins and generic coach messages (complaint corpus); GoalsWon/Future substitute a human's judgement — which users love and which doesn't scale. **[INT]** Almost nobody shows *capability change over a bounded arc* — C25K is the honourable exception and its graduation moment is beloved. The week-12 report design (comeback story included) has no field precedent found.

**Monetisation & pricing.** Field norms per annexes: software subscriptions cluster $40–180/yr (Fabulous ~$40, Sleep Cycle ~$40, 75 Hard ecosystem ~$40, Day One/Stoic ~$50, Atoms ~$70–90, Yousician ~$110–180, Brilliant ~$160, Centr ~$120–150); human accountability $1,000–2,400/yr; H&F category medians $9.70/mo (COR-03 corrected context). Billing conduct is the market's reputational cancer: of 31 products, at least **nine** carry billing-practice complaint profiles as their dominant negative theme (Fabulous, Noom, Centr, Yousician, Brilliant, Mimo, Leap, Habitica-adjacent, Zen Labs upsells). **[INT]** A 12-week product has a structural honesty advantage nobody uses: pricing the *term* the promise actually spans, with an explicit renewal decision.

**Trust & accessibility.** No studied product surfaces author/reviewer credentials or citations in-product (Atoms gestures at book-provenance; Noom claims psychology basis without in-product evidence). Formal accessibility documentation: none found across 31 products (Annex E flags this as a category-wide gap); only audio-led designs (C25K, NTC, Future) are incidentally accessible. **[INT]** Governance-visible content (FR-80) and genuine WCAG-level accessibility are both open, cheap-to-hold differentiators — and D-001 requires the second anyway.

**Design identity.** The field's visual centre of gravity: gamified-cute (Finch, Habitica, Duolingo), glossy-celebrity (Centr, Future), utility-chart (Strides, Beeminder, Way of Life), institutional-warm (NHS). Sleep Cycle holds the calm-instrument position the founder admires — and its Q1 2026 numbers (verified) prove polish alone doesn't retain. **[INT]** The calm-premium-guide aesthetic territory is genuinely under-occupied for goal pursuit.

## 3. Lessons adopted (traceable into our specs)

1. Sanctioned repetition completes programmes at scale (C25K) → lifecycle clock semantics + recovery composition.
2. Observe-don't-interrogate onboarding (Yousician) → progressive personalisation, G4.
3. Plan-for-absence beats repair-after-failure (Mimo freeze) → pause with return date; recovery paths include restructure.
4. "Skip ≠ fail" (Way of Life) → scheduled-days-only lapse detection; rest days as content.
5. Grace with consequences (Beeminder's legitimacy check) → tolerant completion rules; honest partial reports.
6. The human's power is *noticing* (Future/GoalsWon) → adaptation messages that reference actual behaviour ("because last week felt heavy…").
7. The day-view is the product (Centr's planner, minus its paywall) → Today experience anatomy.
8. Free-forever earns goodwill but not transformation (NTC) → value-first boundary, not value-free product.

## 4. What must not be copied (traceable into non-goals)

Pay-before-value onboarding (Centr, Her 75) · streak-anxiety mechanics (Duolingo, Habitica, 66-day clones) · guilt notifications (Duolingo's documented pattern) · billing opacity in any form (nine-product complaint corpus) · re-segmenting paid tiers post-purchase (Mimo Pro→Max) · annual-disguised-as-monthly (Yousician) · revenue from user failure (Beeminder's structural critique) · challenge-as-marketing shallowness (Gymshark 66's evaporating progress) · dead-air onboarding (Future's week-long wait) · platform-inconsistent pricing users compare and resent (Finch, Day One).

## 5. Standing audit cadence

Re-run quarterly post-launch (lightweight: pricing, paywall timing, complaint-theme drift) and before any major commercial decision; new entrants in "guided 12-week" positioning get a full-framework pass. Findings append here with dates — this document stays alive.
