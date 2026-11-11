# Changelog — Portfolio Engineering Transformation

All notable changes made to the portfolio during this engineering transformation are documented below.

---

## [Unreleased] - 2026-11-11

### Phase 2: Design System & Accessibility
- **Contrast Tokens:** Upgraded `--text-tertiary` to `#94949e` and `--text-muted` to `#71717a` in dark mode to strictly satisfy WCAG 2.2 AA (>= 4.5:1). Adjusted light mode tokens similarly.
- **Skip-to-Content Navigation:** Added accessible `.skip-to-content` link in `src/app/layout.tsx` targeting `<main id="main-content">`, enabling seamless keyboard navigation for screen reader and keyboard-only users.
- **Print Stylesheet:** Added `@media print` rules in `globals.css` stripping navigation bars, noise overlays, and background textures for clean, high-contrast monochrome printing.
- **Navigation:** Added `Resume` route (`/resume`) to `navItems` in `src/lib/data.ts`.

### Phase 3: Genuine Project Showcases
- **Auralyn Case Study:** Created dedicated technical case study at `src/app/projects/auralyn-audio/` exploring full-stack audio streaming architecture (React PWA + Express REST gateway + Python stream extraction), ASCII architecture flows, and challenges (CORS, buffer underruns, persistent audio controller).
- **Projects Catalog Enhancement:** Updated `src/app/projects/page.tsx` with `"Full-Stack"` filter category, direct GitHub repository links, and dynamic action buttons.
- **Homepage Showcase:** Updated `FeaturedProject.tsx` to feature Auralyn Audio Engine with dynamic badges and typography.

### Phase 4: Technical SEO & AI Discoverability
- **Positioning Alignment:** Upgraded site positioning from "IT Student & Developer" to "Frontend & Full-Stack Developer • Systems & Cloud" to target competitive engineering opportunities.
- **Metadata Expansion:** Added targeted keyword clusters for Next.js, React, Node.js, and Full-Stack Engineering across `src/lib/seo.ts` and `src/app/layout.tsx`.
- **Structured Data:** Expanded `knowsAbout` array on `Person` entity schema to include React, Next.js, Node.js, Express, TypeScript, REST APIs, and PWA.
- **Sitemap & Robots:** Updated `src/app/sitemap.ts` to index `/resume`, `/projects/auralyn-audio`, and new technical notes with W3C dates. Updated `llms.txt` and `llms-full.txt` to index full-stack projects for AI search engines.

### Phase 5: Technical Content Authority
- **New Technical Note:** Published *"State Management and Buffering in In-Browser Audio Streaming Engines"* (`/notes/browser-audio-streaming-engine`), providing an in-depth breakdown of HTML5 Audio events, React state reconciliation, and CORS proxying, based on the actual Auralyn codebase.

### Phase 6: Professional ATS-Friendly Resume
- **Dedicated Route:** Built `src/app/resume/page.tsx` and `src/app/resume/layout.tsx` featuring semantic HTML, verified education (B.Sc. IT at CIMS Dehradun), categorized skill groups, verified engineering projects with impact bullets, and a 1-click "Print / Save as PDF" button.

### Phase 7: Contact Form Security & Route Hardening
- **Server-Side API Route:** Implemented `src/app/api/contact/route.ts` with strict input sanitization, name/email/message validation, and safe error handling.
- **Honeypot Anti-Spam:** Integrated invisible honeypot field (`_hp_company`) and submission timestamp checks to drop automated bot submissions without user friction.
- **Sliding-Window Rate Limiter:** Added IP rate limiting (5 requests per 15 minutes) with graceful 429 status and `Retry-After` headers.
- **Contact Page Integration:** Refactored `src/app/contact/page.tsx` to communicate through `/api/contact` with seamless fallbacks.

### Phase 8: Quality Assurance & Testing
- **Test Suite Expansion:** Created `src/lib/contact.test.ts` testing sanitization, honeypot traps, validation errors, and rate limits.
- **SEO Suite Updates:** Updated `src/lib/seo.test.ts` to assert sitemap presence for `/resume`, `/projects/auralyn-audio`, and `/notes/browser-audio-streaming-engine`.
- **Results:** 36 passing unit tests, 0 TypeScript errors, 0 ESLint warnings, 26 prerendered static routes in Next.js production build.

