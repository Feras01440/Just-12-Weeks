# Core User Flows

**Status:** Draft for Gate 4. Twenty-three flows. Format per flow: **Intent · Entry · Steps · Decisions · Guidance (what the system tells/shows) · Required input · Optional input · Errors · Offline · Accessibility · Done =**. Universal rules that apply to every flow (stated once): all screens meet NFR-01 accessibility and experience-principles G-criteria; every error state names the problem in plain language and offers a next act; every flow survives interruption and resumes; no flow contains blame language (lexicon-checked); back/swipe-back never destroys work. ⚠ marks dependence on an open decision.

---

## F01 — First launch
- **Intent:** "What is this, and is it for me?" · **Entry:** app opened first time.
- **Steps:** (1) Three value screens — the promise, how guidance works, how recovery works (skippable at any point); (2) choice: *Explore programmes* (guest) or *I have an account* (restore path F17).
- **Decisions:** skip vs read; browse vs sign in.
- **Guidance:** the product explains itself in its own voice — what it is (a guide), what it is not (a tracker); honest about subscription existence (no bait).
- **Required:** none. **Optional:** none.
- **Errors:** none possible (static content, bundled).
- **Offline:** fully functional (bundled content); catalogue may show cached/placeholder set with "connect to see everything".
- **Accessibility:** screens are text-first, Dynamic-Type-safe; no auto-advancing carousels; VoiceOver order title→body→actions.
- **Done =** user lands in Explore (guest) knowing what the product is.

## F02 — Understanding the product (returning curiosity)
- **Intent:** "How does this actually work?" · **Entry:** Explore → "How 12 Weeks works"; also linked from paywall and programme detail.
- **Steps:** single scrollable explainer: the 12-week container → daily guided action anatomy → recovery philosophy → evidence honesty → governance (who writes programmes) → what's free vs paid ⚠Q6.
- **Decisions:** none — reference material.
- **Guidance:** worked example of one guided action (interactive demo, no account needed).
- **Required/Optional:** none/none. **Errors:** n/a. **Offline:** bundled.
- **Accessibility:** demo operable via screen reader; captions on any media.
- **Done =** user can state the promise and the model (tested in Stage 5, G6).

## F03 — Selecting a programme
- **Intent:** "Which journey fits my goal?" · **Entry:** Explore.
- **Steps:** (1) catalogue of honest cards (outcome, weekly time, difficulty, governance chip); (2) programme detail: promise, 12-week overview, sample day (playable!), author/reviewer credentials, citations, suitability summary, price context ⚠Q5/Q6; (3) *Check it suits me* → F04.
- **Decisions:** which programme; sample-day try; proceed vs vote-for-next (if their goal is absent — capture, thank, suggest nearest).
- **Guidance:** cards never oversell (claims policy); "is this for you" states who it's *not* for, prominently.
- **Required:** none to browse. **Optional:** waitlist vote.
- **Errors:** catalogue fetch failure → cached list + retry chip.
- **Offline:** cached catalogue browsable; start requires connection (entitlement) with clear message.
- **Accessibility:** cards are single focus targets with full labels; governance chips readable not colour-only.
- **Done =** a programme chosen for suitability screening, or an informed decision not to start.

