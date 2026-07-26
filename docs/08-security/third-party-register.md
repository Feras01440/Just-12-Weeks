# Third-Party Register

**Status:** Template + standing rules, Gate 6. **No vendor is currently selected** (Deferred technical decisions) — the register's discipline exists before its first entry, because SDK sprawl is how privacy postures die. Every third-party service or SDK must have a row here *before* integration; CI dependency-diffing flags new SDKs without a register reference.

## Admission rules

1. **Necessity:** a named product function no reasonable first-party effort covers.
2. **Data minimum:** the exact inventory refs it touches, and why less isn't possible.
3. **Class ceiling:** S3 requires DPA + assessment; **S4 requires founder decision + DPIA — default no**.
4. **No advertising/data-broker business models** in the supply chain (N-05) — a free SDK monetising data is a price we refuse.
5. **Removability:** the exit path is written at admission (what breaks, migration cost).
6. **UK/EEA hosting preferred; transfer mechanism recorded otherwise.**

## The register (template rows — all PENDING selection)

| Service | Candidate class | Data touched (inventory) | Classes | DPA | Hosting/transfer | Exit path | Status |
|---------|----------------|--------------------------|---------|-----|------------------|-----------|--------|
| Cloud platform | Managed cloud (major provider) | All server-side | S1–S3 (S4 n/a) | Req'd | UK/EU region | IaC portability | PENDING (Stage 6) |
| Push delivery | APNs / FCM (unavoidable platform pair) | D18, payload-minimal sends | S1–S2 | Platform terms | Apple/Google | None (platform) | ACCEPTED by necessity |
| Store billing | StoreKit / Play Billing (unavoidable) | D20–D21 | S3 fin. | Platform terms | Apple/Google | None (platform) | ACCEPTED by necessity |
| Crash/observability | Error tracking (privacy-respecting tier) | D23 only, no user IDs | S1 | Req'd | Region choice | Log-stack fallback | PENDING |
| Analytics | Self-hosted first candidate; privacy-SaaS alternative | D22 via proxy only | S1 | Req'd if SaaS | Self-host preferred | Proxy makes vendors swappable by design | PENDING (analytics spec) |
| Transactional email | Email API | D1 sends (account/renewal/deletion) | S2 | Req'd | UK/EU | Standard SMTP portability | PENDING |
| CDN | Content delivery | Programme bundles (no user data) | Public content | Req'd | Global | Multi-CDN-ready manifests | PENDING |
| Payments beyond stores | **None at MVP** (A11/G8 external billing deliberately unused) | — | — | — | — | — | EXCLUDED |
| Ad/attribution SDKs | **Permanently excluded** | — | — | — | — | — | **BANNED (N-05)** |

## SDK hygiene rules (client-side specifically)

Every mobile dependency: pinned version, licence checked, permission-diff reviewed (an SDK adding a permission fails the build), no runtime code loading, initialisation gated behind consent where it emits anything (analytics/crash opt-in states), and quarterly dependency review pruning the unused. The app's total third-party SDK count is a *watched metric* with a founder-eyebrow threshold (~12) — every addition argues against the count.

## Review cadence

Register reviewed at every gate and quarterly live: DPA currency, subprocessor-change notices, incident history, continued necessity. A vendor incident touching our classes triggers the privacy-model breach procedure and an exit-path evaluation. The register's current state feeds the privacy notice's processor list — same-source discipline as the data inventory.
