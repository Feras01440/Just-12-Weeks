# Annex D — Behavioural-Science Evidence Base

**Status:** Research annex, 26 July 2026. Peer-reviewed evidence relevant to the product's behavioural design. Verification labels are the reviewer's own ([verified] vs [established, not re-verified]); this annex seeds `06-content/research-standards.md` at Stage 2.

**Audit note (26 Jul 2026):** preserved verbatim as a dated record. The *evidence* stands and seeds research-standards §4; the per-topic "design implications" predate founder directions D-001–D-004 and are superseded where they conflict — notably: progress *recording* is downstream of guidance (D-002), and streak mechanics are not used in any form (N-03); the lapse-recovery findings are implemented through the recovery experience instead.

# Evidence Review for "12 Weeks" — Peer-Reviewed Literature Relevant to App Design

**Scope note:** Citations marked **[verified]** were checked against live sources during this review (2026-07-26). Citations marked **[established, not re-verified]** are canonical works cited from well-established knowledge; details (journal, year, headline findings) are high-confidence but page-level figures were not re-checked. Anything uncertain is flagged explicitly.

---

## 1. Habit formation timelines

**Claim:** Automaticity for a new daily behaviour develops asymptotically over weeks to months, not 21 days. In Lally et al.'s field study (96 volunteers choosing one eat/drink/activity behaviour tied to a daily cue), modelled time to plateau of automaticity had a **median of 66 days, range 18–254 days**. Critically for design, **missing a single opportunity did not materially derail habit formation**.

**Citation:** Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010). How are habits formed: Modelling habit formation in the real world. *European Journal of Social Psychology*, 40(6), 998–1009. **[established, not re-verified — headline figures are canonical and widely reproduced]**

**Newer meta-analytic work [verified]:** Singh, B., Murphy, A., Maher, C., & Smith, A. E. (2024). Time to Form a Habit: A Systematic Review and Meta-Analysis of Health Behaviour Habit Formation and Its Determinants. *Healthcare (Basel)*, 12(23), 2488. DOI: 10.3390/healthcare12232488. Across 20 studies, health-habit formation began within a **median of ~59–66 days** but could take **up to ~335 days**; habit strength was higher for morning-anchored, self-chosen, frequently repeated behaviours.

**Evidence strength:** Single observational/modelling field study (Lally) + 2024 systematic review and meta-analysis of intervention studies (Singh) — convergent.

**Design implication:** A 12-week (84-day) programme sits usefully at/just past the median automaticity point, so the app can honestly frame 12 weeks as "enough to form the habit for most people, not all" — and should message that a single missed day is empirically inconsequential.

---

## 2. Goal-setting theory (specificity, difficulty, number of goals)

**Claim:** Across ~35 years and hundreds of studies, **specific, difficult goals reliably outperform vague or "do your best" goals**, with effect sizes typically in the d ≈ 0.4–0.8 range, provided the person is committed, has the ability, and receives feedback on progress. Goal effects weaken on complex novel tasks (where learning goals beat performance goals).

**Citation:** Locke, E. A., & Latham, G. P. (2002). Building a practically useful theory of goal setting and task motivation: A 35-year odyssey. *American Psychologist*, 57(9), 705–717. (Foundational book: Locke & Latham, 1990, *A Theory of Goal Setting and Task Performance*.) **[established, not re-verified]**

**Fewer goals at once [verified]:** Dalton, A. N., & Spiller, S. A. (2012). Too Much of a Good Thing: The Benefits of Implementation Intentions Depend on the Number of Goals. *Journal of Consumer Research*, 39(3), 600–614. The benefits of detailed planning found for a **single goal did not extend to six goals**; planning for many goals highlighted difficulty and undermined commitment and attainment. (Note: broader "one goal is best" claims in popular productivity writing outrun the direct evidence; the strongest peer-reviewed support is this planning-focused result plus goal-systems work on resource competition, e.g., Kruglanski et al. 2002 — mark that extension as moderate confidence.)

**Evidence strength:** Decades of experimental/field studies with meta-analytic support (Locke & Latham); multi-experiment JCR paper (Dalton & Spiller).

