// ATELIER — refined single-direction prototype.
// Governing idea: twelve weeks weave a cloth — every day adds a thread, and
// the cloth holds even where a thread is missed. Progress is accumulated
// material; a missed day stays visibly open until it is mended in gold; the
// finished band is a kept object.
// Operating rule (hard): no user needs weaving vocabulary to operate
// anything — functional controls are literal, the metaphor lives in
// identity, progress expression, recovery and completion.

import { html, raw, mmss, makeTicker, makeTimeout, reducedMotion } from './dom.js';
import { WORLDS } from './fixtures.js';

// Session + choice state shared across screens. `elapsed` pre-seeded so
// deep-linking straight to active/paused shows a mid-session reading; the
// `begin` screen resets it to 0.
const mem = { elapsed: 277, prepDone: new Set(), choice: 1, restored: false };

// ————— deterministic hand-made irregularity (no Math.random) —————

function jitA(i) { return ((i * 37) % 5) - 2; }
function jitB(i) { return ((i * 53) % 5) - 2; }
function jitC(i) { return ((i * 29) % 3) - 1; }

// ————— log arithmetic —————

function wovenCount(log) {
  let n = 0;
  for (const wk of log) for (const d of wk) if (d === 'done' || d === 'mended' || d === 'rest') n++;
  return n;
}
function mendCount(log) {
  let n = 0;
  for (const wk of log) for (const d of wk) if (d === 'mended') n++;
  return n;
}
function openCount(log) {
  let n = 0;
  for (const wk of log) for (const d of wk) if (d === 'missed') n++;
  return n;
}
function cloneLog(log) { return log.map((wk) => wk.slice()); }
function backFrom(week, day, steps) {
  let w = week, d = day;
  while (steps-- > 0) {
    d -= 1;
    if (d < 1) { w -= 1; d = 7; }
    if (w < 1) return null;
  }
  return { w, d };
}
function logMissedBack(w, span) {
  const log = cloneLog(w.log);
  const p = w.position;
  for (let s = 1; s <= span; s++) {
    const pos = backFrom(p.week, p.day, s);
    if (pos) log[pos.w - 1][pos.d - 1] = 'missed';
  }
  return log;
}
function logTodayDone(w) {
  const log = cloneLog(w.log);
  const p = w.position;
  log[p.week - 1][p.day - 1] = 'done';
  return log;
}
function completedLog() {
  const log = [];
  for (let wk = 1; wk <= 12; wk++) {
    const days = [];
    for (let d = 1; d <= 7; d++) {
      if (wk === 2 && d === 4) days.push('mended');
      else if (d === 7) days.push('rest');
      else days.push('done');
    }
    log.push(days);
  }
  return log;
}
function emptyLog() {
  return Array.from({ length: 12 }, () => Array(7).fill('future'));
}

// ————— plain position language (R7 — everywhere position appears) —————

function posPlain(w) {
  const p = w.position;
  return `Day ${p.dayOfProgramme} of 84 · Week ${p.week} of 12`;
}
function keptPlain(log) {
  const woven = wovenCount(log);
  const mends = mendCount(log);
  const open = openCount(log);
  let s = `${woven} of 84 days kept`;
  if (mends) s += ` · ${mends} mended`;
  if (open) s += ` · ${open} open`;
  return s;
}

// ————— THE CLOTH · band form —————
// Compact horizontal woven band: each week a group of 7 vertical weft picks
// over five continuous warp threads. done = solid pick in the world's dye ·
// missed = a fine dashed open slot · mended = gold stitches over the slot ·
// today = the shuttle · future = bare warp.

const BAND = { step: 4.0, gap: 5.6, m: 6, h: 48 };

function bandGeometry() {
  const weekW = 6 * BAND.step;
  const width = BAND.m * 2 + 12 * weekW + 11 * BAND.gap;
  return { weekW, width };
}
function pickX(wI, dI) {
  const { weekW } = bandGeometry();
  return BAND.m + wI * (weekW + BAND.gap) + dI * BAND.step;
}

function bandSvg(log, opts = {}) {
  const { width } = bandGeometry();
  const h = BAND.h;
  const parts = [];
  for (let i = 0; i < 5; i++) {
    const y = 10 + i * 7;
    parts.push(`<line x1="1.5" y1="${y + jitC(i) * 0.4}" x2="${width - 1.5}" y2="${y + jitC(i + 3) * 0.4}" stroke="var(--at-warp)" stroke-width="1.15"/>`);
  }
  let lastWovenX = null;
  for (let wI = 0; wI < 12; wI++) {
    for (let dI = 0; dI < 7; dI++) {
      const st = log[wI][dI];
      const i = wI * 7 + dI;
      const x = pickX(wI, dI);
      if (st === 'done') {
        const y1 = 8.5 + jitA(i) * 0.55;
        const y2 = 39.5 + jitB(i) * 0.55;
        parts.push(`<line x1="${x}" y1="${y1}" x2="${x + jitC(i) * 0.35}" y2="${y2}" stroke="var(--at-thread)" stroke-width="2.25" stroke-linecap="round"/>`);
        lastWovenX = x;
      } else if (st === 'rest') {
        parts.push(`<line x1="${x}" y1="${17.5 + jitC(i) * 0.5}" x2="${x}" y2="${30.5 + jitC(i + 1) * 0.5}" stroke="var(--at-thread)" stroke-width="1.8" stroke-linecap="round" opacity="0.38"/>`);
        lastWovenX = x;
      } else if (st === 'missed') {
        // the open slot — a fine dashed mark: still open, never erased
        parts.push(`<line x1="${x}" y1="10" x2="${x}" y2="38" stroke="var(--at-open)" stroke-width="1.3" stroke-dasharray="2 3.2" stroke-linecap="round"/>`);
      } else if (st === 'mended') {
        for (let s = 0; s < 3; s++) {
          const y = 14.5 + s * 9 + jitC(i + s) * 0.6;
          parts.push(`<line x1="${x - 2.8}" y1="${y}" x2="${x + 2.8}" y2="${y}" stroke="var(--at-mend)" stroke-width="1.8" stroke-linecap="round"/>`);
        }
        lastWovenX = x;
      } else if (st === 'today' && opts.shuttle !== false) {
        const from = lastWovenX == null ? x - 3 : lastWovenX + 1.8;
        parts.push(`<line class="at-drawline" pathLength="1" x1="${from}" y1="24" x2="${x - 3.6}" y2="24" stroke="var(--at-thread)" stroke-width="1.3" opacity="0.85"/>`);
        parts.push(`<path class="at-shuttle-mark" d="M ${x} 13 C ${x + 3} 17 ${x + 3} 31 ${x} 35 C ${x - 3} 31 ${x - 3} 17 ${x} 13 Z" fill="var(--at-thread)"/>`);
      }
    }
  }
  if (opts.selvedge) {
    for (const y of [2.5, h - 2.5]) {
      parts.push(`<line x1="1.5" y1="${y}" x2="${width - 1.5}" y2="${y}" stroke="var(--at-selvedge)" stroke-width="1.9"/>`);
      const y2 = y < h / 2 ? y + 3 : y - 3;
      parts.push(`<line x1="1.5" y1="${y2}" x2="${width - 1.5}" y2="${y2}" stroke="var(--at-selvedge)" stroke-width="0.8" opacity="0.75"/>`);
    }
  }
  const par = opts.align === 'min' ? 'xMinYMid meet' : 'xMidYMid meet';
  return `<svg class="at-band-svg" viewBox="0 0 ${width} ${h}" preserveAspectRatio="${par}" aria-hidden="true" focusable="false">${parts.join('')}</svg>`;
}

function bandText(w, log) {
  const p = w.position;
  return `Your record so far: ${keptPlain(log)}. Now in week ${p.week}, day ${p.day}.`;
}

function band(ctx, opts = {}) {
  const log = opts.log || ctx.w.log;
  return html`<div class="at-band ${raw(opts.cls || '')} ${opts.material ? 'at-material' : ''}">
    ${raw(bandSvg(log, opts))}
    <span class="visually-hidden">${opts.sr || bandText(ctx.w, log)}</span>
    ${opts.caption ? html`<div class="at-band-caption">${opts.caption}</div>` : ''}
  </div>`;
}

// ————— THE CLOTH · loom form (journey) —————

const LOOM = { w: 96, h: 46 };

