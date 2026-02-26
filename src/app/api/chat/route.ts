/**
 * POST /api/chat
 * Powers the ChatWidget inside the demo phone frame.
 * Uses GPT-4o-mini (fast + cheap) with the prospect's system prompt.
 *
 * Body: { message: string; prospectId: string; history: { role: "user"|"assistant"; content: string }[] }
 * Response: { reply: string }
 */
import OpenAI from "openai";
import { getProspect } from "@/lib/prospects";
import { getSystemPrompt } from "@/lib/prompts";

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    if (!body?.message || !body?.prospectId) {
        return Response.json({ error: "invalid_request" }, { status: 400 });
    }

    const { message, prospectId, history = [] } = body as {
        message: string;
        prospectId: string;
        history: { role: "user" | "assistant"; content: string }[];
    };

    const prospect = getProspect(prospectId);
    if (!prospect) {
        return Response.json({ error: "unknown_prospect" }, { status: 404 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return Response.json({
            reply: `Bonjour ! Je suis ${prospect.agentName} de ${prospect.businessName}. Pour configurer l'IA chat, ajoutez OPENAI_API_KEY dans .env.local.`,
        });
    }

    try {
        const client = new OpenAI({ apiKey });

        const systemPrompt = getSystemPrompt(prospectId, prospect.agentName, prospect.businessName);

        // Keep at most last 10 turns to stay within token limits
        const trimmedHistory = history.slice(-10);

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            max_tokens: 300,
            messages: [
                { role: "system", content: systemPrompt },
                ...trimmedHistory,
                { role: "user", content: message },
            ],
        });

        const reply = response.choices[0]?.message?.content ?? "...";
        return Response.json({ reply });
    } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        console.error("[/api/chat] OpenAI error:", errMsg);
        const isDev = process.env.NODE_ENV === "development";
        return Response.json(
            { reply: isDev ? `[debug] ${errMsg}` : "Je suis momentanément indisponible. Veuillez réessayer dans quelques instants." },
            { status: 500 }
        );
    }
}
