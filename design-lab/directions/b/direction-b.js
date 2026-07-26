// DIRECTION B — MERIDIAN. The instrument.
// Governing idea: a fine field instrument for a twelve-week undertaking —
// one glance gives the reading, one control arms the work. Warm precision:
// bone faces, engraved wide labels, mono readouts, one amber control that
// means "armed". The instrument never judges; it holds your place.

import { html, raw, render, mmss, pad2, makeTicker, makeTimeout, reducedMotion } from '../../shared/dom.js';
import { WORLDS } from '../../shared/fixtures.js';

// Session + choice state shared across this direction's screens.
// `elapsed` is pre-seeded so deep-linking straight to active/paused shows a
// mid-session reading; the `begin` screen resets it to 0 on mount.
const mem = { elapsed: 277, prepDone: new Set(), choice: 1, restored: false };

const up = (s) => String(s).toUpperCase();

function totalSeconds(w) {
  return w.today.activity.segments.reduce((a, s) => a + s.mins, 0) * 60;
}
function totalMins(w) {
  return w.today.activity.segments.reduce((a, s) => a + s.mins, 0);
}
function segAt(w, elapsed) {
  let acc = 0;
  for (const s of w.today.activity.segments) {
    acc += s.mins * 60;
    if (elapsed < acc) return s;
  }
  return w.today.activity.segments[w.today.activity.segments.length - 1];
}
function segStates(w, elapsed) {
  let acc = 0;
  return w.today.activity.segments.map((s) => {
    const start = acc;
    acc += s.mins * 60;
    return { ...s, state: elapsed >= acc ? 'done' : elapsed >= start ? 'now' : 'todo' };
  });
}
// Deterministic illustrative minutes for recorded log entries (derived from
// the world's session duration — never hardcoded per world).
function minsFor(w, wi, di) {
  return w.today.duration + ((wi * 3 + di * 5) % 7) - 3;
}
function specMinutes(w) {
  const m = w.programme.expectations[0].match(/\d+\s*[–—-]\s*\d+/);
  return m ? m[0].replace(/\s/g, '') : '';
}
// Position readout, in plain words — never a fraction, never jargon.
function dayStatus(w) {
  const p = w.position;
  return `DAY ${p.dayOfProgramme} OF 84 · WEEK ${pad2(p.week)} OF 12`;
}

// ————— engraved fragments —————

function shell(inner, cls = '') {
  return html`<div class="mb ${raw(cls)}">${inner}</div>`;
}

function head(w, right) {
  const p = w.position;
  return html`<header class="mb-head">
    <span class="mb-head-brand">Twelve Weeks</span>
    <span class="mb-head-right">${right ?? `${w.short} · W${pad2(p.week)}·D${p.day}`}</span>
  </header>`;
}

function posKicker(w) {
  const p = w.position;
  return `Week ${pad2(p.week)} · Day ${p.day} — ${p.weekTheme}`;
}

function h2(t) {
  return html`<h2 class="mb-h2">${t}</h2>`;
}

function arm(label, go, read, cls = '') {
  return html`<button class="mb-arm ${raw(cls)}" data-go="${go}">
    <span class="mb-arm-label">${label}</span>
    ${read ? html`<span class="mb-arm-read">${read}</span>` : ''}
  </button>`;
}

function rows(items) {
  return html`<div class="mb-rows">${items.map(
    (it) => html`<button class="mb-row${it.back ? ' is-back' : ''}" data-go="${it.go}">
      <span class="mb-row-label">${it.back ? '← ' : ''}${it.label}</span>
      ${it.note ? html`<span class="mb-row-note${it.full ? ' is-full' : ''}">${it.note}</span>` : ''}
      ${!it.back ? html`<span class="mb-row-chev" aria-hidden="true">›</span>` : ''}
    </button>`
  )}</div>`;
}

function caution(label, text) {
  return html`<div class="mb-caution">
    <span class="mb-caution-label">${label}</span>
    <p class="mb-caution-text">${text}</p>
  </div>`;
}

// Bordered status plate (offline / restored). The live text is injected one
// frame after insertion (see mount) so screen readers reliably announce it.
function sysplate(label, text, opts = {}) {
  return html`<div class="mb-sys ${raw(opts.cls || '')}" role="${opts.role || 'status'}">
    <span class="mb-sys-label">${label}</span>
    <p class="mb-sys-text" data-live-text="${text}"></p>
  </div>`;
}

function listRow(text) {
  return html`<div class="mb-li"><span class="mb-li-tick" aria-hidden="true"></span><span>${text}</span></div>`;
}

// ————— THE RAIL (horizontal, SVG, decorative — data repeats as text) —————
// modes: 'zero' | 'open' (zero, detent 01 highlighted) | 'today' | 'advance' | 'complete'

