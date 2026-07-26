# Assumption-Failure Scenarios

**Status:** SYNTHETIC — hypothesis only (from the [synthetic stress test](synthetic-stress-test.md) §5; independent-reviewer authorship, consolidated here with detection wiring). Each scenario narrates a core assumption failing *in the wild*, with the detection signal that would reveal it early and where that signal is (or now will be) instrumented. None of these is a prediction; all are tripwires.

## S1 — The price anchor snaps
**Failing assumption:** users price the product against structure they've paid for (memberships, coaching), not against the app store's £0–£9.99 shelf (thesis §why-pay).
**Narrative:** pricing tests collapse below 1% at term prices; the same people paying £45/month gyms call £24.99/12-weeks "steep for an app". Revenue re-plans around £9.99 — which cannot fund governance-reviewed content; the content-cost death spiral (R-03) reactivates from the pricing side.
**Detection:** pricing-interest distribution (free-only ≥65% = early warning); escalated past-spend interviews naming the reference class unprompted ("app" vs "coach/course"); Gate-D real conversion curves.
**Instrumented:** pricing-interest test §3; D-009 escalation trigger five; success-metrics preview→paid hypothesis flagged unvalidated.

## S2 — The comeback plays to an empty room
**Failing assumption:** recovery design meaningfully changes outcomes because lapsers meet the recovery conversation (recovery-experience §6).
**Narrative:** the flow-completion metric reads green (38%) while a denominator audit shows ~three-quarters of lapsers never reopened the app; three-then-silence notifications were unopened; true save rate ~10%; week-4 survival indistinguishable from a well-made tracker.
**Detection:** recovery funnel measured **from lapse start** (all lapsers as denominator): % reopening ≤14 days; recovery-notification open rates; week-4 survival vs the corpus baseline.
**Instrumented:** success-metrics recovery metric redefined (this scenario's direct fix); beta telemetry plan.

## S3 — Week one is the product
**Failing assumption:** a free first week can demonstrate enough differentiated value to convert honestly (Q6-b posture).
**Narrative:** day-6 exit answers cluster on "clean, calm habit app"; nothing differentiating fired in six good days — by design. Conversion lands ~1.8%, and the team starts adding week-1 "wow" (charts, celebrations), eroding the calm principles one release at a time.
**Detection:** day-6 "what is this app?" free-response in unmoderated tests; any exception request against the Today-screen tripwire list (today-experience §4) — the *internal* signal is the more dangerous one.
**Instrumented:** unmoderated-testing plan; anti-scope tripwires; objection O-03's paywall-narration design task.

## S4 — The platform becomes a fitness app by keyword
**Failing assumption:** category-neutral platform positioning survives contact with acquisition economics (D-004 in market conditions).
**Narrative:** only fitness terms convert; ASO forces fitness metadata; non-physical cohorts retain 30 points worse (their work lives off-phone); reviews say "great coach app, ignore the coding thing"; within two quarters the brand is fitness everywhere but the decision log.
**Detection:** install-source keyword mix; per-archetype D7/D14 retention gap; review text-mining for category nouns; count of marketing requests for exceptions to PRQ-01.
**Instrumented:** analytics events carry archetype; competitor-audit quarterly cadence extended with keyword-mix watch; the tension is honestly noted in market-gaps §4 (single-category launch positioning is already the plan — this scenario is why).

## S5 — The kindness becomes the joke
**Failing assumption:** warm recovery copy reads as understanding at scale (content strategy + recovery register).
**Narrative:** a creator teardown pairs the "clean page" script with the renewal screen — "the app that forgives you into renewing"; identical copy on the 1st and 4th lapse reads as scripted; the anxious cohort reports guilt *toward the app*; "no dark patterns" becomes the debated claim.
**Detection:** simulated-lapse word-sorts by cohort (>25% choosing "scripted/patronising/watching me" in any cohort); repeat-lapse flow completion declining by lapse number; uninstall-survey guilt language; social listening once public.
**Instrumented:** recovery-experience measures §6 extended via objection O-11's tasks (no day-count recitation; n-th-lapse variants); O-15's claim-softening posture.

## Standing rule

A scenario "fires" only on **genuine** evidence; when one fires, it converts to a risk-register entry with the response plan, and the assumption it kills goes back to the founder as an escalation memo — never silently patched.
