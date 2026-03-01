# nw. Agency — Product & Business Roadmap

> Strategy: **Digital Donut flywheel** — build a personalized demo for a prospect → send the link → they experience their own business with AI → they convert. Repeat at scale.

---

## PHASE 0 — Foundation ✅ DONE

All core infrastructure is live and production-ready.

### Platform
- [x] Next.js 16 app (App Router, TypeScript, Tailwind v4)
- [x] Bilingual system — FR / EN, language context, full translations
- [x] Landing page — Hero, Features, Philosophy, Protocol, Pricing, Contact, Footer
- [x] Demo page — personalized per-prospect via `/demo/[id]`
- [x] Phone frame mockup with live iframe / screenshot fallback
- [x] Chat widget powered by Anthropic (`/api/chat`)
- [x] Voice AI powered by VAPI Web SDK
- [x] Lead capture form with `canvas-confetti` success animation
- [x] Contact / booking form on main landing page
- [x] Smooth scroll bug fixed (chat stays inside phone frame)

### Architecture
- [x] `prospects.ts` — market-aware (`"ma" | "en"`), VAPI assistant ID auto-resolved per market
- [x] `prompts.ts` — per-prospect system prompts for chat AI
- [x] `translations.ts` — full FR + EN copy including all demo strings
- [x] `check-url` API — iframe embed detection per prospect
- [x] `capture-lead` API — lead collection endpoint
- [x] `.env.local` — `VAPI_ASSISTANT_ID_MA`, `VAPI_ASSISTANT_ID_EN`, `NEXT_PUBLIC_VAPI_PUBLIC_KEY`, `ANTHROPIC_API_KEY`, `NEXT_PUBLIC_BOOKING_URL`

### Morocco Focus (default)
- [x] FR as default language
- [x] MAD-only pricing (Chat 1 500 · Voix+Chat 2 200 · Automatisation complète 3 500)
- [x] Moroccan placeholders on contact form (Youssef Benali, +212…, votresite.ma)
- [x] French-only voice agent — non-French callers get contact collected → human followup
- [x] Voice pilot: OpenAI `nova` — upgrade path: ElevenLabs Charlotte (paid plan)
- [x] Transcriber: Deepgram `nova-2` / `multi` language

### First Prospect — Legal Plus (legalplus.ma)
- [x] Knowledge base scraped from legalplus.ma — corrected from generic law firm to legal tech SaaS
- [x] Chat system prompt: Yasmine, bilingual FR/EN responses, real services + products + contact
- [x] VAPI voice system prompt written (French-only + correct Legal Plus data)
- [x] Prospect entry in `prospects.ts` — market: `"ma"`, agentName: Yasmine, voiceAgentName: Yasmine

### Business Operations
- [x] `business/AUTO_ENTREPRENEUR.md` — Morocco AE registration, tax 2%, CNSS, plafond 500k MAD
- [x] `business/CONTRAT_PRESTATION.md` — French service contract template (10 articles + Annexe A)
- [x] `business/FACTURE_TEMPLATE.md` — Invoice template with nw. branding + Legal Plus pilot example
- [x] `business/PAIEMENT_GUIDE.md` — RIB, espèces, Wise, Payoneer, relance templates
- [x] `business/INTERNATIONAL_SALES.md` — US/EU niche strategy, $497/$997/$1997 pricing, cold email templates
- [x] `business/US_LLC_SETUP.md` — Wyoming LLC, EIN, Mercury bank, Stripe for non-residents
- [x] `business/CONTRACT_INTERNATIONAL_EN.md` — English service agreement for US/EU clients
- [x] `business/VoiceAIMarketResearch.md` — Perplexity research brief: ICP profile, 23 research Qs, MA + US niches

### Sales Tools
- [x] `public/roi.html` — interactive ROI calculator (sliders + real-time output) + embed snippet generator with live widget preview
- [x] `public/sawtia-test.html` — Sawtia Darija widget isolated test page + Web Audio mic diagnostic panel

