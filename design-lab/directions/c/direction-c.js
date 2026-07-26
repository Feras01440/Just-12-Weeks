// DIRECTION C — ATELIER. The weave.
// Governing idea: twelve weeks weave a cloth — every day adds a thread,
// and the cloth holds even where a thread is missed. Progress is
// accumulated material, not travel along a path. A missed day is mended
// in visible gold; the finished band is a kept object.

import { html, raw, mmss, makeTicker, reducedMotion } from '../../shared/dom.js';
import { WORLDS } from '../../shared/fixtures.js';

// Session + choice state shared across screens of this direction.
// `elapsed` pre-seeded so deep-linking straight to active/paused shows a
// mid-session reading; the `begin` screen resets it to 0.
const mem = { elapsed: 277, prepDone: new Set(), choice: 1, restored: false };

// ————— deterministic hand-made irregularity (Math.random is banned) —————

function jitA(i) { return ((i * 37) % 5) - 2; }        // -2 … 2
function jitB(i) { return ((i * 53) % 5) - 2; }        // -2 … 2, decorrelated
function jitC(i) { return ((i * 29) % 3) - 1; }        // -1 … 1

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
function cloneLog(log) {
  return log.map((wk) => wk.slice());
}
// walk back `steps` day-slots from (week, day) — 1-based
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
function completedLog(w) {
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

// ————— THE CLOTH · band form —————
// A compact horizontal woven band: cloth grows left → right. Each week is a
// group of 7 vertical weft picks over five continuous horizontal warp threads.
// done = solid pick in the world's dye · missed = bare warp gap ·
// mended = short gold sashiko stitches over the gap · today = the shuttle.

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
  // warp — five continuous threads, faintly irregular
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
      } else if (st === 'mended') {
        for (let s = 0; s < 3; s++) {
          const y = 14.5 + s * 9 + jitC(i + s) * 0.6;
          parts.push(`<line x1="${x - 2.8}" y1="${y}" x2="${x + 2.8}" y2="${y}" stroke="var(--at-mend)" stroke-width="1.8" stroke-linecap="round"/>`);
        }
        lastWovenX = x;
      } else if (st === 'today' && opts.shuttle !== false) {
        // trailing weft back to the woven edge, then the shuttle
        const from = lastWovenX == null ? x - 3 : lastWovenX + 1.8;
        parts.push(`<line class="at-drawline" pathLength="1" x1="${from}" y1="24" x2="${x - 3.6}" y2="24" stroke="var(--at-thread)" stroke-width="1.3" opacity="0.85"/>`);
        parts.push(`<path class="at-shuttle-mark" d="M ${x} 13 C ${x + 3} 17 ${x + 3} 31 ${x} 35 C ${x - 3} 31 ${x - 3} 17 ${x} 13 Z" fill="var(--at-thread)"/>`);
      }
      // missed / future: bare warp shows through
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
  const woven = wovenCount(log);
  const mends = mendCount(log);
  const p = w.position;
  return `The cloth so far: ${woven} of 84 days woven` +
    (mends ? `, ${mends} mended in gold` : '') +
    `. Now in week ${p.week}, day ${p.day}.`;
}

function band(ctx, opts = {}) {
  const log = opts.log || ctx.w.log;
  return html`<div class="at-band ${raw(opts.cls || '')}">
    ${raw(bandSvg(log, opts))}
    <span class="visually-hidden">${opts.sr || bandText(ctx.w, log)}</span>
    ${opts.caption ? html`<div class="at-band-caption">${opts.caption}</div>` : ''}
  </div>`;
}

