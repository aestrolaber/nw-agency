// Prospect data store — maps prospect-id to their website URL + bot configuration
// Replace entries with real prospect data. In production, move to Supabase.

export interface Prospect {
    id: string;
    businessName: string;
    websiteUrl: string;
    agentName: string;       // Chat agent display name
    voiceAgentName: string;  // Voice agent name (spoken in UI)
    category: string;
    /**
     * VAPI assistant ID — created in your VAPI dashboard.
     * Phase 2: auto-create a unique assistant per prospect via the VAPI API.
     */
    vapiAssistantId?: string;
    /** @deprecated use vapiAssistantId */
    botId?: string;
}

// Shared VAPI assistant ID (configured in VAPI dashboard with Yasmine / Legal Plus prompt)
const VAPI_ASSISTANT_ID = "17abb985-c6ac-43bc-80bc-0f0da39e20be";

const prospects: Record<string, Prospect> = {
    // ── Live demo prospect ──────────────────────────────────────────
    legalplus: {
        id: "legalplus",
        businessName: "Legal Plus",
        websiteUrl: "https://legalplus.ma",
        agentName: "Yasmine",
        voiceAgentName: "Yasmine",
        category: "Legal Services · Casablanca",
        vapiAssistantId: VAPI_ASSISTANT_ID,
    },

    // ── Template prospects (swap in real data when pitching) ────────
    sample: {
        id: "sample",
        businessName: "Smith Roofing Co.",
        websiteUrl: "https://example.com",
        agentName: "Emma",
        voiceAgentName: "Emma",
        category: "Home Services",
        vapiAssistantId: VAPI_ASSISTANT_ID,
    },
    demo1: {
        id: "demo1",
        businessName: "Downtown Dental",
        websiteUrl: "https://example.com",
        agentName: "Emma",
        voiceAgentName: "Emma",
        category: "Healthcare",
        vapiAssistantId: VAPI_ASSISTANT_ID,
    },
    demo2: {
        id: "demo2",
        businessName: "Premier Auto Spa",
        websiteUrl: "https://example.com",
        agentName: "Emma",
        voiceAgentName: "Emma",
        category: "Automotive",
        vapiAssistantId: VAPI_ASSISTANT_ID,
    },
};

export function getProspect(id: string): Prospect | null {
    return prospects[id] ?? null;
}

export function getAllProspects(): Prospect[] {
    return Object.values(prospects);
}
