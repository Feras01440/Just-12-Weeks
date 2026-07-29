// Automated screenshot capture for the Nocturne prototype (dark OLED only).
// Serves the BUILT app (app/dist) on 4180, drives Chromium via Playwright,
// captures the evidence matrix, writes screenshots/<state>--<variant>--<world>.png,
// screenshots/manifest.json, and rebuilds reports/index.html.
//
// Usage (from design-nocturne/app/):  npm run shots [-- --grep journey]

import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const PORT = 4180;
const BASE = `http://localhost:${PORT}/`;

const args = process.argv.slice(2);
const grep = args.includes('--grep') ? args[args.indexOf('--grep') + 1] : null;

const BOTH = new Set([
  'first-launch', 'today', 'how', 'journey', 'long-absence',
  'week-12', 'subscription', 'settings', 'active', 'complete',
]);
const ALL_STATES = [
  'first-launch', 'today', 'how', 'easier',
  'active', 'paused', 'complete', 'question', 'acknowledge',
  'journey', 'missed-one', 'missed-several', 'long-absence',
  'week-transition', 'week-12', 'settings', 'subscription', 'expired',
];
// States whose full scrolled height is the evidence.
const FULL = new Set([
  'first-launch', 'how', 'easier', 'journey', 'settings', 'subscription',
  'week-12', 'long-absence', 'missed-several',
]);
const RESPONSIVE = ['today', 'journey', 'week-12', 'long-absence', 'active'];

const VP = {
  vp320: [320, 640],
  vp390: [390, 844],
  vp834: [834, 900],
  vp1280: [1280, 800],
};

// The matrix (dark only — the designed default).
const MATRIX = [];
for (const state of ALL_STATES) {
  MATRIX.push({ state, variant: 'vp390', worlds: BOTH.has(state) ? ['strength', 'writing'] : ['strength'] });
}
for (const state of RESPONSIVE) {
  for (const variant of ['vp320', 'vp834', 'vp1280']) {
    MATRIX.push({ state, variant, worlds: ['strength', 'writing'] });
  }
}
for (const state of ['settings', 'how', 'subscription']) {
  MATRIX.push({ state, variant: 'vp834', worlds: state === 'settings' ? ['strength', 'writing'] : ['strength'] });
}
for (const state of ['today', 'journey']) {
  MATRIX.push({ state, variant: 'scale200', worlds: ['strength', 'writing'] });
}
for (const state of ['journey', 'week-12', 'complete']) {
  MATRIX.push({ state, variant: 'reduced', worlds: ['strength', 'writing'] });
}

function urlFor(world, state, variant) {
  const [w] = VP[variant] || VP.vp390;
  const q = new URLSearchParams({
    vp: String(w),
    motion: variant === 'reduced' ? 'reduced' : 'full',
    scale: variant === 'scale200' ? '200' : '100',
  });
  return `${BASE}#/${world}/${state}?${q}`;
}

async function main() {
  const server = spawn('node', [join(ROOT, 'tools/serve.mjs'), String(PORT)], { stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 600));

  const exe = process.env.LAB_CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
  const browser = await chromium.launch(existsSync(exe) ? { executablePath: exe } : {});
  const manifest = [];
  const outDir = join(ROOT, 'screenshots');
  await mkdir(outDir, { recursive: true });

  try {
    for (const item of MATRIX) {
      if (grep && !item.state.includes(grep)) continue;
      for (const world of item.worlds) {
        const [w, h] = VP[item.variant] || VP.vp390;
        const page = await browser.newPage({
          viewport: { width: w, height: h },
          reducedMotion: item.variant === 'reduced' ? 'reduce' : 'no-preference',
        });
        await page.goto(urlFor(world, item.state, item.variant));
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(item.state === 'week-transition' ? 1700 : 700);

        if (FULL.has(item.state)) {
          const sh = await page.evaluate(() => document.documentElement.scrollHeight);
          await page.setViewportSize({ width: w, height: Math.min(Math.max(sh, h), 4200) });
          await page.waitForTimeout(160);
        }

        const name = `${item.state}--${item.variant}--${world}.png`;
        await page.screenshot({ path: join(outDir, name), animations: 'disabled' });
        manifest.push({ world, state: item.state, variant: item.variant, file: name });
        await page.close();
        process.stdout.write(`ok ${name}\n`);
      }
    }
  } finally {
    await browser.close();
    server.kill();
  }

  await writeFile(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  await buildIndex(manifest);
  console.log(`\n${manifest.length} screenshots captured.`);
}

async function buildIndex(manifest) {
  const key = (m) => `${m.state}--${m.variant}`;
  const keys = [...new Set(manifest.map(key))];
  const find = (k, w) => manifest.find((m) => key(m) === k && m.world === w);

  let rows = '';
  for (const k of keys) {
    const [state, variant] = k.split('--');
    const cells = ['strength', 'writing']
      .map((w) => {
        const m = find(k, w);
        return m
          ? `<td><a href="../screenshots/${m.file}"><img loading="lazy" src="../screenshots/${m.file}" alt="${state} (${variant}, ${w})" /></a></td>`
          : '<td class="none">—</td>';
      })
      .join('');
    rows += `<tr><th scope="row">${state}<span>${variant}</span></th>${cells}</tr>\n`;
  }

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>12 Weeks — Nocturne evidence index</title>
<style>
  body{font:14px/1.5 ui-sans-serif,system-ui;background:#09090b;color:#a1a1aa;margin:0;padding:24px}
  h1{font-size:18px;color:#fafafa;letter-spacing:-0.02em} p{max-width:70ch}
  table{border-collapse:collapse;width:100%;max-width:1200px}
  th,td{border:1px solid rgba(255,255,255,.08);padding:8px;vertical-align:top;text-align:left}
  th[scope=row]{width:170px;font-weight:600;color:#fafafa} th span{display:block;color:#a1a1aa;font-weight:400;font-size:12px;font-family:ui-monospace,monospace}
  img{width:100%;max-width:440px;height:auto;display:block;background:#09090b;border-radius:6px}
  thead th{position:sticky;top:0;background:#121215}
  .none{color:#52525b;text-align:center}
</style></head><body>
<h1>12 Weeks — Nocturne prototype, evidence matrix (dark OLED)</h1>
<p>Generated from the built app by tools/screenshot.mjs. Each row is one experience state and variant; columns are the two programme worlds.</p>
<table><thead><tr><th>State · variant</th><th>Strength (emerald)</th><th>Writing (indigo)</th></tr></thead>
<tbody>${rows}</tbody></table></body></html>`;
  await mkdir(join(ROOT, 'reports'), { recursive: true });
  await writeFile(join(ROOT, 'reports', 'index.html'), html);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
