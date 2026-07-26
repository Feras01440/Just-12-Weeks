# Refined Navigation Model — Atelier

**Status:** refinement-phase model, demonstrated in the executable prototype (`design-refinement/`). Production binding happens after on-device testing.

## The model

Three top-level destinations in a persistent bottom bar — the **selvedge bar**:

| Destination | Contains | Why it exists |
|---|---|---|
| **Today** | The day's page: task, why, Begin, Show me how, gentler alternative, position | The product *is* this screen; it is the home and the default |
| **The Twelve Weeks** | The cloth, the legend, plain totals, week themes, the completion artefact after week 12 | Orientation and evidence — where am I, what remains |
| **Programme & Support** | Membership and purchase controls, Change my weekly days, Pause the programme, Restore purchase, Help, plain-language terms | Everything administrative, in one quiet place, so it never leaks into the daily surface |

That is the whole map. There is deliberately **no Insights destination, no dashboard, no library tab**: the foundation's guidance-first principle means the product's opinion about what matters today *is* the interface, and every additional top-level destination taxes the five-second test.

## Why bottom, why three

- **One-handed reach:** bottom placement puts all navigation in the thumb zone on every phone size tested (320–430pt). Nothing essential lives in top corners.
- **Three is the floor, not a style choice:** Today alone fails (no way to orient or administer without modal detours); four adds a destination with no daily job. Recovery, commerce, questions and transitions are *states reached from* these three, not destinations.
- **Session focus:** during a running timed session the bar yields — the session owns the screen, with Pause and Stop as the only chrome. The bar returns on completion, pause or exit. Guidance-first extends to not offering navigation away from the thing you are doing.

## Atelier expression

A quiet selvedge strip: hairline top rule on the quiet paper surface, three text-first labels with small woven glyphs (aria-hidden). The current destination carries a short **laid thread** in the active world's dye beneath its label — the same mark the cloth uses for a woven day — plus `aria-current="page"`. No pill highlights, no filled tab backgrounds, no badge dots.

## Demonstrated behaviours

- **Current destination:** laid-thread mark + `aria-current="page"`; the label also renders at full ink while others sit at secondary ink (never colour-only — the thread mark is a shape).
- **Screen-reader labels:** the bar is `<nav aria-label="Main">`; items are real links/buttons with text labels; glyphs `aria-hidden`. Position announcements come from screen content, not the bar.
- **Enlarged text:** labels are text and scale with `--ts`; the bar grows in height rather than truncating; at 200% labels may wrap to two lines within a taller bar. No icon-only collapse — icon-only navigation is the first casualty of low digital confidence.
- **Safe areas:** bar padding includes `env(safe-area-inset-bottom)`; hit areas remain ≥56px above the home indicator.
- **Small screens (320px):** three text labels fit without truncation at standard size; at 200% + 320px the bar allows two-line labels and keeps ≥44px targets.
- **One-handed reach:** primary screen actions sit directly above the bar in the natural thumb arc; the bar itself is the most reachable element on screen.

## What was rejected

- **Hamburger / overflow menu** — hides the administrative surface exactly from the users least likely to find it.
- **Five-tab convention** (Home/Progress/Library/Insights/Profile) — the generic habit-app scaffold this product must never resemble; three of those five tabs would be empty of daily purpose here.
- **Top tab bar** — fails one-handed reach and collides with the running-head identity inherited from the exploration.
- **Floating action button** — a second, competing primary; Begin already owns the screen.
