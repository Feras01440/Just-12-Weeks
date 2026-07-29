# Direction B — Meridian (The Instrument)

**Status:** exploratory · one of three · not selected
**Run it:** `design-lab` → direction **B**; screenshots in `design-lab/screenshots/b/`

## Governing metaphor

> A fine field instrument for a twelve-week undertaking. One glance gives the reading; one control arms the work.

Meridian explores precision without coldness — the warmth of a machined brass instrument, not the chill of a dashboard. The product behaves like a tool that takes its owner seriously: it shows *the* reading (today), records what happened (the log), and never editorialises. Numbers are readings, so they are set in a monospaced hand; labels are engraved, wide and unhurried.

## The single governing visual idea

**One instrument face, one amber pointer.** Amber is the only saturated element anywhere, and it always means “your action / your position”. Everything else is engraving.

## Which screen proves the idea

**Today** (`today`): the face carries the engraved kicker, the action title, one line of why, the mono duration readout, and a single amber ARM bar — with the traverse rail beneath showing exactly where in the twelve weeks you stand. It is a dashboard-free instrument: nothing competes, nothing decorates.

## Composition · hierarchy · rhythm

- A strict column; the elevated “face” region carries today; engraved tick rails mark edges and sections.
- Hierarchy: engraved wide caps (Archivo, width axis ~115%) → title (Archivo semibold) → body → mono readouts (IBM Plex Mono). Tabular numerals throughout — a timer that never jitters is part of the trust story.
- Spacing follows a 4px module; hairline ticks do the work borders would.

## Navigation expression

Indexed: everything has a position (W03·D2), and screens read as faces/panels of one device rather than a stack of pages. Back is a labelled control; the journey is the instrument’s log, one tap from Today.

## Twelve, expressed

**The traverse rail:** a graduated rail with twelve engraved detents (01–12), minor ticks for days, and a carriage at the current position. On Today it is horizontal and quiet; in the journey it turns vertical and becomes the log — each week a graduated section with recorded readings (“W2·D3 — HINGE PRACTICE — 16 MIN — RECORDED”). Week transitions are detent advances (03 → 04): a mechanical, dignified click forward. Week 12 is the rail complete — 12/12, nothing left unindexed.

## Recovery, expressed

“**Recalibration, not reproach.**” A missed day is “— NO READING —”: an ordinary log entry, hollow tick, zero deficit styling — an instrument records absence without alarm. The signature interaction is the **capacity dial** on return: Low / Steady / Full, a physical three-position control; the user *operates* their re-entry instead of confessing it. Rescheduling re-indexes the traverse — same rail, wider detent spacing.

## Colour · imagery · motion

Bone/slate with amber pointer and verdigris completion (logic in `colour-and-material-exploration.md`). Imagery: measured technical drawing — dimension lines and procedural panels, never stock photography. Motion: calibrated sweeps (300ms, zero overshoot — an instrument that overshoots is broken), 40ms detent settles, a 120ms RECORDED press (tokens in `motion-and-haptics-exploration.md`).

## Emotional character

Assured, capable, adult. The feeling sought: *being trusted with a serious tool* — which is precisely the opposite of being nudged by a wellness app.

## Both worlds

Readings are content-neutral: a squat session and a drafting session are both “14 MIN — RECORDED”. The writing world softens nothing structurally; only the procedure text and the log vocabulary change. This is B’s quiet strength: it is the most world-agnostic of the three.

## Anti-generic questionnaire

- **Interaction that could belong only to this product:** setting the capacity dial after an absence; the detent advance between weeks.
- **Recognisable with the logo removed?** Yes — engraved wide caps + mono readings + a graduated rail is not a template vocabulary.
- **Conventions rejected:** cards, progress rings, streak flames, dashboards of stats, coloured status chips, celebratory confetti.
- **Conventions retained:** one filled primary control; labelled text buttons; big legible timer; a plain checklist.

## Risks and open questions (honest)

1. **Coldness risk is real** — the direction lives or dies on warmth of copy and the amber/bone material; if it drifts technical it becomes the banned dashboard. (Critique pass explicitly checks this.)
2. Engraved caps at 200% text need care (tracking must relax); verified in the lab but fragile in production.
3. The rail must never become a *score*; if users read detents as grades, the framing has failed.
4. Mono for all numbers is a strong flavour — needs testing with older users for perceived “computer-ness”.
