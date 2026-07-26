# Product Requirements Document — "12 Weeks" (working name)

**Status:** Draft v0.2, 26 July 2026 — for founder review at Gate 2. Universal (category-neutral) requirements per D-004; category-specific extensions are explicitly labelled and conditional on Q1.
**Requirement labels:** FR = functional, NFR = non-functional, PRQ = programme-agnostic platform requirement, PSR = platform-specific (iOS/Android). Priorities: **M** must (MVP), **S** should (MVP if capacity), **L** later (post-MVP). Requirements marked ⚠ depend on an open founder decision, named inline.

## 1. Problem statement

Adults repeatedly commit to meaningful goals whose results appear more slowly than unaided motivation lasts. They fail predictably: no one converts the goal into today's concrete action; progress is invisible during the effort-results lag; and a single disrupted week becomes abandonment because no product designs the comeback. Incumbent tools are trackers — they record effort rather than direct it — and their engagement mechanics (streaks, guilt notifications, paywalls before value) make the failure points worse.

## 2. Product promise

> **"Turn one meaningful goal into a guided, measurable 12-week transformation."**

Where "guided" means told-shown-supported-adapted daily (D-002), and "measurable" means programme-appropriate evidence (D-003) — never guaranteed outcomes (claims policy).

## 3. Audience *(Confirmed founder decision D-001)*

Adults aged 18+ who have a meaningful goal requiring sustained effort and who need structured guidance, encouragement and recovery support to remain consistent long enough to make meaningful progress. Age-inclusive across adult life stages and digital-confidence levels; behavioural, not demographic. Individual programmes carry their own suitability and exclusions. Launch emphasis may narrow (Q1/Q2) without narrowing the product.

## 4. Core jobs to be done

| # | Job | The user's words |
|---|-----|------------------|
| J1 | Direct me | "Tell me exactly what to do today — and how to do it properly." |
| J2 | Orient me | "Show me where I am in my twelve weeks." |
| J3 | Convince me | "Prove I'm actually progressing, even before results show." |
| J4 | Catch me | "When I miss days, give me a way back that doesn't shame me." |
| J5 | Adapt to me | "When today's plan doesn't fit my reality, adjust it." |
| J6 | Finish me | "Make completing this mean something — and tell me what's next." |

## 5. Guidance-first operating model *(Founder requirement D-002)*

Every programme day resolves to a **Guided Action**: instruction (what) → demonstration (how) → rationale (why) → alternatives (easier/standard/advanced) → in-activity support (timer/audio/video/interactive where useful) → completion (≤ 1–2 lightweight interactions) → optional contextual question (only when its answer changes guidance, difficulty, safety or evidence). Recording is always downstream of guidance. Full acceptance criteria: [experience-principles.md §11](experience-principles.md) G1–G10, which are release blockers.

## 6. Functional requirements

### 6.1 Onboarding & account
- **FR-01 (M)** First launch explains the product's value in ≤ 3 screens before any account/data request; skippable to browse programmes.
- **FR-02 (M)** 18+ age screen (D-005) before programme start; neutral copy; declining exits gracefully.
- **FR-03 (M)** Account creation (email + platform sign-in: Apple mandatory on iOS if any third-party sign-in offered — PSR-01); guest browsing of the catalogue without account.
- **FR-04 (M)** Progressive personalisation: ≤ 5 questions before first guided action (G4); every later question contextual, purposeful, skippable unless safety-critical.
- **FR-05 (M)** In-app account deletion (Apple 5.1.1(v)) + web deletion path (Google policy); full data erasure per retention policy.

### 6.2 Programme catalogue & start
- **FR-10 (M)** Browsable catalogue with honest metadata: outcome definition, weekly time cost, difficulty, suitability & exclusions, author + reviewer + credentials + review date, evidence basis.
- **FR-11 (M)** Per-programme suitability screening as defined by that programme's governance record; may recommend against starting (honesty over conversion) with respectful alternatives.
- **FR-12 (M)** Programme start ritual: goal confirmation in the user's own words (one field, the only free-text in onboarding), start-date choice with fresh-start framing (today/Monday/custom).
- **FR-13 (L)** ⚠ Q4: user-requested/custom challenge builder — post-MVP at most, pending founder clarification of the original brief's "other 12 needed list".

