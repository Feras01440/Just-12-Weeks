# User Research Plan — Stage 1 Validation

**Status:** Revised 26 Jul 2026 under D-008/D-009. **Stage 1's default method is no longer founder-led interviewing.** The stage now runs as: **Stage 1A** public-evidence synthesis (see `public-evidence-corpus.md` and companions) + **Stage 1B** the [passive validation system](passive-validation-plan.md) — with the [moderated-interview pack](stage1-pack/README.md) retained as **optional escalation material** under the D-009 triggers. Validation audience per **D-006**: Age-inclusive Restarters, all four adult age bands. This document keeps the research objectives, participant thinking and signal definitions (still valid for whichever method collects the evidence); operational single sources are the pack (interviews) and the passive-plan documents (default path).

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

Aim for a spread across the three behavioural patterns in `01-product/target-audiences.md` with a deliberate over-weight (≈50%) on Pattern A (The Restarter).

**Mandatory age-band quotas** *(Founder requirement — D-001)*: the interview set must include adults in all four bands, with no band left empty and findings reported per band:

| Band | Minimum interviews | Note |
|------|--------------------|------|
| 18–29 | 2 | |
| 30–49 | 3 | Largest expected volume; don't let it crowd out the others |
| 50–64 | 2 | |
| 65+ | 2 | Recruit via community groups, U3A-style networks, family second-degree contacts — not only online channels, which bias toward digital confidence |

Also deliberately vary digital confidence within bands (screener question: "How comfortable are you learning a new app on your own?" — recruit at least 3 who answer low/medium).

## 3. Recruitment methods

Realistic for a solo founder with little budget:

- **Second-degree network:** ask contacts to introduce "someone who started a fitness plan / course this year" — not their own friends-of-convenience.
- **Interest communities (with permission):** relevant subreddits (r/getdisciplined, r/decidingtobebetter, r/fitness30plus, r/learnprogramming), Discord servers, local gym or bootcamp notice boards. Offer a £15–20 voucher for 30–40 minutes.
- **Screener form:** 6 questions (goal attempted, when, what they did, what happened, age band, willingness to talk). Recruit from responses, not volunteers' enthusiasm.
- **User-interview platforms** (e.g. Respondent.io) only if the free channels stall — costs ~£40–60/participant.

## 4. Sample size

- **9–12 interviews** minimum (the D-001 age-band quotas sum to 9), primary-pattern majority; stop when the last two interviews add nothing new.
- **3–4 interviews** in each secondary segment for contrast (optional if time-constrained).
- **Landing-page smoke test:** organic-first per the [landing experiment spec](stage1-pack/concept-and-landing-tests.md), read against the canonical floors and fixed read date in [passive-validation-plan §4](passive-validation-plan.md) (≥300 organic visitors for the signup-rate floor; ≥100 qualified votes for any category read; a £100–150 paid top-up is pre-specified but launches only on the founder's separate go); this supplements, never replaces, interviews.

## 5. Interview script

The full script — timings, moderation technique, probes, the three concept statements, and the recovery-flow concept test — lives in the [moderator guide](stage1-pack/moderator-guide.md) (single source; the outline formerly here is absorbed and improved there). Its non-negotiables: past behaviour before opinions; concept exposure last; never ask "would you use/pay for this?"; never supply the words *guidance, tracker, streak, recovery, accountability* before the participant does.

## 6. Prototype testing plan (Stage 5, pre-registered now)

Pre-registered tasks, pass criteria, the aligned G6/G9 regime (10–12 participants, every age band n≥2, ≥80% overall with no cohort majority failing) and per-band analysis rules live in [stage1-pack/usability-tasks.md](stage1-pack/usability-tasks.md).

## 7. Recording insights and decisions

- One page per interview, same day, using the [structured note template](stage1-pack/notes-and-coding.md) (coded evidence flows into `02-research/validation-evidence.md`): goal, verbatim quotes (marked), observed facts, interpretations (kept visually separate from facts), surprises.
- A running evidence table: assumption → supporting evidence → contradicting evidence → verdict (supported / mixed / refuted / untested).
- After every 4 interviews: 30-minute founder debrief; adjust script if a question consistently fails.
- Decisions arising go to `00-foundation/decision-log.md` — never live only in someone's memory.

## 8. Evidence required before development (Stage 1 → Stage 2 gate)

The pre-registered gate — five proceed criteria (P1–P5), five pivot triggers and five stop conditions, with their coded-evidence definitions — lives in [stage1-pack/decision-criteria.md](stage1-pack/decision-criteria.md) (single source; registered 26 Jul 2026, before any recruitment). Summary shape: unprompted problem stories (≥7 core), real past spend (≥5), guidance as the wanted help-shape, the recovery message believed, and the ≥3% landing floor — all five required to proceed.

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
