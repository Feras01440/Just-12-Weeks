# Delivery Roadmap — Stages 0–12

**Status:** Draft — awaiting founder review.
**Rule:** No stage starts automatically. Every stage ends at an approval gate; the founder's sign-off is recorded in `00-foundation/decision-log.md` before the next stage begins. Durations are honest estimates for a founder-led project with limited budget, not promises.

A one-page summary of the whole roadmap:

| Stage | Name | Rough duration | Gate that ends it |
|-------|------|----------------|-------------------|
| 0 | Product discovery | done / this week | Founder answers foundation questions |
| 1 | User validation | 3–5 weeks | Evidence review: proceed / pivot / stop |
| 2 | Product architecture | 2–3 weeks | PRD + programme engine + scope approved |
| 3 | Brand & art direction | 2–3 weeks (overlaps 2) | One of three territories chosen |
| 4 | UX wireframes | 2–3 weeks | Core flows approved on paper |
| 5 | Interactive prototype | 2 weeks | Prototype tested with ≥5 target users |
| 6 | Technical foundation | 2–3 weeks | Walking skeleton runs on both platforms |
| 7 | MVP implementation | 8–12 weeks | Feature-complete against MVP scope |
| 8 | Internal testing | 2 weeks | Quality bar met (see 09-quality) |
| 9 | Private beta | 4–6 weeks | Beta metrics reviewed against thresholds |
| 10 | Store readiness | 2 weeks | Both store submissions accepted |
| 11 | Public launch | 1 week + | Launch checklist complete |
| 12 | Measurement & iteration | ongoing | Quarterly strategy reviews |

Stages 1–5 are cheap and reversible. The expensive commitment starts at Stage 6. Everything before it exists to make sure Stage 7 builds the right thing once.

---

## Stage 0 — Product discovery *(current stage)*

- **Objective:** Convert the founder's brief into an honest, reviewable product foundation.
- **Inputs:** Founder brief (handwritten PDF); market, policy and behavioural-evidence research.
- **Tasks:** Transcribe brief; synthesise concept; identify risks; form audience hypotheses; draft research plan; draft roadmap.
- **Deliverables:** `00-foundation/*`, `01-product/target-audiences.md`, `02-research/user-research-plan.md`, this roadmap.
- **Owner:** Product strategist (with founder).
- **Dependencies:** None.
- **Risks:** Founder skips the questions and asks for screens — the process collapses into vibe-coding.
- **Acceptance criteria:** Founder directions recorded (D-001–D-004, done 26 Jul 2026); founder has answered the remaining open questions (Q1–Q13 as updated, or explicitly delegated specific ones).
- **Approval gate:** Answers recorded in decision log. Documentation work that does not depend on the open answers proceeds with provisional, reversible recommendations (founder instruction, 26 Jul 2026); recruitment, spend and build do not start before the gate.

## Stage 1 — User validation

- **Objective:** Test the riskiest assumptions with real people before designing anything.
- **Inputs:** Chosen behavioural-pattern emphasis (Q2), research plan.
- **Tasks:** Recruit 9–12 interviewees across all four adult age bands (18–29, 30–49, 50–64, 65+ — quotas per research plan, D-001) with Pattern-A over-weight; run interviews; landing-page smoke test (value proposition + price sensitivity); log evidence per band and pattern.
- **Deliverables:** `02-research/validation-evidence.md`, updated audience doc, go/pivot/stop recommendation.
- **Owner:** Founder (interviews), strategist (script, synthesis).
- **Dependencies:** Stage 0 gate.
- **Risks:** Leading questions produce false positives; recruiting from friends biases results.
- **Acceptance criteria:** Every kill-signal and support-signal in the research plan has an evidenced verdict.
- **Approval gate:** Founder reviews evidence and decides: proceed as scoped / adjust segment or category / stop. Recorded in decision log.

## Stage 2 — Product architecture

