# Paywall Principles

**Status:** Binding design constraints for every paywall/offer surface, all variants, all experiments. Derived from: founder requirement (no fake urgency/discounts/manipulation), verified store rules (source audit C16–C17, C28), UK/EU consumer law (C13–C15), and the trust strategy. These are constitution, not guidance — experiments operate inside them (pricing-experiments ethics rail).

## 1. The paywall must

1. **Say exactly what is included** — concretely ("the full 12-week Programme X: every guided day, demonstrations, adaptation and your completion report"), never "unlock everything".
2. **Show the full price with its billing period as one unbreakable unit** — "£19.99 every 12 weeks" — with the billed amount the most prominent pricing element (Apple requirement, verified; our standard on Android too). Per-week breakdowns, if shown, visually subordinate.
3. **State renewal plainly at the point of decision:** "Renews automatically every 12 weeks until you cancel. We'll remind you before each renewal." (The reminder is product policy — ahead of the DMCC subscription regime landing spring 2027.)
4. **State how to cancel, on the paywall itself** — one sentence + where ("Cancel anytime in your App Store/Google Play subscriptions — takes about a minute").
5. **Offer Restore Purchases** visibly (F17).
6. **Provide a dignified non-paying path** — close affordance always reachable, never disguised, never delayed; where the model has a free lane (Q6), it is stated on the paywall, not hidden.
7. **Land only at the entitlement boundary** (F16) — never as interstitial ambush, never inside recovery or safety flows, never between a user and content they already paid for.
8. **Read at reading-age ~9–11, at 200% text, to a screen reader, in both themes** — comprehension bar G9 (5/5 unaided restatement) gates every variant.
9. **Show intro offers honestly** where used: real, once-per-user, standard price adjacent and genuinely charged after; store-native intro-pricing mechanics only (Q5's lawful shape).

## 2. The paywall must never

1. Use countdown timers, "offer ends in N hours", stock/scarcity claims, or any manufactured urgency (per se banned practice territory under DMCC Sch 20; Apple 2.3.1(a) false-price exposure — verified).
2. Show fake discounts: no struck-through prices that were never charged; no evergreen "sales".
3. Pre-select anything: no default-ticked plans, no pre-chosen "most popular" that's really "most expensive", no default-on toggles of any kind.
4. Hide the periodicity: "£X/week billed annually" framing without the annual total equally prominent is banned in-house regardless of store tolerance.
5. Guilt, plead, or moralise ("invest in yourself", "you're worth it", "don't give up on your goals") — pressure lexicon applies fully.
6. Re-ask in-session after a decline; no exit-intent counter-offers; no "are you sure you want to miss out?" interstitials.
7. Gate previously-earned property: the user's own history/records/exports stay reachable regardless of entitlement (FR-71).
8. Vary price by inferred vulnerability, engagement desperation, or any personalisation (pricing-experiments standing rule).
9. Misuse the recovery moment: lapsed users see the same offer as anyone else, never a "comeback discount" leveraging guilt (recovery-experience §4).

## 3. Surface anatomy (the compliant skeleton every variant fills)

Header (what you're continuing) → inclusion list (concrete, ≤5 lines) → the offer(s): max **two** choices per moment (a grid of five plans is a confusion pattern) → price+period unit, renewal sentence, cancel sentence → primary action → restore · free-path statement · close. Legal links (terms/privacy) present but the *paywall itself* carries the material terms — linking away the renewal truth is the pattern regulators name.

## 4. Post-purchase obligations (the paywall's promises kept)

Confirmation states what was bought, when it renews, where to manage (F16.3); renewal reminder per §1.3 (in-app + notification, ~7 days before term end for quarterly/annual); cancellation guidance findable in ≤2 taps from Profile (FR-72); expiry handled per F18 (no hostage-taking, no win-back theatre).

## 5. Enforcement

Every paywall variant passes: this checklist (design review) → G9 comprehension test → claims-policy pass → store-disclosure checklist (subscription-requirements.md) before any user sees it. Violations found live are release-blocker severity. The checklist is versioned with this document; experiments reference the version they ran under (audit trail).
