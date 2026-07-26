# Emon Hossain — emonhossain.pro

Personal brand and professional portfolio website for Emon Hossain, AI Systems Architect & No-Code Automation Strategist.

**Live:** https://emonhossain.pro

## Overview

A modern, performance-optimized website showcasing:
- Personal brand positioning and services
- AI systems strategy and automation consulting
- Links to SYSmoAI, AI Premium Shop, and BangladeshAI
- Blog/writing section (coming soon with full content)
- Contact and consultation booking

Built with **Astro 4** for maximum performance and SEO.

## Tech Stack

- **Framework:** Astro 4
- **Styling:** CSS-in-JS (embedded in layout)
- **Hosting:** Cloudflare Pages / Vercel
- **Domain:** emonhossain.pro

## Project Structure

```
src/
├── layouts/
│   └── BaseLayout.astro      # Main layout with navigation, footer, styles
├── pages/
│   ├── index.astro           # Homepage
│   ├── about.astro           # About page
│   ├── services.astro        # Services & pricing
│   ├── writing.astro         # Writing/Blog landing
│   ├── blog/
│   │   ├── index.astro       # Blog post listing
│   │   ├── ai-from-hype.astro
│   │   ├── founder-branding.astro
│   │   └── simple-systems.astro
│   ├── contact.astro         # Contact page
│   ├── bangladeshai.astro    # BangladeshAI link
│   ├── sysmoai.astro         # SYSmoAI link
│   ├── philosophy.astro      # Philosophy page
│   ├── resources.astro       # Resources page
│   ├── newsletter.astro      # Newsletter signup
│   ├── speaking.astro        # Speaking engagements
│   ├── privacy.astro         # Privacy policy
│   ├── terms.astro           # Terms of service
│   └── 404.astro             # Not found page
public/
├── favicon.svg
├── robots.txt
└── sitemap.xml
astro.config.mjs              # Astro configuration
package.json                  # Dependencies & scripts
tsconfig.json                 # TypeScript config
```

## Development

### Install Dependencies
```bash
npm install
# or
pnpm install
```

### Start Dev Server
```bash
npm run dev
```

Server runs on `http://localhost:4321`

### Build for Production
```bash
npm run build
```

Output: `dist/` directory

### Preview Production Build
```bash
npm run preview
```

## Pages

| Page | Route | Status |
|------|-------|--------|
| Homepage | `/` | ✅ Live |
| About | `/about` | ✅ Live |
| Services & Pricing | `/services` | ✅ Live |
| Writing | `/writing` | ✅ Live |
| Blog Listing | `/blog` | ✅ Live |
| Blog: AI From Hype | `/blog/ai-from-hype` | 🔄 Coming Soon (content) |
| Blog: Founder Branding | `/blog/founder-branding` | 🔄 Coming Soon (content) |
| Blog: Simple Systems | `/blog/simple-systems` | 🔄 Coming Soon (content) |
| Contact | `/contact` | ✅ Live |
| Privacy Policy | `/privacy` | ✅ Live |
| Terms of Service | `/terms` | ✅ Live |
| Philosophy | `/philosophy` | ✅ Live |
| Resources | `/resources` | ✅ Live |
| Newsletter | `/newsletter` | ✅ Live |
| Speaking | `/speaking` | ✅ Live |
| BangladeshAI | `/bangladeshai` | ✅ Live |
| SYSmoAI | `/sysmoai` | ✅ Live |

## Brand

**Logo:** "E" (Emon initial) in gradient (indigo → sky → emerald)

**Color System:**
- Primary: Indigo (#4F46E5)
- Secondary: Sky (#0EA5E9)
- Accent: Emerald (#10B981)
- Dark: Ink (#0F172A)
- Light: Paper (#FAFAF9)

**Typography:**
- Font: Inter
- Weights: 400, 500, 600, 700, 800

## Services Offered

1. **AI Profit Audit** — 4,999 BDT (3 days)
2. **Workflow Build Sprint** — 24,999+ BDT (7-14 days)
3. **Advisory Retainer** — 14,999 BDT/month (ongoing)
4. **Premium 1:1 Consultation** — 4,999 BDT/hour (min 2hrs)
5. **Enterprise Workshop** — 49,999+ BDT (half/full day)
6. **Templates & SOP Packs** — Free/Paid

## Contact

- **Email:** contact@emonhossain.pro
- **WhatsApp:** +880 1865-385348
- **Location:** Dhaka, Bangladesh
- **Hours:** Sun-Thu 10 AM - 7 PM BST

## Deployment

### Cloudflare Pages
Automatic deployment on push to main branch.

**Build Command:** `npm run build`  
**Output Directory:** `dist/`

### Vercel (Alternative)
```bash
vercel --prod
```

## Analytics & Monitoring

- Cookie consent banner included (GDPR-ready)
- Performance optimized (Astro static generation)
- SEO optimized (meta tags, sitemap, robots.txt)
- Mobile responsive (tested on all breakpoints)

## Blog Content Status

Blog posts are currently marked "Coming Soon" with introductory descriptions:

- **AI From Hype** — Gap between marketing hype and operational reality
- **Founder Branding** — Building leverage through conviction
- **Simple Systems** — Designing systems people actually use

Full content to be added soon.

## Next Steps

1. ✅ Add full blog post content
2. ✅ Complete philosophy page
3. ✅ Complete resources page
4. ✅ Set up email contact form integration
5. ✅ Add analytics tracking

## Git

**Repository:** https://github.com/sysmoai/EMON-HOSSAIN.git

**Remotes:**
- `origin` → GitHub (primary)
- `replit` → Replit (backup)

## License

© 2026 Emon Hossain. All rights reserved.

---

**Built with Astro 4** — The web framework for content-driven websites.  
**Deployed on Cloudflare Pages & Vercel** — Edge performance, global CDN.
