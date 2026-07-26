# Design State Matrix — 33 Required Experiences × 3 Directions

**Status:** exploratory evidence index. Every cell below is implemented and executable in the lab (`design-lab/`), for **both** programme worlds, addressable by URL: `#/{a|b|c}/{strength|writing}/{state-id}`. Screenshots: `design-lab/screenshots/{a|b|c}/…`; side-by-side: `design-lab/reports/comparison-index.html`.

Difficult states (20–27, 32–33) are demonstrated as designed screens, not written notes.

| # | State (`id`) | A · Quarto expresses it as | B · Meridian expresses it as | C · Atelier expresses it as |
|---|---|---|---|---|
| 1 | First launch (`first-launch`) | Half-title page: “Twelve Weeks”, epigraph, Begin | The instrument presented: name engraved, rail at zero | The bare warp: twelve rows strung, waiting |
| 2 | Product explanation (`explanation`) | Front matter: three numbered paragraphs | Three indexed points with mono indices | Three points with thread marks |
| 3 | Programme exploration (`explore`) | The catalogue: programmes as book entries | Instrument cards with spec lines | Cloth swatches woven in each programme’s dye |
| 4 | Suitability & expectations (`suitability`) | The particulars page; rubricated “Worth knowing” | Spec sheet; bordered CAUTION plate | Warm particulars; labelled “Worth knowing” note |
| 5 | Starting the journey (`start-journey`) | Contents with chapters I–III cut, rest uncut | Traverse opens; detent 01 highlighted | The loom strung; “the first thread is tomorrow’s” |
| 6 | Today’s primary action (`today`) | Today’s page: kicker, title, one Begin | The reading: face, action, ARM bar | Band + kicker + title + Begin thread |
| 7 | Why this matters (`why`) | Why page with pull-quote milestone | WHY panel beneath the reading | Why page, milestone as selvedge note |
| 8 | Show me how (`how`) | Numbered steps with italic details | Procedure 01–05 with safety plate | Steps in Faustina with drawn numerals |
| 9 | Preparation (`prep`) | Ballot-box checklist (☐→☑) | Square-toggle checklist | Soft checklist with thread ticks |
| 10 | Easier alternative (`easier`) | “The gentler form — counts in full” | Alternative reading, flag COUNTS IN FULL | The lighter thread, mend-gold flag |
| 11 | Advanced alternative (`advanced`) | “The further form” with caution note | Extended reading, same plate pattern | The further thread |
| 12 | Beginning an activity (`begin`) | Session plan with leader dots | Session plan, mono durations, ARM | Plan rows + Start |
| 13 | Activity in progress (`active`) | Timer in display serif; rule inks in | Bezel timer, huge mono digits | Thread draws as time passes |
| 14 | Pausing (`paused`) | “Paused” — the page holds still | HOLD state on the bezel | The shuttle rests; thread holds |
| 15 | Completing an action (`complete`) | The day’s stamp pressed | Log line prints, RECORDED | The pick draws into the cloth |
| 16 | Contextual question (`question`) | One italic question, three options | One question, three controls | One question, three soft options |
| 17 | Progress acknowledgement (`acknowledge`) | “Day 16 is yours.” + folio | Entry added; rail advances a tick | Row grows; day counted |
| 18 | Twelve-week journey (`journey`) | The table of contents | The vertical rail with recorded log | The loom: cloth + bare warp |
| 19 | Week transition (`week-transition`) | Chapter opener: numeral, title, epigraph | Detent advance 03→04 | Row beat-up; next row’s warp |
| 20 | Missing one day (`missed-one`) | “A quiet day” — em-dash in the margin | “NO READING YESTERDAY” log line | A space in the cloth; pick up the thread |
| 21 | Missing several days (`missed-several`) | Either/or page with ornament | Two re-entry options as controls | The gap span; the cloth holds |
| 22 | Longer absence (`long-absence`) | “Where you left off” + ribbon + 3 capacities | RECALIBRATE: capacity dial Low/Steady/Full | TIE BACK ON: cloth intact + capacities |
| 23 | Programme pause (`programme-pause`) | “Paused, on purpose” — an interval | STANDBY: face dims, place kept | The loom at rest; cloth rolled safely |
| 24 | Offline (`offline`) | Letterpress banner over a working Today | STATUS: OFFLINE plate; instrument works | Labelled note; the loom is in your hands |
| 25 | Loading (`loading`) | Unset type: faint text-rule ghosts | Warming up: `— — : — —` readouts | Warp shimmer ghost lines |
| 26 | Error (`error`) | The errata slip | FAULT — OUR SIDE plate | A knot, not a break |
| 27 | Not yet available (`empty`) | Uncut pages | NEXT DETENT SEALED | Warp not yet strung |
| 28 | Week-12 completion (`week-12`) | XII/XII, gilt edge, colophon | Rail complete 12/12 | The band unrolls, selvedge added |
| 29 | Completion artefact (`artefact`) | Record of Capability as a book plate | The Instrument Log | The finished cloth as a kept object |
| 30 | Next-journey handover (`handover`) | The catalogue reopens; rest week flagged | Next traverse options; REST recommended | Rest the loom / re-string it |
| 31 | Subscription presentation (`subscription`) | “The honest page” | Plain-mono price; numbered terms | “If you cancel, the cloth is yours to keep” |
| 32 | Expired subscription (`expired`) | Lapsed — record stays readable | Lapsed — log stays yours, renew or export | Cloth intact; renew or export |
| 33 | Restore purchase (`restore`) | One-tap restore + confirmation | RESTORE control + restored state | Restore + restored confirmation |
| — | Type specimen (`specimen`, lab extra) | Fraunces hierarchy proof | Archivo/Plex Mono proof | Bricolage/Faustina proof |

## Cross-direction invariants (same in all three)

- Exactly **one** filled primary action per screen; alternatives are quiet but equal-legibility.
- The easier alternative always carries the words **“counts in full.”**
- Missed time is never red, never emptied, never counted against the user.
- Offline and expired states preserve access to everything already earned.
- Every state has a text description of position (“Week 3 of 12 · day 16 of 84”) independent of any graphic.
- All flows are operable by keyboard in the lab; toggles expose `aria-pressed`; timers use `role="timer"`; errors `role="alert"`; loading `role="status"`.

## Interactive flows wired in the lab (not just addressable states)

`today → begin → active ⇄ paused → complete → question → acknowledge → journey` is a live loop in every direction (timers actually run); `explore → suitability → start-journey`, recovery choices → `today`, `expired → subscription`, and `restore → restored` are wired likewise.
