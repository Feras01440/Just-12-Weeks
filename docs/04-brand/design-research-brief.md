# Design Research Brief — Experience Sprint

**Status:** exploratory sprint input · not a product decision record
**Scope:** research pass conducted before the three-direction design laboratory (`design-lab/`)
**Method:** eight parallel research sweeps (platform guidance, WCAG, typography, motion, behaviour-change science, calm technology & older adults, editorial systems & ethical commerce). Sources were fetched and verified where the network allowed; where a fetch failed, the date is marked *best-known*. Sources are used to understand principles — never to justify copying another product.

Each entry records: **source · date · what it establishes · how it affects this product · evidence class · limitations.**
Evidence classes: **[E]** empirical evidence · **[C]** platform/industry convention · **[P]** professional interpretation.

---

## 1. Platform baseline (Apple HIG, Material 3)

### 1.1 Typography floors are numeric, not vibes
- **Source:** Apple HIG — Typography. https://developer.apple.com/design/human-interface-guidelines/typography · verified current 2026-07-26 (June 2025 “Liquid Glass” revision era) · **[C]**
- **Establishes:** 17pt default body, 11pt minimum for system *and* custom fonts; avoid Light weights for functional text; custom fonts must implement Dynamic Type; prioritise scaling the content users care about.
- **Affects this product:** guidance copy (instructions, prompts) is the product; it must be built on scalable text styles with body ≥17pt equivalent. A custom display face is affordable *only* if wired to Dynamic Type. In the lab, all three directions set body at 17px equivalent and every size in rem × a scale factor.
- **Limitations:** Apple’s internal legibility research is unpublished; minimums are platform norms, not peer-reviewed thresholds.

### 1.2 One prominent action per view is codified convention
- **Source:** Apple HIG — Buttons; Designing for iOS. verified 2026-07-26 · **[C]**
- **Establishes:** ≥44×44pt hit regions; *one to two* prominent buttons per view; primary controls in the reachable middle/bottom zone; limit onscreen controls.
- **Affects this product:** directly validates the founder’s five-second Today test. Every Today screen in the lab has exactly one filled primary control; alternatives are quiet, equal-legibility rows beneath it.
- **Limitations:** heuristic, not published research (though consistent with choice-load findings).

### 1.3 Dark mode is a paired semantic system, not an inversion
- **Source:** Apple HIG — Dark Mode. verified 2026-07-26 · **[C]**
- **Establishes:** respect the system appearance (no app-level toggle in production); semantic colour pairs; ≥4.5:1, aim 7:1; “elevated” background tiers convey depth.
- **Affects this product:** each direction’s palette is authored as light/dark *pairs with the same meaning* (paper/night-paper; bone/night-instrument; linen/dye-house-dusk). Evening use is core to both programme worlds. The lab’s theme toggle exists for review only.
- **Limitations:** contrast ratios are WCAG imports; APCA debate unresolved — treated as floor.

### 1.4 Adaptive layout by window class, motion by scheme
- **Source:** Material 3 — window size classes; M3 Expressive motion (May 2025); easing & duration tokens. m3.material.io (some pages 403’d via proxy; values corroborated via developer.android.com) · **[C]**
- **Establishes:** compact <600dp is the phone baseline; medium/expanded need planned adaptations. M3’s motion is now physics-based with a *standard* (minimal-bounce) and *expressive* (bouncy) scheme; legacy duration tokens: short 50–200ms, medium 250–400ms, long 450–600ms.
- **Affects this product:** the lab tests 320/390/430/834px. Motion tokens per direction sit inside the standard-scheme band; nothing bounces. “Expressive” is reserved for at most the week-12 arrival.
- **Limitations:** Google telemetry percentages unpublished methodology; M3 Expressive is new and consumer-fitness fit unproven.