// ————— THE CLOTH · loom form (journey) —————
// The full cloth, one week per row: 7 horizontal weft picks over vertical
// warp threads that align row-to-row so the column reads as one fabric.

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
    } else if (st === 'mended') {
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

function weekStatus(w, n) {
  const p = w.position;
  const days = w.log[n - 1];
  if (n < p.week) {
    return days.includes('mended') ? 'Woven — one day mended in gold' : 'Woven';
  }
  if (n === p.week) return `The shuttle is here — day ${p.day} of this row`;
  if (n === p.week + 1) return 'Warp strung, waiting';
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
        <span class="at-loom-n">Row ${n}</span>
        ${(isPast || isCurrent) ? html`<span class="at-loom-title">${wk.title}</span>` : ''}
        ${status ? html`<span class="at-loom-note">${status}</span>` : ''}
      </div>
    </div>`;
  });
  const woven = wovenCount(log);
  return html`<div class="at-loom">
    <span class="visually-hidden">${opts.sr || bandText(w, log)}</span>
    ${rows}
    <p class="at-loom-caption">woven so far: ${woven} of 84 days</p>
  </div>`;
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
      ${[7, 12, 17, 22].map((x, i) => `<line x1="${x + 3}" y1="6" x2="${x + 3}" y2="20" stroke="var(--at-thread)" stroke-width="2" stroke-linecap="round"/>`).join('')}
      <line x1="3" y1="23" x2="31" y2="23" stroke="var(--at-selvedge)" stroke-width="1.6"/>`;
  }
  return raw(`<svg class="at-picto" viewBox="0 0 34 26" aria-hidden="true" focusable="false">${inner}</svg>`);
}

// bare warp, hanging — first launch / loading / empty
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
    // the shuttle rests at the foot of the warp, dyed and ready
    const cx = w * 0.62, cy = h - 2.5;
    parts.push(`<path d="M ${cx - 12} ${cy} Q ${cx} ${cy - 3.4} ${cx + 12} ${cy} Q ${cx} ${cy + 3.4} ${cx - 12} ${cy} Z" fill="var(--at-thread)"/>`);
    parts.push(`<line x1="${cx + 12}" y1="${cy}" x2="${w - 0.5}" y2="${cy}" stroke="var(--at-thread)" stroke-width="1.1" opacity="0.8"/>`);
  }
  return raw(`<svg class="at-warp-svg" viewBox="0 0 ${w} ${h + (opts.shuttle ? 4 : 0)}" aria-hidden="true" focusable="false"><line x1="0.8" y1="1.2" x2="${w - 0.8}" y2="1.2" stroke="var(--at-warp-strong)" stroke-width="1.6"/>${parts.join('')}</svg>`);
}

// ————— shared fragments —————

