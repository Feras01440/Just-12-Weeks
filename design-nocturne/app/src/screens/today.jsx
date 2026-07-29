// Today — guidance-first: one unmistakable primary action.
// How — the numbered steps, including the dose step.
// Easier — something gentler: the alternatives, counting in full.

import React from 'react';
import { ChevronLeft, Clock, Milestone, HeartPulse, Check, Feather, Flame } from 'lucide-react';
import { useRoute } from '../router.jsx';
import { WORLDS } from '../fixtures.js';
import { P, Kicker, Section, Panel, NavBtn, Chip, Rise, Divider, monoNums } from '../ui.jsx';
import { MiniLightline, WeekCells, weekStatus } from '../lightline.jsx';

function BackLink({ to = 'today', label = 'Today' }) {
  const { href } = useRoute();
  return (
    <a href={href(to)} className="btn btn-ghost -ml-3 self-start !min-h-[44px] px-3">
      <ChevronLeft size={16} aria-hidden="true" />
      <span className="t-body">{label}</span>
    </a>
  );
}

export function Today() {
  const { world } = useRoute();
  const W = WORLDS[world];
  const t = W.today;
  const pos = W.position;

  return (
    <div className="flex flex-col gap-6">
      <Rise i={0} className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4">
          <Kicker>{t.kicker.replace(/ · /g, ' · ')}</Kicker>
          <p className="t-meta text-mid whitespace-nowrap">{W.short.toUpperCase()}</p>
        </div>
        <h1 className="t-title text-balance">{t.title}</h1>
      </Rise>

      <Rise i={1}>
        <MiniLightline position={pos} />
      </Rise>

      <Rise i={2}>
        <Panel lg deep className="flex flex-col gap-5 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Chip>
              <Clock size={13} aria-hidden="true" />
              <span className="text-ink">{monoNums(t.durationLabel)}</span>
            </Chip>
            <Chip>{monoNums(`${t.activity.segments.length} parts, guided`)}</Chip>
          </div>
          <P className="text-pretty">{t.why}</P>
          <Divider />
          <div className="flex flex-col gap-3">
            <NavBtn to="active" variant="primary" className="btn-between w-full !px-6">
              <span>Begin</span>
              <span className="t-meta">{monoNums(t.durationLabel)}</span>
            </NavBtn>
            <div className="flex flex-wrap gap-3">
              <NavBtn to="how" variant="quiet" className="min-w-[140px] flex-1">Show me how</NavBtn>
              <NavBtn to="easier" variant="quiet" className="min-w-[140px] flex-1">Something gentler today</NavBtn>
            </div>
          </div>
        </Panel>
      </Rise>

      <Rise i={3}>
        <Panel className="flex items-start gap-4 p-5">
          <Milestone size={18} className="mt-0.5 flex-none text-(--accent-text)" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <h2 className="t-kicker text-(--accent-text)">Milestone</h2>
            <P className="text-pretty">{t.milestone}</P>
          </div>
        </Panel>
      </Rise>

      <Rise i={4}>
        <Panel className="flex flex-col gap-3 p-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="t-section">This week</h2>
            <p className="t-meta text-mid">{monoNums(weekStatus(W.log[pos.week - 1], pos.week - 1, pos.week))}</p>
          </div>
          <WeekCells days={W.log[pos.week - 1]} weekIdx={pos.week - 1} currentWeek={pos.week} gap={10} />
        </Panel>
      </Rise>
    </div>
  );
}

