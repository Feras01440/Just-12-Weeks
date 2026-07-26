# Assumptions and Questions Requiring Founder Decisions

**Status:** Updated 26 July 2026 after the founder's four directions (D-001–D-004). Former Q11 is **resolved** (18+ confirmed); former Q12 is **replaced** by Q12A/Q12B per D-003. Remaining questions block the Stage 0 → Stage 1 gate.
For each question: the options, their trade-offs, my recommendation and its basis. Recommendations are **Professional recommendations**, not decisions. Answers get recorded in [decision-log.md](decision-log.md).

Standing constraint on every answer below (**Confirmed founder decision D-004**): whatever is chosen for launch is a *launch-scope* decision only. Nothing — brand, engine, navigation, language — becomes permanently category-specific.

---

## Q1. Which goal category leads the first release? *(launch scope only, per D-004)*

The original brief names five: weight loss, muscle gain, teeth whitening, skin care, skill learning. They carry very different safety, credibility and content costs. Under D-004 this question chooses a **flagship launch programme**, not the product's identity; the engine and brand stay category-neutral either way.

| Option | Advantages | Disadvantages |
|--------|------------|---------------|
| (a) One flagship programme in one category — candidates: fitness/body composition **or** skill-learning | Deepest quality per pound of content budget; one governance regime; clear launch story | Narrower launch appeal; bets the launch (not the product) on one category |
| (b) Two programmes from two archetypes (e.g. one physical + one skill) | Proves the engine's universality in public at launch; hedges the launch bet; matches D-004's spirit | Roughly doubles content cost; splits the launch message |
| (c) All five from the original brief | Matches the founder's original notebook | Content cost and safety governance are severe; teeth whitening is legally untenable (see synthesis §5.3); quality bar collapses |

**Professional recommendation:** (a) as the base case for budget honesty — with the choice *between* fitness/body-composition and skill-learning left genuinely open until Stage 1 evidence (fitness has the larger proven spend but the heaviest governance; skill-learning is the safest and most guidance-native but fights free alternatives). (b) is the recommended *stretch* if Q9 reveals budget for two programmes, because launching one physical + one non-physical programme is the strongest public proof of D-004's platform claim. Teeth whitening remains **cut, not deferred**: UK/EU law restricts effective peroxide concentrations to dental professionals, so an evidence-based 12-week whitening plan is not honestly writable in your home market ([synthesis §5.3](concept-synthesis.md), [Annex C §4](../02-research/annex-c-red-team-assessment.md)). Note also: one store listing cannot rank for "lose weight" and "learn to code" equally — launch *positioning* will lead with the flagship regardless of platform breadth.
**Basis:** Content governance analysis (synthesis §5); UK cosmetic-products law; ASO fragmentation (Annex C); content budget reality. **Founder decision required.**

## Q2. Which behavioural segment do we over-sample first in validation?

Under D-001 the audience is behaviourally defined and age-inclusive; the segments in [`01-product/target-audiences.md`](../01-product/target-audiences.md) are now **behavioural patterns, not age brackets**: A "The Restarter" (serial attempter who collapses after disrupted weeks — any adult age), B "The Structured Learner" (goal is a capability; needs a syllabus and cadence), C "The Deadline Transformer" (fixed date drives the commitment). Stage 1 samples all four adult age bands (18–29, 30–49, 50–64, 65+) regardless of which pattern is emphasised.

**Professional recommendation:** over-sample pattern A first — its defining pain (abandonment before visible results; punishment-by-streak) maps directly onto the product's differentiators (guidance, recovery, evidence of progress), and the pattern occurs across every adult age band, which lets one research round serve both the segment question and the age-inclusivity requirement.
**Basis:** Unvalidated hypothesis — Stage 1 interviews are the test. **Founder decision required** (a light-touch one: this only orders recruitment emphasis).

## Q3. Launch depth: one flagship programme, or several?

