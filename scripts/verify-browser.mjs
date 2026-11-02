import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { setTimeout as sleep } from 'node:timers/promises';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const baseURL = 'http://127.0.0.1:4321';
const outputDir = 'browser-qa-results';
const importantPages = [
  '/', '/about/', '/services/', '/contact/', '/solutions/',
  '/solutions/customer-operations/', '/solutions/workflow-automation/',
  '/solutions/websites-lead-operations/', '/privacy/', '/terms/'
];
const mobilePages = [
  '/', '/contact/', '/solutions/', '/solutions/customer-operations/',
  '/solutions/workflow-automation/', '/solutions/websites-lead-operations/'
];
const screenshotPages = new Set([
  '/', '/contact/', '/solutions/', '/solutions/customer-operations/',
  '/solutions/websites-lead-operations/'
]);
const failures = [];
const warnings = [];
const pageSummaries = [];
const log = msg => console.log('[browser-qa] ' + msg);
const fail = msg => { failures.push(msg); console.error('[browser-qa] FAIL ' + msg); };

const server = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4321'], {
  stdio: ['ignore', 'pipe', 'pipe']
});
let serverOutput = '';
for (const stream of [server.stdout, server.stderr]) {
  stream.on('data', data => {
    serverOutput = (serverOutput + data.toString()).slice(-6000);
  });
}

let browser;
try {
  await mkdir(outputDir, { recursive: true });
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    if (server.exitCode !== null) break;
    try {
      const response = await fetch(baseURL, { signal: AbortSignal.timeout(1000) });
      if (response.ok) { ready = true; break; }
    } catch { /* local preview is still starting */ }
    await sleep(350);
  }
  if (!ready) throw new Error('Astro preview did not start: ' + serverOutput);

  browser = await chromium.launch({ headless: true });
  const environments = [
    { name: 'desktop', viewport: { width: 1440, height: 900 }, pages: importantPages },
    { name: 'mobile', viewport: { width: 390, height: 844 }, pages: mobilePages }
  ];

  for (const env of environments) {
    const context = await browser.newContext({
      viewport: env.viewport,
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
      locale: 'en-US'
    });
    const page = await context.newPage();
    const pageErrors = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    page.on('response', response => {
      if (response.url().startsWith(baseURL) && response.status() >= 400) {
        pageErrors.push('Local resource HTTP ' + response.status() + ': ' + response.url());
      }
    });
    for (const route of env.pages) {
      const errorsBefore = pageErrors.length;
      try {
        const response = await page.goto(baseURL + route, { waitUntil: 'domcontentloaded', timeout: 25000 });
        if (!response || response.status() !== 200) {
          fail(env.name + ' ' + route + ': unexpected HTTP ' + response?.status());
          continue;
        }
        await page.locator('h1').first().waitFor({ timeout: 10000 });
        const h1Count = await page.locator('h1').count();
        if (h1Count !== 1) fail(env.name + ' ' + route + ': expected one H1, found ' + h1Count);
        const title = await page.title();
        if (!title.includes('Emon Hossain')) fail(env.name + ' ' + route + ': unexpected document title');
        const overflow = await page.evaluate(() => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth
        }));
        if (overflow.scrollWidth > overflow.clientWidth + 2) {
          fail(env.name + ' ' + route + ': horizontal overflow ' + JSON.stringify(overflow));
        }
        if (pageErrors.length > errorsBefore) {
          for (const err of pageErrors.slice(errorsBefore)) fail(env.name + ' ' + route + ': ' + err);
        }

        const axe = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();
        const serious = axe.violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
        for (const problem of serious) {
          fail(env.name + ' ' + route + ': axe ' + problem.id +
            ' (' + problem.impact + '), elements=' + problem.nodes.length);
        }
        for (const problem of axe.violations.filter(v => v.impact !== 'serious' && v.impact !== 'critical')) {
          warnings.push(env.name + ' ' + route + ': axe ' + problem.id + ' (' + problem.impact + ')');
        }

        if (screenshotPages.has(route)) {
          const suffix = route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replaceAll('/', '-');
          await page.screenshot({
            path: outputDir + '/' + env.name + '-' + suffix + '.png',
            fullPage: true,
            animations: 'disabled'
          });
        }
        pageSummaries.push({
          route, environment: env.name, title, h1Count,
          horizontalOverflow: overflow.scrollWidth - overflow.clientWidth,
          seriousAccessibilityViolations: serious.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })),
          otherAccessibilityViolations: axe.violations.filter(v => !serious.includes(v)).map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length }))
        });
        log(env.name + ' ' + route + ' — checked');
      } catch (error) {
        fail(env.name + ' ' + route + ': ' + error.message);
      }
    }
    try {
      await page.goto(baseURL + '/', { waitUntil: 'domcontentloaded' });
      if (env.name === 'mobile') {
        const menu = page.locator('.mobile-nav summary');
        if (!(await menu.isVisible())) fail('Mobile navigation toggle is not visible');
        else {
          await menu.click();
          const link = page.locator('.mobile-nav-panel a[href="/solutions"]');
          if (!(await link.isVisible())) fail('Mobile solutions navigation is not visible after opening menu');
          else {
            await page.screenshot({ path: outputDir + '/mobile-menu-open.png', animations: 'disabled' });
            await link.click();
            await page.waitForURL(url => url.pathname === '/solutions/' || url.pathname === '/solutions', { timeout: 10000 });
          }
        }
      } else {
        const desktopLink = page.locator('.nav-links a[href="/solutions"]');
        if (!(await desktopLink.isVisible())) fail('Desktop navigation link is not visible');
        else await desktopLink.click();
        if (!page.url().includes('/solutions')) fail('Desktop solutions navigation did not reach the hub');
      }
    } catch (error) {
      fail(env.name + ' navigation interaction: ' + error.message);
    }
    await context.close();
  }
} catch (error) {
  fail('Browser setup or execution: ' + error.stack);
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
  await writeFile(outputDir + '/report.json', JSON.stringify({
    testedAt: new Date().toISOString(),
    baseURL, pageSummaries, failures, warnings,
    caveats: [
      'This checks only localhost preview, not Cloudflare production, HTTPS or custom-domain redirects.',
      'Automated axe tests cannot establish full WCAG conformity; manual keyboard and screen-reader review are still required.',
      'This does not verify contact mailbox receipt, genuine lead conversion, brand assets or Lighthouse Core Web Vitals.'
    ]
  }, null, 2));
  log('pages visited: ' + pageSummaries.length + '; failures: ' + failures.length + '; non-blocking axe findings: ' + warnings.length);
}
// npm run preview spawns a child; release the CI runner even if the wrapper's
// inherited pipes stay open after SIGTERM. All reports and screenshots were
// awaited and the Chromium browser was closed above.
await sleep(100);
process.exit(failures.length ? 1 : 0);