**Design implication:** The app's core constraint — **one specific, measurable, ambitious goal per 12-week cycle** — is directly supported; onboarding should force quantified specificity ("run 5K in under 30 min" not "get fit") and resist multi-goal creep.

---

## 3. Implementation intentions (if-then planning)

**Claim:** Forming an if-then plan linking a situational cue to a goal-directed response ("If it is 7am Monday, then I do X") improves goal attainment with a **medium-to-large effect, d = 0.65 across 94 independent tests (N ≈ 8,461)** — over and above goal intentions alone.

**Citation:** Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: A meta-analysis of effects and processes. *Advances in Experimental Social Psychology*, 38, 69–119. **[established, not re-verified — d = 0.65 and k = 94 are the canonical figures]**

**Evidence strength:** Meta-analysis of experimental studies.

**Design implication:** Daily actions should be captured not as a to-do list but as **if-then plans anchored to time/place/preceding-event cues** ("After I pour my morning coffee, I write for 20 minutes"), with the app prompting cue selection at planning time.

---

## 4. The fresh-start effect

**Claim:** Aspirational behaviour spikes after temporal landmarks — new weeks, months, years, birthdays, semester starts — because landmarks open "new mental accounting periods," relegating past failures to a prior self. Shown in archival data (gym attendance, goal-related searches, commitment-contract creation) and lab studies.

**Citation:** Dai, H., Milkman, K. L., & Riis, J. (2014). The Fresh Start Effect: Temporal Landmarks Motivate Aspirational Behavior. *Management Science*, 60(10), 2563–2582. **[established, not re-verified]** — note the author order is **Dai, Milkman, Riis** (the brief listed Milkman first). Follow-up: Dai, Milkman & Riis (2015), *Psychological Science* (landmark framing increases intentions); Beshears, Dai, Milkman & Benartzi (2021), *Organizational Behavior and Human Decision Processes* field experiment found fresh-start framing increased retirement-savings enrolment — **[established, not re-verified; mark moderate-high confidence on 2021 details]**.

**Evidence strength:** Observational/archival + lab experiments + at least one large field experiment. One caveat worth flagging: effects are on initiation/motivation, not proven long-run persistence.

**Design implication:** Offer programme starts aligned to Mondays/month-starts/birthdays, and — importantly — frame a failed or abandoned cycle's restart as a genuine fresh start (new "Week 1," archived past cycle) rather than a resumed failure.

---

## 5. Self-monitoring and progress feedback

**Claim [verified]:** Prompting people to monitor goal progress increases monitoring frequency (**d+ = 1.98, 95% CI [1.71, 2.24]**) and improves goal attainment (**d+ = 0.40, 95% CI [0.32, 0.48]**) across **138 experimental studies, N = 19,951**. Effects on attainment are **larger when progress is physically recorded and when it is reported/made public**.

**Citation:** Harkin, B., Webb, T. L., Chang, B. P. I., Prestwich, A., Conner, M., Kellar, I., Benn, Y., & Sheeran, P. (2016). Does monitoring goal progress promote goal attainment? A meta-analysis of the experimental evidence. *Psychological Bulletin*, 142(2), 198–229.

**Evidence strength:** Meta-analysis of randomized experiments — among the strongest evidence in this review.

**Design implication:** Make daily/weekly progress **logging (physically recording) the app's spine**, and offer optional sharing/accountability features, since both recording and public reporting are the moderators that amplify the attainment effect.

---

## 6. Structured reflection and weekly review

**Claim:** Deliberately reflecting on accumulated experience improves subsequent performance beyond additional practice: in field (call-centre training) and lab experiments, ~15 minutes of end-of-day written reflection improved later performance (roughly 20%+ in the field study), with effects strongest early in the learning curve.

