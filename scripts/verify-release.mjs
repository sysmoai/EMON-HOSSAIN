import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const built = process.argv.includes('--built');
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const read = path => readFileSync(join(root, path), 'utf8');
const page = read('src/pages/index.astro');
const services = read('src/pages/services.astro');
const contact = read('src/pages/contact.astro');
const deploy = read('.github/workflows/deploy.yml');
const robots = read('public/robots.txt');
const sitemap = read('public/sitemap.xml');

check(page.includes('AI Systems Strategist') || page.includes('practical AI systems'), 'Expected current personal positioning');
check(!/67\s*(critical\s*)?gaps|5★\s*client|10\+\s*hrs\/week|4,999\s*BDT/i.test(page), 'Legacy unsupported homepage proof or pricing');
check(!/24,999|14,999|49,999|4,999/i.test(services), 'Legacy fixed service pricing');
check(contact.includes('mailto:contact@emonhossain.pro'), 'Contact email CTA missing');
check(deploy.includes('Production deployment is intentionally disabled'), 'Unexpected deployment configuration: inspect before release');
check(!robots.includes('Disallow: /_astro'), 'Astro assets cannot be disallowed from search crawlers');
const urls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), m => m[1]);
check(urls.length >= 13 && new Set(urls).size === urls.length, 'Sitemap route count or duplicates');
check(urls.every(url => url.startsWith('https://emonhossain.pro/')), 'Foreign URL in sitemap');
if (built) {
  check(existsSync(join(root, 'dist/index.html')), 'Missing dist/index.html');
  if (existsSync(join(root, 'dist/index.html'))) {
    const html = read('dist/index.html');
    check(html.includes('I build practical AI systems'), 'Built homepage does not match approved positioning');
    check(!html.includes('67 Critical Gaps') && !html.includes('4,999 BDT'), 'Stale claims in compiled homepage');
    check(html.includes('rel="canonical"'), 'Canonical metadata missing');
  }
}
if (errors.length) {
  console.error('Release gate FAILED:\n' + errors.map(e => '- ' + e).join('\n'));
  process.exitCode = 1;
} else {
  console.log('Release gate PASS: current identity, claims, contact, sitemap and build output checked.');
  console.log('This is NOT proof of production deployment, domain ownership, email deliverability, or DNS health.');
}
