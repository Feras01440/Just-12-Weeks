// Programme & Support, the ethical paywall, lapse and restore.
// Commerce copy is fixture-literal; the exits are as visible as the entrances.

import React, { useState } from 'react';
import {
  ChevronRight, CalendarDays, PauseCircle, RotateCcw, Check,
  Download, Mail, CreditCard,
} from 'lucide-react';
import { useRoute } from '../router.jsx';
import { WORLDS } from '../fixtures.js';
import { P, Kicker, Section, Panel, Btn, NavBtn, Rise, Chip, Divider, monoNums } from '../ui.jsx';

const ROW_ICONS = {
  'Change my weekly days': CalendarDays,
  'Pause the programme': PauseCircle,
  'Restore purchase': RotateCcw,
};

export function Settings() {
  const { world, href } = useRoute();
  const W = WORLDS[world];
  const s = W.support;
  const sub = W.subscription;

  return (
    <div className="flex flex-col gap-6">
      <Rise i={0} className="flex flex-col gap-2">
        <Kicker>{W.programme.title}</Kicker>
        <h1 className="t-title">{s.title}</h1>
        <P>{s.intro}</P>
      </Rise>

      <Rise i={1}>
        <Panel lg deep className="flex flex-col gap-4 p-6">
          <div className="flex items-center justify-between gap-4">
            <Section>Membership</Section>
            <Chip>
              <span className="text-ink">Week One free</span>
            </Chip>
          </div>
          <div className="flex items-baseline gap-3">
            <p className="t-price">{sub.price}</p>
            <p className="t-meta text-mid">{sub.per.toUpperCase()}</p>
          </div>
          <Divider />
          <P className="text-pretty">{monoNums(sub.cancelBeside)}</P>
          <NavBtn to="subscription" variant="quiet" className="self-start">
            <CreditCard size={15} aria-hidden="true" /> Manage membership
          </NavBtn>
        </Panel>
      </Rise>

      <Rise i={2}>
        <Panel as="nav" aria-label="Programme options" className="flex flex-col p-2">
          {s.rows
            .filter((r) => r.go !== 'subscription')
            .map((r, i) => {
              const Icon = ROW_ICONS[r.title] || ChevronRight;
              return (
                <a
                  key={r.title}
                  href={href(r.go)}
                  className={`flex min-h-14 items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-hover ${
                    i > 0 ? 'border-t border-white/[0.06]' : ''
                  }`}
                >
                  <span className="flex size-9 flex-none items-center justify-center rounded-xl bg-white/[0.04]" aria-hidden="true">
                    <Icon size={16} className="text-(--accent-text)" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="t-strong">{r.title}</span>
                    <span className="t-meta text-mid">{monoNums(r.note)}</span>
                  </span>
                  <ChevronRight size={16} className="flex-none text-mid" aria-hidden="true" />
                </a>
              );
            })}
        </Panel>
      </Rise>

      <Rise i={3}>
        <Panel className="flex items-start gap-4 p-5">
          <Mail size={17} className="mt-0.5 flex-none text-(--accent-text)" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <h2 className="t-strong">{s.help.title}</h2>
            <P className="text-pretty">{s.help.line}</P>
          </div>
        </Panel>
      </Rise>

      <Rise i={4} className="flex flex-col gap-3 px-1">
        <P className="text-pretty">{s.termsLine}</P>
        <div className="flex flex-wrap gap-x-2">
          {['Terms', 'Privacy policy', 'Refund policy'].map((t) => (
            <button key={t} type="button" className="btn btn-ghost !min-h-[44px] !px-3 t-body">
              {t}
            </button>
          ))}
        </div>
      </Rise>
    </div>
  );
}

