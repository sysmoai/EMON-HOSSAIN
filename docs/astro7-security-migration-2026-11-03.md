# Astro 7 security migration — isolated proof plan
Date: 2026-11-03
Owner: EMONHOSSAIN.PRO source only
Status: EXPERIMENTAL; NO PRODUCTION DEPLOY

- Origin: https://github.com/sysmoai/EMON-HOSSAIN/pull/6 (integrated source).
- Existing Astro: 4.16.19 with 11 npm audit findings (critical 1, high 8, moderate 2).
- Related issue: https://github.com/sysmoai/EMON-HOSSAIN/issues/7
- Official migration guides: https://docs.astro.build/en/guides/upgrade-to/v5/ , /v6/ and /v7/.
- Astro v7.4 requires Node >=22.22.0. This candidate uses 22.23.4; independently verify host build settings.
- Temporary bootstrap workflow is restricted to the named security branch, with no production deploy and no Cloudflare credentials.
- Lockfile regeneration uses exact Astro 7.4.4 with scripts disabled; then npm ci, static build, three source QA gates and npm audit.
- Branch-scoped package changes commit only after all static checks pass; workflow credentials are not persisted during dependency installation.
- Remove bootstrap workflow from the security candidate before final integration review.
- If repository policy denies GitHub Actions write, recover the generated lockfile from the migration evidence artifact and use an authorized repository update.
- A static build and passing checks do not verify runtime exploitability, mobile visual QA, HTTPS, email delivery or customer outcomes.
- Production remains NO-GO while www HTTP 525, stale live claims, exact Cloudflare origin and rollback remain unverified.