function head(ctx, right) {
  const p = ctx.w.position;
  return html`<header class="at-head">
    <span class="at-head-t">${ctx.w.programme.title}</span>
    <span class="at-head-r">${right ?? `Week ${p.week} · Day ${p.day}`}</span>
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
    </button>`
  )}</div>`;
}

function option(title, detail, go, opts = {}) {
  return html`<button class="at-option" data-go="${go}" ${raw(opts.attrs || '')}>
    ${opts.flag ? html`<span class="at-flag ${raw(opts.flagCls || '')}">${opts.flag}</span>` : ''}
    <span class="at-option-title">${title}</span>
    ${detail ? html`<span class="at-option-sub">${detail}</span>` : ''}
  </button>`;
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

// the session thread — drawn by time passing (scaleX, not dash: reliable
// under preserveAspectRatio="none")
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
      const start = acc; acc += s.mins * 60;
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

// ————— screens —————

const screens = {

  'first-launch': (ctx) =>
    page(html`
      <div class="at-hero">
        <div class="at-hero-warp">${warpSvg({ n: 13, h: 96, shuttle: true })}</div>
        <p class="at-wordmark">A quiet practice</p>
        <h1 class="at-display">Twelve<br />Weeks</h1>
        <p class="at-epigraph">What you make here stays made.</p>
        <p class="at-hero-line">One meaningful thing a day. Each day a thread; twelve weeks weave a cloth that is yours to keep.</p>
      </div>
      ${primary('Begin', 'explanation')}
      ${linkrow([{ label: 'I’ve been here before', note: 'restore', go: 'restore' }])}
      ${footline('no streaks · no feeds · nothing to lose')}
    `, { cls: 'at-centered' }),

  explanation: (ctx) =>
    page(html`
      ${head(ctx, 'How it works')}
      <h1 class="at-title">Twelve weeks weave one cloth.</h1>
      <div class="at-point">
        ${picto('thread')}
        <div>
          <h2 class="at-point-h">Each day, one thread</h2>
          <p class="at-point-p">A single meaningful action — what to do, why it matters, how to do it. Around fifteen minutes, never a feed.</p>
        </div>
      </div>
      <div class="at-point">
        ${picto('mend')}
        <div>
          <h2 class="at-point-h">Missed days are mended, not punished</h2>
          <p class="at-point-p">Real weeks have gaps. A gap in the cloth is mended in gold and the cloth holds — nothing you made can be unmade.</p>
        </div>
      </div>
      <div class="at-point">
        ${picto('cloth')}
        <div>
          <h2 class="at-point-h">At the end, the cloth is yours</h2>
          <p class="at-point-p">Twelve woven weeks become a record of what you did — kept on your phone, yours whatever you do next.</p>
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
      <div class="at-swatch-band ${wl.id === ctx.world ? '' : 'is-alt'}">${raw(bandSvg(completedLog(wl), { shuttle: false }))}</div>
      <span class="visually-hidden">Woven sample band for ${wl.programme.title}.</span>
      <h2 class="at-swatch-title">${wl.programme.title}</h2>
      <p class="at-swatch-line">${wl.programme.subtitle}</p>
      <p class="at-swatch-meta">12 weeks · ${mins(wl)} min a day · 5 days a week</p>
      ${current
        ? primary('Read the particulars', 'suitability')
        : html`<p class="at-swatch-meta is-quiet">Switch worlds above to preview this cloth.</p>`}
    </article>`;
    return page(html`
      ${head(ctx, 'The programmes')}
      <h1 class="at-title">Choose a cloth to weave.</h1>
      <p class="at-lede">Each programme is twelve weeks, one day at a time, dyed in its own thread. Choose one; the rest will wait.</p>
      ${swatch(mine, true)}
      ${swatch(other, false)}
      <article class="at-swatch is-soon">
        <div class="at-swatch-band">${raw(bandSvg(emptyLog(), { shuttle: false }))}</div>
        <h2 class="at-swatch-title">The Revision</h2>
        <p class="at-swatch-line">Twelve weeks turning a draft into a book.</p>
        <p class="at-swatch-meta">Warp not yet strung — spring</p>
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
      <h2 class="at-h2">Woven for</h2>
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
      ${head(ctx, 'The loom')}
      <h1 class="at-title">The loom is strung.</h1>
      <p class="at-epigraph is-left">The first thread is tomorrow morning’s.</p>
      <p class="at-lede">Twelve rows of bare warp — one for each week of ${ctx.w.programme.title}. Nothing here fills itself; every thread in this cloth will be one of your days.</p>
      ${loom(ctx, { log: emptyLog(), virgin: true, sr: 'The empty loom: twelve rows of bare warp, waiting.' })}
      ${primary('Open row one', 'today', ctx.w.weeks[0].title)}
      ${footline('84 days · 12 rows · one cloth')}
    `),

  today: (ctx, opts = {}) => {
    const t = ctx.w.today;
    const p = ctx.w.position;
    const woven = wovenCount(ctx.w.log);
    return page(html`
      ${opts.banner || ''}
      ${head(ctx)}
      ${band(ctx, { align: 'min' })}
      ${kicker(t.kicker)}
      <h1 class="at-title is-big">${t.title}</h1>
      <p class="at-why">${t.why}</p>
      ${primary('Begin today’s thread', 'begin', t.durationLabel.replace('utes', ''))}
      ${linkrow([
        { label: 'Show me how', note: `${t.how.length} steps`, go: 'how' },
        { label: 'Something gentler today', note: 'counts in full', go: 'easier' },
        { label: 'Why this matters', go: 'why' },
      ])}
      ${footline(`Row ${p.week} of 12 · ${woven} days woven`, 'journey')}
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
    return page(html`
      ${head(ctx)}
      ${kicker('Show me how')}
      <h1 class="at-title">${t.shortTitle}</h1>
      ${t.how.map(
        (s, i) => html`<div class="at-step">
          <span class="at-step-n" aria-hidden="true">${i + 1}</span>
          <p class="at-step-text"><span class="visually-hidden">Step ${i + 1}. </span>${s.step}</p>
          <p class="at-step-detail">${s.detail}</p>
        </div>`
      )}
      ${careLabel('Take care', t.safety, { cls: 'is-warn' })}
      ${primary('Begin', 'begin', t.durationLabel.replace('utes', ''))}
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
      ${primary('Begin', 'begin', t.durationLabel.replace('utes', ''))}
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
        <p>A gentler thread is still a thread. The cloth will show a day woven — nothing less.</p>
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
      <p class="at-meta">Pause any time. The shuttle holds its place until you come back.</p>
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
      ${kicker('The day’s thread')}
      <h1 class="at-title">${t.shortTitle} — woven.</h1>
      <p class="at-lede">${mmss(Math.max(mem.elapsed, 60))} of honest work, ready to join the cloth.</p>
      ${band(ctx, { log: logTodayDone(ctx.w), align: 'min', cls: 'at-band-roomy', sr: `Today’s thread in place: day ${p.dayOfProgramme} woven.` })}
      ${primary(`Weave in day ${p.dayOfProgramme}`, '__beat')}
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
        ${q.options.map((o, i) => html`<button class="at-option" data-choice="${i}" aria-pressed="false"><span class="at-option-title">${o}</span></button>`)}
      </div>
      ${linkrow([{ label: 'Skip — no answer today', go: 'acknowledge' }])}
    `);
  },

  acknowledge: (ctx) => {
    const a = ctx.w.today.acknowledgement;
    const ackLine = ctx.w.today.question.acknowledgements[mem.choice] ?? '';
    return page(html`
      ${head(ctx)}
      ${band(ctx, { log: logTodayDone(ctx.w), align: 'min', sr: 'The cloth, with today’s thread woven in.' })}
      <div class="at-ack">
        ${kicker('Woven in')}
        <h1 class="at-display is-mid">${a.headline}</h1>
        <p class="at-lede">${a.line}</p>
        <hr class="at-hr" />
        <p class="at-meta">${ackLine}</p>
      </div>
      ${primary('Rest the loom for today', 'journey')}
      ${footline(a.weekLine)}
    `);
  },

  journey: (ctx) =>
    page(html`
      ${head(ctx, 'The cloth')}
      <h1 class="at-title">The cloth so far</h1>
      <p class="at-lede">Every thread here is a day you kept. Gaps stay part of the weave — mended, not erased.</p>
      ${loom(ctx)}
      ${primary('Back to today’s thread', 'today')}
    `),

  'week-transition': (ctx) => {
    const p = ctx.w.position;
    const prev = ctx.w.weeks[p.week - 1];
    const next = ctx.w.weeks[p.week] || ctx.w.weeks[11];
    const doneRow = cloneLog(ctx.w.log)[p.week - 1].map((d) => (d === 'today' || d === 'future' ? 'done' : d));
    return page(html`
      ${head(ctx, `Row ${p.week} · complete`)}
      <div class="at-transition">
        ${kicker('Row complete')}
        <h1 class="at-display is-mid">${prev.title},<br />beaten in.</h1>
        <p class="at-lede">What this row holds: ${prev.focus.charAt(0).toLowerCase()}${prev.focus.slice(1)}.</p>
        <div class="at-trans-rows">
          <div class="at-loom-row">${raw(loomRowSvg(doneRow, p.week - 1, { shuttle: false }))}
            <div class="at-loom-text"><span class="at-loom-n">Row ${p.week}</span><span class="at-loom-title">${prev.title}</span><span class="at-loom-note">woven</span></div>
          </div>
          <div class="at-loom-row is-future">${raw(loomRowSvg(Array(7).fill('future'), p.week, { shuttle: false }))}
            <div class="at-loom-text"><span class="at-loom-n">Row ${p.week + 1}</span><span class="at-loom-title">${next.title}</span><span class="at-loom-note">${next.focus}</span></div>
          </div>
        </div>
        <span class="visually-hidden">Row ${p.week}, ${prev.title}, is fully woven. Row ${p.week + 1}, ${next.title}, is bare warp, ready.</span>
      </div>
      ${primary(`Begin Week ${p.week + 1}`, 'today', next.title)}
      ${footline(`row ${p.week + 1} of twelve · warp already strung`)}
    `);
  },

  'missed-one': (ctx) => {
    const r = ctx.w.recovery.oneDay;
    return page(html`
      ${head(ctx)}
      ${band(ctx, { log: logMissedBack(ctx.w, 1), align: 'min', sr: 'The cloth with one small gap where yesterday would be. Everything woven remains.' })}
      ${kicker('A space in the cloth — not a hole in you')}
      <h1 class="at-title">${r.headline}</h1>
      <p>${r.line}</p>
      <p class="at-mendnote"><i class="at-mendmark" aria-hidden="true"></i>Gaps get mended in gold, and mended places hold. Some are the strongest part of the cloth.</p>
      ${primary('Pick up the thread', 'today', ctx.w.today.durationLabel.replace('utes', ''))}
      ${option(r.altAction, r.altDetail, 'easier')}
      ${footline('nothing woven has been lost')}
    `);
  },

  'missed-several': (ctx) => {
    const r = ctx.w.recovery.severalDays;
    return page(html`
      ${head(ctx)}
      ${band(ctx, { log: logMissedBack(ctx.w, 3), align: 'min', sr: 'The cloth with a short span of bare warp before today. All earlier weeks remain woven.' })}
      ${kicker('The cloth holds')}
      <h1 class="at-title">${r.headline}</h1>
      <p>${r.line}</p>
      ${r.options.map((o, i) => option(o.title, o.detail, 'today', i === 0 ? { flag: 'As planned' } : {}))}
      ${footline('the gap becomes part of the weave — mended, not erased')}
    `);
  },

  'long-absence': (ctx) => {
    const r = ctx.w.recovery.longAbsence;
    return page(html`
      ${head(ctx, 'Welcome back')}
      ${band(ctx, {
        shuttle: false,
        caption: 'what you wove is woven',
        sr: 'The cloth, intact: every day you wove is still here.',
      })}
      <h1 class="at-title">${r.headline}</h1>
      <p>${r.line}</p>
      <h2 class="at-h2">${r.capacityPrompt}</h2>
      <div role="group" aria-label="${r.capacityPrompt}">
        ${r.capacities.map((c, i) => option(c.title, c.detail, 'today', { attrs: `data-capacity="${i}" aria-pressed="false"` }))}
      </div>
      <hr class="at-hr" />
      <p class="at-meta">${r.reschedule}</p>
      ${linkrow([{ label: 'Re-warp the loom', note: 'an honest calendar', go: 'programme-pause' }])}
    `);
  },

  'programme-pause': (ctx) => {
    const r = ctx.w.recovery.pause;
    return page(html`
      ${head(ctx, 'The loom at rest')}
      ${band(ctx, { shuttle: false, caption: 'rolled and kept, exactly as it is', sr: 'The cloth so far, rolled safely on the loom.' })}
      ${kicker('A deliberate rest')}
      <h1 class="at-title">${r.headline}</h1>
      <p>${r.line}</p>
      <p class="at-quiet">${r.detail}</p>
      ${primary(r.action, 'journey')}
      ${linkrow([{ label: 'Not now — back to today', go: 'today', back: true }])}
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
      ${head(ctx, 'A knot')}
      ${kicker('A knot, not a break', { cls: 'is-warn' })}
      <h1 class="at-title">The thread caught on our side.</h1>
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
      ${kicker(`Row ${p.week + 1} · not yet strung`)}
      <h1 class="at-title">${next.title} isn’t on the loom yet.</h1>
      <div class="at-empty-warp">${warpSvg({ n: 13, h: 84 })}</div>
      <p>${ctx.w.system.empty}</p>
      ${primary('Back to this week', 'today')}
    `);
  },

  'week-12': (ctx) => {
    const c = ctx.w.completion;
    return page(html`
      <div class="at-finish">
        <p class="at-wordmark">Row twelve · the last thread</p>
        <h1 class="at-display">${c.headline}</h1>
        ${band(ctx, {
          log: completedLog(ctx.w), selvedge: true, shuttle: false, cls: 'at-band-roomy is-finished',
          sr: 'The finished cloth: eighty-four days, twelve rows, selvedge bound, one day mended in gold.',
        })}
        <p class="at-lede is-center">${c.line}</p>
      </div>
      ${primary('See what you made', 'artefact')}
      ${footline('84 days · 12 rows · one cloth — mends and all')}
    `, { cls: 'at-centered' });
  },

  artefact: (ctx) => {
    const c = ctx.w.completion;
    return page(html`
      ${head(ctx, 'The kept cloth')}
      <div class="at-plate">
        <p class="at-plate-sub">${c.artefact.subtitle}</p>
        <h1 class="at-plate-title">${c.artefact.title}</h1>
        ${band(ctx, {
          log: completedLog(ctx.w), selvedge: true, shuttle: false, cls: 'at-band-roomy is-finished',
          sr: 'The finished woven band, kept: twelve rows, selvedge bound, mends visible in gold.',
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
      ${kicker('The loom can rest, or be re-strung')}
      <h1 class="at-title">${h.line}</h1>
      ${h.options.map((o, i) =>
        option(o.title, o.detail, i === 2 ? 'explore' : 'subscription', i === 0 ? { flag: 'Recommended' } : {})
      )}
      ${footline('whatever you choose, this cloth stays woven')}
    `);
  },

  subscription: (ctx) => {
    const s = ctx.w.subscription;
    return page(html`
      ${head(ctx, 'Membership')}
      <h1 class="at-title">${s.headline}</h1>
      <div class="at-price">
        <span class="at-price-big">${s.price}</span>
        <span class="at-price-per">${s.per}<br />${s.monthlyAlt}</span>
      </div>
      <p class="at-meta">${s.trial}</p>
      <h2 class="at-h2">What the price holds</h2>
      ${s.includes.map((x) => html`<p class="at-listline"><i class="at-stitchmark" aria-hidden="true"></i>${x}</p>`)}
      <h2 class="at-h2">The terms, plainly</h2>
      ${s.terms.map((t, i) => html`<div class="at-term"><span class="at-term-n" aria-hidden="true">${i + 1}</span><p>${t}</p></div>`)}
      <p class="at-meta">${s.renewal}</p>
      ${primary('Start Week One free', 'today')}
      ${ghostBtn('Not now', 'explore')}
      <p class="at-epigraph is-left is-small">If you ever cancel, the cloth is yours to keep.</p>
      ${linkrow([{ label: 'Restore a previous purchase', go: 'restore' }])}
    `);
  },

  expired: (ctx) => {
    const e = ctx.w.expired;
    return page(html`
      ${head(ctx, 'Membership')}
      ${band(ctx, { shuttle: false, caption: 'yours, membership or none', sr: 'The cloth you wove, intact and readable.' })}
      ${kicker('Lapsed — nothing lost')}
      <h1 class="at-title">${e.headline}</h1>
      <p>${e.line}</p>
      ${primary(e.action, 'subscription')}
      ${ghostBtn(e.secondary, 'artefact')}
      ${linkrow([{ label: 'Read my record', go: 'journey' }])}
    `);
  },

  restore: (ctx) =>
    page(html`
      ${head(ctx, 'Restore')}
      <h1 class="at-title">${ctx.w.restore.headline}</h1>
      <p>${ctx.w.restore.line}</p>
      ${mem.restored
        ? html`${careLabel('Restored', ctx.w.restore.done, { attrs: 'role="status"', cls: 'is-good' })}
          ${primary('Open today’s thread', 'today')}`
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
      <p class="at-specnum is-tab">0123456789 · 00:00 → ${padMin(t.duration)}:00 — tabular, timers</p>
      <div class="at-specglyphs" aria-hidden="true">
        <span class="at-specpair">${raw(specGlyph('done'))}<span>day woven</span></span>
        <span class="at-specpair">${raw(specGlyph('mended'))}<span>mended</span></span>
        <span class="at-specpair">${raw(specGlyph('rest'))}<span>rest</span></span>
        <span class="at-specpair">${raw(specGlyph('today'))}<span>the shuttle</span></span>
      </div>
      <p class="at-kicker"><i class="at-dot" aria-hidden="true"></i>${t.kicker}</p>
      <p class="at-loom-n" style="display:block;margin:4px 0 2px;">Row ${ctx.w.position.week} · ${ctx.w.position.weekTheme}</p>
      <h2 class="at-display is-mid" style="margin-top:18px;">${ctx.w.completion.headline}</h2>
      <p class="at-meta">Small metadata · ${t.acknowledgement.weekLine}</p>
      <hr class="at-hr" />
      ${kicker('The other world · same system, its own dye', { plain: true })}
      <h2 class="at-title" style="font-size:calc(var(--ts) * 1.35rem);">${other.today.title}</h2>
      <p class="at-meta">${other.programme.title} · thread dyed ${other.id === 'writing' ? 'indigo' : 'madder'}</p>
      ${footline('specimen')}
    `);
  },
};

