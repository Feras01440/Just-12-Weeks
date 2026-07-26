# Retention and Deletion

**Status:** Draft for Gate 6. The schedule the deletion walker executes and the privacy notice states. Principle: **retention is a purpose with a clock, not a default.** Where a period below is a judgement call it is marked *(policy choice)* and adjustable at founder review — but never silently.

## Retention schedule

| Ref | Data (inventory refs) | Active account | After account deletion | Rationale |
|-----|----------------------|----------------|------------------------|-----------|
| R1 | Account & prefs (D1–D7, D18) | Life of account | Erased ≤30 days *(policy choice: execute ≤72h, backup-aging ≤30d)* | Contract ends |
| R2 | Journey graph (D8–D17, D21) | Life of account (the shelf is the product — W3) | Erased with R1 timeline; evidence media storage-verified erasure | User property |
| R3 | Operational logs (D19, D27) | 90 days rolling *(policy choice)* | Ages out naturally ≤90d; no user-keyed lookup after deletion | Security ops window |
| R4 | Purchase records (D20) | Life of account | **Pseudonymised financial minimum retained 6 years** (transaction facts, amounts, dates — identity link severed) | UK financial/tax records practice |
| R5 | Analytics (D22) & telemetry (D23) | 13 months raw → aggregates *(policy choice)* | Analytics ID mapping erased with account → events orphaned/unlinkable; aggregates retained | Seasonality cycle; pseudonymised |
| R6 | Support & reports (D24, D25) | Case life + 12 months *(policy choice)* | Identity-scrubbed at account deletion unless active legal hold | Service quality, governance SLA |
| R7 | Audit events (D26) | Append-only | User-subject events pseudonymised at deletion; retained 6 years *(policy choice)* | Legal defence, security forensics |
| R8 | Backups (all classes) | Encrypted, restore-drilled | Deleted data ages out of backup rotation ≤30 days; restore-after-deletion procedure re-runs the walker | Honest backup/deletion reconciliation |

## Deletion mechanics (F20's engine)

1. Request authenticated + confirmed (typed/biometric) → sessions revoked immediately → account flagged `pending_deletion` (login disabled, sync rejected).
2. Walker executes the user graph traversal (data-model commandment 1): erase R1/R2, sever R4/R7 identity links, scrub R6, drop analytics mapping (R5). Storage-level verification for any media class.
3. `AuditEvent` (pseudonymised subject) records execution; confirmation email sent (the last use of the address, then erased).
4. Web-initiated path (Google policy, PSR-02): same engine, authenticated via account credentials on a minimal web endpoint.
5. Store-billing reality stated at F20 and in the confirmation: deleting the account does not cancel a store subscription — the link to store management appears in both places (the category's classic harm, closed).

## Partial deletion & user control

Per-item deletion everywhere the user created something (a review, a measurement, an evidence item) — one tap, walker-grade erasure, no "archived really" states. Challenge deletion (whole journey) available with confirmation — the shelf is the user's to curate, including to empty.

## Inactivity policy *(policy choice, honest version)*

No auto-deletion of inactive paid-history accounts (the shelf promise W3 argues for durability); inactive **free** accounts with zero challenge history: erased after 24 months with 2 warning emails *(policy choice)*. Any change here is user-notified policy, never a quiet purge.

## Export coupling

F19 export is offered inside the deletion flow (one tap, skippable) and produces the complete R1/R2 record — deletion should never cost someone their own history unknowingly.

## Verification & audit

Quarterly: deletion-walker coverage test against the schema's classification tags (a new user-owned table missing from the walker fails CI — generated, not hand-maintained); annual restore-drill includes a deleted-account check (restored backup must re-execute pending deletions). The schedule above is reviewed annually and versioned; the privacy notice cites this document's version.
