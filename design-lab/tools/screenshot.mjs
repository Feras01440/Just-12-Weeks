// Automated screenshot capture for the design lab.
// Boots the static server, drives Chromium via Playwright, captures every
// direction × state × variant in the evidence matrix, writes
// screenshots/<dir>/<state>--<variant>.png and screenshots/manifest.json,
// then rebuilds reports/comparison-index.html.
//
// Usage (from design-lab/):
//   npm run shots            — full evidence matrix
//   npm run shots -- --dir a — one direction only
//   npm run shots -- --grep today — filter by state name

import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const PORT = 4310;
const BASE = `http://localhost:${PORT}/app/index.html`;

const args = process.argv.slice(2);
const onlyDir = args.includes('--dir') ? args[args.indexOf('--dir') + 1] : null;
const grep = args.includes('--grep') ? args[args.indexOf('--grep') + 1] : null;

// The evidence matrix. `full: true` captures the whole scrolled page,
// not just the first viewport-height.
const CORE = [
  { state: 'today', variants: ['light', 'dark', 'scale200', 'tablet', 'small'] },
  { state: 'how', variants: ['light'], full: true },
  { state: 'easier', variants: ['light'] },
  { state: 'active', variants: ['light', 'dark'] },
  { state: 'journey', variants: ['light', 'dark'], full: true },
  { state: 'missed-one', variants: ['light'] },
  { state: 'missed-several', variants: ['light'] },
  { state: 'long-absence', variants: ['light', 'scale200'], full: true },
  { state: 'week-transition', variants: ['light', 'dark'] },
  { state: 'question', variants: ['light'] },
  { state: 'week-12', variants: ['light', 'dark'] },
  { state: 'artefact', variants: ['light'], full: true },
  { state: 'subscription', variants: ['light'], full: true },
  { state: 'offline', variants: ['light'] },
  { state: 'error', variants: ['light'] },
  { state: 'loading', variants: ['light'] },
  { state: 'empty', variants: ['light'] },
  { state: 'expired', variants: ['light'] },
  { state: 'restore', variants: ['light'] },
  { state: 'first-launch', variants: ['light', 'dark'] },
  { state: 'explanation', variants: ['light'] },
  { state: 'explore', variants: ['light'], full: true },
  { state: 'suitability', variants: ['light'], full: true },
  { state: 'start-journey', variants: ['light'], full: true },
  { state: 'begin', variants: ['light'] },
  { state: 'paused', variants: ['light'] },
  { state: 'complete', variants: ['light'] },
  { state: 'acknowledge', variants: ['light'] },
  { state: 'programme-pause', variants: ['light'] },
  { state: 'handover', variants: ['light'], full: true },
  { state: 'specimen', variants: ['light', 'scale200'], full: true },
  // reduced motion is visually identical for stills; captured once as proof the mode renders
  { state: 'journey', variants: ['reduced'], suffix: 'reduced', full: true },
];

// The writing world gets a focused subset (the full matrix is strength).
const WRITING_SUBSET = ['today', 'how', 'journey', 'long-absence', 'active', 'week-12', 'artefact', 'specimen'];

const VARIANT = {
  light: { theme: 'light', scale: '100', motion: 'full', vp: 'standard' },
  dark: { theme: 'dark', scale: '100', motion: 'full', vp: 'standard' },
  scale200: { theme: 'light', scale: '200', motion: 'full', vp: 'standard' },
  tablet: { theme: 'light', scale: '100', motion: 'full', vp: 'tablet' },
  small: { theme: 'light', scale: '100', motion: 'full', vp: 'small' },
  reduced: { theme: 'light', scale: '100', motion: 'reduced', vp: 'standard' },
};

const VP_SIZE = { small: [320, 640], standard: [390, 780], large: [430, 860], tablet: [834, 900] };

function url(dir, world, state, v) {
  const q = new URLSearchParams({ chrome: 'off', theme: v.theme, scale: v.scale, motion: v.motion, vp: v.vp });
  return `${BASE}#/${dir}/${world}/${state}?${q}`;
}

