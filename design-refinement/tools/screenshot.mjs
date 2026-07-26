// Automated screenshot capture for the refined Atelier prototype.
// Boots the static server on 4174, drives Chromium via Playwright, captures
// the evidence matrix (both worlds), writes screenshots/<state>--<variant>
// [--writing].png and screenshots/manifest.json, then rebuilds
// reports/refined-index.html.
//
// Usage (from design-refinement/):
//   npm run shots                 — full evidence matrix
//   npm run shots -- --grep today — filter by state name

import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const PORT = 4174;
const BASE = `http://localhost:${PORT}/app/index.html`;

const args = process.argv.slice(2);
const grep = args.includes('--grep') ? args[args.indexOf('--grep') + 1] : null;

// The evidence matrix. Both worlds unless `worlds` narrows it;
// `full: true` captures the whole scrolled page.
const MATRIX = [
  { state: 'first-launch', variants: ['light', 'dark'] },                              // chosen motif (default m2)
  { state: 'today', variants: ['light', 'dark', 'scale200', 'small', 'tablet'] },
  { state: 'how', variants: ['light', 'tablet', 'scale200'], full: true },
  { state: 'easier', variants: ['light'] },
  { state: 'journey', variants: ['light', 'dark', 'scale200', 'small', 'reduced', 'tablet'], full: true },
  { state: 'long-absence', variants: ['light', 'tablet', 'scale200', 'dark'], full: true },
  { state: 'missed-one', variants: ['light'] },
  { state: 'missed-several', variants: ['light'] },
  { state: 'week-transition', variants: ['light', 'dark'] },
  { state: 'week-12', variants: ['light', 'dark', 'reduced', 'tablet'] },
  { state: 'subscription', variants: ['light', 'dark', 'scale200'], full: true },
  { state: 'expired', variants: ['light'] },
  { state: 'restore', variants: ['light'] },
  { state: 'settings', variants: ['light', 'dark', 'scale200'], full: true },
  { state: 'active', variants: ['light'] },
  { state: 'paused', variants: ['light'] },
  { state: 'acknowledge', variants: ['light'] },
  { state: 'question', variants: ['light'] },
  { state: 'complete', variants: ['light'] },
  { state: 'artefact', variants: ['light'], full: true },
  { state: 'handover', variants: ['light'], full: true },
  { state: 'programme-pause', variants: ['light'] },
  { state: 'specimen', variants: ['light'], full: true },
  // motif study — strength only, so the three candidates are compared once
  { state: 'motif-study', variants: ['light', 'dark'], full: true, worlds: ['strength'] },
  // entry sequence and remaining system states — strength representative
  { state: 'explanation', variants: ['light'], worlds: ['strength'], full: true },
  { state: 'explore', variants: ['light'], worlds: ['strength'], full: true },
  { state: 'suitability', variants: ['light'], worlds: ['strength'], full: true },
  { state: 'start-journey', variants: ['light'], worlds: ['strength'], full: true },
  { state: 'why', variants: ['light'], worlds: ['strength'] },
  { state: 'prep', variants: ['light'], worlds: ['strength'] },
  { state: 'advanced', variants: ['light'], worlds: ['strength'] },
  { state: 'begin', variants: ['light'], worlds: ['strength'] },
  { state: 'offline', variants: ['light'], worlds: ['strength'] },
  { state: 'error', variants: ['light'], worlds: ['strength'] },
  { state: 'loading', variants: ['light'], worlds: ['strength'] },
  { state: 'empty', variants: ['light'], worlds: ['strength'] },
];

const VARIANT = {
  light: { theme: 'light', scale: '100', motion: 'full', vp: 'standard' },
  dark: { theme: 'dark', scale: '100', motion: 'full', vp: 'standard' },
  scale200: { theme: 'light', scale: '200', motion: 'full', vp: 'standard' },
  tablet: { theme: 'light', scale: '100', motion: 'full', vp: 'tablet' },
  small: { theme: 'light', scale: '100', motion: 'full', vp: 'small' },
  reduced: { theme: 'light', scale: '100', motion: 'reduced', vp: 'standard' },
};

