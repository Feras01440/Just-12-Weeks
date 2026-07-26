# Atelier Refinement — Executable Prototype

One decisive refinement of **Atelier**, the direction selected from the three-way exploratory laboratory (`design-lab/`, draft PR #4). This is a bounded refinement pass, not a new exploration: one direction, both programme worlds, real navigation, a deliberate enlarged-text hierarchy, a true tablet composition, and full generated evidence.

**Status:** exploratory-refinement. Still not decided: product name, flagship programme, permanent brand identity, production framework, final typography, pricing. See `DECISIONS.md` for what *was* decided in this pass and `KNOWN-RISKS.md` for what could still invalidate it.

## Run it

```bash
cd design-refinement
npm start          # → http://localhost:4174/app/index.html  (no dependencies needed)
```

Top bar: world (strength/writing) · theme (light/dark) · text (100/200%) · motion · viewport (320/390/430/tablet). Hash routing: `#/<world>/<state>?theme=&scale=&vp=&motion=` — e.g. `#/writing/long-absence?scale=200`.

## Evidence

```bash
npm install        # dev-only: playwright + axe-core
npm run shots      # screenshot matrix → screenshots/ + manifest
npm run a11y       # axe-core over every state → reports/a11y-report.md
```

## What changed from exploratory Atelier

- **Selvedge navigation** — three destinations (Today · The Twelve Weeks · Programme & Support), bottom bar, thread current-marker, safe-area aware, hidden during sessions (`docs/03-ux/refined-navigation-model.md`).
- **Enlarged text re-ranks instead of just growing** — Begin inside the first 200% viewport, alternatives immediately visible, why folded to a sentence with an accessible expansion (`docs/03-ux/enlarged-text-information-strategy.md`).
- **Texture density system** — quiet reading surface under all running text; material reserved for progress, transition and completion surfaces; dark mode at half texture.
- **Journey legend** — every cloth state paired with its plain name, plus a plain totals line; readable without colour or textile knowledge.
- **Recovery refined across six situations** — capacity levels restate the action they produce (`docs/03-ux/refined-recovery-experience.md`).
- **First-launch motif** — three candidates rendered side by side (`motif-study` state); one chosen.
- **True tablet composition** — reading column + material rail on five key screens (`docs/03-ux/tablet-composition-study.md`).
- **Meridian borrowings re-expressed** — plain position line, three-level capacity, tabular-numeral timers; no instrument styling, no mono identity.

The exploratory laboratory remains untouched on this branch as comparison evidence.
