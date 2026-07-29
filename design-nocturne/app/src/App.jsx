// Nocturne shell — frame, navigation (tab bar / collapsible sidebar), ⌘K palette.

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Sun, Waypoints, Settings as SettingsIcon, Play, Search,
  PanelLeftClose, PanelLeftOpen, Command,
} from 'lucide-react';
import { useRoute, destFor, showsNav } from './router.jsx';
import { WORLDS } from './fixtures.js';

import { FirstLaunch } from './screens/firstlaunch.jsx';
import { Today, How, Easier } from './screens/today.jsx';
import { Active, Paused, Complete, Question, Acknowledge } from './screens/session.jsx';
import { Journey, WeekTransition, Week12 } from './screens/journey.jsx';
import { MissedOne, MissedSeveral, LongAbsence, ProgrammePause } from './screens/recovery.jsx';
import { Settings, Subscription, Expired, Restore } from './screens/commerce.jsx';

const SCREENS = {
  'first-launch': FirstLaunch,
  today: Today,
  how: How,
  easier: Easier,
  active: Active,
  paused: Paused,
  complete: Complete,
  question: Question,
  acknowledge: Acknowledge,
  journey: Journey,
  'week-transition': WeekTransition,
  'week-12': Week12,
  'missed-one': MissedOne,
  'missed-several': MissedSeveral,
  'long-absence': LongAbsence,
  'programme-pause': ProgrammePause,
  settings: Settings,
  subscription: Subscription,
  expired: Expired,
  restore: Restore,
};

const TITLES = {
  'first-launch': 'Welcome',
  today: 'Today',
  how: 'Show me how',
  easier: 'Something gentler today',
  active: 'Session running',
  paused: 'Session paused',
  complete: 'Session complete',
  question: 'Check-in',
  acknowledge: 'Day acknowledged',
  journey: 'The Twelve Weeks',
  'week-transition': 'Week transition',
  'week-12': 'Week twelve',
  'missed-one': 'Picking back up',
  'missed-several': 'Stepping back in',
  'long-absence': 'Welcome back',
  'programme-pause': 'Pause the programme',
  settings: 'Programme & Support',
  subscription: 'Membership',
  expired: 'Membership lapsed',
  restore: 'Restore purchase',
};

const NAV = [
  { state: 'today', label: 'Today', Icon: Sun },
  { state: 'journey', label: 'Journey', Icon: Waypoints },
  { state: 'settings', label: 'Settings', Icon: SettingsIcon },
];

export default function App() {
  const route = useRoute();
  const { world, state, vp, desktop, navigate, href } = route;
  const Screen = SCREENS[state] || Today;
  const nav = showsNav(state);
  const dest = destFor(state);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.title = `12 Weeks — ${TITLES[state] || state}`;
    window.scrollTo(0, 0);
  }, [state, world]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const frameStyle = vp ? { maxWidth: vp, marginInline: 'auto' } : undefined;

  return (
    <div data-world={world} className="min-h-dvh bg-bg text-ink" style={frameStyle}>
      <a className="skip-link t-body" href="#main">Skip to content</a>

      <div className={desktop && nav ? 'flex' : ''}>
        {nav && desktop && (
          <Sidebar
            collapsed={collapsed}
            onCollapse={() => setCollapsed((c) => !c)}
            dest={dest}
            world={world}
            href={href}
            onPalette={() => setPaletteOpen(true)}
          />
        )}

        <main
          id="main"
          className={`mx-auto w-full min-w-0 px-5 pt-6 ${nav && !desktop ? 'pb-24' : 'pb-12'} ${
            desktop ? 'max-w-[720px] px-10 pt-12' : 'max-w-[600px]'
          }`}
        >
          <Screen key={`${world}/${state}`} />
        </main>
      </div>

      {nav && !desktop && <TabBar dest={dest} href={href} />}

      {paletteOpen && (
        <CommandPalette
          onClose={() => setPaletteOpen(false)}
          onGo={(s) => {
            setPaletteOpen(false);
            navigate(s);
          }}
        />
      )}

      <div aria-live="polite" className="sr-only">{`${TITLES[state]} — ${WORLDS[world].name}`}</div>
    </div>
  );
}

