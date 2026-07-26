# Known Risks — Atelier Refinement

Stated plainly so the next phase inherits questions, not surprises.

## Design risks

1. **First-sight comprehension of the cloth is unproven with real users.** Every comprehension claim in this pass rests on synthetic critique. The legend and plain-text pairing are mitigations, not proof. This is the single risk that could overturn D-R1 — test it first, with 60–75-year-old participants.
2. **The 200% re-rank threshold is binary in the prototype.** Real platforms scale continuously (Dynamic Type, Android non-linear scaling); the point where Today re-ranks (and whether there is an intermediate composition at ~150%) is undesigned.
3. **The folded why at 200% costs a tap** — if testing shows enlarged-text users never expand it, the first sentence carries all persuasion weight and must be written to that standard for every programme day, which is a real content-production constraint.
4. **Three destinations may hide Programme & Support.** Users trained by four-to-five-tab apps may not look bottom-right for membership or pause. Mitigation: recovery and commerce states deep-link into it; still needs observation.
5. **Atelier's warmth depends on texture restraint being maintained.** The density system is a budget; every future feature will ask to be "material". If everything is woven, nothing is.

## Technical risks

6. **Timer background/resume semantics remain prototype-grade** — wall-clock anchoring is demonstrated, but OS suspension, notification re-entry and cross-device resume are architecture work, not design work.
7. **Cross-screen motion continuity is still unvalidated** — the prototype re-renders per state; the thread-continuity moments (band strip → journey cloth) need a shared-element transition spike in the production framework before they are promised.
8. **SVG cloth rendering at scale** — 84 picks × legend × tablet rail sizes needs profiling on mid-tier Android; the mitigation (cache rendered rows as layers) is documented but unproven.
9. **Variable-font rendering on low-res Android** for Faustina at small sizes is flagged, not tested; the fallback decision (D-R9) has a named alternative but no on-device evidence yet.

## Process risks

10. **Single-critique-pass coverage.** This phase ran one internal critique pass (blockers/majors fixed) versus the exploration's ten. Acceptable for a refinement, but minor findings were consciously deferred and are listed in the refinement report.
11. **Fixture copy is still sprint copy.** Dosage, safety language and commerce terms improved through critique, but no clinician, coach, lawyer or App Store reviewer has approved anything.
12. **The prototype's accessibility evidence is automated + structural.** No live screen-reader session, no switch-access session, no real-device Dynamic Type run has happened. The clean axe report is necessary, not sufficient.
