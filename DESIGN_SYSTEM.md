# Design System Specification — Priyanshu Chamoli Portfolio

**Author:** Autonomous Senior Engineering Team  
**Last Updated:** November 11, 2026 (Post-Audit Corrective Update)  
**Applied Skills:** `ui-ux-pro-max`, `frontend-design`, `high-end-visual-design`, `tailwind-patterns`, `wcag-audit-patterns`

---

## 1. Visual Philosophy & Identity
The portfolio implements a refined, dark-first engineering aesthetic inspired by modern infrastructure consoles, developer terminals, and network monitoring dashboards.
- **Atmosphere:** Clean, dark, precise, and high-performance. Avoids gimmicky 3D bloat, fake activity counters, and excessive glassmorphism.
- **Typography:** Geist Sans for crisp, legible UI typography paired with Geist Mono for technical metrics, CIDR prefixes, and terminal outputs.
- **Hierarchy:** High visual contrast with explicit focus states, subtle depth gradients, and distinct section dividers.

---

## 2. Empirical Color Contrast Audit (WCAG 2.2 AA Verified)

All contrast ratios below were calculated using the standard W3C relative luminance formula:
$$\text{Relative Luminance } L = 0.2126 \cdot R + 0.7152 \cdot G + 0.0722 \cdot B$$
$$\text{Contrast Ratio } CR = \frac{L_1 + 0.05}{L_2 + 0.05}$$

### 2.1 Dark Mode Matrix (Across All Active Surface Layers)
The initial audit discovered that `#71717a` against `#09090b` provided only **4.12:1** contrast (failing WCAG AA normal text). Furthermore, testing the candidate `#7a7a83` revealed that while it achieves 4.68:1 on the darkest canvas `#09090b`, it dropped to **3.91:1** on elevated cards (`#1e1e22`) and secondary cards (`#141417`).

Therefore, the tokens were calibrated to `#8b8b96` and `#9c9ca8`, which mathematically **pass WCAG 2.2 AA across every single dark background layer**:

| Foreground Token | Canvas (`#09090b`) | Secondary (`#111114`) | Card (`#141417`) | Tertiary (`#18181b`) | Card Hover (`#1c1c20`) | Elevated (`#1e1e22`) | WCAG 2.2 AA Result |
|---|---|---|---|---|---|---|---|
| `--text-primary` (`#fafafa`) | **19.06:1** | **18.06:1** | **17.61:1** | **16.97:1** | **16.27:1** | **15.92:1** | **PASS (AAA)** |
| `--text-secondary` (`#a1a1aa`) | **7.76:1** | **7.35:1** | **7.17:1** | **6.91:1** | **6.63:1** | **6.48:1** | **PASS (AAA)** |
| `--text-tertiary` (`#9c9ca8`) | **7.33:1** | **6.94:1** | **6.77:1** | **6.53:1** | **6.26:1** | **6.12:1** | **PASS (AAA)** |
| `--text-muted` (`#8b8b96`) | **5.90:1** | **5.59:1** | **5.46:1** | **5.26:1** | **5.04:1** | **4.93:1** | **PASS (AA $\ge 4.5:1$)** |
| `--accent-primary` (`#3b82f6`) | **5.41:1** | **5.12:1** | **5.00:1** | **4.82:1** | **4.62:1** | **4.52:1** | **PASS (AA $\ge 4.5:1$)** |
| `--node-green` (`#22c55e`) | **8.73:1** | **8.27:1** | **8.07:1** | **7.78:1** | **7.45:1** | **7.29:1** | **PASS (AAA)** |

### 2.2 Light Mode Matrix (`[data-theme="light"]`)
Light mode was similarly calibrated to ensure subtle and muted text tokens never fall below 4.5:1 against secondary or tertiary surfaces:

| Foreground Token | Canvas (`#fafafa`) | Secondary (`#f4f4f5`) | Card (`#ffffff`) | Tertiary (`#e4e4e7`) | WCAG 2.2 AA Result |
|---|---|---|---|---|---|
| `--text-primary` (`#09090b`) | **19.06:1** | **18.10:1** | **19.90:1** | **15.68:1** | **PASS (AAA)** |
| `--text-secondary` (`#27272a`) | **12.60:1** | **11.96:1** | **13.15:1** | **10.36:1** | **PASS (AAA)** |
| `--text-tertiary` (`#3f3f46`) | **10.01:1** | **9.50:1** | **10.44:1** | **8.23:1** | **PASS (AAA)** |
| `--text-muted` (`#475569`) | **7.26:1** | **6.89:1** | **7.58:1** | **5.97:1** | **PASS (AAA)** |
| `--accent-primary` (`#1d4ed8`) | **6.42:1** | **6.10:1** | **6.70:1** | **5.28:1** | **PASS (AA $\ge 4.5:1$)** |

---

## 3. Form States, Focus & Placeholders
- **Input Placeholders:** Explicitly styled in `globals.css` with `input::placeholder { color: var(--text-muted); opacity: 1; }` ensuring 4.93:1 to 5.90:1 contrast on dark inputs and 5.97:1 to 7.58:1 on light inputs.
- **Focus Indicators (`:focus-visible`):** Standard `2px solid var(--accent-primary)` with `2px outline-offset`.
- **Skip-to-Content Link (`.skip-to-content`):** Positioned at top of DOM in `RootLayout`. Offscreen until focused, jumping to `top: 1rem` with white focus ring.
- **Monochrome Print Stylesheet:** High-contrast `@media print` rules strip backgrounds and format text cleanly for ATS resume PDF exports.