export function Subscription() {
  const { world } = useRoute();
  const W = WORLDS[world];
  const sub = W.subscription;

  return (
    <div className="flex flex-col gap-6">
      <Rise i={0} className="flex flex-col gap-2">
        <Kicker>Membership</Kicker>
        <h1 className="t-title text-balance">{sub.headline}</h1>
      </Rise>

      <Rise i={1}>
        <Panel lg deep className="flex flex-col gap-5 p-6">
          <div className="flex items-baseline gap-3">
            <p className="t-price">{sub.price}</p>
            <p className="t-meta text-mid">{sub.per.toUpperCase()}</p>
          </div>

          <div className="flex flex-col gap-2 rounded-2xl bg-(--accent-faint) p-4">
            <p className="t-kicker">Week One free</p>
            <P className="text-pretty">{sub.trial}</P>
          </div>

          <div className="flex flex-col gap-3">
            <Btn variant="primary" className="w-full">Start Week One — free</Btn>
            <Btn variant="quiet" className="btn-between w-full !px-5">
              <span>Buy the programme</span>
              <span className="t-meta opacity-90">{sub.price} once</span>
            </Btn>
          </div>

          <P className="text-pretty">{monoNums(sub.monthlyAlt)}</P>
        </Panel>
      </Rise>

      <Rise i={2}>
        <Panel className="flex flex-col gap-4 p-5">
          <Section>What’s included</Section>
          <ul className="flex flex-col gap-3">
            {sub.includes.map((line) => (
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
          <Section>The deal, plainly</Section>
          <ul className="flex flex-col gap-3">
            {sub.terms.map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span className="mt-[7px] size-1.5 flex-none rounded-full bg-(--accent)" aria-hidden="true" />
                <P as="span" className="text-pretty">{line}</P>
              </li>
            ))}
          </ul>
          <Divider />
          <P className="text-pretty">{sub.renewal}</P>
        </Panel>
      </Rise>
    </div>
  );
}

export function Expired() {
  const { world } = useRoute();
  const W = WORLDS[world];
  const e = W.expired;

  return (
    <div className="flex flex-col gap-6 pt-2">
      <Rise i={0} className="flex flex-col gap-2">
        <Kicker>Membership</Kicker>
        <h1 className="t-title text-balance">{e.headline}</h1>
        <P className="text-pretty">{monoNums(e.line)}</P>
      </Rise>

      {/* Equal weight, deliberately: leaving with your record is as easy as staying. */}
      <Rise i={1} className="flex flex-col gap-3">
        <NavBtn to="subscription" variant="quiet" className="btn-between w-full !px-5">
          <span>Renew</span>
          <span className="t-meta opacity-90">{monoNums('£44.99 per programme')}</span>
        </NavBtn>
        <Btn variant="quiet" className="btn-between w-full !px-5">
          <span className="inline-flex items-center gap-2">
            <Download size={15} aria-hidden="true" /> {e.secondary}
          </span>
          <span className="t-meta opacity-90">FREE, ALWAYS</span>
        </Btn>
      </Rise>

      <Rise i={2}>
        <P className="px-1 text-pretty">
          Everything you made stays yours to keep, read and export — no membership required to open it, ever.
        </P>
      </Rise>
    </div>
  );
}

export function Restore() {
  const { world } = useRoute();
  const W = WORLDS[world];
  const r = W.restore;
  const [done, setDone] = useState(false);

  return (
    <div className="flex flex-col gap-6 pt-2">
      <Rise i={0} className="flex flex-col gap-2">
        <Kicker>Restore</Kicker>
        <h1 className="t-title">{r.headline}</h1>
        <P className="text-pretty">{monoNums(r.line)}</P>
      </Rise>

      <Rise i={1} className="flex flex-col gap-3">
        {done ? (
          <Panel className="p-5">
            <p role="status" className="t-body text-ink">{monoNums(r.done)}</p>
          </Panel>
        ) : (
          <Btn variant="primary" className="w-full" onClick={() => setDone(true)}>
            <RotateCcw size={15} aria-hidden="true" /> {r.action}
          </Btn>
        )}
        <NavBtn to="settings" variant="ghost">Back to Programme &amp; Support</NavBtn>
      </Rise>
    </div>
  );
}
