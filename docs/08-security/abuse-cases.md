# Abuse Cases

**Status:** Draft for Gate 6. How the product could be *used* to harm — distinct from technical attack (threat model) — and the design answers. Reviewed with the threat model; several cases gate on open decisions and are designed-ahead deliberately.

## AC1 — Self-harm via over-restriction (the category's gravest risk)
**Scenario:** a user weaponises a physical programme — compulsive over-exercise, under-eating alongside, punishing "catch-up" behaviour after lapses.
**Design answers (already structural):** no catch-up mechanics exist (lapses absorb, never accumulate debt — lifecycle §3); no daily weigh-ins, trend-only optional measurement (evidence model §4); pacing caps and stop-conditions authored per physical programme (safety notes, reviewer-enforced); no "beast mode" vocabulary anywhere (lexicons); recovery conversations never praise pushing through.
**Remaining duties:** eating-disorder-aware review of the flagship (governance class-2); signposting content (UK: NHS, Beat) authored per programme; a pattern worth *not* building: we do not attempt algorithmic distress detection at MVP (false-positive harm + capability honesty) — the design's job is to never *reward* the behaviour. ⚠Q1-dependent depth.

## AC2 — Coerced visibility (domestic adversary)
**Scenario:** a controlling partner inspects the user's phone; goal wording, reflections or body data expose them to harm.
**Answers:** app-lock option (threat model); notification previews content-free; evidence surfaces behind privacy shield; free-text always optional (a user can run a whole journey writing nothing sensitive); export/deletion self-serve without email trails beyond the final confirmation.
**Duty:** a support playbook for coercion contexts (no data disclosure to third parties, ever, including "family").

## AC3 — Someone else's programme (minor or excluded user)
**Scenario:** an under-18 or an explicitly-excluded person (contraindication) runs a programme on a borrowed/shared account or false attestation.
**Answers:** 18+ attestation at account + suitability screens per programme (honest limits acknowledged — we deter and document, we cannot biometrically verify); advise-against outcomes cannot be overridden where safety-critical (F04); content written for the *stated* audience with universal safety floors.

## AC4 — Harassment via share artefacts
**Scenario:** completion cards doctored or weaponised ("look how little they did"), or a user pressured to share evidence.
**Answers:** sharing is explicit-only and composed by the user (share card contains only what they pick — week-12 spec §4); no public profiles, no discoverable user content, no social surface at MVP (N-20 makes this class small by scope).

## AC5 — Refund/entitlement gaming
**Scenario:** complete a programme inside a refund window repeatedly; account-share entitlements.
**Answers:** accepted at the margins (commercial guardrails; no punitive DRM — threat model's proportionality); store policies carry the enforcement; watched via refund metrics.

## AC6 — Content-report weaponisation
**Scenario:** bad-faith mass reports against a programme (or a reviewer) to force takedowns.
**Answers:** reports triaged by classification, not volume (governance §5); kill-switch requires confirmed fault, not noise; reporter patterns visible in the queue.

## AC7 — Support-channel social engineering
**Scenario:** "I'm her husband, she lost access — export her journal to this email."
**Answers:** identity verification proportional to request class (privacy model §rights); S3 export only to the account's own authenticated session, never via support manual sends; support playbook scripts refusal kindly.

## AC8 — Data-fishing "wellness partner" approaches (future commercial pressure)
**Scenario:** insurers/employers/brands request cohort data ("anonymised, of course").
**Answer, decided now so it never becomes a negotiation:** no data partnerships involving user-level or re-identifiable data, full stop (privacy commitments 2–3); aggregate public stats only via the claims-policy bar. Recorded here as a standing refusal the founder can point at.

## Review cadence

Abuse cases reviewed at every gate alongside the threat model; any new feature PR answers "which abuse case does this touch?" where relevant (same PR-question mechanism as privacy screening); real incidents append new cases with their post-mortems.
