# Data Inventory

**Status:** Draft for Gate 2/6; the single source that drives Apple privacy labels, the Google Data safety form, the privacy notice, export and the deletion walker. Rule: **nothing is collected that is not in this table with a purpose** (data minimisation as bookkeeping, not aspiration). Classifications from [data-classification.md](data-classification.md).

| # | Data | Class | Purpose (from the four-job test where user-input) | Basis | Storage | Retention ref |
|---|------|-------|--------------------------------------------------|-------|---------|---------------|
| D1 | Email address | S2 | Account identity, security notices, transactional mail | Contract | Platform DB | R1 |
| D2 | Auth credentials / provider tokens | S3 | Sign-in | Contract | Hashed/platform keystores | R1 |
| D3 | First name (optional beyond a display handle) | S2 | Respectful address | Contract | Platform DB | R1 |
| D4 | 18+ attestation (boolean + date) | S2 | D-005 gate; store compliance | Legal obligation | Platform DB | R1 |
| D5 | Locale, units, timezone | S1 | Correct display, scheduling | Contract | DB + device | R1 |
| D6 | Accessibility/display prefs (server-relevant subset) | S1 | Experience continuity | Contract | DB + device | R1 |
| D7 | Consent states (analytics, notifications, per-type) | S2 | Enforcement + proof | Legal obligation | DB, audited | R1 |
| D8 | Goal wording (user's own sentence) | **S3** | Personal meaning in reports; never analysed | Contract | DB encrypted | R2 |
| D9 | Challenge state & schedule | S2 | The product's core function | Contract | DB + device | R2 |
| D10 | Completions, variant choices | S2 | Progress, adaptation | Contract | DB + device | R2 |
| D11 | Contextual answers (purpose-tagged) | S2–S3 by tag | Their declared purpose only (structurally tagged) | Contract | DB | R2 |
| D12 | Weekly review structured answers | S3 | Reflection value to the user | Contract | DB encrypted | R2 |
| D13 | Weekly review free text (optional) | **S3** | The user's private words; never analysed, never analytics | Contract | DB encrypted | R2 |
| D14 | Measurement entries (optional, programme-defined) | **S4 where body-related**, else S3 | Programme-defined why_it_matters | Explicit consent (Art 9 where applicable) | DB encrypted | R2 |
| D15 | Evidence artefacts (non-photo: files, recordings) | S3–S4 by content | Programme evidence menu | Consent | ⚠ scope per launch programme | R2 |
| D16 | Visual evidence (photos) | **S4** | ⚠ Q12A — currently **not collected**; posture ADR-003 | Explicit consent if ever | **Not built** | R2 |
| D17 | Milestones, adaptation events, reports | S2 | Journey narrative | Contract | DB | R2 |
| D18 | Push tokens | S2 | Notification delivery | Contract | DB | R1 |
| D19 | Notification send log | S1 | Cadence caps, opt-out guardrail | Legitimate interest (minimal) | DB | R3 |
| D20 | Purchase records (store transaction refs) | S3 (financial) | Entitlements, legal records | Contract/legal | DB, immutable | R4 |
| D21 | Entitlement state | S2 | Access control | Contract | DB + signed device claim | R2 |
| D22 | Analytics events (pseudonymous, whitelisted props) | S1 | Product decisions per spec | **Consent** | Analytics store via proxy | R5 |
| D23 | Crash/performance telemetry (no user ID) | S1 | Stability | Legitimate interest, disclosed | Observability stack | R5 |
| D24 | Support correspondence | S2–S3 | Helping the user | Contract | Support mailbox | R6 |
| D25 | Content-concern reports | S2 | Governance SLA | Legitimate interest | Governance records | R6 |
| D26 | AuditEvents (user-subject) | S2 | Security, legal defence, trust ledger | Legal obligation/LI | DB append-only | R7 |
| D27 | Server access logs (IP, request meta) | S2 | Security operations | Legitimate interest | Log stack, short-lived | R3 |
| D28 | Optional private notes in recovery/pause flows (F12–F14) | **S3** | The user's own record, reflected back in their journey/report — meaningful-evidence job; never analysed, never analytics (same regime as D13) | Contract | DB encrypted | R2 |
| D29 | Waitlist "programme I want" free-text suggestions | S2 (stored unlinked from analytics ID; account-linked for reply only if user opts in) | Programme-demand discovery (Q3/post-MVP catalogue decisions) | Consent (the field says what it's for) | DB | R6 (12 months) |
| D30 | Suitability-screening answers (per-programme, from the engine's `screening_questions[]`) | **S4 where health-adjacent** — physical-programme screens can reveal health conditions (special-category data, UK GDPR Art 9); else S2 | Safety gating and advise-against rules only (engine §suitability); the stored record is the gate outcome + answers needed to honour it; **never analytics, never marketing, never used to tailor offers** | Explicit consent where Art 9 applies, else contract | DB encrypted | R2 |

## What we deliberately do not collect (the anti-inventory — binding)

Age/DOB beyond D4 · gender · body data at account level (only per-programme optional D14) · contacts · location (beyond store-country) · advertising identifiers · device fingerprints · background sensors · social graphs · third-party enrichment of any kind · free-text mining of D8/D12/D13 for any purpose including "improving the product".

## Store-form derivations (Stage 10 fills forms from this table, not memory)

- **Apple App Privacy:** Contact info (D1, D3) · Health & Fitness (D14 *only if the flagship ships measurements*; **D30 if the flagship's screening is health-adjacent**) · User content (D8, D12–D15) · Identifiers (account ID; **no** ad identifiers) · Purchases (D20) · Usage data (D22, consent-labelled) · Diagnostics (D23). "Data not linked to you": D22–D23 (pseudonymous).
- **Google Data safety:** mirrored, plus the account-deletion web URL (F20), encryption-in-transit yes, deletion-request yes; Health declaration per subscription-requirements G6 if flagship is physical (⚠ Q1).

Any new feature PR that touches data must update this inventory in the same change (CI checklist item) — drift between code and inventory is a release blocker.
