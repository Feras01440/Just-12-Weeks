# Data Classification

**Status:** Draft for Gate 6. Four classes; every column in the eventual schema carries one (data-model commandment 6), and handling rules attach to the class, not to ad-hoc judgement.

## The classes

| Class | Name | Definition | Examples |
|-------|------|------------|----------|
| **S1** | Operational | No meaningful privacy impact if exposed alone | Locale, display prefs, pseudonymous events, crash telemetry |
| **S2** | Personal | Ordinary personal data; identifies or relates to the user | Email, name, challenge state, completions, push tokens, audit events |
| **S3** | Sensitive-personal | Private substance of the user's life; exposure would feel like a violation | Goal wording, reflections/free text, non-body measurements, financial refs, support content |
| **S4** | Special-category-adjacent | Health/body-related; UK GDPR Art 9 territory | Body-related measurements, any body/skin imagery (currently not collected), physical-programme safety answers |

## Handling rules by class

| Rule | S1 | S2 | S3 | S4 |
|------|----|----|----|----|
| Encryption in transit | ✔ | ✔ | ✔ | ✔ |
| Encryption at rest (platform-managed) | ✔ | ✔ | ✔ + field/table-level | ✔ + field-level, separate keys |
| Appears in logs | Allowed (no joins to identity) | Metadata only, never values | Never | Never |
| Appears in analytics | Whitelisted props only | Bucketed/derived only | Never | Never |
| Support-staff visibility | Yes | Lookup views, audited | Masked by default; break-glass with reason, audited | Never in support tooling |
| Third-party processors | Per register | Per register, DPA required | Minimum necessary, DPA + assessment | None without founder-level decision + DPIA |
| Export (F19) | Included where user-meaningful | ✔ | ✔ | ✔ |
| Deletion walker | ✔ | ✔ | ✔ | ✔ + storage-level erasure verification |
| Consent basis | Disclosed | Contract/LI | Contract; explicit where collected optionally | **Explicit consent, purpose-specific, revocable** |
| Notification/preview surfaces | Allowed | Restricted | Never | Never |
| Backups | Standard | Standard | Standard (encrypted) | Encrypted, same-envelope, deletion-aging verified |

## Class-assignment rules

Programme-defined payloads inherit the *highest* class their definition can carry (a contextual answer tagged `safety` on a physical programme is S4; a `difficulty` tap on a writing programme is S2) — the tag travels with the data (domain model: purpose-tagged answers). Derived data inherits its source's class unless provably de-identified (aggregation thresholds defined in the analytics spec). Ambiguity resolves upward, and the resolution is recorded in the inventory.

## Reclassification

Quarterly inventory review; any feature that would *raise* a field's class (e.g. a measurement becoming body-related in a new programme) triggers privacy-model review + DPIA screening before build, not after (privacy-by-design as sequencing, not sentiment).