### 1.5 Android 14+ non-linear font scaling to 200%
- **Source:** Android Developers — Android 14 features. verified · **[C]**
- **Establishes:** user font scale reaches 200% with a non-linear curve (large text scales less); sp everywhere; never derive layout maths from font scale.
- **Affects this product:** with an 18–75 audience, 130–200% scaling is a mainstream case. The lab’s 200% toggle applies a text-only multiplier and screenshots prove reflow, not just claim it.
- **Limitations:** no published data on adoption rates of large font scales.

## 2. Accessibility standard (WCAG 2.2)

### 2.1 The conformance floor
- **Source:** WCAG 2.2, W3C Recommendation, 5 Oct 2023 (updated 12 Dec 2024; ISO/IEC 40500:2025). https://www.w3.org/TR/WCAG22/ · **[C]**
- **Establishes:** 1.4.3 contrast 4.5:1 (3:1 large); 1.4.4 resize to 200% without loss; 1.4.10 reflow at 320 CSS px; 1.4.12 text-spacing tolerance; 2.5.8 targets ≥24px (AA) — with 44/48 as the platform convention above it; 3.2.3 consistent navigation; 4.1.3 status messages need live-region semantics.
- **Affects this product:** the lab treats AA as the floor and platform 44–48px targets as the working minimum (primary actions 56px+). Timers announce via `role="timer"`/polite live regions; errors use `role="alert"`; loading uses `role="status"`. The a11y script audits every state in all three directions.
- **Limitations:** thresholds are committee-negotiated minima; meeting them ≠ good design for older adults (see §5).

### 2.2 Reduced motion is a contract, not a nicety
- **Source:** W3C Technique C39 + Understanding SC 2.3.3; Media Queries Level 5 (WD 2021-12-18); WebKit blog “Responsive Design for Motion” (James Craig, 2017, best-known) · **[C]/[P]**
- **Establishes:** vestibular triggers: scaling/zoom, spin, parallax, multi-speed layers. `prefers-reduced-motion` is the reliable cross-platform signal; “reduce” means *reduce, not remove* — keep state-change cues, remove movement.
- **Affects this product:** every motion token in the lab defines a reduced replacement (opacity/instant). The lab has a reduced-motion toggle *and* honours the OS media query; screenshots capture the reduced mode.
- **Limitations:** 2.3.3 is AAA — a chosen bar, not an obligation.

## 3. Typography for interfaces and long reading

### 3.1 Craft baselines
- **Source:** Butterick, *Practical Typography* (2nd ed., 2015–present, best-known). practicaltypography.com · **[P]**
- **Establishes:** body larger than defaults; 45–90 character measure; 120–145% leading; tabular figures exist so changing numbers don’t jitter.
- **Affects this product:** all three lab directions: body 17px+, measure constrained (~34–38ch on phones), leading 1.5–1.6, `tabular-nums` on every timer.
- **Limitations:** one practitioner’s codification, document-oriented.

### 3.2 Weight and ageing eyes are measurable
- **Source:** Beier & Oderkerk, *Acta Psychologica* 198, 2019 (letter boldness × visual angle); Beier et al., *Information Design Journal* 26(1), 2021 (letter width/spacing in low-vision readers) · **[E]**
- **Establishes:** at small sizes, mid-bold weights are recognised better than Regular/Light; extreme weights impair; wider letterforms and looser spacing measurably help older/low-vision readers at small sizes.
- **Affects this product:** the lab bans Light below ~16px, sets small labels at Medium+, prefers faces with open counters and honest x-heights, and loosens letter-spacing at caption sizes.
- **Limitations:** lab paradigms (letter identification), modest effects, small clinical samples — direction is trustworthy, exact thresholds are not.

