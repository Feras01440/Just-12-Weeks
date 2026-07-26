# Feature Dependency Map

**Status:** Draft. Shows what blocks what, so sequencing decisions are made with eyes open. Mermaid source kept editable.

## Decision → capability dependencies

```mermaid
graph TD
  subgraph Founder decisions
    Q1[Q1 flagship category]
    Q3[Q3 launch depth]
    Q5[Q5/Q6 monetisation boundary]
    Q12A[Q12A visual-evidence scope]
    Q13[Q13 week-13 model]
    Q9[Q9 constraints/budget]
    ADR1[ADR-001 framework - provisional]
  end

  Q1 --> CONTENT[Flagship programme content]
  Q3 --> CONTENT
  Q9 --> CONTENT
  Q1 --> HK[Health-platform integration PSR-04]
  Q5 --> PAYWALL[Paywall + entitlements FR-70..72]
  Q12A --> EVID[Visual evidence in evidence menu FR-33]
  EVID --> ADR3[ADR-003 storage model Q12B]
  Q13 --> W13[Week-13 transition FR-51]
  ADR1 --> SKELETON[Walking skeleton Stage 6]
```

## Capability build order (platform)

```mermaid
graph TD
  ENGINE[Programme engine schema] --> PLAYER[Guided Action player FR-21]
  ENGINE --> CATALOG[Catalogue + governance metadata FR-10]
  ENGINE --> LIFECYCLE[Challenge lifecycle FR-43]
  PLAYER --> TODAY[Today screen FR-20]
  TODAY --> COMPLETE[Completion + offline queue FR-23 NFR-03]
  COMPLETE --> ADAPT[Weekly adaptation FR-42]
  LIFECYCLE --> RECOVERY[Recovery flows FR-40]
  LIFECYCLE --> PAUSE[Pause/resume/restart FR-41]
  COMPLETE --> REVIEW[Weekly review FR-32]
  REVIEW --> JOURNEY[Journey view FR-31]
  JOURNEY --> W12[Week-12 completion FR-50]
  W12 --> W13b[Week-13 transition FR-51]
  CATALOG --> SUIT[Suitability screening FR-11]
  SUIT --> START[Programme start FR-12]
  START --> TODAY
  AUTH[Account + 18+ gate FR-02/03] --> START
  AUTH --> DELETE[Account deletion FR-05]
  PAYWALL2[Entitlements FR-70] --> START
  PAYWALL2 --> RESTORE[Restore + expiry FR-71]
  NOTIF[Notification engine FR-60] --> TODAY
  GOV[Versioning + withdrawal FR-81/82] --> CATALOG
```

## Reading the map — sequencing consequences

1. **The engine schema is the true start line.** Player, catalogue, lifecycle, adaptation and governance all consume it; schema churn after Stage 6 is the most expensive kind. Hence the Gate-2 paper test (four archetypes expressed in schema before any code).
2. **Entitlements sit upstream of programme start**, not bolted on at the end — store review and the Q5/Q6 experiment both need it early (a common failure: billing last, launch blocked).
3. **Recovery flows depend only on lifecycle**, not on adaptation — they ship in the first vertical slice, not as polish (D-002; R-10).
4. **Week-13 (FR-51) is the only M-requirement gated on an unanswered question (Q13)** that sits at the end of a long chain; a v1 (guided next-step choice) is buildable under either Q13 answer, so the decision does not block Stage 6–7 start — it shapes content, not plumbing.
5. **Visual evidence (FR-33) is fully detachable.** Nothing downstream depends on it; if Q12A concludes "not in flagship", the MVP loses nothing structural. This is deliberate (D-003; R-16).
6. **Health integrations (PSR-04) are leaf nodes** — deferable without ripple.

## Content dependencies (often the real critical path)

Flagship programme authoring → expert review → citation pack → demonstration media production → adaptation rules → evidence menu sign-off (Q12A) → week-13 handover content. Content lead-time runs in parallel with Stages 4–6 and historically underestimates worst (R-03): the review cycle alone is weeks, not days.
