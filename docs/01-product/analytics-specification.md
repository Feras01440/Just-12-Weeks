# Analytics Specification

**Status:** Draft for founder review; privacy-reviewed against [privacy model](../08-security/privacy-model.md). Vendor choice is a **Deferred technical decision** (self-hosted vs privacy-respecting SaaS — third-party register governs).

## Principles *(Founder requirement — privacy-conscious analytics)*

1. **Measure the loop, never the life.** Events describe product mechanics (started, completed, recovered), never the substance of a user's goal, reflections, measurements or evidence.
2. **Consent-gated.** No analytics before consent; declining costs the user nothing. Strictly-necessary operational telemetry (crash reporting) is separated and disclosed.
3. **Pseudonymous by design.** Random analytics ID; not the account ID; never email/name/IP-derived location beyond country; resettable on request; deleted with the account.
4. **Prohibited everywhere:** free-text content; reflection text; measurement values; photo/evidence content or filenames; goal wording; health-adjacent details; precise timestamps of sensitive actions beyond day-granularity where day suffices; device fingerprinting beyond coarse model class.
5. **Every event justifies itself** — purpose + the decision it supports, or it isn't collected. Annual pruning review.

## Standard properties (all events)

`analytics_id`, `event_ts` (minute precision), `app_version`, `platform`, `os_major`, `device_class` (phone/tablet + performance tier only), `country` (store country), `programme_id`*, `programme_version`*, `archetype`*, `challenge_week` (1–12)*, `ab_flags` (experiment arms). *Where a challenge is active. Session stitching by rolling session ID; no cross-app identifiers; no ad identifiers ever.

## Events

Retention default: **13 months** raw, then aggregate-only (covers one full annual seasonality cycle); billing events 6 years financial-record aggregate (counts/amounts, not identities) per UK records practice — final retention schedule in [retention-and-deletion](../08-security/retention-and-deletion.md).

