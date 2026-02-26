/**
 * GET /api/check-url?url=https://example.com
 * Server-side check: does the URL allow iframe embedding?
 * Inspects X-Frame-Options and Content-Security-Policy frame-ancestors.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
        return Response.json({ canEmbed: false, reason: "no_url" });
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const res = await fetch(url, {
            method: "HEAD",
            signal: controller.signal,
            headers: { "User-Agent": "Mozilla/5.0 (compatible; nw-demo-bot/1.0)" },
        });
        clearTimeout(timeoutId);

        const xfo = res.headers.get("x-frame-options")?.toLowerCase().trim() ?? "";
        const csp = res.headers.get("content-security-policy") ?? "";

        // X-Frame-Options: DENY or SAMEORIGIN blocks external embedding
        const blockedByXFO = xfo === "deny" || xfo === "sameorigin";

        // CSP frame-ancestors: 'none' or 'self' blocks external embedding
        const hasFrameAncestors = csp.toLowerCase().includes("frame-ancestors");
        const blockedByCSP =
            hasFrameAncestors &&
            (csp.includes("'none'") ||
                (csp.includes("'self'") && !csp.includes("*")));

        const canEmbed = !blockedByXFO && !blockedByCSP;
        return Response.json({ canEmbed, xfo, hasFrameAncestors });
    } catch {
        // Network error, timeout, or DNS failure — assume cannot embed
        return Response.json({ canEmbed: false, reason: "fetch_failed" });
    }
}