The brief says "at least 12 recommended plans". Twelve *genuinely evidence-based, professionally reviewed* programmes is a content project measured in months and tens of thousands of pounds — or it becomes twelve thin listicles, which destroys the "based on books and research" promise that is the product's soul.

| Option | Advantages | Disadvantages |
|--------|------------|---------------|
| (a) One flagship programme, exceptional depth | Affordable quality; a clear "this is what good looks like" anchor; honest | A grid of one looks sparse; some visitors bounce for lack of *their* goal |
| (b) 2–3 programmes | Grid looks like a real catalogue; tests engine generality | Each is shallower, or costs 2–3× |
| (c) 12+ programmes | Founder's written vision; broadest appeal | Guaranteed shallow at launch budget; the exact "generic AI-generated content" failure the brief separately forbids |

**Recommendation:** (a) for MVP quality, presented honestly ("more programmes are coming — vote on the next one"), moving to (b) within two quarters. The waitlist/vote mechanism doubles as demand evidence for programme #2.
**Basis:** Content cost analysis; the brief's own quality bar (SR11) contradicts its quantity bar (SR9) at launch budgets — one of them has to give, and quality is the one the market rewards.

## Q4. What does "then other 12 needed list" mean? *(clarification, not decision)*

Page 5 of your brief. Plausible readings: (a) a second set of 12 user-requested plans; (b) a custom challenge builder alongside recommended plans; (c) simply "the other needed plans, listed like this". Please say what you meant — it changes whether a custom-challenge builder is in scope (it materially affects the programme engine).

## Q5. The countdown-limited launch offer: keep, modify, or drop?

Your brief specifies a discounted offer at first launch that expires after *n* hours. Direct professional advice: **as written, this is the single most dangerous idea in the brief.** It is (i) a recognised dark pattern ("false urgency"): a repeating countdown is a *per se banned practice* under the UK DMCC Act's Schedule 20 (CMA-enforceable since April 2025, fines up to £300,000 or 10% of annual worldwide turnover, whichever is greater — and the CMA's first eight investigations, opened November 2025, target exactly this), while Apple treats promoting a false price as grounds for removal *and developer-account termination* (Guideline 2.3.1(a), verified primary); (ii) corrosive to the trust positioning of a premium, evidence-based brand; and (iii) placed *before* the user has received any value — the flow that one industry report links to Her 75's 67-place ranking fall in May 2026 (single source; see correction log COR-01). Full citations: [synthesis §5.1](concept-synthesis.md), [Annex A](../02-research/annex-a-store-policy-and-consumer-law.md), [source audit](../02-research/source-audit.md).

| Option | Advantages | Disadvantages |
|--------|------------|---------------|
| (a) Keep as written | Short-term conversion bump | Store rejection/enforcement risk; UK DMCC/CMA exposure; brand damage; refunds |
| (b) Honest introductory pricing via the stores' native intro-offer mechanics (a real launch price or genuine one-time first-cohort discount, honestly framed, never re-offered to the same user) | Preserves an incentive lawfully; both stores support it natively | Smaller urgency effect |
| (c) No discount; value-first paywall after the user experiences day 1–3 | Highest trust; benchmark data favours it (trial-originated subscribers show ~64% higher lifetime value in health & fitness) | Slower initial revenue |

**Recommendation:** (b) or (c) — never (a). Test paywall *timing* (after onboarding vs after first completed day) as a legitimate experiment instead.
**Basis:** Verified store policy and consumer-law findings (Annex A); market evidence (Annex B §4–5).

## Q6. What is free? (the free-tier boundary)

The brief implies everything meaningful is paid ("full access to all features"). The question is what a non-paying user can do — this defines the activation funnel.