const VP_SIZE = { small: [320, 640], standard: [390, 780], large: [430, 860], tablet: [834, 900] };

function url(world, state, v) {
  const q = new URLSearchParams({ theme: v.theme, scale: v.scale, motion: v.motion, vp: v.vp });
  return `${BASE}#/${world}/${state}?${q}`;
}

async function main() {
  const server = spawn('node', [join(ROOT, 'tools/serve.mjs'), String(PORT)], { stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 700));

  const exe = process.env.LAB_CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
  const browser = await chromium.launch(
    (await import('node:fs')).existsSync(exe) ? { executablePath: exe } : {}
  );
  const manifest = [];

  try {
    for (const world of ['strength', 'writing']) {
      for (const item of MATRIX) {
        if (item.worlds && !item.worlds.includes(world)) continue;
        if (grep && !item.state.includes(grep)) continue;
        for (const vName of item.variants) {
          const v = VARIANT[vName];
          const [w, h] = VP_SIZE[v.vp];
          const page = await browser.newPage({
            viewport: { width: w + 40, height: h + 40 },
            reducedMotion: v.motion === 'reduced' ? 'reduce' : 'no-preference',
          });
          await page.goto(url(world, item.state, v));
          await page.evaluate(() => document.fonts.ready);
          await page.waitForTimeout(450);
          const stage = page.locator('.stage');
          if (item.full) {
            let grown = h;
            for (let i = 0; i < 2; i++) {
              grown = await page.evaluate(() => {
                const s = document.querySelector('.stage');
                const scr = document.querySelector('.stage .screen');
                if (s && scr) {
                  s.style.height = 'auto';
                  const target = Math.min(scr.scrollHeight, 4200);
                  s.style.height = target + 'px';
                  return target;
                }
                return 0;
              });
              await page.waitForTimeout(90);
            }
            await page.setViewportSize({ width: w + 40, height: Math.min(grown + 60, 4300) });
            await page.waitForTimeout(120);
          }
          const name = `${item.state}--${vName}${world === 'writing' ? '--writing' : ''}.png`;
          const outDir = join(ROOT, 'screenshots');
          await mkdir(outDir, { recursive: true });
          await stage.screenshot({ path: join(outDir, name), animations: 'disabled' });
          manifest.push({ world, state: item.state, variant: vName, file: name });
          await page.close();
          process.stdout.write(`✓ ${name}\n`);
        }
      }
    }
  } finally {
    await browser.close();
    server.kill();
  }

  await writeFile(join(ROOT, 'screenshots', 'manifest.json'), JSON.stringify(manifest, null, 2));
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
<title>12 Weeks — refined Atelier evidence index</title>
<style>
  body{font:14px/1.5 system-ui;background:#17181b;color:#d6d8dd;margin:0;padding:24px}
  h1{font-size:18px} p{color:#8b8f98;max-width:70ch}
  table{border-collapse:collapse;width:100%;max-width:1100px}
  th,td{border:1px solid #33363d;padding:8px;vertical-align:top;text-align:left}
  th[scope=row]{width:150px;font-weight:600} th span{display:block;color:#8b8f98;font-weight:400;font-size:12px}
  img{width:100%;max-width:420px;height:auto;display:block;background:#fff}
  thead th{position:sticky;top:0;background:#1f2126}
  .none{color:#555;text-align:center}
</style></head><body>
<h1>12 Weeks — refined Atelier prototype, evidence matrix</h1>
<p>Generated from the executable prototype by tools/screenshot.mjs. Each row is one experience state and variant; columns are the two programme worlds.</p>
<table><thead><tr><th>State · variant</th><th>Strength</th><th>Writing</th></tr></thead>
<tbody>${rows}</tbody></table></body></html>`;
  await mkdir(join(ROOT, 'reports'), { recursive: true });
  await writeFile(join(ROOT, 'reports', 'refined-index.html'), html);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
