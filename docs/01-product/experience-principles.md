# Experience Principles

**Status:** Active reference — implements Confirmed founder decisions D-001, D-002, D-003 (see [decision log](../00-foundation/decision-log.md)). Every UX, content, engineering and analytics decision is testable against this document. Where another document conflicts with this one, this one wins until the decision log says otherwise.

## The governing principle *(Founder requirement)*

> **Tell, show, guide and adapt before asking the user to record anything.**

The product is a guide, not a ledger. The user experience it must create:

> "The app understands my goal, tells me what to do, shows me how to do it, supports me while I do it and helps me adjust when real life interrupts the plan."

## 1. Guidance-first interaction *(Founder requirement)*

Every day of every programme must answer, in this order:

1. **What should I do today?** — one clear primary action, visible within one screen of opening the app.
2. **How do I do it correctly?** — step-by-step instruction; demonstration (text, illustration, audio, video, timer or interactive walkthrough) where useful.
3. **Why does it matter?** — a short, cited explanation connecting today to the 12-week outcome.
4. **What if the standard version doesn't fit today?** — an easier alternative and (where safe) a more advanced one, offered without judgement.
5. **What happens next?** — a sense of tomorrow and of the current week's arc.

Interaction priorities, in order: clear action for today → step-by-step guidance → why it matters → demonstrations → in-activity support (timers, audio, video, interactive instruction) → alternatives at three levels → contextual help at the moment of need → recovery after missed days → weekly adaptation → preparation for the next stage → meaningful encouragement → a strong week-12 completion.

**Acceptance test G1:** a new user, on any programme day, can state what to do, how, and why, without entering any data first.

## 2. Minimal purposeful input *(Founder requirement)*

User input exists to do exactly one of four jobs: **improve safety · personalise difficulty · change the guidance · provide meaningful evidence.** Input that does none of these is removed.

- Routine daily completion requires **no more than one or two lightweight interactions** (e.g., "Done" plus at most one contextual tap), unless the programme activity itself genuinely requires more (e.g., a coding exercise *is* the input).
- No daily forms. No mandatory journals. No manual statistics entry. No required photo uploads, ever (D-003).
- Every input field in the product carries a documented purpose from the four-job list above; the PRD's requirement register enforces this.

**Acceptance test G2:** median taps from app-open to daily completion ≤ 3 on a standard day. **G3:** zero required free-text fields in the core daily loop.

## 3. Progressive personalisation *(Founder requirement)*

No large onboarding questionnaire. The app asks a question **at the moment its answer becomes useful**, explains why it's asking, and shows the effect of the answer immediately (guidance visibly adapts).

