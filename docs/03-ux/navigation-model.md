# Navigation Model

**Status:** Draft for Gate 4. How movement works, per platform, within the three-destination IA.

## 1. Primary navigation

- **Pattern:** bottom tab bar, 3 tabs (Today / Journey / Explore) + Profile as a persistent top-corner affordance. Bottom tabs: one-handed reach (D-001), platform-familiar on both OSes.
- **iOS:** UITabBar idiom; Profile as top-trailing avatar/glyph opening a sheet; large-title navigation in stacks; swipe-back everywhere.
- **Android:** Material navigation bar; Profile in the top app bar; predictive back gesture support (PSR-02); same three destinations — no drawer (hidden nav punishes low digital confidence).
- **Tab state preservation:** each tab keeps its stack; returning to a tab resumes where the user left it; double-tap tab = pop to root (with platform-native equivalents).

## 2. Movement rules

1. **The app opens where life is** (IA §3.6): active challenge → Today; lapse → Today showing the recovery conversation; pre-start → Explore; just-completed → Journey.
2. **Forward = deeper into guidance; back always safe.** No flow traps: system back/swipe-back never loses a completion (local write-ahead, NFR-06) and never exits a purchase without confirmation.
3. **Sheets vs pushes:** decisions of a moment (variant pick, pause confirm, reminder time) = sheet; content to inhabit (guided action, review, report) = push/full screen; dialogs reserved for destructive confirmation (delete account, abandon challenge).
4. **Cross-links are verbs, not tabs:** "Start weekly review" appears in Today on review day; "See your journey" after completion moments; week-13 hub linked from report. Users are carried by intent, not made to hunt.
5. **Notifications deep-link** to the exact surface (today's action; review; recovery conversation) — never to a generic home that makes the user re-navigate (respecting notification intent, FR-60).
6. **Interruptions resume.** App death mid-guided-action reopens into the same step; mid-review drafts persist locally.

## 3. Gesture & input accessibility (D-001)

Every gesture has a visible control twin (swipe-completes also have a button; swipe-back duplicated by back affordance). No long-press-only actions. Targets ≥44pt/48dp with ≥8pt spacing in the daily loop. Full keyboard/switch-control operability (platform accessibility APIs); focus order specified per screen in wireframes (Gate 4 checklist). Haptics confirm (completion, milestone) but never carry sole meaning (haptic-alternative rule, accessibility requirements).

## 4. Navigation copy

Tab labels are always visible text + icon (never icon-only — digital-confidence inclusivity), category-neutral (PRQ-01), and stable (no dynamic renaming). "Explore" not "Shop"/"Store" — the catalogue is a library with governance metadata, and the label must not smell of upsell.

## 5. Anti-patterns excluded by design

No hamburger drawer; no hidden edge gestures as the only path; no bottom-sheet stacks three deep; no modal onboarding carousels re-shown on updates; no tab badges as engagement bait (badges only for genuinely actionable states: review-ready, report-ready); no interstitial upsells between navigation actions (paywall appears only at the entitlement boundary — paywall principles).
