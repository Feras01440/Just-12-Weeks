# Device Matrix

**Status:** Draft for Gate 6; exact models refreshed at Stage 6 purchase time (the *tiers* are the stable content). Principle: the app is judged on the **worst device a real target user plausibly owns** — D-001's audience includes hand-me-down and budget Android as first-class citizens (T8 lesson).

## Physical lab (owned devices, the enforcement tier)

| Tier | Class | Example profile (2026) | Why it gates |
|------|-------|------------------------|--------------|
| P1 | **Low-end Android reference** | Entry-tier (~£100–150 class): 3–4GB RAM, weak GPU, 720p-class LCD, low-DPI | **The performance budget device** (NFR-02 gates here); serif/type rendering honesty; media decode reality |
| P2 | Mid Android | ~£250–350 class, 1080p OLED | The volume Android experience |
| P3 | Flagship Android | Current Pixel/Samsung flagship | Predictive back, 120Hz motion, latest OS behaviours |
| P4 | Small iPhone | Smallest current-supported iPhone (SE-class/mini legacy size) | Layout floor, one-handed reach truth |
| P5 | Large iPhone | Current Pro Max class | Reachability, large-type interplay, ProMotion motion QA |
| P6 | Older iPhone | Oldest OS-supported model (~4–5 years old) | Thermal/perf honesty on the long tail |
| P7 | Tablets (one iPad, one Android tablet) | Current base iPad + mid Android tablet | NFR-09 adaptive-layout verification |

## Cloud device farm (breadth tier)

Nightly E2E + visual suites across ~12 additional profiles: OS versions (current, current−1, current−2 = support floor), manufacturer skins (Samsung OneUI, Xiaomi-class aggressive battery managers — notification-delivery reality testing), screen-size outliers, RTL-readiness smoke (future-proofing only).

## OS support policy *(Professional recommendation)*

iOS: current−2 majors. Android: API level covering ~90%+ of active UK devices at launch (decided precisely at Stage 6 with then-current distribution data); minimum spec honesty published in store listings (claims-policy: we say what we actually support).

## Special test conditions bound to devices

P1 additionally runs: battery-saver mode suites (background sync, notification delivery under Doze-class restrictions), storage-nearly-full, throttled-network profiles (3G-class, lossy). P4 runs the one-handed protocol (G7). P6 runs thermal-sustained sessions (a 25-minute guided action shouldn't cook an old phone). All physical tiers run both themes, 100%/200% text, reduced-motion.

## Accessibility hardware

At least one physical device permanently configured: VoiceOver-primary (P5), TalkBack-primary (P2), switch-control profile available; external keyboard paired for operability passes (accessibility-test-plan owns the protocol; this matrix guarantees the hardware exists and stays configured).

## Maintenance

Matrix reviewed at each OS season (WWDC/IO) and before Stages 8/10; device purchases are a named Q9 budget line (~£1.5–2.5k initial lab — cheaper than one week of guessing).
