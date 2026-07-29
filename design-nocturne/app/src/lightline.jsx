// The Lightline — progress rendered literally as accumulated light.
// One element, three scales: Today (mini), Journey (full), Week 12 (constellation).

import React from 'react';
import { useRoute } from './router.jsx';

// ---------- stats ----------

export function logStats(log) {
  let kept = 0, mended = 0, rest = 0, open = 0, future = 0, today = 0;
  log.forEach((week) =>
    week.forEach((d) => {
      if (d === 'done') kept++;
      else if (d === 'mended') mended++;
      else if (d === 'rest') rest++;
      else if (d === 'today') today++;
      else if (d === 'missed') open++;
      else future++;
    })
  );
  return { kept, mended, rest, remaining: open + future + today };
}

export const CELL_WORDS = {
  done: 'kept',
  mended: 'made up later',
  today: 'today',
  open: 'open — can be made up',
  future: 'not open yet',
  rest: 'rest day',
};

// Map a fixture day state to a visual cell state, given week context.
export function cellState(d, weekIdx, currentWeek) {
  if (d === 'future') return weekIdx + 1 === currentWeek ? 'open' : 'future';
  if (d === 'missed') return 'open';
  return d; // done | mended | today | rest
}

const CELL_CLS = {
  done: 'c-done',
  mended: 'c-mend',
  today: 'c-today',
  open: 'c-open',
  future: 'c-future',
  rest: 'c-rest',
};

export function DayCell({ state, ignite = false, i = 0, className = '', size }) {
  return (
    <span
      className={`cell ${CELL_CLS[state]} ${ignite && state === 'mended' ? 'mend-ignite' : ''} ${className}`}
      style={{ '--i': i, ...(size ? { width: size, height: size } : {}) }}
      aria-hidden="true"
    />
  );
}

// A week's seven cells as an accessible list.
export function WeekCells({ days, weekIdx, currentWeek, ignite = true, gap = 8, size }) {
  return (
    <ul className="flex items-center" style={{ gap }} aria-label={`Week ${weekIdx + 1} days`}>
      {days.map((d, di) => {
        const st = cellState(d, weekIdx, currentWeek);
        return (
          <li key={di} className="flex">
            <DayCell state={st} ignite={ignite} i={di} size={size} />
            <span className="sr-only">{`Day ${di + 1}: ${CELL_WORDS[st]}`}</span>
          </li>
        );
      })}
    </ul>
  );
}

// ---------- mini lightline (Today) ----------

export function MiniLightline({ position, className = '' }) {
  const segs = Array.from({ length: 12 }, (_, i) =>
    i + 1 < position.week ? 'done' : i + 1 === position.week ? 'current' : 'future'
  );
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div
        className="flex flex-1 items-center gap-1"
        role="img"
        aria-label={`Week ${position.week} of 12 — day ${position.dayOfProgramme} of 84`}
      >
        {segs.map((s, i) => (
          <span
            key={i}
            className={`ll-seg ll-draw ${s === 'done' ? 'is-done' : ''} ${s === 'current' ? 'is-current' : ''}`}
            style={{ '--i': i }}
          />
        ))}
      </div>
      <p className="t-meta whitespace-nowrap text-mid">
        DAY <span className="text-ink">{position.dayOfProgramme}</span> / 84
      </p>
    </div>
  );
}

// ---------- 84-tick overall bar (Journey header) ----------

export function TickBar({ log, currentWeek, className = '' }) {
  const flat = [];
  log.forEach((week, wi) => week.forEach((d) => flat.push(cellState(d, wi, currentWeek))));
  return (
    <div
      className={`flex items-end gap-[2px] ${className}`}
      role="img"
      aria-label="Overall progress, one tick per day of the eighty-four"
    >
      {flat.map((s, i) => (
        <span
          key={i}
          className={`tick ll-draw ${
            s === 'done' ? 'is-done' : s === 'mended' ? 'is-mend' : s === 'rest' ? 'is-rest' : s === 'today' ? 'is-current' : ''
          }`}
          style={{ '--i': Math.floor(i / 4) }}
        />
      ))}
    </div>
  );
}

// ---------- legend ----------

const LEGEND = [
  ['done', 'Kept'],
  ['mended', 'Made up later'],
  ['today', 'Today'],
  ['open', 'Open — can be made up'],
  ['future', 'Not open yet'],
  ['rest', 'Rest day'],
];

export function Legend({ className = '' }) {
  return (
    <ul className={`grid grid-cols-2 gap-x-6 gap-y-3 ${className}`}>
      {LEGEND.map(([st, words]) => (
        <li key={st} className="flex min-w-0 items-start gap-3">
          <DayCell state={st === 'today' ? 'today' : st} size={18} className="mt-px" />
          <span className="t-meta text-mid">{words}</span>
        </li>
      ))}
    </ul>
  );
}

// ---------- week helpers ----------

export function weekStatus(days, weekIdx, currentWeek) {
  const n = weekIdx + 1;
  const mends = days.filter((d) => d === 'mended').length;
  if (n < currentWeek) {
    if (mends === 1) return 'Kept — one day made up';
    if (mends > 1) return `Kept — ${mends} days made up`;
    return 'Kept in full';
  }
  if (n === currentWeek) {
    const dayIdx = days.indexOf('today') + 1;
    return `Underway — day ${dayIdx} of 7`;
  }
  if (n === currentWeek + 1) return `Opens when week ${currentWeek} closes`;
  return 'Not open yet';
}

export function weekFill(days, weekIdx, currentWeek) {
  const n = weekIdx + 1;
  if (n < currentWeek) return 1;
  if (n > currentWeek) return 0;
  const done = days.filter((d) => d === 'done' || d === 'mended' || d === 'rest').length;
  return done / 7;
}

export function useAccent() {
  const { world } = useRoute();
  return world === 'writing' ? '#6366F1' : '#10B981';
}
