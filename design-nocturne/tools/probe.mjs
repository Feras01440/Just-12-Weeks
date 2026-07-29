// Live behavioural probes for the Nocturne prototype — the claims the static
// screenshots cannot prove. Runs against the BUILT app.
//
// Usage (from design-nocturne/app/): npm run probe

import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const PORT = 4184;
const BASE = `http://localhost:${PORT}/`;

const results = [];
function record(name, pass, detail = '') {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
}

async function main() {
  const server = spawn('node', [join(ROOT, 'tools/serve.mjs'), String(PORT)], { stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 600));
  const exe = process.env.LAB_CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
  const browser = await chromium.launch(existsSync(exe) ? { executablePath: exe } : {});

  try {
    // 1 — tab bar shows aria-current and moves with navigation
    let page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(`${BASE}#/strength/today?vp=390`);
    await page.waitForTimeout(400);
    let current = await page.locator('nav [aria-current="page"]').innerText().catch(() => '');
    record('tab bar aria-current on Today', /today/i.test(current), `found “${current.trim()}”`);
    await page.locator('nav a', { hasText: 'Journey' }).click();
    await page.waitForTimeout(400);
    current = await page.locator('nav [aria-current="page"]').innerText().catch(() => '');
    record('aria-current follows navigation to Journey', /journey/i.test(current), `found “${current.trim()}”`);

    // 2 — the running session hides the tab bar
    await page.goto(`${BASE}#/strength/active?vp=390`);
    await page.waitForTimeout(400);
    const tabbarCount = await page.locator('nav.tabbar').count();
    record('running session hides the tab bar', tabbarCount === 0);
    await page.goto(`${BASE}#/strength/today?vp=390`);
    await page.waitForTimeout(400);
    record('tab bar returns after the session', (await page.locator('nav.tabbar').count()) === 1);

    // 3 — wall-clock anchored timer: advances with real time
    await page.goto(`${BASE}#/strength/active?vp=390`);
    await page.waitForTimeout(600);
    const t0 = await page.locator('[role="timer"]').innerText();
    await page.waitForTimeout(3000);
    const t1 = await page.locator('[role="timer"]').innerText();
    const toS = (t) => { const [m, s] = t.split(':').map(Number); return m * 60 + s; };
    const drop = toS(t0) - toS(t1);
    record('timer is wall-clock anchored (≈3s in 3s)', drop >= 2 && drop <= 4, `${t0} → ${t1}`);
    const live = await page.locator('[role="timer"]').getAttribute('aria-live');
    record('timer announces politely never (aria-live=off)', live === 'off');
    await page.close();

    // 4 — ⌘K palette opens, filters, navigates; sidebar affordance at desktop
    page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(`${BASE}#/strength/today?vp=1280`);
    await page.waitForTimeout(400);
    const afford = await page.locator('button', { hasText: 'Quick actions' }).count();
    record('sidebar shows “Quick actions ⌘K” affordance at 1280', afford >= 1);
    await page.keyboard.press('Control+k');
    await page.waitForTimeout(300);
    record('⌘K opens the palette', (await page.locator('[role="dialog"]').count()) === 1);
    await page.keyboard.type('journey');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(400);
    record('palette navigates to Journey', page.url().includes('/strength/journey'));
    const sideCurrent = await page.locator('[aria-current="page"]').innerText().catch(() => '');
    record('sidebar aria-current follows', /journey/i.test(sideCurrent), `found “${sideCurrent.trim()}”`);
    await page.keyboard.press('Control+k');
    await page.waitForTimeout(200);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    record('Escape closes the palette', (await page.locator('[role="dialog"]').count()) === 0);
    await page.close();

    // 5 — reduced motion renders completed states instantly
    page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await page.goto(`${BASE}#/strength/week-12?vp=390&motion=reduced`);
    await page.waitForTimeout(120); // deliberately NO settle time
    const starOpacity = await page.evaluate(() => {
      const cells = document.querySelectorAll('.constellation .cell');
      if (!cells.length) return -1;
      return Math.min(...[...cells].map((c) => parseFloat(getComputedStyle(c).opacity)));
    });
    record('week-12 constellation complete instantly under reduced motion', starOpacity === 1, `min opacity ${starOpacity}`);
    await page.goto(`${BASE}#/strength/journey?vp=390&motion=reduced`);
    await page.waitForTimeout(120);
    const riseOpacity = await page.evaluate(() => {
      const els = document.querySelectorAll('.rise');
      return Math.min(...[...els].map((c) => parseFloat(getComputedStyle(c).opacity)));
    });
    record('journey panels visible instantly under reduced motion', riseOpacity === 1, `min opacity ${riseOpacity}`);
    await page.goto(`${BASE}#/strength/complete?vp=390&motion=reduced`);
    await page.waitForTimeout(120);
    const kindleOpacity = await page.evaluate(() => {
      const c = document.querySelector('.kindle-cell');
      return c ? parseFloat(getComputedStyle(c).opacity) : -1;
    });
    record('completion kindle rendered instantly under reduced motion', kindleOpacity === 1, `opacity ${kindleOpacity}`);
    await page.close();

    // 6 — journey cells carry text equivalents (never colour alone)
    page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(`${BASE}#/strength/journey?vp=390`);
    await page.waitForTimeout(500);
    const srTexts = await page.evaluate(() =>
      [...document.querySelectorAll('main li .sr-only')].map((e) => e.textContent).slice(0, 200)
    );
    const hasWords = ['kept', 'made up later', 'today', 'not open yet'].every((w) =>
      srTexts.some((t) => t.includes(w))
    );
    record('every cell state paired with words (sr text present)', hasWords, `${srTexts.length} labelled cells`);
    await page.close();
  } finally {
    await browser.close();
    server.kill();
  }

  const failed = results.filter((r) => !r.pass);
  console.log(`\n${results.length - failed.length}/${results.length} probes passed.`);
  process.exit(failed.length ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
