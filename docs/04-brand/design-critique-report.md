# Design Critique Report

**Status:** ten synthetic critique passes over the first complete lab, followed by a material improvement round and re-capture. These are structured expert-lens critiques, **not user research** — the personas are played, not recruited. Severity scale: blocker / major / minor / nit. Every accepted finding lists the change made; every rejection has a reason; residual risks are stated honestly.

Passes: 1 senior product designer · 2 editorial art director · 3 motion designer · 4 accessibility specialist · 5 mobile interaction engineer · 6 older adult with low digital confidence · 7 sceptical paying customer · 8 anti-generic visual critic · 9 strength-programme content reviewer · 10 writing-programme content reviewer.

An earlier automated pass (axe-core, 135 state-audits) found 9 serious violations, all fixed before the human-lens passes; see `docs/03-ux/design-accessibility-review.md`.

---

## Blockers (4 found, 4 resolved)

| # | Pass | Finding | Evidence | Verdict | Change made | Residual risk |
|---|---|---|---|---|---|---|
| B1 | 1, 6 | **B’s journey was an audit log** — “W01-D1 — … — RECORDED” ×15 in mono caps read as tracker/bank statement, buried where-am-I, violated the never-a-tracker mandate | `b/journey--light.png` | Accepted | Completed weeks collapsed to one summary row each; per-day rows only for the current week; the word “RECORDED” removed from log lines | The log idiom remains B’s riskiest surface; needs testing with older users |
| B2 | 8, 1 | **B’s begin screen was a checklist template** — literal empty checkboxes beside segments; “ARM” header reads as the limb in a strength app | `b/begin--light.png` | Accepted | Checkbox glyphs removed (leader/tick-rail form); primary renamed “Begin now”; ARM header dropped | — |
| B3 | 9 | **No dosage in the main session** — steps described one repetition; timer allocated minutes with no reps/sets/rest; a keen 70-year-old would grind squats to fatigue (the actual fall risk) | fixtures `strength.today.how`, all `how--*.png` | Accepted | New step 6: “Today’s dose: five slow squats, then a full minute’s rest. Three rounds.” with a stop-the-set detail; dizziness/breathlessness stop-signals added to the safety line | Dose is illustrative; a real programme needs per-week dosing reviewed by a qualified coach |
| B4 | 4 | **Committed audit report covered one direction** — a “0 violations” banner earned by direction A only | `reports/a11y-report.md` scope line | Accepted | Final full-matrix audit (3 directions × themes × scale spots) re-run and committed as the shipping report | Automated coverage ≠ conformance; stated in the review doc |

## Majors (selected; 17 found, 14 accepted, 3 partially accepted or rejected)

