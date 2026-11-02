# Astro 7 security migration — verified candidate
Date: 2026-11-03
Owner: EMONHOSSAIN.PRO
Status: DRAFT / STATIC CODE QA PASSED / NOT DEPLOYED

## Change
- Source baseline: https://github.com/sysmoai/EMON-HOSSAIN/pull/6
- New security branch: security/astro7-2026-11-03
- Dependency upgraded from Astro 4.16.19 to **Astro 7.4.4**, package-lock regenerated from an empty CI node_modules tree, Node 22.23.4 pinned in .nvmrc.
- The first lockfile regeneration preserved stale Vite 5.4.21 and esbuild 0.21.5 entries because historical node_modules (including its hidden npm lockfile) are tracked in the repository checkout.
- The final ephemeral CI run removed node_modules, .astro and dist from the **disposable CI workspace only**, regenerated lockfile, installed, built, passed three static QA scripts and reran npm audit.
- npm audit evidence before: critical 1, high 8, moderate 2 (11 total). Final clean lockfile: **0 critical, 0 high, 0 moderate, 0 total**.
- Full 22-page static build passed in migration Actions job: https://github.com/sysmoai/EMON-HOSSAIN/actions/runs/41540206852
- Regenerated lockfile and audit evidence artifact: https://github.com/sysmoai/EMON-HOSSAIN/actions/runs/41540206852/artifacts/13186975772
- Temporary elevated-permission bootstrap workflow has been deleted from the branch after its isolated use.
- Permanent static-only security gate: .github/workflows/astro7-security-gate.yml. No DNS, Cloudflare, email or production credentials.

## Verification and limits
Run with Node 22.23.4:

  npm ci
  npm run build
  node scripts/verify-release.mjs --built
  node scripts/verify-solutions.mjs
  node scripts/verify-site-integrity.mjs
  npm audit --audit-level=low

Zero npm advisories covers only known published package reports at the time of the scan, not full exploitation testing, dev server exposure, supply chain, browser accessibility or privacy compliance.

The existing repository still tracks historical node_modules, dist and .astro content in its Git index. Cleaning the current index and evaluating history/secret exposure must be scoped separately: no git history rewriting or bulk deletion is part of this candidate.

## Final outstanding launch gates
- Verify exact Cloudflare account, zone, custom domain and deployment project.
- Fix www HTTP 525 by identifying origin TLS cause; preserve DNS and all Zoho MX/SPF/DKIM records.
- Confirm DMARC requirements, mailbox send/receive and privacy before publishing new forms.
- Audit browser responsive layout, contrast, keyboard/focus, Bengali rendering, links, OG and performance.
- Confirm old unsupported numerical claims removed from live and new /solutions pages actually published.
- Staging and production deployment require known rollback artifact/target and a post-deploy verification checklist.
- Keep personal Emon identity, SYSmoAI commercial services, and BangladeshAI.Org research separate.
