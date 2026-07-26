# Handoff Standard

**Status:** Active instrument. Every completed work packet, review, and gate hands off in a consistent shape so that any role — including a founder with five minutes on a phone — can pick up the thread without archaeology. Async-first by design (delivery model §9).

## 1. The handoff note (attached to every substantial deliverable)

```
HANDOFF: WP-___ · deliverable: (paths)
1. WHAT CHANGED   — 3–6 sentences a colleague can absorb cold; lead with the outcome.
2. EVIDENCE       — what supports it: sources (dated, classified), checks run,
                    test/verification outputs. Claims without evidence are labelled
                    as hypothesis or removed.
3. LIMITATIONS    — what this work does NOT establish; known weak points;
                    anything time-sensitive that will go stale.
4. REGISTER UPDATES — decision log / risk register / correction log / dashboards /
                    open-decisions: which rows changed, in the same commit group.
5. OPEN QUESTIONS — surfaced but unresolved; routed to: (founder inbox | next packet |
                    escalation memo).
6. NEXT SENSIBLE STEP — one line; never a silent assumption that work continues.
```

## 2. Where handoffs live

The note travels in the pull request description (or packet record for non-repo work) — not in chat, which is not the system of record. The repository's registers are the accumulated state; the founder inbox document is the queue of things awaiting the founder; the weekly summary rolls both up.

## 3. Standards that make handoffs trustworthy

1. **Same-commit register discipline:** a deliverable that changes project state without updating its registers is incomplete — the reviewer bounces it.
2. **Traceability:** every quantitative or legal claim in a handoff carries its source/classification per the research standards; every recommendation carries its label (Professional recommendation / Unvalidated hypothesis / etc.).
3. **Honest stale-dating:** anything verified against a moving surface (store policy, prices, availability) carries its verified-on date.
4. **No cliff-hangers:** interrupted work hands off with a "resume here" note (state, next command/step, what's uncommitted) rather than an implicit mental state.
5. **Reviewer handoff:** reviews hand back with AC-by-AC verdicts and findings tied to lines/sections — "looks good" is not a review record.
6. **Gate handoff:** gates hand off with the founder record transcribed to the decision log and the next stage's first packets framed — a passed gate that changes no registers didn't happen.

## 4. The founder inbox

A single document (maintained by the product lead) listing, in priority order: decision memos awaiting the founder · escalations · scheduled gate packs with their read-by dates · FYI items that need no action. Each entry: one line + link + what-happens-if-ignored-by-date. Nothing else may claim founder attention; anything urgent enough to bypass the inbox is by definition a stop-condition event.
