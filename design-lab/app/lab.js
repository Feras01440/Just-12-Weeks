import { STATE_GROUPS, VIEWPORTS, stateById } from '../shared/states.js';
import { WORLDS, WORLD_IDS } from '../shared/fixtures.js';
import { cleanup, render } from '../shared/dom.js';
import dirA from '../directions/a/direction-a.js';
import dirB from '../directions/b/direction-b.js';
import dirC from '../directions/c/direction-c.js';

const DIRECTIONS = { a: dirA, b: dirB, c: dirC };

const DEFAULTS = {
  dir: 'a', world: 'strength', state: 'today',
  theme: 'light', scale: '100', motion: 'full', vp: 'standard', chrome: 'on',
};

// ————— routing —————

function parseHash() {
  const h = location.hash.replace(/^#\/?/, '');
  const [path, qs] = h.split('?');
  const parts = (path || '').split('/').filter(Boolean);
  const q = new URLSearchParams(qs || '');
  const r = { ...DEFAULTS };
  if (parts[0]) r.dir = parts[0];
  if (parts[1]) r.world = parts[1];
  if (parts[2]) r.state = parts[2];
  for (const k of ['theme', 'scale', 'motion', 'vp', 'chrome']) {
    if (q.get(k)) r[k] = q.get(k);
  }
  if (!WORLD_IDS.includes(r.world)) r.world = DEFAULTS.world;
  if (r.dir !== 'compare' && !DIRECTIONS[r.dir]) r.dir = DEFAULTS.dir;
  if (r.state !== 'specimen' && !stateById(r.state)) r.state = DEFAULTS.state;
  return r;
}

function buildHash(r) {
  const q = new URLSearchParams();
  for (const k of ['theme', 'scale', 'motion', 'vp', 'chrome']) {
    if (r[k] !== DEFAULTS[k]) q.set(k, r[k]);
  }
  const qs = q.toString();
  return `#/${r.dir}/${r.world}/${r.state}${qs ? '?' + qs : ''}`;
}

let route = parseHash();

function go(patch) {
  route = { ...route, ...patch };
  const h = buildHash(route);
  if (location.hash !== h) location.hash = h; // triggers render via hashchange
  else renderAll();
}

window.addEventListener('hashchange', () => {
  route = parseHash();
  renderAll();
});

// ————— announcer —————

const announcer = document.getElementById('lab-announcer');
function announce(msg) {
  announcer.textContent = '';
  requestAnimationFrame(() => { announcer.textContent = msg; });
}

// ————— controls —————

function seg(el, options, current, onPick) {
  el.innerHTML = '';
  for (const o of options) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = o.label;
    b.setAttribute('aria-pressed', String(o.value === current));
    b.addEventListener('click', () => onPick(o.value));
    el.appendChild(b);
  }
}

function renderControls() {
  seg(document.getElementById('ctl-dir'), [
    { value: 'a', label: 'A · Quarto' },
    { value: 'b', label: 'B · Meridian' },
    { value: 'c', label: 'C · Atelier' },
    { value: 'compare', label: 'Compare' },
  ], route.dir, (v) => go({ dir: v }));

  seg(document.getElementById('ctl-world'), [
    { value: 'strength', label: 'Strength' },
    { value: 'writing', label: 'Writing' },
  ], route.world, (v) => go({ world: v }));

  seg(document.getElementById('ctl-theme'), [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ], route.theme, (v) => go({ theme: v }));

  seg(document.getElementById('ctl-scale'), [
    { value: '100', label: 'Text 100%' },
    { value: '200', label: '200%' },
  ], route.scale, (v) => go({ scale: v }));

  seg(document.getElementById('ctl-motion'), [
    { value: 'full', label: 'Motion' },
    { value: 'reduced', label: 'Reduced' },
  ], route.motion, (v) => go({ motion: v }));

  seg(document.getElementById('ctl-vp'), VIEWPORTS.map((v) => ({ value: v.id, label: v.label.replace(' phone', '') })),
    route.vp, (v) => go({ vp: v }));
}

function renderNav() {
  const nav = document.getElementById('lab-nav');
  nav.innerHTML = '';
  for (const g of STATE_GROUPS) {
    const h = document.createElement('h2');
    h.textContent = g.label;
    nav.appendChild(h);
    for (const s of g.states) {
      const a = document.createElement('a');
      a.href = buildHash({ ...route, state: s.id });
      a.innerHTML = `<span class="n">${String(s.n).padStart(2, '0')}</span><span>${s.label}</span>`;
      if (route.state === s.id) a.setAttribute('aria-current', 'true');
      nav.appendChild(a);
    }
  }
  const h = document.createElement('h2');
  h.textContent = 'Lab extras';
  nav.appendChild(h);
  const a = document.createElement('a');
  a.href = buildHash({ ...route, state: 'specimen' });
  a.innerHTML = `<span class="n">TS</span><span>Type specimen</span>`;
  if (route.state === 'specimen') a.setAttribute('aria-current', 'true');
  nav.appendChild(a);
}

