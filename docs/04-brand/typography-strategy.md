# Typography Strategy

**Status:** Draft for Gate 3. Criteria and testing process — **no typeface is chosen here**; candidates are named as *test subjects* per territory. Standing constraint (founder requirement): Inter, Poppins, Manrope, Montserrat and SF Pro are excluded as the *brand* face (system fonts may still serve native-utility surfaces where that genuinely improves usability — e.g. system share sheets, native pickers — the brand face carries everything the product authors).

## 1. Selection criteria (every candidate scored 1–5 against all)

| # | Criterion | Why it matters here |
|---|-----------|---------------------|
| 1 | Brand personality fit | Territory-dependent (serif warmth / grotesk precision / cartographic sturdiness) |
| 2 | Legibility at body sizes | Guidance prose is the product; D-001 makes this existential |
| 3 | Numeral design incl. **tabular figures** | Week numbers, durations, prices — numerals are brand-critical in every territory |
| 4 | Small-size rendering (esp. low-DPI Android) | The category's silent killer of premium feel |
| 5 | Weight range & optical sizes | Editorial scale contrast; 200%-text layouts need weights that hold |
| 6 | Variable font support | Performance (one file), Dynamic Type smoothness |
| 7 | Licensing (app embedding, cost, term) | Commercial reality; app-embed licences differ from web |
| 8 | Language support | UK launch → Latin-extended now; localisation-ready later (N-26) |
| 9 | Android rendering quality (hinting behaviour) | Parity duty (PSR-02; platform-inequity theme T8) |
| 10 | iOS rendering + Dynamic Type behaviour | Scale gracefully to accessibility sizes |
| 11 | Accessibility characteristics | Open apertures, distinguishable Il1, generous x-height for body roles |
| 12 | Performance (file size, subsetting) | NFR-02 budget |
| 13 | Long-term availability (foundry stability, self-hosting rights) | A brand face that vanishes is a rebrand |

## 2. Candidate spaces per territory *(subjects for testing, explicitly not selections)*

- **A · Printed Programme:** text serif lead — Literata, Newsreader, Source Serif 4, Tiempos Text; UI grotesk support — Söhne-class or IBM Plex Sans; data numerals from the serif's tabular set or the grotesk.
- **B · Instrument:** single grotesk lead with exceptional numerals — Söhne, Neue Haas Grotesk, Unica-lineage, IBM Plex Sans (open fallback); optional mono-flavoured numerals for graduations (e.g. Plex Mono figures) if tests support it.
- **C · Long Path:** humanist sans lead — Frutiger-lineage, Source Sans 3, National-class; slab display accent — Roslindale-class or a sturdy geometric slab; small-caps capability for map-label seasoning.

Open-licence fallbacks are deliberately included in every set: if licensing economics fail (Q9), each territory has a no-compromise-on-criteria open path.

## 3. The testing protocol (Stage 3, ~1 week, before any selection)

1. **Real-content specimens:** each pairing set in actual product surfaces — a guided action page, Today, the paywall (G9 text), a week-12 report page, a data row — never lorem ipsum.
2. **Device matrix pass:** reference low-end Android (low-DPI), mid Android, small iPhone, large iPhone — screenshots at 100% and 200% text, light + dark.
3. **Numeral audit:** tabular alignment in data columns; week-numeral display cuts at signature-object sizes; price rendering (paywall) ambiguity check (£1 vs £l).
4. **Accessibility screen:** Il1/0O confusability, aperture check at 17pt equivalent, weight behaviour at accessibility text sizes.
5. **Blind preference test:** founder + 5–8 target-age-spread readers rank specimens for "trustworthy / warm / effortful to read" without typeface names visible.
6. **Licence + performance sheet:** embed rights, cost, file sizes subsetted.
Scores + specimens archived in this folder; the Gate-3 territory decision includes its type pairing decision, recorded in the decision log.

## 4. System-font usage policy

System type (SF Pro / Roboto) permitted for: OS-provided chrome we don't own, native pickers/sheets, and — if testing shows a genuine usability win — dense settings surfaces. The brand face owns: all guidance content, Today, Journey, paywall, reports, notifications-visible text, store screenshots. The test protocol explicitly compares brand-face vs system-font settings screens before deciding that boundary.

## 5. Typographic system rules (face-independent, binding now)

Baseline scale defined in the design system with **Dynamic Type mapping per role** (not free-floating point sizes); body ≥17pt-equivalent; line length 45–75ch guidance surfaces; no ultra-light weights below display sizes; sentence case product-wide (content strategy); numerals tabular in any column/data position, proportional in prose; letterspaced small caps only where a territory's rules licence them; every text style ships with its 200% behaviour specified (wrap, not truncate — truncation of guidance is a defect class).