- **Objective:** Specify what will be built: PRD, MVP scope, programme engine, success metrics.
- **Inputs:** Validation evidence; category and segment decisions.
- **Tasks:** Write PRD; define programme engine schema and lifecycles; set MVP boundaries and non-goals; define analytics events and target metrics; write content governance framework.
- **Deliverables:** `01-product/prd.md`, `scope.md`, `programme-engine.md`, `success-metrics.md`, `06-content/*`.
- **Owner:** Product strategist + content lead.
- **Dependencies:** Stage 1 gate.
- **Risks:** Scope creep back toward "12 programmes at launch"; engine over-generalised for programmes that don't exist yet.
- **Acceptance criteria:** MVP scope fits the content budget the founder confirmed in Q9; engine supports the launch categories without speculative abstraction.
- **Approval gate:** Founder approves PRD + scope.

## Stage 3 — Brand & art direction *(may overlap Stage 2)*

- **Objective:** Choose a brand direction from three genuinely distinct territories.
- **Inputs:** Positioning from Stages 1–2; naming constraints (Q10).
- **Tasks:** Brand strategy; three art-direction territories with typography/colour/motion philosophies; anti-generic audit checklist; name shortlist + preliminary trademark screen.
- **Deliverables:** `04-brand/*`.
- **Owner:** Brand designer.
- **Dependencies:** Stage 0 gate (positioning direction); benefits from Stage 1 evidence.
- **Risks:** Territories converge into variations of one idea; founder picks by taste alone without audience fit.
- **Acceptance criteria:** Three territories pass the "could not be mistaken for a generic habit app" test; each has stated audience and commercial fit.
- **Approval gate:** Founder selects one territory (may request one round of fusion/iteration).

## Stage 4 — UX wireframes

- **Objective:** Design the core flows at low fidelity, in the chosen direction's structure but without visual polish.
- **Inputs:** PRD, IA, engagement model, chosen brand territory.
- **Tasks:** Information architecture; all 20 core user flows (first launch → deletion); wireframes for every screen state (loading/empty/error/offline); accessibility annotations.
- **Deliverables:** `03-ux/*` complete; wireframe pack.
- **Owner:** UX director.
- **Dependencies:** Stage 2 + 3 gates.
- **Risks:** Fidelity creep (wireframes become unreviewable pretty pictures); flows designed only for the happy path.
- **Acceptance criteria:** Every flow includes error, empty, offline and recovery states; the "what makes this recognisably 12 Weeks" question has an answer per screen.
- **Approval gate:** Founder walks every core flow and approves.

## Stage 5 — Interactive prototype

- **Objective:** Test the experience with target users before writing production code.
- **Inputs:** Approved wireframes; brand direction.
- **Tasks:** Clickable prototype of first-launch → day-3 experience and one weekly review; usability tests with ≥5 target-segment users; paywall comprehension test.
- **Deliverables:** Prototype; usability findings; revised wireframes.
- **Owner:** UX director; founder observes sessions.
- **Dependencies:** Stage 4 gate.
- **Risks:** Testing with non-target users; treating polite praise as validation.
- **Acceptance criteria:** Users can explain the product promise, complete a daily action, and correctly state what the subscription costs and when it renews.
- **Approval gate:** Founder reviews findings; approves build scope.

## Stage 6 — Technical foundation

- **Objective:** Stand up the architecture skeleton: app shell, API, auth, data model, CI/CD, store accounts.
- **Inputs:** Architecture docs (07), tech ADR, security requirements (08).
- **Tasks:** Repo + CI/CD; walking skeleton on iOS and Android; auth; subscription sandbox integration; analytics plumbing with consent; crash reporting.
- **Deliverables:** Running skeleton; `07-architecture/*` finalised; developer onboarding doc.
- **Owner:** Software architect.
- **Dependencies:** Stage 2 gate (domain model), Stage 5 gate (build approval).
- **Risks:** Framework choice made by comfort rather than ADR; subscription integration left last (it must be first — it gates store review).
- **Acceptance criteria:** A test purchase, restore, and account deletion work end-to-end in sandbox on both platforms.
- **Approval gate:** Architecture review; founder informed of any cost commitments (services, accounts).

## Stage 7 — MVP implementation

