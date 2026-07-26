# Abandonment and Recovery Evidence (Public User-Voice)

**Status:** Stage 1A synthesis, 26 July 2026 — research questions Q1 (why people begin), Q2 (why they stop), Q5 (what happens after missed days), Q6 (punishment mechanics). Sources: the [public evidence corpus](public-evidence-corpus.md) rows EV-1001…EV-1054 (54 captured observations; every row carries product, source, type, date, excerpt, theme, sentiment, severity, classification, confidence, limitation). Retrieval constraint: search-snippet retrieval of indexed content (direct fetches proxy-blocked) — confidence ratings already discount for this; full limitations in [research-limitations.md](research-limitations.md). Classifications used exactly as captured; interpretation is labelled.

## Q1 — Why people begin *(professional interpretation over cited rows)*

1. **Mental-health floors, not aspiration ceilings**, start many journeys: Finch adopters describe starting from anxiety, depression, and days they cannot get out of bed — the product's first job is making a tiny action possible (rows EV-1001…1003, public user opinion).
2. **Body-crisis moments trigger programme starts:** C25K forum posters name severe overweight, smoking history, arthritis, caregiving pressure and age fear as the day-one condition — "time for change" phrasing recurs (EV-1004…1006).
3. **Shame is present at the start, not only the end:** a teenager delays starting for fear of being judged running in public (EV-1007) — the beginning barrier is social exposure, which guided privacy (indoor variants, private evidence) can address.
4. **Calendar resets are real acquisition physics:** January language-app spikes are company-courted, verified fact (EV-1008) — consistent with the fresh-start literature already in Annex D.
5. **Marketing shapes the hope users arrive with**, and later anger is proportional to it: users arriving at "anti-diet psychology" and meeting calorie counting exit loudly (EV-1010) — a direct warning for our promise/claims discipline.

## Q2 — Why people stop *(professional interpretation over cited rows)*

1. **The metric replaces the goal, then the user quits the metric:** long-streak language learners report minimum-effort lessons purely to preserve streaks, then rage-quit at day 172 / 1,139 / 1,569 (EV-1011, EV-1012, EV-1038 — recurring review theme). The strongest single stop-pattern captured.
2. **Logging has two exits — fatigue and obsession:** "food-log fatigue" (overwhelm → silent stop) and compulsive tracking described as "a kind of madness" (deliberate self-protective quit) (EV-1013, EV-1014). Both indict manual-logging centrality — D-002's external confirmation.
3. **Billing behaviour ends relationships independently of product quality:** charged-after-cancelling and refund-refusal themes recur across two audited products' complaint corpora (EV-1015…1020, recurring review theme) — users exit angry at the *company*.
4. **Maintenance burden kills meta-tools:** a user who needed a daily task to remember to update the tracker (EV-1021) names the category's self-parody; staleness and ethics controversies finish the job (EV-1022).
5. **Audience pressure ends social-fitness use:** kudos-validation loops, skipped rest days to look fit, every route a competition (EV-1023…1025) — a caution against any social layer that makes effort performative (supports N-20 deferral).
6. **Some quitters leave the category, not the product** — retreating to paper or minimal free tools after concluding gamification and paywalls are the problem itself (EV-1026, EV-1027).

## Q5 — What happens after missed days *(professional interpretation over cited rows)*

1. **The dominant lapse script is all-or-nothing collapse** — "I've already failed, so what's the point" — acknowledged even by vendors as the killer of "almost every habit that quietly dies in week three" (EV-1037).
2. **Return is experienced as a wall:** the category leader's own research on lapsed users finds coming back intimidating — streak gone, skills decayed, penalty compounding re-entry cost (EV-1028, verified product fact).
3. **Lapse insurance exists but is prepaid and finite** (streak freezes covering one day, equipped in advance) — heavy users describe managing *insurance*, not learning (EV-1029, EV-1030).
4. **A single missed day can erase a year-scale identity artefact** (340-day logging streak lost to one forgotten day) — grief language, though the underlying behaviour was intact (EV-1031).
5. **Repairability varies wildly and users notice:** one product ships an automatic streak-restore tool; another told a 1,250-day streaker restoration was impossible — then later shipped pausing as a structural concession (EV-1032…1034).
6. **Forgiving lapse design is noticed, named and rewarded:** four independent reviews single out "the bird never dies" — support-not-guilt on missed days — as why lapse-prone users return (EV-1035, recurring review theme). **This is the closest public evidence to our recovery thesis.**
7. **Bugs and third parties inflict "lapses" with identical emotional cost** (party-damage mechanics, false streak resets) (EV-1036, EV-1052…1054) — reinforcing our scheduled-days-only detection rule and NFR-06.

## Q6 — Punishment mechanics and reactions *(professional interpretation over cited rows)*

- **Streak reset + guilt notifications + monetised repair** (language category leader): verified mechanics; user reactions span grief ("like losing a limb"), lock-in ("the only thing that pushed me"), parental objection, and rage-quitting at 1,500+ days (EV-1038…1043). The pattern: punishment retains *while the streak lives* and produces cliff-edge abandonment when it dies — the same users citing the streak as their motivation quit entirely after losing it.
- **HP/avatar damage incl. collateral party damage** (EV-1044, EV-1036): confusion and alarm at being punished for a teammate's miss.
- **Symbolic death** ("only your fault the tree died") (EV-1045).
- **Real-money stakes:** one design openly builds motivation on the "sting" of charges, with observed mercy in practice (EV-1046, EV-1047); its dark tail — a rival's notification/login failures triggering repeated unrefunded penalty charges with unresponsive support (EV-1048, EV-1049, high severity) — punishment decoupled from behaviour.
- **Total reset** (miss any task on day 74 → day 1): verified rule; the surrounding culture reframes restart as discipline, and the same rule is the plausible mechanism behind quit-for-good outcomes (EV-1050, EV-1051).
- **Accidental punishment** (device unpairing, sync bugs, updates erasing streaks) is experienced identically to real punishment (EV-1052…1054) — and two market leaders' later repair/pause features are tacit admissions of harm (EV-1033, EV-1034).

## Design consequences registered

Confirms (with public voice, not just theory): no streak surfaces (N-03) · recovery-as-content as the open differentiator (G1 in market-gaps) · scheduled-days-only lapse detection · write-ahead reliability as an emotional feature (T6) · claims/marketing honesty as churn prevention (Q2 finding 5). New nuance adopted into the objection register: forgiveness design is *rewarded* when users can feel it early (EV-1035) — strengthening objection O-03's demand that the paywall/preview narrate recovery.

**Limitations:** snippet-level retrieval; most rows undated; no frequencies claimed beyond cited row counts; several audited products returned no retrievable lapse-voice at all (listed in research-limitations §gaps).