function railSVG(w, mode = 'today') {
  const p = w.position;
  const L = 10, R = 362, SPAN = R - L;
  const x = (d) => L + (d / 84) * SPAN;
  const Dnow =
    mode === 'complete' ? 84
    : mode === 'zero' || mode === 'open' ? 0
    : mode === 'advance' ? p.dayOfProgramme
    : p.dayOfProgramme - 1;
  const curWeek = mode === 'zero' || mode === 'open' ? 1 : mode === 'complete' ? 12 : p.week;
  const parts = [];
  parts.push(html`<rect class="r-base" x="${L}" y="23.5" width="${SPAN}" height="1" />`);
  for (let d = 1; d < 84; d++) {
    if (d % 7 === 0) continue; // a major detent lives here
    parts.push(html`<rect class="rt-min${d < Dnow ? ' is-past' : ''}" x="${(x(d) - 0.5).toFixed(2)}" y="17.5" width="1" height="6.5" />`);
  }
  parts.push(html`<rect class="rt-cap${mode === 'complete' ? ' is-comp' : ''}" x="${R - 1}" y="14" width="2" height="10" />`);
  for (let k = 1; k <= 12; k++) {
    const xx = x((k - 1) * 7);
    const done = mode === 'complete' || k < curWeek;
    const cur = mode !== 'complete' && k === curWeek;
    const cls =
      mode === 'complete' ? 'rt-maj is-comp'
      : done ? 'rt-maj is-done'
      : cur ? (mode === 'open' ? 'rt-maj is-open' : 'rt-maj is-cur')
      : 'rt-maj is-fut';
    parts.push(html`<rect class="${cls}" x="${(xx - 1.25).toFixed(2)}" y="12" width="2.5" height="12" />`);
    parts.push(html`<text class="rn${cur ? ' is-cur' : ''}${mode === 'complete' ? ' is-comp' : ''}" x="${xx.toFixed(2)}" y="40" text-anchor="middle">${pad2(k)}</text>`);
  }
  const cx = (x(Math.min(Dnow, 84)) - L).toFixed(1);
  return html`<svg class="mb-rail" viewBox="0 0 372 46" aria-hidden="true" focusable="false">
    ${parts}
    <g class="mb-carriage" style="--cx:${cx}px">
      <polygon points="${L - 5},2.5 ${L + 5},2.5 ${L},9.5" />
      <rect x="${L - 0.75}" y="2.5" width="1.5" height="25" />
    </g>
  </svg>`;
}

function foot(w, opts = {}) {
  const mode = opts.mode || 'today';
  const st =
    opts.status ??
    (mode === 'zero' || mode === 'open'
      ? 'DAY 1 OF 84 · WEEK 01 OF 12'
      : mode === 'complete'
        ? 'DAY 84 OF 84 · WEEK 12 OF 12'
        : dayStatus(w));
  const inner = html`<span class="mb-foot-status">${st}</span>${railSVG(w, mode)}`;
  return opts.link === false
    ? html`<div class="mb-foot">${inner}</div>`
    : html`<button class="mb-foot" data-go="journey" aria-label="${st} — see the twelve weeks">${inner}</button>`;
}

// ————— SESSION BEZEL —————

function bezel(w, elapsed, hold) {
  const total = totalSeconds(w);
  const frac = Math.min(elapsed / total, 1);
  const RAD = 74, C = 2 * Math.PI * RAD;
  const ticks = [];
  for (let i = 0; i < 60; i++) {
    const a = (i * 6 * Math.PI) / 180;
    const big = i % 5 === 0;
    const r1 = big ? 83 : 87;
    const r2 = 95;
    ticks.push(html`<line class="${big ? 'bz-t5' : 'bz-t1'}"
      x1="${(100 + r1 * Math.sin(a)).toFixed(2)}" y1="${(100 - r1 * Math.cos(a)).toFixed(2)}"
      x2="${(100 + r2 * Math.sin(a)).toFixed(2)}" y2="${(100 - r2 * Math.cos(a)).toFixed(2)}" />`);
  }
  return html`<div class="mb-bezel${hold ? ' is-hold' : ''}">
    <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      ${ticks}
      <circle class="bz-track" cx="100" cy="100" r="${RAD}" />
      <circle class="bz-arc" id="mb-arc" cx="100" cy="100" r="${RAD}"
        stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C * (1 - frac)).toFixed(1)}"
        transform="rotate(-90 100 100)" />
      <polygon class="bz-idx" points="96.5,1.5 103.5,1.5 100,8" />
    </svg>
    <div class="mb-bezel-center">
      <span class="mb-bezel-mode">${hold ? 'Hold' : html`Rec<i class="mb-recdot" aria-hidden="true"></i>`}</span>
      <span class="mb-bezel-digits" id="mb-digits" role="timer" aria-live="off">${mmss(Math.min(elapsed, total))}</span>
      <span class="mb-bezel-of">of ${mmss(total)}</span>
    </div>
  </div>`;
}

function segRows(w, elapsed) {
  return segStates(w, elapsed).map(
    (s) => html`<li class="mb-seg is-${s.state}">
      <span class="mb-seg-tick" aria-hidden="true"></span>
      <span class="mb-seg-label">${s.label}</span>
      <span class="mb-seg-val">${s.state === 'done' ? 'DONE' : `${s.mins} MIN`}</span>
    </li>`
  );
}

// Session plan rows for the begin screen — engraved hairline leaders,
// deliberately not a checklist.
function planRows(w) {
  return w.today.activity.segments.map(
    (s) => html`<li class="mb-plan-row">
      <span class="mb-plan-label">${s.label}</span>
      <span class="mb-plan-lead" aria-hidden="true"></span>
      <span class="mb-plan-val">${s.mins} MIN</span>
    </li>`
  );
}

// ————— vertical rail (journey) —————
// Completed weeks collapse to one summary line — the instrument keeps a
// place, not an audit trail. Only the current week shows its days.

