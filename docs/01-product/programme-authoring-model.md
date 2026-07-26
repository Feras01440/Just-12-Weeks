# Programme Authoring Model

**Status:** Draft for Gate 2. How programmes get made, by whom, to what standard — the operational counterpart of `06-content/programme-governance.md` (roles/qualifications) and the engine spec (what must be produced). Content authorship economics are ⚠ Q7/Q9 (Founder decision required).

## 1. Roles

| Role | Responsibility | Who (MVP reality) |
|------|----------------|-------------------|
| **Author** | Drafts the full programme artefact: structure, guided actions, variants, adaptation parameters, evidence menu, copy | Founder-led or commissioned specialist (⚠ Q7) |
| **Expert reviewer** | Named, credentialed; verifies safety, claims, pedagogy/programming; signs the review record | Contracted per programme (e.g. accredited S&C coach for a physical programme; experienced educator for a skill programme) — **required** for physical/wellbeing, required-or-justified for others |
| **Evidence editor** | Builds the citation pack; checks every claim against research-standards.md | Can be the author with the checklist; separate eyes preferred |
| **Copy editor** | Voice, plain language (reading age 9–11), blame-lexicon sweep, age-inclusive language | Required pass before review |
| **Platform owner** | Runs the governance checklist, publishes, schedules review dates | Founder |

One person may hold multiple roles **except**: author and expert reviewer must be different people for any programme with physical-safety or health-adjacent content. Non-negotiable (governance).

## 2. The authoring pipeline

`concept brief → skeleton (12-week arc, milestones) → sample week test → full draft → self-review against checklists → copy edit → evidence pack → expert review (iterate) → governance checklist → publish v1.0 → scheduled reviews`

Two structural gates inside the pipeline:

- **Sample-week test (early):** one complete week — all guided actions, variants, demonstrations specced, adaptation hooks — built and walked through in the schema *before* the remaining 11 weeks are drafted. Kills structural mistakes at 1/12th cost. (This is also the Gate-2 archetype paper test vehicle.)
- **Expert review (late, mandatory):** reviewer receives the full artefact + evidence pack; review record captures: scope checked, issues raised, resolutions, residual limitations, sign-off, review date, next-review date. The reviewer's name and credentials ship in-app (FR-80).

## 3. What an author actually produces (deliverable inventory)

Per programme: 12 `ProgrammeWeek` definitions (theme, intent, orientation, review prompts); ~60–72 `GuidedAction`s with: instruction steps, "why it matters", easier/standard/advanced variants (each self-respecting, not a diminished caption), demonstration specs, contextual-question definitions (each with declared purpose), safety notes where relevant, time estimates; milestone + checkpoint definitions with branch content; consolidation units and buffer content (adaptation model §7); re-entry/lighten variants; evidence menu + measurement definitions with `why_it_matters`; suitability screen + advise-against rules; orientation experience; week-12 report template + week-13 handover; adaptation message templates; full citation pack.

**Honest sizing *(Professional recommendation)*:** for a founder-led flagship with contracted review, this is 6–10 full-time-equivalent weeks of authoring plus media production plus review cycles — the number Q9 must budget against. Twelve programmes at launch was never real; this inventory is why.

## 4. Demonstration media strategy

Format chosen per action, cheapest sufficient form first: illustrated steps → audio guidance → short video → interactive widget. Media rules: every video has captions + a text-equivalent path (accessibility req); no media assumes gym-grade bandwidth (offline packaging, NFR-03); production style per art direction (Stage 3) — but **content before polish**: a clear phone-shot demonstration re-shot later beats a beautiful placeholder.

## 5. Authoring tools (Deferred technical decision — ADR-002)

MVP position: programmes authored as structured files (schema-validated) in the content repository, previewed in a development build. A CMS/authoring UI is a post-MVP investment decided when programme #2–3 makes the tooling cost worth it. What is *not* deferred: schema validation, versioning, and the governance checklist gate exist from programme #1.

## 6. Voice and language standards (summary; full: `03-ux/content-strategy.md`)

Knowledgeable, respectful, adult; plain language; no hustle idiom, no baby-talk; instructions in imperative steps; "why" sections cite honestly ("research suggests" only when it does — claims policy); blame lexicon enforced by checklist; every string age-inclusive (D-001) and category-portable where universal (PRQ-01).

## 7. Localisation posture

UK English authored; structure (steps, variants, templates) designed so translation is a content job, not a re-engineering job (strings externalised, no idiom-dependent instruction). Actual localisation post-MVP (non-goal N-26).
