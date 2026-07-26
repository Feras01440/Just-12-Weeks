// DIRECTION A — QUARTO. The printed programme.
// Governing idea: twelve weeks are a book being read — twelve chapters,
// one page per day, a bookmark that only moves forward.

import { html, raw, render, ROMAN, mmss, makeTicker, makeTimeout, reducedMotion } from '../../shared/dom.js';

// session + choice state shared across screens of this direction
// elapsed pre-seeded so deep-linking straight to `active`/`paused` (screenshots,
// reviewers) shows a mid-session reading; the `begin` screen resets it to 0.
const mem = { elapsed: 277, prepDone: new Set(), choice: 1, restored: false };

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

function segClass(w, index, elapsed) {
  let acc = 0;
  const segs = w.today.activity.segments;
  for (let i = 0; i < segs.length; i++) {
    const end = acc + segs[i].mins * 60;
    if (i === index) {
      if (elapsed >= end) return 'is-done';
      if (elapsed >= acc) return 'is-now';
      return '';
    }
    acc = end;
  }
  return '';
}

// ————— shared fragments —————

function runningHead(w, right) {
  const p = w.position;
  return html`<header class="qa-running">
    <span>${w.programme.title}</span>
    <span class="qa-run-right">${right ?? `Week ${p.week} · Day ${p.day}`}</span>
  </header>`;
}

function foredge(w) {
  const p = w.position;
  const marks = [];
  for (let i = 1; i <= 12; i++) {
    const cls = i < p.week ? 'is-done' : i === p.week ? 'is-now' : '';
    marks.push(html`<i class="${cls}"></i>`);
  }
  return html`<div class="qa-foredge" aria-hidden="true">${marks}</div>`;
}

function folio(w, text) {
  return html`<div class="qa-folio">${text ?? `day ${w.position.dayOfProgramme} of 84`}</div>`;
}

function primary(label, go, hint, extra = '') {
  return html`<button class="qa-primary ${raw(extra)}" data-go="${go}">
    <span>${label}</span>${hint ? html`<span class="qa-primary-hint">${hint}</span>` : ''}
  </button>`;
}

function linkrow(links) {
  return html`<div class="qa-linkrow">${links.map(
    (l) => html`<button class="qa-link ${l.back ? 'qa-link-back' : ''}" data-go="${l.go}">
      <span>${l.back ? '← ' : ''}${l.label}</span>
      ${l.note ? html`<span class="qa-link-note">${l.note}</span>` : ''}
    </button>`
  )}</div>`;
}

function page(inner, opts = {}) {
  return html`<div class="qa-page ${raw(opts.cls || '')}">${inner}</div>`;
}

// ————— screens —————

