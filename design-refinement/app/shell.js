// Shell for the refined single-direction prototype.
// Routing: #/<world>/<state>?theme=&scale=&vp=&motion=&motif=
// The shell owns the stage, the selvedge navigation bar (R1) and the
// announcer; the Atelier module owns everything inside the screen.

import { render, cleanup } from './dom.js';
import { WORLDS, WORLD_IDS } from './fixtures.js';
import { STATES, VIEWPORTS, NAV_DESTS, destFor, showsNav } from './states.js';
import atelier from './refined.js';

const DEFAULTS = {
  world: 'strength', state: 'today',
  theme: 'light', scale: '100', motion: 'full', vp: 'standard', motif: 'm1',
};

// ————— routing —————

function parseHash() {
  const h = location.hash.replace(/^#\/?/, '');
  const [path, qs] = h.split('?');
  const parts = (path || '').split('/').filter(Boolean);
  const q = new URLSearchParams(qs || '');
  const r = { ...DEFAULTS };
  if (parts[0]) r.world = parts[0];
  if (parts[1]) r.state = parts[1];
  for (const k of ['theme', 'scale', 'motion', 'vp', 'motif']) {
    if (q.get(k)) r[k] = q.get(k);
  }
  if (!WORLD_IDS.includes(r.world)) r.world = DEFAULTS.world;
  if (!STATES.includes(r.state)) r.state = DEFAULTS.state;
  if (!/^m[123]$/.test(r.motif)) r.motif = DEFAULTS.motif;
  return r;
}

function buildHash(r) {
  const q = new URLSearchParams();
  for (const k of ['theme', 'scale', 'motion', 'vp', 'motif']) {
    if (r[k] !== DEFAULTS[k]) q.set(k, r[k]);
  }
  const qs = q.toString();
  return `#/${r.world}/${r.state}${qs ? '?' + qs : ''}`;
}

let route = parseHash();

function go(patch) {
  route = { ...route, ...patch };
  const h = buildHash(route);
  if (location.hash !== h) location.hash = h; // renders via hashchange
  else renderAll();
}

window.addEventListener('hashchange', () => {
  route = parseHash();
  renderAll();
});

// ————— announcer —————

const announcer = document.getElementById('announcer');
function announce(msg) {
  announcer.textContent = '';
  requestAnimationFrame(() => { announcer.textContent = msg; });
}

// ————— the selvedge bar (R1) —————
// Three destinations, text-first labels, a laid-thread mark on the current
// one, aria-current="page". Real links so the location stays shareable.

const NAV_GLYPHS = {
  today: `<svg viewBox="0 0 24 14" aria-hidden="true" focusable="false">
    <line x1="5" y1="1.5" x2="5" y2="12.5" stroke="currentColor" stroke-width="1" opacity="0.45"/>
    <line x1="12" y1="1.5" x2="12" y2="12.5" stroke="currentColor" stroke-width="1" opacity="0.45"/>
    <line x1="19" y1="1.5" x2="19" y2="12.5" stroke="currentColor" stroke-width="1" opacity="0.45"/>
    <line x1="2" y1="7" x2="17" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M 18.4 7 C 19.6 5.9 21.4 5.9 22.4 7 C 21.4 8.1 19.6 8.1 18.4 7 Z" fill="currentColor"/>
  </svg>`,
  journey: `<svg viewBox="0 0 24 14" aria-hidden="true" focusable="false">
    <line x1="2" y1="2.5" x2="22" y2="2.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="2" y1="7" x2="22" y2="7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="2" y1="11.5" x2="14" y2="11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="17" y1="11.5" x2="22" y2="11.5" stroke="currentColor" stroke-width="1" opacity="0.45"/>
  </svg>`,
  settings: `<svg viewBox="0 0 24 14" aria-hidden="true" focusable="false">
    <line x1="12" y1="1" x2="12" y2="13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="8.5" y1="3.5" x2="15.5" y2="3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="8.5" y1="7" x2="15.5" y2="7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="8.5" y1="10.5" x2="15.5" y2="10.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
  </svg>`,
};

function navHtml() {
  const current = destFor(route.state);
  const items = NAV_DESTS.map((d) => {
    const isCurrent = d.state === current;
    const href = buildHash({ ...route, state: d.state });
    return `<a class="at-selvnav-item" href="${href}"${isCurrent ? ' aria-current="page"' : ''}>
      <i class="at-selvnav-thread" aria-hidden="true"></i>
      <span class="at-selvnav-glyph" aria-hidden="true">${NAV_GLYPHS[d.state]}</span>
      <span class="at-selvnav-label">${d.label}</span>
    </a>`;
  }).join('');
  return `<nav class="at-selvnav" aria-label="Main">${items}</nav>`;
}

// ————— stage —————

let mountedScreen = null;

function renderAll() {
  const rootEl = document.getElementById('root');
  if (mountedScreen) { cleanup(mountedScreen); mountedScreen = null; }

  const [w, h] = VIEWPORTS[route.vp] || VIEWPORTS.standard;
  const hasNav = showsNav(route.state);

  rootEl.innerHTML = '';
  const stage = document.createElement('div');
  stage.className = `stage theme-${route.theme} scale-${route.scale} motion-${route.motion} vp-${route.vp}${hasNav ? ' has-nav' : ''}`;
  stage.dataset.world = route.world;
  stage.style.width = w + 'px';
  stage.style.height = h + 'px';
  stage.style.setProperty('--ts', route.scale === '200' ? '2' : '1');

  const screen = document.createElement('div');
  screen.className = 'screen';
  screen.setAttribute('tabindex', '0');
  screen.setAttribute('aria-label', 'App screen');
  stage.appendChild(screen);
  rootEl.appendChild(stage);

  const ctx = {
    world: route.world,
    w: WORLDS[route.world],
    theme: route.theme,
    scale: route.scale,
    motion: route.motion,
    vp: route.vp,
    state: route.state,
    motif: route.motif,
    go: (stateId) => go({ state: stateId }),
    announce,
  };

  const out = atelier.render(route.state, ctx);
  screen.innerHTML = render(out.html);
  if (hasNav) stage.insertAdjacentHTML('beforeend', navHtml());
  if (out.mount) out.mount(screen, ctx);
  mountedScreen = screen;

  document.title = `12 Weeks — ${route.state} · ${WORLDS[route.world].short}`;
}

renderAll();
