# Colour Strategy

**Status:** Draft for Gate 3. A **roles-first** system: every colour exists because a role needs it; territories fill the roles with different values (their "colour philosophy" sections). No palette is final until a territory is chosen and contrast-verified. Binding rule inherited from accessibility requirements: **meaning never travels by colour alone** — every colour encoding has a shape/label/position twin.

## 1. The role architecture (territory-independent)

### Neutral spine (does 90% of the work)
| Role | Purpose | Requirements |
|------|---------|--------------|
| `surface/base` | The ground everything sits on | Light + dark values; warm bias in all three territories (no clinical white/black) |
| `surface/raised`, `surface/sunken` | Hierarchy without shadows-everywhere | Perceptible at low vision; not shadow-dependent (anti-generic: no elevation soup) |
| `ink/primary`, `ink/secondary`, `ink/tertiary` | Text + essential marks | 4.5:1 minimum vs their surfaces; primary aims 7:1 (AAA) for guidance prose |
| `line/structural`, `line/hairline` | Rules, dividers, graduations | 3:1 where meaning-bearing |

### Identity accent (exactly one)
`accent/identity` — the territory's single brand hue (second-colour ink / lume / route colour). **Usage law:** primary actions, the signature object's live state, genuine milestones. Never: backgrounds, decoration, filler charts. Discipline enforced by design-system lint (accent-use audit per release).

### Semantic set (conventional, separate from identity)
`positive` (confirmation — used sparingly; completion is identity-accent territory, not green), `caution` (safety notes in physical programmes), `critical` (destructive actions, errors — **never used for missed days**: the recovery register bans alarm colours), `informative`. Each with on-colour ink pairs at 4.5:1, both themes.

### Programme accents (D-004 mechanism)
Each programme is assigned `programme/accent` from a pre-verified accessible ramp (8–12 slots, all AA against both surface sets, colour-blind-distinct as a set). Universal chrome never uses them; they live inside programme content surfaces, journey chapters, and the catalogue — the platform stays neutral while programmes have identity (PRQ-01 in colour form).

### Data visualisation set
Sequential ramp (progress/trends: territory-neutral perceptual ramp), categorical set (max 6, colour-blind-safe, from the programme-accent family), annotation ink. Charts always carry direct labels/values in text (accessibility §8) — the palette assumes it.

### Progress colours
Progress is **identity + neutral** (built vs not-yet), never red/green state pairs; lapse terrain renders in neutrals (recovery register: absence of alarm *is* the design).

## 2. Modes

- **Light and dark as equals:** both designed from day one (NFR-01); territory pairs define both ("daylight dial", "night printing", "night navigation"). No auto-inverted afterthoughts.
- **High-contrast variants:** increased-contrast platform settings map to a verified stronger pair set (ink→full-contrast, hairlines→structural); defined in tokens, not improvised.
- **Reduced-transparency:** any blur/translucency (rationed anyway) has a solid fallback token.

## 3. Accessibility gates (numbers, not vibes)

Every role pair ships with measured ratios in the token file; CI check fails builds on regressions. Minimums: body text 4.5:1 (target 7:1), large text/essential graphics 3:1, focus indicators 3:1 against adjacents. Colour-vision: the full role sheet passes protan/deutan/tritan simulation review at Gate 3 (territory choice includes this evidence); the programme-accent set is chosen as a *set* for distinctness under all three simulations.

## 4. Anti-generic guard-rails

No purple-blue SaaS gradient anywhere; gradients in general only if a territory earns them structurally (e.g. elevation profiles) — never as decoration; no colour-coded "mood" systems; no rainbow feature-tile grids; the identity accent is not teal-by-default, not purple-by-default — it is the territory's argued choice.

## 5. Deliverables at Gate 3 (with the territory decision)

Full token sheet (roles × values × modes × contrast variants) with measured ratios; programme-accent ramp v1 (8 slots verified); dataviz ramp specimens over real chart shapes; colour-blind simulation evidence; the accent-use law written into the design system plan. Until then, wireframes (Stage 4 preparation) run **greyscale + one placeholder accent** — colour decisions are not allowed to leak in early via habit.