const screens = {
  'first-launch': (ctx) =>
    page(html`
      <div class="qa-chapter">
        <div class="qa-ch-label">A programme, not an app of apps</div>
        <h1 class="qa-display">Twelve<br />Weeks</h1>
        <p class="qa-ch-epigraph">A quarter of a year, honestly used, changes what a body — or a book — can do.</p>
        <hr class="qa-hr" />
      </div>
      ${primary('Begin', 'explanation')}
      ${linkrow([{ label: 'I’ve been here before', note: 'Restore', go: 'restore' }])}
      <div class="qa-folio">no streaks · no feeds · one meaningful thing a day</div>
    `),

  explanation: (ctx) =>
    page(html`
      ${runningHead(ctx.w, 'How it works')}
      <h1 class="qa-title">This is a programme you read your way through.</h1>
      <div class="qa-front">
        <span class="qa-front-n">1</span>
        <div><div class="qa-front-h">One programme at a time</div>
        <p class="qa-front-p">Twelve chapters, one per week. No libraries to wander, no catalogue anxiety.</p></div>
      </div>
      <div class="qa-front">
        <span class="qa-front-n">2</span>
        <div><div class="qa-front-h">One action a day</div>
        <p class="qa-front-p">Each day gives you a single meaningful thing: what to do, why it matters, how to do it — and a gentler form that counts in full.</p></div>
      </div>
      <div class="qa-front">
        <span class="qa-front-n">3</span>
        <div><div class="qa-front-h">Built for real weeks</div>
        <p class="qa-front-p">Miss a day, miss a fortnight — the book keeps your place. There is nothing to lose here, only pages to gain.</p></div>
      </div>
      ${primary('Choose your programme', 'explore')}
      ${folio(ctx.w, 'front matter')}
    `),

  explore: (ctx) => {
    const other = ctx.world === 'strength' ? 'The First Draft' : 'Foundations of Strength';
    const otherLine =
      ctx.world === 'strength'
        ? 'Twelve weeks from “one day I’ll write it” to a finished first draft.'
        : 'Twelve weeks from “I sit down carefully” to “I trust my body again.”';
    return page(html`
      ${runningHead(ctx.w, 'Catalogue')}
      <h1 class="qa-title">The programmes</h1>
      <p class="qa-quiet">Each is twelve weeks, one day at a time. Choose one; the rest will wait.</p>
      <div class="qa-cat">
        <div class="qa-cat-flag">Open for enrolment</div>
        <h2 class="qa-cat-title">${ctx.w.programme.title}</h2>
        <p class="qa-cat-line">${ctx.w.programme.subtitle}</p>
        <div class="qa-cat-meta">12 weeks · ${ctx.world === 'strength' ? '15–25' : '25–40'} min/day · 5 days a week</div>
        ${primary('Read the particulars', 'suitability')}
      </div>
      <div class="qa-cat">
        <h2 class="qa-cat-title">${other}</h2>
        <p class="qa-cat-line">${otherLine}</p>
        <div class="qa-cat-meta">12 weeks — switch worlds above to preview</div>
      </div>
      <div class="qa-cat is-soon">
        <h2 class="qa-cat-title">The Revision</h2>
        <p class="qa-cat-line">Twelve weeks turning a draft into a book.</p>
        <div class="qa-cat-meta">In preparation — spring</div>
      </div>
      ${folio(ctx.w, 'catalogue')}
    `);
  },

  suitability: (ctx) =>
    page(html`
      ${runningHead(ctx.w, 'Particulars')}
      <h1 class="qa-title">${ctx.w.programme.title}</h1>
      <p>${ctx.w.programme.promise}</p>
      <h2 class="qa-h2">Written for</h2>
      ${ctx.w.programme.whoFor.map((x) => html`<p class="qa-body">✳&ensp;${x}</p>`)}
      <h2 class="qa-h2">What to expect</h2>
      ${ctx.w.programme.expectations.map((x) => html`<p class="qa-body">—&ensp;${x}</p>`)}
      <div class="qa-rubric-note"><strong>Worth knowing.</strong> ${ctx.w.programme.notFor}</div>
      ${primary('Begin the twelve weeks', 'start-journey', 'Week One is free')}
      ${linkrow([{ label: 'Back to the catalogue', go: 'explore', back: true }])}
    `),

  'start-journey': (ctx) =>
    page(html`
      ${runningHead(ctx.w, 'Contents')}
      <h1 class="qa-title">Twelve weeks begin now.</h1>
      <p class="qa-quiet">The chapters open one at a time. The first three stand ready; the rest stay uncut until you reach them — that is deliberate.</p>
      <ol class="qa-toc">
        ${ctx.w.weeks.map((wk, i) => {
          const future = i >= 3;
          return html`<li class="${future ? 'is-future' : ''}">
            <span class="qa-toc-num">${ROMAN[i]}</span>
            <span class="qa-toc-title">${future ? '—————' : wk.title}</span>
            <span></span>
            ${!future ? html`<span class="qa-toc-note">${wk.focus}</span>` : ''}
          </li>`;
        })}
      </ol>
      ${primary('Open Chapter I', 'today')}
      ${folio(ctx.w, 'day 1 of 84')}
    `),

  today: (ctx, opts = {}) => {
    const t = ctx.w.today;
    return page(html`
      ${opts.banner || ''}
      ${runningHead(ctx.w)}
      ${foredge(ctx.w)}
      <p class="qa-kicker">${ctx.w.position.weekTheme} · today’s page</p>
      <h1 class="qa-title">${t.title}</h1>
      <p>${t.why}</p>
      ${primary(`Begin`, 'begin', t.durationLabel)}
      ${linkrow([
        { label: 'Show me how', note: `${t.how.length} steps`, go: 'how' },
        { label: 'Something gentler today', note: 'counts in full', go: 'easier' },
        { label: 'Why this matters', go: 'why' },
      ])}
      <button class="qa-folio qa-folio-btn" data-go="journey">
        Chapter ${ROMAN[ctx.w.position.week - 1]} of XII · day ${ctx.w.position.dayOfProgramme} of 84 — see the contents
      </button>
    `);
  },

  why: (ctx) => {
    const t = ctx.w.today;
    return page(html`
      ${runningHead(ctx.w)}
      <p class="qa-kicker">Why this matters</p>
      <h1 class="qa-title">${t.title}</h1>
      <p>${t.why}</p>
      <p>${t.whyDeeper}</p>
      <div class="qa-pullquote">${t.milestone}</div>
      ${primary('Show me how', 'how')}
      ${linkrow([{ label: 'Today', go: 'today', back: true }])}
    `);
  },

  how: (ctx) => {
    const t = ctx.w.today;
    return page(html`
      ${runningHead(ctx.w)}
      <p class="qa-kicker">Show me how</p>
      <h1 class="qa-title">${t.shortTitle}</h1>
      ${t.how.map(
        (s, i) => html`<div class="qa-step">
          <span class="qa-step-n">${i + 1}</span>
          <div class="qa-step-text">${s.step}</div>
          <div class="qa-step-detail">${s.detail}</div>
        </div>`
      )}
      <div class="qa-rubric-note"><strong>Take care.</strong> ${t.safety}</div>
      ${primary('Begin', 'begin', t.durationLabel)}
      ${linkrow([
        { label: 'What you’ll need', note: `${t.prep.length} things`, go: 'prep' },
        { label: 'Today', go: 'today', back: true },
      ])}
    `);
  },

  prep: (ctx) => {
    const t = ctx.w.today;
    return page(html`
      ${runningHead(ctx.w)}
      <p class="qa-kicker">Before you begin</p>
      <h1 class="qa-title">What you’ll need</h1>
      <div role="group" aria-label="Preparation checklist">
        ${t.prep.map(
          (p, i) => html`<button class="qa-check" data-check="${i}" aria-pressed="${String(mem.prepDone.has(i))}">
            <span class="qa-box" aria-hidden="true">${mem.prepDone.has(i) ? '☑' : '☐'}</span>
            <span class="qa-check-label">${p}</span>
          </button>`
        )}
      </div>
      <p class="qa-meta" style="margin-top:14px;">Ticking is optional — this list simply waits here every day.</p>
      ${primary('Begin', 'begin', t.durationLabel)}
      ${linkrow([{ label: 'Back', go: 'how', back: true }])}
    `);
  },

  easier: (ctx) => {
    const t = ctx.w.today;
    return page(html`
      ${runningHead(ctx.w)}
      <p class="qa-kicker">The gentler form</p>
      <h1 class="qa-title">${t.easier.title}</h1>
      <div class="qa-pullquote">Counts in full. The record will show a day kept, nothing less.</div>
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
      ${runningHead(ctx.w)}
      <p class="qa-kicker">The further form</p>
      <h1 class="qa-title">${t.advanced.title}</h1>
      <p>${t.advanced.why}</p>
      <p>${t.advanced.detail}</p>
      <div class="qa-rubric-note"><strong>Only if today feels strong.</strong> The plain form is the programme; this is a variation, not a target.</div>
      ${primary('Take the further form', 'begin')}
      ${linkrow([{ label: 'Today', go: 'today', back: true }])}
    `);
  },

  begin: (ctx) => {
    const t = ctx.w.today;
    return page(html`
      ${runningHead(ctx.w)}
      <p class="qa-kicker">Ready</p>
      <h1 class="qa-title">${t.shortTitle} — ${t.durationLabel}.</h1>
      <ul class="qa-leaders">
        ${t.activity.segments.map(
          (s) => html`<li>
            <span class="qa-lead-label">${s.label}</span>
            <span class="qa-lead-dots"></span>
            <span class="qa-lead-val">${s.mins} min</span>
          </li>`
        )}
      </ul>
      <p class="qa-meta">Pause any time. The page holds still until you come back.</p>
      ${primary('Start now', 'active')}
      ${linkrow([{ label: 'Today', go: 'today', back: true }])}
    `);
  },

  active: (ctx) => {
    const t = ctx.w.today;
    return page(html`
      ${runningHead(ctx.w, 'In session')}
      <div class="qa-timer">
        <div class="qa-timer-digits" id="qa-digits" role="timer" aria-live="off">${mmss(mem.elapsed)}</div>
        <div class="qa-timer-seg" id="qa-seg">${currentSegment(ctx.w, mem.elapsed).label}</div>
      </div>
      <div class="qa-inkline" aria-hidden="true"><i id="qa-ink" style="width:${(mem.elapsed / totalSeconds(ctx.w)) * 100}%"></i></div>
      <ul class="qa-leaders" id="qa-plan">
        ${t.activity.segments.map((s, i) => {
          const cls = segClass(ctx.w, i, mem.elapsed);
          return html`<li data-mins="${s.mins}" class="${cls}">
            <span class="qa-lead-label">${s.label}</span>
            <span class="qa-lead-dots"></span>
            <span class="qa-lead-val">${s.mins} min</span>
          </li>`;
        })}
      </ul>
      ${primary('Pause', 'paused')}
      ${linkrow([{ label: 'Finish early — it still counts', go: 'complete' }])}
    `);
  },

  paused: (ctx) => {
    const t = ctx.w.today;
    return page(html`
      ${runningHead(ctx.w, 'Paused')}
      <div class="qa-timer">
        <div class="qa-timer-digits">${mmss(mem.elapsed)}</div>
        <div class="qa-timer-seg qa-em">${t.activity.pauseNote}</div>
      </div>
      <div class="qa-inkline" aria-hidden="true"><i style="width:${(mem.elapsed / totalSeconds(ctx.w)) * 100}%"></i></div>
      ${primary('Carry on', 'active')}
      ${linkrow([
        { label: 'Save the rest for later today', go: 'today' },
        { label: 'End here — it still counts', go: 'complete' },
      ])}
    `);
  },

  complete: (ctx) => {
    const t = ctx.w.today;
    return page(html`
      ${runningHead(ctx.w)}
      <p class="qa-kicker">The day’s mark</p>
      <h1 class="qa-title">${t.shortTitle} — done.</h1>
      <p class="qa-quiet">${mmss(Math.max(mem.elapsed, 60))} of honest work. Press the day’s mark into the page.</p>
      <div class="qa-stamp" id="qa-stamp" aria-hidden="true">DAY ${ctx.w.position.dayOfProgramme}</div>
      ${primary('Mark day ' + ctx.w.position.dayOfProgramme + ' complete', '__stamp')}
      ${linkrow([{ label: 'Back to the session', go: 'active', back: true }])}
    `);
  },

  question: (ctx) => {
    const q = ctx.w.today.question;
    return page(html`
      ${runningHead(ctx.w)}
      <p class="qa-kicker">One question — then you’re done</p>
      <h1 class="qa-title qa-em">${q.prompt}</h1>
      <p class="qa-meta">${q.why}</p>
      <div role="group" aria-label="${q.prompt}" style="margin-top:18px;border-top:1px solid var(--qa-hairline);">
        ${q.options.map((o, i) => html`<button class="qa-choiceline" data-choice="${i}" aria-pressed="false">${o}</button>`)}
      </div>
      ${linkrow([{ label: 'Skip — no answer today', go: 'acknowledge', back: true }])}
    `);
  },

  acknowledge: (ctx) => {
    const a = ctx.w.today.acknowledgement;
    const ackLine = ctx.w.today.question.acknowledgements[mem.choice] ?? '';
    return page(html`
      ${runningHead(ctx.w)}
      ${foredge(ctx.w)}
      <div class="qa-chapter" style="padding-top:3vh;">
        <div class="qa-ch-label">Kept</div>
        <h1 class="qa-display" style="font-size:calc(var(--ts) * 2.6rem);">${a.headline}</h1>
        <p class="qa-ch-epigraph" style="margin-top:12px;">${a.line}</p>
        <hr class="qa-hr" />
        <p class="qa-meta">${ackLine}</p>
      </div>
      ${primary('Close the book for today', 'journey')}
      ${folio(ctx.w, a.weekLine)}
    `);
  },

  journey: (ctx) => {
    const p = ctx.w.position;
    return page(html`
      ${runningHead(ctx.w, 'Contents')}
      <h1 class="qa-title">Contents</h1>
      <p class="qa-meta">Later chapters open week by week — their pages stay uncut until you reach them.</p>
      <ol class="qa-toc">
        ${ctx.w.weeks.map((wk, i) => {
          const n = i + 1;
          const days = ctx.w.log[i];
          const isPast = n < p.week;
          const isCurrent = n === p.week;
          const isNext = n === p.week + 1;
          const future = !isPast && !isCurrent && !isNext;
          return html`<li class="${isCurrent ? 'is-current' : ''} ${future ? 'is-future' : ''}">
            <span class="qa-toc-num">${ROMAN[i]}</span>
            <span class="qa-toc-title">${future ? '—————' : wk.title}</span>
            <span class="qa-toc-days" aria-hidden="true">
              ${isPast || isCurrent ? days.map((d) => html`<span class="qa-day d-${d}"></span>`) : ''}
            </span>
            ${isPast ? html`<span class="qa-toc-note">kept${days.includes('mended') ? ' — one day mended in the margin' : ''}</span>` : ''}
            ${isCurrent ? html`<span class="qa-toc-note">you are here — day ${p.day} of this chapter</span>` : ''}
            ${isNext ? html`<span class="qa-toc-note qa-em">opens when ${wkLabel(n - 1)} closes</span>` : ''}
          </li>`;
        })}
      </ol>
      ${primary('Back to today’s page', 'today')}
      ${folio(ctx.w)}
    `);

    function wkLabel(n) {
      return `Chapter ${ROMAN[n - 1]}`;
    }
  },

  'week-transition': (ctx) => {
    const p = ctx.w.position;
    const next = ctx.w.weeks[p.week] || ctx.w.weeks[11];
    const prev = ctx.w.weeks[p.week - 1];
    return page(html`
      <div class="qa-chapter">
        <div class="qa-ch-label">Chapter ${ROMAN[p.week]} of XII</div>
        <h1 class="qa-display">${ROMAN[p.week]}</h1>
        <div class="qa-ch-title">${next.title}</div>
        <p class="qa-ch-epigraph">${next.focus}</p>
        <hr class="qa-hr" />
        <p class="qa-meta" style="max-width:36ch;margin:0 auto;">
          ${prev.title} leaves you with ${ctx.world === 'strength' ? 'a squat you own to chair height — support already loosening its grip' : 'an act one that turns — your story can no longer go back'}.
        </p>
      </div>
      ${primary(`Begin Week ${p.week + 1}`, 'today')}
      ${folio(ctx.w, `the ${ordinal(p.week + 1)} of twelve chapters`)}
    `);
  },

  'missed-one': (ctx) => {
    const r = ctx.w.recovery.oneDay;
    return page(html`
      ${runningHead(ctx.w)}
      ${foredge(ctx.w)}
      <p class="qa-kicker">A quiet day in the margin</p>
      <h1 class="qa-title">${r.headline}</h1>
      <p>${r.line}</p>
      <div class="qa-pullquote">The bookmark never moves backwards. Nothing kept has been lost.</div>
      ${primary(r.action, 'today')}
      ${linkrow([{ label: r.altAction, note: 'five minutes', go: 'easier' }])}
      <p class="qa-meta" style="margin-top:16px;">${r.altDetail}</p>
      ${folio(ctx.w)}
    `);
  },

  'missed-several': (ctx) => {
    const r = ctx.w.recovery.severalDays;
    return page(html`
      ${runningHead(ctx.w)}
      <p class="qa-kicker">The book kept your place</p>
      <h1 class="qa-title">${r.headline}</h1>
      <p>${r.line}</p>
      <div class="qa-ornament" aria-hidden="true">❧</div>
      ${r.options.map(
        (o, i) => html`<button class="qa-option" data-go="today">
          ${i === 0 ? html`<span class="qa-option-flag">As planned</span><br />` : ''}
          ${o.title}
          <span class="qa-option-sub">${o.detail}</span>
        </button>`
      )}
      ${folio(ctx.w, 'weeks I and II — kept, marks intact')}
    `);
  },

  'long-absence': (ctx) => {
    const r = ctx.w.recovery.longAbsence;
    return page(html`
      ${runningHead(ctx.w, 'Where you left off')}
      <div class="qa-ribbon-g" aria-hidden="true"></div>
      <h1 class="qa-title">${r.headline}</h1>
      <p>${r.line}</p>
      <h2 class="qa-h2">${r.capacityPrompt}</h2>
      ${r.capacities.map(
        (c) => html`<button class="qa-option" data-go="today">${c.title}<span class="qa-option-sub">${c.detail}</span></button>`
      )}
      <hr class="qa-hr" />
      <p class="qa-meta">${r.reschedule}</p>
      ${linkrow([{ label: 'Reprint the remaining chapters', note: 'a revised edition', go: 'programme-pause' }])}
    `);
  },

  'programme-pause': (ctx) => {
    const r = ctx.w.recovery.pause;
    return page(html`
      ${runningHead(ctx.w)}
      <p class="qa-kicker">A deliberate interval</p>
      <h1 class="qa-title">${r.headline}</h1>
      <p>${r.line}</p>
      <p class="qa-quiet">${r.detail}</p>
      ${primary(r.action, 'journey')}
      ${linkrow([{ label: 'Not now — back to today', go: 'today', back: true }])}
    `);
  },

  offline: (ctx) =>
    screens.today(ctx, {
      banner: html`<div class="qa-banner" role="status">
        <span class="qa-banner-mark">Offline</span>
        <span>${ctx.w.system.offline}</span>
      </div>`,
    }),

  loading: (ctx) =>
    page(html`
      ${runningHead(ctx.w)}
      <p class="qa-kicker">${ctx.w.system.loading}</p>
      <div class="qa-ghostline w40" style="height:calc(var(--ts) * 2rem);margin-top:22px;"></div>
      <div class="qa-ghostline w80"></div>
      <div class="qa-ghostline"></div>
      <div class="qa-ghostline w60"></div>
      <div class="qa-ghostline" style="height:calc(var(--ts) * 3.4rem);margin-top:26px;"></div>
      <p class="visually-hidden" role="status">Loading today’s page</p>
    `, { cls: 'qa-loading' }),

  error: (ctx) =>
    page(html`
      ${runningHead(ctx.w, 'Errata')}
      <p class="qa-kicker" style="color:var(--qa-rubric);">Errata</p>
      <h1 class="qa-title">A misprint on our side.</h1>
      <p role="alert">${ctx.w.system.error}</p>
      ${primary('Try again', 'today')}
      ${linkrow([{ label: 'Carry on offline', note: 'everything on this phone works', go: 'offline' }])}
    `),

  empty: (ctx) => {
    const p = ctx.w.position;
    const next = ctx.w.weeks[p.week] || ctx.w.weeks[11];
    return page(html`
      ${runningHead(ctx.w)}
      <p class="qa-kicker">Chapter ${ROMAN[p.week]} · uncut</p>
      <h1 class="qa-title">${next.title} is still uncut.</h1>
      <div class="qa-uncut" aria-hidden="true"></div>
      <p>${ctx.w.system.empty}</p>
      ${primary('Back to this week', 'today')}
    `);
  },

  'week-12': (ctx) => {
    const c = ctx.w.completion;
    return page(html`
      <div class="qa-chapter">
        <div class="qa-ch-label">Chapter XII · the last page</div>
        <h1 class="qa-display">XII<span style="color:var(--qa-ink-2);">/XII</span></h1>
        <div class="qa-gilt-edge" aria-hidden="true"></div>
        <div class="qa-ch-title">${c.headline}</div>
        <p class="qa-ch-epigraph">${c.line}</p>
      </div>
      ${primary('See your record', 'artefact')}
      ${folio(ctx.w, 'day 84 of 84')}
    `);
  },

  artefact: (ctx) => {
    const c = ctx.w.completion;
    return page(html`
      ${runningHead(ctx.w, 'Colophon')}
      <div class="qa-plate">
        <div class="qa-plate-sub">${c.artefact.subtitle}</div>
        <div class="qa-plate-title">${c.artefact.title}</div>
        <div class="qa-stamp is-gilt" aria-hidden="true" style="margin:18px auto;">XII&thinsp;/&thinsp;XII</div>
        <ul class="qa-leaders" style="text-align:left;">
          ${c.record.map(
            (r) => html`<li><span class="qa-lead-label">${r.label}</span><span class="qa-lead-dots"></span><span class="qa-lead-val">${r.value}</span></li>`
          )}
        </ul>
      </div>
      <p class="qa-meta">${c.artefact.note}</p>
      ${primary('What comes next', 'handover')}
      ${linkrow([{ label: 'Export this record', note: 'PDF · text', go: 'artefact' }])}
    `);
  },

  handover: (ctx) => {
    const h = ctx.w.completion.handover;
    return page(html`
      ${runningHead(ctx.w, 'What next')}
      <h1 class="qa-title">${h.line}</h1>
      ${h.options.map(
        (o, i) => html`<div class="qa-cat">
          ${i === 0 ? html`<div class="qa-cat-flag">Recommended</div>` : ''}
          <h2 class="qa-cat-title">${o.title}</h2>
          <p class="qa-cat-line">${o.detail}</p>
          <button class="qa-link" data-go="${i === 2 ? 'explore' : 'subscription'}">
            <span>${i === 0 ? 'Take the rest week' : i === 1 ? 'Read the particulars' : 'Browse the catalogue'}</span>
          </button>
        </div>`
      )}
      ${folio(ctx.w, 'the book closes; another can open')}
    `);
  },

  subscription: (ctx) => {
    const s = ctx.w.subscription;
    return page(html`
      ${runningHead(ctx.w, 'Membership')}
      <h1 class="qa-title">${s.headline}</h1>
      <div class="qa-price">
        <span class="qa-price-big">${s.price}</span>
        <span class="qa-price-per">${s.per}<br />${s.monthlyAlt}</span>
      </div>
      <p class="qa-meta" style="margin-bottom:18px;">${s.trial}</p>
      <ul class="qa-leaders">
        ${s.includes.map((x) => html`<li><span class="qa-lead-label">${x}</span><span class="qa-lead-dots"></span><span class="qa-lead-val">✓</span></li>`)}
      </ul>
      <h2 class="qa-h2">The terms, in plain type</h2>
      ${s.terms.map((t, i) => html`<p class="qa-body">${i + 1}.&ensp;${t}</p>`)}
      <p class="qa-meta">${s.renewal}</p>
      ${primary('Start Week One free', 'today')}
      ${linkrow([
        { label: 'Not now', note: 'the catalogue stays open', go: 'explore' },
        { label: 'Restore a previous purchase', go: 'restore' },
      ])}
    `);
  },

  expired: (ctx) => {
    const e = ctx.w.expired;
    return page(html`
      ${runningHead(ctx.w, 'Membership')}
      <p class="qa-kicker">Lapsed — nothing lost</p>
      <h1 class="qa-title">${e.headline}</h1>
      <p>${e.line}</p>
      <div class="qa-pullquote">Your record and your pages remain yours, membership or none.</div>
      ${primary(e.action, 'subscription')}
      ${linkrow([
        { label: e.secondary, note: 'always available', go: 'artefact' },
        { label: 'Read my record', go: 'journey' },
      ])}
    `);
  },

  restore: (ctx) =>
    page(html`
      ${runningHead(ctx.w, 'Restore')}
      <h1 class="qa-title">${ctx.w.restore.headline}</h1>
      <p>${ctx.w.restore.line}</p>
      ${mem.restored
        ? html`<div class="qa-rubric-note" role="status" style="border-color:var(--qa-gilt);"><strong style="color:var(--qa-gilt);">Restored.</strong> ${ctx.w.restore.done}</div>
          ${primary('Open today’s page', 'today')}`
        : primary(ctx.w.restore.action, '__restore')}
      ${linkrow([{ label: 'Start fresh instead', note: 'the catalogue', go: 'explore' }])}
    `),

  specimen: (ctx) => {
    const t = ctx.w.today;
    const other = ctx.world === 'strength' ? 'Write the scene where something becomes impossible to ignore' : 'Learn the supported squat';
    return page(html`
      ${runningHead(ctx.w, 'Type specimen')}
      <p class="qa-kicker">Quarto · Fraunces variable — optical sizes 9 → 144</p>
      <h1 class="qa-display" style="font-size:calc(var(--ts)*3.2rem);">Twelve</h1>
      <h2 class="qa-title">${t.title}</h2>
      <p>${t.why}</p>
      <div class="qa-step"><span class="qa-step-n">3</span>
        <div class="qa-step-text">${t.how[2].step}</div>
        <div class="qa-step-detail">${t.how[2].detail}</div>
      </div>
      <div class="qa-timer" style="text-align:left;margin:18px 0;">
        <span class="qa-timer-digits" style="font-size:calc(var(--ts)*3rem);">14:00</span>
      </div>
      <p class="qa-body" style="font-variant-numeric:oldstyle-nums;">0123456789 · Week III of XII · day 16 of 84</p>
      <p class="qa-body" style="font-variant-numeric:tabular-nums lining-nums;">0123456789 · 00:00 → 25:00 (tabular, timers)</p>
      <div class="qa-ch-title">${ctx.w.today.acknowledgement.headline}</div>
      <p class="qa-meta">Small metadata · ${ctx.w.today.acknowledgement.weekLine}</p>
      <hr class="qa-hr" />
      <p class="qa-kicker">The other world, same system</p>
      <h2 class="qa-title" style="font-size:calc(var(--ts)*1.4rem);">${other}</h2>
      ${folio(ctx.w, 'specimen')}
    `);
  },
};

