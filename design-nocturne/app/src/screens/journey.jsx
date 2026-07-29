// The Journey — the Lightline at full scale. A vertical timeline with a
// glowing axis; every week a panel; light accumulates downward.

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown, Download, Award } from 'lucide-react';
import { useRoute } from '../router.jsx';
import { WORLDS, journeyLog } from '../fixtures.js';
import { P, Kicker, Section, Panel, NavBtn, Rise, monoNums } from '../ui.jsx';
import {
  logStats, WeekCells, DayCell, TickBar, Legend, weekStatus, weekFill,
} from '../lightline.jsx';

function StatChip({ cell, n, label }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <DayCell state={cell} size={14} />
      <p className="t-meta whitespace-nowrap text-mid">
        <span className="font-semibold text-ink">{n}</span> {label}
      </p>
    </div>
  );
}

export function JourneyHeader({ W, pos, log }) {
  const stats = logStats(log);
  return (
    <Panel lg deep className="flex flex-col gap-5 p-6">
      <div className="flex items-end justify-between gap-4">
        <p className="t-counter" aria-label={`Day ${pos.dayOfProgramme} of 84`}>
          DAY {pos.dayOfProgramme}
          <span className="text-[0.5em] font-medium text-mid"> / 84</span>
        </p>
        <p className="t-meta pb-1 text-right text-mid">{monoNums(`WEEK ${pos.week} OF 12`)}</p>
      </div>
      <TickBar log={log} currentWeek={pos.week} />
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <StatChip cell="done" n={stats.kept} label="kept" />
        <StatChip cell="mended" n={stats.mended} label="mended" />
        <StatChip cell="open" n={stats.remaining} label="remaining" />
      </div>
    </Panel>
  );
}

