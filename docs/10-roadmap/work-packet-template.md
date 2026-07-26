# Work Packet Template

**Status:** Active instrument (delivery operating model §2). A work packet is the unit of delegated work: small enough to review honestly, complete enough to execute autonomously. Copy the skeleton; delete guidance notes in use.

---

```
PACKET: WP-___  ·  Title: ___________________
Date opened:            Target window:
Product lead:           Implementer:
Independent reviewer:   (must not be the implementer for substantial work)
Specialist review:      none | security | content | accessibility  (which surfaces trigger it)

1. OBJECTIVE
One paragraph: what exists when this packet is done, and why it matters now.

2. CONTEXT & INPUTS
- Governing decisions/constraints: (D-refs, non-goals, gate caps that bind this work)
- Source documents: (paths)
- Prior work to build on, not duplicate: (paths)

3. SCOPE
In scope: …
Out of scope: …  (drift past this line = new packet, not silent expansion)
Decision class touched: routine | reversible-with-record | costly-to-reverse | founder-reserved
  (If founder-reserved: this packet PREPARES the decision memo; it does not decide.)

4. REQUIRED EVIDENCE
What the deliverable must carry to be checkable:
- sources with dates/classifications (research packets)
- checks run and their outputs (engineering/analysis packets)
- limitations stated honestly
- registers to update (decision log / risk / correction / dashboard)

5. ACCEPTANCE CRITERIA
Numbered, testable, written BEFORE execution:
AC1 …
AC2 …
AC3 Standing instruments pass: labels convention · claims policy · lexicons ·
    attribution policy (CONTRIBUTING) · privacy rules — as applicable.

6. BUDGET & TOOLS
Spend authorised by this packet: £0 unless stated (gate cap reference: ___)
Tools/services used: (register-compliant only)

7. RISKS & STOP CONDITIONS
Known risks in this packet: …
Stop and escalate if: … (beyond the standing stop conditions)

8. HANDOFF
Deliverable paths: …
Handoff note per handoff-standard.md: summary · evidence · limitations ·
register updates made · open questions surfaced.

--- REVIEW (completed by independent reviewer) ---
AC verdicts: AC1 pass/fail(why) …
Standing-instrument findings: …
Material disagreements & resolution: …
Verdict: accept | revise (returned) | escalate
Reviewer:            Date:
```

---

## Sizing guidance

A packet should be completable in one focused execution session and reviewable in ≤45 minutes. Bigger ambitions become packet *sequences* with their own mini-gate. Packets that touch founder-reserved decisions produce **decision memos** (question, options, evidence, recommendation, deadline) as their deliverable — never the decision itself.
