# Validation Dashboard (Weekly Automated Evidence Summary)

**Status:** Template active; populates only with real observed data once Gate B publishes (no fabricated rows, ever — empty weeks report empty). Replaces the interview-era dashboard in `stage1-pack/notes-and-coding.md` §5 as the **default** weekly instrument (that one activates only under escalation). Designed for the D-008 envelope: assembled automatically from the analytics events + spend log; founder read-time ~15 minutes.

## Weekly summary template

```
WEEK OF: ____            (Stage: 1A synthesis | 1B passive | escalation active)
READ DATE: ____ (pre-registered at publication; week __ of 6 + extensions __ of 2)
STATUS LINE: one sentence — the week's single most decision-relevant fact.
NO-PEEK RULE: accumulation only below; verdict language appears on the read date alone
(safety S-class checks excepted). Verdict rules: passive-validation-plan §4.

── TRAFFIC & SIGNUP (organic / F&F shown separately, thresholds read on organic only)
Visitors: __ organic / __ ff        Cumulative: __ (signup-rate floor read needs ≥300)
Signups (confirmed): __ org / __ ff  Blended organic rate: __% (floor 3%; ±__ pts at this n)
By arm  H1: views __ · signups __ · rate __%
        H2: views __ · signups __ · rate __%
        H3: views __ · signups __ · rate __%     Lead ≥1.5×? yes/no/insufficient-volume
Channel log: (posts made this week: where, when)   Excluded rows: __ (rule cited)
Channel mix: top channel __% of qualified rows (cap 40%) · distinct channels ≥3? __

── CATEGORY VOTE (qualified rows, cumulative; wording version: v_)
P1 physical __%  ·  P2 skill __%  ·  P3 creative __%  ·  P4 routine __%  ·  other: top pick __
n = __ / 100 read-floor   Trajectory to floor by read date: on-track / short / far-short
"Start when": now __% / few months __% / someday __% / curious __%
(no "leading" line exists — winner ≥35% AND margin ≥12 pts, read-date only, with CI)

── PRICING INTEREST (qualified rows, cumulative; secondary — interest, not conversion)
Term __% · Monthly __% · One-off __% · Free-only __%   n = __ / 50 directional-floor (±14 pts at 50)

── SURVEY (optional answers only; n per question; per-band claims need band n ≥ 10)
Age bands: __/__/__/__ (+PNTS __)   Tried before: top 2: __   Usual ending: top 2: __

── SPEND (Gate B cap £300 cumulative)
This week £__ · cumulative £__ · lines: __        Requests needing approval: __

── READ-DATE / ESCALATION CHECK
Weeks to read date: __     Projected outcome if today were the read date: Read / Extend / Escalate / Stop
S-class stop signals: none | S4-watch (detail)
D-009 escalation triggers: none | trigger __ fired → recommended smallest response: __

── FOUNDER INBOX DELTA
New memos/questions this week: __ (links)     Nothing needing you before: (date)
```

## Rules

1. **Counts carry method:** every figure states its date range and inclusion rule on first citation each week; definition changes (wording versions, threshold edits) are logged in-line and start fresh comparison windows.
2. **Organic/F&F separation is visible weekly** — support is reported (it's real encouragement) but never feeds a threshold.
3. **Nulls are results:** "no visitors this week; one channel post made" is a complete, honest row.
4. **The escalation check runs weekly** even when everything is green — silence on triggers is a check performed, not a check skipped.
5. **Archive:** summaries append to `validation-evidence.md` (which remains empty of any synthetic content, ever); the dashboard is the running head of that file once live.
6. Metric definitions trace to the landing spec §6 events; anything this dashboard cannot honestly measure stays in [research-limitations.md](research-limitations.md) rather than being approximated.
