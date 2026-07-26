# ADR-003 — Sensitive Evidence Storage

**Status:** OPEN — **deliberately undecided** (Confirmed founder decision D-003 / Q12B: no local-vs-cloud decision before the feature need, privacy model and technical requirements are established). This ADR documents the option space so the eventual decision is fast and honest. Deciders: founder + architect + security. Blocked by: Q12A (which programmes justify optional visual evidence at all).

## Context

*If* Q12A concludes that some programme (most plausibly the practical/creative archetype's artefact photos; most sensitively any physical programme's optional private before/after) justifies optional visual evidence, that media is the most sensitive data class in the product (UK GDPR Art 9 adjacency for body/skin imagery; data-classification S4). The architecture currently reserves a **deliberate hole** (container diagram: DEFERRED store; API §2: endpoint designed, unbuilt; domain: `Evidence` type exists for *non-photo* artefacts regardless). Nothing may hard-assume any posture (R-16).

## The option space (documented, not decided)

### P1 — On-device only
Media never leaves the device (app-private encrypted storage); export via user's own share action; excluded from our backups.
- **For:** minimal attack/compliance surface (no server-side Art-9-adjacent store, no DPIA-heavy processing, honest "we never see your photos" message — the strongest trust sentence available); zero storage cost.
- **Against:** device loss = evidence loss (expectation management burden); no cross-device; support cannot help; week-12 report assembly with media is device-local (fine technically; export completeness depends on the user's device surviving 12 weeks).

### P2 — On-device + opt-in encrypted cloud backup
P1 default; explicit per-item or per-programme opt-in to encrypted server backup (keys: platform-managed KMS envelope).
- **For:** user agency matches D-003's spirit; loss-protection for those who want it; honest two-tier message.
- **Against:** we now operate a sensitive-media store (DPIA, retention, deletion-walker coverage, breach surface) *for a minority feature*; consent UX must be genuinely informed, not theatre.

### P3 — End-to-end encrypted cloud (user-held key)
Client-side encryption, keys derived from user credentials/platform keychain sync; server stores ciphertext blind.
- **For:** cross-device + "we cannot see them" made cryptographically true.
- **Against:** real engineering cost (key recovery UX is the hard part — lost key = lost media, which recreates P1's loss problem with extra steps); support complexity; audit/deletion still required (ciphertext is still personal data).

### P4 — Standard encrypted cloud (server-side encryption, our keys)
The industry default.
- **For:** simplest full-featured path (sync, support, report assembly server-side).
- **Against:** weakest trust story for the most sensitive class; maximal compliance surface; contradicts the privacy-model's minimisation instincts unless the feature proves central — which D-003 says it must not be.

## Decision criteria (agreed now, applied later)

1. Q12A outcome: which archetype, what sensitivity class (artefact photos ≠ body photos — they may warrant *different* postures: e.g. P2 for artefacts, P1 for body imagery).
2. Privacy model requirements + DPIA screening result.
3. User expectation evidence (Stage 1/5: do target users *want* cross-device photo history, or privacy above all?).
4. Support/cost reality at founder scale.
5. The trust-sentence test: which posture lets the paywall-grade honesty ("here is exactly what happens to your photos") stay one sentence long?

## Interim constraints (binding until decided)

No evidence-media upload path ships; domain `Evidence` supports non-media types (artefact files ≤ modest size via the standard path *only if* a launch programme needs them, else deferred too); report/export design treats media as optional-absent; no third-party media SDKs enter the register on speculation.
