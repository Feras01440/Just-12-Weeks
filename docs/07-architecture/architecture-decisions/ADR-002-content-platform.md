# ADR-002 — Content Platform (Authoring & Publishing Pipeline)

**Status:** PROPOSED (provisional — **unapproved**; hardens at Stage 6 with ADR-001's stack). Deciders: founder + architect + content lead. Date: 2026-07-26.

## Context

Programmes are governed, versioned, immutable artefacts (engine §8, content-versioning) authored by a tiny team (possibly one person + contracted reviewers) at a cadence of ~1–3 programmes/year initially. The pipeline must make the governance checklist *structural* (publishing refuses incomplete records — governance §7) and compile bundles per the content-delivery architecture. Q4 (custom challenges) is unresolved and could later add a user-facing authoring dimension — out of scope here.

## Options

### O1 — Git-based structured content ("content-as-code")
Programmes as schema-validated structured files (YAML/JSON + Markdown prose) in the repository; CI validates (schema, lexicon lint, citation-key resolution, caption presence), compiles bundles, and enforces the governance checklist via required metadata + protected-branch review; the admin portal reads pipeline state rather than owning authoring.
- **For:** versioning/immutability/audit are native (git *is* the audit trail); validation-as-CI matches our lint-everything posture (copy QA, claims keys); zero vendor lock; free; reviewer sign-off maps to approvals on a release PR; hash-addressed bundles fall out naturally.
- **Against:** non-technical authors need tooling kindness (templates, preview app, a guide); reviewers likely review *rendered previews*, not raw files (a preview build per release is mandatory); at catalogue scale (10+ programmes, localisation) this gets creaky.

### O2 — Headless CMS (managed)
- **For:** friendly authoring UI now; roles/workflows out of the box.
- **Against:** immutability and content-addressing must be fought for (most CMSs are live-mutable by philosophy — the exact opposite of our versioning law); governance-checklist enforcement becomes custom plugin work anyway; vendor cost/lock-in; offline bundle compilation still needs the same custom pipeline behind it. We'd buy a UI and inherit a philosophy mismatch.

### O3 — Custom authoring portal (build our own CMS)
- **For:** exactly our workflow. **Against:** months of build before it authors anything; the classic founder-trap of building tools instead of product. Rejected for MVP without further analysis.

## Decision (provisional)

**O1 — content-as-code** for the flagship era, with the mandatory kindnesses: programme template scaffolding (the `programme-template.md` as generator), schema validation + lexicon/citation/caption CI, a preview build for reviewers, and the admin portal surfacing pipeline/governance state (plus runtime powers: kill-switch, deprecation — which are *not* git operations and live server-side per FR-82).

**Revisit trigger → O2/O3 hybrid:** the moment a regular author who cannot use the git flow joins, or programme #4 planning begins, or localisation starts — whichever first. The bundle format and governance-record model are the stable contract; the authoring front-end is deliberately the replaceable part.

## Consequences

Authoring guide required (authoring model §5 commitment); reviewer workflow = rendered-preview + recorded sign-off attached to the release (the `ContentReview` row is created by the pipeline at approval); emergency powers tested against the *runtime* path, not git (a rollback PR is not an emergency response); content repo access control mirrors governance roles.