### UX / Demo Improvements
- [x] Booking CTA section redesigned — full gold background, trust pills (100% Gratuit · Sans engagement · ROI garanti)
- [x] Lead form success — `canvas-confetti` burst animation on submit
- [x] Pricing hover bug fixed — dark sweep so gold text stays visible on dark cards
- [x] Darija feature added to Voix+Chat and Automatisation tiers (FR + EN translations)
- [x] Annual pricing toggle — 20% discount, savings badge, "facturé annuellement" sub-text
- [x] MAD-only pricing in both FR + EN (no more USD in EN version)
- [x] Navbar + Hero demo CTA links → `/demo/legalplus`
- [x] Footer all links functional — no more `#` dead-ends
- [x] Demo page disclaimer (removed false "avec son accord" claim)
- [x] Philosophy typo fixed ("Nous, nous nous" → "Nous, nous")
- [x] ROI calculator hidden from public footer — internal sales tool only
- [x] Contact form + demo lead form fully wired to API (POST → Resend email)
- [x] Cal.com replacing Calendly for booking

### ICP Pivot — Strategic Decision
> **Legal Plus is kept as a live demo asset only.** As a legal tech SaaS, they can build AI themselves — low close probability and wrong archetype.
>
> **Priority targets (high tech barrier + French clientele + high deal value):**
> 1. Cabinets dentaires — appointment booking after hours
> 2. Cliniques esthétiques — inquiry handling + booking
> 3. Agences immobilières haut de gamme — lead qualification + visit scheduling

### Darija Voice Supplier — Sawtia.ma
- [x] Pricing analyzed: Free (10 min) · Multilingue 279 MAD/agent/month · **Darija Native 379 MAD/agent/month** · Sur mesure
- [x] Margin confirmed: 379 MAD cost vs 2 200+ MAD charge = **83%+ gross margin**
- [ ] **White-label / reseller option** — contact Sawtia before integrating (critical gate)

---

## PHASE 1 — Pilot · Morocco · First Paying Client 🔄 IN PROGRESS

**Goal:** Close first paying client. Validate the full loop end-to-end.

> ⚠️ **ICP note:** Legal Plus kept as demo asset. Priority pivot to dental / clinique / immobilier. Whoever responds first becomes the first paying client.

### Technical (blockers — do before sending any demo link)
- [x] **Deploy to Vercel** — GitHub linked, auto-deploy on every `git push origin main`
- [x] **`NEXT_PUBLIC_BOOKING_URL`** — switched from Calendly to Cal.com (`cal.com/nw.-agency/30min`)
- [x] **`capture-lead` API** — Resend wired, leads arrive in inbox instantly (two templates: landing page + demo request)
- [ ] **VAPI dashboard** — switch voice from `nova` → Azure `fr-FR-BrigitteNeural` (or `fr-MA-JamalNeural`)
- [ ] **Cal.com** — add second event type: **15 min "Suivi rapide"** (for warm leads who watched the video)

### Demo Pipeline — Build & Send
- [ ] Build demo: **cabinet dentaire** (Casablanca/Rabat) — agent = appointment booking after hours
- [ ] Build demo: **clinique esthétique** — agent = inquiry + booking + FAQ
- [ ] Build demo: **agence immobilière** — agent = lead qualification + visit scheduling
- [ ] Send Legal Plus demo link (low priority — demo asset only, not primary close target)
- [ ] Outreach: 5 targeted businesses per niche with personalized demo link

### Sales Flow (per prospect)
- [ ] Send demo link → follow up within 24h — "Vous avez essayé d'appeler [agent name] ?"
- [ ] Discovery call — present ROI case using `roi.html` calculator live on screen
- [ ] Close on **Voix+Chat — 2 200 MAD/mois**
- [ ] Sign contract (`business/CONTRAT_PRESTATION.md`)
- [ ] Deploy widget on their site using embed snippet generator (`roi.html` → scroll down)
- [ ] Issue invoice month 1 (0 MAD pilot → month 2 full price)

### Sawtia Gate
- [ ] Contact Sawtia re: white-label/reseller → if yes, unlock Darija market immediately

### Success Signal
> First paying client live. Testimonial collected. Embed workflow validated end-to-end.

---

## PHASE 2 — Morocco Scale · 3–10 Clients

**Goal:** Systematize the Digital Donut. One new demo per day. 3+ paying clients in 60 days.

### Demo Factory Automation
- [ ] **Firecrawl integration** — `/api/scrape?url=X` → returns structured page content
- [ ] **Auto-prompt generator** — scrape → GPT-4o generates `prompts.ts` entry automatically
- [ ] **Admin route** `/admin/new-prospect` — form: business name + URL → prospect entry + prompt in < 2 min
- [ ] Target: demo build time **< 5 min per prospect** (down from ~30 min manual)

