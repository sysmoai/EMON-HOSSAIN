import { readFileSync } from 'node:fs';

const path = process.argv[2] || 'dependency-audit.json';
let data;
try { data = JSON.parse(readFileSync(path, 'utf8')); }
catch (e) { console.error('Dependency audit not readable: ' + e.message); process.exit(1); }
if (!data.vulnerabilities || !data.metadata?.vulnerabilities) {
  console.error('Npm audit returned no valid vulnerability inventory. Details: ' + JSON.stringify(data.error || data).slice(0,1000));
  process.exit(1);
}
const counts = data.metadata.vulnerabilities;
console.log('NPM ADVISORY INVENTORY (not a deployment approval)');
console.log('Totals: ' + JSON.stringify(counts));
const entries = Object.entries(data.vulnerabilities).map(([name, v]) => ({
  package: name,
  severity: v.severity,
  direct: Boolean(v.isDirect),
  affectedRange: v.range,
  via: (v.via || []).map(x => typeof x === 'string' ? x : {
    title: x.title,
    source: x.source,
    range: x.range,
    url: x.url
  }),
  fixAvailable: v.fixAvailable
}));
const priority = { critical:0, high:1, moderate:2, low:3, info:4 };
entries.sort((a,b) => (priority[a.severity] ?? 10) - (priority[b.severity] ?? 10) || a.package.localeCompare(b.package));
for(const item of entries) console.log(JSON.stringify(item));
console.log('This inventory is read-only. Assess static-output exposure, affected dependency paths and compatible fixes before changing package-lock or deploying.');
