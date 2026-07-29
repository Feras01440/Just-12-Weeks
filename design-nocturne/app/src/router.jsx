// Static hash routing, identical shape to earlier phases:
//   #/<world>/<state>?vp=&motion=&scale=
// Dark OLED is the only theme (the designed default).

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { WORLD_IDS } from './fixtures.js';

export const STATES = [
  'first-launch', 'today', 'how', 'easier',
  'active', 'paused', 'complete', 'question', 'acknowledge',
  'journey', 'week-transition', 'week-12',
  'missed-one', 'missed-several', 'long-absence', 'programme-pause',
  'settings', 'subscription', 'expired', 'restore',
];

const JOURNEY_STATES = new Set(['journey', 'week-transition', 'week-12']);
const SUPPORT_STATES = new Set(['settings', 'subscription', 'expired', 'restore', 'programme-pause']);

export function destFor(state) {
  if (JOURNEY_STATES.has(state)) return 'journey';
  if (SUPPORT_STATES.has(state)) return 'settings';
  return 'today';
}

// The running session owns the screen; the app does not yet exist at first launch.
const NAV_HIDDEN = new Set(['active', 'paused', 'first-launch']);
export function showsNav(state) {
  return !NAV_HIDDEN.has(state);
}

export function parseHash() {
  const h = (window.location.hash || '').replace(/^#/, '');
  const [path, query] = h.split('?');
  const seg = (path || '').split('/').filter(Boolean);
  const world = WORLD_IDS.includes(seg[0]) ? seg[0] : 'strength';
  const state = STATES.includes(seg[1]) ? seg[1] : 'today';
  const params = new URLSearchParams(query || '');
  return {
    world,
    state,
    vp: params.get('vp') ? parseInt(params.get('vp'), 10) || null : null,
    motion: params.get('motion') === 'reduced' ? 'reduced' : 'full',
    scale: params.get('scale') === '200' ? 200 : 100,
    query: query || '',
  };
}

export function hrefFor(state, world, query) {
  const q = query ? `?${query}` : '';
  return `#/${world}/${state}${q}`;
}

const RouteCtx = createContext(null);

export function RouteProvider({ children }) {
  const [route, setRoute] = useState(parseHash);
  const [winW, setWinW] = useState(window.innerWidth);

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener('hashchange', onHash);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // reduced-motion: OS preference OR ?motion=reduced
  const [osReduced, setOsReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = (e) => setOsReduced(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const reduced = osReduced || route.motion === 'reduced';

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? 'reduced' : 'full';
    document.documentElement.style.setProperty('--app-scale', route.scale === 200 ? '2' : '1');
  }, [reduced, route.scale]);

  const effWidth = route.vp ? Math.min(route.vp, winW) : winW;
  const desktop = effWidth >= 1024;
  const wide = effWidth >= 700;

  const value = useMemo(() => {
    const navigate = (state, world) =>
      (window.location.hash = hrefFor(state, world || route.world, route.query));
    const href = (state, world) => hrefFor(state, world || route.world, route.query);
    return { ...route, reduced, desktop, wide, effWidth, navigate, href };
  }, [route, reduced, desktop, wide, effWidth]);

  return <RouteCtx.Provider value={value}>{children}</RouteCtx.Provider>;
}

export function useRoute() {
  return useContext(RouteCtx);
}
