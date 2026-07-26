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

## 4. Canonical decision protocol (pre-registered; the only verdict rules — revised in the independent-audit response, 26 Jul 2026)

This section is the **single source of truth** for Stage-1B verdicts. The category-demand, pricing and landing documents, `stage1-pack/decision-criteria.md` and the flagship analysis all defer to it; any older threshold language elsewhere (including the withdrawn "≥25% concentration confirms" rule) is void. Every quantity below is computable in a spreadsheet from the dashboard's raw counts.

### 4.1 Qualified sample definition

A **qualified vote/click** is: organic (not `src=ff`), from a confirmed double-opt-in email, not flagged duplicate/disposable, cast on the **current wording version**. All thresholds count qualified rows only.

### 4.2 The funnel arithmetic, stated honestly

Votes happen *after* signup, so the sample compounds two rates: at the planning assumptions of **3–5% visitor→confirmed-signup** and **~80% of confirmed signups completing the vote**, **100 qualified votes require ≈ 2,500–4,200 organic visitors** (100 ÷ (0.03–0.05 × 0.8)). The earlier "≥300 visitors" target yields only ~9–15 qualified votes — a directional trickle, never a read. ≥300 organic visitors remains meaningful **only** for the signup-*rate* floor (a rate needs visitors; a vote-share read needs votes). The traffic plan (landing spec §3) therefore states its target in *votes accumulated*, and reaching the vote floor organically within the window is genuinely uncertain — Extend/Escalate below is the honest path, not a failure.

### 4.3 Window, fixed read date, no peeking

- The measurement window opens at Gate-B publication and runs **six weeks**; the **read date is pre-registered in writing on publication day** (date, not "when it looks ready").
- **No peeking:** the weekly dashboard reports accumulation only — no verdict language, no "leading" language, before the read date. Interim numbers never trigger early confirmation (they may trigger *safety* stops, S-class only).
- Changing any proposition/arm/price wording **starts a new round**: version-stamped, and rounds are never pooled. Changing any threshold in this section mid-window **voids the round**.
- At the read date, exactly one outcome is recorded: **Read / Extend / Escalate / Stop** (§4.5).

### 4.4 Verdict rules at the read date (qualified rows only)

- **Signup-rate floor:** blended confirmed-signup ≥3% on ≥300 organic visitors; an arm "leads" only at ≥1.5× on comparable volume. (At 300 visitors and ~3%, the 95% interval is roughly ±2 points — reads are floors, not precision estimates, and are always quoted with n.)
- **Category read (Q1 evidence)** — requires **n ≥ 100 qualified votes**, then **both**: winner share **≥35%** *and* winner-minus-runner-up margin **≥12 points**. At n=100 a 35% share carries a 95% interval of ~±9.3 points (1.96·√(p(1−p)/n)) — the verdict memo states the interval next to the share, always.
- **Below-threshold results are below threshold.** A 25–35% share in a four-option ballot sits at or near the 25% equal-share null and supports **no** "leading" claim — it routes to Extend or Escalate, and is reported as "insufficient evidence", never as a lean.
- **Symmetric follow-up rule:** *whichever* candidate wins receives its pre-specified cheap second test before Q1 goes to the founder (writing-community landing variant for C-B; strength-audience variant for C-A; equivalents for C-C/C-D) — no candidate is confirmed on the vote alone.
- **Pricing-interest read** — secondary evidence only, never gating alone: directional claims require **n ≥ 50 qualified clicks** (interval at n=50 ≈ ±14 points — stated when quoted); below that, distribution is reported as raw counts with "insufficient for any claim". "Free-only" <50% suggests paid appetite; ≥65% triggers a Q5/Q6 posture revisit. The honesty ceiling (interest ≠ conversion) attaches to every citation.
- **Age-band lens:** per-band splits are reported when a band reaches **n ≥ 10 qualified votes**; below that the band row shows "insufficient n", and no cross-band claim is made from bands below floor (D-001 discipline; joinable-record rules in §7).

### 4.5 Extend / Escalate / Stop

- **Extend** — vote n < 100 at the read date *but* the accumulation trajectory (last-two-weeks rate × remaining time) credibly reaches 100: extend **three weeks**, **maximum two extensions**, each logged with the projection that justified it.
- **Escalate** — n < 100 with no credible trajectory (or two extensions exhausted): the read is recorded as **"insufficient organic evidence"** and the D-009 escalation menu opens (smallest sufficient interview round on the specific open question; channel re-plan; or founder-approved paid top-up within the Gate-B cap). Never resolved by lowering the floor.
- **Stop** — S-class signals, checkable any week: blended signup <1.5% after one full message-iteration round across all arms · sustained zero organic traction across every attempted channel (documented) → founder review against `stage1-pack/decision-criteria.md` S4 before any further spend.
- **Read** — floors met: the verdict memo is written against §4.4, including intervals and the symmetric follow-up plan.

All results — including nulls, Extends and Escalates — are logged in `validation-evidence.md`.

## 5. Escalation to interviews (D-009 triggers, restated operationally)

The dashboard carries a standing "escalation check" row: if public evidence and passive behaviour conflict materially, a safety-sensitive question is unresolved, age-inclusive failures need diagnosis, willingness-to-pay stays ambiguous after the pricing test, or a major decision can't responsibly be made — the weekly summary recommends the *smallest sufficient* interview escalation (often 3–5 targeted conversations, not the full 9–12), as a founder decision.

## 6. Founder involvement (D-008 envelope)

One-time: approve publication + channel list + any spend (Gate B go). Weekly: read the summary (~15 min); answer any threshold-raised question. That is the entire designed load; everything else runs itself or queues.

## 7. The validation record (what is stored, how cuts join, when it is deleted)

The per-band and per-category cuts in §4 require the instruments' answers to be *joinable* — this section defines the record that makes that possible without collecting more than the privacy floor allows.

**One record per confirmed signup**, keyed by a **random pseudonymous ID**. The email→ID mapping is stored separately (needed for double-opt-in, unsubscribe and deletion) and never appears in analysis exports.

| Field | Source | Notes |
|-------|--------|-------|
| `pid` | generated at confirmation | random; no derivation from email |
| `arm` (H1/H2/H3) · `src` (channel tag) | landing assignment | organic/F&F separation lives here |
| `wording_versions` (vote v_, pricing v_) | frozen per round | rounds never pool (§4.3) |
| `vote` + `start_when` chip | category vote | may be empty (abandoned funnel) |
| `pricing_click` | pricing panel | may be empty |
| `age_band` · `tried_before` · `usual_ending` | optional micro-survey | each independently optional; `prefer-not-to-say` is a value |
| event timestamps | analytics events | consentless-minimal set (landing spec §6) |

**Joins permitted:** within-record only — arm × vote × pricing × survey × channel, which is exactly what the §4 cuts need. Published cuts are aggregates; **no cell below n = 10 qualified rows is published** (it reads "insufficient n"), and per-band claims follow the §4.4 band floor.

**Joins prohibited:** to interview data (standing rule, restated); to any future app account (would require fresh, separate consent — this record's purpose notice covers validation only); to any third-party enrichment; to any marketing use. The record exists to answer Stage-1 questions and nothing else.

**Retention and deletion:** raw records kept for the validation phase and at most 12 months after the final read, then reduced to the published aggregates and deleted. A deletion request removes the record and the email mapping within 7 days (landing spec §4); the aggregates it already contributed to are unaffected (stated in the privacy one-liner).
