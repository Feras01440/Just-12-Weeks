# 12 Weeks — Experience Design Laboratory

**Exploratory · non-production · disposable.** This directory is an isolated, executable design laboratory that demonstrates three genuinely different product directions for 12 Weeks across all 33 required experience states, in two sample programme worlds, in light/dark, at 100%/200% text, with and without motion, from a 320px phone to a tablet viewport.

It is **not** the production app, not a framework decision, not a final design. It is built to be compared, criticised, and deleted or rebased without ceremony.

## Run it

```bash
cd design-lab
npm start            # → http://localhost:4173/app/index.html   (no dependencies needed)
```

The viewer (top bar) switches:

- **Direction:** A · Quarto / B · Meridian / C · Atelier / **Compare** (same state, three directions side by side)
- **Programme world:** Strength / Writing
- **Theme:** Light / Dark · **Text:** 100% / 200% · **Motion:** full / reduced · **Viewport:** 320 / 390 / 430 / 834

The left rail lists all 33 states (plus the executable type specimen). Keyboard: `1/2/3/0` direction, `w` world, `t` theme, `s` text scale, `m` motion, `[` `]` previous/next state. Everything is deep-linkable, e.g.:

```
#/c/writing/long-absence?theme=dark&scale=200
#/compare/strength/today
```

## Evidence commands

```bash
npm install          # dev-only: playwright + axe-core (screenshots/audit, not needed to run the lab)
npm run shots        # regenerates screenshots/** and reports/comparison-index.html
npm run a11y         # axe-core audit of every state × direction → reports/a11y-report.md
```

Screenshots are generated **from the executable prototypes** — never composed by hand. `reports/comparison-index.html` places the same state side by side across all three directions.

## The three directions

| | Governing idea | Twelve is | Recovery is |
|---|---|---|---|
| **A · Quarto** | Twelve weeks are a book being read — one page per day, a bookmark that only moves forward | Chapters I–XII; a table of contents; uncut pages | “The bookmark never moves backwards”; a revised edition when the schedule changes |
| **B · Meridian** | A fine field instrument for a twelve-week undertaking — one glance gives the reading | A graduated rail of twelve detents with a travelling carriage | “Recalibration, not reproach”; the capacity dial |
| **C · Atelier** | Twelve weeks weave a cloth — every day adds a thread and the cloth holds | Twelve woven rows of seven picks; the finished band is the artefact | “Visible mending”; what you wove is woven |

Full rationale: `docs/04-brand/experience-direction-{a,b,c}.md` and `experience-direction-comparison.md`.

## Structure

```
design-lab/
  app/            lab shell (index.html, lab.js, lab.css, fonts.css, fonts/)
  shared/         states registry, content fixtures (both worlds), dom helpers
  directions/     a/ (Quarto)  b/ (Meridian)  c/ (Atelier) — one JS + one CSS each
  fixtures/       (reserved; content currently lives in shared/fixtures.js)
  tools/          serve.mjs, screenshot.mjs, a11y.mjs — zero-config
  screenshots/    generated evidence, organised per direction
  reports/        comparison-index.html, a11y-report.md
```

Technology: hand-written HTML/CSS/ES-modules. Chosen because it is the lowest-risk executable medium: no build step, no framework lock-in signal, trivially deletable, fully inspectable, and fast enough to iterate typography and motion honestly. Playwright and axe-core are dev-only tools for evidence generation. **Local fixtures only — no backend, no accounts, no analytics, no network calls, no secrets.**

Fonts are bundled OFL variable fonts (Fraunces, Archivo, IBM Plex Mono, Bricolage Grotesque, Faustina), latin subsets, ~470KB total across all three directions. A production app would ship one direction’s pair.

## Known limitations

- The lab emulates 200% text with a scale factor and reduced motion with a class + media query; production must use real Dynamic Type / Android non-linear font scaling and OS APIs.
- Timers run in page JS; backgrounding/resume semantics are a production concern, documented but not simulated.
- Haptics are documented intent (`docs/04-brand/motion-and-haptics-exploration.md`), not implemented.
- The compare mode renders three iframes; motion timing across them is not synchronised.
- Synthetic critique ≠ user research — especially for 60–75 comprehension, which needs real sessions.
- Writing-world screenshots cover a focused subset of states (the full 33-state matrix is captured in the strength world; every state remains executable in both).

See `COMPARISON.md` for how to review, and `DECISIONS-NOT-MADE.md` for everything this sprint deliberately did not decide.
