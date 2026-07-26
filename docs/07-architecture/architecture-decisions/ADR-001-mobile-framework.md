# ADR-001 — Mobile Framework

**Status:** PROPOSED (provisional recommendation — **unapproved**; Gate-6 item; reversible until walking-skeleton commitment). Deciders: founder + architect. Date: 2026-07-26.

## Context

One brand, two platforms (PSR-01/02), a design-led product with an owned motion/signature system, offline-first daily loop, founder-scale team (Q9 unresolved — the founder's own skills materially affect this decision), Android as first-class (T8 platform-inequity lesson; low-end Android in the device matrix), and a constitution against choosing "whatever an AI agent scaffolds fastest" (founder requirement).

## Options

### O1 — React Native + Expo (development builds)
- **Design freedom/motion:** high — Reanimated/Skia deliver the signature-object ambitions (S1/S4 class) at 60fps when engineered with care; the failure mode is *undisciplined* JS-thread work, a known and manageable class.
- **3D:** adequate paths exist (⚠Q8 is anyway unapproved and likely 2D-motion).
- **Accessibility:** good platform-API coverage; some historical rough edges (custom-component traits, Dynamic Type mapping) demand the accessibility-contract discipline we've specified anyway.
- **Platform integration:** native modules for StoreKit2/Play Billing/HealthKit are mature; Expo dev-builds remove the old "ejection" tax while keeping config-plugins for native needs.
- **Performance:** New Architecture (Fabric/JSI) + Hermes is honest for this app's shape (content + geometry, not games); low-end Android needs budget discipline (our perf plan exists for exactly this).
- **Maintainability/hiring:** largest talent pool; TypeScript end-to-end with the API; one codebase.
- **Cost/speed:** best for a small team; OTA updates (within store rules) help content-adjacent fixes.
- **Risks:** premium-motion ceiling requires senior RN craft (not junior-template craft); dependency-ecosystem churn; the "RN apps feel non-native" failure is real *when teams ignore platform idioms* — our PSR rules are the antidote either way.

### O2 — Flutter
- **Design freedom/motion:** highest ceiling for owned rendering (Impeller); the signature system would be gorgeous; single pixel-perfect renderer.
- **Accessibility:** solid and improving, but a *rendered* (non-native) widget tree keeps accessibility a perpetual verification burden per component — heavier for our D-001 stakes.
- **Platform integration:** good plugins; platform-idiom fidelity (iOS feel) needs deliberate work; Dynamic-Type-like behaviours are hand-built.
- **Performance:** excellent, incl. low-end Android; app size heavier at floor.
- **Maintainability/hiring:** Dart is a hiring narrower-pool bet; strong framework coherence.
- **Risks:** iOS-native texture (sheets, transitions, text handling) always slightly foreign unless heavily invested; our brand strategy leans on *typographic* excellence — text rendering/i18n edge cases in a custom renderer are a real tax.

### O3 — Native Swift + Kotlin (two codebases)
- **Design freedom/motion/accessibility/integration:** the ceiling on every axis; platform idioms free; accessibility APIs first-hand; StoreKit2/Billing native.
- **Cost:** ~1.7–2× feature delivery for a solo-founder-scale team; every flow built twice, tested twice, drifted twice; the 23-flow catalogue makes this concrete and brutal.
- **Risks:** velocity starvation is the top *product* risk at this scale (R-06) — two codebases is how small teams ship half a product on each platform.

## Decision (provisional)

**O1 — React Native + Expo development builds**, with three binding conditions: (1) New Architecture + Reanimated/Skia from day one — the signature system is built as a native-thread-rendered module, never JS-frame-driven; (2) platform-idiom fidelity per PSR-01/02 (navigation, sheets, haptics native-mapped); (3) the low-end-Android performance budget (NFR-02) gates every milestone, and a Stage-6 motion spike must prove the signature object at 60fps on the reference device **before** the framework choice hardens — failure of that spike reopens O2/O3.

## Why not the others (honestly)

O3 loses on solo-scale velocity arithmetic, not on quality. O2 is a genuinely close second — it wins if the chosen art direction's motion ambitions outgrow RN's comfort *and* the founder's stack familiarity (Q9) doesn't favour JS/TS; the Stage-6 spike is designed to surface exactly that evidence.

## Consequences

TypeScript shared with API contracts; senior-RN craft required (hiring/contracting bar); Expo config-plugin discipline for native modules (billing, notifications, health-if-Q1); OTA update policy written against store rules (content/JS fixes only, never behaviour that review should see); revisit trigger: motion-spike failure, or accessibility audit findings attributable to the framework layer.
