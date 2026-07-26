# The Recovery Experience

**Status:** Draft for Gate 4. The product's defining flow — where every competitor loses their users and this product intends to keep them. Implements D-002's recovery mandate; grounded in the lapse literature (Annex D §7: how the lapse moment is framed decides whether it becomes collapse).

## 1. Design stance

The user who missed four days is not a churn risk to be re-engaged; they are **the person the product was built for, having the experience it was built around**. Every design choice follows: no guilt (it converts lapse to collapse — abstinence-violation effect), no losses to display (nothing decays), no interrogation (why they were away is theirs), one warm conversation, immediate agency.

## 2. The blame lexicon (enforced in every recovery surface, all copy, all notifications)

**Banned:** "you failed / fell behind / broke / lost / streak / don't give up / get back on track / excuses / catch up / missed out / disappointing / wasted". **Banned tones:** pleading, disappointment, cheerleading-through-gritted-teeth, false brightness.
**Instead:** "life happened / that's part of twelve weeks / here's the shortest way back / this week is a clean page / what you built is still yours / pick your re-entry". Tone: the good coach's second sentence — past the miss, onto the plan, zero drama.
The lexicon lives in `content-strategy.md` and is a release check (G10: zero violations shipped).

## 3. The three conversations

### 3.1 One day (invisible recovery — F11)
No conversation. One acknowledging sentence inside normal Today, then today's action. Evidence-backed (one miss is empirically inconsequential — Lally 2010) and the design *behaves like it believes that*, which is itself the message.

### 3.2 Two to six days (the recovery conversation — F12)
Replaces Today's hero. Three beats, one screen each at most:
1. **Normalise, specifically.** "Four days away, week 5. This is the most common moment in any twelve weeks — the plan is built for it."
2. **Show what stands.** What weeks 1–4 built, named concretely (capability language from the programme, not percentages). Nothing shown as lost, because nothing is.
3. **Offer the paths** (max three + pause): **Pick up today** — an authored *re-entry day* (lightened version of the current week's core; adaptation model §5); **Reshape the week** — preview of a reflowed plan (consolidation inserted, R1); **Pause properly** (F14 — always dignified). One tap each; effects previewed in plain words.
Then: immediately into the chosen action. Recovery ends in *doing*, never in planning theatre.

### 3.3 Seven or more days (the fresh start — F13)
A genuinely different conversation, built on the fresh-start effect (temporal landmarks — Annex D §4):
1. **The clean-page frame.** "It's been a couple of weeks. Here's the honest position: everything you completed stands. This week can be a clean page."
2. **Honest options:** **Fresh-start week** (authored lightened week, journey continues — default suggestion); **Restart the programme** (new instance; the first journey is *honoured history*, visible as "journey one", never erased or shown as failure); **Different programme** (goals change; Explore path with warmth); **Pause with a return date**.
3. **Capability retained is named** — countering the "I've lost it all" cognition that drives permanent abandonment.

## 4. Notification policy in lapse states (restated from lifecycle §5 — it is that important)

One recovery invitation in 2–6d state. One fresh-start invitation ~day 8. One final quiet check ~day 21 ("your journey is saved whenever you want it — nothing needed from you"). Then **silence**. No drip campaigns, no "we miss you", no discount-flavoured win-backs into a lapse (preying on guilt with pricing is a line this product does not cross). Every recovery notification is disable-able independently (F15).

## 5. Re-entry content (the authored substance behind the promise)

Programmes ship (authoring obligations, adaptation model §7): re-entry days per phase (short, confidence-first versions of core work); fresh-start week variants; reshaped-week composition rules. Recovery is *content*, not just copy — the difference between this product and a tracker with kind words.

## 6. Measures of success

`recovery_flow_entered` → `returned_after_absence` conversion ≥35% (success-metrics: the differentiator metric); recovery-path distribution (which doors people take); week-4 survival lift vs lapse incidence; Stage 5 test: users in a simulated 4-day-lapse scenario describe the app's reaction as "understanding / practical" not "guilt-tripping / naggy" (word-choice card sort, all age cohorts).

## 7. Failure modes this design must avoid

Recovery conversation appearing for *scheduled* gaps (rest days, user-shifted weeks — detection uses scheduled days only, lifecycle §3); the conversation becoming a lecture (three beats maximum, then action); lightened re-entry reading as demotion (variant dignity rules apply); pause pitched as the easy exit (it's one of four equal doors); over-celebration of the return (quiet warmth on day 1 back; the *milestone* is week's end).
