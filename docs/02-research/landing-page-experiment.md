# Landing-Page Experiment Specification

**Status:** Ready to build; **not published** (Gate B founder go required). Single source for the landing experiment — supersedes the landing sections of `stage1-pack/concept-and-landing-tests.md` (which now points here); the concept statements themselves remain shared with the interview pack. Integrity and separation rules inherit from [passive-validation-plan.md](passive-validation-plan.md) §3.

## 1. Structure

One static, fast, accessible page; three variants assigned round-robin (URL-split); shared skeleton:

1. **Headline + subline** (the variant), 2. three honest support lines (what it is: guided daily step · built for the week you fall behind · a real finish at week 12 — order varies with the arm), 3. **"In development — join the early list"** email field (double-opt-in), 4. post-signup step: category vote → pricing-interest panel → optional micro-survey, 5. footer honesty: who is building this, privacy one-liner, no fake anything.

Design: typographic, calm, no fake product screenshots, no urgency devices; passes WCAG AA contrast, 200% text, keyboard/screen-reader basics (the brand's accessibility floor applies to its first public artefact).

## 2. The three positioning variants

| Arm | Headline | Subline | Tests |
|-----|----------|---------|-------|
| H1 Guidance | "Know exactly what to do today." | "One meaningful goal. Twelve weeks. A programme that tells you, shows you, and adapts when life interrupts." | Guidance-hunger as the hook |
| H2 Container | "Twelve weeks. One goal. Actually finished." | "A guided programme with a real beginning, middle and end — and proof of what changed." | The bounded-finish promise |
| H3 Recovery | "Built for the week you fall behind." | "A guided 12-week programme with a real way back after missed days — no guilt, no broken streaks." | The comeback promise |

Copy rules: claims-policy compliant; no category named (D-004 — the vote supplies category signal); no prices on the page itself (pricing test is post-signup).

## 3. Traffic plan (organic-first; per D-010)

Channels where self-promotion is permitted, one post per channel, logged (where/when/wording): relevant subreddits' promo threads, indie/build-in-public communities, personal network (tagged `src=ff`), one weekly build-in-public post — sustained across the **six-week window** (channel-mix rules: [research-limitations](research-limitations.md) channel-bias entry; ≥3 distinct channels, no channel >40% of qualified rows). **Target is stated in evidence, not visitors: ≥100 qualified category votes by the read date**, which the funnel arithmetic prices at **≈2,500–4,200 organic visitors** ([passive-validation-plan §4.2](passive-validation-plan.md)); ≥300 organic visitors remains the separate floor for the signup-*rate* read. Reaching the vote floor organically is genuinely uncertain — if the trajectory falls short, the read date records **Extend or Escalate** (§4.5), never a quiet threshold cut. Paid top-up (£100–150, evenly split) is pre-specified but **launches only on a named founder go**, stays inside Gate B's ≤£300 cumulative cap, and honestly buys only a fraction of the gap at typical click prices — escalation is the designed fallback, not paid spend.

## 4. Waitlist (privacy-respecting)

Email only; double-opt-in wording: "Early-access updates about this product only. No marketing, unsubscribe anytime, delete on request." Stored in a register-compliant tool; never joined to interview data; source tag stored; deletion honoured within 7 days.

## 5. Optional micro-survey (post-vote, all optional, ≤30 seconds)

Three questions, each skippable: (1) age band (the four D-001 bands + prefer-not-to-say) — *the only demographic asked, because age-inclusive demand is a standing question*; (2) "What have you already tried for this goal?" (multi-choice: apps / courses / coach or trainer / plans from the internet / nothing yet); (3) "What usually ends it?" (multi-choice: life gets busy / results too slow / lose interest / the tool annoyed me / it worked, I finished). No free text (analytics-prohibited content risk at this trust level); every answer optional by design.

## 6. Analytics events (page-level, consentless-minimal)

`page_view {arm, src}` · `signup_started {arm}` · `signup_confirmed {arm, src}` (post double-opt-in) · `vote_cast {category, src}` · `pricing_panel_viewed {arm}` · `pricing_option_clicked {option, src}` · `survey_answered {q, choice}` · `unsubscribe {—}`. Counter tool: privacy-respecting, no cookies beyond essentials, no fingerprinting; counts only. Definitions frozen here so weekly summaries are comparable.

## 7. Reading rules and thresholds

Per [passive-validation-plan §4](passive-validation-plan.md): organic rows only; arms compared on `signup_confirmed / page_view` at comparable volume; one message-iteration round per arm permitted before any stop conclusion; every read logged in the dashboard with date ranges and counts. Explicit non-goals of this instrument: it cannot measure retention, completion appetite, or real willingness-to-pay (the pricing test approximates interest only) — those limits are stated wherever results are quoted (research-limitations.md).
