# emonhossain.pro — production release handoff (2026-11-03)

## Verified facts
- Repository: https://github.com/sysmoai/EMON-HOSSAIN
- Canonical domain: https://emonhossain.pro
- Current main at audit: 1286e5976af77d316207f85df90cdd29397e07d1
- Latest main CI at audit: https://github.com/sysmoai/EMON-HOSSAIN/actions/runs/32677565605 (passed build; **did not deploy**).
- Production HTTPS homepage still served legacy title and unsupported offers/results on 2026-11-03; it does **not** match main.
- https://www.emonhossain.pro returned HTTP 525 (Cloudflare TLS handshake failure).
- GitHub Actions deploy.yml runs build verification ONLY; there is no active production publish job.
- Cloudflare Pages project name `emonhossain-pro` is documented in AGENTS.md, but current account/project, deployment source, domain mappings and secrets have NOT been confirmed. Do not assume the project or auth is functioning.
- The exact approved master portrait is not committed; do not substitute a generated image.
- Live contact email deliverability has NOT been verified.
- Old tracked node_modules/, dist/, .astro/ remain a repository hygiene task; avoid rewriting git history as part of launch.

## Preflight (read-only, no hidden changes)
1. In the authorized Cloudflare account for emonhossain.pro: identify zone, Pages/Workers project, deployments and custom-domain mappings; record exact project/account identifiers and current working deployment/rollback target.
2. Export and preserve existing DNS records including A/AAAA/CNAME, MX, TXT, SPF, DKIM, DMARC and any verification records. No MX/TXT edits required for website launch.
3. Check apex and www DNS records, Cloudflare SSL/TLS mode, origin certificate, Pages custom domain verification, redirects and proxied/origin behavior. HTTP 525 means TLS handshake failed; verify root cause rather than trying random SSL mode changes.
4. Confirm whether the origin is Cloudflare Pages, Workers, GitHub Pages or another platform. Do not change DNS until this is known.
5. Verify contact@emonhossain.pro mailbox route and send/receive independently. Do not claim the contact link works merely because mailto exists.

## Release candidate
- Source stack: Astro 4; Node 22; `npm ci && npm run build`.
- Check `node scripts/verify-release.mjs --built`; it verifies claim constraints and generated output.
- GitHub Actions uploads a deployable `dist/` artifact; this does NOT publish it.
- Compare the exact candidate to the previous production snapshot before changing anything. Stage in an isolated preview, inspect navigation, responsive layout, accessibility, OG image, key routes, and legal notices.
- Publish the approved build to the verified existing hosting project using account-approved credentials. Never use speculative project/account names.
- Preserve rollback target and immediately test production.

## Production acceptance criteria
- Apex and www: valid HTTPS, no Cloudflare 525, canonical www-to-apex 301/308 redirect, no redirect loops.
- Homepage headline uses current AI Systems Strategist & Automation Builder positioning and no old performance numbers or 4,999 BDT audit.
- /about, /services, /contact, /writing, /resources, /sysmoai, /bangladeshai, /privacy and /terms render and navigate.
- /robots.txt and /sitemap.xml load; public CSS/JS crawlable; canonical and structured-data metadata correct.
- Contact mailbox receives a real test message, or site clearly describes an alternate verified channel.
- Observe live origin/response, deploy ID/hash, timestamps, screenshots, and record exact rollback instructions.
- Do not publicly claim launch complete without these checks.

## Current blocking access
The chat connector can read/write the GitHub repo, but its browser session cannot reach the authenticated Cloudflare account, and no Cloudflare management integration is connected. DNS and production deploy remain unmodified.

## Scope guard
Keep personal brand, SYSmoAI commercial operations, and BangladeshAI.Org research/public-interest context separate. No unsupported sales numbers, clients, affiliations, published papers, government or academic partnerships. No purchase, DNS modifications, or changes to other business domains.