function loomRowSvg(days, weekIdx, opts = {}) {
  const { w, h } = LOOM;
  const parts = [];
  for (let i = 0; i < 9; i++) {
    const x = 4 + i * 11;
    parts.push(`<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="var(--at-warp)" stroke-width="1"/>`);
  }
  for (let dI = 0; dI < 7; dI++) {
    const st = days[dI];
    const i = weekIdx * 7 + dI;
    const y = 7 + dI * 5.4 + jitC(i) * 0.4;
    if (st === 'done') {
      parts.push(`<line x1="${3 + jitA(i) * 0.5}" y1="${y}" x2="${93 + jitB(i) * 0.5}" y2="${y}" stroke="var(--at-thread)" stroke-width="2.3" stroke-linecap="round"/>`);
    } else if (st === 'rest') {
      parts.push(`<line x1="26" y1="${y}" x2="70" y2="${y}" stroke="var(--at-thread)" stroke-width="1.8" stroke-linecap="round" opacity="0.38"/>`);
    } else if (st === 'missed') {
      parts.push(`<line x1="8" y1="${y}" x2="88" y2="${y}" stroke="var(--at-open)" stroke-width="1.3" stroke-dasharray="2.5 3.8" stroke-linecap="round"/>`);
    } else if (st === 'mended') {
      parts.push(`<line x1="8" y1="${y}" x2="88" y2="${y}" stroke="var(--at-open)" stroke-width="1" stroke-dasharray="2.5 3.8" stroke-linecap="round" opacity="0.55"/>`);
      for (let s = 0; s < 5; s++) {
        const x = 14 + s * 17 + jitC(i + s) * 0.8;
        parts.push(`<line x1="${x}" y1="${y - 2.6}" x2="${x}" y2="${y + 2.6}" stroke="var(--at-mend)" stroke-width="1.8" stroke-linecap="round"/>`);
      }
    } else if (st === 'today' && opts.shuttle !== false) {
      parts.push(`<line class="at-drawline" pathLength="1" x1="3" y1="${y}" x2="49" y2="${y}" stroke="var(--at-thread)" stroke-width="2.3" stroke-linecap="round"/>`);
      parts.push(`<path class="at-shuttle-mark" d="M 51 ${y} C 54 ${y - 2.6} 60 ${y - 2.2} 62.5 ${y} C 60 ${y + 2.2} 54 ${y + 2.6} 51 ${y} Z" fill="var(--at-thread)"/>`);
    }
  }
  return `<svg class="at-loom-svg" viewBox="0 0 ${w} ${h}" aria-hidden="true" focusable="false">${parts.join('')}</svg>`;
}

// Plain-words status for a week row (R4 — no textile knowledge needed).
function weekStatus(w, n) {
  const p = w.position;
  const days = w.log[n - 1];
  if (n < p.week) {
    return days.includes('mended') ? 'Complete · one day made up later' : 'Complete';
  }
  if (n === p.week) return `This week — day ${p.day} of 7`;
  if (n === p.week + 1) return 'Opens next';
  return null;
}

function loom(ctx, opts = {}) {
  const w = ctx.w;
  const p = w.position;
  const log = opts.log || w.log;
  const rows = w.weeks.map((wk, i) => {
    const n = i + 1;
    const all = opts.allWoven;
    const isPast = !opts.virgin && (all || n < p.week);
    const isCurrent = !opts.virgin && !all && n === p.week;
    const future = opts.virgin || (!all && n > p.week);
    const status = all || opts.virgin ? null : weekStatus(w, n);
    return html`<div class="at-loom-row ${isCurrent ? 'is-current' : ''} ${future ? 'is-future' : ''}">
      ${raw(loomRowSvg(log[i], i, opts))}
      <div class="at-loom-text">
        <span class="at-loom-n">Week ${n}</span>
        ${(isPast || isCurrent) ? html`<span class="at-loom-title">${wk.title}</span>` : ''}
        ${status ? html`<span class="at-loom-note">${status}</span>` : ''}
      </div>
    </div>`;
  });
  return html`<div class="at-loom ${opts.material === false ? '' : 'at-material'}">
    <span class="visually-hidden">${opts.sr || bandText(w, log)}</span>
    ${rows}
  </div>`;
}

// ————— journey legend (R4 — every mark paired with plain words) —————

function legendGlyph(kind) {
  const parts = [];
  for (let i = 0; i < 4; i++) {
    const x = 4.5 + i * 7;
    parts.push(`<line x1="${x}" y1="2" x2="${x}" y2="18" stroke="var(--at-warp)" stroke-width="1"/>`);
  }
  const y = 10;
  if (kind === 'done') {
    parts.push(`<line x1="2.5" y1="${y}" x2="27.5" y2="${y}" stroke="var(--at-thread)" stroke-width="2.3" stroke-linecap="round"/>`);
  } else if (kind === 'rest') {
    parts.push(`<line x1="8" y1="${y}" x2="22" y2="${y}" stroke="var(--at-thread)" stroke-width="1.8" stroke-linecap="round" opacity="0.38"/>`);
  } else if (kind === 'missed') {
    parts.push(`<line x1="2.5" y1="${y}" x2="27.5" y2="${y}" stroke="var(--at-open)" stroke-width="1.3" stroke-dasharray="2.5 3.6" stroke-linecap="round"/>`);
  } else if (kind === 'mended') {
    parts.push(`<line x1="2.5" y1="${y}" x2="27.5" y2="${y}" stroke="var(--at-open)" stroke-width="1" stroke-dasharray="2.5 3.6" stroke-linecap="round" opacity="0.55"/>`);
    for (let s = 0; s < 4; s++) {
      const x = 5.5 + s * 6.4;
      parts.push(`<line x1="${x}" y1="${y - 3}" x2="${x}" y2="${y + 3}" stroke="var(--at-mend)" stroke-width="1.8" stroke-linecap="round"/>`);
    }
  } else if (kind === 'today') {
    parts.push(`<line x1="2.5" y1="${y}" x2="15" y2="${y}" stroke="var(--at-thread)" stroke-width="2.3" stroke-linecap="round"/>`);
    parts.push(`<path d="M 16.5 ${y} C 18.5 ${y - 2.4} 23 ${y - 2} 25 ${y} C 23 ${y + 2} 18.5 ${y + 2.4} 16.5 ${y} Z" fill="var(--at-thread)"/>`);
  }
  // 'future' shows bare warp only
  return `<svg viewBox="0 0 30 20" class="at-legend-glyph" aria-hidden="true" focusable="false">${parts.join('')}</svg>`;
}

const LEGEND = [
  ['done', 'Done'],
  ['rest', 'Rest, as planned'],
  ['missed', 'Missed — stays open'],
  ['mended', 'Mended — made up later'],
  ['today', 'Today'],
  ['future', 'Not open yet'],
];

function legend() {
  return html`<ul class="at-legend" aria-label="How to read the record">
    ${LEGEND.map(([k, label]) => html`<li>${raw(legendGlyph(k))}<span>${label}</span></li>`)}
  </ul>`;
}

// ————— small pictograms (explanation) —————

function picto(kind) {
  const warp = `<line x1="3" y1="6" x2="31" y2="6" stroke="var(--at-warp)" stroke-width="1"/><line x1="3" y1="13" x2="31" y2="13" stroke="var(--at-warp)" stroke-width="1"/><line x1="3" y1="20" x2="31" y2="20" stroke="var(--at-warp)" stroke-width="1"/>`;
  let inner = '';
  if (kind === 'thread') {
    inner = `${warp}<line x1="17" y1="2.5" x2="17" y2="23.5" stroke="var(--at-thread)" stroke-width="2.2" stroke-linecap="round"/>`;
  } else if (kind === 'mend') {
    inner = `${warp}
      <line x1="9" y1="2.5" x2="9" y2="23.5" stroke="var(--at-thread)" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="14.5" y1="9.5" x2="19.5" y2="9.5" stroke="var(--at-mend)" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="14.5" y1="16.5" x2="19.5" y2="16.5" stroke="var(--at-mend)" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="25" y1="2.5" x2="25" y2="23.5" stroke="var(--at-thread)" stroke-width="2.2" stroke-linecap="round"/>`;
  } else if (kind === 'cloth') {
    inner = `<line x1="3" y1="3" x2="31" y2="3" stroke="var(--at-selvedge)" stroke-width="1.6"/>
      ${[7, 12, 17, 22].map((x) => `<line x1="${x + 3}" y1="6" x2="${x + 3}" y2="20" stroke="var(--at-thread)" stroke-width="2" stroke-linecap="round"/>`).join('')}
      <line x1="3" y1="23" x2="31" y2="23" stroke="var(--at-selvedge)" stroke-width="1.6"/>`;
  }
  return raw(`<svg class="at-picto" viewBox="0 0 34 26" aria-hidden="true" focusable="false">${inner}</svg>`);
}

