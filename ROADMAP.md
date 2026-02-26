# nw. Agency Platform — Project Roadmap

> Last updated: 2026-02-26
> Stack: Next.js 16 · TypeScript · Tailwind v4 · GSAP · VAPI
> Strategy: "Digital Donut" — value-first personalized demo, no pitch until they're impressed.

---

## Legend
- ✅ Complete
- ⚠️ Partial / needs fix
- 🔲 Not started
- 🔗 Depends on another phase

---

## The Full Digital Donut Flow

```
[You] Find leaking-lead businesses (no chat, no after-hours)
         ↓
[You] Pull lead list (Outscraper → name, website, phone, email)
         ↓
[Auto] Qualify: does their site have a chat widget? Do they answer after hours?
         ↓
[You] Send outreach: "I noticed you're missing leads... built something for you"
         ↓
[Auto] Scrape their website → build AI knowledge base → create VAPI assistant
         ↓
[Auto] Generate personalized demo URL → send via email (Resend)
         ↓
[Prospect] Opens link → sees their own site in iPhone → chats with Emma → calls Yasmine
         ↓
[Prospect] Scrolls down → books "AI Impact Assessment" with your agency
         ↓
[You] Close the deal on the call
```

---

## Phase 0 — Foundation ✅

| Task | Status |
|------|--------|
| Next.js 16 App Router + TypeScript + Tailwind v4 | ✅ |
| Midnight Luxe design system (Obsidian, Champagne, Ivory, Slate) | ✅ |
| GSAP animations (all SSR-safe, context + cleanup) | ✅ |
| Bilingual EN/FR via `LanguageContext` + `translations.ts` | ✅ |
| Landing page: Hero, Features, Philosophy, Protocol (sticky-stack), Pricing, Contact, Footer | ✅ |
| Demo route `/demo/[id]` with `notFound()` fallback | ✅ |
| Static prospect registry `src/lib/prospects.ts` | ✅ |

---

## Phase 1 — Demo Engine (Digital Donut Core) ✅ / ⚠️

> Goal: Prospect opens the link → sees their website → talks to AI → books a call.

| Task | Status | Notes |
|------|--------|-------|
| iPhone mockup frame with fake browser chrome | ✅ | macOS traffic lights, URL bar |
| Iframe detection API (`GET /api/check-url`) | ✅ | Checks `X-Frame-Options` + CSP |
| Screenshot fallback via thum.io | ✅ | Always works, no auth needed |
| Chat widget "Emma" (UI + UX) | ✅ | Opens inside phone frame |
| Chat widget — real AI responses | ⚠️ | **Currently simulated** — needs VAPI chat or equivalent |
| Voice AI "Yasmine" via VAPI SDK | ✅ | Real calls, waveform, states |
| VAPI graceful degradation (simulation mode) | ✅ | Works without keys |
| Booking CTA at bottom of demo page | ⚠️ | **Lead form exists but no calendar booking link** |
| Lead form data goes somewhere (CRM/Supabase) | ⚠️ | **Currently discarded — not saved** |
| Live prospect: Legal Plus `/demo/legalplus` | ✅ | `legalplus.ma` |
| VAPI system prompt applied (Yasmine) | ⚠️ | **Must apply manually in VAPI dashboard** |

### Immediate fixes needed in Phase 1

1. **Booking CTA**: Add Calendly (or equivalent) embed/link as primary CTA — this is the *closing mechanism*
2. **Lead form**: Wire to an API route that saves to Supabase or posts to a webhook (GHL/n8n)
3. **VAPI dashboard**: Manually apply Yasmine / Legal Plus system prompt

---

## Phase 1.5 — Demo Page Fixes 🔲

> Small but critical changes to match the original strategy's closing flow.

