# Threat Model

**Status:** Draft for Gate 6; revisited at Stage 8 against the real build and annually. Method: assets → actors → STRIDE-style sweep over the trust boundaries (system-context §trust) → prioritised controls. Founder-scale honesty: the likeliest threats are boring (credential stuffing, misconfiguration, lost phone), and the model prioritises accordingly.

## 1. Assets worth attacking

A1 user accounts (S2–S3 content behind them) · A2 the challenge/reflection graph (S3) · A3 any body-related data if shipped (S4 — ⚠Q1/Q12A) · A4 entitlements (money) · A5 the content pipeline + kill-switch (integrity of guidance — a *safety* asset) · A6 the audit ledger · A7 the brand's trust (meta-asset every incident spends).

## 2. Actors (realistic)

Opportunistic credential-stuffers (breached-password replay) · payment fraudsters (entitlement abuse, refund gaming) · a hostile person with the user's unlocked phone (domestic-adversary scenario — real for body-image data) · scraping/enumeration bots · a compromised third-party dependency (supply chain) · a careless or compromised insider (founder-scale: contractor access) · curious support staff (mitigated structurally). Nation-state actors are out of scope by honesty.

## 3. Threats and controls by boundary

### Device ↔ platform
- **Spoofed API clients / replay:** TLS everywhere, token binding where platform allows, idempotency keys make replay harmless, rate limits (api §4). 
- **Stolen device / shoulder access:** app-level biometric/passcode lock **optional for the user, on by default if any S4 exists**; evidence surfaces behind the privacy shield (NFR-04); tokens revocable server-side on password change; sensitive notifications content-free (notification §3.3).
- **Local data at rest:** platform keystore + encrypted local DB for S3 content; no S3/S4 in device backups unencrypted (platform backup flags set deliberately).
- **Tampered client (rooted/jailbroken):** entitlement enforcement is server-signed claims (piracy accepted at the margins; no invasive attestation at MVP — proportionality; revisit with evidence).

### Platform ↔ stores (money)
- **Forged purchases:** server-side verification only; entitlement machine driven by signed server notifications (state-machines §3); replay/duplicate → idempotent reconciliation.
- **Refund abuse:** accepted commercially within guardrails (refund-rate metric); revocation propagates factually (E7).

### Platform internals
- **Injection/authz classics:** parameterised everything, per-object authorisation checks (user-scoped queries by construction), OWASP ASVS L2 as the requirements floor (security-requirements).
- **Misconfiguration (the #1 real risk):** infra-as-code with review; no human-clicked cloud consoles for production changes; secrets in a manager, rotated; public-bucket linting; least-privilege service roles.
- **Insider/support overreach:** masked S3 by default, break-glass with reason + audit (class rules); admin actions all audited; contractor access time-boxed.
- **Audit-ledger tampering:** append-only store, integrity-checked exports.

### Content pipeline (the safety-critical one)
- **Malicious/compromised content change:** protected branches, signed releases, two-identity publish for class-2 content (governance §7), bundle signatures verified on device (content-delivery §1).
- **Kill-switch abuse or failure:** confirm-twice + audit for invocation; **fire-drill tested** (governance §6) — both directions: can we pull content fast, and can't-be-pulled-by-one-stolen-credential.

### Supply chain
- Dependency pinning + lockfiles, vulnerability scanning in CI, minimal SDK surface (the register's short-list is a security control), no dynamic third-party script loading in-app (banned by architecture).

## 4. Abuse-case cross-reference

Behavioural misuse (as opposed to technical attack) lives in [abuse-cases.md](abuse-cases.md) — the two documents review together (a stalker-adjacent scenario is both a threat and an abuse case).

## 5. Priorities (what actually gets engineering time first)

1. Money path integrity (state-machines invariants + tests) — trust dies fastest at billing.
2. Account security basics: rate-limited auth, breached-password screening at signup, session revocation, security-event emails (D26-backed).
3. Deletion-walker correctness (privacy promise #4 is a *security* deliverable — verified erasure).
4. Kill-switch drill (safety asset A5).
5. Config/secrets hygiene automation.
S4-specific controls activate with Q12A/Q1 outcomes, designed here so they're pulled off the shelf, not invented under deadline.
