# Colour, Material and Imagery Exploration

**Status:** exploratory. Each direction has a coherent colour *logic* — a small set of roles with defined light/dark pairs — not a palette board. Values below are the implemented tokens (see each `direction-*.css`); contrast pairs were checked against WCAG AA (4.5:1 body text, 3:1 large text/graphics) and re-verified by the automated axe pass (`docs/03-ux/design-accessibility-review.md`).

Avoided by construction: purple/blue SaaS gradients, neon-on-black, identityless beige minimalism, wellness-green clichés, and colour as a lone status signal (every state also differs by shape, mark or label).

---

## Direction A · Quarto — “paper and ink”

**Logic:** one warm paper, one warm ink, and two printer’s accents used the way printers used them: blue ink for *doing*, rubrication for *care*, gilt for *arrival*. Nothing else. Hierarchy comes from typography, so colour stays almost monochrome — the restraint *is* the identity.

| Role | Light | Dark (“reading at night”) |
|---|---|---|
| Environmental background | `#F7F2E8` paper | `#1B1813` warm near-black paper |
| Primary text | `#262119` warm ink | `#ECE4D2` candle-warm white |
| Secondary text | `#6F6757` | `#A89D87` |
| Action emphasis | `#24407F` ballpoint blue (fill, paper text) | `#A9BDF2` moon-ink (fill, dark text) |
| Journey state | ink marks on hairlines `#D9CFBC` | marks on `#3A342A` |
| Recovery state | rubrication `#9A2F1A` — never as background, always beside text | `#E08A6A` |
| Completion | gilt `#7C5E14` | `#D3B25E` |
| Warnings/safety | rubric + the word (“Take care.”) | same pattern |
| Programme accents | none — worlds differ by content, the book stays the book | — |
| Colour-blind behaviour | effectively monochrome + one blue; all states shape-coded (em-dash for missed, tick for done) | same |

**Imagery position:** engraved-style instructional line drawing and typographic ornament only (fleurons, rules, the ribbon). No photography. Diagrams read as plates in a manual.

## Direction B · Meridian — “slate, bone and amber”

**Logic:** an instrument has a face, engraving, and one pointer. The pointer (amber) is the *only* saturated element and always means “your action / your position”. Everything informational is engraved (ink on bone, silver on slate). Completion is verdigris — aged bronze, earned patina. Missed time is *hollow*, not red: absence of a reading, not presence of a fault.

| Role | Light (“bone face”) | Dark (“instrument at night”) |
|---|---|---|
| Environmental background | `#ECEAE3` bone | `#171B20` deep slate |
| Instrument face (elevated) | `#F4F2EC` | `#1F242B` |
| Primary text | `#23282E` | `#E4E7EA` |
| Secondary text | `#565D66` | `#9AA2AB` |
| Action emphasis | amber fill `#C87E0A` with `#1C1E21` text; amber-as-text `#8A5300` | `#E9A13B` fill, `#171B20` text |
| Journey state | engraved ticks `#C9C4B8`/`#9A958A`; solid = recorded | `#4A525C`/`#6B747F` |
| Recovery state | hollow ticks + “NO READING” label; capacity dial amber | same shapes |
| Completion | verdigris `#2F6B58` | `#7FB8A4` |
| Warnings/safety | oxblood `#8C3B24` inside a bordered CAUTION plate | `#D98B75` |
| Programme accents | none on the instrument itself; world lives in labels/logs | — |
| Colour-blind behaviour | amber vs slate survives all common CVD types; recorded/missed differ by fill vs hollow | same |

**Imagery position:** measured technical drawing — dimension lines, angles, procedural sequence panels (squat depth as a quiet diagram, not a photo of a model). Zero stock photography.

## Direction C · Atelier — “linen and dye”

**Logic:** the ground is undyed linen; **each programme world dyes its own thread** — this is the programme-accent system the brief asked for, made structural instead of decorative. Strength weaves in madder; writing weaves in indigo. Mending is cream-gold thread; the selvedge (completion) is olive-gold. Warnings take the labelled-note pattern, not a colour wash.

| Role | Light (“linen”) | Dark (“dye-house at dusk”) |
|---|---|---|
| Environmental background | `#F2EEE5` linen (with a sub-1% weave texture) | `#1A1D24` |
| Raised panel | `#F8F5EE` | `#232730` |
| Primary text | walnut `#33291F` | `#EAE4D8` |
| Secondary text | `#6E6254` | `#A69C8D` |
| Action emphasis | the world’s dye: madder `#A0431F` / indigo `#2E4A85` (fills with warm-white text) | `#E0895B` / `#94B1E9` (dark text) |
| Journey state | woven thread in the dye; bare warp `#D9D1C0` for the future | warp `#3B4048` |
| Recovery state | mend stitch `#B08D2E` — a *material*, not an alert | `#D9BC6A` |
| Completion | selvedge `#6B6320` | `#C4BC72` |
| Warnings/safety | `#8C3B24` + “TAKE CARE” label | `#DB8F79` |
| Programme accents | the dye system above — structural, not cosmetic | same |
| Colour-blind behaviour | done/missed/mended differ by stroke/gap/stitch-shape; dye hue never carries meaning alone | same |

**Imagery position:** field-guide/craft-manual drawing — hand positions and setups as fine ink plates; textile textures rendered, never photographed. No random 3D; no stock wellness imagery.

---

## Shared guarantees

1. **Contrast:** all body-text pairs ≥4.5:1; large display type ≥3:1; verified by axe run across every state (see accessibility review for the numbers and the two flagged near-misses and their fixes).
2. **Light/dark are siblings**, authored together; dark is never an inversion (paper darkens to warm black, not grey; amber brightens but keeps its role; dyes desaturate as real dyes do at dusk).
3. **No colour-only state, anywhere.** Missed = em-dash (A), hollow tick + label (B), gap in weave (C). Done = mark/fill/thread. Recovery = ribbon/label/stitch.
4. **Safety language** always pairs colour with a word and a border or rule.
5. 3D was explored and rejected for this sprint (see `twelve-signature-exploration.md`, candidate 8): no candidate served a navigational, instructional or emotional function that its 2D equivalent didn’t serve more accessibly.
