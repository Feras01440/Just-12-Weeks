# Pricing-Interest Click Test

**Status:** Ready; runs inside the landing experiment's post-signup step (not published). **No payment is taken at any point.** Purpose: behavioural pricing-interest evidence stronger than survey talk but honestly weaker than real purchases — feeding Q5/Q6 experiment design, never setting a price.

## 1. Mechanic

After the category vote: *"If this existed for your goal, which would you honestly consider?"* — four click options, order randomised, **prices explicitly labelled as illustrative**:

| Option | Framing shown |
|--------|---------------|
| 12-week term | "£19.99 for a full 12-week guided programme term" |
| Monthly | "£7.99 a month, cancel anytime" |
| One-off programme | "£29.99 once, keep the programme" |
| Free only | "I'd only use a free version" |

On click, immediately: *"Thanks — that's genuinely useful. No payment is being taken and no card is needed; we're testing which shape people prefer while the product is in development."* The click is honest behaviour (a real preference expression); the reveal is instant; no simulated checkout, no card fields, no 'reserve your spot' theatre — the deceptive-pattern line from the interview pack's WTP method §banned applies unchanged.

## 2. Why these four options

They map to the live monetisation candidates (M3 quarterly-term, M2 monthly, M1 programme purchase) plus the freemium-pressure floor — so click distribution directly informs the Q5/Q6 experiment sequence (pricing-experiments.md B-phase arms). Price points are the existing GBP hypotheses; they are **test stimuli, not proposals**, and are version-stamped like the vote wordings.

## 3. Reading rules

- **Secondary evidence, never gating alone** — verdict mechanics per [passive-validation-plan §4](passive-validation-plan.md). This panel sits *below* the vote in the funnel, so its qualified-click count will trail the vote count; directional claims require **n ≥ 50 qualified clicks** (95% interval ≈ ±14 points at that n — quoted whenever cited); below 50, raw counts are reported labelled "insufficient for any claim". Per-arm and per-category cuts only where the cut itself clears n ≥ 50.
- Signals (at or above floor): "free only" <50% = paid appetite exists in this audience; term option leading or close = the native-unit hypothesis strengthens; one-off leading = catalogue-business pressure (W4 scenario); "free only" ≥65% = Q5/Q6 posture revisit before prototype.
- Honesty ceiling *(carried into every citation of results)*: this measures **stated-preference-by-click among people interested enough to sign up** — it over-states real conversion by an unknown factor and cannot be cited as conversion evidence anywhere (research-limitations.md entry). Real WTP evidence arrives only at Gate D/E with genuine transactions.
- If ambiguity persists after this test *and* it blocks a major decision → D-009 escalation trigger (small targeted interview round on past-spend reconstruction, the pack's method).

## 4. Events

`pricing_panel_viewed {arm}` · `pricing_option_clicked {option, arm, category_voted, src}` · frozen definitions per landing spec §6; results roll into the weekly dashboard with counts, date ranges and the honesty-ceiling note attached by template.