function TabBar({ dest, href }) {
  return (
    <nav className="tabbar" aria-label="Primary">
      <div className="mx-auto flex max-w-[600px] items-stretch gap-2 px-4 pb-[max(env(safe-area-inset-bottom),8px)] pt-2">
        {NAV.map(({ state, label, Icon }) => {
          const active = dest === state;
          return (
            <a
              key={state}
              href={href(state)}
              className="tab-item"
              aria-current={active ? 'page' : undefined}
            >
              {active && <span className="tab-glow" aria-hidden="true" />}
              <Icon size={20} strokeWidth={active ? 2.2 : 1.8} aria-hidden="true" />
              <span className="t-meta">{label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

function Sidebar({ collapsed, onCollapse, dest, world, href, onPalette }) {
  const w = WORLDS[world];
  return (
    <div className={`sticky top-0 h-dvh flex-none ${collapsed ? 'w-[76px]' : 'w-[248px]'} border-r border-white/[0.08] transition-[width] duration-200`}>
      <div className="flex h-full flex-col p-4">
        <div className={`flex items-center gap-3 px-2 py-3 ${collapsed ? 'justify-center px-0' : ''}`}>
          <span
            className="t-meta flex size-9 flex-none items-center justify-center rounded-xl border border-white/[0.08] bg-panel font-semibold text-(--accent-text)"
            aria-hidden="true"
          >
            12
          </span>
          {!collapsed && (
            <div className="min-w-0">
              <p className="t-strong truncate">Twelve Weeks</p>
              <p className="t-meta truncate text-mid">{w.name}</p>
            </div>
          )}
        </div>

        <nav aria-label="Primary" className="mt-4 flex flex-col gap-1">
          {NAV.map(({ state, label, Icon }) => {
            const active = dest === state;
            return (
              <a
                key={state}
                href={href(state)}
                className={`side-item ${collapsed ? 'justify-center px-0' : ''}`}
                aria-current={active ? 'page' : undefined}
                title={collapsed ? label : undefined}
              >
                <span className="side-glow" aria-hidden="true" />
                <Icon size={18} strokeWidth={active ? 2.2 : 1.8} aria-hidden="true" />
                {!collapsed && <span>{label}</span>}
                {collapsed && <span className="sr-only">{label}</span>}
              </a>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-2">
          <button
            type="button"
            onClick={onPalette}
            className={`side-item w-full ${collapsed ? 'justify-center px-0' : ''}`}
          >
            <Command size={16} aria-hidden="true" />
            {!collapsed && <span className="flex-1 text-left">Quick actions</span>}
            {!collapsed && <kbd className="t-meta rounded-md border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 text-mid">⌘K</kbd>}
            {collapsed && <span className="sr-only">Quick actions (Command K)</span>}
          </button>
          <button
            type="button"
            onClick={onCollapse}
            className={`side-item w-full ${collapsed ? 'justify-center px-0' : ''}`}
            aria-expanded={!collapsed}
          >
            {collapsed ? <PanelLeftOpen size={16} aria-hidden="true" /> : <PanelLeftClose size={16} aria-hidden="true" />}
            {!collapsed && <span>Collapse</span>}
            <span className="sr-only">{collapsed ? 'Expand sidebar' : 'Collapse sidebar'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const COMMANDS = [
  { id: 'today', label: 'Go to Today', Icon: Sun, go: 'today' },
  { id: 'journey', label: 'Go to Journey', Icon: Waypoints, go: 'journey' },
  { id: 'settings', label: 'Go to Settings', Icon: SettingsIcon, go: 'settings' },
  { id: 'begin', label: 'Begin today’s session', Icon: Play, go: 'active' },
];

function CommandPalette({ onClose, onGo }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);
  const prevFocus = useRef(null);

  const matches = useMemo(
    () => COMMANDS.filter((c) => c.label.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  useEffect(() => {
    prevFocus.current = document.activeElement;
    inputRef.current?.focus();
    return () => prevFocus.current?.focus?.();
  }, []);

  useEffect(() => setSel(0), [q]);

  const onKey = (e) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, matches.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    else if (e.key === 'Enter' && matches[sel]) onGo(matches[sel].go);
  };

  return (
    <div className="palette-backdrop" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Quick actions"
        className="palette panel panel-lg panel-deep mx-auto mt-[18vh] w-[min(520px,calc(100vw-32px))] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKey}
      >
        <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3">
          <Search size={16} className="text-mid" aria-hidden="true" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a destination…"
            aria-label="Search quick actions"
            className="t-body w-full bg-transparent text-ink outline-none placeholder:text-mid"
          />
          <kbd className="t-meta flex-none rounded-md border border-white/[0.08] px-1.5 py-0.5 text-mid">esc</kbd>
        </div>
        <ul className="p-2" role="listbox" aria-label="Quick actions">
          {matches.map((c, i) => (
            <li key={c.id} role="option" aria-selected={i === sel}>
              <button
                type="button"
                onClick={() => onGo(c.go)}
                onMouseEnter={() => setSel(i)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left ${
                  i === sel ? 'bg-hover text-(--accent-text)' : 'text-mid'
                }`}
              >
                <c.Icon size={16} aria-hidden="true" />
                <span className="t-body">{c.label}</span>
              </button>
            </li>
          ))}
          {matches.length === 0 && <li className="t-body px-3 py-3 text-mid">Nothing matches.</li>}
        </ul>
      </div>
    </div>
  );
}
