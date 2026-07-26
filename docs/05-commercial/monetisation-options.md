# Monetisation Options

**Status:** Evaluation for founder decision (Q5/Q6 remain open — **no final model chosen here**). Benchmarks carry source-audit corrections; † = secondary-sourced. GBP prices are **hypotheses for experiments** (pricing-experiments.md), not decisions. All models below exclude, permanently: fake urgency, fake discounts, manipulated cancellation, data-selling, ads on user data (non-goals; paywall-principles).

## The evaluation matrix

Assessed per model: user-value alignment · likely user expectations · revenue potential · retention requirement · store/billing implications · refund risk · trust implications · operational requirements · content requirements.

### M1 — Individual programme purchase (one-off, e.g. £24–39 per programme)
- **Alignment:** strong — pay for the thing you're actually doing; matches P4 review theme ("worth it" = bounded outcome for bounded price).
- **Expectations:** ownership: lifetime access to that programme incl. repeats; updates within major version.
- **Revenue:** capped per user unless catalogue grows; no recurring base; upsell path = next programme (week-13).
- **Retention requirement:** none structurally — which is honest but leaves R-01 unmitigated by billing.
- **Store/billing:** simple IAP (non-consumable); no renewal disclosures; family-sharing decisions needed.
- **Refund risk:** moderate (buy-finish-refund abuse is rare in practice; store windows apply).
- **Trust:** highest of all models. **Ops:** entitlement per programme; simple. **Content:** each programme must individually justify its price — quality pressure lands exactly where the promise is (good discipline, hard economics at catalogue-of-one).

### M2 — Monthly subscription (e.g. £7.99–9.99)
- **Alignment:** weak-to-medium — the unit (month) mismatches the promise (12 weeks); month-3 cancellation lands mid-journey.
- **Expectations:** all-access; cancel anytime.
- **Revenue:** category-median pricing ($9.70† median); monthly renews at roughly half annual's aggregate rate†; month-1 cancel cluster†.
- **Retention requirement:** severe — must earn 3 consecutive renewals to cover one journey.
- **Store/billing:** standard auto-renew + full disclosure set. **Refunds:** moderate. **Trust:** neutral (the category default users distrust *by association* — M6 risk). **Ops:** standard. **Content:** pressure to add breadth to justify "all access" — scope-creep risk (R-10).

### M3 — Quarterly / 12-week access (e.g. £19–29 per quarter) — *the product's native unit*
- **Alignment:** strongest conceptual fit in the subscription family: one term = one journey; renewal decision lands exactly at the week-13 moment, forcing the product to *earn* cycle two — incentive-aligned with the user.
- **Expectations:** a term, clearly; renewal at term end (auto-renew with honest reminder, or non-renewing by choice — sub-decision).
- **Revenue:** between monthly and annual; realized revenue per payer likely *above* monthly (fewer mid-journey cancels) — hypothesis for testing; almost no category precedent (differentiation and uncertainty in one†).
- **Retention requirement:** week-13 design (Q13) becomes the renewal engine — the metric and the money align (R-01 mitigated by architecture).
- **Store/billing:** standard auto-renew mechanics support quarterly; disclosure set identical. **Refunds:** low-moderate (term matches expectation). **Trust:** high — the honesty argument writes its own paywall copy. **Ops:** standard. **Content:** week-13 handover + next-journey content must exist by first renewals.

### M4 — Annual subscription (e.g. £39–59)
- **Alignment:** medium — "a year of transformation journeys" is honest *if* the catalogue supports multiple journeys (Q3/D-004 dependency); dishonest sold against a single-programme reality.
- **Expectations:** all-access, long commitment; renewal surprise is the category's #1 complaint theme (T1) — reminder discipline mandatory (and DMCC-regime-proofed for spring 2027).
- **Revenue:** where category revenue concentrates (~68% H&F†) — but median *first* annual renewal is only 23–40%† (COR-04): the model's economics are front-loaded.
- **Retention requirement:** paradoxically low year-1 (paid upfront), then the 95%-never-return cliff† at first renewal.
- **Store/billing:** standard; committed-monthly variant exists outside US/Singapore†. **Refunds:** highest risk of the family (buyer's remorse at big tickets; pro-rata expectations). **Trust:** medium — earned only with aggressive renewal transparency. **Ops:** standard. **Content:** credible multi-journey catalogue.

### M5 — One-time premium unlock (lifetime, e.g. £59–89)
- **Alignment:** medium (Streaks proves craft-loyalty at £4.60; lifetime at content-app prices is a different beast).
- **Revenue:** cash-flow spike, no recurring base, catalogue growth given away forever — hard against ongoing content costs (governance reviews are *recurring* costs).
- **Trust:** high. **Refunds:** low. **Ops:** simple. **Verdict context:** viable only as a *supplementary* tier (a premium-supporter option), not the engine.

### M6 — Hybrid: free preview + programme purchase + optional subscription
- E.g. week 1 free (any programme) → buy the programme (M1) → optional all-access term (M3/M4) for multi-journey users.
- **Alignment:** maps the actual user journey (try → commit to one → become a multi-cycle person); each payment matches a felt value moment.
- **Complexity cost:** entitlement matrix, paywall clarity burden (two offers must not read as a trick), store review care. The trust-preserving version shows *one* choice per moment, never a pricing grid maze.

### M7 — Free challenge + paid expert programmes
- A permanently free basic challenge (routine archetype) as the trust/top-funnel engine; expert-reviewed flagship programmes paid (M1/M3).
- **Alignment:** generous, NHS-C25K-like goodwill; demonstrates the engine publicly (D-004 proof).
- **Risks:** free tier cannibalisation risk is *low* for us (the paid value is authored depth, which the free challenge deliberately lacks); content cost of maintaining a good free challenge is real; "free = the product is the paid programmes" must be legible.

### M8 — Trial mechanics (store-native, 7-day, on any subscription model)
- Trial-originated subscribers show +63.6% LTV in H&F (Adapty†, COR-02); auto-conversion resentment is a top complaint theme (T1) — so trials here ship **with our own pre-conversion reminder** (in-app + notification, day 5), accepting the conversion haircut as a trust purchase. Trials without reminders are not an option for this brand.

## Comparative summary *(Professional recommendation — for decision, not decided)*

| Model | Value fit | Revenue | Trust | Ops | Killer issue |
|-------|-----------|---------|-------|-----|--------------|
| M1 programme purchase | ★★★★ | ★★ | ★★★★★ | ★★★★ | Capped without catalogue |
| M2 monthly | ★★ | ★★★ | ★★★ | ★★★★ | Unit mismatches promise |
| M3 quarterly/12-week | ★★★★★ | ★★★☆ (untested) | ★★★★★ | ★★★★ | No category precedent |
| M4 annual | ★★★ | ★★★★ | ★★★ | ★★★★ | First-renewal cliff; needs catalogue |
| M5 lifetime | ★★ | ★★ | ★★★★ | ★★★★★ | Recurring costs vs one payment |
| M6 hybrid preview+buy+term | ★★★★★ | ★★★★ | ★★★★ (if kept simple) | ★★ | Complexity discipline |
| M7 free challenge + paid | ★★★★ | ★★★ | ★★★★★ | ★★★ | Free-tier content cost |

**Recommended experiment path (not a decision):** launch posture **M6-lite** — free week 1 of the flagship (Q6-b), programme purchase *or* quarterly term as the two clean offers, annual introduced only when the catalogue honestly supports it; M7's free challenge as a fast-follow if Q9 budget allows; M8 reminder-first trial tested against no-trial. Pricing-experiments.md operationalises; paywall-principles.md constrains every variant.