function logEntry(w, wi, di, d) {
  const id = `W${pad2(wi + 1)}·D${di + 1}`;
  const title = up(w.weeks[wi].title);
  const mins = minsFor(w, wi, di);
  let text;
  switch (d) {
    case 'done': text = `${id} — ${title} — ${mins} MIN`; break;
    case 'mended': text = `${id} — ${title} — ${mins} MIN · MENDED`; break;
    case 'missed': text = `${id} — NO READING —`; break;
    case 'rest': text = `${id} — REST`; break;
    case 'today': text = `${id} — ${up(w.position.weekTheme)} — TODAY`; break;
    default: text = id; break;
  }
  return html`<li class="mb-log d-${d}"><i class="mb-log-tick" aria-hidden="true"></i><span>${text}</span></li>`;
}

function vweek(w, i) {
  const p = w.position;
  const wk = w.weeks[i];
  const n = i + 1;
  const past = n < p.week;
  const cur = n === p.week;
  const next = n === p.week + 1;
  const days = w.log[i];
  let note = '';
  if (past) {
    const rec = days.filter((d) => d === 'done' || d === 'mended').length;
    const rest = days.filter((d) => d === 'rest').length;
    note = `${rec} readings${rest ? ` · ${rest} rest` : ''}${days.includes('mended') ? ' · one mended' : ''}`;
  }
  if (cur) note = `Day ${p.day} of 7`;
  const cls = past ? 'is-past' : cur ? 'is-cur' : next ? 'is-next' : 'is-later';
  return html`<li class="mb-vweek ${cls}${i === 0 ? ' is-first' : ''}">
    <span class="mb-vgut" aria-hidden="true"><i class="mb-vdet"></i></span>
    <div class="mb-vbody">
      <div class="mb-vhead">
        <span class="mb-vnum">${pad2(n)}</span>
        <span class="mb-vtitle">${past || cur || next ? wk.title : 'Not open yet'}</span>
        ${note ? html`<span class="mb-vnote">${note}</span>` : ''}
      </div>
      ${cur ? html`<ul class="mb-vlog">${days.map((d, di) => logEntry(w, i, di, d))}</ul>` : ''}
      ${next ? html`<span class="mb-vopen">Opens when week ${pad2(p.week)} closes</span>` : ''}
    </div>
  </li>`;
}

// ————— screens —————

