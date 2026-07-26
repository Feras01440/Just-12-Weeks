# Enlarged-Text Information Strategy — Atelier

**The problem, stated honestly.** The exploratory lab scaled every token proportionally at 200%. That is the letter of WCAG 1.4.4 — and it produced a Today screen where Begin sat a full viewport below the fold and the gentler alternative was undiscoverable without scrolling. For the users who most need enlarged text, proportional scaling quietly demoted the two most important affordances. A screenshot that merely *reflows* is not an information strategy.

## The strategy: re-rank, never remove

At 200% the Today screen keeps **identical DOM and identical screen-reader order** and re-composes visually:

| Rank | Standard size | 200% |
|---|---|---|
| 1 | Kicker · woven band · title · full why paragraph · Begin | Compact position line ("Week 3 · Day 2 — 15 days kept") + thin band strip |
| 2 | Show me how · gentler · why-this-matters rows | Day title |
| 3 | Position footline | **Begin** — inside the first viewport |
| 4 | | "Show me how" + "Something gentler today" as compact rows directly under Begin |
| 5 | | Why, as its first sentence + an accessible expansion |

Mechanics:

- **The why paragraph folds; it is never deleted.** A real button ("Why this matters — more") with `aria-expanded` controls the remainder. At standard size the paragraph renders fully expanded; the control exists at all sizes, so behaviour is consistent and testable. Nothing essential is hidden to make a screenshot fit — the fold is an interaction, present in the accessibility tree, opening in place.
- **The band compresses to a strip** beside the position line. Progress stays visible as material *and* as plain text; the plain text carries the meaning at every size.
- **Alternatives rise above the fold** because on a hard day at 200%, "Something gentler today" is not a secondary courtesy — it is the difference between a kept day and a lost one.
- **DOM order never changes.** The visual re-ranking is CSS composition (`.scale-200` on the stage). A screen-reader user gets the same document at every size; a sighted-zoom user gets a deliberate hierarchy. No `order` tricks that divorce focus order from visual order on interactive elements.

## Trade-offs, documented

1. **The folded why costs one tap** for enlarged-text users who want the full rationale. We judged reachable-Begin worth more than always-visible prose; the first sentence is written to carry the day's meaning alone.
2. **Two compositions to maintain.** Every Today change must be verified at both ranks; the screenshot matrix enforces this (`today--scale200` is a permanent capture).
3. **The strip band is less evocative than the full band.** Material presence is reduced at exactly the size where decoration crowds fastest; the journey destination keeps the full cloth one tap away.
4. **This strategy is Today-specific.** Instruction pages (Show me how) scale proportionally — they are linear reading, where proportional scaling is correct. Journey keeps its full legend at 200% and grows tall; that is acceptable for an orientation surface.
5. **Keyboard focus order at 200% differs from visual order in one place.** The why-disclosure sits before Begin in the DOM (where it reads correctly at standard size) but is composed after the alternative rows at 200%, so a keyboard user tabbing at 200% reaches the why controls before Begin even though Begin sits visually higher. We accept this deliberately: the alternative — reordering the DOM — would put the day's rationale after the action for *every* screen-reader user at *every* size, which is the worse trade. Revisit if switch-access or keyboard testing shows real cost.
6. **Prototype scaling is emulated** (a font-size multiplier). Production must bind to platform Dynamic Type / non-linear font scaling, where intermediate steps (135%, 160%) need the re-rank threshold chosen deliberately — recorded as an open production task in `design-refinement/KNOWN-RISKS.md`.
