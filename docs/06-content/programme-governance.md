# Programme Governance

**Status:** Framework draft for Gate 2. The accountability system behind "based on books and research" — every published programme is a governed artefact with named responsibility. Operational detail: [content-review-workflow.md](content-review-workflow.md), [content-versioning.md](content-versioning.md); language rules: [claims-policy.md](claims-policy.md); evidence rules: [research-standards.md](research-standards.md).

## 1. The governance record (mandatory per programme, user-visible in-app per FR-80)

| Field | Requirement |
|-------|-------------|
| Author | Named person; role in creation stated |
| Reviewer | Named person, **different from author** where §2 requires; credentials stated verifiably (registration number where a regulated title applies) |
| Qualifications relevance | One sentence: why this reviewer is competent for this content |
| Intended audience | Who this programme serves (plain language) |
| Excluded users | Who it does not serve, and why |
| Contraindications | Where relevant (physical/wellbeing); phrased as clear stop/consult conditions |
| Evidence pack | Citation list per research-standards; stored with the version |
| Claim justification | Each outcome-adjacent statement mapped to its evidence tier |
| Risks & limitations | Honest statement of what the programme cannot promise and where it can go wrong |
| Last reviewed / next review due | Dates; §4 cadence |
| Version history | Per content-versioning |
| Withdrawal state | live / under-correction / withdrawn |

## 2. Qualification requirements by content class

| Content class | Reviewer requirement |
|---------------|---------------------|
| Physical training / body composition | Qualified, insured professional with a recognised certification (e.g. accredited S&C or equivalent registered PT qualification); nutrition-adjacent content additionally reviewed by a registered nutrition professional (AfN registrant or dietitian) — **two reviewers where a programme spans both** |
| Wellbeing routines (sleep hygiene, stress practices) | Relevant credentialed professional (e.g. psychologist, accredited coach with recognised body) for anything beyond general education |
| Skin-adjacent routine content (post-MVP candidate at most) | Dermatology-qualified reviewer; claims constrained to routine-consistency only |
| Skill-learning (coding, language, instrument, craft) | Demonstrable subject expertise + teaching experience (portfolio-verifiable); no regulated title exists, so credibility is evidenced, not certificated |
| Practical/creative projects | As skill-learning |
| Routine/personal development | Author may self-review **only** if content stays strictly inside general-education boundaries (claims policy §2); any psychological-technique framing triggers credentialed review |

Author ≠ reviewer is **mandatory** for every class except the last's narrow case. Reviewer independence: reviewers sign that they reviewed the actual full artefact, not a summary.

## 3. Boundary declarations *(the six lines every piece of content respects)*

1. **Education** — explaining how things work, with citations. *Our core business.*
2. **Behavioural support / guidance** — structured actions toward a user's chosen goal. *Our core business.*
3. **General wellness guidance** — non-individualised healthy-default suggestions. *Permitted with care.*
4. **Professional advice** — individualised prescription. **Not offered.** The app adapts *programme structure*, never prescribes to a person's condition.
5. **Diagnosis** — **never.** No symptom interpretation, no assessment of conditions.
6. **Treatment** — **never.** Nothing positioned as treating any condition.

Every programme's orientation states, in its own plain voice, what the programme is and is not (template §disclaimer — written as respect, not legal wallpaper). Signposting rules: content that touches medical-adjacent territory carries "speak to a professional if…" conditions authored per programme.

## 4. Review cadence and triggers

Scheduled: every programme re-reviewed ≥ every 12 months (physical/wellbeing: 6 months for the first year live). Triggered immediately by: any user safety report; relevant regulatory/evidence change (research-standards watch); adaptation analytics showing systematic distress signals (e.g. anomalous easier-variant/abandon clustering at one week — investigated as possible content fault); store policy change touching the class.

## 5. User reporting

"Report a content concern" on every programme surface (FR-80): categories — safety, accuracy, claims, tone, other. SLA: safety-tagged reports triaged within 24h with §6 powers available; others within 7 days. Reporter gets an outcome note (fixed / clarified / no change + why). Reports and outcomes append to the programme's governance record.

## 6. Corrections, withdrawal, emergency removal

- **Correction:** fault confirmed → hotfix or version bump per content-versioning; correction note in changelog; material corrections messaged in-app to affected users plainly ("we corrected week 5's guidance on X; here's what changed and why").
- **Withdrawal (planned):** programme leaves catalogue; active challenges either complete on pinned version (if fault is not safety-relevant) or migrate per engine §8; users told honestly why.
- **Emergency removal (safety):** platform owner or reviewer can pull any activity or whole programme server-side within hours (FR-82); affected day is replaced by an authored safe fallback ("today's session is paused while we review it — here's why, here's what to do instead"); post-incident review recorded. This power is tested (fire-drill) before launch — an untested kill switch is theatre.

## 7. Governance of the governors

The platform owner (founder) holds publish/withdraw authority and cannot ship a class-2 requiring programme without the mandated reviewer signature — the checklist is structural (publishing tooling refuses), not honorary. Annual governance self-audit: sample programmes re-checked against this framework; findings logged in the decision log.
