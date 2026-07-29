// Recovery without shame — kept days stay kept, missed days stay open.
// Amber is the colour of care and mending, never of warning.

import React, { useState } from 'react';
import { ChevronRight, Sunrise, Anchor, Moon } from 'lucide-react';
import { useRoute } from '../router.jsx';
import { WORLDS } from '../fixtures.js';
import { P, Kicker, Section, Panel, Btn, NavBtn, Rise, monoNums } from '../ui.jsx';
import { DayCell, CELL_WORDS } from '../lightline.jsx';

export function MissedOne() {
  const { world } = useRoute();
  const W = WORLDS[world];
  const r = W.recovery.oneDay;
  // Scenario strip: a kept day, yesterday open, today glowing, the rest ahead.
  const strip = ['done', 'open', 'today', 'future', 'future', 'future', 'rest'];

  return (
    <div className="flex flex-col gap-6 pt-2">
      <Rise i={0} className="flex flex-col gap-2">
        <p className="t-kicker text-amber">Nothing lost</p>
        <h1 className="t-title text-balance">{r.headline}</h1>
        <P className="text-pretty">{r.line}</P>
      </Rise>

      <Rise i={1}>
        <Panel className="flex flex-col gap-4 p-5">
          <ul className="flex items-center gap-2.5" aria-label="This week so far">
            {strip.map((s, i) => (
              <li key={i} className="flex">
                <DayCell state={s} size={24} />
                <span className="sr-only">{`Day ${i + 1}: ${CELL_WORDS[s]}`}</span>
              </li>
            ))}
          </ul>
          <P className="text-pretty">
            Yesterday’s cell stays open — make it up any time and it fills in amber, counting in full.
          </P>
        </Panel>
      </Rise>

      <Rise i={2} className="flex flex-col gap-3">
        <NavBtn to="active" variant="primary" className="w-full">{r.action}</NavBtn>
        <NavBtn to="easier" variant="quiet" className="w-full">{r.altAction}</NavBtn>
        <P className="px-1 text-pretty">{r.altDetail}</P>
      </Rise>
    </div>
  );
}

export function MissedSeveral() {
  const { world, navigate } = useRoute();
  const W = WORLDS[world];
  const r = W.recovery.severalDays;
  const pos = W.position;
  const banked = W.weeks.slice(0, pos.week - 1);

  return (
    <div className="flex flex-col gap-6 pt-2">
      <Rise i={0} className="flex flex-col gap-2">
        <p className="t-kicker text-amber">Your place is kept</p>
        <h1 className="t-title text-balance">{monoNums(r.headline)}</h1>
        <P className="text-pretty">{monoNums(r.line)}</P>
      </Rise>

      <Rise i={1}>
        <Panel className="flex flex-col gap-1 p-5">
          <Section className="pb-3">Built and banked</Section>
          {banked.map((wk, i) => (
            <div key={wk.n} className={`flex items-center gap-4 py-2.5 ${i > 0 ? 'border-t border-white/[0.08]' : ''}`}>
              <span className="t-meta text-(--accent-text)">W{String(wk.n).padStart(2, '0')}</span>
              <span className="t-body flex-1 truncate text-ink">{wk.title}</span>
              <div className="micro max-w-20">
                <span style={{ '--i': i }} />
              </div>
              <span className="t-meta text-mid">KEPT</span>
            </div>
          ))}
        </Panel>
      </Rise>

      <Rise i={2} className="flex flex-col gap-3">
        <Section>How to step back in</Section>
        {r.options.map((o, i) => (
          <button
            key={o.title}
            type="button"
            onClick={() => navigate(i === 0 ? 'today' : 'active')}
            className="panel panel-i flex w-full items-center gap-4 p-5 text-left"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="t-strong">{o.title}</span>
              <P as="span" className="text-pretty">{o.detail}</P>
            </div>
            <ChevronRight size={16} className="flex-none text-mid" aria-hidden="true" />
          </button>
        ))}
      </Rise>
    </div>
  );
}

export function LongAbsence() {
  const { world, wide } = useRoute();
  const W = WORLDS[world];
  const r = W.recovery.longAbsence;

  return (
    <div className="flex flex-col gap-7 pt-2">
      <Rise i={0} className="flex flex-col items-start gap-3">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-(--amber-soft)" aria-hidden="true">
          <Sunrise size={20} className="text-amber" />
        </span>
        <h1 className="t-title text-balance">{monoNums(r.headline)}</h1>
        <P className="text-pretty">{monoNums(r.line)}</P>
      </Rise>

      <Rise i={1} className="flex flex-col gap-3">
        <h2 className="t-sub">{r.capacityPrompt}</h2>
        <div className={`grid gap-3 ${wide ? 'grid-cols-3' : 'grid-cols-1'}`}>
          {r.capacities.map((c, i) => (
            <Rise key={c.title} i={i + 2}>
              <Panel className="flex h-full flex-col gap-3 p-5">
                <h3 className="t-strong text-balance">{c.title}</h3>
                <P className="flex-1 text-pretty">{monoNums(c.detail)}</P>
                <NavBtn to="active" variant="quiet" className="w-full !justify-start !px-4">
                  <span className="t-body font-semibold">{monoNums(c.does)}</span>
                </NavBtn>
              </Panel>
            </Rise>
          ))}
        </div>
      </Rise>

      <Rise i={5}>
        <Panel className="flex flex-col gap-3 p-5">
          <div className="flex items-center gap-3">
            <Anchor size={16} className="text-amber" aria-hidden="true" />
            <Section>A calendar that fits</Section>
          </div>
          <P className="text-pretty">{monoNums(r.reschedule)}</P>
          <NavBtn to="settings" variant="quiet" className="self-start">Change my weekly days</NavBtn>
        </Panel>
      </Rise>
    </div>
  );
}

export function ProgrammePause() {
  const { world } = useRoute();
  const W = WORLDS[world];
  const r = W.recovery.pause;
  const [pausedNow, setPausedNow] = useState(false);

  return (
    <div className="flex flex-col gap-6 pt-2">
      <Rise i={0} className="flex flex-col items-start gap-3">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-(--amber-soft)" aria-hidden="true">
          <Moon size={20} className="text-amber" />
        </span>
        <h1 className="t-title">{r.headline}</h1>
        <P className="text-pretty">{r.line}</P>
      </Rise>

      <Rise i={1}>
        <Panel className="p-5">
          <P className="text-pretty">{r.detail}</P>
        </Panel>
      </Rise>

      <Rise i={2} className="flex flex-col gap-3">
        {pausedNow ? (
          <Panel className="p-5">
            <p role="status" className="t-body text-ink">
              Paused. Your place, your record and your milestones are kept exactly as they are.
            </p>
          </Panel>
        ) : (
          <Btn variant="primary" className="w-full" onClick={() => setPausedNow(true)}>
            {r.action}
          </Btn>
        )}
        <NavBtn to="settings" variant="ghost">Back to Programme &amp; Support</NavBtn>
      </Rise>
    </div>
  );
}
