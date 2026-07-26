# Content Delivery Architecture

**Status:** Draft for Gate 6. How authored programmes reach devices: immutable bundles, offline weeks, honest bandwidth behaviour.

## 1. The bundle model

A published `ProgrammeVersion` compiles (publishing pipeline, ADR-002) into an **immutable, content-addressed bundle**: `structure.json` (the engine schema instance) + media manifest (assets by content hash, with variants) + integrity signature. Bundles are the *only* content transport — no app-baked programmes (content updates without app releases; FR-81/82 depend on this), no CMS-live-queries at runtime (offline-first forbids it).

## 2. Delivery flow

1. Sync response carries the challenge's **week manifest**: current week + 1 lookahead (NFR-03), listing structure slice + media asset refs with sizes.
2. App fetches via CDN: structure first (tiny, immediate), media opportunistically — **Wi-Fi-preferred for video by default** (user-overridable), always-fetch for illustrated/audio essentials (every action's text+illustrated path must be present before its day arrives — the "media never blocks guidance" rule F07 depends on).
3. Cache management: current + next week pinned; past weeks' media evicted (structure retained for Journey); total content cache budget ~200MB with LRU beyond pins; cache state visible in Profile diagnostics only (no anxiety UI).
4. Version integrity: a challenge's week always assembles from its pinned version's hashes (versioning §5 — no mixed weeks); PATCH hotfixes swap assets by manifest update with the same guarantee.

## 3. Media pipeline (authoring side)

Ingest → transcode ladder (video: 2–3 bitrates topping at phone-honest 1080p; audio: AAC; images: modern formats with fallbacks) → caption/transcript attachment **enforced at build** (a video without its transcript fails compilation — accessibility as pipeline law, not review hope) → hash → manifest. Demonstration media budgets per programme (authoring model §4) keep bundle totals honest: target ≤400MB full-programme media, ≤60MB per week typical.

## 4. Emergency paths

Kill-switch (FR-82): manifests are re-signed with removal flags + fallback refs; CDN invalidation on the manifest only (content-addressed assets never mutate); apps honour removal flags at next sync **and** at next player-open for the flagged day (two checkpoints — a user mid-week offline still gets the fallback at open if the flag arrived in any earlier sync; a fully-offline user is reached at first reconnection, which is the honest physical limit, stated in the incident playbook).

## 5. Cost & performance honesty

CDN egress at founder scale is trivial (thousands of users × ≤60MB/week worst-case); the real budgets are *device-side*: download scheduling respects battery/network (NFR-08 — batched, connectivity-aware), low-end Android decode tested per device matrix, and cold-start never blocks on content fetches (bundled orientation content covers the first-open path). Metrics: media-fetch failure rate, week-ready-before-week-start rate (target ≥99% for connected users), cache-eviction churn.