export function How() {
  const { world } = useRoute();
  const W = WORLDS[world];
  const t = W.today;

  return (
    <div className="flex flex-col gap-6">
      <Rise i={0} className="flex flex-col gap-2">
        <BackLink />
        <Kicker>{t.kicker}</Kicker>
        <h1 className="t-title">Show me how</h1>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Chip><span className="text-ink">{t.shortTitle}</span></Chip>
          <Chip>
            <Clock size={13} aria-hidden="true" />
            <span className="text-ink">{monoNums(t.durationLabel)}</span>
          </Chip>
        </div>
      </Rise>

      <Rise i={1}>
        <Panel className="flex flex-col gap-2 p-5">
          <Section>Why today matters</Section>
          <P className="text-pretty">{t.whyDeeper}</P>
        </Panel>
      </Rise>

      <Rise i={2}>
        <Panel className="flex flex-col gap-4 p-5">
          <Section>Before you start</Section>
          <ul className="flex flex-col gap-3">
            {t.prep.map((p, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-[7px] size-1.5 flex-none rounded-full bg-(--accent)" aria-hidden="true" />
                <P as="span">{p}</P>
              </li>
            ))}
          </ul>
        </Panel>
      </Rise>

      <Rise i={3}>
        <Panel lg className="flex flex-col gap-1 p-6">
          <Section className="pb-4">The steps</Section>
          <ol className="flex flex-col">
            {t.how.map((s, i) => {
              const isDose = /dose/i.test(s.step);
              const last = i === t.how.length - 1;
              return (
                <li key={i} className="relative flex gap-4 pb-1">
                  <div className="flex flex-col items-center">
                    <span
                      className={`t-meta flex size-8 flex-none items-center justify-center rounded-full border ${
                        isDose
                          ? 'border-transparent bg-(--accent) font-semibold text-(--cta-text)'
                          : 'border-white/[0.08] bg-white/[0.03] text-(--accent-text)'
                      }`}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {!last && <span className="w-px flex-1 bg-white/[0.08]" aria-hidden="true" />}
                  </div>
                  <div className={`flex min-w-0 flex-1 flex-col gap-1 ${isDose ? 'mb-6 rounded-2xl bg-(--accent-faint) p-4 -mt-1' : 'pb-6'}`}>
                    <p className="t-strong text-pretty">{monoNums(s.step)}</p>
                    <P className="text-pretty">{s.detail}</P>
                  </div>
                </li>
              );
            })}
          </ol>
        </Panel>
      </Rise>

      <Rise i={4}>
        <Panel className="flex items-start gap-4 border-l-2 !border-l-amber p-5">
          <HeartPulse size={18} className="mt-0.5 flex-none text-amber" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <h2 className="t-strong">Care</h2>
            <P className="text-pretty">{t.safety}</P>
          </div>
        </Panel>
      </Rise>

      <Rise i={5}>
        <NavBtn to="active" variant="primary" className="btn-between w-full !px-6">
          <span>Begin</span>
          <span className="t-meta">{monoNums(t.durationLabel)}</span>
        </NavBtn>
      </Rise>
    </div>
  );
}

export function Easier() {
  const { world } = useRoute();
  const W = WORLDS[world];
  const t = W.today;

  return (
    <div className="flex flex-col gap-6">
      <Rise i={0} className="flex flex-col gap-2">
        <BackLink />
        <p className="t-kicker text-amber">The gentler form</p>
        <h1 className="t-title">Something gentler today</h1>
      </Rise>

      <Rise i={1}>
        <Panel lg deep className="flex flex-col gap-4 p-6">
          <div className="flex items-start gap-4">
            <span className="flex size-10 flex-none items-center justify-center rounded-xl bg-(--amber-soft)" aria-hidden="true">
              <Feather size={18} className="text-amber" />
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="t-sub text-balance">{t.easier.title}</h2>
              <P className="text-pretty">{t.easier.why}</P>
            </div>
          </div>
          <Divider />
          <P ink className="text-pretty">{t.easier.detail}</P>
          <div className="flex flex-wrap items-center gap-2">
            <Chip className="!border-amber/40">
              <Check size={13} className="text-amber" aria-hidden="true" />
              <span className="text-ink">Counts in full</span>
            </Chip>
          </div>
          <NavBtn to="active" variant="primary" className="w-full">Begin</NavBtn>
        </Panel>
      </Rise>

      <Rise i={2}>
        <Panel className="flex flex-col gap-3 p-5">
          <div className="flex items-center gap-3">
            <Flame size={16} className="text-(--accent-text)" aria-hidden="true" />
            <h2 className="t-strong">{t.advanced.title}</h2>
          </div>
          <P className="text-pretty">{t.advanced.why}</P>
          <P className="text-pretty">{t.advanced.detail}</P>
        </Panel>
      </Rise>

      <Rise i={3} className="flex flex-col gap-4">
        <P className="text-pretty">{t.safety}</P>
        <NavBtn to="today" variant="ghost" className="self-start">Back to the full session</NavBtn>
      </Rise>
    </div>
  );
}
