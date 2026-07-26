# Tablet Composition Study — Atelier

**The admission that starts this study:** the exploratory lab stretched a phone column on tablets, and the critique called it correctly — a 620px column floating in 834px of paper is not a composition. This study defines the real one, demonstrated live in the refinement prototype at the tablet viewport.

## The composition: reading column + material rail

From 720px, Atelier becomes a **two-column page**:

- **Reading/action column** (left, ≤46ch): everything linear — kicker, title, why, instructions, choices, and the single dominant action. Line length is capped for reading comfort; the action column never widens into banner territory.
- **Material rail** (right, ~38% width): exactly **one material object with one caption** — the cloth, the band strip, the day's preparation, or a plain-language summary. The rail is context, never interface: it contains no buttons except when it *is* the artefact being acted on (week 12's export).

This is the tablet answer to "use the larger canvas meaningfully without creating a dashboard": the second column holds *material*, not *metrics*. There is never a second call to action, never a stat grid, never a card mosaic.

## Per-screen application

| Screen | Reading/action column | Material rail |
|---|---|---|
| **Today** | Kicker, title, why, Begin, alternatives | The cloth so far + position caption ("Week 3 · Day 2 — 15 days kept") + week theme |
| **Show me how** | The numbered steps, dose, safety line, Begin | The band strip + today's preparation list (quiet checklist) |
| **The Twelve Weeks** | Legend, plain totals, week themes list | The full cloth, larger than any phone rendering — the one screen where the material leads and text supports |
| **Long absence** | Welcome-back copy, the three facts, capacity choice | The held cloth ("what you wove is woven" as caption) |
| **Week 12** | The completion copy, record summary, export/handover actions | The finished band, unrolled, at its most generous size |

## Rules

1. **One dominant action** — always in the reading column, always full-width of that column, never duplicated in the rail.
2. **The rail degrades to the phone order** below 720px: rail content returns to its inline position (band above title, cloth on journey), so there is one content model, two compositions.
3. **Focus and reading order follow the reading column first**, then the rail — matching DOM order; the rail is `aria` supplementary (`complementary` landmark on screens where it is purely contextual).
4. **Texture discipline holds**: the rail carries the progress surface; the reading column stays on quiet paper. The gutter between them is the selvedge — a single hairline, not a boxed card edge.
5. **Landscape phones** (short height): the two-column composition does not engage; short-axis space is spent keeping Begin on screen, not on a rail.

## What was considered and rejected

- **Centred single column, wider** — the exploratory non-answer; reading measure breaks or margins balloon.
- **Two-page book spread** — Quarto's move; importing it wholesale would smuggle in the book metaphor this phase explicitly retired to backup.
- **Journey as sidebar on every screen** — persistent progress display drifts toward dashboard psychology; the cloth appears where it means something (Today's rail, journey, recovery, completion), not everywhere.
- **Master–detail split navigation** — an iPad convention for content libraries; this product has three destinations and one daily task, not a library.

## Open production questions (recorded, not resolved)

- Split-screen/multitasking widths between 508 and 720px need a decision about when the rail collapses.
- The 720px threshold is a prototype constant; production should key on size classes and content, not a pixel number.
- Tablet keyboard/pointer hover states are undesigned; the prototype demonstrates layout, not pointer affordances.