| Event | Trigger | Extra allowed properties | Explicitly prohibited | Purpose / decision supported |
|-------|---------|--------------------------|-----------------------|------------------------------|
| `onboarding_started` | First screen of first-run flow rendered | entry_source (organic/store/link) | referrer URLs with query strings | Funnel top; measures FR-01 comprehension drop-off |
| `onboarding_completed` | Account exists + 18+ passed | question_count_answered, questions_skipped | answer content | G4 compliance; where onboarding loses people |
| `programme_viewed` | Programme detail opened ≥ 2s | source (catalogue/search/link), viewed_sections | — | Catalogue merchandising; Q1/Q3 demand evidence |
| `programme_waitlist_voted` | "Vote for next programme" tapped | candidate_category (from fixed list) | free-text suggestions (stored separately, unlinked) | Programme #2 decision (post-MVP scope) |
| `suitability_screen_result` | Screening completed | outcome (proceed/caution/advise-against), screen_version | answers themselves | Governance effectiveness; honesty-over-conversion monitoring |
| `challenge_started` | Start ritual completed | start_day_choice (today/monday/custom) | goal wording | Activation numerator; fresh-start uptake |
| `guidance_viewed` | Guided Action opened | day_index, media_type_present, rationale_opened (bool) | content of guidance | Guidance engagement; is "why" being read (D-002 health) |
| `alternative_selected` | Easier/advanced chosen | direction (easier/advanced), day_index | user's stated reason if asked (that answer stays product-side, not analytics) | Difficulty calibration; adaptation-rule tuning (FR-42) |
| `action_completed` | Daily completion confirmed | day_index, interactions_count, offline (bool), duration_bucket | precise duration, activity substance | G2 monitoring; loop health; north-star numerator |
| `action_skipped` | Explicit skip chosen | day_index, skip_reason_category (fixed list: time/energy/unsuitable/other) | free-text reason | Where programmes overreach; content iteration |
| `contextual_question_answered` | Micro-question answered/skipped | question_id, answered (bool) | the answer | Purposeful-input audit — are questions earning their place |
| `recovery_flow_entered` | Lapse state 2+ days triggers conversation | lapse_bucket (2–3/4–6/7+/pause-return), week | — | **Differentiator metric** (recovery return rate); R-05 |
| `recovery_path_chosen` | User picks resume/lighten/restructure/pause | path | — | Which recovery designs work |
| `returned_after_absence` | First action completion following lapse ≥ 2 days | days_absent_bucket | — | Recovery efficacy; success-metrics recovery rate |
| `weekly_review_completed` | Review flow finished | week, skipped_prompts_count, duration_bucket | reflection content | Review completion metric; prompt design |
| `challenge_paused` | Pause confirmed | week, pause_reason_category (fixed list, optional) | free-text | Lifecycle health; pause-vs-abandon design |
| `challenge_resumed` | Resume after pause | pause_duration_bucket | — | Pause design efficacy |
| `challenge_abandoned` | Explicit quit OR 28-day inactivity auto-state | week_reached, trigger (explicit/inactivity) | — | Honest funnel bottom; where the design fails |
| `week12_completed` | Completion state reached | weeks_adapted_count, path (standard/restructured) | outcome evidence | Completion metric; promise delivery |
| `completion_report_shared` | Explicit share action | channel_class (system-share only) | report content | Organic-growth signal; never a prompt-driven metric |
| `next_journey_selected` | Week-13 choice made | choice (new-programme/maintenance/none), same_archetype (bool) | — | Q13 evidence; R-01 mitigation measurement |
| `paywall_viewed` | Entitlement boundary screen shown | boundary_context (which flow), variant | — | Q5/Q6 experiments; comprehension correlate |
| `purchase_started` | Store purchase sheet invoked | product_class (monthly/quarterly/annual/one-off), variant | price shown is derivable from product_class + store country — do not log card/receipt data | Conversion funnel |
| `purchase_completed` | Store confirms | product_class, is_intro_offer (bool) | receipts, transaction IDs (kept in billing system, not analytics) | Conversion; experiment readout |
| `purchase_restored` | Restore succeeds | product_class | — | FR-71 health; support-load predictor |
| `subscription_cancelled` | Store server notification | term_elapsed_bucket, product_class | cancellation surveys (product-side, optional, unlinked) | Cancellation timing distribution; month-1 cluster watch |
| `subscription_expired` | Entitlement lapses | had_active_challenge (bool) | — | Graceful-expiry design (FR-71); win-back honesty |
| `account_deleted` | Deletion executed | tenure_bucket | everything else — event carries no history | Legal metric; deletion-flow health. Analytics identity erased with it |
| `content_concern_reported` | Report-a-concern submitted | programme_id, concern_category | report text (goes to governance workflow, not analytics) | Governance SLA monitoring (FR-80) |
| `notification_settings_changed` | Any toggle changed | resulting_enabled_set (bitmask) | — | Guardrail: opt-out rate; noise detection |

Technical/quality telemetry (crash, ANR, cold-start ms, sync-queue depth, media-load failures) flows to the observability stack, not product analytics, with no user identifiers beyond install-random ID — specified in `09-quality/performance-plan.md`.

## Experiment framework rules

Experiments (paywall timing/pricing per `05-commercial/pricing-experiments.md`) use `ab_flags` with: pre-registered hypothesis + primary metric; minimum-detectable-effect sizing before launch; guardrail metrics (refund rate, rating, opt-out) wired as automatic stop conditions; no experiment on recovery/safety copy without founder sign-off (ethics line).

## What we deliberately cannot answer with this spec *(accepted costs)*

Whether specific reflection themes predict completion (would require reading reflections — refused); per-user granular behavioural profiles (pseudonymised, minimised instead); attribution beyond coarse source classes (no fingerprinting, no ad SDKs). These are features of the design, recorded so nobody "fixes" them casually.
