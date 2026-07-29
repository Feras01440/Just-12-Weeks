# Atelier Refinement Report

**Phase:** one bounded refinement pass of Direction C — Atelier — selected from the three-direction exploratory laboratory (draft PR #4). Executable result in `design-refinement/`; binding decisions in `atelier-refinement-brief.md`; reversibility and risks in `design-refinement/DECISIONS.md` and `KNOWN-RISKS.md`. Still open: product name, flagship programme, permanent brand identity, production framework, final typography lock, pricing.

## Exact changes from exploratory Atelier

1. **Navigation exists now.** The exploration had states without a top-level map; the refinement adds the three-destination selvedge bar (Today · The Twelve Weeks · Programme & Support) with a laid-thread current marker, `aria-current`, safe-area padding, wrap-not-truncate labels, and session focus (the bar yields during a running session). A new Programme & Support hub gathers membership, schedule change, pause, restore, help and plain terms — administrative life leaves the daily surface.
2. **200% is a designed hierarchy, not a scale factor.** Identical DOM, re-composed at scale: position line + thin band → title → Begin (inside the first viewport: 470px/611px of 780 across worlds) → both alternatives → why folded to its first sentence behind a real `aria-expanded` disclosure, expanded by default at standard size.
3. **Texture became a budget.** The everywhere graph-paper is gone. Four surfaces (quiet / progress / transition / completion); flat linen under all running text; dark mode at half texture alpha.
4. **The journey explains itself.** Permanent legend pairing all six marks with plain names, a totals sentence ("15 of 84 days kept · 1 mended"), shape-distinct open slots (missed ≠ not-open-yet by shape, not colour), per-week plain captions ("Complete · one day made up later", "This week — day 2 of 7", "Opens next").
5. **Recovery options operate.** Every capacity level restates the action it produces ("Begin — 10 minutes" / "Begin — week 3, day 1" / "Begin — 14 minutes, today in full"); pause is a designed state ("Pausing is a decision, not a lapse."); schedule change is a literal control with its weave phrasing demoted to an aside.
6. **First launch communicates without copy.** Three motif candidates built and judged with captions covered (see below).
7. **Tablet is composed.** Reading column (≤46ch) + one material rail with one caption, one dominant action, on Today, Show me how, journey, long absence, week 12.
8. **Meridian's useful principles arrived in Atelier's clothes.** Plain position lines ("Day 16 of 84 · Week 3 of 12"), three-level capacity selection, tabular-lining Bricolage timer numerals, minutes wording outside live timers. No instrument styling, no mono, no second progress representation.
9. **Commerce hierarchy tightened.** Price + term as one block with the cancellation path stated beside the price; restore visible from every commerce state; expiry keeps reading and export at equal weight.

## First-launch motif — selected: M1, "First thread ready"

Three refinements of the single opening motif were built same-size in the `motif-study` state and judged with captions covered against the four criteria (twelve bounded stages · something being made · progress that remains · calm forward movement). **M1 — twelve numbered row-frames, row one's warp brightened, the first weft visibly entering — is the only candidate that communicates *twelve bounded stages* with no explanatory copy at all: the numerals carry it.** M2 (ghost band with row one solid) is the most beautiful and best expresses "the ending shown at once", but its twelve-ness is invisible without the caption — the exact flaw this study existed to remove. M3 sat between. M1 ships as the default; M2 and M3 remain rendered in the study state as the record, and M2 is noted as the stronger *week-12-adjacent* image (the finished band already serves that role).

## Live-motion findings

Seven moments run and inspected in the live prototype: begin (bar-to-session focus shift), instruction expansion (`aria-expanded` fold), alternative selection (thread-stroke thickens, navigates), day completion (pick laid, then beat), mend (gold stitches draw over the open slot), week transition (row completes on the transition surface), week-12 unroll (600ms clip-path reveal, once). All are interruptible (registered timeouts cancel on unmount — probe-verified), none block input, and reduced motion preserves every completed state (`week-12--reduced` renders the finished band byte-identical to the animated end state). Timers are wall-clock anchored (+2s probe under tick suppression). No confetti, bounce, parallax or cinematic delay anywhere.

## Typography findings

Bricolage Grotesque + Faustina retained. This pass: body settled at 1.0625rem/1.62 for instruction reading; 12px floor enforced as CSS `max()` on every label token (extended to diagram numerals after critique); tabular numerals on timers and counts; dark mode gets slight weight compensation; sustained italic remains banned (single-line asides only). Recorded caveats: Faustina at small sizes on low-resolution Android is untested on device (fallback candidate documented: Literata); families are **not** locked until on-device testing (D-R9).

## Internal critique pass (one, as scoped)

Quality-gate review against all twelve gate items: **eleven PASS on first inspection, one FAIL.**

| Severity | Finding | Outcome |
|---|---|---|
| Major | MM:SS leaked back outside a live timer — completion lede rendered "04:37 of honest work" | **Fixed** — minutes wording ("5 honest minutes of work, ready to join the record"); re-captured |
| Minor (elevated) | First-launch motif numerals at 8px broke the pass's own binding 12px floor (R8) | **Fixed** — brief compliance, one-line change; re-captured |
| Minor | 200% keyboard focus order reaches the why-disclosure before Begin though Begin sits visually higher | **Accepted and recorded** in `enlarged-text-information-strategy.md` — the DOM alternative would demote the rationale for every screen-reader user at every size |
| Nit | Dead `[aria-pressed]` selector on options; "The longer story" + "Show less" stacked at standard size; selvedge labels wrap to three lines at 200%; denominator framing shifts ("day 2 of 7" vs "2 of 5 programme days") | **Deferred** — logged here per the fix-only-blockers-and-majors rule |

Post-fix evidence: **screenshot matrix 106 captures** (both worlds; light/dark; 100/200%; 320/390/tablet; reduced motion; manifest + `reports/refined-index.html`), **51 axe-core audits — 0 violations**, **21/21 interaction probes passing** (aria-current, session nav-hiding, 200% Begin-in-first-viewport both worlds, DOM-order identity across scales, disclosure toggling, reduced-motion completion states, wall-clock timer, no 320px overflow, all three motifs render).

## Strength/writing comparison

Structure is world-agnostic throughout — same states, same hierarchy, same controls. The worlds differ exactly where they should: dye (madder/indigo), duration ("14 minutes"/"25 minutes"), task language, and completion voice ("Twelve weeks. Kept." over the band / "THE END. You wrote that." over the same band in indigo). The writing world's recovery reads as true to drafting ("the draft waited — that's what drafts do"), the strength world's to the body ("strength fades far slower than schedules do"). Neither world required a structural exception — the category-agnostic bet holds.

## Remaining risks

The full register is `design-refinement/KNOWN-RISKS.md`; the three that matter most: (1) first-sight cloth comprehension is still unproven with real 60–75-year-old users — the one risk that could overturn the direction choice; (2) the 200% re-rank threshold is binary in the prototype and needs a continuous-scaling design for Dynamic Type; (3) cross-screen thread continuity remains unvalidated in a re-rendering prototype and needs a shared-element spike in the production framework.

## Readiness recommendation

**Atelier is ready to become the production design foundation, conditionally.** The refinement closed the exploration's four structural gaps (navigation, enlarged text, tablet, texture discipline), survived its own quality gate with one copy-level failure, and holds both programme worlds without exceptions. The conditions are the three risks above: run real-user comprehension sessions (including older adults) before committing engineering to the cloth as the primary progress metaphor; design the continuous-scaling behaviour; and spike shared-element transitions in whichever production framework is chosen. None of these blocks starting production design system work now — they block *declaring it finished*.
