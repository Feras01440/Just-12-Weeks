# Progress & Evidence Model

**Status:** Draft for Gate 2. Implements Confirmed founder decision D-003: progress is programme-specific; the platform assumes nothing. Q12A (which programmes justify visual evidence) is a **Founder decision required** at content design; Q12B (storage model) is a **Deferred technical decision** (ADR-003).

## 1. Principles

1. **Progress is what the programme says it is.** The platform provides an evidence *vocabulary*; each programme composes its own evidence *menu* from it. No universal default.
2. **Evidence must mean something.** Every evidence type in a programme's menu passes the four-job input test (safety / difficulty personalisation / guidance change / meaningful evidence) — collection for engagement's sake is forbidden.
3. **Optional means optional.** Declining any optional evidence never blocks completion, never triggers nagging, and never appears as a gap or greyed-out failure in the journey view.
4. **The app does the noticing.** Wherever progress can be derived from what the user already did (completions, checkpoints, artefacts), it is — manual entry is the last resort, not the first.
5. **Honesty over flattery.** Evidence presentation never inflates (no fake percentages, no "you're 87% more consistent!" numerology). Where evidence is weak, the product says less, not more.

## 2. Evidence vocabulary (platform-level)

| Type | What it is | Entry cost to user | Derived? |
|------|-----------|--------------------|----------|
| `action_completion` | A guided action was done (standard/easier/advanced variant recorded) | 1 tap (the completion itself) | Yes — from the daily loop |
| `capability_checkpoint` | A defined "can now do X" demonstrated via a checkpoint guided action | The activity itself | Yes — pass/retry outcome |
| `milestone` | Week-level named achievement (see engine §2.4) | None extra | Yes |
| `artefact` | A thing produced (file, text, recording, photo-of-work) | Seconds — attach/confirm | Partly |
| `demonstration` | A performed task, possibly recorded (e.g. audio of pronunciation, video of a skill) — programme-defined | The performance | Partly |
| `measurement` | A numeric series defined by the programme (see §4) | Seconds, at defined cadence | Sometimes (device-sourced) |
| `visual_evidence` | Optional photographs of self or work, where justified (see §5) | Seconds; emotionally non-trivial — treated with care | No |
| `weekly_achievement` | The weekly review's structured "what moved this week" | Inside the review | Partly |
| `real_world_outcome` | A completed outside-world event (gave the talk, ran the race, submitted the project) — self-attested | 1 confirmation | No |

## 3. Completion models for guided actions

Each `GuidedAction` declares how done-ness is expressed — the platform renders accordingly:

- `did_it` — single confirmation (default; most days).
- `did_variant` — confirmation + which variant (auto-captured from the variant the user opened; no extra tap).
- `checkpoint_outcome` — passed / partial / retry-later (checkpoint days only; "retry" is a scheduling act, not a failure state).
- `artefact_attach` — confirmation with optional attach (creative/skill days).
- `activity_is_input` — the activity itself produces the record (e.g. an interactive exercise completed in-app).

Nothing in this list is a form. The heaviest standard interaction is one confirmation plus one optional attach.

## 4. Measurements (optional, programme-defined)

- Cadence: weekly by default; **daily measurement requires a governance justification** (physical programmes: trend-based weekly measures explicitly preferred over daily weigh-ins — eating-disorder-aware design, synthesis §5.2).
- Every measurement declares `why_it_matters` in user-facing language and what will change because of it (adaptation input, honest before/after, safety check).
- Device-sourced where possible (⚠ Q1/PSR-04), manual as fallback; units respect locale (NFR-07).
- Skipping a measurement: silently fine, forever. The journey view shows the series that exists, never holes drawn as failure.
- Measurements never appear on the Today screen (D-002: home is guidance, not data).

## 5. Visual evidence (the careful case) — Q12A framework

Per-archetype starting position for the founder decision (**Professional recommendation, not decided**):

| Archetype | Visual evidence default | Rationale |
|-----------|------------------------|-----------|
| Practical/creative | **Natural fit** — photos of the work are the artefact record | Photographing *work* is emotionally neutral and genuinely evidential |
| Physical/wellbeing | **Case-by-case, conservative** — optional private before/after only where the specific programme's reviewer endorses it; never prompted after week 1 mid-programme (body-image care); trend measures usually serve better | Body photography is the highest-sensitivity data in the product; benefit must clearly outweigh it |
| Skill-learning | **Rarely** — artefacts/recordings usually superior (the output *is* the evidence) | A photo adds little over the artefact itself |
| Routine/personal-development | **No** by default | Nothing visual to evidence; pressure risk with no payoff |

Rules wherever visual evidence exists: opt-in with a real explanation of value; private by default (storage per ADR-003 once decided); never required, never re-prompted more than once per programme phase; excluded from analytics (spec §prohibited); app-switcher privacy shield (NFR-04); one-tap deletion; exportable; erased with account.

## 6. How progress is shown back (per archetype emphasis)

- **Journey view (universal):** twelve weeks as chapters; completed guided work accumulating; milestones as landmarks; lapses rendered as terrain crossed ("week 5 — the week you came back"), never as holes.
- Physical/wellbeing: capability arc ("week 1: 8 minutes → week 8: 25 minutes"), measurement trends *if taken*, checkpoint history.
- Skill-learning: syllabus map filling in; artefact shelf; checkpoint demonstrations.
- Practical/creative: the artefact's own evolution (phase outputs side by side) — the most self-evidencing archetype.
- Routine/personal-development: practice pattern (calm density, not chains) + the user's own weekly-review words reflected back at week 12.

## 7. The week-12 report (evidence assembled)

The completion report compiles: the promise as stated at start (user's own goal words); what was completed (guided work, milestones, checkpoints); the evidence trail the user chose to create (artefacts, measurements, visuals — only what exists); the recovery story (weeks navigated, comebacks — presented as strength); and the programme's honest outcome statement (claims-policy compliant: what this evidence does and does not show). Shareable only by explicit act; beautiful enough to want to keep (Stage 3 signature-experience candidate).

## 8. What the platform never does *(enforcement of D-003)*

Never: requires a photo; requires a measurement; shows a daily weigh-in prompt; computes body-composition judgements; scores "consistency" as a percentage on the home screen; compares users to each other; treats declined evidence as missing data in any visible way; uses evidence content for anything but the user's own journey (privacy model).
