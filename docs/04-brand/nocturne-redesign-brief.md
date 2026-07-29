# Nocturne Redesign Brief

**Trigger (recorded honestly):** the founder walkthrough rejected the refined Atelier visual system — "lacks creativity, infographics, modern graphic images, smooth transitions and animations; the journey display is confusing and not aesthetically pleasing." The critique is accepted: the warm-cream/serif/terracotta territory is a recognised AI-default look, and the woven-cloth journey failed its first real first-sight comprehension test — the exact risk `design-refinement/KNOWN-RISKS.md` ranked first. The founder supplied a binding design system specification (modern OLED-dark, Structured/Obsidian/Craft/Flighty calibre); this pass executes it.

**What is kept (product truths, not pixels):** guidance-first with one unmistakable primary action; literal controls (Begin · Show me how · Something gentler today · Change my weekly days · Pause the programme); recovery without shame — kept days stay kept, missed days stay open and can be made up, "counts in full"; both programme worlds on one structure; wall-clock timers; reduced-motion equivalence; the 12-week/84-day model.

**What is replaced:** the entire visual language — palette, typography, texture, journey visualisation, motion character. Atelier remains archived on its own branches/PRs as the record.

## The system (founder-specified, applied semantically)

- **Surfaces:** `#09090B` background · `#121215` panels with a 1px white/10 top highlight · `#1C1C21` hover/active · hairline borders `white/[0.08]` · `rounded-2xl/3xl` · deep soft shadows.
- **Accents as meaning:** Emerald `#10B981` = the strength world's light · Electric Indigo `#6366F1` = the writing world's light · Sunset Amber `#F59E0B` = mended days and care moments. Glow is reserved for *earned* things: kept days, the current position, the primary action.
- **Text:** `#FAFAFA` / `#A1A1AA` / `#52525B`.
- **Type:** Geist (fallback Plus Jakarta Sans) for display and UI, −0.02em on headings; Geist Mono (fallback JetBrains Mono) for every numeral, timer, timestamp and meta label. Scale: 24 bold title · 14 medium section · 14 body · 12 mono meta.
- **Grid:** strict 8px; gaps 8/12/16/24.

## Signature — the Lightline

Progress rendered literally as accumulated light. One element, three scales:
1. **Today (mini):** a 12-segment horizontal spine under the header — completed weeks lit, current segment glowing, mono position beside it (`DAY 16 / 84`).
2. **Journey (full):** a vertical timeline with a subtle glowing axis; each week a panel — number, theme, seven day cells (filled = kept · amber ring = made up later · dim outline = open · hollow = not open yet), micro progress bar, plain status line. Header: large mono day counter, overall bar, stat chips (kept · mended · remaining). A compact legend pairs every cell state with words.
3. **Week 12 (constellation):** all 84 cells assemble in a staggered reveal into the finished record — the completion artefact, exportable.

## Motion (orchestrated, not scattered)

Page-load: 60ms-staggered rise-and-fade of panels; Lightline draws in once. Completion: the day cell kindles — glow ripple, fill, week bar increments. Mend: amber ring ignites over the open cell. Week transition: current segment hands its glow to the next. Week 12: the constellation assembly. Micro-interactions: hover lift + border brighten, pressed scale 0.98. All interruptible; reduced motion renders completed states instantly; no confetti, no parallax.

## Structure

Phone: bottom tab bar (Today · Journey · Settings) with glow indicator. ≥1024px: collapsible sidebar. ⌘K quick-switcher (Today / Journey / Settings / Begin). Drag handles are omitted — nothing in this product reorders; a fake affordance would be dashboard theatre.

## Output format

React + Tailwind CSS + Lucide icons (founder-specified), Vite-built, in `design-nocturne/`; dark OLED is the designed default. Screenshot matrix and axe-core audit regenerate from the running app, as with every previous phase.
