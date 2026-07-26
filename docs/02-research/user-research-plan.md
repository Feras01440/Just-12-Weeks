# User Research Plan — Stage 1 Validation

**Status:** Draft — awaiting founder review. Executes after the founder answers the foundation questions (Stage 0 gate), because the segment chosen in Q2 determines who we recruit.

## 1. Research objectives

In priority order:

1. **Problem reality.** Do people in the target segment actually experience "I start meaningful goals and abandon them before results appear" as a felt, recurring, costly problem — in their own words, unprompted?
2. **Current behaviour.** What do they do today when they commit to a slow-results goal (gym programme, skincare routine, learning to code)? What have they tried, paid for, quit, and why?
3. **The 12-week frame.** Does a fixed 12-week container feel motivating (a finish line) or intimidating (a cliff)? What happened the last time they fell off a plan — and what would have brought them back?
4. **Willingness to pay.** Have they paid for anything in this space? What, how much, and did they feel it was worth it? (Behavioural evidence beats hypothetical "would you pay?" answers.)
5. **Category priority.** Which goal category do they *most* want a guided 12-week structure for? (Tests Q1/Q3 scope decisions.)

Explicitly *not* objectives at this stage: feature preferences, colour opinions, name reactions. Those come at Stage 5 (prototype testing).

## 2. Participant criteria

Recruit people who, in the last 12 months:

- Set a personal goal in one of the candidate categories (fitness, skill-learning, skincare/appearance, habits), **and**
- Took at least one concrete paid or effortful action toward it (bought a plan, joined a gym, started a course, bought products), **and**
- Either abandoned it before seeing results or completed it with difficulty.

Screen out: professional coaches/PTs/dermatologists (different lens), people who have never attempted a slow-results goal (no problem to study), close friends and family (politeness bias) — friends may pilot the script only.

Aim for a spread across the three segment hypotheses in `01-product/target-audiences.md` with a deliberate over-weight (≈50%) on the recommended primary segment.

## 3. Recruitment methods

Realistic for a solo founder with little budget:

- **Second-degree network:** ask contacts to introduce "someone who started a fitness plan / course this year" — not their own friends-of-convenience.
- **Interest communities (with permission):** relevant subreddits (r/getdisciplined, r/decidingtobebetter, r/fitness30plus, r/learnprogramming), Discord servers, local gym or bootcamp notice boards. Offer a £15–20 voucher for 30–40 minutes.
- **Screener form:** 6 questions (goal attempted, when, what they did, what happened, age band, willingness to talk). Recruit from responses, not volunteers' enthusiasm.
- **User-interview platforms** (e.g. Respondent.io) only if the free channels stall — costs ~£40–60/participant.

## 4. Sample size

- **8–12 interviews** in the primary segment hypothesis (patterns stabilise around 8; stop when the last two interviews add nothing new).
- **3–4 interviews** in each secondary segment for contrast (optional if time-constrained).
- **Landing-page smoke test:** ≥300 visitors from a small ad spend (£100–150) to measure message resonance; this supplements, never replaces, interviews.

## 5. Interview script (45 minutes)

Rules: never pitch the app before section E. Never ask "would you use an app that…". Past behaviour only, until the final section. Silence is a tool — let them fill it.

**A. Context (5 min)**
1. "Tell me a bit about a typical week for you right now."
2. "When you think about something you've been wanting to change or get better at — what comes to mind first?"

**B. The last attempt (15 min) — the core of the interview**
3. "Tell me about the last time you seriously tried to [their goal]. Start from the day you decided."
4. "What did you actually do in the first week?"
5. "Walk me through when it started to slip. What was happening that week?"
6. "What did you tell yourself at that point?"
7. "Did anything or anyone almost pull you back on track? What?"
8. "What happened to whatever you were using — the app, plan, notebook, membership?"