function padMin(n) {
  return String(n).padStart(2, '0');
}

function specGlyph(kind) {
  const w = 18, h = 26;
  let inner = `<line x1="3" y1="7" x2="15" y2="7" stroke="var(--at-warp)" stroke-width="1"/><line x1="3" y1="13" x2="15" y2="13" stroke="var(--at-warp)" stroke-width="1"/><line x1="3" y1="19" x2="15" y2="19" stroke="var(--at-warp)" stroke-width="1"/>`;
  if (kind === 'done') inner += `<line x1="9" y1="3" x2="9" y2="23" stroke="var(--at-thread)" stroke-width="2.2" stroke-linecap="round"/>`;
  if (kind === 'rest') inner += `<line x1="9" y1="8" x2="9" y2="18" stroke="var(--at-thread)" stroke-width="1.8" stroke-linecap="round" opacity="0.38"/>`;
  if (kind === 'mended') inner += `<line x1="6" y1="9" x2="12" y2="9" stroke="var(--at-mend)" stroke-width="1.8" stroke-linecap="round"/><line x1="6" y1="17" x2="12" y2="17" stroke="var(--at-mend)" stroke-width="1.8" stroke-linecap="round"/>`;
  if (kind === 'today') inner += `<path d="M 9 4 C 11.4 7.5 11.4 18.5 9 22 C 6.6 18.5 6.6 7.5 9 4 Z" fill="var(--at-thread)"/>`;
  return `<svg viewBox="0 0 ${w} ${h}" class="at-specglyph" aria-hidden="true" focusable="false">${inner}</svg>`;
}

