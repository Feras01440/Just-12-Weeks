# Accessibility Requirements

**Status:** Draft for Gate 4. A design requirement, not an audit (founder brief); expanded by D-001's age-inclusivity mandate. Target: a high-quality interpretation of **WCAG 2.2 AA** for native mobile plus current platform guidance (Apple Accessibility, Android Accessibility). Test execution: `09-quality/accessibility-test-plan.md`.

## 1. Screen readers (VoiceOver / TalkBack)

- Every interactive element: role, label, state, hint where non-obvious; labels human ("Begin today's action"), not developer-ese.
- Logical focus order specified per screen at wireframe stage (Gate-4 deliverable); custom components ship with accessibility contracts before build.
- Live announcements: completion confirmations, timer milestones, sync-relevant errors; never announcement spam.
- The guided-action player fully operable: step-through, media control, variant switch, completion — audited each release.
- No inaccessible ceremony: the finishing moment and signature visuals have announced equivalents.

## 2. Text and scaling (D-001 critical)

- Full Dynamic Type / Android font scale to platform maximums (incl. iOS accessibility sizes); **layouts designed at 200% first, then verified at 100%** — not the reverse.
- No text in images; no fixed-height text containers; line length caps for readability; minimum body size ≥17pt/16sp equivalent; no light weights below large-title sizes.
- Large-text layout rules per component (stacking, wrapping, target growth) in the design system plan.

## 3. Contrast & colour

- Text ≥4.5:1 (AA), large text ≥3:1; interactive/graphical essentials ≥3:1; core reading surfaces aim AAA (7:1) where the palette allows (colour strategy obligation).
- **Meaning never by colour alone:** lifecycle states, variant lanes, milestone states all carry shape/label/position redundancy.
- Both themes (light/dark) meet identical ratios; high-contrast platform modes respected (increased-contrast variants defined in colour strategy).
- Colour-vision testing (protan/deutan/tritan simulations) part of design review, not QA afterthought.

## 4. Touch & motor

- Targets ≥44pt (iOS)/48dp (Android), ≥8pt spacing in dense areas; daily-loop primaries in one-handed thumb reach (G7).
- Every gesture has a visible control alternative (navigation model §3); no timing-dependent interactions anywhere (no hold-to-confirm as sole path).
- Full keyboard/switch/Voice Control operability; drag interactions have tap alternatives (WCAG 2.2 dragging-movements).
- Shake/motion inputs: none.

## 5. Motion, transparency, vestibular safety

- `prefers-reduced-motion` honoured globally: parallax, scale-zooms, particle effects replaced by designed opacity/stills — **reduced-motion variants are designed artefacts, not omissions** (signature-experience obligation).
- No autoplaying motion >5s without control; no flashing (three-flash rule); reduced-transparency respected (blur fallbacks to solid).

## 6. Media & content

- All demonstration video: captions + text-equivalent steps (authoring obligation); audio guidance: transcripts; no audio-only or video-only critical instruction.
- Plain language rules (content strategy §2) are themselves an accessibility requirement (cognitive accessibility): one primary action per screen, no timeouts on decisions, forgiving error recovery, consistent navigation (WCAG 2.2 consistent-help).
- Haptics always paired with visual+auditory equivalents; never sole carrier of meaning.

## 7. Forms & errors

- Errors: identified in text, associated programmatically with their field, recoverable without data loss; autofill supported (F05); no CAPTCHA-style gates.
- WCAG 2.2 specifics honoured: accessible authentication (no cognitive puzzles), redundant entry avoided (data asked once), focus-appearance visible on external keyboards.

## 8. Charts, progress & data (the honest-visualisation rules)

- Journey/arc visuals: every data point reachable by assistive tech with text values; trends described in words ("rising over four weeks") alongside any graphic; never colour-only encodings; dataviz palette AA-contrast on both themes.
- Progress objects (the twelve-part signature) expose semantic state ("Week 7 of 12 complete") not decorative descriptions.

## 9. One-handed & situational

- Daily loop: fully one-thumb operable on reference large phone; bottom-weighted primaries; reachability respected.
- Situational impairment assumed normal (gym, commute, bright sun): generous contrast, large targets, interruption-proof state (NFR-06) are situational accessibility too.

## 10. Process teeth

- Accessibility annotations (labels, order, traits, large-text behaviour, reduced-motion variant) are **required wireframe content** at Gate 4 — designs without them bounce.
- Stage 5 usability includes screen-reader-primary participants and 200%-text sessions (research plan §6).
- Release: accessibility-test-plan pass is a Gate-8 blocker; regressions are release blockers, not backlog items.
- Every design-system component ships with its accessibility contract (design-system plan requirement) — iOS and Android behaviour specified separately where platform APIs differ.
