# Information Architecture

**Status:** Draft for Gate 4. Guidance-first (D-002), category-neutral (D-004), age-inclusive (D-001). The original founder-brief evaluation candidate was Today / Journey / Programmes / Insights / Profile — this document deliberately improves on it (the brief asked us not to accept it automatically).

## 1. The IA decision: three destinations, not five

**Professional recommendation:** a three-tab primary structure:

| Tab | Job | Answers |
|-----|-----|---------|
| **Today** | The guide. Today's action, its guidance, the recovery conversation when needed | "What should I do today? How? Why? What if I can't?" |
| **Journey** | The narrative. Where I am in twelve weeks; weeks as chapters; milestones; weekly review lives here; week-12 report at the end | "Where am I? Am I genuinely progressing? What have I learned?" |
| **Explore** | The catalogue. Programmes, suitability, governance metadata; week-13 next-journey selection surfaces here | "What could I do next? What is this programme, honestly?" |

Profile/settings is a corner affordance from all tabs (account, notifications, subscription, data, accessibility, help) — it is plumbing, not a destination. 

**Why not five tabs *(reasoning, not decoration)*:**
- **"Insights" is deleted on principle.** A separate analytics destination institutionalises tracker-thinking (D-002 violation; non-goal N-28). The app does the noticing: progress lives *narratively* in Journey, contextually in Today ("this is your third week of building X").
- **"Programmes" → "Explore" and demoted in daily life.** During an active challenge the catalogue is a reference, not a daily surface; single-goal focus (one active challenge, lifecycle §4) makes a permanent shop-window tab noise. It earns its place at start, at week 13, and for the curious.
- **Three tabs cut cognitive load** for the D-001 audience (fewer top-level choices, larger targets) and force the daily loop to be self-sufficient.
- Cost accepted: Explore is less prominent for catalogue browsing mid-challenge — correct trade for a single-goal product; catalogue demand mid-cycle is served via Journey's week-13 preview and Profile → "Explore programmes".

## 2. Full map

```
Root (tab bar)
├── Today
│   ├── Guided Action (player: steps → demonstration → why → variants → support → complete)
│   ├── Contextual micro-question (when defined)
│   ├── Recovery conversation (replaces action surface in lapse states)
│   ├── Orientation (during `starting`)
│   └── [empty states: pre-start → points to Explore; completed-today → calm close + tomorrow preview]
├── Journey
│   ├── 12-week arc (chapters)
│   ├── Week detail (days, milestone, adaptations applied)
│   ├── Weekly review (opens from here + from Today on review day)
│   ├── Evidence shelf (programme-defined; only what exists)
│   ├── Milestone history
│   └── Week-12 report (when reached) → week-13 transition
├── Explore
│   ├── Programme catalogue (honest cards: outcome, time cost, difficulty, governance)
│   ├── Programme detail (promise, weeks overview, author/reviewer/citations, suitability screen → start)
│   ├── "Vote for what's next" (waitlist mechanic)
│   └── Week-13 hub (when in `completed/transitioned`)
└── Profile (corner sheet/screen, all tabs)
    ├── Account (details, export, delete)
    ├── Subscription (status, manage/cancel guidance, restore)
    ├── Notifications (per-type toggles, times)
    ├── Accessibility & display (text size pointer, reduced motion, haptics, units)
    ├── Privacy (consent, analytics toggle, policy)
    └── Help & about (contact, report content concern, credits, legal)
```

## 3. IA rules

1. **Depth ≤ 3** from tab root to any daily-loop action; recovery ≤ 1 (it replaces Today's surface when active).
2. **No dead ends:** every terminal screen offers the next sensible act (done today → tomorrow preview; report → week-13; advise-against → alternatives).
3. **One primary action per screen** (experience-principles §6); destructive/rare actions live behind Profile with confirmations.
4. **Universal strings category-neutral** (PRQ-01): tabs, settings, lifecycle copy contain no goal-category words — programme content supplies its own vocabulary inside the player/journey.
5. **Modality discipline:** sheets for short decisions (variant choice, pause), full screens for guidance and reviews, dialogs only for destruction/irreversibility. Platform idioms per PSR-01/02 (iOS/Android navigation may differ; structure may not).
6. **State-aware root:** Today is the launch tab during `active/lapsed/paused`; Explore is the launch surface in `considering` (pre-start); Journey after `completed` until transition. The app opens where the user's life is.

## 4. Search & findability

No global search at MVP (catalogue is small; daily loop needs none). Programme detail pages are deep-linkable (store campaigns, week-13 suggestions). Settings searchable via OS settings integration where platforms offer it.

## 5. Validation plan

Stage 5 tree-test tasks: find how to pause; find what happens if you miss days; find the reviewer's credentials; find export; find cancellation guidance; start the weekly review. Pass bar: ≥80% direct success per task across age cohorts (G6 companion). IA revisions from failures get logged here with rationale.
