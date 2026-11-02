import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const site = 'https://emonhossain.pro';
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const read = path => readFileSync(join(root, path), 'utf8');
const sitemap = read('public/sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const pathnameToHtml = pathname => {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  return join(root, 'dist', clean, 'index.html');
};
const pathnameToAsset = pathname => join(root, 'dist', pathname.replace(/^\/+/, ''));
const publicAsset = /\.(?:svg|png|jpe?g|webp|gif|ico|css|js|mjs|xml|txt|json|pdf|woff2?|ttf)$/i;
const linkExists = href => {
  const url = new URL(href, site);
  return publicAsset.test(url.pathname) ? existsSync(pathnameToAsset(url.pathname)) : existsSync(pathnameToHtml(url.pathname));
};
const blockedClaims = /5★\s*client rating|10\+\s*hrs\/week saved|67\s*critical gaps|4,999\s*BDT|thousands of customers served/i;
check(urls.length >= 20, 'Expected at least 20 public sitemap URLs');
check(new Set(urls).size === urls.length, 'Duplicate sitemap URL');
check(urls.every(url => url.startsWith(site + '/')), 'Unexpected sitemap origin');

for (const url of urls) {
  let pathname;
  try { pathname = new URL(url).pathname; } catch { check(false, 'Invalid sitemap URL ' + url); continue; }
  const htmlPath = pathnameToHtml(pathname);
  if (!existsSync(htmlPath)) { check(false, 'Sitemap page missing from dist: ' + pathname); continue; }
  const html = read(htmlPath);
  const headings = [...html.matchAll(/<h1(?:\s|>)/gi)].length;
  check(headings === 1, 'Expected exactly one H1 at ' + pathname + ', found ' + headings);
  check(/<title>[^<]+<\/title>/i.test(html), 'Title missing: ' + pathname);
  check(html.includes('<meta name="description"'), 'Description missing: ' + pathname);
  check(html.includes('rel="canonical"'), 'Canonical missing: ' + pathname);
  check(html.includes('property="og:url"'), 'Open Graph URL missing: ' + pathname);
  check(!blockedClaims.test(html), 'Historical unsupported claim or price: ' + pathname);
  for (const match of html.matchAll(/(?:href|src)="(\/(?!\/)[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const target = match[1];
    check(linkExists(target), 'Broken local link or asset in ' + pathname + ': ' + target);
  }
}

const homepage = pathnameToHtml('/');
if (existsSync(homepage)) {
  const html = read(homepage);
  check(html.includes('<details class="mobile-nav"'), 'Accessible mobile menu missing');
  check(html.includes('aria-label="Mobile primary navigation"'), 'Mobile nav landmark missing');
  check(html.includes('href="/solutions"'), 'Homepage solution discovery path missing');
}
const robots = read('public/robots.txt');
check(!robots.includes('Disallow: /_astro'), 'Search crawler blocked from Astro assets');

if (failures.length) {
  console.error('Site-wide QA FAILED (' + failures.length + '):\n' + failures.map(x => '- ' + x).join('\n'));
  process.exitCode = 1;
} else {
  console.log('Site-wide QA PASS: ' + urls.length + ' public pages, headings, SEO metadata, local links/assets, no historical claim regression, mobile navigation.');
  console.log('NOT VERIFIED: production TLS, Cloudflare mapping, email delivery, visual browser accessibility, live traffic or lead conversion.');
}
