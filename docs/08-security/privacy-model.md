# Privacy Model

**Status:** Draft for Gate 2/6. The commitments, their legal shape, and the design rules that make them true. Everything here must survive contact with the privacy notice (user-facing) without translation loss — if the notice can't say it plainly, we don't do it.

## 1. The five commitments (user-facing truth)

1. **We collect only what has a job.** Every datum's purpose is in the [inventory](data-inventory.md); the four-job input test governs everything the user is asked (experience-principles §2).
2. **Your words and your body are yours.** Goal wording, reflections, and any measurements are never analysed for marketing, never fed to analytics, never used to train anything, never sold — structurally (class rules), not just contractually.
3. **Nothing sensitive funds advertising.** No ad SDKs, no ad identifiers, no data sale, ever (N-05; the register enforces).
4. **Leaving is complete.** In-app deletion erases the user graph per the [retention schedule](retention-and-deletion.md); export first is one tap (F19/F20).
5. **We can prove it.** Consent states and every privileged access are audited (D7, D26); the trust ledger exists before anyone asks.

## 2. Legal shape (UK GDPR / DPA 2018; EU users equivalently)

- **Roles:** we are controller; processors per [third-party register](third-party-register.md) under DPAs.
- **Bases:** contract (the product's function: D8–D21), consent (analytics D22; any optional S4 collection — explicit, granular, revocable in Profile), legal obligation (D4, D20 minimums, D26), legitimate interest (narrow: D19, D23, D25, D27 — each with a recorded balancing note).
- **Art 9 posture:** currently **no special-category processing** (D16 not built; D14 ships only if the flagship defines body-related measurements — ⚠ Q1). If Q1/Q12A introduce it: explicit-consent flows + **DPIA before build** (screening template ready at Stage 6; likely required regardless as health-adjacent at scale — we treat DPIA as default-yes).
- **Rights handling:** access/export (F19 self-serve), rectification (profile self-serve), erasure (F20), restriction/objection (support-mediated, SLA 14 days), portability (F19's JSON is the artefact). Identity verification proportional to data class.
- **Children:** 18+ product (D-005); no processing of minors by design; age attestation recorded, not verified biometrically (proportionality — and honesty about its limits in the notice).
- **International transfers:** processors chosen UK/EEA-hosted where feasible; any transfer mechanism (IDTA/SCCs) recorded in the register.

## 3. Privacy-by-design rules (engineering-facing)

1. Consent gates enforced server-side (analytics proxy drops events without D7-consent — client bugs cannot leak).
2. Class-rules table (data-classification) implemented as code: log scrubbers, analytics whitelist, support masking, notification-content rules (NFR-04).
3. Pseudonymisation boundary: the analytics ID mapping is one row, one table, deletable (data-model commandment 8).
4. Purpose tags travel with data (contextual answers) — repurposing requires a schema-visible migration, which requires this document's amendment, which requires a decision-log entry. Friction by design.
5. Local-first is privacy-first: the device holds the week; the server holds what sync needs (no ambient telemetry).
6. Privacy notice generated in lockstep with the inventory (single source), plain-language per content strategy; changes are versioned and user-notified when material.
7. New-feature privacy screening: any PR touching the inventory answers five questions (new data? class? purpose? retention? third party?) in its description — reviewed like tests.

## 4. DPIA discipline

Screening at every gate for: S4 introduction, new processor, new purpose, profiling-adjacent features (adaptation v2 — flagged already in the adaptation model), any child-risk change. Full DPIA before: any Q12A-yes build, any health-platform integration (PSR-04), launch itself (baseline DPIA at Stage 8 covering the shipped set). DPIAs filed alongside this document with dates and review owners.

## 5. Breach readiness

Incident classification tied to data classes (S3/S4 involvement escalates); 72-hour ICO assessment clock procedure written at Stage 6 (incident-response section of security requirements); user-notification thresholds and honest-language templates pre-drafted (content strategy voice — no breach-PR weasel); annual tabletop exercise from Stage 8.
