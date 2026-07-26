# Typography Exploration

**Status:** exploratory. No permanent typeface decision is made in this sprint (recorded in `design-lab/DECISIONS-NOT-MADE.md`). An executable specimen exists in the lab: open any direction and choose **Lab extras → Type specimen** (`#/a/strength/specimen`, `#/b/…`, `#/c/…`), including at 200% text and in both worlds. Screenshots: `design-lab/screenshots/*/specimen--*.png`.

Startup defaults (Inter, Poppins, Manrope, Montserrat and their look-alikes) were excluded at the brief’s instruction; novelty was not allowed to beat reading quality — every candidate had to survive the long-form instruction test at 17px equivalent and 200% scaling.

---

## The three systems built

### System A — Editorial serif, one family, full optical range (Quarto)
**Fraunces variable (OFL)** — display `opsz` 144 for chapter numerals and arrival moments, `opsz` 40–60 for titles, `opsz` ~12 for body; italics for marginalia and detail lines. A single family with a true optical axis carries the entire hierarchy — the strongest available test of “typography is the interface”.

- Personality: warm, literary, quietly eccentric at display sizes; sober at text sizes.
- Mobile legibility: good at 17px+ with `opsz` auto; not a caption face — small metadata is set 13px+ Medium with loosened tracking.
- Long-form instruction: strong (soft serifs, generous x-height at low opsz).
- Numerals: oldstyle proportional for prose (`onum`), lining tabular forced for timers (`font-variant-numeric: tabular-nums lining-nums`) — verified in the specimen’s timer block.
- Ageing eyes: passes with weight ≥400 and 17px+; Light banned below 16px (per Beier evidence in the research brief).
- 200%: verified by screenshot; single-column reflow, no clipping.
- Low-res Android risk: soft serif details may grey out on ldpi — **flagged**; fallback body candidate is Literata (engineered for low-res screens; see research brief §3.3) or Source Serif 4.
- Variable behaviour: two files (roman+italic), 149KB total woff2 latin.
- Language expansion: latin subsets bundled; Cyrillic/Greek exist for Fraunces — broader coverage is a production check.
- Licensing: OFL. Package: light. Fallback stack: `'Fraunces', 'Iowan Old Style', Georgia, serif`.

### System B — Engineered grotesque + monospaced readouts (Meridian)
**Archivo variable (OFL, `wght` 100–900 + `wdth` 62.5–125)** for everything textual; **IBM Plex Mono 400/500/600 (OFL)** for every number that *is a reading*: timers, detent indices, log entries, prices. The width axis gives engraved wide caps for labels (ARCHIVO at 115% width, letterspaced) without a second display family.

- Personality: precise, assured, tool-like warmth (Plex Mono’s roundness keeps it from coldness).
- Mobile legibility: excellent; grotesque x-height high; Plex Mono unambiguous 0/O, 1/l/I.
- Long-form instruction: good but drier than a serif — instructions are chunked into procedure steps to compensate.
- Numerals: Plex Mono is inherently tabular — timers never jitter; Archivo handles proportional prose figures.
- Ageing eyes: strong (open apertures, sturdy strokes); mono readouts at 500 weight for small sizes.
- 200%: verified; engraved caps wrap rather than clip (letterspacing reduced at scale via rem-derived sizes).
- Low-res Android: both families hint well; lowest risk of the three systems.
- Variable behaviour: Archivo single file 90KB; Plex Mono static trio 45KB.
- Licensing: OFL. Fallback: `'Archivo', 'Helvetica Neue', Arial, sans-serif` / `'IBM Plex Mono', 'DejaVu Sans Mono', monospace`.

### System C — Warm display grotesque + sturdy text serif (Atelier)
**Bricolage Grotesque variable (OFL, `opsz`+`wdth`+`wght`)** for titles/labels — characterful, slightly hand-finished; **Faustina variable (OFL, roman+italic)** for body — a sturdy, warm text serif with a genuine italic for the coaching voice. The pairing logic is the *reverse* of System A (grotesque leads, serif reads), so A and C cannot be mistaken for each other.

- Personality: crafted, warm, human; the closest voice to “a good teacher”.
- Mobile legibility: Faustina’s large x-height reads well at 17px; Bricolage below 14px needs Medium+ and tracking (enforced).
- Long-form instruction: strong (Faustina 1.6 leading; italics for asides).
- Numerals: Faustina ships tabular lining (`tnum` verified in specimen); Bricolage display numerals for row counts.
- Ageing eyes: good; Faustina’s low contrast strokes survive dark mode without blooming.
- 200%: verified by screenshot.
- Low-res Android: Bricolage’s tight apertures at small sizes are the risk point — kept to display roles only.
- Variable behaviour: three files, 186KB total.
- Licensing: OFL. Fallbacks: `'Bricolage Grotesque', 'Trebuchet MS', sans-serif` / `'Faustina', 'Charter', 'Bitstream Charter', Georgia, serif`.

---

## The six family/category evaluations

| Family (category) | Licence | Verdict for this product |
|---|---|---|
| **Fraunces** (editorial serif, real optical axis) | OFL | Prototyped as System A display+text. Distinctive without novelty cost at reading sizes. Production caveat: pair with a low-res-proven text serif if body legibility on budget Android disappoints. |
| **Literata** (e-reading serif, documented low-res design brief) | OFL | Not in the lab’s visible voice (deliberately — it is the *safe* choice), but recorded as the strongest body-text fallback for any serif-led direction; ships tabular figures; proven at Play-Books scale. |
| **Source Serif 4 / Newsreader** (workhorse editorial serifs, opsz) | OFL | Bench candidates for System A’s text role; slightly less character, excellent rendering. Evaluated on specimen copy during selection; not bundled to keep the lab lean. |
| **Archivo** (grotesque with width axis) | OFL | Prototyped as System B voice. The width axis replaces a second family — a real package-size argument. |
| **IBM Plex Mono** (humanist monospace) | OFL | Prototyped for readouts. The rare mono that is warm at 600 weight; unambiguous numerals; tiny static files. |
| **Bricolage Grotesque** (warm display grotesque) + **Faustina / Petrona / Andada Pro** (sturdy text serifs) | OFL | Prototyped as System C (Bricolage + Faustina). Petrona and Andada Pro remain interchangeable text-role candidates with near-identical metrics profiles — a production A/B on device, not a sprint decision. |

## Cross-system rules (apply to whichever system survives)

1. Body 17px equivalent minimum; measure 45–90ch; leading 1.5–1.6 (Butterick baselines).
2. Timers and any stacked/changing numbers: tabular lining figures, always (`font-variant-numeric: tabular-nums lining-nums`).
3. No Light weights under 16px; small labels Medium+ with +2–4% tracking (Beier).
4. Every size token is `calc(var(--ts) × n rem)` in the lab — the production equivalent is Dynamic Type / sp units with non-linear 200% scaling (Android 14+).
5. Display voices never carry instructions; instructions never drop below body size.
6. Bundle only latin subsets during exploration; full coverage + hinting review on real devices before any production decision.

## What the specimen proves (executable evidence)

Each direction’s specimen state renders, from live fixtures: the Today hierarchy (kicker/title/body), an instruction step with detail line, proportional vs tabular numeral rows (`0123456789`), timer faces (`14:00`, `25:00`), week labels (Roman, `W01–W12`, and row counts), the completion headline, small metadata, and the other world’s action title — and the lab’s 200% toggle and dark theme apply to all of it. This is the artefact to review before any typography debate: `screenshots/a|b|c/specimen--light.png` and `specimen--scale200.png`.