async function main() {
  const server = spawn('node', [join(ROOT, 'tools/serve.mjs'), String(PORT)], { stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 700));

  // Use the environment's pre-installed Chromium when the packaged browser
  // revision is absent (e.g. CI images with PLAYWRIGHT_BROWSERS_PATH pinned).
  const exe = process.env.LAB_CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
  const browser = await chromium.launch(
    (await import('node:fs')).existsSync(exe) ? { executablePath: exe } : {}
  );
  const manifest = [];
  const dirs = onlyDir ? [onlyDir] : ['a', 'b', 'c'];

  try {
    for (const dir of dirs) {
      for (const world of ['strength', 'writing']) {
        for (const item of CORE) {
          if (world === 'writing' && !WRITING_SUBSET.includes(item.state)) continue;
          if (grep && !item.state.includes(grep)) continue;
          for (const vName of item.variants) {
            const v = VARIANT[vName];
            const [w, h] = VP_SIZE[v.vp];
            const page = await browser.newPage({
              viewport: { width: w + 40, height: h + 40 },
              reducedMotion: v.motion === 'reduced' ? 'reduce' : 'no-preference',
            });
            await page.goto(url(dir, world, item.state, v));
            await page.evaluate(() => document.fonts.ready);
            await page.waitForTimeout(450);
            const stage = page.locator('.stage');
            if (item.full) {
              // grow the stage to the full scrolled height of its screen;
              // run twice so post-growth reflow (min-height chains) settles
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
              // the stage sits in an inner scroll pane, so stitched element
              // capture blacks out below the viewport — size the viewport to
              // the whole stage instead and capture in one shot
              await page.setViewportSize({ width: w + 40, height: Math.min(grown + 60, 4300) });
              await page.waitForTimeout(120);
            }
            const name = `${item.state}${item.suffix ? '' : ''}--${vName}${world === 'writing' ? '--writing' : ''}.png`;
            const outDir = join(ROOT, 'screenshots', dir);
            await mkdir(outDir, { recursive: true });
            await stage.screenshot({ path: join(outDir, name), animations: 'disabled' });
            manifest.push({ dir, world, state: item.state, variant: vName, file: `${dir}/${name}` });
            await page.close();
            process.stdout.write(`✓ ${dir}/${name}\n`);
          }
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
  const key = (m) => `${m.state}--${m.variant}--${m.world}`;
  const states = [...new Set(manifest.map(key))];
  const byDir = (k, d) => manifest.find((m) => key(m) === k && m.dir === d);
  const dirNames = { a: 'A · Quarto', b: 'B · Meridian', c: 'C · Atelier' };

  let rows = '';
  for (const k of states) {
    const [state, variant, world] = k.split('--');
    const cells = ['a', 'b', 'c']
      .map((d) => {
        const m = byDir(k, d);
        return m
          ? `<td><a href="../screenshots/${m.file}"><img loading="lazy" src="../screenshots/${m.file}" alt="${dirNames[d]} — ${state} (${variant}, ${world})" /></a></td>`
          : '<td class="none">—</td>';
      })
      .join('');
    rows += `<tr><th scope="row">${state}<span>${variant} · ${world}</span></th>${cells}</tr>\n`;
  }

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>12 Weeks — direction comparison index</title>
<style>
  body{font:14px/1.5 system-ui;background:#17181b;color:#d6d8dd;margin:0;padding:24px}
  h1{font-size:18px} p{color:#8b8f98;max-width:70ch}
  table{border-collapse:collapse;width:100%}
  th,td{border:1px solid #33363d;padding:8px;vertical-align:top;text-align:left}
  th[scope=row]{width:130px;font-weight:600} th span{display:block;color:#8b8f98;font-weight:400;font-size:12px}
  img{width:100%;max-width:390px;height:auto;display:block;background:#fff}
  thead th{position:sticky;top:0;background:#1f2126}
  .none{color:#555;text-align:center}
</style></head><body>
<h1>12 Weeks experience lab — same state, three directions</h1>
<p>Generated from the executable prototypes by tools/screenshot.mjs. Each row is one experience state and variant; columns are the three design directions. Open any image for full size.</p>
<table><thead><tr><th>State</th><th>A · Quarto</th><th>B · Meridian</th><th>C · Atelier</th></tr></thead>
<tbody>${rows}</tbody></table></body></html>`;
  await mkdir(join(ROOT, 'reports'), { recursive: true });
  await writeFile(join(ROOT, 'reports', 'comparison-index.html'), html);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