### 3.3 Variable fonts make a two-voice system affordable
- **Source:** web.dev, “Introduction to variable fonts” (2018, updated, best-known); Fraunces repo (Undercase Type, 2020–, verified); Literata case study (TypeTogether, 2015–2020) · **[C]/[P]**
- **Establishes:** one VF file carries a family’s weight/optical range at woff2 sizes small enough for mobile; Fraunces’ opsz axis does real optical work; Literata was engineered for low-resolution screens (documented design brief) and ships tabular figures.
- **Affects this product:** the lab bundles ~470KB of OFL variable fonts total across *three whole directions* — production would ship one direction’s pair (~100–200KB). Literata is recorded as the safest body-serif fallback candidate even though the lab explores more characterful voices.
- **Limitations:** foundry accounts are first-party; rendering on low-end Android must be device-verified before any production decision.

### 3.4 Licensing
- **Source:** SIL OFL 1.1 (2007) + OFL-FAQ update7 (2023). openfontlicense.org · **[C]**
- **Establishes:** OFL faces may be embedded in paid commercial apps at no cost; keep licence texts; don’t sell fonts alone.
- **Affects this product:** every family in the lab (Fraunces, Archivo, IBM Plex Mono, Bricolage Grotesque, Faustina) is OFL; licence compliance is a non-issue for exploration. No permanent typeface decision is made in this sprint.
- **Limitations:** licence ≠ quality.

## 4. Motion

### 4.1 A consistent numeric architecture exists across systems
- **Source:** Val Head, *Designing Interface Animation* (2016); IBM Carbon motion (2019–); Material easing/duration tokens; Apple HIG Motion · **[P]/[C]**
- **Establishes:** micro-feedback ~70–200ms; standard transitions 200–400ms; earned/expressive moments 400–700ms; entrances decelerate, exits accelerate; “productive vs expressive” is the most useful split — daily actions get near-invisible motion, milestones get the budget.
- **Affects this product:** each lab direction defines 3–4 duration tokens inside these bands with its own easing character (paper-settle / calibrated sweep / thread-draw), documented in `motion-and-haptics-exploration.md`. Completion of a *day* is quiet; completion of a *week* is noticeable; week 12 is the one expressive moment.
- **Limitations:** all heuristic bands, tuned per product by judgment.

### 4.2 Motion can harm
- **Source:** Val Head, “Designing Safer Web Animation For Motion Sensitivity”, A List Apart, 2015-09-08 · **[P]** (citing clinical prevalence work)
- **Establishes:** vestibular disorders (prevalence rises with age) are triggered by zooms, parallax, multi-directional layers.
- **Affects this product:** with users up to their 70s — some post-exertion light-headed — the lab bans parallax, full-screen zooms and spin outright, in all directions, not only under reduced motion.
- **Limitations:** expert synthesis, not primary clinical research.

## 5. Behaviour change — what actually helps people return

### 5.1 Habit formation fits the 12-week arc; one missed day is noise
- **Source:** Lally, van Jaarsveld, Potts & Wardle, *European Journal of Social Psychology* 40:998–1009, 2010 · **[E]**
- **Establishes:** median 66 days to automaticity (range 18–254); missing a single opportunity did not materially reduce habit formation.
- **Affects this product:** the recovery copy across all three directions states this honestly (“one quiet day changes nothing about your twelve weeks”). Nothing in any direction visualises a broken chain.
- **Limitations:** n=96, simple behaviours, ~48% completion — a strong directional finding, not a law.

### 5.2 Broken streaks demotivate — experimentally
- **Source:** Silverman & Barasch, *Journal of Consumer Research* 49(6):1095–1117, 2022/2023 · **[E]**
- **Establishes:** displayed streaks become the goal; a *shown* broken streak reduces continuation even when actual behaviour is identical. Cumulative and rate-based displays don’t carry this cliff.
- **Affects this product:** the strongest single piece of evidence behind the founder’s no-streak rule. All three directions represent progress as *accumulation* (pages read, readings recorded, cloth woven) — never as consecutiveness.
- **Limitations:** short-horizon lab/consumer studies; streaks do motivate while intact — the finding is about asymmetric downside.

