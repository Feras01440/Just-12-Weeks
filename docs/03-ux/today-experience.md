# The Today Experience

**Status:** Draft for Gate 4. The home screen's full specification — the product's centre of gravity and the place D-002 lives or dies. Companion: experience-principles §9 (what home must accomplish and must never become).

## 1. What Today is

A **guide's daily brief**, not a dashboard: today's guided action, held in enough context to feel the journey, with the escape hatch for hard days built in. One primary act. Everything else subordinate.

## 2. Anatomy (in priority order, top to bottom)

1. **Day context line.** "Week 3, Day 2 · Building consistency" — orientation in six words. The *only* always-on journey telemetry on the screen. Tapping it peeks the week (lightweight sheet), not a chart.
2. **The Guided Action card.** The screen's single hero: action title, what-it-is in one sentence, honest time estimate, variant hint if relevant ("gentler version available"). One tap opens the player (F07). This card is where the signature visual system earns its keep (Stage 3) — the object that visibly carries twelve weeks of accumulation.
3. **Begin affordance.** The one primary button.
4. **Quiet second line (contextual, max one):** review-day invitation ("Sunday — your week 3 review is ready") *or* milestone note *or* nothing. Never stacks.
5. **Nothing else.** No stats row. No charts. No streak counter. No photo prompt. No feed. No promo card. (Non-goals N-01/N-28; anti-scope tripwires.)

### After completion (the second face of Today)
Calm completion state: acknowledgement proportional to the day; the week filling shown in words ("three of five days this week"); tomorrow's preview in one line ("Tomorrow: intervals — 20 minutes"); a closing note in the programme's voice. The screen *ends the transaction* — it does not fish for more engagement (respect as retention strategy).

### State faces (same skeleton, different heart)
- **Pre-start (`starting`):** orientation card in the hero slot.
- **Rest day:** the rest-day content *as the guided action* (authored, first-class — why rest works, what to notice). Never an empty screen.
- **Lapse (2–6d / 7+d):** the recovery conversation *replaces* the hero (F12/F13) — recovery is not a banner atop business-as-usual; it *is* today's business.
- **Paused:** the pause face: held place, return affordance, nothing nagging.
- **Review day:** action card + the single review line (order per programme's day design).
- **Week 12, final day:** the finishing face — the last action framed as what it is.
- **Entitlement expired:** honest re-lock face (F18) — history reachable, guidance locked, no theatrics.

## 3. Behavioural rules

1. **G1:** do/how/why reachable without any data entry — always.
2. **G2:** open → begin ≤1 tap; open → completed ≤3 taps median.
3. **Opens where life is** (IA §3.6): notification deep-links land inside the action, not on a lobby.
4. **No time-based shame:** opening at 11pm shows the same respectful surface as 7am ("still time for the short version" where the programme defines one — never "you're late").
5. **The card never lies:** if today is genuinely heavy (45 minutes), the card says so; trust is built at the moment of honest cost disclosure.
6. **One-handed:** hero card and begin button in thumb reach on reference devices (G7); context line may sit high (read-only).
7. **Performance:** interactive <1s warm (NFR-02); the guided action card renders from local state — network never gates the day.

## 4. What Today never shows *(enforcement list for reviews)*

Charts/graphs of any kind · numeric streaks · percentage "consistency" scores · body metrics or any measurement values · photo prompts · social/comparison content · upsells while entitled · more than one contextual line · badges/confetti on ordinary days · any red/alarm treatment for missed days.

## 5. Acceptance tests (Stage 5 + every release)

- Stage-5 cohort (10–12 participants, every age band n≥2), cold open: "what is this screen asking you to do?" — ≥80% correct overall and no age cohort with a failing majority (G6 regime).
- "What is this app?" asked post-task: zero "a tracker/dashboard" answers (research-plan bar).
- 200% text: full anatomy usable, nothing truncated into ambiguity (G7).
- Reduced motion: hero card's signature behaviour has a considered still form, not an absence.
- Screen-reader walk: context → action → begin → secondary line, in that order, nothing focusable that isn't real.
