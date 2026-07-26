# Passive Validation Plan (Stage 1B — the default path)

**Status:** Designed and ready; **nothing is published, no users contacted, no spend committed** (Gate B publication is a founder go; D-010 cap ≤£300 cumulative). Under D-009, this passive system — not founder-led interviews — is Stage 1's default method for collecting genuine behaviour; the [interview pack](stage1-pack/README.md) remains the escalation tool.

## 1. What this system is

A low-maintenance evidence machine: one landing experiment (three positioning arms), a category-demand vote, a pricing-interest click test that takes no payment, a privacy-respecting waitlist, one optional micro-survey — instrumented so that a **weekly summary assembles itself** and the founder's involvement is ~15 minutes of reading plus any go/no-go the thresholds raise.

## 2. Components and their documents

| Component | Document | Answers |
|-----------|----------|---------|
| Landing experiment (3 positioning variants) | [landing-page-experiment.md](landing-page-experiment.md) | Which promise framing earns real interest (guidance / container / recovery) |
| Category demand vote (4 propositions) | [category-demand-test.md](category-demand-test.md) | Where guided-programme demand concentrates (Q1 evidence) |
| Pricing-interest click test | [pricing-interest-test.md](pricing-interest-test.md) | Which price/term framings people *act* on — no payment taken |
| Waitlist + optional micro-survey | landing-page-experiment §4–5 | A reachable early cohort + minimal self-reported context |
| Evidence dashboard + weekly summary | [validation-dashboard.md](validation-dashboard.md) | The self-assembling weekly read |
| Unmoderated prototype testing (Stage 5 prep) | [unmoderated-testing-plan.md](unmoderated-testing-plan.md) | Age-inclusive usability evidence without moderated sessions |

## 3. Integrity rules (bind every component)

1. **No deception:** the page says the product is in development; the pricing test states "no payment will be taken — we're testing interest" *after* the click (the click itself must be honest behaviour, the reveal immediate); no fake availability, popularity or countdowns (paywall-principles apply to research too).
2. **Privacy floor:** minimal collection (email only for waitlist; everything else optional); double-opt-in; plain-language purpose; separate storage from any interview data; deletion honoured; no ad SDKs, no fingerprinting — a privacy-respecting counter only (third-party register rules).
3. **No fabrication:** dashboards report observed counts with collection method and date range; empty weeks are reported empty.
4. **Friends-and-family separation:** shared links carry a source tag (`?src=ff` for personal-network shares vs `src=organic-<channel>`); F&F rows are counted and reported **separately** and never feed thresholds; the summary shows both lines so support is visible but not confused with market evidence.
5. **Fraud/duplicate hygiene:** one-vote-per-email token on the category vote; disposable-email domains flagged; duplicate-IP-range clusters flagged (coarse, no fingerprinting) for review rather than silent exclusion; any exclusion is logged with its rule.

## 4. Thresholds (pre-registered here; detail per component doc)

- **Proceed signals:** blended signup ≥3% on ≥300 organic visitors · one positioning arm leads ≥1.5× on comparable volume · category vote concentration ≥35% on ≥100 organic votes · pricing-interest clicks distributed with <50% on "free only".
- **Revise signals:** signup 1.5–3% (message iteration round, one per arm, then re-read) · flat category spread (revisit propositions before concluding) · pricing clicks concentrated on "free only" (revisit Q5/Q6 framing).
- **Stop signals:** <1.5% blended signup after one full message-iteration round across all arms · sustained zero organic traction across every channel attempt (documented) — either triggers a founder review against `stage1-pack/decision-criteria.md` S4 before any further spend.
Thresholds compare **organic rows only** (rule 4). All results — including nulls — are logged.

## 5. Escalation to interviews (D-009 triggers, restated operationally)

The dashboard carries a standing "escalation check" row: if public evidence and passive behaviour conflict materially, a safety-sensitive question is unresolved, age-inclusive failures need diagnosis, willingness-to-pay stays ambiguous after the pricing test, or a major decision can't responsibly be made — the weekly summary recommends the *smallest sufficient* interview escalation (often 3–5 targeted conversations, not the full 9–12), as a founder decision.

## 6. Founder involvement (D-008 envelope)

One-time: approve publication + channel list + any spend (Gate B go). Weekly: read the summary (~15 min); answer any threshold-raised question. That is the entire designed load; everything else runs itself or queues.