### 5.3 Lapse → relapse is a framing problem (AVE)
- **Source:** Witkiewitz & Marlatt, *American Psychologist* 59(4):224–235, 2004 (updating Marlatt & Gordon 1985); related what-the-hell effect (Polivy & Herman; Cochran & Tesser 1996) · **[E]** (transfer interpretation **[P]**)
- **Establishes:** lapses attributed to stable internal causes (+guilt) cascade into relapse; situational framing plus a rehearsed, small next step prevents the cascade.
- **Affects this product:** recovery screens never ask “why did you fail?”, attribute situationally (“life gets loud”), and always lead with the smallest next action, including a lighter-than-normal one that *counts in full*.
- **Limitations:** evidence base strongest in addiction/dietary domains; transfer to training/writing is standard but assumed.

### 5.4 Fresh starts are real re-entry points
- **Source:** Dai, Milkman & Riis, *Management Science* 60(10):2563–2582, 2014 · **[E]**
- **Establishes:** aspirational behaviour spikes after temporal landmarks (weeks, months); landmarks open new “mental accounting periods”.
- **Affects this product:** week boundaries are designed as doors, not walls: every direction’s long-absence flow offers re-entry pegged to a landmark (“rejoin at week 3, day 1”) rather than demanding make-up work.
- **Limitations:** archival/correlational in the 2014 paper; later experiments support causality.

### 5.5 Implementation intentions are the highest-leverage planning pattern
- **Source:** Gollwitzer & Sheeran, *Advances in Experimental Social Psychology* 38:69–119, 2006 (meta-analysis, 94 tests, d=.65) · **[E]**
- **Establishes:** if-then plans binding behaviour to concrete cues materially raise goal attainment.
- **Affects this product:** noted as a **foundation-level feature** (session-cue binding at programme start; coping plans in recovery). Only lightly present in the lab’s start/recovery copy — flagged in DECISIONS-NOT-MADE as a product mechanic to design post-sprint.
- **Limitations:** effects shrink unsupervised; pre-replication-crisis mix.

### 5.6 Autonomy beats compulsion (SDT)
- **Source:** Ryan & Deci, *American Psychologist* 55(1):68–78, 2000; METUX application: Peters, Calvo & Ryan, *Frontiers in Psychology* 9:797, 2018 · **[E]/[P]**
- **Establishes:** sustained motivation needs autonomy, competence, relatedness; controlling contingencies and guilt undermine it.
- **Affects this product:** users choose capacity on return (the capacity question appears in all three directions); difficulty always has a user-held dial (easier/further forms); copy is warm-adult, never scolding. The planning-fallacy correction (Buehler, Griffin & Ross, *JPSP* 67(3):366–381, 1994 **[E]**) additionally argues the default schedule should be conservative and the reschedule path honourable.
- **Limitations:** METUX is a framework, not a validated intervention.

## 6. Calm technology & older adults

### 6.1 Centre and periphery
- **Source:** Weiser & Brown, “Designing Calm Technology”, Xerox PARC, 1995-12-21; Amber Case, *Calm Technology*, O’Reilly, 2015 · **[P]**
- **Establishes:** technology should inform from the periphery and claim the centre only when needed; smallest possible amount of attention; communicate without speaking.
- **Affects this product:** one centre-of-attention object per day (Today’s action); journey position is ambient (running head, rail, band) rather than a dashboard; notification design is out of scope but the stance is recorded.
- **Limitations:** conceptual essays, pre-smartphone; translation is interpretive.

