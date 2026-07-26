# Concept Statements, Positioning Hypotheses and the Landing Experiment

**Status:** Partially superseded, 26 Jul 2026 (D-009: passive-first default). **Single sources now:** the landing experiment, positioning arms, category vote and thresholds live in [`../landing-page-experiment.md`](../landing-page-experiment.md), [`../category-demand-test.md`](../category-demand-test.md), [`../pricing-interest-test.md`](../pricing-interest-test.md) and [`../passive-validation-plan.md`](../passive-validation-plan.md). **Still authoritative here:** §1 concept statements (shared stimuli for landing arms and any escalated interviews) and §5 willingness-to-pay interview methods (escalation use). Copy obeys the claims policy and pressure-lexicon bans — validation materials are brand materials.

## 1. Three concept statements (read aloud in interviews, rotated order; also the landing arms' seeds)

**C1 — Guidance-led** *(tests D-002 as the hook)*
> "A mobile app for one meaningful goal at a time. You pick the goal; it gives you a professionally built twelve-week programme that tells you exactly what to do each day, shows you how, and explains why it matters — and when life interrupts, it rebuilds the plan instead of scolding you."

**C2 — Container-led** *(tests the 12-week frame as the hook)*
> "A twelve-week challenge app with a real beginning, middle and end. One goal, twelve weeks, a clear daily step — and at the end, an honest record of what you did and what changed, instead of a streak that eventually breaks."

**C3 — Recovery-led** *(tests the comeback as the hook)*
> "An app for people who start strong and get knocked off course. It guides one important goal for twelve weeks and is built around the hard part: when you miss days, it gives you a genuine way back — no guilt, no broken streaks — so falling behind doesn't mean starting over."

Rules: statements are read as written (no improvising); reactions recorded per moderator guide E1; the statements never claim outcomes, never mention price, and never name a goal category (D-004 — the participant's own goal supplies the category in their head, which is itself data).

## 2. Three landing-page positioning hypotheses (mirroring C1–C3)

| Arm | Headline (draft) | Subline (draft) | Hypothesis |
|-----|------------------|-----------------|------------|
| H1 Guidance | "Know exactly what to do today." | "One meaningful goal. Twelve weeks. A programme that tells you, shows you, and adapts when life interrupts." | Guidance-hunger (HS-DIRECT/HS-SHOW) is the strongest converter |
| H2 Container | "Twelve weeks. One goal. Actually finished." | "A guided programme with a real beginning, middle and end — and proof of what changed." | The bounded-finish promise converts best |
| H3 Recovery | "Built for the week you fall behind." | "A guided 12-week programme with a real way back after missed days — no guilt, no broken streaks." | The comeback promise converts best (the contrarian bet) |

All arms share: the same neutral visual (no fake product screens — a simple typographic page), the same "get early access" email field with double-opt-in wording, the same footer honesty ("in development; researching with real users first"), and a second step after signup — the **category vote** (§4) and one optional question.

## 3. Landing-page experiment specification

- **Goal:** message resonance + demand floor, *not* conversion optimisation. This is a smoke test with honest limits.
- **Build:** one static page, three variants (H1/H2/H3) — rotation by simple round-robin/URL split; a lightweight privacy-respecting counter (no ad SDKs, no fingerprinting; the analytics-spec spirit applies to the landing page too); double-opt-in email tool from the third-party-register's rules (DPA checked before selection).
- **Traffic plan — organic-first (per founder):** channel posts where self-promotion is permitted (distinct from research recruitment posts — never mixed, never the same communities in the same week), personal-network shares, one short "building in public" post per week. Target ≥300 unique visitors across arms. **Paid top-up (~£100–150 for ~equal arm fill) is pre-specified here but launches only on the founder's separate, explicit go** — no spend under this pack.
- **Runs:** 2–3 weeks alongside interviews; arms get comparable volume before any reading (no peeking-declared-winner).
- **Measures:** unique visitors per arm · email signup rate per arm · category-vote distribution · optional-question answers. Personal data handling per [consent-and-privacy §2] (landing emails kept separate from interview data, forever).

## 4. Programme-category demand-testing method

Post-signup step (and the interviews' S2 distribution as the second source): *"Which goal would you most want a guided twelve-week programme for? Pick one."* — fixed list balanced across archetypes: get fitter/stronger · learn to code · learn a language · write something real (book/portfolio) · build a steady routine (sleep, focus) · a creative skill (instrument, drawing) · other (short text, stored unlinked per D29). Reading rules: concentration ≥35% on one category across ≥100 votes = a flagship signal for Q1; a flat spread = the launch-thesis warning the research plan's kill-signals name. Interview S2 goals are tallied against the same list for triangulation. This method informs Q1 — it does not decide it (founder decision).

## 5. Willingness-to-pay method (no "would you buy?" — three honest instruments)

1. **Past-spend reconstruction (primary; interview C9–C10):** itemised real spend on the goal in the last 18 months — amounts, what felt worth it, what felt wasted. Real money already spent is the only WTP evidence that can't posture. Output: lived price bands per band/pattern (feeds pricing-experiments A1).
2. **Trade-off forcing (interview close of C, one card):** "Last one on money. Here are three real things people pay for: a gym/course membership ~£25 a month; a one-off plan ~£30; a coach ~£150 a month. For [their goal], which have you actually considered or done — and what made the others feel wrong?" — positions our future price points against *lived* references without naming our product's price.
3. **Landing commitment-depth (behavioural):** after email signup, one optional question: "If this existed today, what would you honestly expect to pay for a full 12-week guided programme? — nothing / one-off £15–35 / around £5–10 monthly / more than that / don't know." Stated-preference, so weighted lowest — but *asked after a real micro-commitment* (the signup), which improves it; and the "nothing" rate is itself the freemium-pressure signal.
Explicitly banned: fake pre-order buttons, fake checkout tests, "reserve your spot for £1" mechanics — deceptive-pattern territory this company doesn't enter even for research.

## 6. Success and failure thresholds (pre-registered; the full gate logic lives in [decision-criteria.md](decision-criteria.md))

Landing floor: ≥3% blended signup rate on ≥300 visitors (below = message or demand problem — diagnose which via arm spread before concluding). Arm signal: a ≥1.5× signup-rate lead on comparable volume = that positioning leads Stage-2 messaging (still not final brand copy). Category signal: per §4. Interview thresholds: per decision-criteria (they gate; the landing test corroborates, never overrules the interviews).
