# Application Security & Serverless Threat Model Audit

**Target Website:** [https://www.priyanshuchamoli.dev](https://www.priyanshuchamoli.dev)  
**Last Updated:** November 11, 2026 (Post-Audit Corrective Update)  
**Applied Skills:** `security-auditor`, `threat-modeling-expert`, `frontend-security-coder`, `backend-security-coder`

---

## 1. Threat Modeling & Attack Surface

| Asset / Entry Point | Threat Vector | Implemented Mitigation | Verification Evidence |
|---|---|---|---|
| **Contact API (`/api/contact`)** | Automated bot spam & mail flooding | 1. Hidden honeypot field (`_hp_company`) dropping bots silently.<br>2. Minimum 2-second typing window check.<br>3. Distributed rate limiter (Upstash Redis + instance fallback). | Verified via `contact.test.ts` & live Chrome test |
| **Contact Input Payloads** | Cross-Site Scripting (XSS) & Header Injection | Strict regex email validation, length caps (name <= 100, message <= 3000), HTML character stripping via `sanitizeText()`. | Verified via `contact.test.ts` |
| **HTTP Traffic** | Man-in-the-Middle (MitM) & Clickjacking | 1. `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`<br>2. `X-Frame-Options: DENY`<br>3. `X-Content-Type-Options: nosniff`. | Verified via curl & live site test |
| **Client Script Injection** | Unsafe script execution | Strict Content-Security-Policy with `default-src 'self'` and restricted connect/font sources. | Verified via `next.config.ts` |
| **Client Secrets** | Secret leakage | Zero private API keys or tokens embedded in client builds. All external forwarders invoked server-side. | Verified via repository audit |

---

## 2. Serverless Rate-Limiting Architecture: Upstash Redis vs In-Memory Fallback

### The Serverless Concurrency Problem
On serverless platforms like Vercel (AWS Lambda / Edge Runtime), functions execute in isolated micro-VMs. An in-memory Map `new Map()` lives only in that specific Node.js process. When multiple concurrent requests arrive, Vercel spins up separate container instances, each with an empty memory map. This allows a distributed bot or burst attacker to bypass an in-process limiter. Furthermore, when containers go idle, Vercel recycles them, resetting counts to zero.

### Implemented Solution (`src/lib/contact.ts`)
1. **Persistent Distributed Layer (Recommended for Production):**
   - Implemented `checkRateLimitDistributed()` which connects to **Upstash Redis REST API** via HTTPS without requiring heavy local client packages.
   - Executes atomic pipeline commands `[["INCR", key], ["EXPIRE", key, 900]]`.
   - **Cost:** Upstash offers a permanent 100% free tier (up to 10,000 requests/day, no credit card required).
   - **Required Environment Variables:**
     - `UPSTASH_REDIS_REST_URL`: The HTTPS REST URL of your Upstash Redis database.
     - `UPSTASH_REDIS_REST_TOKEN`: The bearer authentication token.
2. **Graceful Local Fallback:**
   - If the Upstash environment variables are not present, the system automatically falls back to the in-memory sliding window store plus the client submission timer (`_formLoadedAt < 2000ms`), logging a warning without crashing.

---

## 3. Email Delivery Mechanism & Provider State

### Verification Finding
During direct API testing with `fetch`, FormSubmit requires valid `Origin` and `Referer` headers matching the registered domain; otherwise, it returns `{ success: 'false', message: 'Make sure you open this page through a web server' }`.
When proper origin headers (`https://www.priyanshuchamoli.dev`) are supplied, FormSubmit registers the submission and sends an activation email to `chamolip81@gmail.com`.

### Dual-Provider Architecture in `/api/contact/route.ts`
1. **Provider 1 (Resend REST API - Recommended):**
   - If `RESEND_API_KEY` is configured in environment variables, the route sends directly via `https://api.resend.com/emails`.
   - Resend provides 100 free emails/day (3,000/month) with zero credit card required.
2. **Provider 2 (FormSubmit Gateway with Origin Verification):**
   - If `RESEND_API_KEY` is unset, the route dispatches to FormSubmit with explicit `Origin` and `Referer` headers.
   - If FormSubmit requires 1-time activation, the server returns `{ success: true, status: 'activation' }` and alerts the user to check their email.
3. **Truthful Delivery Guarantee:**
   - If delivery is unconfirmed by both providers, the server returns **HTTP 502 with `success: false`**. It **never falsely claims that an email was sent**.
   - The UI immediately renders a 1-click fallback button opening Gmail or the user's default email client with pre-filled subject and body text.
