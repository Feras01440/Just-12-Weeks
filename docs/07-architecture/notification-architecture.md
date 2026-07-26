# Notification Architecture

**Status:** Draft for Gate 6. The plumbing behind FR-60's promises: few, purposeful, user-controlled, never manipulative. The engagement model's ethics are enforced here structurally — the system *cannot* send what the product must not send.

## 1. The notification catalogue (closed set)

| Type | Trigger | Default | Cadence cap |
|------|---------|---------|-------------|
| `daily_action` | User-chosen time, active challenge, today incomplete | On (time user-set at F06) | ≤1/day |
| `weekly_review` | Review-ready, user's review day | On | ≤1/week |
| `recovery_invitation` | `lapsed_short` entry | On | 1 per lapse episode |
| `fresh_start_invitation` | `lapsed_long` ~day 8 | On | 1 per episode |
| `quiet_check` | ~day 21 of absence | On | 1 per episode, then silence |
| `milestone` | Milestone achieved | On | Event-driven, rare |
| `renewal_reminder` | ~7 days pre-renewal (quarterly/annual); trial day-5 | **Non-optional while subscribed** (honesty commitment E9) | Per term |
| `pause_return` | User-set return date | Only if user set one | 1 |
| `report_ready` | Week-12 report assembled | On | 1 |
| `account_critical` | Deletion confirmation, security events | Non-optional (transactional) | Rare |

**The closed-set rule:** adding any type requires a decision-log entry testing it against the engagement ethics (no re-engagement bait, no guilt hooks, no marketing pushes — win-back campaigns are structurally absent; lifecycle §5). The dispatcher refuses types not in the registry.

## 2. Pipeline

Server-side scheduler (jobs container) computes send decisions from: challenge state + `NotificationPreference` + user timezone + the cadence caps — then dispatches via APNs/FCM. Device-side fallback: the daily reminder also schedules locally (offline resilience — a user in airplane-mode week still gets their chosen reminder); local and remote reconcile by type+date key (no doubles).

## 3. Rules that are architecture, not copy

1. **Preference enforcement at dispatch**, not at scheduling — a toggle flipped mid-day kills tonight's send.
2. **Quiet hours:** nothing sends 21:30–08:00 local except `account_critical`; user-chosen times override within their day.
3. **Payload privacy (NFR-04):** no goal wording, no measurements, no lapse framing in lock-screen text ("Today: 20 minutes" — never "You've missed 4 days of your weight-loss plan"). Sensitive context stays behind the tap.
4. **Deep links** land exactly on the intended surface (navigation §2.5) with graceful fallback when state moved on (review already done → Journey, silently).
5. **Silence states are guaranteed:** `abandoned` and post-`quiet_check` absences send *nothing* by construction (state-machine-gated dispatch); `completed` without transition sends nothing after the report notice.
6. **Every send audited** (type, decision inputs hash, delivered/failed) — the opt-out guardrail metric (success-metrics) reads from this, and any future accusation of nagging is answerable with data.
7. **Permission choreography (PSR-03):** OS permission requested in context (after first value, before first reminder would fire), never at first open; denial respected silently (in-app surfaces carry the load) with a re-ask only at a user-initiated settings visit.

## 4. Failure honesty

Push is best-effort by nature: the product never *depends* on notification delivery (Today always self-explains; lapse detection is state-based, not notification-based). Delivery failures degrade to nothing louder — no SMS fallbacks, no email nagging (email is transactional-only: account, deletion, renewal receipts).
