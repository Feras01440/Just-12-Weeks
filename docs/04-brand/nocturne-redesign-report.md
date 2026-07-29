# Nocturne Redesign Report

**What happened:** the founder walkthrough rejected the Atelier visual system and supplied a binding modern design specification. Nocturne executes that specification — and keeps every product behaviour that survived the earlier critique rounds. Built in `design-nocturne/` (React 18 + Vite + Tailwind CSS v4 + lucide-react, Geist + Geist Mono shipped from npm), dark OLED as the designed default. Atelier remains archived, untouched, on its own branches and PRs as the record of the exploration.

## What shipped

Twenty states in both programme worlds: first-launch, today, show-me-how, gentler alternatives, active session, paused, day-complete, check-in question, acknowledgement, journey, missed-one, missed-several, long-absence, week transition, week-12 completion, settings, subscription, expired, restore, programme-pause. Bottom tab bar with glow indicator and `aria-current` on phones (hidden while a session runs); collapsible sidebar with a visible ⌘K quick-actions affordance from 1024px; a working command palette.

**The founder's system, applied as meaning:** `#09090B` background, `#121215` panels with 1px white/10 top highlights, `#1C1C21` hover, hairline `white/[0.08]` borders, rounded-2xl/3xl, deep shadows, strict 8px grid; 24px bold −0.02em titles, 14px sections/body, 12px mono meta; **every numeral in the interface is mono**. Accents carry semantics: emerald = the strength world's light, electric indigo = the writing world's, amber = made-up days and care moments. Glow is spent only on earned things: kept and current lights, the primary action, the active tab.

**The Lightline (the journey, rebuilt):** a glowing vertical axis lit exactly to the current week; a header with large mono `DAY 16 / 84`, an 84-tick overall bar (the mend renders as one amber tick), and stat chips — kept · mended · remaining; twelve week panels each with seven shape-distinct day cells (filled kept · amber-ring mended · halo today · dashed-dot open · faint hollow future · dash rest), a micro progress bar and a plain status line ("Kept in full", "Kept — one day made up", "Underway — day 2 of 7", "Opens when week 3 closes", "Not open yet"); a worded legend titled "How to read the light" ending with the covenant: *missed days stay open, never lost — a day made up later counts in full.* Week 12 assembles all 84 cells into the constellation above the record and the exportable, never-paywalled Record of Capability.

**Motion:** orchestrated page-load stagger, Lightline draw-in, completion kindle ripple, amber mend ignition, week-transition glow handoff, week-12 assembly; hover lift, pressed scale; all interruptible; reduced motion renders completed states instantly (probe-verified).

**What was deliberately kept from the product's proven core:** one unmistakable primary action per screen; literal controls; the recovery voice ("Nothing is reset; nothing needs explaining") with three capacity cards each stating the exact action it produces; minutes wording outside live timers; wall-clock-anchored timers; the ethical commerce pattern including cancellation-beside-price and the expiry state that keeps the record readable and exportable.

## Evidence

- **72-screenshot matrix** (`screenshots/` + manifest + `reports/index.html` contact sheet): every state at 390; today/journey/week-12/long-absence/active at 320/834/1280 in both worlds; 200% spot-checks; reduced-motion variants.
- **Accessibility: 36 axe-core state-audits, 0 violations** (`reports/a11y-report.md`); all cell states carry screen-reader word equivalents; contrast-driven adaptations below.
- **15/15 interaction probes:** ⌘K open/filter/navigate, tab-bar and sidebar `aria-current`, session tab-hiding, wall-clock timer, reduced-motion completeness.

## Specification adaptations (all contrast- or honesty-driven)

1. `#52525B` is used for non-text ornament only — it fails AA as text on `#09090B`; secondary text uses `#A1A1AA`.
2. Text set *in* an accent colour uses brightened variants (`#34D399`/`#A5B4FC`); raw accents remain for fills and glows. The writing world's CTA surface is `#818CF8` with a deep-indigo label because `#6366F1` cannot carry any AA-passing label.
3. Drag handles were omitted: nothing in this product reorders, and a dead affordance is dashboard theatre.
4. The tab bar hides on `paused` as well as `active` — paused is still the session.

## What to validate next

The same three gates as before, now applied to Nocturne: first-sight journey comprehension with real users including 60–75-year-olds (the cell/legend system is designed to pass where the cloth failed — verify it); continuous text-scaling behaviour on real devices; and battery/OLED behaviour of glow effects plus a light-theme decision for daylight use, which this pass deliberately did not make.
