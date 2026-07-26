// Live behavioural probes for the refined Atelier prototype (R1/R2/R9 checks
// that stills cannot prove). Prints PASS/FAIL per probe; exit 1 on any FAIL.
//
// Usage (from design-refinement/): npm run probe

import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const PORT = 4176;
const BASE = `http://localhost:${PORT}/app/index.html`;

function url(world, state, q = {}) {
  const p = new URLSearchParams({ theme: 'light', scale: '100', motion: 'full', vp: 'standard', ...q });
  return `${BASE}#/${world}/${state}?${p}`;
}

let failures = 0;
function report(name, ok, detail = '') {
  failures += ok ? 0 : 1;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
}

async function main() {
  const server = spawn('node', [join(ROOT, 'tools/serve.mjs'), String(PORT)], { stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 700));
  const exe = process.env.LAB_CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
  const browser = await chromium.launch(
    (await import('node:fs')).existsSync(exe) ? { executablePath: exe } : {}
  );

  try {
    const page = await browser.newPage({ viewport: { width: 900, height: 950 } });

    // 1 · selvedge bar: three destinations, aria-current on the right one
    await page.goto(url('strength', 'today'));
    await page.waitForTimeout(300);
    const navCount = await page.locator('.at-selvnav-item').count();
    const currToday = await page.locator('.at-selvnav-item[aria-current="page"] .at-selvnav-label').textContent().catch(() => null);
    report('nav has 3 destinations', navCount === 3, `count=${navCount}`);
    report('aria-current=page on Today (today state)', currToday?.trim() === 'Today', `current=${currToday}`);

    await page.goto(url('strength', 'journey'));
    await page.waitForTimeout(250);
    const currJourney = await page.locator('.at-selvnav-item[aria-current="page"] .at-selvnav-label').textContent().catch(() => null);
    report('aria-current on The Twelve Weeks (journey state)', currJourney?.trim() === 'The Twelve Weeks', `current=${currJourney}`);

    await page.goto(url('strength', 'subscription'));
    await page.waitForTimeout(250);
    const currSupport = await page.locator('.at-selvnav-item[aria-current="page"] .at-selvnav-label').textContent().catch(() => null);
    report('aria-current on Programme & Support (subscription state)', currSupport?.trim() === 'Programme & Support', `current=${currSupport}`);

    // 2 · session owns the screen: nav hidden on active, back on paused
    await page.goto(url('strength', 'active'));
    await page.waitForTimeout(250);
    const navOnActive = await page.locator('.at-selvnav').count();
    report('nav hidden during active session', navOnActive === 0, `count=${navOnActive}`);
    await page.goto(url('strength', 'paused'));
    await page.waitForTimeout(250);
    const navOnPaused = await page.locator('.at-selvnav').count();
    report('nav returns on paused', navOnPaused === 1, `count=${navOnPaused}`);

    // 3 · 200%: Begin inside the first viewport (390×780), both worlds
    for (const world of ['strength', 'writing']) {
      await page.goto(url(world, 'today', { scale: '200' }));
      await page.waitForTimeout(400);
      const geom = await page.evaluate(() => {
        const stage = document.querySelector('.stage');
        const btn = document.querySelector('.at-primary');
        if (!stage || !btn) return null;
        const sb = stage.getBoundingClientRect();
        const bb = btn.getBoundingClientRect();
        return { bottom: bb.bottom - sb.top, stageH: sb.height };
      });
      report(`200% Begin within first viewport (${world})`, !!geom && geom.bottom <= geom.stageH, geom ? `beginBottom=${Math.round(geom.bottom)} of ${Math.round(geom.stageH)}` : 'not found');
    }

    // 4 · 200%: DOM order of Today identical to standard (R2 — CSS re-ranks, DOM doesn't)
    const domOrder = async (scale) => {
      await page.goto(url('strength', 'today', { scale }));
      await page.waitForTimeout(300);
      return page.evaluate(() =>
        [...document.querySelectorAll('.at-today > *')].map((el) => el.className.split(' ')[0]).join(',')
      );
    };
    const order100 = await domOrder('100');
    const order200 = await domOrder('200');
    report('Today DOM order identical at 100% and 200%', order100 === order200 && order100.length > 0, order100);

    // 5 · why-fold: aria-expanded toggles, text folded not removed
    await page.goto(url('strength', 'today', { scale: '200' }));
    await page.waitForTimeout(300);
    const before = await page.getAttribute('[data-why-toggle]', 'aria-expanded');
    const hiddenBefore = await page.evaluate(() => document.querySelector('[data-why-rest]').hidden);
    const inDomBefore = await page.evaluate(() => !!document.querySelector('[data-why-rest]'));
    await page.click('[data-why-toggle]');
    const after = await page.getAttribute('[data-why-toggle]', 'aria-expanded');
    const hiddenAfter = await page.evaluate(() => document.querySelector('[data-why-rest]').hidden);
    report('why starts folded at 200% (aria-expanded=false, rest hidden, in DOM)', before === 'false' && hiddenBefore === true && inDomBefore, `expanded=${before}`);
    report('why toggle expands (aria-expanded=true, rest shown)', after === 'true' && hiddenAfter === false, `expanded=${after}`);
    await page.goto(url('strength', 'today'));
    await page.waitForTimeout(300);
    const stdExpanded = await page.getAttribute('[data-why-toggle]', 'aria-expanded');
    report('why renders expanded at standard size', stdExpanded === 'true', `expanded=${stdExpanded}`);

    // 6 · reduced motion: week-12 shows the finished band (all 84 marks, no clip)
    const rmPage = await browser.newPage({ viewport: { width: 900, height: 950 }, reducedMotion: 'reduce' });
    await rmPage.goto(url('strength', 'week-12', { motion: 'reduced' }));
    await rmPage.waitForTimeout(400);
    const bandState = await rmPage.evaluate(() => {
      const svg = document.querySelector('.at-unroll .at-band-svg');
      if (!svg) return null;
      const cs = getComputedStyle(svg);
      return { clip: cs.clipPath, anim: cs.animationName, marks: svg.querySelectorAll('line, path').length };
    });
    report('reduced-motion week-12 band complete & unclipped', !!bandState && bandState.clip === 'none' && bandState.anim === 'none' && bandState.marks > 90, bandState ? `clip=${bandState.clip} anim=${bandState.anim} marks=${bandState.marks}` : 'no band');
    await rmPage.close();

    // 7 · wall-clock timer: digits advance with real time
    await page.goto(url('strength', 'active'));
    await page.waitForTimeout(400);
    const t1 = await page.textContent('#at-digits');
    await page.waitForTimeout(2500);
    const t2 = await page.textContent('#at-digits');
    const secs = (s) => Number(s.split(':')[0]) * 60 + Number(s.split(':')[1]);
    const delta = secs(t2) - secs(t1);
    report('active timer advances on wall clock', delta >= 2 && delta <= 4, `${t1} → ${t2} (+${delta}s)`);

    // 8 · nav labels never truncate at 200%
    await page.goto(url('strength', 'today', { scale: '200' }));
    await page.waitForTimeout(300);
    const truncated = await page.evaluate(() =>
      [...document.querySelectorAll('.at-selvnav-label')].filter((el) => el.scrollWidth > el.clientWidth + 1).map((el) => el.textContent)
    );
    report('nav labels survive 200% without truncation', truncated.length === 0, truncated.join('; ') || 'all fit');

    // 9 · 320px: no horizontal scroll on today or journey
    for (const st of ['today', 'journey']) {
      await page.goto(url('strength', st, { vp: 'small' }));
      await page.waitForTimeout(300);
      const overflow = await page.evaluate(() => {
        const scr = document.querySelector('.screen');
        return scr.scrollWidth - scr.clientWidth;
      });
      report(`no horizontal scroll at 320px (${st})`, overflow <= 0, `overflowX=${overflow}px`);
    }

    // 10 · first-launch motif switch via ?motif=
    for (const m of ['m1', 'm2', 'm3']) {
      await page.goto(url('strength', 'first-launch', { motif: m }));
      await page.waitForTimeout(250);
      const cls = await page.getAttribute('.at-hero-motif .at-motif-svg', 'class');
      report(`first-launch renders motif ${m}`, (cls || '').includes(`is-${m}`), cls || 'missing');
    }
  } finally {
    await browser.close();
    server.kill();
  }

  console.log(failures ? `\n${failures} probe(s) FAILED` : '\nAll probes passed.');
  process.exit(failures ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