### 6.3 Daily loop (Today)
- **FR-20 (M)** Today screen per [today-experience spec](../03-ux/today-experience.md): today's Guided Action first, position-in-journey second, nothing else competing (G-series criteria).
- **FR-21 (M)** Guided Action player: stepwise instruction; demonstration media where defined; rationale ("why this matters") always one tap away; in-activity supports (timer, audio cues) where the programme defines them.
- **FR-22 (M)** Three-level alternatives (easier/standard/advanced) selectable per day without penalty language; selection may trigger adaptation (FR-40).
- **FR-23 (M)** Completion in ≤ 2 lightweight interactions (G2); works offline; syncs later.
- **FR-24 (M)** Contextual micro-questions engine: programme-defined, ≤ 1 per day by default, each with a declared purpose from the four-job input test (experience-principles §2).
- **FR-25 (S)** Rest/recovery days rendered as first-class programme content (not empty states).

### 6.4 Progress & evidence *(D-003)*
- **FR-30 (M)** Progress model driven by the programme's evidence menu (see [progress-evidence-model](progress-evidence-model.md)): action completion, capability checkpoints, milestones, artefacts, optional measurements, optional photos, weekly achievements.
- **FR-31 (M)** Journey view: 12-week arc with weeks as chapters; milestone states; calm, non-punitive representation of missed days (no red, no broken chains).
- **FR-32 (M)** Weekly review: guided reflection pairing the week's evidence with 2–3 structured prompts + one optional free-text field; completable in < 5 minutes; skippable without penalty.
- **FR-33 (M)** ⚠ Q12A: optional visual evidence only in programmes whose governance case justifies it; never required, never prompted with pressure; storage per ADR-003 (deferred).
- **FR-34 (M)** Data export: user's challenge history, reviews, measurements and evidence in portable formats (JSON + human-readable).

### 6.5 Recovery, pause, lifecycle
- **FR-40 (M)** Missed-day handling per [recovery-experience spec](../03-ux/recovery-experience.md): 1-day = calm continuation; 2–6 days = recovery conversation (resume / lightened re-entry / restructure / pause); 7+ = fresh-start re-entry preserving completed work.
- **FR-41 (M)** Pause with honest semantics (schedule shifts; content preserved); resume ritual; restart (new challenge instance, history retained).
- **FR-42 (M)** Weekly adaptation: programme-defined rules adjust the coming week from completion pattern + difficulty signals (see [adaptation model](programme-adaptation-model.md)); user always sees and can decline changes.
- **FR-43 (M)** Challenge lifecycle per [challenge-lifecycle](challenge-lifecycle.md) state machine; all transitions auditable.

### 6.6 Completion & week 13
- **FR-50 (M)** Week-12 completion experience per [spec](../03-ux/week-12-completion-experience.md): completion report (what was done, what changed, evidence assembled), shareable only by explicit choice, honest about partial completion.
- **FR-51 (M)** ⚠ Q13: week-13 transition — guided next-goal selection and/or maintenance mode; model pending founder decision; engine supports both.

### 6.7 Notifications
- **FR-60 (M)** Purposeful notification set only (daily action reminder at user-chosen time; weekly review; recovery re-entry; milestone). Every engagement type individually toggleable — transactional notices and the pre-renewal reminder excepted (the E9 honesty commitment); opt-out ≤ 2 taps (G8); no guilt copy (content strategy lexicon); quiet by default beyond the daily reminder.
- **FR-61 (S)** Notification schedule adapts to observed behaviour (e.g. user completes evenings → suggest evening reminder), transparently.

