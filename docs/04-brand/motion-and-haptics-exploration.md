# Motion and Haptics Exploration

**Status:** exploratory. Motion is implemented and testable in the lab (toggle **Motion / Reduced** in the top bar, or `?motion=reduced`; the lab also honours the OS `prefers-reduced-motion`). Haptics are documented as intent only — no mobile framework is selected in this sprint, so nothing binds to a vibration API.

**Doctrine (from the research brief):** productive motion ≤240ms and nearly invisible for daily actions; expressive motion 400–700ms reserved for *earned* moments (week transition, week 12); entrances decelerate, exits accelerate; no bounce, no parallax, no zoom, no spin — anywhere, not just under reduced motion (vestibular safety with a 60–75 audience). Motion always communicates **state, causality or progress**; anything ornamental was cut.

---

## Motion tokens by direction

### A · Quarto — “the page settles, the ink dries”
| Token | Value | Used for |
|---|---|---|
| `--qa-settle` | 240ms · `cubic-bezier(0.22, 0.08, 0.14, 1)` | every page arrival: rise 8px + fade — paper laid on a desk |
| `--qa-inkin` | 420ms · linear width | the session progress rule “inking in”; rubric underlines drawing |
| stamp-press | 360ms · same ease, scale 1.5→0.94→1 | the day’s mark pressed into the page (completing an action) |
| choice-settle | 160ms | selecting an option before navigation |

Hierarchy: only one element animates per transition (the page itself, or the stamp — never both). Interruption: all animations are CSS, cancel on navigation; nothing blocks input. Reduced motion: page arrival becomes plain appearance; stamp appears pre-pressed; ink rule width updates without transition. Distance cap: 8px.

### B · Meridian — “calibrated sweep and detent”
| Token | Value | Used for |
|---|---|---|
| `--mb-sweep` | 300ms · `cubic-bezier(0.2, 0, 0, 1)` | carriage/pointer sweeps to position; bezel arc advance |
| `--mb-detent` | 40ms settle after sweep | the click-into-place at week boundaries |
| `--mb-press` | 120ms | RECORDED stamp; control arm/disarm |
| face-wake | 240ms fade | instrument face arrival |

Hierarchy: pointer > face > text. The needle never overshoots (an instrument that overshoots is broken — easing has zero bounce by definition). Interruption: sweeps retarget mid-flight (transform transitions), controls never lock. Reduced motion: pointer position updates instantly; RECORDED appears without press; elapsed-time arc renders at final angle each tick.

### C · Atelier — “the thread draws, the row beats up”
| Token | Value | Used for |
|---|---|---|
| `--mc-draw` | 400ms · `cubic-bezier(0.25, 0.1, 0.25, 1)` | a day’s thread drawing in (stroke-dashoffset); session thread growing |
| `--mc-beat` | 300ms · same | week transition: the finished row pressing into the cloth |
| `--mc-rise` | 240ms | screen arrival: 6px rise + fade |
| unroll | 600ms, once | week-12 only: the finished band unrolls — the single “expressive” moment in the whole lab |

Hierarchy: thread > shuttle > text. Interruption: draws are decorative endpoints of real state — interrupting never loses the state. Reduced motion: threads render complete; the unroll is replaced by the finished band with a caption.

---

## The eight required moments, across directions

| Moment | A · Quarto | B · Meridian | C · Atelier |
|---|---|---|---|
| Beginning an action | page settles into session view; rule begins inking | ARM press (120ms) then bezel engages | thread lifts to the shuttle; draw begins |
| Expanding “Show me how” | steps settle in as a page | procedure panel slides 8px from the face | steps rise softly; numerals draw |
| Selecting an alternative | option border inks, 160ms, then page turn | detent click on the selector | the alternative thread is tied on (short draw) |
| Moving between days/weeks | page settle | carriage sweep + detent | shuttle glide along the row |
| Completing an action | day stamp pressed | log line prints + RECORDED press | the day’s pick draws into the cloth |
| Recovery | nothing moves *at* the user; the page is simply calm | capacity dial detents; rail stays still | mend stitch sews in quietly (short draws) |
| Milestone | chapter opener settles, numeral first | detent advance 03→04 with settle | row beat-up into the cloth |
| Week-12 completion | gilt edge draws across; colophon settles | full-rail sweep to 12/12, one longer settle | the band unrolls (600ms, once) |

## Interruption and blocking rules (all directions)

1. No animation ever gates input; primary controls are live from frame one.
2. Anything longer than 240ms must be skippable by acting (tapping proceeds immediately).
3. Timers tick by state, not by animation — a dropped frame never loses a second.
4. Auto-advancing happens only after explicit user action (e.g. stamp → question), never on a timer.

## Reduced-motion contract

Every token has a defined replacement that preserves **meaning**: state changes remain visible as instant or opacity-only changes; nothing is merely deleted. The lab enforces this two ways: a global kill (any `.motion-reduced` stage forces 0.01ms durations) plus per-direction JS checks (`reducedMotion(ctx)`) that skip timing-dependent sequences (stamp-then-navigate becomes navigate). Verified in `screenshots/*/journey--reduced.png` and by the axe pass running under emulated `prefers-reduced-motion`.

## Haptic intent (framework-neutral)

Vocabulary deliberately small; names describe *meaning*, mapped later to whatever engine the production framework provides (Core Haptics / Android VibrationEffect):

| Intent | Character | Where |
|---|---|---|
| `confirm-light` | single soft tap | day complete (A stamp, B RECORDED, C pick drawn) |
| `detent` | crisp tick, very short | B rail steps, C shuttle row ends, A contents scroll-stops on chapters |
| `arm` | firmer single tap | starting a session |
| `arrival` | two gentle taps, rising | week transition |
| `finish` | three-beat pattern, once ever per journey | week-12 completion |
| *(none)* | — | recovery screens are deliberately haptically silent — nothing buzzes at a person who just came back |

Rules: haptics accompany state changes only (never idle attention-seeking); all haptics respect the OS silent/accessibility settings; every haptic has a visible twin.
