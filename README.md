# Emon Hossain — emonhossain.pro

Personal authority and professional portfolio site for **Emon Hossain — AI Systems Strategist & Automation Builder**.

**Canonical site:** https://emonhossain.pro

## Purpose

The website is designed to present one consistent, evidence-led public identity across:

- practical AI systems and workflow automation;
- original build notes and AI-tool testing;
- business and operations thinking;
- Bangladesh-focused AI adoption and research;
- relevant commercial, creator, speaking and media contact.

The site is **not** a mixed storefront for every business in the portfolio. Commercial work and public-interest research are linked in their proper contexts rather than merged into one set of claims.

## Current Brand Truth

- **Public name:** EMON HOSSAIN
- **Professional title:** AI Systems Strategist & Automation Builder
- **Core territory:** Practical AI Systems · Automation · Business
- **Public promise:** I build AI systems, test what works, and explain how to use AI in the real world.
- **Doctrine:** Proof over hype.
- **Location frame:** Bangladesh-based, globally relevant.
- **Academic affiliation when formally required:** Independent Researcher, Dhaka, Bangladesh.

### Claim rule

**No number without proof.** Public performance results, ratings, customer counts, revenue, ROI, time saved, project counts, rankings, prices, delivery guarantees, partner status and incorporation claims require current evidence, correct business-unit scope and public-use approval.

## Visual System

The current EMON master brand is **monochrome + Signal Red**.

- Emon Ink: `#0B0D10`
- Carbon: `#15181D`
- Graphite: `#23272E`
- Pure White: `#FFFFFF`
- Paper: `#F5F5F3`
- Steel: `#A7ADB4`
- Signal Red: `#D61F26` — used sparingly
- Latin type: Inter
- Bangla type: Noto Sans Bengali

The older Indigo/Sky/Emerald gradient system is retired from the EMON master brand.

**Important asset gap:** the approved black-and-white illustrated Emon portrait is the fixed master identity mark, but the exact production source has not yet been committed to this repository. The legacy favicon/temporary text mark must not be treated as the final portrait asset.

## Tech Stack

- Astro 4
- Static HTML/CSS
- Cloudflare Pages deployment target
- GitHub Actions build verification

## Local Development

```bash
npm ci
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Public Routes

- `/` — authority homepage
- `/about` — canonical person/profile surface
- `/writing` and `/blog` — build notes and draft topics
- `/resources` — public-safe resources
- `/services` — ways to work together; no stale fixed public pricing
- `/sysmoai` — commercial AI-systems context
- `/bangladeshai` — research/public-interest context
- `/speaking` — talks/workshops/media
- `/philosophy` — systems doctrine
- `/newsletter` — transparent pre-launch state
- `/contact` — public inquiry routing
- `/privacy` and `/terms` — website notices

## Search / Entity Controls

The layout provides canonical URLs and Open Graph URL metadata. The `/about` page supplies a `ProfilePage`/`Person` JSON-LD entity using only currently verified identity links.

The target entity is:

> **Emon Hossain — AI Systems Strategist & Automation Builder — Bangladesh**

Same-name collisions are expected; the strategy is entity consistency, not name-only ranking.

## Deployment Controls

Pull requests run a clean `npm ci` + `npm run build` verification workflow.

The production deploy workflow is designed to:

1. fail on install/build errors;
2. require Cloudflare credentials;
3. deploy the generated `dist/` output rather than the repository root.

Do not treat a deployment as verified until the build passes and the production URL is checked after merge.

## Repository Hygiene Gap

Historical commits currently contain tracked generated/dependency directories such as `node_modules/`, `dist/` and `.astro/` even though they are ignored for future work. They should be removed from the Git index in a one-time authenticated cleanup, for example:

```bash
git rm -r --cached node_modules dist .astro
git add .gitignore package-lock.json
git commit -m "chore: stop tracking generated artifacts"
```

Keep `package-lock.json` tracked so `npm ci` remains deterministic.

## Contact

Public inquiries: `contact@emonhossain.pro`

## Copyright

© 2026 Emon Hossain. All rights reserved.
