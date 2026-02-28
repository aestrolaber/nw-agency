/**
 * POST /api/capture-lead
 * Handles two form types:
 *   1. Landing page contact form  → { name, email, phone, business, url }
 *   2. Demo page "get my demo"    → { name, email, website, prospectId }
 *
 * Sends an email notification via Resend to LEAD_EMAIL.
 */
import { Resend } from "resend";

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);

    if (!body?.name || !body?.email) {
        return Response.json({ error: "invalid_request" }, { status: 400 });
    }

    // Detect which form submitted
    const isDemoRequest = !!body.prospectId;

    const payload = isDemoRequest
        ? {
              name: body.name as string,
              email: body.email as string,
              website: (body.website as string) || "—",
              prospectId: body.prospectId as string,
              source: "demo_page",
              capturedAt: new Date().toISOString(),
          }
        : {
              name: body.name as string,
              email: body.email as string,
              phone: (body.phone as string) || "—",
              business: (body.business as string) || "—",
              url: (body.url as string) || "—",
              source: "landing_page",
              capturedAt: new Date().toISOString(),
          };

    console.log("[lead captured]", payload);

    // ── Send email via Resend ──────────────────────────────
    const resendKey = process.env.RESEND_API_KEY;
    const leadEmail = process.env.LEAD_EMAIL;

    if (resendKey && leadEmail) {
        try {
            const resend = new Resend(resendKey);

            const subject = isDemoRequest
                ? `🎯 Demande de démo : ${body.name} (${body.website || "site non renseigné"})`
                : `🔥 Nouveau lead : ${body.business} (${body.name})`;

            const html = isDemoRequest
                ? `
                    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#0D0D12;color:#FAF8F5;border-radius:12px;">
                        <h2 style="color:#C9A84C;margin:0 0 8px;">Demande de démo personnalisée</h2>
                        <p style="color:rgba(250,248,245,0.5);margin:0 0 24px;font-size:13px;">Via la page démo — prospect intéressé</p>
                        <table style="width:100%;border-collapse:collapse;">
                            <tr>
                                <td style="padding:10px 0;color:rgba(250,248,245,0.5);width:140px;font-size:13px;">Prénom</td>
                                <td style="padding:10px 0;font-weight:600;">${body.name}</td>
                            </tr>
                            <tr style="border-top:1px solid rgba(201,168,76,0.1);">
                                <td style="padding:10px 0;color:rgba(250,248,245,0.5);font-size:13px;">Email</td>
                                <td style="padding:10px 0;"><a href="mailto:${body.email}" style="color:#C9A84C;">${body.email}</a></td>
                            </tr>
                            <tr style="border-top:1px solid rgba(201,168,76,0.1);">
                                <td style="padding:10px 0;color:rgba(250,248,245,0.5);font-size:13px;">Site web</td>
                                <td style="padding:10px 0;">${body.website ? `<a href="${body.website}" style="color:#C9A84C;">${body.website}</a>` : "—"}</td>
                            </tr>
                            <tr style="border-top:1px solid rgba(201,168,76,0.1);">
                                <td style="padding:10px 0;color:rgba(250,248,245,0.5);font-size:13px;">Demo vue</td>
                                <td style="padding:10px 0;">${body.prospectId}</td>
                            </tr>
                            <tr style="border-top:1px solid rgba(201,168,76,0.1);">
                                <td style="padding:10px 0;color:rgba(250,248,245,0.5);font-size:13px;">Reçu le</td>
                                <td style="padding:10px 0;">${new Date().toLocaleString("fr-MA", { timeZone: "Africa/Casablanca" })}</td>
                            </tr>
                        </table>
                        <div style="margin-top:32px;padding-top:24px;border-top:1px solid rgba(201,168,76,0.2);">
                            <a href="mailto:${body.email}?subject=Votre démo IA personnalisée — nw. Agency" style="display:inline-block;background:#C9A84C;color:#0D0D12;padding:12px 24px;border-radius:8px;font-weight:700;text-decoration:none;">
                                Contacter ${body.name} →
                            </a>
                        </div>
                    </div>`
                : `
                    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#0D0D12;color:#FAF8F5;border-radius:12px;">
                        <h2 style="color:#C9A84C;margin:0 0 8px;">Nouveau lead depuis le site</h2>
                        <p style="color:rgba(250,248,245,0.5);margin:0 0 24px;font-size:13px;">Via le formulaire d'accueil</p>
                        <table style="width:100%;border-collapse:collapse;">
                            <tr>
                                <td style="padding:10px 0;color:rgba(250,248,245,0.5);width:140px;font-size:13px;">Nom</td>
                                <td style="padding:10px 0;font-weight:600;">${body.name}</td>
                            </tr>
                            <tr style="border-top:1px solid rgba(201,168,76,0.1);">
                                <td style="padding:10px 0;color:rgba(250,248,245,0.5);font-size:13px;">Email</td>
                                <td style="padding:10px 0;"><a href="mailto:${body.email}" style="color:#C9A84C;">${body.email}</a></td>
                            </tr>
                            <tr style="border-top:1px solid rgba(201,168,76,0.1);">
                                <td style="padding:10px 0;color:rgba(250,248,245,0.5);font-size:13px;">Téléphone</td>
                                <td style="padding:10px 0;">${body.phone || "—"}</td>
                            </tr>
                            <tr style="border-top:1px solid rgba(201,168,76,0.1);">
                                <td style="padding:10px 0;color:rgba(250,248,245,0.5);font-size:13px;">Entreprise</td>
                                <td style="padding:10px 0;font-weight:600;">${body.business || "—"}</td>
                            </tr>
                            <tr style="border-top:1px solid rgba(201,168,76,0.1);">
                                <td style="padding:10px 0;color:rgba(250,248,245,0.5);font-size:13px;">Site web</td>
                                <td style="padding:10px 0;">${body.url ? `<a href="${body.url}" style="color:#C9A84C;">${body.url}</a>` : "—"}</td>
                            </tr>
                            <tr style="border-top:1px solid rgba(201,168,76,0.1);">
                                <td style="padding:10px 0;color:rgba(250,248,245,0.5);font-size:13px;">Reçu le</td>
                                <td style="padding:10px 0;">${new Date().toLocaleString("fr-MA", { timeZone: "Africa/Casablanca" })}</td>
                            </tr>
                        </table>
                        <div style="margin-top:32px;padding-top:24px;border-top:1px solid rgba(201,168,76,0.2);">
                            <a href="mailto:${body.email}?subject=Votre bilan IA gratuit — nw. Agency" style="display:inline-block;background:#C9A84C;color:#0D0D12;padding:12px 24px;border-radius:8px;font-weight:700;text-decoration:none;">
                                Répondre à ${body.name} →
                            </a>
                        </div>
                    </div>`;

            await resend.emails.send({
                from: "nw. Agency <onboarding@resend.dev>",
                to: leadEmail,
                subject,
                html,
            });
        } catch (err) {
            console.error("[capture-lead] Resend failed:", err);
        }
    } else {
        if (!resendKey) console.warn("[capture-lead] RESEND_API_KEY not set");
        if (!leadEmail) console.warn("[capture-lead] LEAD_EMAIL not set");
    }

    // ── Optional webhook forward ───────────────────────────
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
        try {
            await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        } catch (err) {
            console.error("[capture-lead] Webhook failed:", err);
        }
    }

    return Response.json({ ok: true });
}