// ————— stage —————

function viewport() {
  return VIEWPORTS.find((v) => v.id === route.vp) || VIEWPORTS[1];
}

function stageSlot(dirId, caption) {
  const vp = viewport();
  const slot = document.createElement('div');
  slot.className = 'stage-slot';
  const cap = document.createElement('div');
  cap.className = 'stage-caption';
  cap.textContent = caption;
  const frame = document.createElement('div');
  frame.className = 'stage-frame';
  const stage = document.createElement('div');
  stage.className = `stage theme-${route.theme} scale-${route.scale} motion-${route.motion} vp-${route.vp}`;
  stage.dataset.dir = dirId;
  stage.dataset.world = route.world;
  stage.style.width = vp.w + 'px';
  stage.style.height = vp.h + 'px';
  stage.style.setProperty('--ts', route.scale === '200' ? '2' : '1');
  const screen = document.createElement('div');
  screen.className = 'screen';
  // the screen is a scroll container — it must be keyboard-reachable
  screen.setAttribute('tabindex', '0');
  screen.setAttribute('aria-label', 'Prototype screen');
  stage.appendChild(screen);
  frame.appendChild(stage);
  slot.appendChild(cap);
  slot.appendChild(frame);
  return { slot, screen, stage };
}

let mountedScreens = [];

function renderStage() {
  const area = document.getElementById('lab-stagearea');
  mountedScreens.forEach((s) => cleanup(s));
  mountedScreens = [];
  area.innerHTML = '';

  if (route.dir === 'compare') {
    // Same state across all three directions, side by side, via chromeless iframes.
    const vp = viewport();
    for (const id of ['a', 'b', 'c']) {
      const slot = document.createElement('div');
      slot.className = 'stage-slot';
      const cap = document.createElement('div');
      cap.className = 'stage-caption';
      cap.textContent = `${id.toUpperCase()} · ${DIRECTIONS[id].name}`;
      const f = document.createElement('iframe');
      f.className = 'compare-frame';
      f.width = vp.w;
      f.height = vp.h;
      f.title = `Direction ${id.toUpperCase()} — ${DIRECTIONS[id].name}`;
      const q = new URLSearchParams({ chrome: 'off' });
      for (const k of ['theme', 'scale', 'motion', 'vp']) q.set(k, route[k]);
      f.src = `index.html#/${id}/${route.world}/${route.state}?${q}`;
      slot.appendChild(cap);
      slot.appendChild(f);
      area.appendChild(slot);
    }
    return;
  }

  const dir = DIRECTIONS[route.dir];
  const { slot, screen, stage } = stageSlot(route.dir, `${route.dir.toUpperCase()} · ${dir.name} — ${captionFor(route.state)}`);
  area.appendChild(slot);

  const ctx = {
    world: route.world,
    w: WORLDS[route.world],
    theme: route.theme,
    scale: route.scale,
    motion: route.motion,
    vp: route.vp,
    state: route.state,
    go: (stateId) => go({ state: stateId }),
    announce,
  };

  const out = dir.render(route.state, ctx);
  screen.innerHTML = render(out.html);
  if (out.mount) out.mount(screen, ctx);
  mountedScreens.push(screen);

  renderStage._navigated = true;
}

function captionFor(stateId) {
  if (stateId === 'specimen') return 'Type specimen';
  const s = stateById(stateId);
  return s ? s.label : stateId;
}

// ————— top-level render —————

function renderAll() {
  document.getElementById('lab').classList.toggle('chromeless', route.chrome === 'off');
  renderControls();
  renderNav();
  renderStage();
  document.title = `12W Lab — ${route.dir.toUpperCase()}/${route.world}/${route.state}`;
}

// Keyboard shortcuts for reviewers: 1/2/3/0 direction, w world, t theme,
// s scale, m motion, [ ] previous/next state.
window.addEventListener('keydown', (e) => {
  if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const flat = STATE_GROUPS.flatMap((g) => g.states.map((s) => s.id));
  const i = flat.indexOf(route.state);
  switch (e.key) {
    case '1': go({ dir: 'a' }); break;
    case '2': go({ dir: 'b' }); break;
    case '3': go({ dir: 'c' }); break;
    case '0': go({ dir: 'compare' }); break;
    case 'w': go({ world: route.world === 'strength' ? 'writing' : 'strength' }); break;
    case 't': go({ theme: route.theme === 'light' ? 'dark' : 'light' }); break;
    case 's': go({ scale: route.scale === '100' ? '200' : '100' }); break;
    case 'm': go({ motion: route.motion === 'full' ? 'reduced' : 'full' }); break;
    case '[': if (i > 0) go({ state: flat[i - 1] }); break;
    case ']': if (i >= 0 && i < flat.length - 1) go({ state: flat[i + 1] }); break;
  }
});

renderAll();