**Citation:** Di Stefano, G., Gino, F., Pisano, G. P., & Staats, B. R. Learning by Thinking: How Reflection Can Spur Progress Along the Learning Curve. Harvard Business School NOM Unit Working Paper No. 14-093 (multiple revisions; SSRN 2414478). **[verified as still a working paper — as of this check it does not appear as a published journal article; the author's site listed it as in preparation for resubmission. Treat as strong multi-study evidence but NOT peer-reviewed-journal evidence.]** Peer-reviewed convergent support: Anseel, F., Lievens, F., & Schollaert, E. (2009). Reflection as a strategy to enhance task performance after feedback. *Organizational Behavior and Human Decision Processes*, 110(1), 23–35 — reflection combined with feedback improved performance **[established, not re-verified]**.

**Evidence strength:** Working paper with 10+ experiments (not journal peer-reviewed) + peer-reviewed lab evidence (Anseel et al.). Moderate overall; direction consistent.

**Design implication:** The weekly review should be a **structured written reflection paired with the week's progress data** (what worked, what didn't, one adjustment), not just a score screen — reflection plus feedback is the combination with evidence behind it.

---

## 7. Streak mechanics and lapse recovery

**Claim (upside) [verified]:** Silverman, J., & Barasch, A. (2023). On or Off Track: How (Broken) Streaks Affect Consumer Decisions. *Journal of Consumer Research*, 49(6), 1095–1117. Seven studies: highlighting an **intact logged streak increases subsequent engagement**; highlighting a **broken streak decreases it** — independent of actual past behaviour, driven purely by how the log represents it. The demotivating effect of a break is **amplified when self-attributed and attenuated when the streak can be "repaired."**

**Claim (downside):** A single lapse can trigger disproportionate abandonment. Two established literatures: (a) the **"what-the-hell effect"** — counterregulation after perceived goal violation, from Herman & Mack (1975, *Journal of Personality*) and Polivy & Herman's restrained-eating programme (the term is theirs; formalized as the "goal violation effect," e.g., Cochran & Tesser, 1996, book chapter); (b) the **Abstinence Violation Effect** in Marlatt & Gordon (1985), *Relapse Prevention* (Guilford Press): attributing a lapse to stable internal failure ("I have no willpower") predicts full relapse, whereas treating it as a situational, recoverable event does not. **[established, not re-verified; note Cochran & Tesser and Marlatt & Gordon are book/chapter sources, not journal meta-analyses]** Supporting: Lally et al. (2010) found one missed day did not impair habit formation.

**Evidence strength:** JCR multi-experiment paper (streaks); classic experimental literature (counterregulation); clinical-theoretical model with substantial supporting empirical work (AVE). No single meta-analysis unifies "streaks harm on break" — mark that synthesis as moderate confidence.

**Design implication:** If streaks are used at all, build in **repair mechanics** (streak freezes, "grace days," weekly rather than daily streaks) and post-lapse messaging that frames misses as situational and recoverable — because the same log that motivates while intact actively demotivates once broken.

---

## 8. Why 12 weeks

**Claim:** In exercise science, **8–12 weeks is the modal RCT duration** for demonstrating measurable strength and body-composition changes in beginners: early strength gains (weeks 0–4) are largely neural (Moritani & deVries, 1979, *American Journal of Physical Medicine* — classic partitioning of neural vs. hypertrophic contributions); measurable muscle hypertrophy appears within ~3–5 weeks with sensitive imaging (Seynnes, de Boer & Narici, 2007, *Journal of Applied Physiology*, hypertrophy detectable by ~day 20–35) and is robust by 8–12 weeks; reviews of training-study time-courses (Wernbom, Augustsson & Thomeé, 2007, *Sports Medicine*) and the ACSM Position Stand on progression models (2009, *Medicine & Science in Sports & Exercise*) reflect this 8–12+ week convention. **[established, not re-verified — the specific Seynnes day-counts are moderate confidence; the 8–12-week convention itself is high confidence]**

**Popular-press caveat:** *The 12 Week Year* (Moran, B. P., & Lennington, M., 2013, Wiley) is a **business/self-help book with no peer-reviewed evidence base**; it should not be cited as scientific support for the 12-week duration.

**Evidence strength:** Convention across many RCTs + narrative reviews/position stands; the "12 weeks is optimal" framing specifically is a design convention, not a tested comparison of programme lengths.

**Design implication:** 12 weeks is defensible as "long enough for physiologically and behaviourally measurable change in most beginner domains, short enough to sustain commitment" — but the app should not claim 12 weeks is scientifically *optimal*, only that it is a well-precedented evaluation window.

