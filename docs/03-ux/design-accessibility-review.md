# Design Accessibility Review

**Status:** exploratory-sprint evidence, not a production conformance claim. Target bar: WCAG 2.2 AA behaviour demonstrated in the executable lab, with the older-adult research findings (research brief §6) treated as stricter working requirements than the standard itself.

## How evidence was produced (demonstrated, not claimed)

- **Automated audit:** `npm run a11y` runs axe-core (WCAG 2.x A/AA rule tags) against the live prototypes — every one of the 33 states + specimen in all three directions in light mode, dark-mode spot-checks (today, journey, active, subscription, long-absence, week-12), and 200%-text spot-checks (today, journey, how, long-absence). Output: `design-lab/reports/a11y-report.md`.
- **Screenshot evidence:** `npm run shots` captures each direction on a standard phone (390×780), small phone (320×640), large stage (430), tablet (834×900), at 200% text, in light and dark, and in reduced-motion mode — 183 images, generated from the running prototypes only. Index: `design-lab/reports/comparison-index.html`.
- **Manual keyboard pass:** the lab shell and all prototype flows operate by keyboard (real buttons everywhere; the scrollable prototype screen is focusable; `[`/`]` state stepping; visible focus rings styled per direction).

## Audit results and fixes

First full pass: **135 state-audits, 9 serious violations, 0 critical** — all nine diagnosed and fixed the same day:

| Finding | Root cause | Fix |
|---|---|---|
| A · catalogue “in preparation” text below 4.5:1 | muting via `opacity: 0.62` | AA-passing secondary-ink colour, no opacity |
| B · six sealed/future/ghost text elements below AA (explore, complete, journey ×2 themes, week-transition, loading, empty) | tick colours used as text; card-level opacity | secondary-ink overrides; opacity removed; ghost “breathe” floor raised 0.55→0.72 |
| A/B/C · unchecked toggles rendered `aria-pressed=""` | template literal drops `false` | explicit `String(...)` serialisation |
| all · scrollable prototype region not keyboard reachable | scroll container without tabindex | `tabindex="0"` + accessible name on the screen region |

Re-audit after fixes: **0 violations** (per-direction re-runs; final full-matrix run recorded in `design-lab/reports/a11y-report.md`). Automated checking is necessary but not sufficient — the manual review below covers what axe cannot see.

## The thirteen demonstrations required by the sprint

1. **200% text scaling** — every type token is `calc(var(--ts) × rem)`; screenshots `*--scale200.png` show single-column reflow with no clipping in all directions; long-absence and specimen (the two densest screens) captured at 200% specifically.
2. **Reduced motion** — lab toggle + real `prefers-reduced-motion` both honoured; global duration kill plus per-direction JS guards (`reducedMotion(ctx)`) so timing-dependent sequences (stamp-then-advance, sweep-then-settle, thread-draw) resolve to their end states. `journey--reduced.png` per direction.
3. **Strong contrast** — palettes authored to AA pairs (tables in `colour-and-material-exploration.md`); verified by axe in both themes; body text targets ≥4.5:1, large display ≥3:1.
4. **Screen-reader reading order** — DOM order = visual order in all directions (single-column composition); headings h1→h2; landmarks per screen; decorative SVGs (`aria-hidden`) always paired with adjacent text equivalents (“Row 3 of 12 · 15 days woven”, “TRAVERSE 16/84”).
5. **Large touch targets** — primary actions 56–58px min-height; option controls ≥56px; list rows ≥50px; the platform 44/48px floor is treated as tertiary-only (per older-adult evidence, research brief §6.2).
6. **Keyboard navigation** — all interactive elements are native buttons/links; focus-visible rings 2.5px in each direction’s action colour at 3px offset; lab shortcuts documented in the README.
7. **No colour-only state** — missed/done/mended/future differ by shape and label in every direction (em-dash/tick/under-mark; hollow/solid/engraving; gap/thread/stitch).
8. **Plain language** — system vocabulary paired with plain words (“Restore purchase — the store remembers”); no jargon in daily flows; defined terms on first use; reviewed again in the older-adult critique pass.
9. **One-handed use** — primary action sits directly under the content column within thumb reach at 390–430 widths; no top-corner-only controls in any daily flow.
10. **Low digital-confidence comprehension** — ≤2 levels from Today to anything daily; one decision per screen in recovery; no gesture-only interactions; critique pass 6 (68-year-old persona) findings and changes recorded in `design-critique-report.md`.
11. **Loading/error announcements** — `role="status"` on loading and restore confirmations, `role="alert"` on errors, polite live region for lab-level announcements; timers announce each minute.
12. **Readable timers** — tabular lining numerals in all three directions at ≥3rem equivalents; state changes announced; time never conveyed by animation alone.
13. **Safe interruption/resumption** — pause states hold elapsed time and say so; navigation away never loses state in-session; nothing auto-advances without user action.

## Viewport evidence

| Evidence | File pattern |
|---|---|
| Standard phone | `*/today--light.png` (390×780) |
| Small phone | `*/today--small.png` (320×640, no horizontal scroll — WCAG 1.4.10 posture) |
| Large phone | lab `vp=large` (430) — reviewable live |
| Tablet | `*/today--tablet.png` (834, constrained measure, no stretched lines) |
| Enlarged text | `*/today--scale200.png`, `*/long-absence--scale200.png`, `*/specimen--scale200.png` |
| Reduced motion | `*/journey--reduced.png` |
| Light/dark | `*--light.png` / `*--dark.png` pairs |

## Honest limitations

- The lab emulates text scaling and reduced motion; production must bind to Dynamic Type / Android non-linear scaling and OS APIs.
- axe-core cannot judge comprehension, memory load, or trust — the older-adult persona critique is synthetic; **real sessions with 60–75-year-old participants are required before any 65+ claim is made** (this sprint deliberately does not make one).
- Screen-reader behaviour was reviewed structurally (roles/order/names), not with live VoiceOver/TalkBack — a production-phase task.
- Timer background/resume semantics and haptic accessibility are documented intent only.