const screens = {
  'first-launch': (ctx) =>
    shell(html`
      <div class="mb-launch">
        <p class="mb-eng mb-launch-over">A twelve-week instrument</p>
        <h1 class="mb-display">Twelve<br />Weeks</h1>
        <p class="mb-launch-line">One meaningful action a day — measured, recorded, kept — for one honest quarter of a year.</p>
        ${foot(ctx.w, { mode: 'zero', status: 'DAY 1 OF 84 · READY', link: false })}
        ${arm('Begin', 'explanation')}
        ${rows([{ label: 'I’ve been here before', note: 'Restore', go: 'restore' }])}
        <p class="mb-eng mb-launch-under">No streaks · no feeds · one reading a day</p>
      </div>
    `, 'mb-center'),

  explanation: (ctx) =>
    shell(html`
      ${head(ctx.w, 'How it works')}
      <h1 class="mb-title">An instrument, not a feed.</h1>
      <p class="mb-lede">One glance gives the reading. One control arms the work. Everything else stays out of the way.</p>
      ${[
        ['One programme at a time', 'Twelve weeks, one undertaking. The instrument carries a single programme — no library to wander, no catalogue anxiety.'],
        ['One reading a day', 'Each day asks for one meaningful action: what to do, why it matters, how to begin — and a gentler form that counts in full.'],
        ['Built for real weeks', 'Miss a day or a fortnight and the rail keeps your place. Nothing recorded is ever taken back.'],
      ].map(
        ([t, p], i) => html`<div class="mb-idx">
          <span class="mb-idx-n">${pad2(i + 1)}</span>
          <div><span class="mb-idx-h">${t}</span>
          <p class="mb-idx-p">${p}</p></div>
        </div>`
      )}
      ${arm('Choose your programme', 'explore')}
    `),

  explore: (ctx) => {
    const w = ctx.w;
    const other = WORLDS[ctx.world === 'strength' ? 'writing' : 'strength'];
    return shell(html`
      ${head(w, 'Programmes')}
      <h1 class="mb-title">The programmes.</h1>
      <p class="mb-lede">Each is twelve weeks, one reading a day. Choose one; the rest will wait.</p>
      <section class="mb-card">
        <span class="mb-card-flag">Open for enrolment</span>
        <h2 class="mb-card-title">${w.programme.title}</h2>
        <p class="mb-card-line">${w.programme.subtitle}</p>
        <span class="mb-card-spec">12 WK · ${specMinutes(w)} MIN/DAY · 5 DAYS/WK</span>
        <button class="mb-option is-solo" data-go="suitability"><span class="mb-option-title">Read the particulars</span></button>
      </section>
      <section class="mb-card">
        <h2 class="mb-card-title">${other.programme.title}</h2>
        <p class="mb-card-line">${other.programme.subtitle}</p>
        <span class="mb-card-spec">12 WK · ${specMinutes(other)} MIN/DAY · 5 DAYS/WK</span>
        <span class="mb-card-note">Switch worlds above to preview this programme.</span>
      </section>
      <section class="mb-card is-sealed">
        <h2 class="mb-card-title">Further programmes</h2>
        <p class="mb-card-line">One at a time is the point — new instruments are calibrated slowly.</p>
        <span class="mb-card-spec">IN PREPARATION — SPRING</span>
      </section>
    `);
  },

  suitability: (ctx) => {
    const pr = ctx.w.programme;
    return shell(html`
      ${head(ctx.w, 'Particulars')}
      <h1 class="mb-title">${pr.title}</h1>
      <p>${pr.promise}</p>
      ${h2('Who it’s for')}
      ${pr.whoFor.map((t) => listRow(t))}
      ${h2('What to expect')}
      ${pr.expectations.map((t) => listRow(t))}
      ${caution('Caution — read once', pr.notFor)}
      ${arm('Begin the twelve weeks', 'start-journey', 'WK 1 FREE')}
      ${rows([{ label: 'Back to the programmes', go: 'explore', back: true }])}
    `);
  },

  'start-journey': (ctx) => {
    const w = ctx.w;
    const first = w.weeks[0];
    return shell(html`
      ${head(w, 'Day 01')}
      <p class="mb-kicker">The twelve weeks open</p>
      <h1 class="mb-title">Twelve weeks. Eighty-four days. One rail.</h1>
      ${foot(w, { mode: 'open', link: false })}
      <section class="mb-face">
        <p class="mb-kicker mb-kicker-amber">Detent 01 — this week</p>
        <h2 class="mb-face-title">${first.title}</h2>
        <p class="mb-face-line">${first.focus}</p>
      </section>
      <p class="mb-meta">Detents 02–12 open as you reach them — one week at a time, on purpose.</p>
      ${arm('Take the first reading', 'today')}
    `);
  },

  today: (ctx, opts = {}) => {
    const w = ctx.w;
    const t = w.today;
    return shell(html`
      ${opts.plate || ''}
      ${head(w)}
      <section class="mb-face mb-face-today">
        <p class="mb-kicker">${posKicker(w)}</p>
        <h1 class="mb-title">${t.title}</h1>
        <p class="mb-why">${t.why}</p>
        <div class="mb-face-foot">
          <span class="mb-eng">Duration</span>
          <span class="mb-read">${t.duration} MIN</span>
        </div>
      </section>
      ${arm('Begin', 'begin', `${t.duration} min`)}
      ${rows([
        { label: 'Show me how', note: `${pad2(t.how.length)} steps`, go: 'how' },
        { label: 'Something gentler today', note: 'Counts in full', full: true, go: 'easier' },
        { label: 'Why this matters', go: 'why' },
      ])}
      ${foot(w)}
    `, 'mb-today');
  },

  why: (ctx) => {
    const t = ctx.w.today;
    return shell(html`
      ${head(ctx.w)}
      <p class="mb-kicker">Why this matters</p>
      <h1 class="mb-title">${t.title}</h1>
      <p>${t.why}</p>
      <p>${t.whyDeeper}</p>
      <div class="mb-milestone">
        <span class="mb-eng">Milestone</span>
        <p>${t.milestone}</p>
      </div>
      ${arm('Show me how', 'how')}
      ${rows([{ label: 'Back to today', go: 'today', back: true }])}
    `);
  },

  how: (ctx) => {
    const t = ctx.w.today;
    return shell(html`
      ${head(ctx.w)}
      <p class="mb-kicker">Procedure — ${t.shortTitle}</p>
      <h1 class="mb-title">Show me how.</h1>
      ${t.how.map(
        (s, i) => html`<div class="mb-step">
          <span class="mb-step-n">${pad2(i + 1)}</span>
          <div class="mb-step-body">
            <p class="mb-step-text">${s.step}</p>
            <p class="mb-step-detail">${s.detail}</p>
          </div>
        </div>`
      )}
      ${caution('Take care', t.safety)}
      ${arm('Begin', 'begin', `${t.duration} min`)}
      ${rows([
        { label: 'What you’ll need', note: `${pad2(t.prep.length)} items`, go: 'prep' },
        { label: 'Back to today', go: 'today', back: true },
      ])}
    `);
  },

  prep: (ctx) => {
    const t = ctx.w.today;
    return shell(html`
      ${head(ctx.w)}
      <p class="mb-kicker">Before you begin</p>
      <h1 class="mb-title">What you’ll need.</h1>
      <div role="group" aria-label="Preparation checklist" class="mb-checks">
        ${t.prep.map(
          (p, i) => html`<button class="mb-check" data-check="${i}" aria-pressed="${mem.prepDone.has(i)}">
            <span class="mb-check-box" aria-hidden="true"></span>
            <span class="mb-check-label">${p}</span>
          </button>`
        )}
      </div>
      <p class="mb-meta">Ticking is optional — the list simply waits here every day.</p>
      ${arm('Begin', 'begin', `${t.duration} min`)}
      ${rows([{ label: 'Back to the procedure', go: 'how', back: true }])}
    `);
  },

  easier: (ctx) => {
    const t = ctx.w.today;
    return shell(html`
      ${head(ctx.w)}
      <p class="mb-kicker">The gentler form</p>
      <h1 class="mb-title">${t.easier.title}</h1>
      <div class="mb-fullplate">
        <span class="mb-fullplate-flag">Counts in full</span>
        <p>The record will show a day kept — nothing less, nothing starred.</p>
      </div>
      <p>${t.easier.why}</p>
      <p>${t.easier.detail}</p>
      ${arm('Take this form today', 'begin')}
      ${rows([
        { label: 'The further form', note: 'Feeling strong?', go: 'advanced' },
        { label: 'Back to today', go: 'today', back: true },
      ])}
    `);
  },

  advanced: (ctx) => {
    const t = ctx.w.today;
    return shell(html`
      ${head(ctx.w)}
      <p class="mb-kicker">The further form</p>
      <h1 class="mb-title">${t.advanced.title}</h1>
      <p>${t.advanced.why}</p>
      <p>${t.advanced.detail}</p>
      ${caution('Only if today reads strong', 'The plain form is the programme; this is a variation, not a target.')}
      ${arm('Take the further form', 'begin')}
      ${rows([{ label: 'Back to today', go: 'today', back: true }])}
    `);
  },

  begin: (ctx) => {
    const w = ctx.w;
    const t = w.today;
    return shell(html`
      ${head(w, 'Ready')}
      <p class="mb-kicker">Session plan</p>
      <h1 class="mb-title">${t.shortTitle}.</h1>
      <section class="mb-face">
        <ul class="mb-plan">${planRows(w)}</ul>
        <div class="mb-face-foot">
          <span class="mb-eng">Total</span>
          <span class="mb-read">${totalMins(w)} MIN</span>
        </div>
      </section>
      <p class="mb-meta">Pause any time. The bezel holds; holding is not failing.</p>
      ${arm('Begin now', 'active', `${totalMins(w)} min`)}
      ${rows([{ label: 'Back to today', go: 'today', back: true }])}
    `);
  },

  active: (ctx) => {
    const w = ctx.w;
    return shell(html`
      ${head(w, 'In session')}
      ${bezel(w, mem.elapsed, false)}
      <p class="mb-bezel-seg" id="mb-seg">${segAt(w, mem.elapsed).label}</p>
      <ul class="mb-segs" id="mb-segs">${segRows(w, mem.elapsed)}</ul>
      ${arm('Hold', 'paused')}
      ${rows([{ label: 'Finish early — it still counts', go: 'complete' }])}
    `);
  },

  paused: (ctx) => {
    const w = ctx.w;
    return shell(html`
      ${head(w, 'Hold')}
      ${bezel(w, mem.elapsed, true)}
      <p class="mb-bezel-seg is-hold">${w.today.activity.pauseNote}</p>
      ${arm('Resume', 'active')}
      ${rows([
        { label: 'Save the rest for later today', go: 'today' },
        { label: 'End here — it still counts', go: 'complete' },
      ])}
    `);
  },

  complete: (ctx) => {
    const w = ctx.w;
    const t = w.today;
    const p = w.position;
    return shell(html`
      ${head(w)}
      <p class="mb-kicker">Reading complete</p>
      <h1 class="mb-title">${t.shortTitle} — done.</h1>
      <p class="mb-lede">That counts in full. Press it into the log.</p>
      <div class="mb-face mb-entryplate">
        <span class="mb-entry-line">W${pad2(p.week)}·D${p.day} — ${up(t.shortTitle)}</span>
        <span class="mb-stamp" id="mb-stamp" aria-hidden="true">Recorded</span>
      </div>
      ${arm(`Record day ${p.dayOfProgramme}`, '__record')}
      ${rows([{ label: 'Back to the session', go: 'active', back: true }])}
    `);
  },

  question: (ctx) => {
    const q = ctx.w.today.question;
    return shell(html`
      ${head(ctx.w)}
      <p class="mb-kicker">One question — then the day is filed</p>
      <h1 class="mb-title">${q.prompt}</h1>
      <p class="mb-meta">${q.why}</p>
      <div class="mb-dialwrap">
        <div class="mb-dial" role="group" aria-label="${q.prompt}">
          ${q.options.map(
            (o, i) => html`<button class="mb-dial-opt" data-choice="${i}">
              <span class="mb-dial-socket" aria-hidden="true"></span>
              <span class="mb-dial-body"><span class="mb-dial-title">${o}</span></span>
            </button>`
          )}
        </div>
      </div>
      ${rows([{ label: 'Skip — no answer today', go: 'acknowledge' }])}
    `);
  },

  acknowledge: (ctx) => {
    const w = ctx.w;
    const a = w.today.acknowledgement;
    const p = w.position;
    const ackLine = w.today.question.acknowledgements[mem.choice] ?? '';
    return shell(html`
      ${head(w)}
      <h1 class="mb-title mb-ack-head">${a.headline}</h1>
      <p>${a.line}</p>
      <p class="mb-meta">${ackLine}</p>
      <div class="mb-face mb-entryplate">
        <span class="mb-entry-line">W${pad2(p.week)}·D${p.day} — ${up(w.today.shortTitle)}</span>
        <span class="mb-stamp is-set" aria-hidden="true">Recorded</span>
      </div>
      ${foot(w, { mode: 'advance', status: up(a.weekLine) })}
      ${arm('Close the instrument for today', 'journey')}
    `);
  },

  journey: (ctx) => {
    const w = ctx.w;
    return shell(html`
      ${head(w, 'The twelve weeks')}
      <div class="mb-jhead">
        <h1 class="mb-title">The twelve weeks.</h1>
        <span class="mb-foot-status">${dayStatus(w)}</span>
      </div>
      <ol class="mb-vrail">${w.weeks.map((wk, i) => vweek(w, i))}</ol>
      ${arm('Back to today’s reading', 'today')}
    `);
  },

  'week-transition': (ctx) => {
    const w = ctx.w;
    const p = w.position;
    const next = w.weeks[p.week] || w.weeks[11];
    return shell(html`
      ${head(w, 'Detent advance')}
      <div class="mb-advance">
        <p class="mb-kicker">Detent advance</p>
        <div class="mb-adv-nums" aria-hidden="true">
          <span class="is-prev">${pad2(p.week)}</span>
          <span class="mb-adv-arrow">→</span>
          <span>${pad2(p.week + 1)}</span>
        </div>
        <p class="visually-hidden">Week ${p.week} complete. Week ${p.week + 1} begins.</p>
        <h1 class="mb-title">${next.title}</h1>
        <p class="mb-adv-focus">${next.focus}</p>
      </div>
      <div class="mb-milestone">
        <span class="mb-eng">What week ${pad2(p.week)} leaves you with</span>
        <p>${w.today.milestone}</p>
      </div>
      ${arm(`Begin week ${pad2(p.week + 1)}`, 'today')}
      <p class="mb-foot-status mb-adv-meta">DETENTS 01–${pad2(p.week)} DONE · ${pad2(12 - p.week)} TO COME</p>
    `);
  },

  'missed-one': (ctx) => {
    const w = ctx.w;
    const r = w.recovery.oneDay;
    return shell(html`
      ${head(w)}
      <div class="mb-face mb-entryplate is-quiet">
        <span class="mb-entry-line is-missed">— NO READING YESTERDAY —</span>
      </div>
      <h1 class="mb-title">${r.headline}</h1>
      <p>${r.line}</p>
      <p class="mb-meta">The rail is where you left it. No reading is simply a blank graduation — never a mark against you.</p>
      ${arm(r.action, 'today')}
      ${rows([{ label: r.altAction, note: 'Counts in full', full: true, go: 'easier' }])}
      <p class="mb-meta">${r.altDetail}</p>
      ${foot(w)}
    `);
  },

  'missed-several': (ctx) => {
    const w = ctx.w;
    const r = w.recovery.severalDays;
    const p = w.position;
    return shell(html`
      ${head(w)}
      <p class="mb-kicker">Your place is kept</p>
      <h1 class="mb-title">${r.headline}</h1>
      <p>${r.line}</p>
      <div class="mb-options">
        ${r.options.map(
          (o, i) => html`<button class="mb-option" data-go="today">
            ${i === 0 ? html`<span class="mb-option-flag">As planned</span>` : ''}
            <span class="mb-option-title">${o.title}</span>
            <span class="mb-option-sub">${o.detail}</span>
          </button>`
        )}
      </div>
      <p class="mb-foot-status">WEEKS 01–${pad2(p.week - 1)} KEPT · NOTHING LOST</p>
    `);
  },

  'long-absence': (ctx) => {
    const w = ctx.w;
    const r = w.recovery.longAbsence;
    return shell(html`
      ${head(w, 'Welcome back')}
      <p class="mb-kicker">Where you left off</p>
      <h1 class="mb-title">${r.headline}</h1>
      <p>${r.line}</p>
      <div class="mb-dialwrap">
        <span class="mb-eng mb-dial-label" id="mb-dial-label">Capacity — ${r.capacityPrompt}</span>
        <div class="mb-dial" role="group" aria-labelledby="mb-dial-label">
          ${r.capacities.map(
            (c, i) => html`<button class="mb-dial-opt" data-cap="${i}">
              <span class="mb-dial-socket" aria-hidden="true"></span>
              <span class="mb-dial-body">
                <span class="mb-dial-key">${['Low', 'Steady', 'Full'][i]}</span>
                <span class="mb-dial-title">${c.title}</span>
                <span class="mb-option-sub">${c.detail}</span>
              </span>
            </button>`
          )}
        </div>
      </div>
      <div class="mb-milestone">
        <span class="mb-eng">Re-lay the rail</span>
        <p>${r.reschedule}</p>
      </div>
      ${rows([{ label: 'Pause the programme instead', note: 'Your place stays', go: 'programme-pause' }])}
    `);
  },

  'programme-pause': (ctx) => {
    const w = ctx.w;
    const r = w.recovery.pause;
    return shell(html`
      ${head(w, 'Paused')}
      <p class="mb-kicker">Paused, on purpose</p>
      <h1 class="mb-title">${r.headline}</h1>
      <p>${r.line}</p>
      <p class="mb-meta">${r.detail}</p>
      <div class="mb-face is-standby">
        <p class="mb-kicker">${posKicker(w)}</p>
        <p class="mb-standby-line">Held here — one tap re-opens it.</p>
      </div>
      ${arm(r.action, 'journey')}
      ${rows([{ label: 'Not now — back to today', go: 'today', back: true }])}
    `);
  },

  offline: (ctx) =>
    screens.today(ctx, {
      plate: sysplate('Status — offline', ctx.w.system.offline),
    }),

  loading: (ctx) =>
    shell(html`
      ${head(ctx.w)}
      <p class="mb-kicker">${ctx.w.system.loading}</p>
      <div class="mb-ghost-read" aria-hidden="true">— — : — —</div>
      <div class="mb-ghostline w40" aria-hidden="true"></div>
      <div class="mb-ghostline w90" aria-hidden="true"></div>
      <div class="mb-ghostline" aria-hidden="true"></div>
      <div class="mb-ghostline w60" aria-hidden="true"></div>
      <div class="mb-ghostline tall" aria-hidden="true"></div>
      <p class="visually-hidden" role="status" data-live-text="Loading today’s reading"></p>
    `, 'mb-loading'),

  error: (ctx) =>
    shell(html`
      ${head(ctx.w, 'Fault')}
      <p class="mb-kicker mb-kicker-warn">Fault — our side</p>
      <h1 class="mb-title">The instrument is fine. Our line isn’t.</h1>
      <p role="alert" data-live-text="${ctx.w.system.error}"></p>
      ${arm('Try again', 'today')}
      ${rows([{ label: 'Carry on offline', note: 'Everything works', go: 'offline' }])}
    `),

  empty: (ctx) => {
    const w = ctx.w;
    const p = w.position;
    return shell(html`
      ${head(w)}
      <p class="mb-kicker">Next detent</p>
      <h1 class="mb-title">Detent ${pad2(p.week + 1)} isn’t open yet.</h1>
      <div class="mb-sealedrow" aria-hidden="true">
        <span class="mb-sealed-box"></span>
        <span class="mb-sealed-num">W${pad2(p.week + 1)}</span>
        <span class="mb-eng">Not open yet</span>
      </div>
      <p>${w.system.empty}</p>
      ${arm('Back to this week', 'today')}
    `);
  },

  'week-12': (ctx) => {
    const w = ctx.w;
    const c = w.completion;
    return shell(html`
      ${head(w, 'W12·D7')}
      <div class="mb-advance">
        <p class="mb-kicker mb-kicker-done">Twelve weeks, complete</p>
        <div class="mb-adv-nums is-done" aria-hidden="true"><span>12<i>/12</i></span></div>
        <h1 class="mb-title">${c.headline}</h1>
        <p class="mb-adv-focus">${c.line}</p>
      </div>
      ${foot(w, { mode: 'complete', link: false })}
      ${arm('Open the instrument log', 'artefact')}
    `);
  },

  artefact: (ctx) => {
    const w = ctx.w;
    const c = w.completion;
    return shell(html`
      ${head(w, 'The log')}
      <p class="mb-kicker">The instrument log</p>
      <section class="mb-face mb-logplate">
        <span class="mb-eng mb-logplate-sub">${c.artefact.subtitle}</span>
        <h1 class="mb-logplate-title">${c.artefact.title}</h1>
        <div class="mb-recs">
          ${c.record.map(
            (r) => html`<div class="mb-rec">
              <span class="mb-rec-label">${r.label}</span>
              <span class="mb-rec-val">${r.value}</span>
            </div>`
          )}
        </div>
        <span class="mb-foot-status">84 DAYS · WEEKS 01–12 · COMPLETE</span>
      </section>
      <p class="mb-meta">${c.artefact.note}</p>
      ${arm('What comes next', 'handover')}
      ${rows([{ label: 'Export this record', note: 'PDF · Text', go: 'artefact' }])}
    `);
  },

  handover: (ctx) => {
    const h = ctx.w.completion.handover;
    return shell(html`
      ${head(ctx.w, 'What next')}
      <h1 class="mb-title">${h.line}</h1>
      <div class="mb-options">
        ${h.options.map(
          (o, i) => html`<button class="mb-option" data-go="${i === 0 ? 'journey' : i === 1 ? 'subscription' : 'explore'}">
            ${i === 0 ? html`<span class="mb-option-flag">Recommended</span>` : ''}
            <span class="mb-option-title">${o.title}</span>
            <span class="mb-option-sub">${o.detail}</span>
          </button>`
        )}
      </div>
      <p class="mb-meta">Whatever you choose, the log you just finished stays yours — readable and exportable, always.</p>
    `);
  },

  subscription: (ctx) => {
    const s = ctx.w.subscription;
    return shell(html`
      ${head(ctx.w, 'Membership')}
      <h1 class="mb-title">${s.headline}</h1>
      <div class="mb-price">
        <span class="mb-price-big">${s.price}</span>
        <span class="mb-price-per">${s.per}<br />${s.monthlyAlt}</span>
      </div>
      <p class="mb-meta mb-trial">${s.trial}</p>
      <section class="mb-face">
        <span class="mb-eng">What’s included</span>
        <div class="mb-face-list">${s.includes.map((t) => listRow(t))}</div>
      </section>
      ${h2('The terms, in plain lines')}
      ${s.terms.map(
        (t, i) => html`<div class="mb-term">
          <span class="mb-term-n">${pad2(i + 1)}</span>
          <p class="mb-term-p">${t}</p>
        </div>`
      )}
      <p class="mb-meta">${s.renewal}</p>
      ${arm('Start Week One free', 'today')}
      <button class="mb-option is-solo" data-go="explore"><span class="mb-option-title">Not now</span><span class="mb-option-sub">The programmes stay open to browse. No countdown, no last chance.</span></button>
      ${rows([{ label: 'Restore a previous purchase', go: 'restore' }])}
    `);
  },

  expired: (ctx) => {
    const w = ctx.w;
    const e = w.expired;
    const p = w.position;
    return shell(html`
      ${head(w, 'Lapsed')}
      <p class="mb-kicker">Membership — lapsed, nothing lost</p>
      <h1 class="mb-title">${e.headline}</h1>
      <p>${e.line}</p>
      <section class="mb-face">
        <span class="mb-eng">What remains yours</span>
        <div class="mb-face-list">
          ${listRow(`Weeks 01–${pad2(p.week)} and every recorded day — readable any time`)}
          ${listRow('Your record and artefact — exportable, membership or none')}
        </div>
      </section>
      ${arm(e.action, 'subscription')}
      <button class="mb-option is-solo" data-go="artefact">
        <span class="mb-option-title">${e.secondary}</span>
        <span class="mb-option-sub">Always available — no membership needed.</span>
      </button>
      ${rows([{ label: 'Read my record', go: 'journey' }])}
    `);
  },

  restore: (ctx) => {
    const r = ctx.w.restore;
    return shell(html`
      ${head(ctx.w, 'Restore')}
      <h1 class="mb-title">${r.headline}</h1>
      <p>${r.line}</p>
      ${mem.restored
        ? html`${sysplate('Restored', r.done, { cls: 'is-done' })}
          ${arm('Open today’s reading', 'today')}`
        : arm(r.action, '__restore')}
      ${rows([{ label: 'Start fresh instead', note: 'The programmes', go: 'explore' }])}
    `);
  },

  specimen: (ctx) => {
    const w = ctx.w;
    const t = w.today;
    const other = WORLDS[ctx.world === 'strength' ? 'writing' : 'strength'];
    return shell(html`
      ${head(w, 'Specimen')}
      <p class="mb-kicker">Meridian · Archivo wdth 62.5–125 · IBM Plex Mono 400/500/600</p>
      <div class="mb-display mb-spec-display">Twelve<br />Weeks</div>
      <hr class="mb-hr" />
      <p class="mb-kicker">${posKicker(w)}</p>
      <h1 class="mb-title">${t.title}</h1>
      <p>${t.why}</p>
      <div class="mb-step">
        <span class="mb-step-n">03</span>
        <div class="mb-step-body">
          <p class="mb-step-text">${t.how[2].step}</p>
          <p class="mb-step-detail">${t.how[2].detail}</p>
        </div>
      </div>
      <div class="mb-spec-reads">
        <div><span class="mb-eng">Timer — ${WORLDS.strength.short}</span><span class="mb-read">${mmss(WORLDS.strength.today.duration * 60)}</span></div>
        <div><span class="mb-eng">Timer — ${WORLDS.writing.short}</span><span class="mb-read">${mmss(WORLDS.writing.today.duration * 60)}</span></div>
      </div>
      <p class="mb-spec-mono">0123456789 — tabular, for every readout</p>
      <div class="mb-spec-weeks">${w.weeks.map((_, i) => html`<span>W${pad2(i + 1)}</span>`)}</div>
      <h2 class="mb-title mb-spec-comp">${w.completion.headline}</h2>
      <p class="mb-foot-status">${up(t.acknowledgement.weekLine)}</p>
      <hr class="mb-hr" />
      <p class="mb-kicker">The other world, same instrument</p>
      <h2 class="mb-face-title">${other.today.title}</h2>
    `);
  },
};