- **Objective:** Build the MVP scope — nothing else.
- **Inputs:** Approved scope, design system, content for launch programme(s).
- **Tasks:** Feature build in vertical slices (a slice = flow complete with all states); content production in parallel; weekly founder demo.
- **Deliverables:** Feature-complete build; populated programme content; store metadata drafts.
- **Owner:** Engineering lead; content lead in parallel.
- **Dependencies:** Stage 6 gate.
- **Risks:** Scope creep ("just one more feature"); content lags code; quality states (offline/error) deferred and never done.
- **Acceptance criteria:** Every MVP flow passes its definition-of-done including offline, error, large-text and dark-mode states.
- **Approval gate:** Founder accepts feature-complete demo against the scope doc, line by line.

## Stage 8 — Internal testing

- **Objective:** Break it before users do.
- **Inputs:** Feature-complete build; test strategy (09).
- **Tasks:** Full test pass (unit/integration/E2E); accessibility audit; low-end Android device pass; subscription edge cases (refund, expiry, restore, family sharing); offline/sync abuse.
- **Deliverables:** Test report; fixed build; known-issues list.
- **Owner:** Engineering + external accessibility reviewer if budget allows.
- **Dependencies:** Stage 7 gate.
- **Risks:** Testing only on the founder's own device class; skipping subscription edge cases because sandbox is tedious.
- **Acceptance criteria:** Quality bar in `09-quality/release-checklist.md` met; zero known data-loss or billing bugs.
- **Approval gate:** Go/no-go for beta.

## Stage 9 — Private beta

- **Objective:** Real users, real weeks, real data — before the store audience sees it.
- **Inputs:** TestFlight / Play internal track build; 30–80 recruited beta users from the target segment.
- **Tasks:** Run at least 4 real weeks of usage; weekly metric review (activation, D1/D7 retention, weekly-review completion); interview drop-offs; iterate.
- **Deliverables:** Beta metrics report vs thresholds; prioritised fix list; testimonial permissions (real ones only).
- **Owner:** Founder + product.
- **Dependencies:** Stage 8 gate.
- **Risks:** Beta users are friends who behave unrepresentatively; reading week-1 enthusiasm as retention.
- **Acceptance criteria:** Pre-agreed thresholds met (set in Stage 2 metrics doc) or a documented decision to adjust and re-test.
- **Approval gate:** Founder decides: launch / iterate / extend beta.

## Stage 10 — Store readiness

- **Objective:** Pass App Store and Play review first time, honestly.
- **Inputs:** Beta-hardened build; store policy checklist (08/09).
- **Tasks:** Privacy nutrition labels + Data safety form; screenshots and store copy (no fake claims); age rating; account-deletion path verified; subscription disclosures verified; submit.
- **Deliverables:** Approved store listings on both platforms.
- **Owner:** Engineering + product.
- **Dependencies:** Stage 9 gate.
- **Risks:** Rejection for subscription-disclosure or health-claim issues; screenshots overpromising.
- **Acceptance criteria:** Both stores approved; listing copy matches claims policy.
- **Approval gate:** Founder presses the release button — literally.

## Stage 11 — Public launch

- **Objective:** Controlled, measured release.
- **Inputs:** Approved store listings; launch checklist; support inbox ready.
- **Tasks:** Phased rollout (Play staged rollout, App Store phased release); monitor crashes, reviews, refunds daily; respond to every review in week 1.
- **Deliverables:** Live product; day-7 launch report.
- **Owner:** Founder + engineering on-call.
- **Dependencies:** Stage 10 gate.
- **Risks:** Marketing spend before retention is proven; ignoring early refund signals.
- **Acceptance criteria:** Crash-free rate and billing integrity hold through rollout.
- **Approval gate:** Rollout to 100%.

## Stage 12 — Measurement & iteration

- **Objective:** Learn what the first cohort's 12 weeks actually show, then decide what's next.
- **Inputs:** Analytics (23-spec events); reviews; support themes.
- **Tasks:** Weekly metric review; first full-cohort completion analysis at week 13; pricing experiment (per 05-commercial plan); decide programme #2 based on demand evidence.
- **Deliverables:** Quarterly strategy review; updated roadmap.
- **Owner:** Founder + product.
- **Dependencies:** Stage 11.
- **Risks:** Chasing new features instead of fixing the completion funnel; the week-12 churn cliff going unmanaged.
- **Acceptance criteria:** n/a — ongoing, reviewed quarterly.
- **Approval gate:** Quarterly.
