# nw. Agency Platform — Project Handover

> Last updated: 2026-02-26
> See [ROADMAP.md](./ROADMAP.md) for the full phased plan.

---

## Project Overview

- **Brand**: nw. (Obsidian & Champagne Luxury Aesthetic)
- **Framework**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **Animations**: GSAP 3 + ScrollTrigger (all SSR-safe via dynamic imports)
- **AI Voice**: VAPI (`@vapi-ai/web` v2.5.2)
- **Core Engine**: "Digital Donut" — prospects receive a personalized email link → open a page showing their own website inside an iPhone mockup with a live AI voice/chat agent overlay.

---

## Design System — Midnight Luxe

| Token | Value | Usage |
|-------|-------|-------|
| Obsidian | `#0D0D12` | Primary background |
| Champagne | `#C9A84C` | Accent, CTAs, highlights |
| Slate | `#2A2A35` | Section backgrounds |
| Ivory | `#FAF8F5` | Primary text |
| Font (heading) | Inter | All UI text |
| Font (drama) | Playfair Display italic | Hero dramatic lines |
| Font (mono) | JetBrains Mono | Code / metrics |

---

## Architecture

```
src/
├── app/
│   ├── page.tsx                    # Landing page (Navbar + all sections)
│   ├── layout.tsx                  # Root layout + LanguageContext provider
│   ├── demo/[id]/page.tsx          # Personalized demo route
│   └── api/
│       └── check-url/route.ts      # Server-side iframe detection
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx                    # GSAP stagger + metric badges
│   ├── Features.tsx
│   ├── Philosophy.tsx              # Scroll-reveal manifesto
│   ├── Protocol.tsx                # GEMINI sticky-stacking cards (300vh)
│   ├── Pricing.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── DemoClient.tsx              # iPhone mockup + VAPI voice agent
├── context/
│   └── LanguageContext.tsx         # EN/FR language toggle
└── lib/
    ├── translations.ts             # All UI strings in EN + FR
    └── prospects.ts                # Prospect registry (Phase 2: move to Supabase)
```

---

## Key Files

### `src/lib/prospects.ts`
Static registry of demo prospects. Each entry maps a slug (`/demo/{id}`) to:
- `businessName`, `websiteUrl`, `agentName`, `voiceAgentName`, `category`
- `vapiAssistantId` — the VAPI assistant that handles calls for this prospect

To add a new prospect, add an entry to the `prospects` object and restart dev server.

### `src/components/DemoClient.tsx`
The "Digital Donut" client component. It:
1. Calls `GET /api/check-url?url={websiteUrl}` to detect if the site can be iframed
2. Shows an `<iframe>` if embeddable, or a `thum.io` screenshot if not
3. Initializes the VAPI SDK (dynamic import, SSR-safe)
4. Manages call states: `idle → connecting → active`
5. Falls back to simulation mode if `NEXT_PUBLIC_VAPI_PUBLIC_KEY` or `vapiAssistantId` is missing

### `src/app/api/check-url/route.ts`
Server-side HEAD request to a URL. Returns `{ canEmbed: boolean }` by inspecting:
- `X-Frame-Options: DENY | SAMEORIGIN`
- `Content-Security-Policy: frame-ancestors 'none' | 'self'`

### `src/lib/translations.ts`
Single source of truth for all UI text. Both `en` and `fr` keys must be kept in sync — TypeScript enforces this via the `AnyTranslation` type.

---

## Live Prospects

| Slug | Business | Demo URL | VAPI Assistant |
|------|----------|----------|----------------|
| `legalplus` | Legal Plus | `/demo/legalplus` | `17abb985-c6ac-43bc-80bc-0f0da39e20be` |
| `sample` | Smith Roofing Co. | `/demo/sample` | shared |
| `demo1` | Downtown Dental | `/demo/demo1` | shared |
| `demo2` | Premier Auto Spa | `/demo/demo2` | shared |

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in values.

| Variable | Required | Status |
|----------|----------|--------|
| `NEXT_PUBLIC_VAPI_PUBLIC_KEY` | Phase 1 | ✅ Set |
| `VAPI_PRIVATE_KEY` | Phase 2C | 🔲 |
| `FIRECRAWL_API_KEY` | Phase 2A | 🔲 |
| `NEXT_PUBLIC_SUPABASE_URL` | Phase 2B | 🔲 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Phase 2B | 🔲 |
| `SUPABASE_SERVICE_ROLE_KEY` | Phase 2B | 🔲 |
| `RESEND_API_KEY` | Phase 2D | 🔲 |

---

## Running the Project

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000
# → http://localhost:3000/demo/legalplus

# Type check
npx tsc --noEmit

# Build for production
npm run build
```

---

## GSAP Rules (enforce these always)

1. All GSAP imports are dynamic: `const gsap = (await import("gsap")).default`
2. Every `useEffect` with GSAP creates a context: `const ctx = gsap.context(() => { ... }, ref)`
3. Every `useEffect` returns cleanup: `return () => ctx.revert()`
4. Never call hooks inside `.map()` — declare individual named refs at component top level

---

## Pending Manual Action

Before the Legal Plus demo is fully live:
1. Go to [dashboard.vapi.ai](https://dashboard.vapi.ai)
2. Open assistant `17abb985-c6ac-43bc-80bc-0f0da39e20be`
3. Paste the Yasmine / Legal Plus system prompt (FR/AR/EN, legal services)
4. Save and test at `http://localhost:3000/demo/legalplus`

---

## What's Next

See [ROADMAP.md](./ROADMAP.md) for the full phased plan. Short version:

1. **2D Resend** — personalized email delivery (highest business value, start pitching)
2. **2A Firecrawl** — per-prospect website scraping for AI knowledge base
3. **2B Supabase** — DB migration for scale
4. **2C VAPI auto-create** — unique assistant per prospect
5. **Phase 3 n8n** — full hands-off automation pipeline