| Option | Advantages | Disadvantages |
|--------|------------|---------------|
| (a) Hard paywall (nothing free beyond a tour) | Simple; filters for intent; converts ~10.7% of downloads vs ~2.1% freemium (median day-35, RevenueCat 2026) | User pays before experiencing the product's actual differentiator; refunds ~70% higher for hard-gated apps (Adapty: 5.8% vs 3.4%); the Her 75 report (single-source) illustrates the ranking damage |
| (b) Free first week of any programme, then paid | User experiences real value (day-1 guided action) before paying; paywall lands when motivation is highest | Requires week 1 to be genuinely excellent; slightly more complex entitlement logic |
| (c) One full free programme forever + paid catalogue | Generous; big top-of-funnel | Undermines "one meaningful goal" economics — many users only ever need one programme |
| (d) Free trial via store mechanics (7-day trial on subscription) | Standard, store-native; trial-originated subscribers show ~64% higher LTV in health & fitness (Adapty 2026) | "Forgot to cancel" resentment unless handled with reminders; trial abuse |

**Recommendation:** (b), possibly combined with (d) — experience week 1, subscribe to continue the journey. Worth testing alongside a **quarterly (12-week) plan**: it is the natural native unit of this product and almost nobody in the category sells it as the headline plan — a differentiation opportunity, though annual plans are where category revenue concentrates (~68% in health & fitness). Decide after Stage 1 pricing interviews.
**Basis:** Benchmark data in [Annex B §2/§5](../02-research/annex-b-market-landscape.md); activation logic; to be validated.

## Q7. Who authors and reviews programme content?

"Based on books and research" requires someone accountable for that being true.

| Option | Advantages | Disadvantages |
|--------|------------|---------------|
| (a) Founder-curated from published research, credited sources, no expert reviewer | Cheapest; fast | Credibility ceiling; risky for fitness claims; weak store/press story |
| (b) Founder-drafted + paid expert reviewer sign-off (e.g. certified S&C coach, registered dietitian consult for the fitness programme) | Credible; defensible claims; reviewer named in-app (trust asset) | Costs (likely £1–3k per programme review); scheduling |
| (c) Commissioned expert authorship | Highest credibility; marketable ("by Coach X") | Most expensive; rights/renewal complexity |

**Recommendation:** (b) for the flagship. The reviewer's name, qualifications and review date shown in-app becomes a *feature* — almost no habit app does this.
**Basis:** Content governance requirements (synthesis §6); competitive gap.

## Q8. "3D designs" — literal or aspirational?

The brief asks for 3D designs. Real-time 3D raises production cost, app size, low-end-Android performance risk, and rarely survives contact with accessibility (reduced motion) requirements. If the underlying intent is "premium, alive, distinctive visuals", that is achievable with high-craft 2D motion at a fraction of the cost — and Sleep Cycle, your own benchmark, is not a 3D app.

**Recommendation:** Treat "premium and distinctive" as the requirement, not "3D". Revisit 3D only if a Stage 3 art direction genuinely earns it.
**Please confirm** this reading of your intent, or state that literal 3D matters to you and why.

## Q9. What are your real constraints? *(information, not decision)*

Everything commercial depends on facts only you have: hours per week you can give this; budget envelope for the first year (content, design, development, tools); your own skills (do you code? design?); whether anyone else is involved; target date pressure, if any; and **where you expect the first thousand users to come from** — no acquisition channel is named anywhere in the brief, and channel choice (organic social, app-store search, paid ads, communities) changes the funnel and paywall design. Please state these plainly — the roadmap durations and the build-vs-hire choices in Stage 6–7 hinge on them.

## Q10. Naming direction

"12 Weeks" is descriptive but weak as a trademark (descriptive terms are hard to protect and hard to search), and it sits close to *The 12 Week Year* — Brian Moran's established book, planner and software brand — as well as the broader 12-week-challenge heritage (Body for Life, 75 Hard). Both trademark proximity and store-search confusion need a proper screen before the name is kept. No action needed now except: are there names you already love/hate, and do you want the Stage 3 brand work to generate naming territories alongside art direction? (Recommended: yes, same stage, one exercise, including a preliminary trademark screen.)

## ~~Q11. Age policy~~ — RESOLVED (Confirmed founder decision D-001/D-005)

The product is for adults 18+, age-inclusive across adult life stages, with age screening at onboarding. Individual programmes still define their own suitability and exclusions on top of the 18+ baseline. Closed 26 July 2026.

