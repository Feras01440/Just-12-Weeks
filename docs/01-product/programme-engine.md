# Universal 12-Week Programme Engine

**Status:** Draft specification for Gate 2. This is a *conceptual schema* — field names indicate intent, not final database design (Deferred technical decision). Implements D-002 (guidance-first), D-003 (programme-specific progress), D-004 (archetype-universal). Companions: [authoring model](programme-authoring-model.md), [adaptation model](programme-adaptation-model.md), [evidence model](progress-evidence-model.md), [challenge lifecycle](challenge-lifecycle.md).

## 1. Core concepts and separation

- **Programme** — the authored, versioned, governed artefact: a 12-week guided journey definition. Owned by the platform. Immutable per version.
- **Challenge** — one user's live enactment of a ProgrammeVersion: their dates, their adaptations, their completions, their evidence. Owned by the user.
- The engine is the contract between them: anything a programme can express, the platform can guide, adapt, recover and complete — for any archetype, without special-casing categories in universal code (PRQ-01/02).

## 2. Programme schema (conceptual)

### 2.1 Identity & governance metadata
```
Programme
  id, slug, working_title
  archetype            physical_wellbeing | skill_learning | practical_creative | routine_personal
  category_tags        (content-level only; never leaks into universal UI — PRQ-01)
  promise              outcome_definition (what a completer can honestly expect, claims-policy-compliant)
  audience             intended_audience, prerequisites (plain language)
  suitability          screening_questions[], advise_against_rules[], exclusions[], contraindications[]*
  governance           author{name, credentials}, reviewer{name, credentials}, evidence_pack_ref,
                       last_reviewed, next_review_due, review_status, withdrawal_state
  commitment           weekly_time_estimate {min, typical}, equipment_or_materials[], cost_beyond_app
  versioning           version, changelog[], migration_notes
```
\* Contraindications only where the archetype/governance case requires them (physical programmes); a creative programme's "suitability" may be as light as materials and prior experience.

### 2.2 Structure
```
ProgrammeWeek (×12)
  theme                the week's narrative ("Foundations", "First checkpoint", …)
  intent               what this week builds, in user-facing language
  orientation          optional week-opening guidance piece
  days[]               5–7 ActivityDay slots (rest/integration days are first-class content)
  milestone?           week-level checkpoint definition (see §2.4)
  review_prompts[]     2–3 structured weekly-review prompts specific to this week
  adaptation_hooks     which adaptation rules may fire entering/leaving this week

ActivityDay
  role                 core | consolidation | rest | checkpoint | buffer
  guided_action        GuidedAction (the day's centrepiece; exactly one primary)
  optional_extras[]    strictly optional additions, never required for completion

GuidedAction
  title, purpose       ("why this matters" — always present, one tap away)
  instruction_steps[]  ordered, plain-language steps
  demonstration        media_ref? (video/audio/animation/illustrated steps/interactive)
  support              timer? | audio_cues? | interactive_widget?   (programme-defined)
  variants             easier { … }, standard { … }, advanced { … }  (each a complete, self-respecting version)
  completion_model     how done-ness is expressed (see evidence model §3)
  contextual_question? micro-question {id, purpose ∈ safety|difficulty|guidance|evidence, when}
  safety_notes?        archetype-appropriate cautions, stop-conditions
  est_minutes
```

### 2.3 Starting experience
```
Orientation (pre-week-1, unlocked at challenge start)
  how_this_works       programme-specific expectations, honestly stated
  baseline?            optional programme-defined starting assessment — only where its
                       result changes guidance or later provides honest before/after
                       (never a data-collection ritual; D-003)
  goal_frame           user states their goal in own words (the one free-text field)
  schedule_setup       days-per-week pattern confirmation, reminder time
```