### Infrastructure
- [ ] **Supabase** — move prospects + leads from in-memory/file to database
  - `prospects` table — id, businessName, websiteUrl, agentName, market, vapiAssistantId, prompt
  - `leads` table — id, prospectId, name, email, website, createdAt
- [ ] **Resend** email — instant notification when a prospect submits the lead form
- [ ] **Calendly embed** — inline widget on demo page instead of external link

### Voice Improvements
- [ ] Per-prospect voice persona — different agent name + voice per client
- [ ] Darija/Arabic option — Azure `ar-MA-MounaNeural` (market `"ma"` already wired)
- [ ] ElevenLabs Charlotte upgrade for paying clients (French, professional, warm)

### Morocco Prospect Pipeline — Build These Demos Proactively
| Prospect Type | Hook | VAPI Agent |
|---|---|---|
| Cabinet dentaire (Casablanca/Rabat) | Appointment booking after hours | French voice |
| Agence immobilière | Property inquiries, visit scheduling | French voice |
| Cabinet d'avocat | Consultation booking, FAQ | French voice |
| Clinique / médecin généraliste | Appointment + triage | French voice |
| Auto-école | Enrollment + planning | French voice |
| E-commerce Maroc | Order support, returns | French + Darija |

### Success Signal
> 5 paying Moroccan clients. MRR ≥ 10 000 MAD.

---

## PHASE 3 — International Market · US / EU

**Goal:** Clone the Morocco playbook in English. Separate domain, USD pricing, EN voice agents.

### Separate Domain & Config
- [ ] New domain: `nwagency.com` (or `nw.agency`)
- [ ] EN default language on international domain
- [ ] USD pricing visible in EN (Chat $497 · Voice+Chat $997 · Full Automation $1 997)
- [ ] `VAPI_ASSISTANT_ID_EN` — new VAPI assistant, EN voice (en-US-JennyNeural or ElevenLabs)
- [ ] International contact form with USD / US placeholders

### US Market — Target Niches
Sourced from `business/INTERNATIONAL_SALES.md`:
| Niche | AI Use Case |
|---|---|
| Law firms | After-hours intake, consultation booking |
| Dental practices | New patient capture, appointment FAQ |
| Real estate agents | Lead qualification, showing scheduling |
| Home services (roofing, HVAC) | Quote requests, emergency calls |
| Chiropractic / wellness | New patient onboarding |

### Outreach
- [ ] Cold email sequence (templates in `business/INTERNATIONAL_SALES.md`)
- [ ] Apollo / Hunter.io for verified emails
- [ ] 20 personalized demo links/week
- [ ] LinkedIn for law firms + dental

### Legal & Payments (US)
- [ ] Wyoming LLC registered (`business/US_LLC_SETUP.md`)
- [ ] Stripe account active (USD)
- [ ] International contract live (`business/CONTRACT_INTERNATIONAL_EN.md`)

### Success Signal
> 3+ US clients. MRR ≥ $3 000 USD.

---

## PHASE 4 — Product Maturity

**Goal:** Less manual work. More leverage. Clients self-serve.

### Client Portal
- [ ] `/portal/[clientId]` — client sees their leads, call logs, performance metrics
- [ ] Lead history table (name, email, website, date captured)
- [ ] Monthly performance summary (leads captured, calls handled, bookings)
- [ ] Call transcript viewer (VAPI transcript API)

### Automation Workflows (n8n)
- [ ] Lead → CRM sync (HighLevel or HubSpot)
- [ ] Lead → SMS follow-up sequence (Twilio)
- [ ] Lead → WhatsApp message (Twilio or Meta API)
- [ ] Missed call → instant callback trigger
- [ ] Lead scoring from chat history (intent signals)

### CRM Integrations
- [ ] HighLevel (most common in agency space)
- [ ] HubSpot (mid-market US)
- [ ] Webhook-based (custom for non-standard CRMs)

### Reporting
- [ ] Monthly ROI dashboard — auto-generated email or PDF
- [ ] Chat history export per prospect
- [ ] Weekly lead digest (email digest to client)

---

## PHASE 5 — Scale & Leverage

**Goal:** System runs without you in delivery. Focus only on sales and strategy.

### Team
- [ ] First VA / appointment setter — outreach + DM follow-up
- [ ] Prompt engineer — per-client AI customization
- [ ] Part-time account manager — client success + upsells