### 6.2 Older-adult evidence, not older-adult stereotypes
- **Source:** NN/g, *UX Design for Seniors 65+*, 3rd ed. 2019 (studies 2001–2019, best-known date, 403’d); NN/g “Define Techy Terms for Older Users”; Jin, Plocher & Kiff, HCII/Springer LNCS, 2007 (button size/spacing with older adults); *Aging Clinical and Experimental Research*, 2025 systematic review of 132 studies (2014–2025); ITU/WHO “Ageing in a digital world”, 2021 · **[E]/[P]**
- **Establishes:** shallow, consistent navigation; visible labels (no icon-only controls); jargon causes task failure — *define, don’t dumb down*; older-adult accuracy plateaus need targets well above platform minimums (~14mm ≈ 56px for primary controls); error-tolerant interfaces and one decision per screen; frame older users as capable, never as a deficit group.
- **Affects this product:** in the lab: navigation is ≤2 levels from Today to anything daily; every control is a labelled text control; primary actions are 56–58px; system vocabulary is paired with plain language (“Restore purchase — the store remembers”); recovery asks one question with three answers, not a form. The 65+ claim will be evaluated in critique against hierarchy, language, trust and interaction complexity — not type size alone.
- **Limitations:** NN/g corpus is web-heavy; 2007 button study used older touch hardware; review-level evidence is heterogeneous. Real co-design sessions with 60–75-year-olds are recorded as a necessary post-sprint step — synthetic critique is not user research.

## 7. Editorial systems and ethical commerce

### 7.1 Premium is structural discipline
- **Source:** Müller-Brockmann, *Grid Systems in Graphic Design*, 1981; Reichenstein, “Web Design is 95% Typography”, iA, 2006-10-19 · **[P]**
- **Establishes:** modular rhythm from a baseline unit reads as authority and calm; in text-dominant products, hierarchy is a typographic problem before it is a layout problem.
- **Affects this product:** each direction derives spacing from its body leading; Direction A is the deliberate maximal test of “typography is the interface”.
- **Limitations:** print-era doctrine; adaptation, not prescription.

### 7.2 The subscription screen is a regulated surface
- **Source:** Brignull, *Deceptive Patterns*, 2023 + deceptive.design taxonomy (2010–); FTC staff report *Bringing Dark Patterns to Light*, 2022-09-15; FTC Negative Option (“click-to-cancel”) rule — finalised 2024-10, vacated by the Eighth Circuit 2025-07-08 on procedural grounds, replacement rulemaking open · **[P]/[E]/[C]**
- **Establishes:** named anti-patterns (confirmshaming, roach motel, fake urgency, buried terms); regulators treat hard-to-cancel as enforcement territory; the prudent standard is symmetric cancellation and renewal terms disclosed at the point of consent — regardless of the vacatur.
- **Affects this product:** the lab’s subscription states in all three directions show: full price adjacent to the action, renewal behaviour in plain type, a “Not now” of equal visibility, two-tap cancellation stated, and an expired state that keeps the user’s work and says so. No countdowns, no crossed-out anchor prices, no guilt copy.
- **Limitations:** US-centric legal detail; EU/UK specifics deferred to foundation work.

---

## Synthesis — the ten rules this sprint builds under

1. One centre of attention per day; journey position ambient, never dashboarded. (§6.1, §1.2)
2. Body ≥17px equivalent, measure 45–90ch, leading ≥1.5, everything scalable to 200%. (§1.1, §2.1, §3.1)
3. No Light weights in functional text; small labels Medium+; open counters. (§3.2)
4. Progress = accumulation. Consecutiveness is never displayed. (§5.1, §5.2)
5. Recovery: situational framing, no explanation demanded, smallest next step first, landmark re-entry, capacity chosen by the user. (§5.3–§5.6)
6. Targets: 24px legal floor → 44/48px working minimum → 56px+ primary. (§2.1, §6.2)
7. Motion: productive ≤240ms invisible; expressive 400–700ms only for earned moments; no zoom/parallax/spin anywhere; every token has a reduced twin. (§4.1, §4.2, §2.2)
8. Dark mode is a paired semantic system authored simultaneously. (§1.3)
9. Labels over icons; define system words in plain language; never infantilise. (§6.2)
10. The paywall is honest by construction: full terms at consent, symmetric exit, work is kept on lapse. (§7.2)

*Prepared as sprint input. Nothing here selects a direction, a typeface, a framework or a flagship programme.*