## Q12A. Which programme types genuinely benefit from optional visual evidence? *(replaces former Q12, per D-003)*

Visual evidence is a per-programme tool, never a platform default. The programme-evidence model (`01-product/progress-evidence-model.md`) proposes, per archetype, where optional photography earns its place (e.g. a physical programme's optional private before/after; a creative programme's artefact photos) and where it is pointless or harmful. **Founder decision required** at Stage 2 content design: approve the per-archetype evidence menus, specifically which (if any) launch programme includes optional photography at all.

## Q12B. When visual evidence is justified, what storage/sync model best protects the user? *(Deferred technical decision)*

The earlier "on-device by default at MVP" recommendation is **withdrawn as premature** per D-003. ADR-003 (`07-architecture/architecture-decisions/ADR-003-sensitive-evidence.md`) documents the option space — on-device only; on-device + opt-in encrypted backup; end-to-end-encrypted cloud; standard encrypted cloud — with trade-offs, and deliberately reaches no conclusion. This is decided only after Q12A establishes the actual feature need, the privacy model defines requirements, and the technical constraints are known. Until then, no architecture may hard-assume either posture.

## Q13. What happens at week 13?

The product's promise *ends* — that is its integrity and its structural business risk. A subscription whose narrative completes in one quarter has negative built-in retention unless week 13 is designed deliberately (95% of cancelled annual subscribers never return — all categories, within RevenueCat's 2026 observation window; and median *first* annual renewals run only 23–40% by category).

| Option | Advantages | Disadvantages |
|--------|------------|---------------|
| (a) Next-challenge sequencing ("your next 12 weeks" — new goal, guided handover) | Honest; matches the Restarter's multi-goal life; the natural subscription justification | Needs a second programme ready within ~one quarter of launch |
| (b) Maintenance mode (lighter-touch consolidation programme after completion) | Keeps the habit alive; low content cost | Weaker reason to pay than a new transformation |
| (c) Community/cohort layer for alumni | Strong retention in category data | A different product with moderation burden; not MVP |
| (d) Accept single-cycle economics and price accordingly (one-off or quarterly purchase) | Simplest and most honest | Caps revenue; fights the category's annual-plan economics |

**Recommendation:** design (a) as the retention model from day one — it is also the honest version of the founder's original multi-category vision, resequenced from a launch-scope problem into a year-one retention strategy — with (b) as the low-cost bridge until programme #2 exists. Decide the pricing implication (annual vs quarterly emphasis) after Stage 1.
**Basis:** Annex B §2/§5 benchmarks; Annex C §5 failure mode 4; unvalidated on our own users until beta.

---

## Assumptions needing user validation (Stage 1), not founder opinion

| # | Assumption | Validation method |
|---|-----------|-------------------|
| A1 | Target users experience "abandonment before visible results" as a top-3 felt problem | Interviews (unprompted mention) |
| A2 | A fixed 12-week container motivates rather than intimidates | Interview section D |
| A3 | *Where a programme justifies optional visual evidence (Q12A),* users will use it if privacy is credible — never assumed platform-wide (D-003) | Interview + prototype test, per programme |
| A4 | Users will pay subscription prices for structure + evidence of progress | Past-spend evidence + landing test |
| A5 | Recovery-after-failure design is a felt differentiator, not just our theory | Interviews (missed-days stories) |
| A6 | One flagship programme is enough for launch credibility | Landing-page category-interest test |
| A7 | Weekly reflection will actually be done by a meaningful fraction of users | Beta metric (Stage 9), proxy in prototype test |

## Assumptions we are consciously making without validation (declared, low-risk)

- English-language, UK-first launch (founder currency is GBP). Localisation is post-MVP.
- Phone-first; tablet is adaptive-layout only at MVP.
- No social network/community features at MVP (large scope, moderation burden, different product).
- No wearable integrations at MVP.

If any of these is wrong in your mind, say so now — they shape scope silently.
