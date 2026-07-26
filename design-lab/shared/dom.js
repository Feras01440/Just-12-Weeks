// Tiny templating + utility helpers shared by all directions.

export function esc(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

// Tagged template: html`<b>${value}</b>` escapes interpolations unless
// wrapped with raw(). Arrays are joined.
const RAW = Symbol('raw');
export function raw(s) {
  return { [RAW]: true, s: String(s) };
}
export function html(strings, ...values) {
  let out = '';
  strings.forEach((str, i) => {
    out += str;
    if (i < values.length) {
      const v = values[i];
      if (v == null || v === false) return;
      if (Array.isArray(v)) out += v.map((x) => (x && x[RAW] ? x.s : esc(x))).join('');
      else if (v[RAW]) out += v.s;
      else out += esc(v);
    }
  });
  return raw(out);
}
export function render(tpl) {
  return tpl && tpl[RAW] ? tpl.s : String(tpl);
}

export function pad2(n) {
  return String(n).padStart(2, '0');
}

export function mmss(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${pad2(m)}:${pad2(s)}`;
}

export const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

// Simple interval timer that respects the lab's lifecycle: directions
// register cleanups so navigating away never leaks intervals.
export function makeTicker(root, fn, ms = 1000) {
  const id = setInterval(fn, ms);
  (root.__cleanups ||= []).push(() => clearInterval(id));
  return id;
}

// Registered timeout: cancelled automatically when the screen unmounts,
// so a pending navigation can never fire after the user has moved on.
export function makeTimeout(root, fn, ms) {
  const id = setTimeout(fn, ms);
  (root.__cleanups ||= []).push(() => clearTimeout(id));
  return id;
}

export function cleanup(root) {
  (root.__cleanups || []).forEach((f) => f());
  root.__cleanups = [];
}

// Motion helper: returns true when the lab (or the OS) asks for reduced motion.
export function reducedMotion(ctx) {
  return ctx.motion === 'reduced' || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