## F04 — Suitability screening ⚠ per-programme content
- **Intent:** "Is this programme right and safe for me?" · **Entry:** programme detail → start.
- **Steps:** (1) 18+ confirmation (first time, D-005); (2) programme's screening questions (typically 3–6, plain language, one per screen); (3) outcome: proceed / proceed-with-notes ("start with the gentler variants") / advise-against.
- **Decisions:** honest answers; on advise-against: see alternatives, or acknowledge-and-exit (no override for safety-critical rules — the programme's governance decides).
- **Guidance:** every question says why it's asked; advise-against is respectful, specific, and offers alternatives (another programme / see a professional, per programme rules).
- **Required:** the screening answers (safety job). **Optional:** none.
- **Errors:** none network-dependent (rules bundled with programme).
- **Offline:** works offline once programme detail is cached; result syncs.
- **Accessibility:** one question per screen, large targets; no timeouts.
- **Done =** eligibility state recorded; proceed → F05; advise-against → respectful exit with paths.

## F05 — Creating an account
- **Intent:** "Keep my journey safe." · **Entry:** after suitability, before challenge start (or from Profile).
- **Steps:** (1) why an account (one screen: sync, safety, restore — honest); (2) sign-in options (Apple/Google/email per PSR-01); (3) minimal profile: first name (for address), notification pre-question deferred (F15 context).
- **Decisions:** method choice.
- **Guidance:** privacy one-liner with link ("your journey is yours — here's what we store and why").
- **Required:** auth credential, first name. **Optional:** nothing else — no age beyond 18+ gate, no gender, no body data (data minimisation).
- **Errors:** auth failure → provider-specific plain message + alternate method; email typo detection; existing-account detection → sign-in.
- **Offline:** blocked with honest message ("your account keeps your journey safe across devices — connect to continue"); guest browsing unaffected.
- **Accessibility:** system autofill supported; error text programmatically associated with fields.
- **Done =** authenticated; returns *into the flow it interrupted* (no restart).

## F06 — Starting a challenge
- **Intent:** "Commit, properly." · **Entry:** post-suitability programme start.
- **Steps:** (1) entitlement check ⚠Q5/Q6 (paywall F16 if boundary); (2) goal framing: programme suggests outcome wording, user may personalise (the one free-text field); (3) start-date choice: today / next Monday / pick (fresh-start framing); (4) schedule shape (days-per-week pattern from programme options) + reminder time (or "no reminders"); (5) orientation begins (F07's day-0 content).
- **Decisions:** date; schedule; reminders.
- **Guidance:** what week 1 will ask, concretely; commitment stated honestly ("about 25 minutes, 5 days a week").
- **Required:** date + schedule choices (guidance-shaping job). **Optional:** goal-wording personalisation, reminder time.
- **Errors:** entitlement/network failure → state preserved, retry; date edge cases (DST, timezone) handled silently.
- **Offline:** if entitled and programme cached: full start offline; syncs later.
- **Accessibility:** date/schedule pickers native (platform accessibility inherited).
- **Done =** challenge `starting`; Today shows orientation.

## F07 — Receiving today's guidance (the core loop)
- **Intent:** "What do I do today, and how?" · **Entry:** open app (auto-lands Today) or daily notification deep-link.
- **Steps:** (1) Today shows: day context ("Week 3 · Day 2 — Building consistency"), the guided action card (what + time estimate), position glance; (2) open action → player: steps, demonstration, *why this matters* (one tap), variant lane switcher; (3) do the thing (with timer/audio support where defined) → complete (F09).
- **Decisions:** now or later (later = no penalty, evening reminder if enabled); variant (F08a); demonstration view (F08).
- **Guidance:** everything — this flow *is* the product's guidance (G1).
- **Required:** none until completion tap. **Optional:** contextual micro-question if defined (F10).
- **Errors:** media load failure → text steps always available (media never blocks); corrupted cache self-heals.
- **Offline:** current week fully cached incl. demonstrations (NFR-03); zero degradation.
- **Accessibility:** player fully screen-reader navigable step-by-step; timers announce; media captioned + text-equivalent; one-handed reach for all controls (G7).
- **Done =** user knows exactly what to do and has everything needed to do it.

## F08 — Viewing an example or demonstration
- **Intent:** "Show me how, properly." · **Entry:** inside the action player.
- **Steps:** demonstration opens in-place (video/audio/animated steps/interactive per action); replay, slow-down (where media supports), step-through.
- **Decisions:** watch fully vs skim steps.
- **Guidance:** demonstration annotated with the 2–3 things that matter most ("watch for…").
- **Required/Optional:** none/none.
- **Errors:** playback failure → illustrated text steps (always authored, never generated).
- **Offline:** cached with the week.
- **Accessibility:** captions; transcript; reduced-motion variant (stills sequence); never autoplays sound.
- **Done =** user proceeds to attempt with confidence.

## F08a — Selecting an easier (or advanced) alternative
- **Intent:** "Today the standard version isn't right." · **Entry:** variant lane in player (always visible, equal visual dignity).
- **Steps:** (1) switch lane → easier/standard/advanced, each with its own complete instruction set; (2) proceed in chosen lane.
- **Decisions:** lane. Adaptation consequences (R2) previewed only as gentle information, never warning.
- **Guidance:** easier variant framed as *the smart move for today* ("shorter and lighter — it keeps the week moving"); advanced framed with honest caution where relevant.
- **Required:** none (lane choice is itself the input; auto-recorded). **Optional:** the "how was it?" micro-question may follow.
- **Errors/Offline:** as F07. **Accessibility:** lanes as segmented control with full labels, not colour-coded dots.
- **Done =** the day proceeds in the right-sized version; selection feeds adaptation.

## F09 — Completing an action
- **Intent:** "Done — mark it and release me." · **Entry:** player, after doing.
- **Steps:** (1) complete tap; (2) brief calm confirmation (proportional — no fireworks for Tuesday); (3) optional micro-question (F10) *only if defined*; (4) return to Today in completed state: tomorrow preview, closing note.
- **Decisions:** none required.
- **Guidance:** completed-Today shows the week filling ("3 of 5 this week") in calm terms, and what tomorrow brings (G-series "what happens next").
- **Required:** the single completion interaction (G2 ≤2 taps total).
- **Optional:** micro-question; artefact attach where the action defines it.
- **Errors:** write failure impossible to surface — local write-ahead always succeeds; sync retries silently (NFR-06).
- **Offline:** complete offline; visible "will sync" only in Profile diagnostics, not in the moment (no anxiety UI).
- **Accessibility:** confirmation announced ("Day complete. Tomorrow: …"); haptic + visual + announced (no single channel).
- **Done =** state advanced; user free; loop closed in <3 taps median.

## F10 — Responding to one useful contextual question
- **Intent (system's, honestly declared):** improve safety / fit / guidance. · **Entry:** immediately post-completion (or where the programme defines).
- **Steps:** one question, 2–4 tap-answers, one screen ("Was today's version: too much / about right / too easy?"); answer or skip (skip is a first-class button, not an X hunt).
- **Decisions:** answer/skip.
- **Guidance:** the question states its purpose in-line ("this tunes next week"); the *effect* of answers shows up visibly later ("because you said last week felt heavy…" — closing the trust loop).
- **Required:** none — always skippable (unless a programme marked it safety-critical, which the governance checklist polices tightly and must justify).
- **Errors/Offline:** queued like completions.
- **Accessibility:** single-question single-screen; large tap answers.
- **Done =** answer recorded to its declared purpose; never more than ~1/day (G-criteria).

## F11 — Missing one day
- **Intent (user):** usually none — life happened. · **Entry:** next app open after one scheduled day passed.
- **Steps:** Today opens normally with one acknowledging line ("Yesterday didn't happen — that's a normal part of twelve weeks. Today:") and today's action. Nothing else.
- **Decisions:** none — deliberately.
- **Guidance:** the single sentence + normal guidance. Evidence: one miss doesn't derail habit formation (Lally 2010) — and the design behaves like it believes that.
- **Required/Optional:** none/none. **Errors/Offline:** standard.
- **Accessibility:** no red, no badge, no alarm semantics for screen readers.
- **Done =** user continues as if the miss were unremarkable — because it is.

## F12 — Missing several days (2–6)
- **Intent:** "I fell off. Is this recoverable?" · **Entry:** app open in `lapsed_short`; or the single recovery notification.
- **Steps:** (1) Today's surface is replaced by the **recovery conversation** (see recovery-experience spec): warm, specific, brief; (2) options: *pick up today* (re-entry day — lightened, authored) / *restructure my week* (plan reflow preview) / *pause properly* (F14) ; (3) chosen path starts immediately.
- **Decisions:** the recovery path.
- **Guidance:** what each option means concretely; what happened to the plan (absorbed, not deleted); zero interrogation about why they were away.
- **Required:** one choice tap. **Optional:** "anything you want to note?" (private, skippable).
- **Errors/Offline:** conversation is local-state-driven; fully offline.
- **Accessibility:** three options max, full-sentence labels.
- **Done =** re-entry action available today; `recovery_path_chosen` recorded; the comeback begun.

## F13 — Returning after a long absence (7+ days)
- **Intent:** "Can I even come back?" · **Entry:** app open in `lapsed_long`; or the ~day-8 invitation.
- **Steps:** (1) fresh-start re-entry conversation: what still stands (everything completed), honest options; (2) options: *fresh-start week* (lightened authored week, journey continues) / *restart the programme* (new instance, history honoured) / *switch programmes* / *pause*; (3) execute with a genuine fresh-start frame (temporal landmark — "this week is a clean page").
- **Decisions:** path; all reversible except none — even restart preserves history.
- **Guidance:** explicitly counters the abstinence-violation spiral: the absence is framed situationally, capability retained is named ("weeks 1–4 built X — that's still yours").
- **Required:** one choice. **Optional:** private note.
- **Errors/Offline:** standard. **Accessibility:** standard.
- **Done =** re-entered on a chosen path; no failure ledger anywhere.

## F14 — Pausing / F14a — Resuming
- **Intent:** "Life needs the space; hold my place." · **Entry:** recovery conversations; Journey; Profile.
- **Steps (pause):** (1) pause sheet: what pausing does (clock stops, nothing decays), optional return-nudge date; (2) confirm. **Steps (resume):** (1) return (own volition or nudge) → resume ritual: where you were, what's first, light re-entry option; (2) continue.
- **Decisions:** return date (optional); re-entry lane on resume.
- **Guidance:** pause framed as a legitimate act of planning, not surrender.
- **Required:** confirmation. **Optional:** return date, note.
- **Errors/Offline:** local-first. **Accessibility:** standard.
- **Done =** `paused` honestly; resume returns to `active` with dignity.

## F15 — Changing notification preferences
- **Intent:** "Make the app fit my life/attention." · **Entry:** Profile → Notifications; also inline "adjust reminders" wherever a notification lands badly (every notification's long-press/settings affordance).
- **Steps:** (1) per-type toggles (daily reminder / weekly review / recovery invitations / milestones) with plain descriptions of exactly when each fires; (2) time pickers where relevant; (3) OS-permission handling: if OS-denied, explain + deep-link to system settings.
- **Decisions:** granular per type.
- **Guidance:** honest defaults ("we suggest just the daily reminder"); no dark nudging toward more.
- **Required:** none. **Optional:** everything.
- **Errors:** permission denied → app-level prefs still saved; states clearly shown.
- **Offline:** local, syncs.
- **Accessibility:** toggles labelled with consequence, not just name (G8: reachable ≤2 taps from Today).
- **Done =** notifications match stated intent; opt-out fully respected.

## F16 — Purchasing premium access ⚠ Q5/Q6 model
- **Intent:** "Unlock the journey — knowingly." · **Entry:** entitlement boundary (per decided model), never interstitial ambush.
- **Steps:** (1) paywall per [paywall-principles](../05-commercial/paywall-principles.md): what's included (concretely), plans with **full renewal price most prominent**, billing period, renewal statement, cancellation how-to, restore link, continue-free path where the model has one; (2) store purchase sheet; (3) confirmation: what just happened, when renewal is, where to manage.
- **Decisions:** plan; proceed/decline (declining is graceful — no re-ask loop that session).
- **Guidance:** the paywall explains rather than pressures; intro pricing (if any ⚠Q5) shown with honest terms.
- **Required:** store authentication (platform).
- **Optional:** nothing — no pre-ticked anything.
- **Errors:** store failures in plain words + retry; pending states (family approval, payment method) explained; no double-charge paths (idempotent server verification).
- **Offline:** paywall visible with cached copy; purchase requires connection, stated simply.
- **Accessibility:** G9 comprehension bar (5/5 in testing state price/period/renewal/cancel); price text real text, never imagery.
- **Done =** entitlement active + user can state what they bought; or declined with dignity.

## F17 — Restoring purchases
- **Intent:** "I already paid — recognise me." · **Entry:** paywall link; Profile → Subscription; first-launch "I have an account".
- **Steps:** (1) restore tap → store restore + server entitlement sync; (2) result: restored (what + until when) / nothing-found (what that means: different store account? different sign-in? → specific next steps + support).
- **Required:** platform auth. **Errors:** each failure mode named (wrong Apple ID/Google account guidance). **Offline:** requires connection, said plainly.
- **Accessibility:** standard. 
- **Done =** entitlement state truthful on this device.

## F18 — Subscription expiry / cancellation aftermath
- **Intent (user):** varies — lapsed card, deliberate cancel, considering return. · **Entry:** entitlement lapse event.
- **Steps:** (1) state banner (calm, factual: "your access ended <date>"); (2) what still works: **all of the user's own data — journey history, reviews, evidence, export — remains readable** (FR-71: no hostage-taking); guidance content re-locks; (3) paths: renew (F16), export (F19), or simply continue viewing history.
- **Guidance:** no guilt, no countdown, no "we miss you" theatre; billing-grace states (store retry windows) explained factually.
- **Errors:** entitlement flapping (store lag) → benefit of the doubt for the grace period.
- **Offline:** cached entitlement honoured through grace window.
- **Done =** user retains their property; renewal is a clean, informed choice.

## F19 — Exporting data
- **Intent:** "Give me my journey." · **Entry:** Profile → Account → Export.
- **Steps:** (1) what the export contains (everything of theirs: challenges, completions, reviews, measurements, evidence files, reports) and formats (JSON + readable HTML/PDF summary); (2) generate → share sheet / save (platform-native).
- **Required:** confirmation. **Errors:** large-media exports chunked; failures resumable. **Offline:** local data exports offline; server-held remainder queues.
- **Accessibility:** export artefacts themselves meet accessibility basics (tagged HTML summary).
- **Done =** portable, complete, human-readable property in the user's hands (FR-34).

## F20 — Deleting an account
- **Intent:** "Leave, completely." · **Entry:** Profile → Account → Delete.
- **Steps:** (1) what deletion means (all data, irreversibly, incl. server + entitlement note: store subscription must be cancelled in store settings — with the link — deletion here doesn't stop store billing: said in bold plain language); (2) offer export first (one tap, skippable); (3) confirm (typed/biometric per platform norms); (4) done screen: what was deleted, subscription reminder repeated.
- **Decisions:** export first?; final confirm.
- **Guidance:** zero retention theatrics; no "are you sure" guilt copy; the store-billing distinction is the one thing repeated (the classic user-harm in this category).
- **Required:** explicit confirmation. 
- **Errors:** server unreachable → queued deletion with clear promise + email confirmation when executed.
- **Offline:** initiates only online (needs authoritative execution), explained.
- **Accessibility:** confirmation not gesture-gated only.
- **Done =** account + data erased per retention policy (Apple 5.1.1(v)/Play policy); web path exists too (PSR-02).

## F21 — Completing the weekly review
- **Intent:** "Make sense of my week." · **Entry:** Journey (review-ready state); Today prompt on review day; notification if enabled.
- **Steps:** (1) the week reflected back first — *the app does the noticing*: completions, variant pattern, milestone, adaptation applied ("here's what your week looked like"); (2) 2–3 structured prompts (programme-authored, tap-first answers with optional elaboration); (3) one optional free-text ("anything worth keeping?"); (4) next week preview incl. any adaptation (R1–R7) with accept/decline; (5) close.
- **Decisions:** adaptation accept/decline; skip entirely (allowed, no penalty, quietly re-offered once).
- **Required:** none strictly — completing it is the value, not the extraction (<5 min, G-criteria).
- **Optional:** free-text; every prompt individually skippable.
- **Errors/Offline:** drafts local; full offline.
- **Accessibility:** prompts one-at-a-time; dictation-friendly free text.
- **Done =** week closed with meaning; next week shaped; `weekly_review_completed`.

## F22 — Completing week 12
- **Intent:** "Finish. Feel it. Know what's true." · **Entry:** final checkpoint completion (or completion-rule satisfaction).
- **Steps:** per [week-12 spec](week-12-completion-experience.md): (1) the finish moment (signature experience candidate — Stage 3); (2) the report assembled (evidence model §7): the goal in their words → what they did → what changed (honest evidence) → the comeback story → programme's honest outcome statement; (3) keep/export/share (explicit only); (4) week-13 transition (F23).
- **Decisions:** share or not (private default); transition choice.
- **Required:** none. **Optional:** a closing reflection.
- **Errors/Offline:** report generation local-first.
- **Accessibility:** report fully readable by screen reader; celebration honours reduced-motion (a *still* form of the moment exists and is equally considered).
- **Done =** `completed`; the user owns proof of twelve weeks.

## F23 — Selecting what happens next (week 13) ⚠ Q13
- **Intent:** "Don't let this evaporate." · **Entry:** from the report; Journey post-completion; Explore hub.
- **Steps:** (1) honest transition frame: what tends to happen after a finish, options; (2) paths: *next journey* (guided selection — different goal welcome; same-programme second cycle where the programme supports it) / *maintenance mode* (lighter authored continuation ⚠Q13 scope) / *a clean end* (fully legitimate; export offered; notifications wind down respectfully); (3) chosen path begins with its own small ritual.
- **Decisions:** the path — none is penalised.
- **Guidance:** no retention desperation; the clean-end path is as well-designed as the upsell path (that *is* the brand).
- **Required:** one choice (or none — no choice = quiet default to clean end after 30 days).
- **Errors/Offline:** standard.
- **Accessibility:** standard.
- **Done =** `transitioned` with intent; R-01 measured by `next_journey_selected`, earned honestly.

---

## Flow-coverage matrix (Gate-4 checklist source)

Every flow above must show, in wireframes: loading, empty, error, offline, permission-denied (where OS permissions touch), entitlement-expired variant, large-text (200%) layout, dark mode, reduced-motion behaviour, small-phone and large-phone layouts, and interruption/resume. The matrix lives as a checklist in `09-quality/release-checklist.md` and blocks Gate 4→5.
