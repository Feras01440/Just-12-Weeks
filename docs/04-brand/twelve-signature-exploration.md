# Twelve as a Design System — Signature Exploration

**Status:** exploratory. Eight candidates were developed; three were prototyped (one per direction); two are recorded as transferable to any direction; three were rejected with reasons. The banned defaults (twelve circles, generic progress ring, twelve identical cards, calendar grid, decorative clock) were treated as failure states, not candidates.

Each candidate is scored 1–5 against: meaning · originality · comprehension · emotional value · accessibility · motion potential · implementation cost (5 = cheap) · cross-programme suitability.

---

## Prototyped

### 1. The Contents — twelve chapters with uncut pages (Direction A)
Twelve weeks as chapters I–XII in a table of contents. Past chapters keep their titles and day-marks (“kept”); the current chapter carries a ribbon; future chapters appear as **uncut pages** — title withheld, a line of unslit paper. Progress is *pages read*, shown as a fore-edge strip and a folio line (“day 16 of 84”).

- meaning 5 — a book is finite, authored, and finishes; exactly the product’s promise.
- originality 4 — contents-as-journey is rare in apps; “uncut pages” as the not-yet-available state is, to our knowledge, unused.
- comprehension 5 — everyone has met a table of contents; Roman numerals are paired with “Week 3 of 12” in text.
- emotional value 4 — chapter openers give each week a threshold; the colophon gives the ending weight.
- accessibility 5 — pure text and hairlines; nothing depends on colour or graphics.
- motion potential 3 — page-settle and stamp-press are quiet by design.
- implementation cost 5 — typography only.
- cross-programme 5 — books are content-neutral.

### 2. The Traverse Rail — twelve engraved detents (Direction B)
A graduated rail with 12 major detents (engraved 01–12), minor day ticks, and a carriage at the current position. Journey view turns the rail vertical and hangs recorded readings off it (“W2·D3 — HINGE PRACTICE — 16 MIN — RECORDED”). A missed day is “— NO READING —”: an entry, not a wound.

- meaning 5 — an instrument measures a traverse; the user is *moving through* a bounded, graduated undertaking.
- originality 4 — rails/gauges exist in hardware UI but rarely as a programme spine; the recorded-log journey is distinctive.
- comprehension 4 — position-on-a-scale is universally read; numbers are duplicated in text.
- emotional value 4 — detent advance (03 → 04) has satisfying mechanical dignity.
- accessibility 4 — SVG is decorative with text equivalents; ticks need care at 200%.
- motion potential 5 — carriage sweeps, detent settles, bezel rotation.
- implementation cost 3 — SVG components in two orientations.
- cross-programme 5 — readings work for squats and scenes alike.

### 3. The Cloth — twelve woven rows (Direction C)
Each week is a woven row of seven picks; twelve rows make a band of cloth. Completed days are threads in the programme’s dye; a missed day is a fine gap; a recovered day is a **visible-mending stitch**; future weeks are bare warp. Week 12 adds a selvedge and the band becomes the completion artefact.

- meaning 5 — accumulation of real material; nothing woven can be unwoven — the anti-streak made physical.
- originality 5 — weaving as programme structure with mending-as-recovery appears genuinely unclaimed territory.
- comprehension 3→4 — needs one caption on first sight (“woven so far: 15 of 84 days”); after that it reads instantly. Mitigated with persistent text pairing.
- emotional value 5 — the finished band is a possessable object unique to each journey (gaps and mends included).
- accessibility 4 — decorative SVG + text; mend marks are shape-coded, not colour-only.
- motion potential 5 — thread-draw, row beat-up, unroll at completion.
- implementation cost 2 — the most expensive candidate; deterministic hand-made irregularity requires care.
- cross-programme 5 — dye colour is the world accent system.

## Transferable (documented, partially present)

### 4. Type that matures — a twelve-step variable-font axis
Week numerals (and optionally display headlines) move along a variable axis with the programme: week 1 sets the numeral light and small-optical; by week 12 it is full-blooded (Fraunces `opsz`/`wght`, Archivo `wdth`). The interface itself quietly gains authority as the user does.
- meaning 4 · originality 5 · comprehension 2 *as a sole signal* (it must decorate another twelve-system, never replace it) · emotional 4 · accessibility 5 (pure text) · motion 3 (axis interpolation on week transition) · cost 4 · cross-programme 5.
- **Verdict:** adopted as a seasoning layer — Direction A’s chapter numerals and B’s detent numerals already carry weight/width differences by state; a full 12-step ramp is recorded for the chosen direction to implement post-sprint.

### 5. The sealed ledger — twelve entries, pressed shut
Journey as a ledger of twelve entries; a week transition “seals” the closing entry (press interaction + haptic; the entry compresses to a single kept line). Recovery appends a marginal note to a sealed entry rather than reopening it.
- meaning 4 · originality 4 · comprehension 4 · emotional 4 · accessibility 5 · motion 4 · cost 3 · cross-programme 5.
- **Verdict:** strong reserve candidate; overlaps A’s contents and B’s log. Not separately prototyped to keep the three directions clean; the “kept” language it contributed survives across all three.

## Rejected

### 6. The horizon walk — twelve positions along a dawn-to-dusk arc
A light gradient arc where position 1–12 maps to times of day. Rejected: reads as a literal sun/clock (banned decorative clock adjacency); weak at week-level granularity; colour-dependent meaning fails the colour-blind bar; kitsch risk high.

### 7. The bounded field — a text block that grows into its margins
The page’s text measure widens/fills as weeks pass (week 1: narrow column in generous margins; week 12: full measure). Rejected as primary: imperceptible week-to-week (comprehension 1), and variable measure fights readability rules (45–90ch) at the extremes. A trace survives in A’s chapter openers (early chapters set airier).

### 8. Twelve stones / cairn accumulation
Physical-object accumulation (a cairn built stone by stone). Rejected: visually literal, wellness-cliché adjacency (zen stones), 3D pull without a navigational or instructional function, and the completion object is generic where C’s cloth is personal (the cloth encodes *your* actual weeks; a cairn of twelve identical stones encodes nothing).

---

## Cross-direction rules for twelve (whatever wins)

1. The twelve-structure must be **orienting** (always answers “where am I?”), not decorative.
2. It must have a text twin at all times (“Week 3 of 12 · day 16 of 84”).
3. It must represent missed time **without deficit styling** (no red, no emptied progress).
4. It must produce the completion artefact naturally — the journey view *becomes* the record.
5. It must survive 320px, 200% text, monochrome, and reduced motion.