// bare warp, hanging — loading / empty
function warpSvg(opts = {}) {
  const n = opts.n ?? 13;
  const h = opts.h ?? 92;
  const parts = [];
  for (let i = 0; i < n; i++) {
    const x = 4 + i * 9;
    const y2 = h - 5 + jitA(i) * 1.4;
    parts.push(`<line class="${opts.ghost ? 'at-ghost-thread' : ''}" style="animation-delay:${(i % 5) * 140}ms" x1="${x}" y1="3" x2="${x + jitC(i)}" y2="${y2}" stroke="var(--at-warp-strong)" stroke-width="1.2"/>`);
  }
  const w = 8 + (n - 1) * 9;
  if (opts.shuttle) {
    const cx = w * 0.62, cy = h - 2.5;
    parts.push(`<path d="M ${cx - 12} ${cy} Q ${cx} ${cy - 3.4} ${cx + 12} ${cy} Q ${cx} ${cy + 3.4} ${cx - 12} ${cy} Z" fill="var(--at-thread)"/>`);
    parts.push(`<line x1="${cx + 12}" y1="${cy}" x2="${w - 0.5}" y2="${cy}" stroke="var(--at-thread)" stroke-width="1.1" opacity="0.8"/>`);
  }
  return raw(`<svg class="at-warp-svg" viewBox="0 0 ${w} ${h + (opts.shuttle ? 4 : 0)}" aria-hidden="true" focusable="false"><line x1="0.8" y1="1.2" x2="${w - 0.8}" y2="1.2" stroke="var(--at-warp-strong)" stroke-width="1.6"/>${parts.join('')}</svg>`);
}

// ————— first-launch motif candidates (R5) —————

// M1 · First thread ready — twelve numbered row-frames, row one's warp
// brightened, the first weft visibly entering.
function motifM1() {
  const w = 190, rowH = 10.5, gap = 3.4, top = 2, left = 22;
  const parts = [];
  for (let r = 0; r < 12; r++) {
    const y = top + r * (rowH + gap);
    parts.push(`<text x="13" y="${y + rowH - 2}" text-anchor="end" class="at-motif-num">${r + 1}</text>`);
    const bright = r === 0;
    for (let i = 0; i < 16; i++) {
      const x = left + i * 10.6;
      parts.push(`<line x1="${x}" y1="${y}" x2="${x + jitC(r * 16 + i) * 0.4}" y2="${y + rowH}" stroke="${bright ? 'var(--at-warp-bright)' : 'var(--at-warp)'}" stroke-width="${bright ? 1.5 : 1.15}"/>`);
    }
    if (bright) {
      const yw = y + rowH / 2;
      parts.push(`<line x1="${left - 2}" y1="${yw}" x2="92" y2="${yw}" stroke="var(--at-thread)" stroke-width="2.5" stroke-linecap="round"/>`);
      parts.push(`<path d="M 95 ${yw} C 98.5 ${yw - 2.8} 105 ${yw - 2.4} 108 ${yw} C 105 ${yw + 2.4} 98.5 ${yw + 2.8} 95 ${yw} Z" fill="var(--at-thread)"/>`);
    }
  }
  const h = top + 12 * (rowH + gap) - gap + 2;
  return `<svg viewBox="0 0 ${w} ${h}" class="at-motif-svg is-m1" aria-hidden="true" focusable="false">${parts.join('')}</svg>`;
}

// M2 · The band that will exist — a ghost preview of the finished twelve-row
// band, row one rendered solid: boundedness, accumulation, the ending.
function motifM2() {
  const { width } = bandGeometry();
  const h = BAND.h;
  const parts = [];
  for (const y of [2.5, h - 2.5]) {
    parts.push(`<line x1="1.5" y1="${y}" x2="${width - 1.5}" y2="${y}" stroke="var(--at-selvedge)" stroke-width="1.5" opacity="0.4"/>`);
  }
  for (let wI = 0; wI < 12; wI++) {
    for (let dI = 0; dI < 7; dI++) {
      const i = wI * 7 + dI;
      const x = pickX(wI, dI);
      const y1 = 8.5 + jitA(i) * 0.55;
      const y2 = 39.5 + jitB(i) * 0.55;
      if (wI === 0) {
        parts.push(`<line x1="${x}" y1="${y1}" x2="${x + jitC(i) * 0.35}" y2="${y2}" stroke="var(--at-thread)" stroke-width="2.25" stroke-linecap="round"/>`);
      } else {
        parts.push(`<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="var(--at-ghostink)" stroke-width="2" stroke-linecap="round"/>`);
      }
    }
  }
  return `<svg viewBox="0 0 ${width} ${h}" class="at-motif-svg is-m2" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">${parts.join('')}</svg>`;
}

// M3 · Row by row — a twelve-segment ribbon, segment one truly woven,
// two to twelve bare warp.
function motifM3() {
  const segW = 20, x0 = 2, y0 = 8, rh = 30;
  const w = x0 * 2 + 12 * segW;
  const h = y0 * 2 + rh;
  const parts = [];
  for (const y of [y0 - 4, y0 + rh + 4]) {
    parts.push(`<line x1="${x0}" y1="${y}" x2="${w - x0}" y2="${y}" stroke="var(--at-selvedge)" stroke-width="1.7"/>`);
  }
  for (let s = 0; s < 12; s++) {
    const x = x0 + s * segW;
    if (s > 0) parts.push(`<line x1="${x}" y1="${y0 - 1}" x2="${x}" y2="${y0 + rh + 1}" stroke="var(--at-warp-strong)" stroke-width="0.8" opacity="0.7"/>`);
    if (s === 0) {
      for (let i = 0; i < 6; i++) {
        const wx = x + 2.5 + i * 3.1;
        parts.push(`<line x1="${wx}" y1="${y0}" x2="${wx}" y2="${y0 + rh}" stroke="var(--at-warp-bright)" stroke-width="1"/>`);
      }
      for (let i = 0; i < 5; i++) {
        const wy = y0 + 3 + i * 6 + jitC(i) * 0.5;
        parts.push(`<line x1="${x + 1.5}" y1="${wy}" x2="${x + segW - 1.5}" y2="${wy}" stroke="var(--at-thread)" stroke-width="2.1" stroke-linecap="round"/>`);
      }
    } else {
      for (let i = 0; i < 3; i++) {
        const wx = x + 5 + i * 5.5;
        parts.push(`<line x1="${wx}" y1="${y0}" x2="${wx + jitC(s * 3 + i) * 0.5}" y2="${y0 + rh}" stroke="var(--at-warp)" stroke-width="1"/>`);
      }
    }
  }
  return `<svg viewBox="0 0 ${w} ${h}" class="at-motif-svg is-m3" aria-hidden="true" focusable="false">${parts.join('')}</svg>`;
}

const MOTIFS = {
  m1: { svg: motifM1, name: 'First thread ready', sr: 'Twelve numbered empty rows wait; the first thread is entering row one.' },
  m2: { svg: motifM2, name: 'The band that will exist', sr: 'A faint preview of the finished twelve-week band; week one already woven solid.' },
  m3: { svg: motifM3, name: 'Row by row', sr: 'A ribbon of twelve segments; the first is woven, the rest are bare threads.' },
};

// ————— shared fragments —————

function head(ctx, right) {
  const p = ctx.w.position;
  return html`<header class="at-head">
    <span class="at-head-t">${ctx.w.programme.title}</span>
    <span class="at-head-r">${right ?? `Day ${p.dayOfProgramme} of 84`}</span>
  </header>`;
}

function kicker(text, opts = {}) {
  return html`<p class="at-kicker ${raw(opts.cls || '')}">${opts.plain ? '' : html`<i class="at-dot" aria-hidden="true"></i>`}${text}</p>`;
}

function primary(label, go, hint, extra = '') {
  return html`<button class="at-primary ${raw(extra)}" data-go="${go}">
    <span>${label}</span>${hint ? html`<span class="at-primary-hint">${hint}</span>` : ''}
  </button>`;
}

function ghostBtn(label, go, hint) {
  return html`<button class="at-ghostbtn" data-go="${go}">
    <span>${label}</span>${hint ? html`<span class="at-primary-hint">${hint}</span>` : ''}
  </button>`;
}

function linkrow(links) {
  return html`<div class="at-linkrow">${links.map(
    (l) => html`<button class="at-link ${l.back ? 'is-back' : ''}" data-go="${l.go}">
      <i class="at-stitchmark" aria-hidden="true"></i>
      <span class="at-link-label">${l.back ? '← ' : ''}${l.label}</span>
      ${l.note ? html`<span class="at-link-note">${l.note}</span>` : ''}
      ${!l.back ? html`<span class="at-link-chev" aria-hidden="true">›</span>` : ''}
    </button>`
  )}</div>`;
}

function option(title, detail, go, opts = {}) {
  return html`<button class="at-option" ${go ? raw(`data-go="${go}"`) : ''} ${raw(opts.attrs || '')}>
    ${opts.glyph
      ? html`<span class="at-option-glyph ${raw(opts.glyphCls || '')}" aria-hidden="true">${opts.glyph}</span>`
      : html`<i class="at-threadmark" aria-hidden="true"></i>`}
    <span class="at-option-body">
      ${opts.flag ? html`<span class="at-flag ${raw(opts.flagCls || '')}">${opts.flag}</span>` : ''}
      <span class="at-option-title">${title}</span>
      ${detail ? html`<span class="at-option-sub">${detail}</span>` : ''}
      ${opts.does ? html`<span class="at-option-does">${opts.does}</span>` : ''}
    </span>
  </button>`;
}

