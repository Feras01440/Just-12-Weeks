# Assumptions and Questions Requiring Founder Decisions

**Status:** Open — these block the Stage 0 → Stage 1 gate.
For each question: the options, their trade-offs, my recommendation and its basis. Recommendations are advice, not decisions. Answers get recorded in [decision-log.md](decision-log.md).

---

## Q1. Which goal categories are in the first release?

The brief names five: weight loss, muscle gain, teeth whitening, skin care, skill learning. They carry very different safety, credibility and content costs.

| Option | Advantages | Disadvantages |
|--------|------------|---------------|
| (a) One flagship category (fitness/body composition) | Deepest quality per pound of content budget; one governance regime; clear brand story | Narrower launch appeal; bets everything on one category |
| (b) Two categories (fitness + one low-risk second, e.g. skill-learning) | Tests whether the engine generalises; hedges the bet | Doubles content cost; splits marketing message |
| (c) All five from the brief | Matches the founder's written vision | Content cost and safety governance for teeth whitening/skincare are severe; teeth whitening in particular flirts with medical-adjacent claims; quality bar collapses |

**Recommendation:** (a), with the engine *designed* for multiple measurement systems from day one so (b) follows cheaply. Teeth whitening should not be in the first release at all — it is the hardest category to support with defensible evidence and the closest to medical claims territory.
**Basis:** Content governance analysis in [concept-synthesis.md](concept-synthesis.md) §6; solo-founder content budget reality.

## Q2. Which target segment do we validate first?

Three hypotheses in [`01-product/target-audiences.md`](../01-product/target-audiences.md): A "Restarter" (28–42 serial attempter), B "Career Investor" (22–30 skill-builder), C "Event-Driven Transformer" (deadline-motivated).

**Recommendation:** Segment A, for the reasons argued in that document (their pain maps onto our two real differentiators: recovery design and evidence of progress).
**Basis:** Hypothesis only — Stage 1 interviews are the test. If you have personal conviction or unfair access to another segment (e.g. you're embedded in a coding-learners community), that is a legitimate reason to override.

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

Your brief specifies a discounted offer at first launch that expires after *n* hours. Direct professional advice: **as written, this is the single most dangerous idea in the brief.** It is (i) a recognised dark pattern ("false urgency") explicitly targeted by Apple/Google policy and UK consumer law (see synthesis §5 for citations), (ii) corrosive to the trust positioning of a premium, evidence-based brand, and (iii) placed *before* the user has received any value, which is where subscription apps get their worst conversion and their angriest reviews.

| Option | Advantages | Disadvantages |
|--------|------------|---------------|
| (a) Keep as written | Short-term conversion bump | Store rejection/enforcement risk; UK DMCC/CMA exposure; brand damage; refunds |
| (b) Honest introductory pricing (a real launch price, or a genuine first-cohort discount, clearly stated, same for everyone that month) | Preserves an incentive without deception | Smaller urgency effect |
| (c) No discount; value-first paywall after the user experiences day 1–3 | Highest trust; best long-term LTV pattern in subscription benchmarks | Slower initial revenue |

**Recommendation:** (b) or (c) — never (a). Test paywall *timing* (after onboarding vs after first completed day) as a legitimate experiment instead.
**Basis:** Store policy and consumer-law findings cited in the synthesis; subscription industry retention data.

## Q6. What is free? (the free-tier boundary)

The brief implies everything meaningful is paid ("full access to all features"). The question is what a non-paying user can do — this defines the activation funnel.

| Option | Advantages | Disadvantages |
|--------|------------|---------------|
| (a) Hard paywall (nothing free beyond a tour) | Simple; filters for intent; some premium apps succeed this way | User pays before experiencing the product's actual differentiator; highest refund/1-star risk |
| (b) Free first week of any programme, then paid | User experiences real value (day-1 action, first measurement) before paying; paywall lands when motivation is highest | Requires week 1 to be genuinely excellent; slightly more complex entitlement logic |
| (c) One full free programme forever + paid catalogue | Generous; big top-of-funnel | Undermines "one meaningful goal" economics — many users only ever need one programme |
| (d) Free trial via store mechanics (7-day trial on subscription) | Standard, well-understood; store-native | "Forgot to cancel" resentment unless handled with reminders; trial abuse |

**Recommendation:** (b), possibly combined with (d) — experience week 1, subscribe to continue the journey. Decide after Stage 1 pricing interviews.
**Basis:** Activation logic; to be validated.

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

Everything commercial depends on facts only you have: hours per week you can give this; budget envelope for the first year (content, design, development, tools); your own skills (do you code? design?); whether anyone else is involved; target date pressure, if any. Please state them plainly — the roadmap durations and the build-vs-hire choices in Stage 6–7 hinge on this.

## Q10. Naming direction

"12 Weeks" is descriptive but weak as a trademark (descriptive terms are hard to protect and hard to search). No action needed now except: are there names you already love/hate, and do you want the Stage 3 brand work to generate naming territories alongside art direction? (Recommended: yes, same stage, one exercise.)

## Q11. Age policy

Appearance-related goals attract under-18s, and weight-loss content for minors is a genuine harm vector and a policy risk on both stores. **Recommendation:** 17+/18+ positioning, age screening at onboarding, and body-composition programmes explicitly excluded for minors. This costs some market and is the right call. Confirm.

## Q12. Data residency of sensitive evidence (progress photos)

Two viable postures: (a) photos stay **on-device by default**, cloud backup opt-in and end-to-end thought through later; (b) cloud storage by default with strong encryption. (a) is dramatically simpler for privacy compliance, trust messaging and cost at MVP; its price is no cross-device sync of photos and harder support cases. **Recommendation:** (a) at MVP. Confirm or challenge.

---

## Assumptions needing user validation (Stage 1), not founder opinion

| # | Assumption | Validation method |
|---|-----------|-------------------|
| A1 | Target users experience "abandonment before visible results" as a top-3 felt problem | Interviews (unprompted mention) |
| A2 | A fixed 12-week container motivates rather than intimidates | Interview section D |
| A3 | Users will photograph private progress evidence if privacy is credible | Interview + prototype test |
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
