# Content Strategy (Product Voice & UX Writing)

**Status:** Draft for Gate 4. Governs every string in the product: universal UI, programme templates, notifications, paywall, errors. Programme *subject-matter* standards live in `06-content/`; this document owns voice, language rules and the lexicons.

## 1. Voice

**A knowledgeable coach who respects you as an adult.** Warm without gush; direct without barking; specific without jargon. The voice never performs enthusiasm it hasn't earned and never manufactures emotion to move the user.

| We sound like | Never like |
|---------------|------------|
| "Twenty minutes today. Here's how." | "Ready to CRUSH it today?! 💪" |
| "Four days away. The plan absorbs it — here's the way back." | "You broke your streak 😢 Don't give up!" |
| "This is the hardest week for most people." | "You've got this, superstar!" |
| "Research suggests spacing helps — that's why today repeats Tuesday." | "Scientifically proven to change your life!" |

## 2. Language rules (D-001 age-inclusive, PRQ-01 category-neutral)

1. **Plain language:** instructions at reading age ~9–11; one idea per sentence; front-load the verb ("Tap Begin" not "In order to start, you should tap…").
2. **No generational idiom** in universal strings — no hustle-culture, no youth slang, no "silver years" condescension either. Age-neutral respect.
3. **Category-neutral universal strings:** lifecycle, tabs, settings, errors never name a goal domain (programme content supplies its own vocabulary).
4. **Second person, active, present.** "You" always; "we" only when the product genuinely acts ("we'll remind you at 7").
5. **Numbers as humans say them** in prose ("three of five days"), digits in data positions ("Week 3 · Day 2").
6. **UK English**, sentence case everywhere (incl. buttons), no exclamation marks in universal UI (programmes may earn one at true milestones), no ellipsis theatrics, emoji never in universal UI.
7. **Honesty markers:** time costs stated truthfully; "about 25 minutes" only if it's about 25 minutes. Trust is a copy discipline before it is a legal one.

## 3. The lexicons (enforced; G10 = zero violations shipped)

**Blame lexicon (banned):** fail(ed/ure), broke/broken, lost/lose (of progress), streak, behind, catch up, excuses, lazy, cheat(ed), slipped, wasted, disappointing, "don't give up", "get back on track", guilt-toned "we miss you".
**Pressure lexicon (banned):** hurry, last chance, only today, don't miss out, offer ends, unlock now, limited time (unless a genuinely time-limited fact under Q5's lawful-offer rules — then plain-stated, no countdown UI), "before it's too late".
**Hype lexicon (banned in claims positions):** guaranteed, proven to (unless citation-backed "research suggests/shows" per claims policy), transform your life, melt/blast/shred, miracle, effortless.
**Preferred vocabulary:** built, standing, carried, absorbed, way back, clean page, next step, your pace, the gentler version, what you made, what changed.

## 4. Surface-specific rules

- **Guidance (player):** imperative steps; "why it matters" in two short paragraphs max, citation-linked where a claim appears; safety notes in their own visual register, never buried.
- **Notifications:** ≤ ~12 words of substance; state the value, not the demand ("Today: intervals, 20 minutes" beats "Time to work out!"); recovery notifications follow §recovery lexicon; previews never contain sensitive content (NFR-04).
- **Errors:** name what happened, what it means, the next act ("Couldn't sync — your work is saved on this phone. It'll sync when you're back online."). Never blame the user; never joke over losses.
- **Empty states:** every one is authored with purpose (what this space is *for*, what fills it) — no mascot-shrug placeholders.
- **Paywall & commerce:** per paywall-principles: full sentences, full prices, renewal stated adjacent to price, cancellation path stated on the paywall itself.
- **Legal/consent:** plain-language summary sentence above any required legalese; consent asks are specific and separate (privacy model).

## 5. Programme-voice inheritance

Programmes speak within the product voice but may carry a discipline flavour (a running coach's cadence differs from a writing mentor's). The authoring model's copy-edit pass enforces: voice table compliance, lexicon compliance, reading-age check, age-inclusive check, claims-policy check. Templates (adaptation messages, recovery lines, review prompts) ship pre-cleared so programme authors compose within safe rails.

## 6. Copy QA pipeline

String lint (lexicon regexes) in CI → copy review against this doc per release → Stage 5/9 comprehension checks feed revisions → G10 gate. Every new string PR names its surface and passes the relevant section's rules.