function handoverSwatch(kind) {
  const warp = [];
  for (let i = 0; i < 8; i++) {
    const x = 3.5 + i * 5.4;
    warp.push(`<line x1="${x}" y1="1" x2="${x}" y2="29" stroke="var(--at-warp)" stroke-width="1"/>`);
  }
  let inner = warp.join('');
  if (kind === 'rest') {
    inner += `<line x1="5" y1="23" x2="39.5" y2="23" stroke="var(--at-thread)" stroke-width="6" stroke-linecap="round" opacity="0.4"/>`;
  } else if (kind === 'begin') {
    inner += `<line x1="3" y1="6" x2="41.5" y2="6" stroke="var(--at-thread)" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="3" y1="11" x2="41.5" y2="11" stroke="var(--at-thread)" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="3" y1="16" x2="30" y2="16" stroke="var(--at-thread)" stroke-width="2.2" stroke-linecap="round"/>`;
  } else if (kind === 'world') {
    for (let s = 0; s < 5; s++) {
      inner += `<line x1="3" y1="${5 + s * 5}" x2="41.5" y2="${5 + s * 5}" stroke="var(--at-thread)" stroke-width="2.2" stroke-linecap="round"/>`;
    }
  }
  return raw(`<svg viewBox="0 0 45 30" class="at-hand-swatch" aria-hidden="true" focusable="false">${inner}</svg>`);
}

function careLabel(tag, text, opts = {}) {
  return html`<div class="at-care ${raw(opts.cls || '')}" ${raw(opts.attrs || '')}>
    <span class="at-care-tag">${tag}</span>
    <span class="at-care-text">${text}</span>
  </div>`;
}

function footline(text, go) {
  if (go) return html`<button class="at-footline as-btn" data-go="${go}">${text}</button>`;
  return html`<p class="at-footline">${text}</p>`;
}

function page(inner, opts = {}) {
  return html`<div class="at-page ${raw(opts.cls || '')}">${inner}</div>`;
}

// two-column tablet composition (R6): reading/action column + material rail
function cols(main, rail, railLabel) {
  return html`<div class="at-cols">
    <div class="at-col-main">${main}</div>
    <aside class="at-rail" aria-label="${railLabel || 'Your record'}">${rail}</aside>
  </div>`;
}

function railCaption(lines) {
  return html`<p class="at-rail-caption">${lines.map((l, i) => html`${i ? raw('<br/>') : ''}${l}`)}</p>`;
}

function totalSeconds(w) {
  return w.today.activity.segments.reduce((a, s) => a + s.mins, 0) * 60;
}
function currentSegment(w, elapsed) {
  let acc = 0;
  for (const s of w.today.activity.segments) {
    acc += s.mins * 60;
    if (elapsed < acc) return s;
  }
  return w.today.activity.segments[w.today.activity.segments.length - 1];
}

function threadline(w, elapsed, opts = {}) {
  const total = totalSeconds(w);
  const prog = Math.min(elapsed / total, 1);
  let acc = 0;
  const ticks = w.today.activity.segments.slice(0, -1).map((s) => {
    acc += s.mins;
    const x = (acc * 60 / total) * 100;
    return `<line x1="${x}" y1="3.5" x2="${x}" y2="12.5" stroke="var(--at-warp-strong)" stroke-width="1" vector-effect="non-scaling-stroke"/>`;
  }).join('');
  const needle = opts.paused
    ? `<line x1="${(prog * 100).toFixed(2)}" y1="1" x2="${(prog * 100).toFixed(2)}" y2="15" stroke="var(--at-mend)" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linecap="round"/>`
    : '';
  return raw(`<svg class="at-threadline" viewBox="0 0 100 16" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <line x1="0" y1="8" x2="100" y2="8" stroke="var(--at-warp)" stroke-width="1.2" vector-effect="non-scaling-stroke"/>
    ${ticks}
    <line id="at-thread-progress" x1="0" y1="8" x2="100" y2="8" stroke="var(--at-thread)" stroke-width="2.6" vector-effect="non-scaling-stroke" style="transform:scaleX(${prog.toFixed(4)});"/>
    ${needle}
  </svg>`);
}

function planRows(w, elapsed) {
  const segs = w.today.activity.segments;
  let acc = 0;
  const cur = currentSegment(w, elapsed ?? -1);
  return html`<ul class="at-plan">
    ${segs.map((s) => {
      acc += s.mins * 60;
      const isNow = elapsed != null && s === cur;
      const isDone = elapsed != null && elapsed >= acc;
      return html`<li class="${isNow ? 'is-now' : ''} ${isDone ? 'is-done' : ''}">
        <span class="at-plan-label">${s.label}</span>
        <span class="at-plan-lead" aria-hidden="true"></span>
        <span class="at-plan-val">${s.mins} min</span>
      </li>`;
    })}
  </ul>`;
}

// ————— Today building blocks (R2) —————

function splitWhy(text) {
  const m = String(text).match(/^(.*?[.!?])\s+(.*)$/s);
  return m ? { lead: m[1], rest: m[2] } : { lead: text, rest: '' };
}

// The why paragraph with an accessible fold. DOM identical at all scales;
// only the initial expansion differs (expanded at standard, folded at 200%).
function whyBlock(ctx) {
  const t = ctx.w.today;
  const { lead, rest } = splitWhy(t.why);
  const expanded = ctx.scale !== '200';
  return html`<div class="at-whyblock">
    <p class="at-why"><span class="at-why-lead">${lead}</span>
      <span class="at-why-rest" id="at-whyrest" data-why-rest ${expanded ? '' : raw('hidden')}>${' ' + rest}
        <button class="at-whylink" data-go="why">The longer story</button>
      </span>
    </p>
    ${rest ? html`<button class="at-whymore" data-why-toggle aria-expanded="${String(expanded)}" aria-controls="at-whyrest">
      <span class="at-whymore-label">${expanded ? 'Show less' : 'Why this matters — more'}</span>
    </button>` : ''}
  </div>`;
}

function positionBlock(ctx, opts = {}) {
  const t = ctx.w.today;
  const log = opts.log || ctx.w.log;
  return html`<div class="at-position">
    <p class="at-posline">
      <i class="at-dot" aria-hidden="true"></i>
      <span class="at-pos-main">${t.kicker}</span>
      <span class="at-pos-kept">${wovenCount(log)} days kept</span>
    </p>
    ${band(ctx, { align: 'min', log, material: true, cls: 'at-band-strip' })}
  </div>`;
}

// ————— screens —————