### Productization
- [ ] Self-serve onboarding — client fills form → demo auto-built in < 1h
- [ ] White-label option — resellers deploy under their own brand
- [ ] Agency partner program — commission for referrals

### Revenue Targets
| Milestone | MRR | Clients | Market |
|-----------|-----|---------|--------|
| Phase 1 | 2 200 MAD | 1 | Morocco |
| Phase 2 | 15 000 MAD | 7 | Morocco |
| Phase 3 | $3 000 USD | 3 | US |
| Phase 4 | $10 000 USD | 10 | US + MA |
| Phase 5 | $30 000 USD | 30+ | Global |

---

## Tech Stack — Current & Planned

| Layer | Tool | Status |
|-------|------|--------|
| Frontend | Next.js 16, Tailwind v4, TypeScript | ✅ Done |
| Chat AI | Anthropic Claude (via `/api/chat`) | ✅ Done |
| Voice AI | VAPI Web SDK | ✅ Done |
| Voice MA | OpenAI `nova` → Azure `fr-FR-BrigitteNeural` | Phase 1 |
| Voice EN | ElevenLabs Charlotte / `en-US-JennyNeural` | Phase 3 |
| Database | In-memory → Supabase | Phase 2 |
| Email | — → Resend | Phase 1 |
| Scraping | — → Firecrawl | Phase 2 |
| Booking | External URL → Calendly embed | Phase 1 |
| Automation | — → n8n | Phase 4 |
| Payments MA | Virement / Wise / Payoneer | Phase 1 |
| Payments US | — → Stripe | Phase 3 |
| Hosting | Local → Vercel | Phase 1 |

---

## This Week — Immediate Next Actions

> Last updated: 2026-03-01

### ✅ Done since last update
- [x] Resend wired — leads from both forms arrive in inbox instantly
- [x] Cal.com replacing Calendly (`cal.com/nw.-agency/30min`)
- [x] Annual pricing toggle (−20%, savings display)
- [x] All footer links functional, ROI tool hidden from public
- [x] Demo page disclaimer cleaned up
- [x] Forms fully wired to API (landing page + demo request)
- [x] Pricing consistent in MAD for EN + FR
- [x] **Deployed to Vercel** — GitHub linked, auto-deploy active

### ✅ Blocker cleared
1. ~~**Deploy to Vercel**~~ → **DONE** — GitHub linked, live on Vercel, auto-deploys on every push

### 🔴 Remaining blocker
- **Add env vars to Vercel dashboard** → `RESEND_API_KEY`, `LEAD_EMAIL`, `NEXT_PUBLIC_BOOKING_URL`, `OPENAI_API_KEY`, `NEXT_PUBLIC_VAPI_PUBLIC_KEY`, `VAPI_ASSISTANT_ID_MA`
  - Vercel dashboard → Project → Settings → Environment Variables
  - Without these, forms and voice agent won't work in production

### 🟡 Revenue (this week)
2. **Record Loom demo video** — free, 15 min, no editing
   - Install Loom Chrome extension → screen-only mode
   - Open `localhost:3000/demo/legalplus`
   - Walk through: page → chat widget → voice call → booking CTA
   - Narrate in French: *"Voici exactement ce que vos clients verront…"*
   - Share link with prospects before calls → warm leads skip to 15-min call

3. **Add 15-min Cal.com event type** → "Suivi rapide — déjà regardé la démo ?"
   - Warm funnel: Loom video → 15-min call → close
   - Cold funnel: landing page → 30-min bilan → close

4. **Contact Sawtia** → white-label / reseller → if yes = Darija market unlocked

5. **Build 3 demos** → cabinet dentaire · clinique esthétique · agence immobilière
   - Add to `prospects.ts` + system prompts in `prompts.ts`

### 🟢 Quick wins (< 30 min each)
6. **VAPI dashboard** → switch voice `nova` → `fr-FR-BrigitteNeural`
7. **Cal.com profile** → update name to "nw. Agency" + add logo

### 🎬 Video — Later (after first client)
- **HeyGen** (~$29/mo) — AI avatar presents your demo, no camera needed
  - Use the FR video script prompt (saved in session notes) to generate the script
  - Warm funnel upgrade: HeyGen video on landing page → 15 min call → close
- **Arcade.so** — interactive click-through demo, great to send over WhatsApp
