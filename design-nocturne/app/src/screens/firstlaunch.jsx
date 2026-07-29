// First launch — the programme speaks for itself before asking for anything.

import React from 'react';
import { Check, Clock, CalendarDays, HeartPulse, TrendingUp } from 'lucide-react';
import { useRoute } from '../router.jsx';
import { WORLDS } from '../fixtures.js';
import { P, Kicker, Section, Panel, NavBtn, Rise, monoNums } from '../ui.jsx';

const EXPECT_ICONS = [Clock, CalendarDays, HeartPulse, TrendingUp];

export function FirstLaunch() {
  const { world, wide } = useRoute();
  const W = WORLDS[world];
  const p = W.programme;

  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col gap-6 pt-4">
      <Rise i={0} className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-3">
          <span
            className="t-meta flex size-9 items-center justify-center rounded-xl border border-white/[0.08] bg-panel font-semibold text-(--accent-text)"
            aria-hidden="true"
          >
            12
          </span>
          <Kicker>Twelve weeks · {W.short}</Kicker>
        </div>
        <h1 className="t-display text-balance">{p.title}</h1>
        <p className="t-sub text-mid text-pretty">{monoNums(p.subtitle)}</p>
        <P className="text-pretty">{monoNums(p.promise)}</P>
      </Rise>

      <Rise i={1}>
        <Panel className="flex flex-col gap-4 p-5">
          <div className="flex items-center justify-between gap-4">
            <Section>The shape of it</Section>
            <p className="t-meta text-mid">{monoNums('12 WEEKS · 84 DAYS')}</p>
          </div>
          <div className="flex items-center gap-1" role="img" aria-label="Twelve weeks, none begun yet">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className="ll-seg ll-draw" style={{ '--i': i }} />
            ))}
          </div>
          <ol className={`grid gap-x-6 gap-y-2 ${wide ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {W.weeks.map((wk) => (
              <li key={wk.n} className="flex items-baseline gap-3">
                <span className="t-meta text-(--accent-text)">W{String(wk.n).padStart(2, '0')}</span>
                <span className="t-body truncate text-mid">{wk.title}</span>
              </li>
            ))}
          </ol>
        </Panel>
      </Rise>

      <Rise i={2}>
        <Panel className="flex flex-col gap-4 p-5">
          <Section>Who it’s for</Section>
          <ul className="flex flex-col gap-3">
            {p.whoFor.map((line) => (
              <li key={line} className="flex items-start gap-3">
                <Check size={15} className="mt-1 flex-none text-(--accent-text)" aria-hidden="true" />
                <P as="span" className="text-pretty">{line}</P>
              </li>
            ))}
          </ul>
        </Panel>
      </Rise>

      <Rise i={3}>
        <Panel className="flex flex-col gap-4 p-5">
          <Section>What to expect</Section>
          <ul className={`grid gap-4 ${wide ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {p.expectations.map((line, i) => {
              const Icon = EXPECT_ICONS[i % EXPECT_ICONS.length];
              return (
                <li key={line} className="flex items-start gap-3">
                  <span className="flex size-8 flex-none items-center justify-center rounded-lg bg-white/[0.04]" aria-hidden="true">
                    <Icon size={15} className="text-(--accent-text)" />
                  </span>
                  <P as="span" className="text-pretty">{line}</P>
                </li>
              );
            })}
          </ul>
        </Panel>
      </Rise>

      <Rise i={4}>
        <Panel className="flex flex-col gap-2 border-l-2 !border-l-amber p-5">
          <h2 className="t-strong">A word of care</h2>
          <P className="text-pretty">{p.notFor}</P>
        </Panel>
      </Rise>

      <Rise i={5} className="flex flex-col gap-3 pb-4">
        <NavBtn to="today" variant="primary" className="w-full">Begin Week One — free</NavBtn>
        <P className="text-center text-pretty">
          No card is needed for Week One, and nothing is ever charged without asking you first.
        </P>
        <NavBtn to="subscription" variant="ghost" className="self-center">See membership</NavBtn>
      </Rise>
    </div>
  );
}
