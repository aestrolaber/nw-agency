/**
 * POST /api/capture-lead
 * Saves a lead captured from the demo page.
 *
 * Body: { name: string; email: string; prospectId: string }
 * Response: { ok: true }
 *
 * Phase 1.5: Forwards to LEAD_WEBHOOK_URL if set (n8n, webhook.site, GHL, etc.)
 * Phase 2B: Will save to Supabase `leads` table instead.
 */
export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    if (!body?.name || !body?.email || !body?.prospectId) {
        return Response.json({ error: "invalid_request" }, { status: 400 });
    }

    const { name, email, prospectId } = body as {
        name: string;
        email: string;
        prospectId: string;
    };

    const payload = {
        name,
        email,
        prospectId,
        source: "demo_page",
        capturedAt: new Date().toISOString(),
    };

    // Always log server-side (visible in dev server logs and Vercel logs)
    console.log("[lead captured]", payload);

    // Forward to webhook if configured (n8n, Make, webhook.site, GHL, etc.)
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
        try {
            await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        } catch (err) {
            console.error("[capture-lead] Webhook delivery failed:", err);
            // Don't fail the request — lead is still logged above
        }
    }

    return Response.json({ ok: true });
}
