# Independent Audit Response

**Status:** Response of record, 26 July 2026, to the independent audit that returned **REQUEST CHANGES** on the foundation pull request. Method: every transmitted finding was **verified against the repository before being acted on** — none was accepted on authority, none dismissed without checking. Verdicts below state what the verification found; corrections are the smallest changes that restore consistency. Deterministic checks: `tools/verify-foundation.py` (added under finding H2) runs green as of this response.

## Scope honesty

This response addresses the findings **as transmitted** (C1; H1–H3, H5–H7; M3, M4, M9; and the Part-3/Part-5 itemised corrections). If the auditor's full report contains findings not relayed here (e.g. any H4, M1–M2, M5–M8, or L-class items), they could not be actioned and are recorded in §Deferred as an open request for the full text.

## Critical

### C1 — The "≥25% concentration confirms" rule was statistically void → **Confirmed; rule voided and replaced**

Verified: 25% is the equal-share null of a four-option ballot; the old rule (in the flagship analysis's recommendation and echoed as "25–35% = leading" in the category test and dashboard) would have "confirmed" a candidate on noise. Fixed: the rule is **explicitly voided where it stood** ([flagship-opportunity-analysis §Reversible recommendation](../02-research/flagship-opportunity-analysis.md)); one canonical pre-registered protocol now governs the Q1 read — [passive-validation-plan §4](../02-research/passive-validation-plan.md): **n ≥ 100 qualified votes · winner share ≥35% · winner−runner-up margin ≥12 points · confidence interval quoted with every share · fixed read date · symmetric second test for any winner**. The "leading (25–35%)" band is deleted from the [category test](../02-research/category-demand-test.md) and the [dashboard](../02-research/validation-dashboard.md); below-threshold results are reported as *insufficient evidence*, never as a lean.

## High

### H1 — Funnel arithmetic: the visitor target could not produce the vote sample → **Confirmed; arithmetic stated and targets restated**

Verified: votes occur post-signup, so ≥300 visitors at the plan's own 3–5% signup assumption yields ~9–15 votes — two orders short of any 100-vote read. Fixed: [passive-validation-plan §4.2](../02-research/passive-validation-plan.md) states the compound arithmetic (**100 qualified votes ≈ 2,500–4,200 organic visitors**); the [landing traffic plan §3](../02-research/landing-page-experiment.md) now targets *votes accumulated*, keeps ≥300 visitors only as the signup-**rate** floor, runs a **six-week window** with **max two three-week extensions**, and names **Extend / Escalate / Stop** as the honest outcomes when organic volume falls short (paid top-up stays a founder-go option that covers only a fraction of the gap). [R-18](../10-roadmap/risk-register.md) and the [staged capital plan](../05-commercial/staged-capital-plan.md) triggers are restated in trajectory terms.

### H2 — Evidence-corpus integrity: wrong counts, drifting positional citations → **Confirmed empirically; corpus migrated to stable IDs, every citation re-resolved by content**

Verified before acting: actual counts are **E1: 54 · E2: 63 · E3: 58 · E4: 52 — 227 total** (the documentation claimed 222/54/58/55); positional drift was real and non-uniform (up to +5 in E2; the same old ID pointing at *different* rows in different sentences; "E2-16b"/"E3-39b" citing rows the scheme couldn't address). Fixed: the corpus now carries **immutable stable IDs `EV-1001`…`EV-4052`** (append-only; retired rows keep their ID; future clusters continue the numbering at EV-5xxx); all **199 downstream citation usages** across the eight evidence/synthesis documents were re-resolved by **matching claim content to row text** — not by renumbering — because verification proved positional mapping unreliable. A repeatable checker, [`tools/verify-foundation.py`](../../tools/verify-foundation.py), now reports missing/duplicate/unresolved IDs, count mismatches against the declared totals, dangling citations (ranges expanded), broken relative links, and repository-policy violations; it exits non-zero on any failure and runs green at this writing. Logged as [COR-18](../02-research/correction-log.md).

### H3 — Recovery metric inconsistency (survivor-biased ≥35% still quoted) → **Confirmed; canonical metrics now quoted everywhere, and the denominator is instrumented**

Verified: [recovery-experience §6](../03-ux/recovery-experience.md) still carried `recovery_flow_entered → returned_after_absence ≥35%` — a survivor-only metric superseded by the canonical pair in [success-metrics](../01-product/success-metrics.md). Fixed: §6 now quotes the canonical definitions verbatim — **true recovery return rate ≥20% measured from lapse start over *all* lapse entrants** (including users who never reopen), with **conversation completion ≥60% of reachers** as the named secondary that is never quoted alone. The [analytics specification](../01-product/analytics-specification.md) gains **`lapse_state_entered`** (server-timer derived, fires without an app open) as the true rate's denominator; `recovery_flow_entered` is re-purposed as conversation reach; `returned_after_absence` is defined as the 14-days-from-lapse-start numerator.

### H5 — No fixed read date / peeking risk / wording-version leakage → **Confirmed; read discipline pre-registered**

Fixed in [passive-validation-plan §4.3](../02-research/passive-validation-plan.md): the read date is pre-registered in writing on publication day; weekly dashboards report **accumulation only** (no verdict or "leading" language before the read; S-class safety stops excepted); any wording change starts a new version-stamped round and **rounds never pool**; changing thresholds mid-window voids the round. The [dashboard template](../02-research/validation-dashboard.md) enforces this structurally (read-date header, no-peek rule, trajectory line replacing verdict language).

### H6 — Per-band/per-category cuts had no defined joinable record → **Confirmed; the validation record is specified**

Fixed as [passive-validation-plan §7](../02-research/passive-validation-plan.md): one pseudonymous record per confirmed signup (random ID; email mapping stored separately for deletion), fields (arm, source channel, wording versions, vote, start-when, pricing click, optional survey answers, timestamps), **permitted joins** (within-record only — exactly the §4 cuts), **prohibited joins** (interview data; any future app account without fresh consent; third-party enrichment; marketing), publication floor (**no cell below n = 10**; per-band claims per §4.4), and retention (validation phase + ≤12 months, then aggregate-and-delete; deletion requests honoured in 7 days).

### H7 — Channel-composition bias unguarded; limitation references pointed at entries that didn't exist → **Confirmed; guard added and the referenced entry now exists**

Fixed: [research-limitations §2](../02-research/research-limitations.md) gains the **channel-bias standing guard** — ≥3 distinct channels before any read, **no single channel >40% of qualified rows**, weekly per-channel shares on the dashboard, and a mandatory **sensitivity check** (verdict recomputed excluding the largest channel; a flip is reported as *channel-fragile*). The landing spec's traffic plan binds to it. The instrument documents' references to a research-limitations channel entry — previously dangling — now resolve.

## Medium

### M3 — Decision-criteria vs passive-plan threshold mismatch → **Confirmed; single ownership established**

Fixed: [decision-criteria P5](../02-research/stage1-pack/decision-criteria.md) is scoped to the signup-**rate** floor it can honestly read (≥3% on ≥300 organic visitors), and points to [passive-validation-plan §4](../02-research/passive-validation-plan.md) for the vote/pricing floors and read mechanics. One protocol, one owner; the pack keeps only what belongs to escalated interview rounds.

### M4 — Pricing-interest thresholds unreachable and treated as primary → **Confirmed; re-anchored as secondary with honest floors**

Verified: the pricing panel sits *below* the vote in the funnel, so its old ≥80-click read floor compounded H1's arithmetic error. Fixed: [pricing-interest-test §3](../02-research/pricing-interest-test.md) is **secondary evidence that never gates alone**; directional claims need **n ≥ 50 qualified clicks** with the ±14-point interval quoted; below-floor distributions are raw counts labelled "insufficient for any claim"; cuts must independently clear the floor; the interest-≠-conversion ceiling attaches to every citation.

### M9 — Superseded incentive/budget scenarios still read as live → **Confirmed; supersession banner added**

Fixed: [stage1-pack/incentives-and-budget.md](../02-research/stage1-pack/incentives-and-budget.md) now opens with a supersession banner — spending authority is solely the [staged capital plan](../05-commercial/staged-capital-plan.md) (D-010); incentives activate only on a fired D-009 escalation with founder approval; the page remains pricing reference only. (The year-one scenarios document already carried its supersession banner.)

## Part 3 — Flagship analysis corrections → **All eight applied**

In [flagship-opportunity-analysis.md](../02-research/flagship-opportunity-analysis.md): (1) the ranking is relabelled *professional judgement*, not an evidence-weighted computation; (2) C-A's wallet evidence is split — **human-delivered formats proven (EV-3032/3033/3044), app-subscription WTP unproven**; (3) C-A's 65+ safety burden under D-001 is stated as the heaviest of the four (screening/contraindications/falls-aware adaptation as pre-launch cost); (4) all citations re-resolved to stable EV IDs (with C-C's evidence honestly downgraded — supply-side signals, thin pain-voice); (5) the off-app work risk (O-08) is applied symmetrically to C-B writing, not only C-D coding; (6) C-D's WTP row acknowledges paid-structure demand off-app (EV-3039) while keeping app-format structure the hard sell; (7) Gate-D arithmetic corrected — the credentialed S&C review (£1,200–2,500) sits **at or beyond the entire Gate-D envelope** (£1,000–1,500), making a C-A selection a scoped-review-or-Gate-E decision under D-010; (8) "verifiably open"/"vacuum is verified" overclaims are withdrawn — the NaNoWriMo *shutdown* is verified fact (EV-4009), openness/vacuum claims are labelled evidence-supported inference (EV-4010, EV-4014). A "what changed" note sits under the ranking; **four candidates remain live and Q1 remains open**.

## Part 5 — Consistency seams → **All closed**

- **Suitability-screening answers** were absent from the data inventory despite the engine collecting them → [data-inventory D30](../08-security/data-inventory.md) (**S4 where health-adjacent**, Art-9 note, purpose-bound, never analytics/marketing; Apple Health & Fitness store-form derivation updated).
- **Founder-absence safety gap** (24h SLA, solo operator) → [programme-governance §8](../06-content/programme-governance.md): high-priority paging; **24h-unacknowledged safety reports auto-pause the reported content into the safe fallback** (pause-only power, fire-drilled); contracted reviewer named second key-holder during declared absence.
- **Solo self-review publishing** (maker–checker impossible in the §2 narrow case) → §8 compensating controls: audited checklist run, **48-hour cooling-off** before any self-reviewed publish, self-review status user-visible in the governance record, first-in-line for the annual sample.
- **True-recovery-rate instrumentation** → `lapse_state_entered` server event (H3 above).
- **Recovery door-count drift** (3 vs 4 doors across four documents) → [recovery-experience §3.2](../03-ux/recovery-experience.md) nominated canonical (two authored active doors + pause in v1; engine allows a third); [PRD FR-40](../01-product/prd.md), [experience-principles §5](../01-product/experience-principles.md) and the `recovery_path_chosen` value set aligned to it.
- **Entitlement machine** → [state-machines §3](../07-architecture/state-machines.md) extended (trial†, intro†, grace, billing-retry, paused†, expired, revoked, restored, eligible-repurchase; † = only if Q5/Q6 configure them); caption corrected — **the stores are billing truth; this is the server's derived, provisional model**; the R-21 challenge-pause ≠ billing-pause seam is stated where users will feel it.
- **Device-lab assumptions vs D-010** → [device-matrix §Staging](../09-quality/device-matrix.md): no owned lab before its gate; P1 (~£100–150 used) is the first purchase at Gate C/D; P6-class iPhone at Gate D; remaining tiers or paid cloud coverage at Gate E; [performance-plan](../09-quality/performance-plan.md) claims **no NFR-02 sign-off from emulation**; test-strategy and accessibility-test-plan carry the same staging honesty.
- **Q8 restored** to the [open-decisions register](open-decisions-register.md) Tier 3 (it had been dropped in consolidation).

## Programmatically verified counts (Part 4)

`python3 tools/verify-foundation.py` output at this response: **corpus E1: 54, E2: 63, E3: 58, E4: 52 (total 227); no positional refs, no dangling citations, links resolve, attribution policy holds.** The documentation-set claims (docs/README, review report, PR description) now quote these counts.

## Deferred findings register (Part 6)

| # | Item | Why deferred | Owner | Gate / trigger | Risk while open |
|---|------|--------------|-------|----------------|-----------------|
| DF-1 | Any audit findings **not transmitted** to this session (potential H4, M1–M2, M5–M8, L-class) | Full audit text not available here; only relayed findings could be verified | Founder (obtain/forward full report) | Next documentation session after receipt | Unknown findings remain unaddressed; mitigated by the deterministic checks now standing |
| DF-2 | Duplicate-*source* content audit across clusters (rows in different clusters drawing on the same underlying page) | Convention and dup-src marking exist in the corpus preamble; a full content pass across 227 rows was out of this response's scope | Research maintainer | Before any external quotation of corpus rows (Stage 10 re-verification gate) | A cross-cluster theme could double-count one source; recurring-theme claims already require ≥3 *independent* rows |
| DF-3 | Primary-source re-verification of snippet-retrieved rows | Standing limitation (research-limitations §1), not newly actionable | Research maintainer | Stage 10 / any external use | Already discounted in confidence columns |
| DF-4 | R-20 SKU-shape verification (12-week term configurability) and the entitlement machine's †-states | Requires store-console access at Stage 2 | Product lead | Stage 2 store-config session | Term-billing copy could harden against an unconfigurable SKU; machine marked provisional |
| DF-5 | Real-device P1 performance baseline | Hardware gated by D-010 (device-matrix §Staging) | Quality owner | Gate C/D first purchase | Emulated budgets flatter thermals/memory; limitation named in every report until then |
| DF-6 | Channel-bias sensitivity check in practice | Operates only once the passive system is live (Gate B) | Research maintainer | First read date | None pre-publication |

## What did not change

The founder's decisions (D-001…D-010) and the four-candidate openness of Q1 are untouched — every correction here tightens *method*, none re-decides anything reserved to the founder. No document was deleted; no evidence row was removed (IDs are immutable); the audit's findings produced no change to product scope, brand, or architecture beyond the seams listed.
