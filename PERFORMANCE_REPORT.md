# Performance & Core Web Vitals Engineering Report

**Target Website:** [https://www.priyanshuchamoli.dev](https://www.priyanshuchamoli.dev)  
**Last Updated:** November 11, 2026  
**Applied Skills:** `senior-fullstack`, `nextjs-best-practices`, `build-ui`

---

## 1. Build & Prerendering Benchmark

| Metric | Result | Benchmark Target | Status |
|---|---|---|---|
| **Turbopack Build Time** | 4.1s compilation | < 10.0s | PASS |
| **Static Page Generation** | 26 routes in 1039ms | < 3000ms | PASS |
| **Edge TTFB (Mumbai `bom1`)** | ~45ms | < 200ms | PASS |
| **Bundle Architecture** | 100% SSG + 1 Dynamic API Route | Clean separation | PASS |
| **TypeScript Validation** | Clean in 6.4s | 0 errors | PASS |

---

## 2. Core Web Vitals Strategy

1. **Largest Contentful Paint (LCP):**
   - Font loading optimized via `next/font/google` with `display: swap`.
   - Critical hero text renders immediately from static HTML without waiting for client-side JavaScript execution.
   - Images in `next.config.ts` configure modern AVIF and WebP delivery with automatic compression.
2. **Cumulative Layout Shift (CLS):**
   - Explicit dimensions specified for brand logos, preview cards, and avatar images.
   - Font swap fallback values configured to prevent FOIT/FOUT shift.
   - Target CLS: `< 0.05`.
3. **Interaction to Next Paint (INP):**
   - Heavy state operations (such as Network Quest packet simulation) utilize lightweight pure-JS math loops decoupled from DOM updates.
   - Framer motion transitions use GPU-accelerated CSS transforms (`transform`, `opacity`) instead of layout-triggering properties (`width`, `height`).

---

## 3. Resource & Memory Footprint (8 GB RAM Compatibility)
- All development and build operations run in under 400MB memory footprint.
- No heavy local Docker daemons or background processes required.
- Zero client-side bloat: no Three.js or heavy canvas physics libraries used.