const screens = {

  'first-launch': (ctx) => {
    const m = MOTIFS[ctx.motif] || MOTIFS.m2;
    return page(html`
      <div class="at-hero">
        <div class="at-motifwash is-transition at-hero-motif">
          ${raw(m.svg())}
          <span class="visually-hidden">${m.sr}</span>
        </div>
        <p class="at-wordmark">A quiet practice</p>
        <h1 class="at-display">Twelve<br />Weeks</h1>
        <p class="at-epigraph">What you make here stays made.</p>
        <p class="at-hero-line">One meaningful thing a day, for twelve bounded weeks. Kept days stay kept — and a missed day can always be made up.</p>
      </div>
      ${primary('Begin', 'explanation')}
      ${linkrow([{ label: 'I’ve been here before', note: 'restore', go: 'restore' }])}
      ${footline('no streaks · no feeds · nothing to lose')}
    `, { cls: 'at-centered is-transition' });
  },

  'motif-study': (ctx) => {
    const fig = (id) => {
      const m = MOTIFS[id];
      return html`<figure class="at-motif">
        <p class="at-motif-tag">${id.toUpperCase()}</p>
        <div class="at-motif-frame">${raw(m.svg())}<span class="visually-hidden">${m.sr}</span></div>
        <figcaption class="at-motif-caption"><strong>${m.name}.</strong> ${
          id === 'm1' ? 'Twelve numbered row-frames; row one’s warp brightened, the first weft entering.'
          : id === 'm2' ? 'A ghost preview of the finished twelve-row band, row one already solid — boundedness, accumulation and the ending shown at once.'
          : 'A twelve-segment ribbon; segment one truly woven, two to twelve bare warp.'
        }</figcaption>
      </figure>`;
    };
    return page(html`
      ${head(ctx, 'Motif study')}
      <h1 class="at-title">First-launch motif study</h1>
      <p class="at-meta">Three candidates for the single opening motif, same size, neutral labels. Captions sit below each frame — cover them to judge: which one says <em>twelve bounded stages, something being made, progress that remains, calm forward movement</em>?</p>
      ${fig('m1')}
      ${fig('m2')}
      ${fig('m3')}
      ${footline('render first-launch with ?motif=m1 · m2 · m3')}
    `);
  },

  explanation: (ctx) =>
    page(html`
      ${head(ctx, 'How it works')}
      <h1 class="at-title">Twelve weeks make one whole thing.</h1>
      <div class="at-point">
        ${picto('thread')}
        <div>
          <h2 class="at-point-h">Each day, one thing</h2>
          <p class="at-point-p">A single meaningful action — what to do, why it matters, how to do it. Around fifteen minutes, never a feed.</p>
        </div>
      </div>
      <div class="at-point">
        ${picto('mend')}
        <div>
          <h2 class="at-point-h">Missed days are made up, not punished</h2>
          <p class="at-point-p">Real weeks have gaps. A missed day stays quietly open until you make it up — and nothing you did can be undone.</p>
        </div>
      </div>
      <div class="at-point">
        ${picto('cloth')}
        <div>
          <h2 class="at-point-h">At the end, the record is yours</h2>
          <p class="at-point-p">Twelve kept weeks become a record of what you did — kept on your phone, yours whatever you do next.</p>
        </div>
      </div>
      ${primary('Choose your programme', 'explore')}
      ${footline('one programme at a time · that’s deliberate')}
    `),

  explore: (ctx) => {
    const mine = ctx.w;
    const other = ctx.world === 'strength' ? WORLDS.writing : WORLDS.strength;
    const mins = (wl) => (wl.id === 'strength' ? '15–25' : '25–40');
    const swatch = (wl, current) => html`<article class="at-swatch ${current ? '' : 'is-other'}">
      <div class="at-swatch-band ${wl.id === ctx.world ? '' : 'is-alt'}">${raw(bandSvg(completedLog(), { shuttle: false }))}</div>
      <span class="visually-hidden">Sample of the finished twelve-week band for ${wl.programme.title}.</span>
      <h2 class="at-swatch-title">${wl.programme.title}</h2>
      <p class="at-swatch-line">${wl.programme.subtitle}</p>
      <p class="at-swatch-meta">12 weeks · ${mins(wl)} min a day · 5 days a week</p>
      ${current
        ? primary('Read the particulars', 'suitability')
        : html`<p class="at-swatch-meta is-quiet">Switch worlds in the address (…/writing/…) to preview this one.</p>`}
    </article>`;
    return page(html`
      ${head(ctx, 'The programmes')}
      <h1 class="at-title">Choose your twelve weeks.</h1>
      <p class="at-lede">Each programme is twelve weeks, one day at a time, in its own colour. Choose one; the rest will wait.</p>
      ${swatch(mine, true)}
      ${swatch(other, false)}
      <article class="at-swatch is-soon">
        <div class="at-swatch-band">${raw(bandSvg(emptyLog(), { shuttle: false }))}</div>
        <h2 class="at-swatch-title">The Revision</h2>
        <p class="at-swatch-line">Twelve weeks turning a draft into a book.</p>
        <p class="at-swatch-meta">Coming in spring</p>
      </article>
      ${footline('one at a time · the rest keep')}
    `);
  },

  suitability: (ctx) => {
    const pr = ctx.w.programme;
    return page(html`
      ${head(ctx, 'Particulars')}
      <h1 class="at-title">${pr.title}</h1>
      <p class="at-lede">${pr.promise}</p>
      <h2 class="at-h2">Made for</h2>
      ${pr.whoFor.map((x) => html`<p class="at-listline"><i class="at-stitchmark" aria-hidden="true"></i>${x}</p>`)}
      <h2 class="at-h2">What to expect</h2>
      ${pr.expectations.map((x) => html`<p class="at-listline"><i class="at-stitchmark" aria-hidden="true"></i>${x}</p>`)}
      ${careLabel('Worth knowing', pr.notFor, { cls: 'is-warn' })}
      ${primary('Begin the twelve weeks', 'start-journey', 'Week One is free')}
      ${linkrow([{ label: 'Back to the programmes', go: 'explore', back: true }])}
    `);
  },

  'start-journey': (ctx) =>
    page(html`
      ${head(ctx, 'Ready')}
      <h1 class="at-title">The loom is strung.</h1>
      <p class="at-epigraph is-left">The first thread is tomorrow morning’s.</p>
      <p class="at-lede">Twelve empty weeks, one for each stage of ${ctx.w.programme.title}. Nothing here fills itself; every mark in this record will be one of your days.</p>
      <div class="at-motifwash is-transition">${loom(ctx, { log: emptyLog(), virgin: true, material: false, sr: 'The empty loom: twelve numbered rows of bare warp, waiting.' })}</div>
      ${primary('Start Week One', 'today', ctx.w.weeks[0].title)}
      ${footline('84 days · 12 weeks · one record')}
    `, { cls: 'is-transition' }),

  today: (ctx, opts = {}) => {
    const t = ctx.w.today;
    const foot = footline(`${posPlain(ctx.w)} · ${wovenCount(ctx.w.log)} days kept`, 'journey');

    if (ctx.vp === 'tablet') {
      return page(html`
        ${opts.banner || ''}
        ${head(ctx)}
        ${cols(html`
          ${kicker(t.kicker)}
          <h1 class="at-title is-big">${t.title}</h1>
          ${whyBlock(ctx)}
          ${primary('Begin', 'begin', t.durationLabel)}
          ${linkrow([
            { label: 'Show me how', note: `${t.how.length} steps`, go: 'how' },
            { label: 'Something gentler today', note: 'counts in full', go: 'easier' },
          ])}
        `, html`
          ${band(ctx, { material: true, cls: 'at-band-roomy' })}
          ${railCaption([posPlain(ctx.w), keptPlain(ctx.w.log)])}
        `, 'Your record so far')}
      `, { cls: 'has-cols' });
    }

    return page(html`
      ${opts.banner || ''}
      ${head(ctx)}
      <div class="at-today">
        ${positionBlock(ctx)}
        <h1 class="at-title is-big">${t.title}</h1>
        ${whyBlock(ctx)}
        ${primary('Begin', 'begin', t.durationLabel)}
        ${linkrow([
          { label: 'Show me how', note: `${t.how.length} steps`, go: 'how' },
          { label: 'Something gentler today', note: 'counts in full', go: 'easier' },
        ])}
        ${foot}
      </div>
    `);
  },

  why: (ctx) => {
    const t = ctx.w.today;
    return page(html`
      ${head(ctx)}
      ${kicker('Why this matters')}
      <h1 class="at-title">${t.title}</h1>
      <p>${t.why}</p>
      <p>${t.whyDeeper}</p>
      <div class="at-selvline">${t.milestone}</div>
      ${primary('Show me how', 'how')}
      ${linkrow([{ label: 'Today', go: 'today', back: true }])}
    `);
  },

  how: (ctx) => {
    const t = ctx.w.today;
    const steps = html`
      ${t.how.map(
        (s, i) => html`<div class="at-step">
          <span class="at-step-n" aria-hidden="true">${i + 1}</span>
          <p class="at-step-text"><span class="visually-hidden">Step ${i + 1}. </span>${s.step}</p>
          <p class="at-step-detail">${s.detail}</p>
        </div>`
      )}
      ${careLabel('Take care', t.safety, { cls: 'is-warn' })}
      ${primary('Begin', 'begin', t.durationLabel)}
    `;

    if (ctx.vp === 'tablet') {
      return page(html`
        ${head(ctx)}
        ${cols(html`
          ${kicker('Show me how')}
          <h1 class="at-title">${t.shortTitle}</h1>
          ${steps}
          ${linkrow([{ label: 'Today', go: 'today', back: true }])}
        `, html`
          <h2 class="at-rail-h">What you’ll need</h2>
          ${t.prep.map((x) => html`<p class="at-listline is-rail"><i class="at-stitchmark" aria-hidden="true"></i>${x}</p>`)}
          ${railCaption(['The list waits here every day.'])}
        `, 'Preparation')}
      `, { cls: 'has-cols' });
    }

    return page(html`
      ${head(ctx)}
      ${kicker('Show me how')}
      <h1 class="at-title">${t.shortTitle}</h1>
      ${steps}
      ${linkrow([
        { label: 'What you’ll need', note: `${t.prep.length} things`, go: 'prep' },
        { label: 'Today', go: 'today', back: true },
      ])}
    `);
  },

  prep: (ctx) => {
    const t = ctx.w.today;
    return page(html`
      ${head(ctx)}
      ${kicker('Before you begin')}
      <h1 class="at-title">What you’ll need</h1>
      <div role="group" aria-label="Preparation checklist">
        ${t.prep.map(
          (pItem, i) => html`<button class="at-check" data-check="${i}" aria-pressed="${String(mem.prepDone.has(i))}">
            <span class="at-check-box" aria-hidden="true"></span>
            <span class="at-check-label">${pItem}</span>
          </button>`
        )}
      </div>
      <p class="at-meta">Ticking is optional — this list simply waits here every day.</p>
      ${primary('Begin', 'begin', t.durationLabel)}
      ${linkrow([{ label: 'Back', go: 'how', back: true }])}
    `);
  },

  easier: (ctx) => {
    const t = ctx.w.today;
    return page(html`
      ${head(ctx)}
      ${kicker('The gentler form')}
      <h1 class="at-title">${t.easier.title}</h1>
      <div class="at-mendline">
        <span class="at-flag is-mend">Counts in full</span>
        <p>A gentler day is still a kept day. Your record will show it whole — nothing less.</p>
      </div>
      <p>${t.easier.why}</p>
      <p>${t.easier.detail}</p>
      ${primary('Do this instead today', 'begin')}
      ${linkrow([
        { label: 'The further form', note: 'feeling strong?', go: 'advanced' },
        { label: 'Today', go: 'today', back: true },
      ])}
    `);
  },

  advanced: (ctx) => {
    const t = ctx.w.today;
    return page(html`
      ${head(ctx)}
      ${kicker('The further form')}
      <h1 class="at-title">${t.advanced.title}</h1>
      <p>${t.advanced.why}</p>
      <p>${t.advanced.detail}</p>
      ${careLabel('Only if today feels strong', 'The plain form is the programme; this is a variation, not a target.')}
      ${primary('Take the further form', 'begin')}
      ${linkrow([{ label: 'Today', go: 'today', back: true }])}
    `);
  },

  begin: (ctx) => {
    const t = ctx.w.today;
    return page(html`
      ${head(ctx)}
      ${kicker('Ready')}
      <h1 class="at-title">${t.shortTitle} — ${t.durationLabel}.</h1>
      ${planRows(ctx.w)}
      <p class="at-meta">Pause any time. Your place is held until you come back.</p>
      ${primary('Start now', 'active')}
      ${linkrow([{ label: 'Today', go: 'today', back: true }])}
    `);
  },

  active: (ctx) => {
    const w = ctx.w;
    return page(html`
      ${head(ctx, 'In session')}
      <div class="at-timer">
        <div class="at-timer-digits" id="at-digits" role="timer" aria-live="off">${mmss(mem.elapsed)}</div>
        ${threadline(w, mem.elapsed)}
        <p class="at-timer-seg" id="at-seg">${currentSegment(w, mem.elapsed).label}</p>
      </div>
      ${planRows(w, mem.elapsed)}
      ${primary('Pause', 'paused')}
      ${linkrow([{ label: 'Finish early — it still counts', go: 'complete' }])}
    `, { cls: 'at-session' });
  },

  paused: (ctx) => {
    const w = ctx.w;
    return page(html`
      ${head(ctx, 'Paused')}
      <div class="at-timer is-paused">
        <div class="at-timer-digits">${mmss(mem.elapsed)}</div>
        ${threadline(w, mem.elapsed, { paused: true })}
        <p class="at-timer-seg is-note">${w.today.activity.pauseNote}</p>
      </div>
      ${primary('Carry on', 'active')}
      ${linkrow([
        { label: 'Save the rest for later today', go: 'today' },
        { label: 'End here — it still counts', go: 'complete' },
      ])}
    `, { cls: 'at-session' });
  },

  complete: (ctx) => {
    const t = ctx.w.today;
    const p = ctx.w.position;
    return page(html`
      ${head(ctx)}
      ${kicker('The day’s work')}
      <h1 class="at-title">${t.shortTitle} — done.</h1>
      <p class="at-lede">${mmss(Math.max(mem.elapsed, 60))} of honest work, ready to join the record.</p>
      ${band(ctx, { log: logTodayDone(ctx.w), align: 'min', material: true, cls: 'at-band-roomy', sr: `Today’s thread in place: day ${p.dayOfProgramme} kept.` })}
      ${primary(`Mark day ${p.dayOfProgramme} done`, '__beat')}
      ${linkrow([{ label: 'Back to the session', go: 'active', back: true }])}
    `);
  },

  question: (ctx) => {
    const q = ctx.w.today.question;
    return page(html`
      ${head(ctx)}
      ${kicker('One question — then you’re done')}
      <h1 class="at-title is-serif">${q.prompt}</h1>
      <p class="at-meta">${q.why}</p>
      <div role="group" aria-label="${q.prompt}" class="at-answers">
        ${q.options.map((o, i) => option(o, null, null, { attrs: `data-choice="${i}"` }))}
      </div>
      ${linkrow([{ label: 'Skip — no answer today', go: 'acknowledge' }])}
    `);
  },

  acknowledge: (ctx) => {
    const a = ctx.w.today.acknowledgement;
    const ackLine = ctx.w.today.question.acknowledgements[mem.choice] ?? '';
    return page(html`
      ${head(ctx)}
      ${band(ctx, { log: logTodayDone(ctx.w), align: 'min', material: true, sr: 'Your record, with today woven in.' })}
      <div class="at-ack">
        ${kicker('Kept')}
        <h1 class="at-display is-mid">${a.headline}</h1>
        <p class="at-lede">${a.line}</p>
        <hr class="at-hr" />
        <p class="at-meta">${ackLine}</p>
      </div>
      ${primary('Done for today', 'journey')}
      ${footline(a.weekLine)}
    `);
  },

  journey: (ctx) => {
    const totals = html`<p class="at-totals" data-totals>${keptPlain(ctx.w.log)}</p>`;
    const reading = html`
      <h1 class="at-title">The cloth so far</h1>
      <p class="at-posline-lg">${posPlain(ctx.w)}</p>
      <p class="at-lede">Every thread is a day you kept. Gaps stay part of the story — open until mended, never erased.</p>
      ${totals}
      ${legend()}
    `;

    if (ctx.vp === 'tablet') {
      return page(html`
        ${head(ctx, 'The Twelve Weeks')}
        ${cols(reading, html`
          ${loom(ctx)}
        `, 'The twelve weeks, week by week')}
      `, { cls: 'has-cols is-journey' });
    }

    return page(html`
      ${head(ctx, 'The Twelve Weeks')}
      ${reading}
      ${loom(ctx)}
    `);
  },

  'week-transition': (ctx) => {
    const p = ctx.w.position;
    const prev = ctx.w.weeks[p.week - 1];
    const next = ctx.w.weeks[p.week] || ctx.w.weeks[11];
    const doneRow = cloneLog(ctx.w.log)[p.week - 1].map((d) => (d === 'today' || d === 'future' ? 'done' : d));
    return page(html`
      ${head(ctx, `Week ${p.week} complete`)}
      <div class="at-transition">
        ${kicker(`Week ${p.week} complete`)}
        <h1 class="at-display is-mid">${prev.title},<br />woven in.</h1>
        <p class="at-lede">What this week holds: ${prev.focus.charAt(0).toLowerCase()}${prev.focus.slice(1)}.</p>
        <div class="at-motifwash is-transition at-trans-rows">
          <div class="at-loom-row">${raw(loomRowSvg(doneRow, p.week - 1, { shuttle: false }))}
            <div class="at-loom-text"><span class="at-loom-n">Week ${p.week}</span><span class="at-loom-title">${prev.title}</span><span class="at-loom-note">complete</span></div>
          </div>
          <div class="at-loom-row is-future">${raw(loomRowSvg(Array(7).fill('future'), p.week, { shuttle: false }))}
            <div class="at-loom-text"><span class="at-loom-n">Week ${p.week + 1}</span><span class="at-loom-title">${next.title}</span><span class="at-loom-note">${next.focus}</span></div>
          </div>
        </div>
        <span class="visually-hidden">Week ${p.week}, ${prev.title}, is complete. Week ${p.week + 1}, ${next.title}, opens next.</span>
      </div>
      ${primary(`Begin Week ${p.week + 1}`, 'today', next.title)}
      ${footline(`Day ${p.week * 7 + 1} of 84 · Week ${p.week + 1} of 12 opens`)}
    `, { cls: 'is-transition' });
  },

  'missed-one': (ctx) => {
    const r = ctx.w.recovery.oneDay;
    return page(html`
      ${head(ctx)}
      ${band(ctx, { log: logMissedBack(ctx.w, 1), align: 'min', material: true, sr: 'Your record with one open day where yesterday would be. Everything kept remains kept.' })}
      ${kicker('One open day — nothing lost')}
      <h1 class="at-title">${r.headline}</h1>
      <p>${r.line}</p>
      <p class="at-mendnote"><i class="at-mendmark" aria-hidden="true"></i>An open day can be made up any time this week — and a made-up day counts in full.</p>
      ${primary(r.action, 'today', ctx.w.today.durationLabel)}
      ${option(r.altAction, r.altDetail, 'easier')}
      ${footline('nothing you kept has been lost')}
    `);
  },

  'missed-several': (ctx) => {
    const r = ctx.w.recovery.severalDays;
    return page(html`
      ${head(ctx)}
      ${band(ctx, { log: logMissedBack(ctx.w, 3), align: 'min', material: true, sr: 'Your record with a short span of open days before today. All earlier weeks remain kept.' })}
      ${kicker('The record holds')}
      <h1 class="at-title">${r.headline}</h1>
      <p>${r.line}</p>
      ${r.options.map((o, i) => option(o.title, o.detail, 'today', i === 0 ? { flag: 'As planned' } : {}))}
      ${footline('open days can still be made up — never erased')}
    `);
  },

  'long-absence': (ctx) => {
    const r = ctx.w.recovery.longAbsence;
    const reading = html`
      <h1 class="at-title">${r.headline}</h1>
      <p>${r.line}</p>
      <h2 class="at-h2">${r.capacityPrompt}</h2>
      <div role="group" aria-label="${r.capacityPrompt}">
        ${r.capacities.map((c, i) => option(c.title, c.detail, null, { attrs: `data-capacity="${i}"`, does: c.does }))}
      </div>
      <hr class="at-hr" />
      <p class="at-meta">${r.reschedule}</p>
      ${linkrow([{ label: 'Pause the programme instead', note: 'your place kept', go: 'programme-pause' }])}
    `;

    if (ctx.vp === 'tablet') {
      return page(html`
        ${head(ctx, 'Welcome back')}
        ${cols(reading, html`
          ${band(ctx, { shuttle: false, material: true, cls: 'at-band-roomy', sr: 'Your record, intact: every day you kept is still here.' })}
          ${railCaption(['What you kept is kept.', keptPlain(ctx.w.log)])}
        `, 'Your record, intact')}
      `, { cls: 'has-cols' });
    }

    return page(html`
      ${head(ctx, 'Welcome back')}
      ${band(ctx, {
        shuttle: false,
        material: true,
        caption: 'what you kept is kept',
        sr: 'Your record, intact: every day you kept is still here.',
      })}
      ${reading}
    `);
  },

  'programme-pause': (ctx) => {
    const r = ctx.w.recovery.pause;
    return page(html`
      ${head(ctx, 'Pause')}
      ${band(ctx, { shuttle: false, material: true, caption: 'kept exactly as it is', sr: 'Your record so far, held safely while the programme is paused.' })}
      ${kicker('A deliberate rest')}
      <h1 class="at-title">${r.headline}</h1>
      <p>${r.line}</p>
      <p class="at-quiet">${r.detail}</p>
      ${primary(r.action, 'journey')}
      ${linkrow([{ label: 'Not now — back to today', go: 'today', back: true }])}
    `);
  },

  settings: (ctx) => {
    const s = ctx.w.support;
    return page(html`
      ${head(ctx, 'Support')}
      <h1 class="at-title">${s.title}</h1>
      <p class="at-lede">${s.intro}</p>
      <p class="at-posline-lg">${posPlain(ctx.w)} · ${wovenCount(ctx.w.log)} days kept</p>
      ${linkrow(s.rows.map((r) => ({ label: r.title, note: r.note, go: r.go })))}
      <h2 class="at-h2">${s.help.title}</h2>
      <p>${s.help.line}</p>
      <hr class="at-hr" />
      <p class="at-meta">${s.termsLine}</p>
      ${footline('nothing here is more than two taps deep')}
    `);
  },

  offline: (ctx) =>
    screens.today(ctx, {
      banner: careLabel('Offline', ctx.w.system.offline, { attrs: 'role="status"', cls: 'is-banner' }),
    }),

  loading: (ctx) =>
    page(html`
      ${head(ctx)}
      ${kicker(ctx.w.system.loading, { plain: true })}
      <div class="at-ghost">
        ${warpSvg({ n: 13, h: 120, ghost: true })}
        <div class="at-ghostline w45"></div>
        <div class="at-ghostline w85"></div>
        <div class="at-ghostline"></div>
        <div class="at-ghostline w60"></div>
      </div>
      <p class="visually-hidden" role="status">${ctx.w.system.loading}</p>
    `, { cls: 'at-loading' }),

  error: (ctx) =>
    page(html`
      ${head(ctx, 'A hitch')}
      ${kicker('A knot, not a break', { cls: 'is-warn' })}
      <h1 class="at-title">Something caught on our side.</h1>
      <p role="alert">${ctx.w.system.error}</p>
      <p class="at-quiet">A knot is worked loose, not cut out. Nothing of yours is in it.</p>
      ${primary('Try again', 'today')}
      ${linkrow([{ label: 'Carry on offline', note: 'everything on this phone works', go: 'offline' }])}
    `),

  empty: (ctx) => {
    const p = ctx.w.position;
    const next = ctx.w.weeks[p.week] || ctx.w.weeks[11];
    return page(html`
      ${head(ctx)}
      ${kicker(`Week ${p.week + 1} · not open yet`)}
      <h1 class="at-title">${next.title} isn’t open yet.</h1>
      <div class="at-empty-warp">${warpSvg({ n: 13, h: 84 })}</div>
      <p>${ctx.w.system.empty}</p>
      ${primary('Back to this week', 'today')}
    `);
  },

  'week-12': (ctx) => {
    const c = ctx.w.completion;
    const cloth = html`
      <div class="at-motifwash is-completion">
        ${band(ctx, {
          log: completedLog(), selvedge: true, shuttle: false, cls: 'at-band-roomy is-finished at-unroll',
          sr: 'The finished band: eighty-four days, twelve weeks, edges bound, one day mended in gold.',
        })}
      </div>`;

    if (ctx.vp === 'tablet') {
      return page(html`
        ${head(ctx, 'Week 12 · complete')}
        ${cols(html`
          <p class="at-wordmark">Week twelve · the last day</p>
          <h1 class="at-display is-mid">${c.headline}</h1>
          <p class="at-lede">${c.line}</p>
          ${primary('See what you made', 'artefact')}
        `, html`
          ${cloth}
          ${railCaption(['84 days · 12 weeks · one record', 'mends and all'])}
        `, 'The finished band')}
      `, { cls: 'has-cols is-completion' });
    }

    return page(html`
      <div class="at-finish">
        <p class="at-wordmark">Week twelve · the last day</p>
        <h1 class="at-display">${c.headline}</h1>
        ${cloth}
        <p class="at-lede is-center">${c.line}</p>
      </div>
      ${primary('See what you made', 'artefact')}
      ${footline('84 days · 12 weeks · one record — mends and all')}
    `, { cls: 'at-centered is-completion' });
  },

  artefact: (ctx) => {
    const c = ctx.w.completion;
    return page(html`
      ${head(ctx, 'Kept')}
      <div class="at-plate">
        <p class="at-plate-sub">${c.artefact.subtitle}</p>
        <h1 class="at-plate-title">${c.artefact.title}</h1>
        ${band(ctx, {
          log: completedLog(), selvedge: true, shuttle: false, material: true, cls: 'at-band-roomy is-finished',
          sr: 'The finished woven band, kept: twelve weeks, edges bound, mends visible in gold.',
        })}
        <dl class="at-record">
          ${c.record.map((rw) => html`<div class="at-record-row"><dt>${rw.label}</dt><dd>${rw.value}</dd></div>`)}
        </dl>
      </div>
      <p class="at-meta">${c.artefact.note}</p>
      ${primary('What comes next', 'handover')}
      ${linkrow([{ label: 'Export this record', note: 'PDF · text', go: 'artefact' }])}
    `);
  },

  handover: (ctx) => {
    const h = ctx.w.completion.handover;
    return page(html`
      ${head(ctx, 'What next')}
      ${kicker('Rest, or begin again — your record keeps either way')}
      <h1 class="at-title">${h.line}</h1>
      ${h.options.map((o, i) =>
        option(o.title, o.detail, i === 2 ? 'explore' : 'subscription', {
          glyph: handoverSwatch(['rest', 'begin', 'world'][i]),
          glyphCls: i === 2 ? 'at-altdye' : '',
          flag: i === 0 ? 'Recommended' : '',
        })
      )}
      ${footline('whatever you choose, what you made stays made')}
    `);
  },

  subscription: (ctx) => {
    const s = ctx.w.subscription;
    return page(html`
      ${head(ctx, 'Membership')}
      <h1 class="at-title">${s.headline}</h1>
      <section class="at-pricecard" aria-label="Price and terms">
        <div class="at-price">
          <span class="at-price-big">${s.price}</span>
          <span class="at-price-per">${s.per}</span>
        </div>
        <p class="at-price-cancel">${s.cancelBeside}</p>
        <p class="at-price-alt">${s.monthlyAlt}</p>
      </section>
      <p class="at-meta">${s.trial}</p>
      <h2 class="at-h2">What the price holds</h2>
      ${s.includes.map((x) => html`<p class="at-listline"><i class="at-stitchmark" aria-hidden="true"></i>${x}</p>`)}
      <h2 class="at-h2">The terms, plainly</h2>
      ${s.terms.map((t, i) => html`<div class="at-term"><span class="at-term-n" aria-hidden="true">${i + 1}</span><p>${t}</p></div>`)}
      <p class="at-meta">${s.renewal}</p>
      ${primary('Start Week One free', 'today')}
      ${ghostBtn('Not now', 'settings')}
      <p class="at-epigraph is-left is-small">If you ever cancel, everything you made is yours to keep.</p>
      ${linkrow([{ label: 'Restore a previous purchase', go: 'restore' }])}
    `);
  },

  expired: (ctx) => {
    const e = ctx.w.expired;
    return page(html`
      ${head(ctx, 'Membership')}
      ${band(ctx, { shuttle: false, material: true, caption: 'yours, membership or none', sr: 'The record you made, intact and readable.' })}
      ${kicker('Lapsed — nothing lost')}
      <h1 class="at-title">${e.headline}</h1>
      <p>${e.line}</p>
      ${primary(e.action, 'subscription')}
      <div class="at-equalrow">
        ${ghostBtn(e.secondary, 'artefact')}
        ${ghostBtn('Read my record', 'journey')}
      </div>
      ${linkrow([{ label: 'Restore a previous purchase', go: 'restore' }])}
    `);
  },

  restore: (ctx) =>
    page(html`
      ${head(ctx, 'Restore')}
      <h1 class="at-title">${ctx.w.restore.headline}</h1>
      <p>${ctx.w.restore.line}</p>
      ${mem.restored
        ? html`${careLabel('Restored', ctx.w.restore.done, { attrs: 'role="status"', cls: 'is-good' })}
          ${primary('Open today', 'today')}`
        : primary(ctx.w.restore.action, '__restore')}
      ${linkrow([{ label: 'Start fresh instead', note: 'the programmes', go: 'explore' }])}
    `),

  specimen: (ctx) => {
    const t = ctx.w.today;
    const other = ctx.world === 'strength' ? WORLDS.writing : WORLDS.strength;
    return page(html`
      ${head(ctx, 'Type specimen')}
      ${kicker('Atelier · Bricolage Grotesque + Faustina', { plain: true })}
      <h1 class="at-display">Twelve</h1>
      <h2 class="at-title is-big">${t.title}</h2>
      <p class="at-why">${t.why}</p>
      <div class="at-step">
        <span class="at-step-n" aria-hidden="true">3</span>
        <p class="at-step-text">${t.how[2].step}</p>
        <p class="at-step-detail">${t.how[2].detail}</p>
      </div>
      <div class="at-timer" style="text-align:left;margin:14px 0 6px;">
        <div class="at-timer-digits" style="font-size:calc(var(--ts) * 3.2rem);">${padMin(t.duration)}:00</div>
      </div>
      <p class="at-specnum">0123456789 — proportional, running text</p>
      <p class="at-specnum is-tab">0123456789 · 00:00 → ${padMin(t.duration)}:00 — tabular lining, timers</p>
      <div class="at-specglyphs" aria-hidden="true">
        ${LEGEND.map(([k, label]) => html`<span class="at-specpair">${raw(legendGlyph(k))}<span>${label}</span></span>`)}
      </div>
      <p class="at-kicker"><i class="at-dot" aria-hidden="true"></i>${t.kicker}</p>
      <p class="at-specrow"><span class="at-loom-n">Week ${ctx.w.position.week}</span><span class="at-loom-title">${ctx.w.position.weekTheme}</span></p>
      <h2 class="at-display is-mid" style="margin-top:18px;">${ctx.w.completion.headline}</h2>
      <p class="at-meta">Small metadata · ${t.acknowledgement.weekLine}</p>
      <hr class="at-hr" />
      ${kicker('The other world · same system, its own colour', { plain: true })}
      <h2 class="at-title" style="font-size:calc(var(--ts) * 1.35rem);">${other.today.title}</h2>
      <p class="at-meta">${other.programme.title} · thread dyed ${other.id === 'writing' ? 'indigo' : 'madder'}</p>
      ${footline('specimen')}
    `);
  },
};

