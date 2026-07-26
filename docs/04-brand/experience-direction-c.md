# Direction C — Atelier (The Weave)

**Status:** exploratory · one of three · not selected · replaces the “Long Path” territory (rationale below)
**Run it:** `design-lab` → direction **C**; screenshots in `design-lab/screenshots/c/`

## Governing metaphor

> Twelve weeks weave a cloth. Every day adds a thread — and the cloth holds, even where a thread is missed.

Progress is accumulation of real material, not distance travelled. Nothing woven can be unwoven: the anti-streak principle made physical. At week 12 the user owns a finished band of cloth that encodes *their* actual twelve weeks — gaps, mends and all — which no other user’s cloth resembles.

### Why this replaces “Long Path”

Literal paths and maps converge on game-board trails (the banned “childish, game-like, visually literal” cluster) and carry a cruel implicit metric: distance *not yet* covered. Weaving preserves the territory’s values — unfolding movement, visible progression, an arrival — and adds two things a path cannot offer: a dignified native recovery metaphor (**visible mending**) and a personal completion artefact (the band). The sprint brief permits replacing a territory when a stronger concept emerges; this is that case, argued and prototyped.

## The single governing visual idea

**The cloth.** One woven band — compact under the header on daily screens, full-width as the loom in the journey — is the only orientation device the product needs.

## Which screen proves the idea

**Long absence** (`long-absence`): the woven cloth shown whole under the words “what you wove is woven”, a new thread to tie on, three capacity choices. It converts the most dangerous moment in any programme product (returning after weeks away) into the direction’s most beautiful screen. That inversion — recovery as the best screen — is the brand thesis.

## Composition · hierarchy · rhythm

- Soft asymmetric column on linen; the band under the header; raised panels only where an object is “presented” (artefact, swatches).
- Hierarchy: Bricolage Grotesque (display/labels) → Faustina (body 17px, 1.6) → mono-free numerals (Faustina tabular for timers).
- Warmth from material and type, not from rounded-corner inflation.

## Navigation expression

Rows and threads: forward through the day’s flow; the loom as the hub; every screen states position in text (“Row 3 of 12 · 15 days woven”). No tab bar in the prototype (limitation shared with A/B; platform shell is production work).

## Twelve, expressed

**Twelve woven rows of seven picks.** Completed days are threads in the programme’s dye (strength weaves madder, writing weaves indigo — the world-accent system is structural, not cosmetic). Missed days are fine gaps; recovered days are **mend stitches** in cream-gold; future weeks are bare warp — visibly *prepared for*, not empty. Week transitions beat the finished row up into the cloth; week 12 adds the selvedge and the band unrolls once — the lab’s single expressive motion moment.

## Recovery, expressed

“**Visible mending.**” The mend is not an apology — it is thread of a finer colour, and it stays: in the band, in the loom, in the completion artefact. One missed day: *a space in the cloth, not a hole in the week* — pick up the thread. Several: the gap span shown, the cloth holds, two re-entry choices. Long absence: **tie back on** (above). Reschedule: **re-warp the loom** — more rows, same cloth; the finished band is simply longer, and longer is not worse.

## Colour · imagery · motion

Linen ground, world-dyed thread, mend-gold, selvedge-olive (logic in `colour-and-material-exploration.md`). Imagery: field-guide/craft-manual ink plates; textures woven in SVG, never photographed. Motion: the thread draws (400ms), the row beats up (300ms), the band unrolls once at week 12 (600ms); reduced motion renders finished states (tokens in `motion-and-haptics-exploration.md`).

## Emotional character

Warm, patient, hand-made — *you are making something real*. The register is a fine textile studio, not a craft fair: restraint is what keeps the metaphor adult.

## Both worlds

The dye system makes the worlds feel like different cloths from the same loom — which is exactly the product architecture (one structure, many programmes). Strength: madder band, sturdy plates. Writing: indigo band, a draft accumulating like cloth (the analogy is native: text/textile share a root, and the copy uses it once, lightly).

## Anti-generic questionnaire

- **Interaction that could belong only to this product:** tying back on after an absence; watching a mend stitch sew into your own record and *stay* there, honoured, at completion.
- **Recognisable with the logo removed?** Yes — no mainstream product renders progress as woven cloth with visible mending.
- **Conventions rejected:** streak chains, progress rings, calendar grids, badge cabinets, mascots, confetti.
- **Conventions retained:** one filled primary control; labelled buttons; plain checklists; a boring, legible timer.

## Risks and open questions (honest)

1. **First-sight comprehension** of the weave needs the caption pairing (“15 of 84 days woven”) — if testing shows the caption is doing all the work, the metaphor is decoration and should be rethought.
2. **Kitsch gravity:** one wrong texture or rounded corner too many and it’s a craft sticker; the direction needs the strictest art direction of the three.
3. The mend must never read as *error highlighting* — its colour/shape live in the “materials” family, and the critique pass checks it.
4. SVG weave cost is the highest of the three directions; performance on old devices is unverified (prototype-scope limitation).