### 2.4 Milestones & measurements
```
Milestone
  week, name           user-meaningful ("First full conversation", "5K continuous", "Chapter one drafted")
  demonstration        what the user does to pass (a checkpoint GuidedAction)
  on_miss              supportive path: retry window | adapted alternative | carry-forward

MeasurementDefinition (optional, per programme — D-003)
  what, unit, cadence  (e.g. weekly, never daily unless governance justifies)
  entry_mode           manual | device-sourced* | derived-from-completion
  why_it_matters       shown to user; purpose from the four-job input test
  optionality          always skippable; skip never blocks progress
```
\* Device integrations (PSR-04) only where the flagship justifies them (⚠ Q1).

### 2.5 Week-12 completion & week-13
```
CompletionDefinition
  completion_rule      what makes the challenge "complete" (see lifecycle §4 — tolerant by design)
  report_template      how this programme's 12 weeks are narrated back (evidence assembled,
                       capability gained, weeks navigated incl. recoveries — honest about adapted paths)
  week13_handover      programme-authored "what now": consolidation guidance + suggested next journeys
                       (engine supports maintenance-mode and next-programme sequencing; emphasis ⚠ Q13)
```

## 3. The four archetypes *(Founder requirement — structural examples only; none is publishable content, and physical examples require qualified review before any real programme ships)*

The engine treats archetypes as **configuration patterns of the same schema**, not different code paths. What differs is which schema features carry the weight.

### 3.1 Physical / wellbeing programme
- **The app guides:** session-by-session physical practice — warm-up, technique steps, demonstration media, pacing/timers, form cautions, rest days as content.
- **Progress means:** capability progression (what the user can now do — duration, continuity, control), adherence pattern, optional measurements.
- **Useful evidence:** completed guided sessions; capability checkpoints (e.g. "20 minutes continuous"); optional weekly measurements; optional private photos *only if the specific programme's governance case justifies them* (Q12A).
- **Adaptation means:** volume/intensity modulation (easier variants, extra consolidation days, deload week after heavy disruption); never "push through" messaging; safety-first stop conditions.
- **Completion means:** the capability the promise named, demonstrated at week-12 checkpoint; honest partial-completion narratives.
- **The user should never need to enter:** exercise names, set/rep bookkeeping (the guided action knows itself), calorie logs, daily weigh-ins, mood surveys.

### 3.2 Skill-learning / educational programme
- **The app guides:** a syllabus in daily practice sessions — concept intro, worked example/demonstration, the day's exercise, deliberate-practice loops, spaced revisits.
- **Progress means:** demonstrated capability at checkpoints (produce/perform/solve without scaffolding), syllabus position, artefact accumulation.
- **Useful evidence:** completed exercises; passed checkpoints; artefacts (a working script, a recorded pronunciation, a solved set); milestone demonstrations.
- **Adaptation means:** pace adjustment (consolidation days repeating weak material), branch difficulty on checkpoint results, "stuck" detection offering re-explanation rather than repetition.
- **Completion means:** the promised capability demonstrated end-to-end (the week-12 project/performance), with the artefact trail as the report.
- **Never needs to enter:** study-time logs, self-rated "understanding" scores as a routine, notes the app should have kept.

### 3.3 Practical / creative project programme
- **The app guides:** a project through phases — brief, skills-on-the-way, staged making, review/refine cycles, finishing craft.
- **Progress means:** phase completion and the artefact's visible evolution.
- **Useful evidence:** phase outputs (draft, prototype, section, piece); optional photos of physical work *as the natural artefact record* (the archetype where images are most legitimately useful — Q12A); the finished piece.
- **Adaptation means:** scope negotiation — trimming ambition honestly when time collapses (a smaller finished thing beats an abandoned grand one), reordering phases, buffer-day deployment.
- **Completion means:** a finished thing that exists and is documented; the report is substantially the artefact story.
- **Never needs to enter:** materials inventories, time tracking, progress percentages (phases carry that).