| # | Pass | Finding | Verdict | Change made / reason |
|---|---|---|---|---|
| M1 | 1, 8 | The three Todays share one wireframe; question/handover screens were the same survey/SaaS furniture in all three | **Partially accepted** | Question redesigned per direction (A: book-line choices set as lines in the page; B: three-position selector in its socket idiom; C: threads-to-lay with dye-stroke prefixes); handover de-carded per direction. Today’s shared *order* retained deliberately: the five-second test rewards one proven hierarchy, and each direction leads with its own device (page furniture / instrument face / cloth band). Residual: Today convergence remains a fair criticism to revisit with real users |
| M2 | 2 | A’s “Day 16 is yours.” did not scale at 200% (style scoped to chapter pages only) | Accepted | Selector unscoped; every A token now rides the scale |
| M3 | 2, 4 | C ran its body voice in sustained italic — a legibility tax for older readers | Accepted | Running paragraphs switched to roman; italic reserved for one-line asides |
| M4 | 2 | B’s letterspaced mono metadata wrapped into four ragged lines at 200% | Accepted | Tracking relaxed under `.scale-200`; strings wrap cleanly |
| M5 | 2 | A’s dark-mode action flipped cool (periwinkle) against the warm night paper | Accepted | Dark action re-cut as candlelight parchment-gold (`#E5D5A3`); completion gilt kept darker/saturated for separation |
| M6 | 6 | B’s vocabulary frightened the low-confidence persona: “RECALIBRATION”, “RE-ZERO”, “STANDBY”, “SEALED”, “TRAVERSE 16/84”; “14:00” read as 2 p.m. | Accepted | Translated to “Where you left off / Your place is kept / Paused, on purpose / Not open yet / Day 16 of 84”; all durations outside the live timer now “14 min” form. The instrument survives in material, ticks and readouts, not in jargon |
| M7 | 6 | C put the metaphor on functional controls (“Begin today’s thread”, “Re-warp the loom”) | Accepted | All primaries literal (“Begin — 14 minutes”, “Done for today”, “Change my weekly days”); weave language stays in captions and voice |
| M8 | 7 | Trial conversion, monthly renewal and the two-tap-cancel promise were vague or contradictory — exactly where subscription apps lie | Accepted | Fixtures now state: no card for Week One, nothing charged without asking; monthly = £50.97 over twelve weeks, renews until cancelled; cancel promise reworded to what an app can honestly keep; terms/privacy/refunds line added |
| M9 | 7 | The paywall self-praised (“honest” ×4) — a trust anti-signal | Accepted | Self-descriptions cut (“The honest page” → “Membership”; “honest calendar” → “a calendar that fits”); the behaviour, not the adjective, carries the claim |
| M10 | 9 | Fixed-calendar promise to remove balance support (“By Friday… two fingers. Next week, nothing.”) | Accepted | Support removal is now criterion-based (“when the hold feels like habit… readiness decides, not the calendar”); milestone reworded; falls/blackouts added to the clinician-check list; “hands… guarantee your balance” → “are there to steady you” |
| M11 | 10 | The word-count promise (40–60k) outran the 20-minute sessions — unmet arithmetic is how drafts die | Accepted | Expectation reworded: “a complete draft. For some that is 25,000 words… complete counts either way”; witness constraint lifted onto the day card; “she” → “they”; advanced twice-written scene moved to the notebook |
| M12 | 3 | Interruption contract broken everywhere: uncancelled `setTimeout` navigations could hijack the user; reduced-motion branches skipped the completion confirmation entirely | Accepted | `makeTimeout` (auto-cancelled on unmount) added to shared code and used in all directions; reduced motion now shows the pressed/recorded state for a static beat before navigating |
| M13 | 3 | Two documented “earned moments” didn’t exist in code (A’s gilt draw, C’s unroll) | Accepted | Both built (600ms, once, reduced-motion fallback renders the finished state); motion doc corrected where it drifted (ink-fill 900ms, monotone stamp, `--mc-enter`) |
| M14 | 4 | Contrast failures axe missed: B’s SVG rail text and stamp slot in tick-grey; amber focus ring 2.7:1; A’s option borders 1.99:1 | Accepted | All text moved to secondary ink; B light-theme focus ring switched to the dark amber text tone; A borders re-cut ≥3:1 |
| M15 | 5 | Timer counted ticks, not time — throttled tabs lose minutes | Accepted | Wall-clock anchoring in all three directions; announcements moved to segment boundaries |
| M16 | 5 | Tablet is a stretched phone in all directions | **Rejected for this sprint** | Real tablet composition (A’s two-page spread etc.) is meaningful design work that should be spent on the *winning* direction; recorded in DECISIONS-NOT-MADE and the comparison doc. The lab’s tablet captures remain honest evidence of the current state |
| M17 | 5, 8 | B leans on web-only primitives (container queries, width-axis clamps) and 2026-fashionable “technical” styling | **Partially accepted** | cqw clamps removed (they also blocked 200% scaling); mono reserved for genuine readings so the trend surface shrinks; the deeper “trend, not brand” risk is recorded as B’s open question in its direction doc |

## Minors and nits (32 found; 24 accepted and fixed, 8 rejected)

Accepted highlights: Arabic numerals for wayfinding (Roman kept as chapter ornament); contents legend line for uncut chapters; tappability chevrons on quiet rows in all directions; B error-banner duplication removed; B acknowledge leads with the human sentence and drops elapsed-vs-planned; B mended ticks get a stitch shape (not colour-only); B expired export equal-weight; C’s Bricolage Q-tail fixed in tracked caps; C writing-world artefact header uses the fixture title; choose-and-go controls dropped toggle semantics; status banners populate a frame after insertion; “high chair” → “raised, firm chair”; A seal numerals scaled to the circle; restore copy names the store honestly.

Rejected with reasons (sample): A’s fore-edge marks kept (deliberately redundant with the folio text; will live or die by real-user testing, not critique); A’s near-still character kept (the direction’s thesis is stillness — its motion budget goes to chapter thresholds); C band scale-up on tablet kept (reads as bolder textile, no information loss); B’s writing-world instrument framing kept in structure with durations humanised (world-agnosticism is B’s core bet — softening it per-world would dissolve the direction); grandchildren-trope rotation trimmed but not eliminated (concreteness beats variety in safety-adjacent copy).

## The masked-brand test (pass 8 verdict, post-fix)

With names removed: the three Todays are distinguishable at a glance (printed page / instrument reading / woven cloth); empty states are the high-water mark (uncut pages / not-open-yet detent / unstrung warp — “three different products handling one state”); C’s dyed catalogue swatches are the single most anti-generic screen in the lab. Weakest surfaces after fixes: the shared *order* of Today (see M1) and B’s residual technical-chic gravity (M17). Both are recorded as open risks rather than papered over.

## What the critiques changed materially

1. Recovery and safety copy is now clinically careful (dosage, stop-signals, criterion-based progression) — the strength world went from “would refuse to sign off” to coach-handable.
2. The commerce surface went from asserting honesty to specifying it.
3. B was pulled back from tracker/jargon territory toward its actual idea: a warm instrument.
4. The motion system’s promises and its code now match — including the two earned moments that previously existed only on paper.
5. The evidence itself got more honest: full-matrix audit, wall-clock timers, real full-page captures.

## Residual risks worth carrying into the next phase

- Today-structure convergence across directions (M1) — test, don’t assume.
- B’s register with 60+ users; C’s first-sight comprehension of the weave — both need real sessions.
- Cross-screen motion continuity is unvalidated in a re-render prototype (flagged in the motion doc).
- Tablet composition is undesigned by decision (M16).
- All content is sprint fixture copy; programme content needs professional review before any public build.