| Task | Status | Notes |
|------|--------|-------|
| Add booking section (Calendly or cal.com embed) | 🔲 | Primary CTA — "Book your AI Impact Assessment" |
| Wire lead form to API route (`POST /api/capture-lead`) | 🔲 | Save to Supabase or n8n webhook |
| Improve ChatWidget to use real AI (VAPI chat or GPT fallback) | 🔲 | Phase 2A Firecrawl content feeds this |
| Add prospect phone number field to `Prospect` type | 🔲 | For outreach tracking |

---

## Phase 2 — Automation Pipeline 🔲

### 2A · Firecrawl — Website Knowledge Base 🔲

**What it does**: Scrapes prospect's website → clean markdown → becomes the AI's brain.
This replaces the "drop URL into Custom GPT" step from the video.

| Task | Status |
|------|--------|
| Install `@mendable/firecrawl-js` | 🔲 |
| `POST /api/scrape-prospect` — scrape URL → return markdown | 🔲 |
| Store scraped content (file cache or Supabase) | 🔲 |
| Inject scraped content into VAPI system prompt (auto-personalized) | 🔲 |
| Feed scraped content to ChatWidget for real responses | 🔲 |

**Env var**: `FIRECRAWL_API_KEY` → [firecrawl.dev](https://firecrawl.dev)

---

### 2B · Supabase — Database 🔲

**What it does**: Replaces static `prospects.ts`. Add prospects without touching code.
Equivalent to GoHighLevel contact records from the video — but you own the data.

| Task | Status |
|------|--------|
| Create Supabase project | 🔲 |
| `prospects` table (mirrors current `Prospect` interface + scraped content + assistantId) | 🔲 |
| `leads` table (captures name, email, prospect_id, timestamp) | 🔲 |
| Replace `getProspect()` / `getAllProspects()` with Supabase queries | 🔲 |
| Save lead form submissions to `leads` table | 🔲 |

**Env vars**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

---

### 2C · VAPI Auto-Create — Per-Prospect Assistants 🔲

**What it does**: Instead of one shared assistant, auto-creates a unique VAPI assistant per prospect.
Equivalent to "paste custom GPT prompt → get ADID" from the video — but fully automated.

| Task | Status |
|------|--------|
| `POST /api/create-assistant` — call VAPI REST API to create assistant | 🔲 |
| Build system prompt dynamically from Firecrawl content (2A) | 🔲 |
| Store returned `assistantId` back to Supabase (2B) | 🔲 |

**Env var**: `VAPI_PRIVATE_KEY`
**Depends on**: 2A + 2B

---

### 2D · Resend — Personalized Demo Emails 🔲

**What it does**: Sends the prospect a branded email linking to `/demo/{id}`.
Equivalent to the GHL automation that triggers when the ADID is saved.

| Task | Status |
|------|--------|
| Install `resend` SDK | 🔲 |
| Design HTML email: prospect name, business name, screenshot preview, CTA button | 🔲 |
| `POST /api/send-demo-email` | 🔲 |
| Trigger manually (button in admin UI) or via n8n webhook | 🔲 |

**Env var**: `RESEND_API_KEY` → [resend.com](https://resend.com)

---

## Phase 2E · Lead Sourcing Pipeline 🔲

**What it does**: Replaces Outscraper from the video. Pull targeted lists of local businesses.
This is Phase 1 of the video's prospecting process.

| Task | Status | Notes |
|------|--------|-------|
| Choose lead source tool | 🔲 | Options: Outscraper, Apollo, Google Maps API, PhantomBuster |
| Export CSV: business name, website, phone, email, category, location | 🔲 | |
| Bulk import into Supabase `prospects` table | 🔲 | Via admin UI or CSV import |
| Automated chat widget detection per prospect | 🔲 | Firecrawl scrape → check for LiveChat/Intercom/Drift |
| After-hours verification flag | 🔲 | Manual or via VAPI test call |
| Outreach message template | 🔲 | "I noticed you're missing leads..." |

---

## Phase 3 — n8n Full Automation Pipeline 🔲

> Goal: Add a prospect URL → everything else is automatic within minutes.

| Task | Status |
|------|--------|
| n8n workflow: Webhook → Firecrawl scrape → VAPI create assistant → save to Supabase → send Resend email | 🔲 |
| Prospect status tracking: `imported → scraped → assistant_created → emailed → demo_viewed → lead_captured → booked` | 🔲 |
| VAPI call log webhook → save call duration + transcript to Supabase | 🔲 |
| Notification when prospect views demo (page visit tracking) | 🔲 |
| Notification when prospect submits lead form | 🔲 |

---

## Phase 4 — Production & Scale 🔲

| Task | Status |
|------|--------|
| Deploy to Vercel | 🔲 |
| Custom domain + SSL | 🔲 |
| SEO metadata (production URLs, og:image with prospect name) | 🔲 |
| Analytics (PostHog or Vercel Analytics) | 🔲 |
| Multi-language expansion (Arabic for Moroccan market) | 🔲 |
| Admin dashboard — manage prospects, view lead submissions, track status | 🔲 |

---

## Tool Mapping: Video vs. Our Stack

| Video Tool | Our Equivalent | Status |
|---|---|---|
| Outscraper (lead lists) | Outscraper / Apollo / Google Maps API | 🔲 Phase 2E |
| GoHighLevel (CRM) | Supabase + n8n | 🔲 Phase 2B + 3 |
| GHL automation (chat widget detection) | n8n + Firecrawl | 🔲 Phase 2E + 3 |
| Custom GPT from URL | Firecrawl + Claude API | 🔲 Phase 2A |
| Bot Mockups (ADID) | VAPI assistant ID | ✅ Phase 1 |
| GHL ADID custom field | Supabase `prospects` table | 🔲 Phase 2B |
| GHL email trigger | n8n + Resend | 🔲 Phase 2D + 3 |
| iPhone mockup frame | `DemoClient.tsx` PhoneFrame | ✅ Phase 1 |
| Emma (chat AI, knows business) | ChatWidget → needs real AI | ⚠️ Phase 1.5 |
| Jenna / voice AI (knows business) | VAPI Yasmine | ✅ Phase 1 |
| Booking form at bottom | Lead form exists → add Calendly | ⚠️ Phase 1.5 |

---

## Recommended Build Order

```
⚠️  Fix Phase 1 manual step (VAPI dashboard system prompt)
         ↓
🔲  Phase 1.5 — Booking CTA + lead form API route   ← do this next, closes the loop
         ↓
🔲  Phase 2D — Resend email                          ← start pitching immediately
         ↓
🔲  Phase 2E — Lead sourcing                         ← build the prospect pipeline
         ↓
🔲  Phase 2A — Firecrawl                             ← make demos business-specific
         ↓
🔲  Phase 2B — Supabase                              ← scale the data layer
         ↓
🔲  Phase 2C — VAPI auto-create                      ← full per-prospect assistants
         ↓
🔲  Phase 3  — n8n pipeline                          ← hands-off automation
         ↓
🔲  Phase 4  — Production deploy
```

---

## Environment Variables — Full Reference

| Variable | Phase | Source |
|----------|-------|--------|
| `NEXT_PUBLIC_VAPI_PUBLIC_KEY` | 1 ✅ | dashboard.vapi.ai → Account → API Keys |
| `VAPI_PRIVATE_KEY` | 2C | dashboard.vapi.ai → Account → API Keys |
| `FIRECRAWL_API_KEY` | 2A | firecrawl.dev → Dashboard |
| `NEXT_PUBLIC_SUPABASE_URL` | 2B | supabase.com → Project → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 2B | supabase.com → Project → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | 2B | supabase.com → Project → Settings → API |
| `RESEND_API_KEY` | 2D | resend.com → API Keys |
| `CALENDLY_URL` (or cal.com slug) | 1.5 | Your booking page |
