# Experience Sprint Brief — Design Laboratory v1

**Status:** exploratory · non-production · no direction selected
**Branch:** isolated design-lab branch, based on foundation commit `9af5946e37b7655427de739981fa2cd1910cbfda` (main)
**Isolation:** everything executable lives in `design-lab/`; foundation work on `product-foundation/v1` and PR #2 are untouched.

## What this sprint is

A high-ambition, disposable laboratory that builds **three genuinely different, executable product directions** for 12 Weeks, demonstrates all 33 required experience states in both sample content worlds, and produces organised visual and accessibility evidence — so that a real direction decision can later be made against working material instead of static boards.

## What it is not

- Not a wireframe pack or a written plan.
- Not the production mobile implementation, framework choice, or final typography.
- Not a selection of the flagship programme or the product name.
- Not user research (all critique passes are synthetic and labelled as such).

## The experience promise being designed for

> “The app understands my meaningful goal, tells me what to do today, shows me how to do it, gives me a suitable alternative, helps me recover when life interrupts, and carries me toward a real twelve-week finish.”

Audience: adults 18+, explicitly including people in their 60s and 70s. Qualities: guidance-first, calm but not empty, premium but not decorative, intelligent but understandable, encouraging without childish gamification, structured without controlling, distinctive without sacrificing usability, accessible, excellent in light and dark, emotionally rewarding over twelve weeks.

Never primarily: a habit checklist, form, tracker, dashboard, spreadsheet, journal, content library, quote app, streak game, course player, or a stack of interchangeable cards.

## Sample content worlds (both run through every direction)

1. **Beginner Strength Foundations** — strength-led; sample action “Learn the supported squat”; safety language present; no medical advice, no outcome guarantees.
2. **First-Draft Writing** — sample action “Write the scene where something becomes impossible to ignore”; start ritual, distraction-free timer, low-energy alternative.

One architecture must serve both without the interface becoming fitness- or writing-specific.

## The three directions

| | A · Quarto | B · Meridian | C · Atelier |
|---|---|---|---|
| Territory origin | Printed Programme (kept, sharpened) | Instrument (kept, warmed) | Long Path (**replaced** — see below) |
| Governing idea | Twelve weeks are a book being read; a bookmark that only moves forward | A fine field instrument for a twelve-week undertaking; one glance = the reading | Twelve weeks weave a cloth; every day adds a thread and the cloth holds |
| Twelve as | Chapters I–XII, table of contents, uncut pages | A graduated rail of 12 detents with a travelling carriage | Twelve woven rows of seven picks |
| Recovery signature | “The bookmark never moves backwards” — margin notes, revised edition | “Recalibration, not reproach” — capacity dial, no reading ≠ fault | “Visible mending” — a mended place can be the strongest part of the cloth |

**Why Long Path was replaced:** literal path/journey visualisations converge on game-board trails and imply distance-not-done; the founder’s constraints (not childish, not game-like, not visually literal) eliminate most of the territory’s natural expressions. Atelier keeps the territory’s core values — unfolding progression, visible movement, an arrival — while adding two things paths cannot give: a native, dignified recovery metaphor (mending) and a real completion artefact (the finished band). This is a reinterpretation permitted by the sprint instructions when a stronger concept emerges.

## Method

1. Research pass with cited sources → `design-research-brief.md`.
2. Executable lab: vanilla ES-module HTML/CSS/JS, zero runtime dependencies, hash-routed; direction / world / theme / text-scale / motion / viewport switchers; compare mode showing the same state across all three directions.
3. All 33 states × 3 directions × 2 worlds implemented as designed screens, including the difficult ones (offline, error, expired, restore, empty).
4. Automated Playwright screenshot matrix + comparison index; automated axe-core accessibility pass.
5. Ten synthetic critique passes → material changes → re-capture. Findings and residual risks recorded in `design-critique-report.md`.

## Quality bars enforced

- **Five-second Today test:** what / why / how to begin / alternative / where-am-I readable without scrolling on a 390×780 viewport, one unmistakable primary action.
- **Anti-generic bar:** a direction is rejected if it could pass for a template habit/fitness/journaling/course app; each direction must answer the masked-brand questions in its direction document.
- **Recovery bar:** no shame, no blame, no broken streak, no erased progress, no demanded explanation, no forced restart, no pretending nothing happened, no loss-based manipulation.
- **Accessibility bar:** evidence (not claims) at 320/390/430/834px, 200% text, reduced motion, light and dark; AA contrast; labelled controls; live-region announcements; keyboard operability of the lab.
- **Commerce bar:** honest subscription presentation; expired state keeps the user’s work; restore is one tap.

## Deliverables

See `design-lab/README.md` for the run instructions and `docs/04-brand/experience-direction-comparison.md` for the decision-support comparison. The full deliverables list matches the sprint instruction set: three direction documents, typography/colour/motion/twelve explorations, state matrix, recovery comparison, accessibility review, critique report, comparison index, screenshot sets, and `DECISIONS-NOT-MADE.md`.
