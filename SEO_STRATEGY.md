# Technical SEO & AI Search Visibility Strategy

**Target Website:** [https://www.priyanshuchamoli.dev](https://www.priyanshuchamoli.dev)  
**Last Updated:** November 11, 2026  
**Applied Skills:** `seo-audit`, `seo-structure-architect`, `nextjs-seo-indexing`, `schema-markup`, `keyword-clustering-tool`

---

## 1. Search Intent & Keyword Clustering

### Cluster A: Frontend & Full-Stack Web Development (Primary Commercial/Recruiter Intent)
- **Target Queries:**
  - "Next.js React developer portfolio"
  - "Full-stack JavaScript engineer"
  - "Frontend web developer in Dehradun"
  - "Junior full-stack developer portfolio"
- **Primary Landing Pages:** `/` (Home), `/projects/auralyn-audio`, `/projects`, `/resume`
- **On-Page Implementation:** Semantic H1/H2 tags, explicit schema mentions of React, Next.js, Node.js, Express, and Progressive Web Apps.

### Cluster B: Networking, Systems & Virtual Simulators (Technical Authority Intent)
- **Target Queries:**
  - "Interactive networking simulator browser"
  - "Subnetting and CIDR calculation visualizer"
  - "TCP 3-way handshake sequence number analysis"
  - "Linux cgroups vs namespaces architecture"
- **Primary Landing Pages:** `/network-quest`, `/labs`, `/notes/tcp-handshake-lifecycle`, `/notes/cidr-subnetting-guide`
- **On-Page Implementation:** RFC standards citation, Math KaTeX formulas, ASCII packet sequence diagrams, `TechArticle` structured data.

---

## 2. Structured Data Architecture (Schema.org JSON-LD)

The portfolio implements a unified multi-entity graph linking author entity to works:
1. **`Person` (`#person`):**
   - Disambiguated identity with name, jobTitle, address (Dehradun, Uttarakhand, IN), university (`CIMS`), and verified `knowsAbout` array.
2. **`WebSite` (`#website`):**
   - Canonical home URL, speakable CSS selectors for Google Assistant / AI Overviews.
3. **`ProfilePage` (`#profile`):**
   - Declares the home route as the primary canonical personal profile.
4. **`FAQPage` (`#faq`):**
   - 4 pre-formulated Q&A pairs for direct AI extraction and rich snippet carousels.
5. **`TechArticle`:**
   - Every note in `/notes/[slug]` embeds headline, dates (ISO 8601), author reference (`{"@id": "...#person"}`), publisher, and tags.
6. **`CreativeWork` / `SoftwareApplication`:**
   - Dedicated schemas for Auralyn Audio Engine, Network Quest, and Travel Dost with tech stacks and repository links.
7. **`BreadcrumbList`:**
   - Hierarchical trails on every subpage (`Home > Projects > Auralyn`).

---

## 3. AI Agent & LLM Discoverability (`llms.txt`)
- **Route:** `/llms.txt` and `/llms-full.txt`
- **HTTP Headers:** `Content-Type: text/plain; charset=utf-8`, `Cache-Control: public, max-age=86400`
- **Robots Permissions:** Explicit allow rules configured in `src/app/robots.ts` for:
  - `Google-Extended`
  - `GPTBot`
  - `ClaudeBot`
  - `PerplexityBot`
- **Content:** Curated markdown summary specifying identity, verified projects, skills, and direct deep-links.

---

## 4. Crawlability & Sitemap Protocol
- **Canonical Hostname:** `https://www.priyanshuchamoli.dev` (Strict HSTS redirect from apex `priyanshuchamoli.dev`).
- **Sitemap (`/sitemap.xml`):** Automatically indexes all static and dynamic routes (26 total routes) with valid W3C ISO date strings (`lastModified`), priority rankings, and monthly/weekly change frequencies.

