# AGENTS.md — EMON HOSSAIN (emonhossain.pro)

## Scope and build
- Repo: https://github.com/sysmoai/EMON-HOSSAIN
- Public name: Emon Hossain — AI Systems Strategist & Automation Builder.
- Source stack: pinned Astro 7.4.4 / Node 22.23.4 and static HTML/CSS. No React/Tailwind dependency currently established.
- Use `npm ci && npm run build && node scripts/verify-release.mjs --built && node scripts/verify-solutions.mjs && node scripts/verify-site-integrity.mjs && npm audit --audit-level=low`; output is `dist/`. Keep `package-lock.json`.

## Release safety
- Push-to-main does NOT automatically publish production. GitHub deploy workflow is currently verification-only.
- Historical Cloudflare Pages name `emonhossain-pro` does not establish active account/project access. The old `gh-pages` branch contains a **legacy unsafe Cloudflare workflow** and is not the validated production source.
- Last observed public site served old claims; www returned HTTP 525. Recheck origin, DNS, TLS, rollback before a release.
- Do not alter DNS or mail records (MX, SPF, DKIM, DMARC) without verified inventory and backup.
- Contact email deliverability and approved portrait assets remain unverified.

## Brand and work separation
- Personal authority website is not the SYSmoAI storefront.
- BangladeshAI.Org research and public-interest work remain separate.
- Do not invent partner, publication, company registration, customers, metrics, prices, case studies, or promised savings.
- Combined candidate: PR #6 includes the safely merged Astro 7 upgrade from PR #8 and release controls from PR #4. Do not independently re-merge historical PR #4/#5/#8 or enable production publishing until browser/Cloudflare/rollback gates are met.
- Generated/dependency directories tracked in Git are explicitly a separate cleanup task: issue #9.
