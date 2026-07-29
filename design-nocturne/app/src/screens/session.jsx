// The running session owns the screen (no tab bar).
// Timer is wall-clock anchored; MM:SS appears ONLY in the live timer.

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, Square, Check, Sparkles } from 'lucide-react';
import { useRoute } from '../router.jsx';
import { WORLDS } from '../fixtures.js';
import { P, Kicker, Panel, Btn, NavBtn, Rise, Chip, monoNums } from '../ui.jsx';
import { MiniLightline, WeekCells, DayCell } from '../lightline.jsx';

function fmt(ms) {
  const total = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function useSegments(activity) {
  return useMemo(() => {
    const totalMins = activity.segments.reduce((a, s) => a + s.mins, 0);
    const totalMs = totalMins * 60 * 1000;
    let acc = 0;
    const segs = activity.segments.map((s) => {
      const start = acc;
      acc += s.mins * 60 * 1000;
      return { ...s, startMs: start, endMs: acc };
    });
    return { segs, totalMs, totalMins };
  }, [activity]);
}

function SegmentBar({ segs, totalMs, elapsedMs, live }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="seg-track" role="img" aria-label={`Session progress: ${Math.round((elapsedMs / totalMs) * 100)} percent`}>
        {segs.map((s, i) => {
          const segMs = s.endMs - s.startMs;
          const f = Math.min(1, Math.max(0, (elapsedMs - s.startMs) / segMs));
          const isLive = live && elapsedMs >= s.startMs && elapsedMs < s.endMs;
          return (
            <div key={i} className={`seg ${isLive ? 'seg-live' : ''}`} style={{ flex: s.mins }}>
              <span style={{ transform: `scaleX(${f})` }} />
            </div>
          );
        })}
      </div>
      <ol className="flex flex-col gap-2">
        {segs.map((s, i) => {
          const done = elapsedMs >= s.endMs;
          const current = elapsedMs >= s.startMs && elapsedMs < s.endMs;
          return (
            <li key={i} className="flex items-center gap-3">
              <span className="flex size-5 flex-none items-center justify-center" aria-hidden="true">
                {done ? (
                  <Check size={14} className="text-(--accent-text)" />
                ) : current ? (
                  <span className="size-2 rounded-full bg-(--accent)" style={{ boxShadow: '0 0 8px 1px var(--accent-glow)' }} />
                ) : (
                  <span className="size-1.5 rounded-full bg-white/20" />
                )}
              </span>
              <span className={`t-body flex-1 ${current ? 'font-semibold text-ink' : done ? 'text-mid' : 'text-mid'}`}>
                {s.label}
                {done && <span className="sr-only"> — done</span>}
                {current && <span className="sr-only"> — now</span>}
              </span>
              <span className={`t-meta ${current ? 'text-(--accent-text)' : 'text-mid'}`}>{s.mins} min</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function SessionShell({ children }) {
  return <div className="flex min-h-[calc(100dvh-96px)] flex-col gap-8">{children}</div>;
}

export function Active() {
  const { world, navigate, reduced } = useRoute();
  const W = WORLDS[world];
  const t = W.today;
  const { segs, totalMs } = useSegments(t.activity);

  // Wall-clock anchored: the session "started" seed-offset ago; every tick
  // recomputes from Date.now(), so throttled timers can never drift.
  const seed = Math.round(totalMs * 0.43);
  const startRef = useRef(Date.now() - seed);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, []);

  const elapsed = Math.min(totalMs, now - startRef.current);
  const remaining = totalMs - elapsed;

  useEffect(() => {
    if (remaining <= 0) navigate('complete');
  }, [remaining, navigate]);

  const liveSeg = segs.find((s) => elapsed >= s.startMs && elapsed < s.endMs) || segs[segs.length - 1];

  return (
    <SessionShell>
      <Rise i={0} className="flex items-baseline justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Kicker>{t.kicker}</Kicker>
          <h1 className="t-sub">{t.shortTitle}</h1>
        </div>
        <p className="t-meta text-mid whitespace-nowrap">
          {segs.indexOf(liveSeg) + 1} OF {segs.length}
        </p>
      </Rise>

      <Rise i={1} className="flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center">
        <div role="timer" aria-live="off" aria-label="Time remaining" className="t-timer">
          {fmt(remaining)}
        </div>
        <p className="t-body font-semibold text-ink">{liveSeg.label}</p>
        <p className="t-meta text-mid">REMAINING</p>
      </Rise>

      <Rise i={2}>
        <SegmentBar segs={segs} totalMs={totalMs} elapsedMs={elapsed} live />
      </Rise>

      <Rise i={3} className="flex gap-3 pb-2">
        <Btn variant="quiet" className="flex-1" onClick={() => navigate('paused')}>
          <Pause size={16} aria-hidden="true" /> Pause
        </Btn>
        <Btn variant="quiet" className="flex-1" onClick={() => navigate('today')}>
          <Square size={14} aria-hidden="true" /> Stop
        </Btn>
      </Rise>
    </SessionShell>
  );
}

export function Paused() {
  const { world, navigate } = useRoute();
  const W = WORLDS[world];
  const t = W.today;
  const { segs, totalMs } = useSegments(t.activity);
  const elapsed = Math.round(totalMs * 0.43);
  const liveSeg = segs.find((s) => elapsed >= s.startMs && elapsed < s.endMs) || segs[segs.length - 1];

  return (
    <SessionShell>
      <Rise i={0} className="flex items-baseline justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Kicker>{t.kicker}</Kicker>
          <h1 className="t-sub">{t.shortTitle}</h1>
        </div>
        <p className="t-meta text-amber whitespace-nowrap">PAUSED</p>
      </Rise>

      <Rise i={1} className="flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center">
        <div role="timer" aria-live="off" aria-label="Time remaining, paused" className="t-timer opacity-50">
          {fmt(totalMs - elapsed)}
        </div>
        <p className="t-body font-semibold text-mid">{liveSeg.label}</p>
        <p className="t-meta text-mid">HELD</p>
      </Rise>

      <Rise i={2}>
        <Panel className="p-5">
          <p role="status" className="t-body text-mid text-pretty">{t.activity.pauseNote}</p>
        </Panel>
      </Rise>

      <Rise i={3}>
        <SegmentBar segs={segs} totalMs={totalMs} elapsedMs={elapsed} live={false} />
      </Rise>

      <Rise i={4} className="flex gap-3 pb-2">
        <Btn variant="primary" className="flex-1" onClick={() => navigate('active')}>
          <Play size={16} aria-hidden="true" /> Carry on
        </Btn>
        <Btn variant="quiet" className="flex-1" onClick={() => navigate('today')}>
          <Square size={14} aria-hidden="true" /> Stop
        </Btn>
      </Rise>
    </SessionShell>
  );
}

export function Complete() {
  const { world } = useRoute();
  const W = WORLDS[world];
  const t = W.today;
  const pos = W.position;
  const days = W.log[pos.week - 1];

  return (
    <div className="flex flex-col items-center gap-8 pt-10 text-center">
      <Rise i={0} className="relative flex items-center justify-center py-6">
        <div className="kindle-cell" aria-hidden="true">
          <span className="kindle-ripple" />
          <span className="kindle-ripple r2" />
        </div>
      </Rise>

      <Rise i={1} className="flex flex-col items-center gap-3">
        <Kicker>Session complete</Kicker>
        <h1 className="t-title text-balance">{monoNums(`${t.durationLabel} — kept.`)}</h1>
        <p role="status" className="t-body text-mid">
          {monoNums(`Day ${pos.dayOfProgramme} fills its cell. It stays kept.`)}
        </p>
      </Rise>

      <Rise i={2}>
        <Panel className="flex flex-col items-center gap-3 px-8 py-5">
          <p className="t-meta text-mid">{monoNums(`WEEK ${pos.week} · ${pos.weekTheme.toUpperCase()}`)}</p>
          <ul className="flex items-center gap-2.5" aria-label={`Week ${pos.week} days`}>
            {days.map((d, di) => {
              const isToday = d === 'today';
              const st = isToday ? 'done' : d === 'future' ? 'open' : d;
              return (
                <li key={di} className="flex">
                  <DayCell state={st} size={26} className={isToday ? 'kindle-now' : ''} />
                  <span className="sr-only">{`Day ${di + 1}: ${isToday ? 'kept — just now' : st}`}</span>
                </li>
              );
            })}
          </ul>
        </Panel>
      </Rise>

      <Rise i={3} className="flex w-full max-w-[360px] flex-col gap-3">
        <NavBtn to="question" variant="primary" className="w-full">Continue</NavBtn>
        <NavBtn to="today" variant="ghost">Done for now</NavBtn>
      </Rise>
    </div>
  );
}

export function Question() {
  const { world, navigate } = useRoute();
  const W = WORLDS[world];
  const q = W.today.question;

  const choose = (i) => {
    try { sessionStorage.setItem('nocturne-q', String(i)); } catch { /* private mode */ }
    navigate('acknowledge');
  };

  return (
    <div className="flex flex-col gap-6 pt-4">
      <Rise i={0} className="flex flex-col gap-2">
        <Kicker>One tap, then done</Kicker>
        <h1 className="t-title text-balance">{q.prompt}</h1>
        <P>{q.why}</P>
      </Rise>

      <div className="flex flex-col gap-3">
        {q.options.map((opt, i) => (
          <Rise key={opt} i={i + 1}>
            <button
              type="button"
              onClick={() => choose(i)}
              className="panel panel-i flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <span className="t-strong">{opt}</span>
              <span className="t-meta text-mid" aria-hidden="true">{i + 1}</span>
            </button>
          </Rise>
        ))}
      </div>
    </div>
  );
}

export function Acknowledge() {
  const { world } = useRoute();
  const W = WORLDS[world];
  const t = W.today;
  const pos = W.position;

  let idx = 0;
  try { idx = parseInt(sessionStorage.getItem('nocturne-q') || '0', 10) || 0; } catch { /* ok */ }
  const ack = t.question.acknowledgements[Math.min(idx, t.question.acknowledgements.length - 1)];

  return (
    <div className="flex flex-col gap-7 pt-6">
      <Rise i={0} className="flex flex-col items-start gap-3">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-(--accent-soft)" aria-hidden="true">
          <Sparkles size={20} className="text-(--accent-text)" />
        </span>
        <h1 className="t-display text-balance">{monoNums(t.acknowledgement.headline)}</h1>
        <P className="text-pretty">{t.acknowledgement.line}</P>
      </Rise>

      <Rise i={1}>
        <Panel className="flex flex-col gap-2 p-5">
          <p className="t-kicker">Noted for tomorrow</p>
          <p role="status" className="t-body text-ink text-pretty">{monoNums(ack)}</p>
        </Panel>
      </Rise>

      <Rise i={2} className="flex flex-col gap-3">
        <p className="t-meta text-mid">{monoNums(t.acknowledgement.weekLine)}</p>
        <MiniLightline position={pos} />
      </Rise>

      <Rise i={3} className="flex flex-col gap-3">
        <NavBtn to="today" variant="primary" className="w-full">Done for today</NavBtn>
        <NavBtn to="journey" variant="ghost">See the journey</NavBtn>
      </Rise>
    </div>
  );
}