export function Journey() {
  const { world, wide } = useRoute();
  const W = WORLDS[world];
  const pos = W.position;
  const log = W.log;

  // Measure the lit portion of the axis so the light reaches exactly the
  // current week's node.
  const listRef = useRef(null);
  const currentRef = useRef(null);
  const [litH, setLitH] = useState(0);
  useLayoutEffect(() => {
    const measure = () => {
      if (listRef.current && currentRef.current) {
        const a = listRef.current.getBoundingClientRect();
        const b = currentRef.current.getBoundingClientRect();
        setLitH(b.top - a.top + b.height / 2);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <Rise i={0} className="flex flex-col gap-1">
        <Kicker>{W.programme.title}</Kicker>
        <h1 className="t-title">The Twelve Weeks</h1>
      </Rise>

      <Rise i={1}>
        <JourneyHeader W={W} pos={pos} log={log} />
      </Rise>

      <Rise i={2} as="section" aria-label="Week by week" className="relative" >
        <div ref={listRef} className="relative flex flex-col gap-4 pl-9">
          <div className="axis" aria-hidden="true">
            <div className="axis-lit" style={{ height: litH ? `${litH}px` : '18%' }} />
          </div>

          {log.map((days, wi) => {
            const n = wi + 1;
            const wk = W.weeks[wi];
            const isCurrent = n === pos.week;
            const isPast = n < pos.week;
            const isNext = n === pos.week + 1;
            const fill = weekFill(days, wi, pos.week);
            return (
              <article
                key={n}
                className={`panel relative p-5 ${isCurrent ? 'week-current' : ''} ${
                  !isPast && !isCurrent && !isNext ? 'week-future' : ''
                }`}
              >
                <span
                  ref={isCurrent ? currentRef : undefined}
                  className={`axis-node ${isPast ? 'n-done' : ''} ${isCurrent ? 'n-current' : ''}`}
                  style={{ left: -31, top: 24 }}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="t-strong flex min-w-0 items-baseline gap-3">
                      <span className={`t-meta ${isPast || isCurrent ? 'text-(--accent-text)' : 'text-mid'}`}>
                        W{String(n).padStart(2, '0')}
                      </span>
                      <span className={`truncate ${isPast || isCurrent || isNext ? 'text-ink' : 'text-mid'}`}>
                        {wk.title}
                      </span>
                    </h2>
                    {isCurrent && <p className="t-meta whitespace-nowrap text-(--accent-text)">NOW</p>}
                  </div>

                  <WeekCells days={days} weekIdx={wi} currentWeek={pos.week} gap={wide ? 12 : 9} size={22} />
                  {isNext && (
                    <p className="t-body text-mid text-pretty">{wk.focus}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="micro min-w-16 basis-20" role="img" aria-label={`Week ${n}: ${Math.round(fill * 7)} of 7 days closed`}>
                      <span style={{ '--f': fill, '--i': wi }} />
                    </div>
                    <p className="t-meta text-mid">{monoNums(weekStatus(days, wi, pos.week))}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Rise>

      <Rise i={3}>
        <Panel className="flex flex-col gap-4 p-5">
          <Section>How to read the light</Section>
          <Legend />
          <P className="text-pretty">
            Missed days stay open, never lost — a day made up later counts in full.
          </P>
        </Panel>
      </Rise>
    </div>
  );
}

export function WeekTransition() {
  const { world, reduced } = useRoute();
  const W = WORLDS[world];
  const pos = W.position;
  const closing = W.weeks[pos.week - 1];
  const opening = W.weeks[pos.week];
  const [handed, setHanded] = useState(reduced);
  const barRef = useRef(null);
  const dotRef = useRef(null);

  // The glow handoff: the current segment passes its light to the next.
  useEffect(() => {
    if (reduced) { setHanded(true); return undefined; }
    const t = setTimeout(() => setHanded(true), 1350);
    let anim;
    const bar = barRef.current;
    const dot = dotRef.current;
    if (bar && dot) {
      const segs = bar.querySelectorAll('.handoff-seg');
      const from = segs[pos.week - 1].getBoundingClientRect();
      const to = segs[pos.week].getBoundingClientRect();
      const base = bar.getBoundingClientRect();
      const x0 = from.left - base.left + from.width / 2 - 5;
      const x1 = to.left - base.left + to.width / 2 - 5;
      anim = dot.animate(
        [
          { transform: `translateX(${x0}px) scale(0.6)`, opacity: 0 },
          { transform: `translateX(${x0}px) scale(1)`, opacity: 1, offset: 0.25 },
          { transform: `translateX(${x1}px) scale(1)`, opacity: 1, offset: 0.85 },
          { transform: `translateX(${x1}px) scale(0.5)`, opacity: 0 },
        ],
        { duration: 1400, easing: 'cubic-bezier(0.45, 0, 0.2, 1)', fill: 'forwards' }
      );
    }
    return () => { clearTimeout(t); anim?.cancel(); };
  }, [reduced, pos.week]);

  return (
    <div className="flex flex-col gap-7 pt-4">
      <Rise i={0} className="flex flex-col items-start gap-2">
        <Kicker>{monoNums(`Week ${pos.week} → Week ${pos.week + 1}`)}</Kicker>
        <h1 className="t-display text-balance">{monoNums(`Week ${pos.week}, banked.`)}</h1>
        <P className="text-pretty">
          Its light joins the line — nothing built this week can be unbuilt.
        </P>
      </Rise>

      <Rise i={1}>
        <div ref={barRef} className="relative flex items-center gap-1.5 py-2" role="img"
          aria-label={`The light moves from week ${pos.week} to week ${pos.week + 1}`}>
          {Array.from({ length: 12 }, (_, i) => {
            const n = i + 1;
            const cls =
              n < pos.week ? 'is-done'
              : n === pos.week ? (handed ? 'is-done' : 'is-current')
              : n === pos.week + 1 ? (handed ? 'is-current' : '')
              : '';
            return <span key={n} className={`ll-seg handoff-seg ${cls}`} style={{ height: 8 }} />;
          })}
          <span ref={dotRef} className="handoff-dot" style={{ left: 0, opacity: 0 }} aria-hidden="true" />
        </div>
      </Rise>

      <Rise i={2} className="flex flex-col gap-3">
        <Panel className="flex flex-col gap-3 p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="t-strong flex items-baseline gap-3">
              <span className="t-meta text-(--accent-text)">W{String(pos.week).padStart(2, '0')}</span>
              {closing.title}
            </h2>
            <p className="t-meta text-mid">CLOSED</p>
          </div>
          <WeekCells
            days={Array.from({ length: 7 }, (_, d) => (d === 6 ? 'rest' : 'done'))}
            weekIdx={pos.week - 1}
            currentWeek={13}
            ignite={false}
            gap={9}
            size={20}
          />
          <p className="t-meta text-mid">Kept in full</p>
        </Panel>

        <div className="flex justify-center" aria-hidden="true">
          <ArrowDown size={16} className="text-mid" />
        </div>

        <Panel className={`flex flex-col gap-3 p-5 ${handed ? 'week-current' : ''}`}>
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="t-strong flex items-baseline gap-3">
              <span className="t-meta text-(--accent-text)">W{String(pos.week + 1).padStart(2, '0')}</span>
              {opening.title}
            </h2>
            <p className="t-meta whitespace-nowrap text-(--accent-text)">OPENS NOW</p>
          </div>
          <P className="text-pretty">{opening.focus}</P>
        </Panel>
      </Rise>

      <Rise i={3} className="flex flex-col gap-3">
        <NavBtn to="today" variant="primary" className="w-full">Go to today</NavBtn>
        <NavBtn to="journey" variant="ghost">See the whole journey</NavBtn>
      </Rise>
    </div>
  );
}

export function Week12() {
  const { world, wide } = useRoute();
  const W = WORLDS[world];
  const done = W.completion;
  const fullLog = journeyLog(13, 1); // all twelve weeks banked
  const exportLabel = W.expired.secondary; // “Export my record” / “Export my draft”

  return (
    <div className="flex flex-col gap-7">
      <Rise i={0} className="flex flex-col items-center gap-3 pt-4 text-center">
        <Kicker>{monoNums('Week 12 · Day 84')}</Kicker>
        <h1 className="t-display text-balance">{monoNums(done.headline)}</h1>
        <P className="max-w-[46ch] text-pretty">{done.line}</P>
      </Rise>

      <Rise i={1} className="constellation flex justify-center py-4">
        <div
          className="flex gap-[7px]"
          role="img"
          aria-label="All eighty-four days assembled: the finished record, one made up in amber"
        >
          {fullLog.map((days, wi) => (
            <div key={wi} className="flex flex-col gap-[7px]">
              {days.map((d, di) => (
                <DayCell
                  key={di}
                  state={d === 'mended' ? 'mended' : d === 'rest' ? 'rest' : 'done'}
                  className="star"
                  i={wi * 7 + di}
                  size={wide ? 20 : 16}
                />
              ))}
            </div>
          ))}
        </div>
      </Rise>

      <Rise i={2}>
        <Panel lg className="flex flex-col gap-1 p-6">
          <Section className="pb-3">The record</Section>
          <dl className="flex flex-col">
            {done.record.map((r, i) => (
              <div
                key={r.label}
                className={`flex items-baseline justify-between gap-6 py-3 ${i > 0 ? 'border-t border-white/[0.08]' : ''}`}
              >
                <dt className="t-body text-mid">{r.label}</dt>
                <dd className="t-mono t-body text-right text-ink">{r.value}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      </Rise>

      <Rise i={3}>
        <Panel lg deep className="p-3">
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/[0.08] px-6 py-8 text-center">
            <Award size={22} className="text-(--accent-text)" aria-hidden="true" />
            <h2 className="t-sub pt-1">{done.artefact.title}</h2>
            <p className="t-meta text-mid">{monoNums(done.artefact.subtitle)}</p>
            <P className="max-w-[40ch] pt-2 text-pretty">{done.artefact.note}</P>
          </div>
        </Panel>
      </Rise>

      <Rise i={4} className="flex flex-col gap-3">
        <button type="button" className="btn btn-primary w-full">
          <Download size={16} aria-hidden="true" /> {exportLabel}
        </button>
        <NavBtn to="journey" variant="ghost">Back to the journey</NavBtn>
      </Rise>
    </div>
  );
}
