# Content Versioning

**Status:** Framework draft for Gate 2. The rules that let content improve without pulling the rug from under live journeys. Engine counterpart: programme-engine §8; lifecycle edge cases: challenge-lifecycle §4.

## 1. Version semantics

`MAJOR.MINOR.PATCH` per ProgrammeVersion:

- **PATCH** (hotfix within version): typo, clearer wording of the *same* instruction, replaced media asset of the same demonstration, caption fixes. No review re-trigger beyond copy-edit; changelog entry mandatory.
- **MINOR:** content additions/rebalances that don't change safety posture or structure (an added consolidation unit, improved variant, extra review prompt). Evidence/claims re-check on touched sections; reviewer notified; active challenges may *opt in* via changelog note where relevant, default stay-pinned.
- **MAJOR:** structural, difficulty, safety, or promise changes (week re-ordering, new exclusions, changed completion rule, revised outcome statement). Full workflow re-run (expert review mandatory). Active challenges stay pinned; new starts get the new version.

**Safety-critical override:** a fault that makes pinned content unsafe forces migration or removal regardless of pinning — with plain-language in-app messaging and a designed transition (never a silent swap). This is the one case where user experience yields to safety, and it is messaged as exactly that.

## 2. Immutability and audit

Published versions are immutable artefacts (content hash recorded); PATCHes create a new immutable build of the same version with delta log. Every change: who, what, why, when — in the governance record and the `AuditEvent` stream. The changelog has a user-facing rendering (FR-81): honest, brief, in product voice ("Week 5, day 3: clearer knee-position guidance in the demonstration").

## 3. Challenge pinning rules (restated as the user's contract)

A user's challenge runs on the version they started, migrating only: (a) by their explicit opt-in to a MINOR improvement, (b) under the safety-critical override, or (c) at restart (new instances take current). Reports and history always cite the version they happened on — a user's week-12 report is reproducible forever against its content.

## 4. Deprecation & withdrawal mechanics

- **Deprecated:** no new starts; active pinned challenges run to completion; catalogue hides or labels honestly ("being replaced by v2 — current journeys unaffected").
- **Withdrawn (planned):** governance §6 path; active challenges complete-on-pin unless safety says otherwise; users messaged with the honest why.
- **Removed (emergency):** FR-82; fallback content serves same-day; §1's safety override handles the pinned population.
- Retention: withdrawn/superseded versions are retained internally (audit, report reproducibility, legal) per retention policy — never re-served.

## 5. Media versioning

Demonstration assets version with their day (asset refs are content-addressed); caption/transcript files version atomically with their media (an updated video without its updated transcript fails the build). Offline caches reconcile by version+hash — a user mid-week never receives a mixed-version week (NFR-03 consistency rule).

## 6. Cross-version analytics honesty

Events carry `programme_version` (analytics spec) so completion/recovery metrics are never blended across materially different content — protecting both product decisions and the honesty of any public claims about programme performance.