function ordinal(n) {
  return ['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth'][n - 1] || `${n}th`;
}

// ————— mount: wire interactions —————

function mount(root, ctx) {
  root.querySelectorAll('[data-go]').forEach((el) => {
    el.addEventListener('click', () => {
      const target = el.getAttribute('data-go');
      if (target === '__stamp') {
        // the mark is always seen — reduced motion shows it pre-pressed for a
        // static beat instead of skipping the confirmation entirely
        const stamp = root.querySelector('#qa-stamp');
        if (stamp) stamp.classList.add('qa-stamped');
        el.disabled = true;
        makeTimeout(root, () => ctx.go('question'), reducedMotion(ctx) ? 250 : 420);
        ctx.announce('Day marked complete.');
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
      el.querySelector('.qa-box').textContent = mem.prepDone.has(i) ? '☑' : '☐';
      const label = el.querySelector('.qa-check-label');
      label.classList.toggle('qa-checked');
    });
  });

  root.querySelectorAll('[data-choice]').forEach((el) => {
    el.addEventListener('click', () => {
      mem.choice = Number(el.getAttribute('data-choice'));
      el.classList.add('is-chosen');
      makeTimeout(root, () => ctx.go('acknowledge'), reducedMotion(ctx) ? 0 : 160);
    });
  });

  if (ctx.state === 'active') {
    const total = totalSeconds(ctx.w);
    const digits = root.querySelector('#qa-digits');
    const seg = root.querySelector('#qa-seg');
    const ink = root.querySelector('#qa-ink');
    const plan = root.querySelectorAll('#qa-plan li');
    // wall-clock anchored: a throttled tab or locked phone never loses time
    const startedAt = Date.now() - mem.elapsed * 1000;
    let lastSeg = currentSegment(ctx.w, mem.elapsed).label;
    makeTicker(root, () => {
      mem.elapsed = Math.min(Math.round((Date.now() - startedAt) / 1000), total);
      const segNow = currentSegment(ctx.w, mem.elapsed).label;
      if (digits) digits.textContent = mmss(mem.elapsed);
      if (seg) seg.textContent = segNow;
      if (ink) ink.style.width = (mem.elapsed / total) * 100 + '%';
      plan.forEach((li, i) => { li.className = segClass(ctx.w, i, mem.elapsed); });
      if (mem.elapsed === total) ctx.announce('Session complete. Well done.');
      else if (segNow !== lastSeg) ctx.announce(`${segNow}. ${mmss(mem.elapsed)} elapsed.`);
      lastSeg = segNow;
    });
  }

  if (ctx.state === 'begin') mem.elapsed = 0;
}

export default {
  id: 'a',
  name: 'Quarto',
  tagline: 'The printed programme — a book you live in for twelve weeks.',
  render(state, ctx) {
    const fn = screens[state] || screens.today;
    return { html: fn(ctx), mount };
  },
};