### 6.8 Commercial
- **FR-70 (M)** ⚠ Q5/Q6: entitlement system supporting free-preview boundary + subscription and/or programme purchase; model pending Stage 1/2 decision; paywall implements [paywall-principles](../05-commercial/paywall-principles.md) (full price prominence, renewal terms, restore, no dark patterns).
- **FR-71 (M)** Purchase restore; entitlement survives reinstall/device change; graceful expiry per [subscription-requirements](../05-commercial/subscription-requirements.md) (no data hostage-taking: user's own records remain readable and exportable after expiry).
- **FR-72 (M)** Cancellation guidance in-app (link to store subscription management) — findable, not buried.

### 6.9 Content & governance surface
- **FR-80 (M)** Every programme displays author, reviewer, credentials, last-review date, evidence citations, and version; "report a content concern" path (governance workflow).
- **FR-81 (M)** Programme versioning: active challenges pin their programme version; updates apply forward with user-visible changelog (engine spec §versioning).
- **FR-82 (M)** Emergency content withdrawal: server-side kill/replace of a programme or single activity with in-app user messaging (governance requirement).

## 7. Non-functional requirements

- **NFR-01 (M) Accessibility:** WCAG 2.2 AA interpretation for native apps; platform accessibility APIs fully supported (screen readers, Dynamic Type/font scale to platform max, reduced motion/transparency, contrast, focus order, 44pt/48dp targets). Age-inclusive specifics per experience-principles §6. Tested per accessibility-test-plan.
- **NFR-02 (M) Performance:** cold start < 2.5s on reference low-end Android; Today interactive < 1s warm; media progressively loaded; animation 60fps target with graceful degradation; app size budget ≤ 60MB initial download (programme media on demand).
- **NFR-03 (M) Offline:** the current week's guidance (including demonstration media where licensed) available offline; completions/queued inputs sync with conflict rules; offline is a designed state on every core screen, never an error page.
- **NFR-04 (M) Privacy:** data minimisation per [privacy model](../08-security/privacy-model.md); no third-party advertising SDKs; analytics per consent and [analytics spec](analytics-specification.md); sensitive content never in notification previews or OS screenshots of a locked state (app-switcher privacy shield on evidence screens).
- **NFR-05 (M) Security:** per [security requirements](../08-security/security-requirements.md) — transport TLS, at-rest encryption, platform keystores, least-privilege API, audit trail on account/content events.
- **NFR-06 (M) Reliability:** no data loss on crash/kill mid-completion; local write-ahead of user actions; crash-free sessions ≥ 99.5% at launch quality bar.
- **NFR-07 (M) Localisation-readiness:** UK English at launch; all strings externalised; no baked-in text in imagery; date/units locale-aware (kg/lb, metric/imperial per user).
- **NFR-08 (M) Battery/network respect:** background work batched; no polling; push over pull.
- **NFR-09 (S) Tablet/adaptive:** phone-first; content readable and functional on tablets/large phones (adaptive layout, not bespoke tablet UI at MVP).

## 8. Programme-agnostic platform requirements *(D-004 enforcement)*

- **PRQ-01 (M)** No universal screen, navigation label, notification, or copy string may reference a specific goal category; category language lives only inside programme content.
- **PRQ-02 (M)** The engine supports all four archetypes (physical/wellbeing, skill-learning, practical-creative, routine/personal-development) through one schema — verified by the Gate-2 paper test (a sample week of each archetype expressed without distortion).
- **PRQ-03 (M)** Measurement systems are pluggable per programme (see progress-evidence-model); the platform ships no default measurement.
- **PRQ-04 (M)** Brand and UI language pass the category-neutrality sweep in the cross-document audit (risk R-11).

## 9. Platform-specific requirements

- **PSR-01 (M)** iOS: StoreKit 2 subscriptions; Sign in with Apple offered if any third-party auth; App Privacy labels accurate; no misleading review prompts; HIG-respecting navigation idioms (platform conventions may differ from Android — one brand, native behaviour).
- **PSR-02 (M)** Android: Play Billing current major version; Data safety form accurate; account-deletion web link; predictive back gesture support; adaptive icons; Material-respecting idioms where they don't break brand.
- **PSR-03 (M)** Both: notification permission requested in context (after value shown), never on first open; store-compliant subscription disclosure screens.
- **PSR-04 (L)** Health-platform integrations (HealthKit / Health Connect) — post-MVP (scope.md item 4); only if the chosen flagship needs them (⚠ Q1) and only read-what's-used (data minimisation).

## 10. Acceptance criteria (product level)

MVP is acceptable when: all M requirements demonstrably met including their offline/error/large-text/dark-mode/reduced-motion states; experience-principle criteria G1–G10 green; milestone Gate-7 checklist passes; zero known billing or data-loss defects; accessibility audit passed; store-policy checklists clean. Feature-level acceptance criteria live with each flow in `03-ux/core-user-flows.md`.

## 11. Unresolved decisions affecting this PRD

Q1 (flagship launch category — determines which programme content ships and whether PSR-04 applies) · Q3 (one vs two launch programmes) · Q4 (custom challenges — FR-13) · Q5/Q6 (monetisation boundary — FR-70) · Q12A/Q12B (visual evidence scope and storage — FR-33) · Q13 (week-13 model — FR-51) · ADR-001 (framework, provisional). None blocks the requirements as written; each is flagged where it lands.

## 12. Explicit non-goals

Maintained separately in [non-goals.md](non-goals.md); summary: no social feed/community at MVP, no wearables at MVP, no AI-generated programme content, no coaching marketplace, no gamification currency/avatars, no ads ever on sensitive data, no under-18 mode, no "12 complete programmes at launch" (superseded by Q3 process), no custom challenge builder at MVP (pending Q4).