function padMin(n) {
  return String(n).padStart(2, '0');
}

// ————— mount: wire interactions —————

function mount(root, ctx) {
  root.querySelectorAll('[data-go]').forEach((el) => {
    el.addEventListener('click', () => {
      const target = el.getAttribute('data-go');
      if (target === '__beat') {
        // the day's thread is pressed into the cloth, then one question.
        // Reduced motion holds the confirmation for a static beat — meaning
        // is never skipped, only movement.
        const shuttle = root.querySelector('.at-band-roomy .at-band-svg');
        if (shuttle) shuttle.classList.add('at-beat');
        el.disabled = true;
        ctx.announce(`Day ${ctx.w.position.dayOfProgramme} kept.`);
        makeTimeout(root, () => ctx.go('question'), reducedMotion(ctx) ? 250 : 420);
        return;
      }
      if (target === '__restore') {
        mem.restored = true;
        ctx.announce(ctx.w.restore.done);
        ctx.go('restore');
        return;
      }
      ctx.go(target);
    });
  });

  root.querySelectorAll('[data-check]').forEach((el) => {
    el.addEventListener('click', () => {
      const i = Number(el.getAttribute('data-check'));
      if (mem.prepDone.has(i)) mem.prepDone.delete(i);
      else mem.prepDone.add(i);
      el.setAttribute('aria-pressed', String(mem.prepDone.has(i)));
    });
  });

  root.querySelectorAll('[data-choice]').forEach((el) => {
    el.addEventListener('click', () => {
      mem.choice = Number(el.getAttribute('data-choice'));
      el.classList.add('is-chosen');
      makeTimeout(root, () => ctx.go('acknowledge'), reducedMotion(ctx) ? 0 : 160);
    });
  });

  root.querySelectorAll('[data-capacity]').forEach((el) => {
    el.addEventListener('click', () => {
      el.classList.add('is-chosen');
      makeTimeout(root, () => ctx.go('today'), reducedMotion(ctx) ? 0 : 160);
    });
  });

  // the why-fold (R2): full text is folded, never removed
  const whyToggle = root.querySelector('[data-why-toggle]');
  if (whyToggle) {
    whyToggle.addEventListener('click', () => {
      const rest = root.querySelector('[data-why-rest]');
      const open = whyToggle.getAttribute('aria-expanded') === 'true';
      whyToggle.setAttribute('aria-expanded', String(!open));
      if (rest) rest.hidden = open;
      const label = whyToggle.querySelector('.at-whymore-label');
      if (label) label.textContent = open ? 'Why this matters — more' : 'Show less';
    });
  }

  // re-populate live-region banners one frame after insertion so screen
  // readers reliably announce content that rendered with the page
  root.querySelectorAll('[role="status"], [role="alert"]').forEach((el) => {
    const markup = el.innerHTML;
    el.innerHTML = '';
    requestAnimationFrame(() => { el.innerHTML = markup; });
  });

  if (ctx.state === 'active') {
    const total = totalSeconds(ctx.w);
    const digits = root.querySelector('#at-digits');
    const seg = root.querySelector('#at-seg');
    const thread = root.querySelector('#at-thread-progress');
    const plan = root.querySelectorAll('.at-plan li');
    const segEnds = [];
    let acc = 0;
    ctx.w.today.activity.segments.forEach((s) => { acc += s.mins * 60; segEnds.push(acc); });
    // wall-clock anchored: a throttled tab or locked phone never loses time
    const startedAt = Date.now() - mem.elapsed * 1000;
    let lastSeg = currentSegment(ctx.w, mem.elapsed).label;
    makeTicker(root, () => {
      mem.elapsed = Math.min(Math.round((Date.now() - startedAt) / 1000), total);
      const segNow = currentSegment(ctx.w, mem.elapsed).label;
      if (digits) digits.textContent = mmss(mem.elapsed);
      if (seg) seg.textContent = segNow;
      if (thread) thread.style.transform = `scaleX(${(mem.elapsed / total).toFixed(4)})`;
      plan.forEach((li, i) => {
        const start = i === 0 ? 0 : segEnds[i - 1];
        li.classList.toggle('is-now', mem.elapsed >= start && mem.elapsed < segEnds[i]);
        li.classList.toggle('is-done', mem.elapsed >= segEnds[i]);
      });
      if (mem.elapsed === total) ctx.announce('Session complete — well done.');
      else if (segNow !== lastSeg) ctx.announce(`${segNow}. ${mmss(mem.elapsed)} elapsed.`);
      lastSeg = segNow;
    });
  }

  if (ctx.state === 'begin') mem.elapsed = 0;
}

export default {
  id: 'atelier',
  name: 'Atelier',
  tagline: 'Twelve weeks weave a cloth — and the cloth holds even where a thread is missed.',
  render(state, ctx) {
    const fn = screens[state] || screens.today;
    return { html: fn(ctx), mount };
  },
};
