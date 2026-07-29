# Atelier Refinement Brief

**Phase decision (recorded, not revisited here):** Direction C — Atelier — advances as the primary refinement candidate. Direction A — Quarto — is retained, unmodified, as the documented backup in the exploratory laboratory. Direction B — Meridian — is discontinued as a complete direction; three of its interaction principles are re-expressed through Atelier's language (see Controlled Borrowing). This phase does **not** finalise the product name, flagship programme, permanent brand identity, production framework, final typography, or pricing.

**Scope:** one bounded refinement pass, built in `design-refinement/`, leaving the exploratory laboratory (`design-lab/`) untouched as comparison evidence. The refined prototype is a single-direction executable app with real top-level navigation, both programme worlds, and full evidence tooling.

**Governing idea (unchanged):** twelve weeks create something that remains. What was completed remains completed, and disruption can be repaired without erasing the journey.

**Operating rule (hard):** no user needs weaving vocabulary to operate anything. Functional controls are literal — Begin · Show me how · Choose something gentler · Change my weekly days · Pause the programme · Return to today. Metaphor lives in identity, progress expression, recovery acknowledgement, transitions and completion.

---

## Binding refinement decisions

The following are decided for this pass (rationale in `atelier-refinement-report.md`; reversibility in `design-refinement/DECISIONS.md`).

### R1 · Navigation — the selvedge bar
A bottom navigation bar with **three destinations**: **Today**, **The Twelve Weeks** (journey), **Programme & Support** (settings, membership, purchase controls, pause, help). No Insights destination, no dashboard. Atelier expression: a quiet selvedge strip — hairline top rule, text-first labels with small woven glyphs; the current destination carries a short laid-thread mark in the world's dye and `aria-current="page"`. Bar height ≥ 56px plus `env(safe-area-inset-bottom)`; labels never truncate at 200% (the bar may grow to two-line labels); bottom placement is the one-handed decision. During an active timed session the bar yields to the session (full-screen focus), returning on completion or pause — guidance-first means the session owns the screen.

### R2 · Enlarged text — a deliberate hierarchy, not proportional scaling
At 200% the Today screen re-ranks rather than merely grows:
1. a compact position line (plain text: "Week 3 · Day 2 — 15 days kept") with a thin band strip;
2. the day title;
3. **Begin** — within the first viewport;
4. "Show me how" and "Something gentler today" as immediately visible compact rows directly under Begin;
5. the why-paragraph as a one-sentence visible summary with an accessible expansion ("Why this matters — more", `aria-expanded`); the full text is never removed, only folded, and at standard size it renders expanded.
DOM order is identical at both sizes (screen-reader order never changes); only CSS composition changes. Trade-offs are documented in `docs/03-ux/enlarged-text-information-strategy.md`.

### R3 · Texture — a controlled density system
Four surfaces replace the everywhere-graph-paper:
- **Quiet reading surface** — flat paper, no grid: instructions, why, question, commerce, legal, settings;
- **Progress surface** — faint warp (≤3% ink): Today's band strip, journey, artefact;
- **Transition surface** — fuller warp + selvedge: week transitions, first launch;
- **Completion surface** — the fullest material moment: week 12 and the finished band.
Dark mode halves texture alpha; texture never sits under running body text.

### R4 · Journey comprehension — every state paired with plain words
The cloth keeps its six visual states; comprehension comes from (a) a permanent legend pairing each mark with its name — Done · Rest, as planned · Missed — stays open · Mended — made up later · Today · Not open yet; (b) a plain-text total line ("15 of 84 days kept · 1 mended · 2 open"); (c) shape + label for every state (no colour-only, no textile knowledge). Verified at standard, 200%, dark, reduced motion, 320px.

### R5 · First-launch motif — three candidates, one chosen
Three refinements of the single opening motif are built and rendered side by side in a motif study, then one ships:
- **M1 · First thread ready** — the current loom refined: twelve numbered row-frames, row one's warp brightened, one weft thread visibly entering;
- **M2 · The band that will exist** — a ghost preview of the finished twelve-row band with row one rendered solid: boundedness, accumulation and the ending shown at once;
- **M3 · Row by row** — a twelve-segment ribbon, segment one showing true woven texture, two–twelve bare warp.
Selection criterion: which one communicates *twelve bounded stages, something being made, progress that remains, calm forward movement* with the caption covered.

### R6 · Tablet — a real composition, not a stretched phone
From 720px: a two-column composition — a reading/action column (≤ 46ch) and a **material rail** (the cloth, position, preparation or plain-language summary) — with exactly one dominant action per screen. Applied to Today, Show me how, journey, long-absence recovery and week-12 completion. The rail never becomes a dashboard: it holds one material object and its caption.

### R7 · Controlled borrowing (re-expressed, never imported)
- From Quarto: long-form typesetting discipline for instruction pages (measure, leading, list rhythm) and clear week/chapter orientation language. No book metaphor.
- From Meridian: precise position feedback ("Day 16 of 84 · Week 3 of 12" as plain text everywhere position is shown); the three-level capacity selection on return (each option immediately restates the next action it produces); unambiguous timer treatment — large tabular-lining numerals, minutes wording outside live timers. No instrument styling, no monospaced identity, no second progress representation.

### R8 · Typography — retained territory, tested harder
Bricolage Grotesque (display/UI) + Faustina (reading, roman) continue as the working pair. This pass adds: a 12px floor for any label; tabular numerals for timers and counts (`font-variant-numeric: tabular-nums`); body rhythm tuned for instruction reading; dark-mode weight compensation; a low-resolution rendering caveat recorded for Android. Families are **not** locked until on-device testing.

### R9 · Motion — same doctrine, live-verified
Seven moments are run and inspected live: begin, expand instructions, choose alternative, complete a day, mend a missed day, week transition, week-12 unroll. Every moment must explain causality or progression, remain interruptible, and preserve its completed visual state under reduced motion. No confetti, bouncing, parallax or cinematic delay.

### R10 · Commerce — same ethics, better hierarchy
Placeholder pricing unchanged; no monetisation decision. Refinements: clearer price/term hierarchy; cancellation path stated where the price is stated; restore visible from every commerce state; expiry keeps the record and artefact readable and exportable with equal-weight controls.

---

## Quality gate (this pass fails unless all hold)
Atelier recognisable with the name hidden · no functional action needs the metaphor · five-second Today at standard size · deliberate 200% hierarchy · journey readable without colour · recovery is the emotional high point · guidance-first, no dashboard patterns · tablet meaningfully composed · both worlds natural · automated accessibility clean · one internal critique pass run, blockers and majors fixed.