- First launch collects the minimum to start safely: chosen programme, programme-specific suitability screen (only what that programme's governance requires), and 18+ confirmation (D-005).
- Later questions arrive contextually: difficulty check-ins after early sessions, schedule preferences when reminders become relevant, equipment/constraint questions when a week first needs them.
- Every contextual question is skippable unless safety-critical, and skipping never blocks guidance — it defaults conservatively.

**Acceptance test G4:** first-launch question count ≤ 5 before the user sees their first real guided action (excluding legally required screens).

## 4. Programme-specific evidence *(Founder requirement — D-003)*

Progress is defined by each programme, from this menu: completing guided actions; improving a practical capability; producing a project or artefact; completing a demonstration; reaching a milestone; passing a practical checkpoint; optional measurements; optional photographs; weekly achievements; completing a real-world outcome.

- The universal platform never assumes measurements or photographs.
- Photographs: optional, never required for completion, never prompted with pressure, only present where the programme's governance case establishes genuine usefulness (Q12A — Founder decision required).
- The completion of week 12 is *never* gated on evidence the user declined to provide.

## 5. Missed-day recovery *(Founder requirement)*

Falling behind is the expected case, designed for as carefully as the happy path.

- Missing one day: tomorrow acknowledges it in one calm sentence and simply continues. No red. No broken-chain imagery. No guilt copy. (Evidence: a single missed repetition does not derail habit formation — Lally et al. 2010; how a lapse is framed decides whether it becomes collapse — see [Annex D §7](../02-research/annex-d-behavioural-evidence.md).)
- Missing several days: a **recovery conversation**, not a penalty screen — "life happened; here's the shortest honest way back", offering: resume where you left off / a lightened re-entry week / restructure the remaining weeks / pause properly.
- Long absence: a genuine fresh-start re-entry (temporal-landmark framing) that treats the return as a strength, preserves what was completed, and never displays a failure ledger.
- The word "streak" does not appear in the product. Continuity is shown as accumulated progress (what you've built), never as a fragile chain (what you might break).

**Acceptance test G5:** every lapse state (1 day, 2–6 days, 7+ days, mid-week pause) has a designed, tested flow whose copy contains no blame language (verified against the content-strategy blame-lexicon).

## 6. Age-inclusive usability *(Founder requirement — D-001)*

For adults 18 to 80+, across levels of digital confidence:

- Strong legibility: minimum body sizes, generous line-height, no thin weights for body text.
- Full Dynamic Type / Android font-scale support to the platform maximums, with layouts designed for 200% text.
- Contrast meeting WCAG 2.2 AA minimum, AAA where feasible for core reading.
- Plain language throughout (reading age ≈ 9–11 for instructions); no unexplained jargon, no fitness-bro or hustle idiom.
- Clear, shallow navigation; no hidden-gesture-only actions; every gesture has a visible alternative.
- Low cognitive burden: one primary action per screen; no timed decisions; forgiving error recovery.
- Touch targets ≥ 44pt/48dp; one-handed reach for daily-loop actions.
- Reduced-motion honoured everywhere, including the signature visual system.
- First-run help assumes no prior app conventions ("tap the tick" not "swipe to complete").

## 7. Calm and supportive behaviour *(Founder requirement)*

- Tone: a knowledgeable, respectful coach speaking to an adult equal — warm, specific, never saccharine, never drill-sergeant.
- Notifications: few, purposeful, schedulable, and written so that reading one costs nothing emotionally. No guilt hooks ("we miss you 😢"), no fake urgency, no re-engagement pressure loops (D-002; Q5 register).
- Celebration is proportional and meaningful: milestones and completion earn real acknowledgement; day 4 does not get fireworks.
- The app never shames, punishes, compares the user unfavourably, or manufactures anxiety to drive opens.

## 8. Guidance vs passive tracking — the line *(Founder requirement)*

| The product is | The product is not |
|----------------|--------------------|
| A guide that tells, shows and adapts | A ledger the user maintains |
| Opinionated daily direction | A blank slate of habits to configure |
| Explanation and demonstration | A checklist with notifications |
| Purposeful questions at the moment of need | An onboarding interrogation |
| Evidence where it means something | Data collection as engagement |
| Recovery design | Streak preservation |

A tracker asks the user to do the work of noticing progress. This product does the noticing and shows the user what it means.

## 9. What the home screen must accomplish *(Founder requirement)*

The home ("Today") screen, in priority order: (1) today's action, immediately actionable; (2) where I am in the 12 weeks, in one calm glance; (3) entry to guidance/demonstration; (4) the alternative path if today is hard; (5) nothing else competing. It is explicitly **not**: a dashboard, a chart wall, a statistics grid, a form, a journal prompt, a photo prompt, or a feed. Detailed specification: [`03-ux/today-experience.md`](../03-ux/today-experience.md).

## 10. What the product must never become *(Founder requirement)*

- A form-filling, logging, journaling or passive tracking application.
- A dashboard-first product.
- A streak-anxiety machine or guilt-notification engine.
- A photo-pressure product, or one where declining evidence blocks progress.
- A fitness-only product in language, structure or brand (D-004).
- A product only a 28-year-old finds usable.
- A paywall wearing an app (value must precede payment — Q5/Q6 register).

## 11. Measurable UX acceptance criteria

| # | Criterion | Target | Measured in |
|---|-----------|--------|-------------|
| G1 | Do/how/why visible without data entry | 100% of programme days | Design review + usability test |
| G2 | Taps from open → daily completion (standard day) | median ≤ 3 | Analytics (`action_completed` path) |
| G3 | Required free-text fields in core daily loop | 0 | Design review |
| G4 | First-launch questions before first guided action | ≤ 5 | Design review + analytics |
| G5 | Lapse states with designed, blame-free flows | 4/4 | Design review + copy audit |
| G6 | Users (incl. 65+ cohort) correctly state today's task in testing | ≥ 4/5 per cohort | Stage 5 usability tests, all four age bands |
| G7 | Daily completion possible one-handed, reduced-motion, 200% text | 100% of daily-loop screens | Accessibility test plan |
| G8 | Notification opt-out reachable | ≤ 2 taps from Today | Design review |
| G9 | Paywall comprehension (price, period, renewal, cancel) | 5/5 in testing | Stage 5 test |
| G10 | Blame-lexicon violations in shipped copy | 0 | Content audit per release |

Failures against these criteria are release blockers, not polish items (see `09-quality/release-checklist.md`).