---

## 9. Adherence and dropout in digital health

**Claim [verified]:** Attrition is the central failure mode of digital interventions. Eysenbach, G. (2005). The Law of Attrition. *Journal of Medical Internet Research*, 7(1), e11 — coined the term; substantial nonusage and dropout attrition is the norm in eHealth trials **[established; existence and thesis verified via downstream literature]**. Meyerowitz-Katz, G., et al. (2020). Rates of Attrition and Dropout in App-Based Interventions for Chronic Disease: Systematic Review and Meta-Analysis. *JMIR*, 22(9), e20283 — pooled dropout **43% (95% CI 29–57)**; 49% in observational studies vs. 40% in RCTs; heterogeneity I² > 99%. Real-world (non-trial) figures are far worse: Baumel, A., Muench, F., Edan, S., & Kane, J. M. (2019). Objective User Engagement With Mental Health Apps. *JMIR*, 21(9), e14567 — median **15-day retention 3.9%** and **30-day retention 3.3%** across mental-health apps measured via panel data.

**Evidence strength:** Editorial/conceptual (Eysenbach) + systematic review/meta-analysis (Meyerowitz-Katz) + large observational usage analysis (Baumel).

**Design implication:** Expect the majority of users to disengage well before week 12 under realistic conditions; retention machinery (fresh-start re-entry, lapse-tolerant streaks, weekly rather than daily minimum commitments, monitoring prompts per Harkin) is not polish — it is the product's primary battleground, and success metrics should be benchmarked against ~3–4% 30-day real-world retention, not trial-condition rates.

---

## Cross-topic synthesis for the app

1. **One specific hard goal** (Locke & Latham; Dalton & Spiller) → enforce single-goal cycles with quantified targets.
2. **Daily actions as if-then plans** (Gollwitzer & Sheeran, d = 0.65) → cue-anchored action setup.
3. **Recorded, optionally shared progress monitoring** (Harkin et al., d = 0.40 on attainment; recording/public reporting moderate upward) → logging is the core loop.
4. **Weekly structured written reflection + data** (Di Stefano et al., working paper; Anseel et al.) → the weekly review feature.
5. **12 weeks ≈ median habit-automaticity window** (Lally 66 days; Singh et al. 2024 median 59–66, up to 335) → honest framing; some users need a second cycle.
6. **Lapse-tolerant continuity mechanics** (Silverman & Barasch; Marlatt & Gordon; Lally's one-miss finding) → repairable streaks, situational-attribution messaging.
7. **Fresh-start scheduling and restarts** (Dai, Milkman & Riis 2014) → Monday/month-start cycle starts; failed cycles restart as clean Week 1.
8. **Plan for attrition as the default** (Eysenbach 2005; Meyerowitz-Katz 2020: 43% trial dropout; Baumel 2019: 3.3% real-world 30-day retention).

**Unverified / flagged items recap:** Di Stefano et al. remains a working paper, not a journal article; the precise Beshears et al. 2021 and Seynnes 2007 details, and the Cochran & Tesser chapter citation, are from established knowledge and were not re-verified; "focus on fewer goals" beyond the Dalton & Spiller planning result is an extrapolation. Author order for the fresh-start paper is Dai, Milkman & Riis (corrected from the brief).

Sources consulted during verification: [Singh et al. 2024, Healthcare (MDPI)](https://www.mdpi.com/2227-9032/12/23/2488), [Singh et al. PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11641623/), [Harkin et al. 2016 PubMed abstract](https://pubmed.ncbi.nlm.nih.gov/26479070/), [Silverman & Barasch 2023, JCR](https://academic.oup.com/jcr/article-abstract/49/6/1095/6623414), [Dalton & Spiller 2012, JCR](https://academic.oup.com/jcr/article-abstract/39/3/600/1822636), [Meyerowitz-Katz et al. 2020, JMIR](https://www.jmir.org/2020/9/e20283/), [Baumel et al. 2019, JMIR](https://www.jmir.org/2019/9/e14567/), [Di Stefano et al. SSRN working paper](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2414478).