// Prospect data store — maps prospect-id to their website URL + bot configuration
// Replace entries with real prospect data. In production, move to Supabase.

/**
 * market: determines which VAPI assistant (and therefore which voice) is used.
 *   "ma"   → Morocco: French + Darija  (voice: ar-MA-MounaNeural, transcriber: Azure ar-MA)
 *   "en"   → US / EU: English only     (voice: en-US-JennyNeural, transcriber: Deepgram nova-2)
 */
export type Market = "ma" | "en";

export interface Prospect {
    id: string;
    businessName: string;
    websiteUrl: string;
    agentName: string;       // Chat agent display name
    voiceAgentName: string;  // Voice agent name (spoken in UI)
    category: string;
    market: Market;
    /**
     * VAPI assistant ID — resolved automatically from market + env vars.
     * Override per-prospect only if you need a fully custom assistant.
     */
    vapiAssistantId?: string;
}

// ── VAPI assistant IDs — set in .env.local ────────────────────────────────
// Morocco (FR + Darija): voice = ar-MA-MounaNeural
const VAPI_ASSISTANT_MA = process.env.VAPI_ASSISTANT_ID_MA ?? "17abb985-c6ac-43bc-80bc-0f0da39e20be";
// English (US/EU): voice = en-US-JennyNeural
// Create this in VAPI dashboard then add VAPI_ASSISTANT_ID_EN to .env.local
const VAPI_ASSISTANT_EN = process.env.VAPI_ASSISTANT_ID_EN ?? "";

/** Returns the correct VAPI assistant ID for a given market. */
export function getAssistantId(market: Market): string {
    return market === "ma" ? VAPI_ASSISTANT_MA : VAPI_ASSISTANT_EN;
}

const prospects: Record<string, Prospect> = {
    // ── Live demo — Morocco ──────────────────────────────────────────
    legalplus: {
        id: "legalplus",
        businessName: "Legal Plus",
        websiteUrl: "https://legalplus.ma",
        agentName: "Yasmine",
        voiceAgentName: "Yasmine",
        category: "Legal Services · Casablanca",
        market: "ma",
    },

    // ── Template prospects — US/EN market ───────────────────────────
    sample: {
        id: "sample",
        businessName: "Smith Roofing Co.",
        websiteUrl: "https://example.com",
        agentName: "Emma",
        voiceAgentName: "Emma",
        category: "Home Services",
        market: "en",
    },
    demo1: {
        id: "demo1",
        businessName: "Downtown Dental",
        websiteUrl: "https://example.com",
        agentName: "Emma",
        voiceAgentName: "Emma",
        category: "Healthcare",
        market: "en",
    },
    demo2: {
        id: "demo2",
        businessName: "Premier Auto Spa",
        websiteUrl: "https://example.com",
        agentName: "Emma",
        voiceAgentName: "Emma",
        category: "Automotive",
        market: "en",
    },
};

export function getProspect(id: string): Prospect | null {
    const p = prospects[id];
    if (!p) return null;
    // Resolve vapiAssistantId from market if not explicitly overridden
    return { ...p, vapiAssistantId: p.vapiAssistantId ?? getAssistantId(p.market) };
}

export function getAllProspects(): Prospect[] {
    return Object.values(prospects);
}
