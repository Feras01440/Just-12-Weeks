# Direction A — Quarto (The Printed Programme)

**Status:** exploratory · one of three · not selected
**Run it:** `design-lab` → direction **A**; screenshots in `design-lab/screenshots/a/`

## Governing metaphor

> Twelve weeks are a book being read. Twelve chapters, one page per day, a bookmark that only moves forward.

Quarto is the maximal test of typography-led product design: hierarchy, orientation, state and emotion are carried almost entirely by type, hairlines and paper — no cards, no chrome, no iconography. The interface borrows the anatomy of a fine printed programme: running heads, folios, a table of contents, chapter openers, rubrication, a colophon — and, for the product’s hardest states, the book’s own conventions: the errata slip (error), uncut pages (not yet available), the revised edition (rescheduling).

## The single governing visual idea

**One column of beautifully set text on paper, with a running head that always knows where you are.** Everything else is subordinate to that.

## Which screen proves the idea

The **week transition** (`week-transition`): a chapter opener — “Chapter IV” in Fraunces at optical size 144, the week’s title, an epigraph-length focus line, and what the previous chapter leaves you with. No app pattern exists on that screen at all; it is pure book — and it is unmistakably this product.

## Composition · hierarchy · rhythm

- Single text column, max 620px, generous margins; tablet widens margins rather than adding panes.
- Baseline rhythm derived from body leading (17px × 1.58); hairlines (1px) are the only structural lines.
- Hierarchy: running head (small caps, letterspaced) → kicker → title (opsz 60) → body (opsz 12) → meta/folio. Display numerals at opsz 144.
- The fore-edge: a quiet column of twelve marks on the right edge showing pages read — decorative, always paired with the folio text (“day 16 of 84”).

## Navigation expression

Book navigation: forward through pages, back via a labelled “← Today” line, contents as the hub. No tab bar in the prototype — the contents page *is* the map (a production build would need a platform-honest shell; recorded as a limitation).

## Twelve, expressed

Chapters I–XII in a contents page. Future chapters are **uncut** — no titles, a line of unslit paper — so the programme reveals itself week by week (curiosity without spoilers). Past chapters read “kept”, with their day-marks as leaf ticks; missed days are em-dashes; a recovered day carries a small rubric under-mark. The number is also present as the fore-edge, the folio arithmetic, and the XII/XII colophon.

## Recovery, expressed

“**The bookmark never moves backwards.**” One missed day is *a quiet day in the margin* — an em-dash, a calm page, two ways forward (full or gentler, both counting in full). A long absence reopens like a book: the ribbon, *where you left off*, three capacity choices. Rescheduling is a **revised edition** — the remaining chapters reprint over more weeks, which is how real books handle change: without apology.

## Colour · imagery · motion

Paper and ink; ballpoint blue for action; printer’s rubrication for care; gilt for arrival (full logic in `colour-and-material-exploration.md`). Imagery: engraved instructional plates and typographic ornament only. Motion: the page settles (240ms), ink draws (420ms), the day’s stamp presses (360ms) — nothing bounces; reduced motion keeps every meaning (tokens in `motion-and-haptics-exploration.md`).

## Emotional character

Literary, adult, permanent. The product feels like something *authored* — a promise that twelve weeks were composed with intent, not generated.

## Both worlds

Strength reads as a training manual with a humane voice; writing reads as a writer’s almanac. The book carries both without changing a single structural element — only the content changes register. (Compare `today--light.png` and `today--light--writing.png`.)

## Anti-generic questionnaire

- **Interaction that could belong only to this product:** pressing the day’s stamp into the page; opening a chapter whose pages were uncut yesterday.
- **Recognisable with the logo removed?** Yes — no mainstream product sets its daily screen as a typeset page with a running head and folio.
- **Conventions rejected:** cards, icons, tab bar, progress ring, avatar, dashboard blocks, coloured status chips.
- **Conventions retained (users need them):** one filled primary button; visible labelled links; standard back affordance; checklists that look tappable; system-legible timer digits.

## Risks and open questions (honest)

1. **Quiet can read as static** — between milestones the surface changes little; whether that is “calm” or “empty” needs real users (week-9 boredom test).
2. **Serif-only small text** on low-res Android needs device verification; Literata is the recorded fallback body face.
3. The fore-edge is subtle to the point of invisibility for some users — it is deliberately redundant, but if it never lands it should be cut rather than louder.
4. No tab bar means unfamiliar top-level wayfinding for app-habituated users; the contents hub must be reachable in one tap always.