**C. Money and alternatives (10 min)**
9. "What have you spent money on for this goal — apps, memberships, products, courses? Roughly how much, all in?"
10. "Which of those felt worth it? Which felt like a waste? Why?"
11. "If you've used any apps: what made you keep or delete them?" (Listen for paywall timing, notification fatigue, streak anxiety — do not prompt these words.)

**D. The 12-week frame (10 min) — still no pitch**
12. "Some people commit to a fixed period — say, 12 weeks — for a goal like this. Have you ever done something like that? How did it go?"
13. "Imagine you're four weeks into a 12-week commitment and you miss five days. What do you honestly do next?"
14. "How do you know, today, whether you're actually making progress on [goal]? What do you look at?"

**E. Reaction (5 min) — concept exposure, last**
15. Read the one-sentence promise: *"Turn one meaningful goal into a guided, measurable 12-week transformation."* — "What do you think that is? What would you expect it to do?"
16. "What would it have to prove to you in the first week for you to keep it on your phone?"
17. "What would make it feel like every other habit app you've deleted?"

**Close:** "Who else do you know who's attempted something like this in the past year?" (snowball recruitment).

### Questions we deliberately avoid
- "Would you pay £X for this?" (hypothetical; use past spending as the signal)
- "Do you think 12 weeks is a good length?" (leading)
- "Would you like feature X?" (feature-shopping)

## 6. Prototype testing plan (Stage 5, pre-registered now)

- 5–7 participants from the same screener pool, target segment only.
- Tasks: (1) first launch through to understanding the promise; (2) choose and start a programme; (3) complete a mock daily action; (4) find what happens after missing three days; (5) read the paywall and state, unaided, the price, billing period, and how to cancel.
- Success bar: 5/5 can state the promise in their own words; 4/5 complete the daily action unaided; 5/5 pass the paywall comprehension test (this one is non-negotiable).

## 7. Recording insights and decisions

- One page per interview, same day, in `02-research/validation-evidence.md`: goal, verbatim quotes (marked), observed facts, interpretations (kept visually separate from facts), surprises.
- A running evidence table: assumption → supporting evidence → contradicting evidence → verdict (supported / mixed / refuted / untested).
- After every 4 interviews: 30-minute founder debrief; adjust script if a question consistently fails.
- Decisions arising go to `00-foundation/decision-log.md` — never live only in someone's memory.

## 8. Evidence required before development (Stage 1 → Stage 2 gate)

Proceed only if **all** of:

1. ≥7 of 10 primary-segment interviewees describe the abandonment-before-results problem unprompted and with specific past examples.
2. ≥5 have already spent money attempting the goal (evidence the category monetises).
3. The 12-week frame reads as motivating to a clear majority when described (D12), not as pressure.
4. At least one goal category shows concentrated demand (avoids launching five shallow categories).
5. Landing-page test: ≥3% of cold visitors leave an email for "early access" against the core promise (weak signal, but a floor).

## 9. Signals that would support the idea

- Interviewees spontaneously describe quitting *because progress was invisible* ("I couldn't tell if it was working") — this is the exact problem the product attacks.
- Stories of paying for structured programmes (PT plans, courses) and valuing the *structure* specifically.
- Descriptions of "all-or-nothing" collapse after missed days — validates recovery design as a differentiator.
- Unprompted hostility toward existing habit apps' streaks/paywalls — validates the ethical-engagement positioning.

## 10. Signals that would invalidate or materially change the idea

- Interviewees consistently frame their problem as *motivation/accountability from other people*, not structure → points toward community/coaching, a different product.
- Past spending is ~zero across the segment → consumer willingness-to-pay hypothesis fails; reconsider segment or model.
- The fixed 12-week container consistently reads as intimidating or arbitrary → the core promise needs reframing (rolling programmes? 4-week cycles?).
- Everyone's real answer to missing five days is "I start something new instead" → completion-based product economics are wrong; retention model must change.
- Demand fragments evenly across all five categories with no leader → no credible flagship programme; scope decision gets harder and launch thesis weakens.

Any of these triggers a founder review before Stage 2 — not a silent pivot.