// ————— mount: wire interactions —————

function mount(root, ctx) {
  root.querySelectorAll('[data-go]').forEach((el) => {
    el.addEventListener('click', () => {
      const target = el.getAttribute('data-go');
      if (target === '__beat') {
        // the new thread beats up into the cloth, then one question
        const shuttle = root.querySelector('.at-band-roomy .at-band-svg');
        ctx.announce(`Day ${ctx.w.position.dayOfProgramme} woven into the cloth.`);
        if (shuttle && !reducedMotion(ctx)) {
          shuttle.classList.add('at-beat');
          setTimeout(() => ctx.go('question'), 420);
        } else {
          ctx.go('question');
        }
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
      el.setAttribute('aria-pressed', 'true');
      setTimeout(() => ctx.go('acknowledge'), reducedMotion(ctx) ? 0 : 180);
    });
  });

  root.querySelectorAll('[data-capacity]').forEach((el) => {
    el.addEventListener('click', () => {
      el.setAttribute('aria-pressed', 'true');
    });
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
    makeTicker(root, () => {
      mem.elapsed = Math.min(mem.elapsed + 1, total);
      if (digits) digits.textContent = mmss(mem.elapsed);
      if (seg) seg.textContent = currentSegment(ctx.w, mem.elapsed).label;
      if (thread) thread.style.transform = `scaleX(${(mem.elapsed / total).toFixed(4)})`;
      plan.forEach((li, i) => {
        const start = i === 0 ? 0 : segEnds[i - 1];
        li.classList.toggle('is-now', mem.elapsed >= start && mem.elapsed < segEnds[i]);
        li.classList.toggle('is-done', mem.elapsed >= segEnds[i]);
      });
      if (mem.elapsed === total) ctx.announce('Session complete. The thread is drawn — well done.');
      else if (mem.elapsed % 60 === 0) ctx.announce(`${mmss(mem.elapsed)} elapsed. ${currentSegment(ctx.w, mem.elapsed).label}.`);
    });
  }

  if (ctx.state === 'begin') mem.elapsed = 0;
}

export default {
  id: 'c',
  name: 'Atelier',
  tagline: 'The weave — every day adds a thread, and the cloth holds even where one is missed.',
  render(state, ctx) {
    const fn = screens[state] || screens.today;
    return { html: fn(ctx), mount };
  },
};
