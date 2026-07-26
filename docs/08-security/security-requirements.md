# Security Requirements

**Status:** Draft for Gate 6 — the buildable requirements distilled from threat model, privacy model and classification rules. Baseline standard: **OWASP ASVS Level 2** (mobile: MASVS-L1 + the S3/S4-relevant L2 controls) as the floor, with the specific requirements below as our product's law. Verification: `09-quality/test-strategy.md` security section + Stage-8 audit.

## SR-1 Transport & storage
1.1 TLS 1.2+ everywhere, HSTS on web endpoints, certificate pinning *considered* at Stage 6 (pinning's operational risk weighed honestly — decision recorded either way).
1.2 At rest: platform-managed encryption for all stores; field/table-level encryption for S3; separate key envelope for any S4 (classification rules).
1.3 Device: encrypted local DB for S3 content; keys in Secure Enclave/Keystore; backup flags set deliberately per class (no S3 in unencrypted OS backups).
1.4 Secrets: manager-held, rotated on schedule and on personnel change; none in code, config files, or CI logs (scanning enforced).

## SR-2 Identity & sessions
2.1 Auth: platform sign-in (Apple/Google) + email with breached-password screening and rate-limited attempts; no security questions; MFA available (email-code minimum) and required for admin.
2.2 Sessions: short-lived access + refresh rotation; server-side revocation (password change, deletion, reported compromise); device list visible to user with sign-out-others.
2.3 Security events (new device, password change, export, deletion) → user notification (D26-backed).

## SR-3 Authorisation
3.1 Every API access user-scoped by construction (object-level checks, no sequential IDs exposed);
3.2 Admin: separate IdP, role model per governance §5, least privilege, time-boxed contractor access, all privileged reads/writes audited with reason codes (break-glass per classification).
3.3 The publish path structurally enforces governance signatures (class-2 unpublishable without reviewer identity — governance §7).

## SR-4 Application hygiene
4.1 Input validation server-side everywhere; parameterised queries only; output encoding on any web surface.
4.2 Dependency policy: pinned, scanned (CI-blocking on criticals), quarterly pruned; register rules for SDKs (third-party-register).
4.3 No dynamic code loading; WebViews only for legal documents, hardened (no JS bridges beyond necessity).
4.4 Error discipline: typed problem-details externally; stack traces and vendor errors never leave the boundary (api §4).

## SR-5 Money path
5.1 Entitlements only via verified store server events / server-verified receipts (state-machines §3 invariants under automated test);
5.2 Idempotent purchase processing (no double-grant/charge paths);
5.3 Billing anomalies (verification failure spikes, refund spikes, notification gaps) alert loudest (observability priority).

## SR-6 Content integrity (safety-critical)
6.1 Signed immutable bundles, device-verified hashes (content-delivery §1);
6.2 Protected-branch + two-identity publishing for class-2 content; kill-switch confirm-twice + audited + **drilled pre-launch** (governance §6);
6.3 Fallback content served on removal flags at two checkpoints (content-delivery §4).

## SR-7 Privacy enforcement (security's half)
7.1 Consent enforced server-side (analytics proxy whitelist + consent check);
7.2 Log scrubbing per classification (S3/S4 never in logs — tested with canary values);
7.3 Deletion walker generated from schema classification tags; coverage CI-tested; storage-level erasure verification for media;
7.4 Support tooling masks S3 by default; S4 absent from support surfaces entirely.

## SR-8 Operations
8.1 Infra as code, reviewed; no console-clicked production changes; environment parity (staging mirrors production shape incl. store sandbox);
8.2 Backups: schedule per data-model §4, encrypted, restore-drilled (pre-beta, then quarterly) including deleted-account re-execution check;
8.3 Monitoring: uptime, queue depth, billing anomalies, auth-failure spikes, kill-switch invocations → founder-reachable alerts with runbooks;
8.4 Access reviews quarterly (who can touch production, why).

## SR-9 Incident response
9.1 Severity matrix tied to data classes (S3/S4 involvement escalates); 
9.2 Runbook: contain → assess (72h ICO clock per privacy model) → notify (thresholds + pre-drafted honest templates) → remediate → post-mortem (blameless, filed, feeding threat model/abuse cases);
9.3 Annual tabletop from Stage 8; contact card (ICO, counsel, platform security teams) maintained.

## SR-10 Verification cadence
ASVS/MASVS self-assessment at Stage 8; external penetration test **before public launch** if Q9 budget allows (strong recommendation; ~£4–8k founder-scale) else a structured community/bounty-lite review with scope rules; regression security tests in CI (authz matrix, consent gates, deletion coverage, money-path invariants) — security that isn't in CI decays.
