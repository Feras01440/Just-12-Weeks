# Subscription Requirements (Store & Legal Compliance Register)

**Status:** Requirements register for Gates 6–10. Sources: verified primary Apple pages (source audit C16–C18, C26–C27), corroborated Google policy (C28), UK/EU law (C13–C15, C29). Each requirement carries its verification state; secondary-verified items get a primary re-check at Stage 10 (store-readiness).

## 1. Apple App Store *(primary-verified unless noted)*

| # | Requirement | Source | Build implication |
|---|-------------|--------|-------------------|
| A1 | Subscription screen: name+duration, what's provided, **billed amount most prominent**, full renewal price clear; breakdown prices subordinate | developer.apple.com/app-store/subscriptions (verified) | Paywall anatomy §3 |
| A2 | Sign-in/restore path for existing subscribers | same (verified) | F17 |
| A3 | No false price promotion — removal + account termination exposure | Guideline 2.3.1(a) (verified) | Paywall principles §2.1–2.2 |
| A4 | No subscriptions under false pretenses / bait-and-switch | 3.1.2(a) (verified) | Entire commercial design |
| A5 | Clear pre-purchase disclosure: term, renewal continuation, charges, cancellation | 3.1.2(c) + Schedule 2 | Paywall §1 |
| A6 | In-app account deletion, easy to find, full record deletion | 5.1.1(v) (verified) | F20 |
| A7 | Intro offers via StoreKit intro/promotional pricing only | subscriptions page | Q5 lawful-offer shape |
| A8 | Privacy nutrition labels accurate incl. Health & Fitness / Photos where applicable | App privacy requirements | 08-security data inventory drives labels |
| A9 | 4.3(b) revised 8 Jun 2026: low-value/stale apps removable | dev news (verified) | Anti-generic bar is a review-survival requirement |
| A10 | Committed-monthly annual type available (not US/SG) — optional tool | dev news 27 Apr 2026 (verified) | Pricing experiment C4 |
| A11 | US storefront external-purchase-link allowances (post-Epic) — **not used at MVP** | dev news 1 May 2025 (verified) | Deferred; IAP-only simplicity first |

## 2. Google Play *(secondary-verified; primary re-check at Stage 10)*

| # | Requirement | Source | Build implication |
|---|-------------|--------|-------------------|
| G1 | Explicit offer terms: cost, billing frequency, whether subscription required, renewal, cancellation — no extra action to see them | Subscriptions policy 9900533 | Paywall §1 |
| G2 | Easy online cancellation method; in-app cancel guidance | same | FR-72 |
| G3 | Deceptive Behavior policy: no misleading claims/urgency | Deceptive Behavior policy | Paywall §2 |
| G4 | Account deletion: in-app + **web link declared in Data safety form** | Policy 13327111 | F20 + web endpoint |
| G5 | Data safety form accuracy (Health & fitness, Photos types; purposes; sharing) | Data safety requirements | 08-security inventory drives form |
| G6 | Health apps declaration for fitness/wellness content | Health Content and Services policy | Store metadata task, Stage 10 |
| G7 | Play Billing current major version; grace/hold/restore states handled | Play Billing docs | Entitlement service states |
| G8 | US alternative-billing allowances (post-Epic) — **not used at MVP** | US policy pages | Deferred |

## 3. UK / EU law *(the register that outlives store policy)*

| # | Requirement | Source | Build implication |
|---|-------------|--------|-------------------|
| L1 | No banned practices: false limited-time claims, drip pricing, pressure selling | DMCC Sch 20 (in force 6 Apr 2025); CMA207 | Paywall §2; total-price-first display |
| L2 | Fines exposure: £300k or 10% worldwide turnover (greater) — treat compliance as existential, not advisory | DMCC enforcement regime | Constitution status of these docs |
| L3 | Subscription-contracts regime (pre-contract info, reminders, easy exit, cooling-off) — spring 2027 target | Apr 2026 consultation response | **Build the reminder + easy-exit now** (paywall §1.3–1.4) — compliance-by-design beats retrofit |
| L4 | Consumer Rights Act digital-content conformity (content matches description) | CRA 2015 | Claims policy; honest programme metadata |
| L5 | Distance-selling information duties + 14-day cooling-off handling via store mechanics | CCRs 2013 (as amended) | Store-mediated; refund posture documented |
| L6 | UCPD (EU users): no Annex-I banned practices; honest reference pricing | UCPD via EU storefronts | Same design serves both regimes |
| L7 | UK GDPR: Art 9 handling where health-adjacent data exists; DPIA before launch | UK GDPR | 08-security privacy model |

## 4. Entitlement service behavioural requirements (platform-neutral)

E1 server-side receipt/purchase verification (never client-trusted) · E2 idempotent purchase processing (no double grants/charges) · E3 offline entitlement cache honoured through store grace windows (F18) · E4 restore reconciles across devices/reinstalls deterministically (F17) · E5 expiry degrades per FR-71 (guidance locks; user property never) · E6 plan changes prorate per store mechanics with honest in-app explanation · E7 refunds/revocations propagate within hours, messaged factually, never punitively · E8 all entitlement transitions audit-logged (domain `AuditEvent`) · E9 renewal reminder pipeline (quarterly/annual: ~7 days pre-renewal; trials: day-5 reminder — pricing-experiments C2 commitment) · E10 family-sharing posture decided per product (default: enabled for one-off purchases, per-store norms for subscriptions) before Stage 10.

## 5. Verification cadence

Stage 6: entitlement service E1–E9 demonstrated in sandbox (Gate-6 item). Stage 10: full primary-source re-verification of §1–§2 (policies move — this register carries last-verified dates); store forms filled *from* the data inventory, not from memory. Post-launch: quarterly policy-watch tied to the competitor-audit cadence; L3 statutory instruments watched for the spring-2027 regime's final shape.