### 3.4 Routine / personal-development programme
- **The app guides:** daily practice with substance — each day's practice is taught and varied (technique, reflection theme, application), not a bare checkbox; weekly deepenings.
- **Progress means:** practice consistency *pattern* (not unbroken chains), depth progression (the practice getting fuller), self-observed change captured in weekly reviews.
- **Useful evidence:** completed guided practices; weekly achievements; the weekly review narrative itself (this archetype leans most on reflection — kept optional per prompt).
- **Adaptation means:** practice-size modulation (two-minute version on hard days), schedule reshaping, emphasis shifts from review signals.
- **Completion means:** an established, understood practice plus the user's own documented account of change; report emphasises the arc, not statistics.
- **Never needs to enter:** mood scores by default, daily journals (weekly is the cadence; daily reflection only ever optional), streak-keeping of any kind.

**Gate-2 paper test (PRQ-02):** one sample week of each archetype must be expressible in the schema with no distortion and no archetype-specific universal-code assumptions. If any archetype needs a schema exception, the schema is wrong.

## 4. Lifecycles (summary — full state machines in [challenge-lifecycle.md](challenge-lifecycle.md) and `07-architecture/state-machines.md`)

**Programme lifecycle:** `draft → in_review → approved → published → live ⇄ update_in_review → superseded | withdrawn (emergency path from any live state)`. Publishing requires the governance checklist (author, reviewer, evidence pack, claims check, review dates). Withdrawal triggers user-messaging and challenge-migration rules.

**Challenge lifecycle:** `considering → starting (orientation) → active(week w, day d) ⇄ lapsed(1d | 2–6d | 7+d) ⇄ paused → completing (week 12) → completed → transitioned (week-13 choice) | abandoned (explicit or 28-day inactivity) → restartable`. Lapse states are *engine states with designed experiences*, not error conditions (D-002; recovery-experience spec).

## 5. Completion rules *(tolerant by design)*

A challenge completes when the user reaches the end of week 12 having met the programme's `completion_rule` — which must be written tolerantly: adapted paths, restructured weeks, lightened re-entries and legitimate skips **count**. Perfect attendance is never the bar. Programmes define "meaningful completion" honestly (e.g. "reached the week-12 checkpoint" not "did all 84 days"). Partial journeys that end early still generate an honest report of what was built (no all-or-nothing).

## 6. Adaptation rules (summary — full model in [programme-adaptation-model.md](programme-adaptation-model.md))

Rule-based v1, transparent and declinable: inputs are completion pattern, variant selections, contextual-question answers and checkpoint results; outputs are next-week composition changes (consolidation insertion, variant defaults, pace shifts, scope negotiation per archetype). The user sees "here's what I'm adjusting and why" — never silent difficulty manipulation.

## 7. Recovery rules (summary — full spec in `03-ux/recovery-experience.md`)

Engine obligations: lapse detection thresholds (2d conversation, 7d fresh-start re-entry, 28d inactivity-abandon with return path); re-entry composition (lightened day/week generation from the current week's content); schedule arithmetic for pause/shift; preservation guarantee (nothing completed is ever lost or relabelled as failure).

## 8. Versioning rules

- ProgrammeVersions are immutable; active challenges **pin** their version.
- Non-breaking content fixes (typos, clearer step wording, replaced media) may hotfix within a version with changelog entry.
- Breaking changes (structure, safety, difficulty) create a new version; active challenges continue on pinned version unless a **safety-critical** update forces migration — then users get plain-language messaging and a designed transition (never a silent content swap mid-week).
- Withdrawal (governance): programme leaves catalogue immediately; active challenges get honest messaging + supported wind-down or replacement offer per governance workflow.

## 9. Data ownership

The **Programme** (content, structure, media) is platform-owned and licensed to the user. The **Challenge** (goal wording, completions, adaptations, reviews, measurements, evidence, reports) is user-owned: exportable (FR-34), erasable with the account (FR-05), never used for advertising, and never mined for content the analytics spec prohibits. Aggregated, de-identified completion patterns may tune programmes (adaptation-rule improvement) under the privacy model's rules.