// ————— mount: wire interactions —————

function mount(root, ctx) {
  // Live-region text is injected a frame after insertion so screen readers
  // reliably announce status/alert plates rendered with the screen.
  root.querySelectorAll('[data-live-text]').forEach((el) => {
    requestAnimationFrame(() => { el.textContent = el.getAttribute('data-live-text'); });
  });

  root.querySelectorAll('[data-go]').forEach((el) => {
    el.addEventListener('click', () => {
      const target = el.getAttribute('data-go');
      if (target === '__record') {
        // The mark is always seen: reduced motion shows the stamp pre-pressed
        // for a static beat instead of skipping the confirmation entirely.
        const stamp = root.querySelector('#mb-stamp');
        if (stamp) stamp.classList.add('is-pressed');
        el.disabled = true;
        ctx.announce(`Day ${ctx.w.position.dayOfProgramme} recorded.`);
        makeTimeout(root, () => ctx.go('question'), reducedMotion(ctx) ? 250 : 480);
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

  // Choose-and-go controls: plain buttons (no toggle semantics) — the chosen
  // socket fills for a held beat, then the screen advances.
  root.querySelectorAll('[data-choice]').forEach((el) => {
    el.addEventListener('click', () => {
      mem.choice = Number(el.getAttribute('data-choice'));
      el.classList.add('is-chosen');
      makeTimeout(root, () => ctx.go('acknowledge'), 220);
    });
  });

  root.querySelectorAll('[data-cap]').forEach((el) => {
    el.addEventListener('click', () => {
      const i = Number(el.getAttribute('data-cap'));
      el.classList.add('is-chosen');
      ctx.announce(`${ctx.w.recovery.longAbsence.capacities[i].title}. Opening today’s reading.`);
      makeTimeout(root, () => ctx.go('today'), 260);
    });
  });

  if (ctx.state === 'active') {
    const total = totalSeconds(ctx.w);
    const C = 2 * Math.PI * 74;
    const digits = root.querySelector('#mb-digits');
    const arc = root.querySelector('#mb-arc');
    const segl = root.querySelector('#mb-seg');
    const segs = root.querySelector('#mb-segs');
    // Wall-clock anchored: a throttled tab or locked phone never loses time.
    const startedAt = Date.now() - mem.elapsed * 1000;
    let lastSeg = segAt(ctx.w, mem.elapsed).label;
    let announcedDone = false;
    makeTicker(root, () => {
      mem.elapsed = Math.min(Math.round((Date.now() - startedAt) / 1000), total);
      const segNow = segAt(ctx.w, mem.elapsed).label;
      if (digits) digits.textContent = mmss(mem.elapsed);
      if (arc) arc.setAttribute('stroke-dashoffset', (C * (1 - Math.min(mem.elapsed / total, 1))).toFixed(1));
      if (segl) segl.textContent = segNow;
      if (segs) segs.innerHTML = render(html`${segRows(ctx.w, mem.elapsed)}`);
      if (mem.elapsed === total && !announcedDone) {
        announcedDone = true;
        ctx.announce('Session complete. The reading is yours to record.');
      } else if (segNow !== lastSeg) {
        ctx.announce(`${segNow}. ${mmss(mem.elapsed)} elapsed.`);
      }
      lastSeg = segNow;
    });
  }

  if (ctx.state === 'begin') mem.elapsed = 0;
}

export default {
  id: 'b',
  name: 'Meridian',
  tagline: 'The field instrument — one glance gives the reading, one control arms the work.',
  render(state, ctx) {
    const fn = screens[state] || screens.today;
    return { html: fn(ctx), mount };
  },
};
