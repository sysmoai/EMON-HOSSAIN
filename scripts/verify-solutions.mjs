import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const file = relative => readFileSync(join(root, relative), 'utf8');
const routes = [
  'solutions',
  'solutions/customer-operations',
  'solutions/workflow-automation',
  'solutions/websites-lead-operations'
];
const sitemap = file('public/sitemap.xml');
const homepage = file('dist/index.html');
const services = file('dist/services/index.html');
const contact = file('dist/contact/index.html');

check(homepage.includes('href="/solutions"'), 'Homepage solution hub link absent');
check(services.includes('href="/solutions"'), 'Services solution hub link absent');
check(contact.includes('mailto:contact@emonhossain.pro'), 'Contact email link absent');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
check(new Set(urls).size === urls.length, 'Duplicate sitemap locs');
check(urls.every(url => url.startsWith('https://emonhossain.pro/')), 'Sitemap contains foreign origin');

for (const route of routes) {
  const path = 'dist/' + route + '/index.html';
  check(existsSync(join(root, path)), 'Missing built route: ' + path);
  check(sitemap.includes('<loc>https://emonhossain.pro/' + route + '</loc>'), 'Missing sitemap entry: ' + route);
  if (!existsSync(join(root, path))) continue;
  const html = file(path);
  check(/<title>[^<]*Emon Hossain[^<]*<\/title>/i.test(html), 'Missing owner title: ' + route);
  check(html.includes('<meta name="description"'), 'Missing description: ' + route);
  check(html.includes('rel="canonical"'), 'Missing canonical: ' + route);
  check(html.includes('<h1'), 'Missing H1: ' + route);
  check(html.includes('href="/contact"'), 'Missing contact route: ' + route);
  check(!/4,999 BDT|24,999\+ BDT|67 critical gaps|5★ client rating/i.test(html), 'Unsupported historical claim/price: ' + route);
}

const linkMarkup = homepage + services + routes.map(route => existsSync(join(root, 'dist/' + route + '/index.html')) ? file('dist/' + route + '/index.html') : '').join('\n');
for (const m of linkMarkup.matchAll(/href="\/(solutions(?:\/[^"#?]*)?)"/g)) {
  const destination = join(root, 'dist', m[1], 'index.html');
  check(existsSync(destination), 'Broken solution link: /' + m[1]);
}
if (failures.length) {
  console.error('Solution-page QA FAILED:\n' + failures.map(x => '- ' + x).join('\n'));
  process.exitCode = 1;
} else {
  console.log('PASS: solution pages, SEO basics, sitemap, internal links, claim guard and contact CTA');
  console.log('NOT TESTED: live deployment, inbox deliverability, Core Web Vitals, consented pilots or market search demand.');
}
