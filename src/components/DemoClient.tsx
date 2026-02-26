"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Phone, PhoneOff, ArrowRight, ExternalLink, Loader2, Calendar } from "lucide-react";
import type { Prospect } from "@/lib/prospects";
import { useLanguage } from "@/context/LanguageContext";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type CallStatus = "idle" | "connecting" | "active";

// Minimal VAPI surface we need (loaded dynamically to avoid SSR issues)
type VapiInstance = {
    start: (assistantIdOrConfig: string | object) => Promise<void>;
    stop: () => void;
    on: (event: string, cb: (...args: unknown[]) => void) => void;
    off: (event: string, cb: (...args: unknown[]) => void) => void;
};

type ChatMessage = {
    from: "user" | "agent";
    text: string;
};

type HistoryEntry = {
    role: "user" | "assistant";
    content: string;
};

/* ─────────────────────────────────────────────
   Chat widget — powered by Anthropic via /api/chat
───────────────────────────────────────────── */
function ChatWidget({ prospect }: { prospect: Prospect }) {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [sending, setSending] = useState(false);

    const greeting = (t.demo.chatGreeting as string)
        .replace("{name}", prospect.agentName)
        .replace("{business}", prospect.businessName);

    const [messages, setMessages] = useState<ChatMessage[]>([
        { from: "agent", text: greeting },
    ]);

    // Full conversation history passed to the API for multi-turn context
    const historyRef = useRef<HistoryEntry[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Reset when language or prospect changes
    useEffect(() => {
        const newGreeting = (t.demo.chatGreeting as string)
            .replace("{name}", prospect.agentName)
            .replace("{business}", prospect.businessName);
        setMessages([{ from: "agent", text: newGreeting }]);
        historyRef.current = [];
    }, [t, prospect.agentName, prospect.businessName]);

    const send = useCallback(async () => {
        const text = input.trim();
        if (!text || sending) return;

        setInput("");
        setSending(true);
        setMessages((prev) => [...prev, { from: "user", text }]);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: text,
                    prospectId: prospect.id,
                    history: historyRef.current,
                }),
            });

            const data = await res.json();
            const reply: string = data.reply ?? "...";

            // Update history for next turn
            historyRef.current = [
                ...historyRef.current,
                { role: "user", content: text },
                { role: "assistant", content: reply },
            ];

            setMessages((prev) => [...prev, { from: "agent", text: reply }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { from: "agent", text: "Je suis momentanément indisponible. Veuillez réessayer." },
            ]);
        } finally {
            setSending(false);
        }
    }, [input, sending, prospect.id]);

    return (
        <>
            {/* Chat bubble button */}
            <button
                onClick={() => setOpen(true)}
                className="absolute bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-200 hover:scale-110"
                style={{ background: "#C9A84C", zIndex: 20 }}
            >
                <MessageCircle size={22} style={{ color: "#0D0D12" }} />
            </button>

            {open && (
                <div
                    className="absolute inset-0 flex flex-col rounded-[2.5rem] overflow-hidden"
                    style={{ background: "#0D0D12", zIndex: 30 }}
                >
                    {/* Header */}
                    <div
                        className="flex items-center justify-between px-5 pt-6 pb-4"
                        style={{ background: "#2A2A35", borderBottom: "1px solid rgba(201,168,76,0.12)" }}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-9 h-9 rounded-full flex items-center justify-center font-heading text-sm font-bold"
                                style={{ background: "#C9A84C", color: "#0D0D12" }}
                            >
                                {prospect.agentName[0]}
                            </div>
                            <div>
                                <div className="font-heading text-sm" style={{ color: "#FAF8F5" }}>
                                    {prospect.agentName}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" />
                                    <span className="font-mono text-xs" style={{ color: "rgba(250,248,245,0.4)" }}>
                                        {t.demo.chatOnline} · {prospect.businessName}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setOpen(false)} style={{ color: "rgba(250,248,245,0.5)" }}>
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 no-scrollbar">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${msg.from === "agent" ? "self-start" : "self-end"}`}
                                style={{
                                    background: msg.from === "agent" ? "rgba(42,42,53,0.8)" : "rgba(201,168,76,0.15)",
                                    color: msg.from === "agent" ? "#FAF8F5" : "#C9A84C",
                                    border: `1px solid ${msg.from === "agent" ? "rgba(201,168,76,0.08)" : "rgba(201,168,76,0.2)"}`,
                                }}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {/* Typing indicator */}
                        {sending && (
                            <div
                                className="self-start max-w-[80%] rounded-2xl px-4 py-3"
                                style={{ background: "rgba(42,42,53,0.8)", border: "1px solid rgba(201,168,76,0.08)" }}
                            >
                                <div className="flex gap-1 items-center h-4">
                                    {[0, 1, 2].map((i) => (
                                        <span
                                            key={i}
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{
                                                background: "rgba(201,168,76,0.5)",
                                                animation: `pulse-dot 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 flex gap-2" style={{ borderTop: "1px solid rgba(201,168,76,0.08)" }}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                            placeholder={t.demo.chatInput}
                            disabled={sending}
                            className="flex-1 rounded-2xl px-4 py-2.5 text-xs outline-none disabled:opacity-50"
                            style={{
                                background: "rgba(42,42,53,0.6)",
                                border: "1px solid rgba(201,168,76,0.12)",
                                color: "#FAF8F5",
                            }}
                        />
                        <button
                            onClick={send}
                            disabled={sending || !input.trim()}
                            className="w-10 h-10 rounded-2xl flex items-center justify-center transition-transform hover:scale-110 disabled:opacity-40"
                            style={{ background: "#C9A84C" }}
                        >
                            {sending ? (
                                <Loader2 size={14} className="animate-spin" style={{ color: "#0D0D12" }} />
                            ) : (
                                <Send size={14} style={{ color: "#0D0D12" }} />
                            )}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

/* ─────────────────────────────────────────────
   iPhone frame — shows website or screenshot fallback
───────────────────────────────────────────── */
function PhoneFrame({ prospect, canEmbed }: { prospect: Prospect; canEmbed: boolean | null }) {
    const screenshotUrl = `https://image.thum.io/get/noanimate/width/390/crop/668/${prospect.websiteUrl}`;

    return (
        <div
            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
            style={{
                width: "320px",
                height: "620px",
                background: "#1a1a25",
                border: "8px solid #2A2A35",
                boxShadow: "0 0 80px rgba(201,168,76,0.12), 0 40px 80px rgba(0,0,0,0.6)",
                flexShrink: 0,
            }}
        >
            {/* Notch */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 rounded-b-2xl z-10"
                style={{ background: "#2A2A35" }}
            />

            {/* Fake browser bar */}
            <div
                className="absolute top-5 left-0 right-0 flex items-center gap-2 px-4 py-1.5 z-10"
                style={{ background: "rgba(13,13,18,0.92)", borderBottom: "1px solid rgba(201,168,76,0.06)" }}
            >
                <div className="flex gap-1">
                    {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                        <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                    ))}
                </div>
                <div
                    className="flex-1 rounded-full px-3 py-1 font-mono text-[9px] truncate"
                    style={{ background: "rgba(42,42,53,0.7)", color: "rgba(250,248,245,0.4)" }}
                >
                    🔒 {prospect.websiteUrl.replace(/^https?:\/\//, "")}
                </div>
                <a
                    href={prospect.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0"
                    style={{ color: "rgba(201,168,76,0.5)" }}
                >
                    <ExternalLink size={10} />
                </a>
            </div>

            {/* Content area */}
            <div className="absolute top-14 left-0 right-0 bottom-0">
                {canEmbed === null && (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: "#0D0D12" }}>
                        <Loader2 size={24} className="animate-spin" style={{ color: "#C9A84C" }} />
                    </div>
                )}

                {canEmbed === true && (
                    <iframe
                        src={prospect.websiteUrl}
                        className="w-full h-full"
                        style={{ border: "none" }}
                        title={`${prospect.businessName} website`}
                        sandbox="allow-scripts allow-same-origin allow-forms"
                    />
                )}

                {canEmbed === false && (
                    <div className="w-full h-full overflow-hidden relative">
                        <img
                            src={screenshotUrl}
                            alt={`${prospect.businessName} website preview`}
                            className="w-full object-cover object-top"
                            style={{ minHeight: "100%" }}
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = "none";
                                const el = e.currentTarget.nextElementSibling as HTMLElement | null;
                                if (el) el.style.display = "flex";
                            }}
                        />
                        {/* Ultra-fallback */}
                        <div
                            className="w-full h-full flex-col items-center justify-center gap-3 p-6 text-center"
                            style={{ display: "none", background: "#0D0D12" }}
                        >
                            <div className="font-mono text-xs uppercase tracking-widest" style={{ color: "#C9A84C" }}>
                                Live Site
                            </div>
                            <div className="font-heading text-base" style={{ color: "#FAF8F5" }}>
                                {prospect.businessName}
                            </div>
                            <div className="font-mono text-xs" style={{ color: "rgba(250,248,245,0.35)" }}>
                                {prospect.websiteUrl.replace(/^https?:\/\//, "")}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Chat widget overlay */}
            <ChatWidget prospect={prospect} />
        </div>
    );
}

/* ─────────────────────────────────────────────
   Animated waveform bars
───────────────────────────────────────────── */
function VoiceWave({ speaking }: { speaking: boolean }) {
    return (
        <div className="flex items-end gap-1 h-10">
            {[0.5, 0.8, 1.0, 0.7, 0.4].map((base, i) => (
                <div
                    key={i}
                    className="w-2 rounded-full"
                    style={{
                        background: "#C9A84C",
                        height: speaking ? `${base * 36}px` : "6px",
                        transition: `height ${0.25 + i * 0.05}s ease-in-out`,
                        animation: speaking
                            ? `pulse-dot ${0.5 + i * 0.12}s ease-in-out infinite alternate`
                            : "none",
                    }}
                />
            ))}
        </div>
    );
}

/* ─────────────────────────────────────────────
   Main DemoClient
───────────────────────────────────────────── */
export default function DemoClient({ prospect }: { prospect: Prospect }) {
    const { t } = useLanguage();

    // Iframe embed check
    const [canEmbed, setCanEmbed] = useState<boolean | null>(null);

    // VAPI call state
    const [callStatus, setCallStatus] = useState<CallStatus>("idle");
    const [agentSpeaking, setAgentSpeaking] = useState(false);
    const vapiRef = useRef<VapiInstance | null>(null);

    // Lead form
    const [leadSubmitted, setLeadSubmitted] = useState(false);
    const [leadSending, setLeadSending] = useState(false);
    const [lead, setLead] = useState({ name: "", email: "" });

    /* ── Check if URL allows iframing ── */
    useEffect(() => {
        fetch(`/api/check-url?url=${encodeURIComponent(prospect.websiteUrl)}`)
            .then((r) => r.json())
            .then(({ canEmbed }) => setCanEmbed(Boolean(canEmbed)))
            .catch(() => setCanEmbed(false));
    }, [prospect.websiteUrl]);

    /* ── Init VAPI Web SDK ── */
    useEffect(() => {
        const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
        if (!publicKey || !prospect.vapiAssistantId) return;

        let vapi: VapiInstance;
        const onCallStart = () => setCallStatus("active");
        const onCallEnd = () => { setCallStatus("idle"); setAgentSpeaking(false); };
        const onSpeechStart = () => setAgentSpeaking(true);
        const onSpeechEnd = () => setAgentSpeaking(false);
        const onError = (e: unknown) => {
            console.error("[VAPI error]", e);
            setCallStatus("idle");
            setAgentSpeaking(false);
        };

        const init = async () => {
            const { default: Vapi } = await import("@vapi-ai/web");
            vapi = new Vapi(publicKey) as unknown as VapiInstance;
            vapi.on("call-start", onCallStart);
            vapi.on("call-end", onCallEnd);
            vapi.on("speech-start", onSpeechStart);
            vapi.on("speech-end", onSpeechEnd);
            vapi.on("error", onError);
            vapiRef.current = vapi;
        };

        init().catch(console.error);

        return () => {
            if (vapi) {
                vapi.off("call-start", onCallStart);
                vapi.off("call-end", onCallEnd);
                vapi.off("speech-start", onSpeechStart);
                vapi.off("speech-end", onSpeechEnd);
                vapi.off("error", onError);
                vapi.stop();
            }
        };
    }, [prospect.vapiAssistantId]);

    /* ── Call button handler ── */
    const handleCallToggle = useCallback(async () => {
        if (callStatus === "active" || callStatus === "connecting") {
            vapiRef.current?.stop();
            setCallStatus("idle");
            setAgentSpeaking(false);
            return;
        }

        if (!vapiRef.current || !prospect.vapiAssistantId) {
            // Simulation mode
            setCallStatus("active");
            setAgentSpeaking(true);
            setTimeout(() => setAgentSpeaking(false), 2500);
            setTimeout(() => setCallStatus("idle"), 9000);
            return;
        }

        setCallStatus("connecting");
        try {
            await vapiRef.current.start(prospect.vapiAssistantId);
        } catch (e) {
            console.error("[VAPI] start failed:", e);
            setCallStatus("idle");
        }
    }, [callStatus, prospect.vapiAssistantId]);

    /* ── Lead form submit ── */
    const handleLeadSubmit = useCallback(async (e: { preventDefault(): void }) => {
        e.preventDefault();
        setLeadSending(true);
        try {
            await fetch("/api/capture-lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...lead, prospectId: prospect.id }),
            });
        } catch {
            // Silent — lead is still logged server-side
        } finally {
            setLeadSending(false);
            setLeadSubmitted(true);
        }
    }, [lead, prospect.id]);

    const isVapiLive = !!process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY && !!prospect.vapiAssistantId;
    const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

    return (
        <div className="min-h-screen flex flex-col items-center py-8 px-4" style={{ background: "#0D0D12" }}>

            {/* Top bar */}
            <div className="w-full max-w-2xl mb-8 flex items-center justify-between">
                <a href="/" className="font-heading text-2xl" style={{ color: "#FAF8F5" }}>
                    nw<span style={{ color: "#C9A84C" }}>.</span>
                </a>
                {!isVapiLive && (
                    <span
                        className="font-mono text-xs px-3 py-1 rounded-full"
                        style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", color: "rgba(201,168,76,0.7)" }}
                    >
                        Demo mode
                    </span>
                )}
            </div>

            {/* Intro banner */}
            <div
                className="w-full max-w-2xl rounded-3xl p-6 mb-8 text-center"
                style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}
            >
                <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: "#C9A84C" }}>
                    {t.demo.badge}
                </div>
                <h1 className="font-heading text-2xl md:text-3xl mb-2" style={{ color: "#FAF8F5" }}>
                    {t.demo.heading}{" "}
                    <span style={{ color: "#C9A84C" }}>{prospect.businessName}</span>
                </h1>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(250,248,245,0.55)" }}>
                    {t.demo.subheading}
                </p>
            </div>

            {/* ── iPhone frame ── */}
            <PhoneFrame prospect={prospect} canEmbed={canEmbed} />

            {/* ── Voice AI section ── */}
            <div
                className="w-full max-w-2xl rounded-3xl p-8 mt-8"
                style={{ background: "rgba(42,42,53,0.4)", border: "1px solid rgba(201,168,76,0.1)" }}
            >
                <div className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "#C9A84C" }}>
                    {t.demo.voiceBadge}
                </div>
                <h2 className="font-heading text-xl mb-2" style={{ color: "#FAF8F5" }}>
                    {(t.demo.voiceHeading as string).replace("{name}", prospect.voiceAgentName)}
                </h2>
                <p className="text-sm mb-6" style={{ color: "rgba(250,248,245,0.5)" }}>
                    {(t.demo.voiceSubheading as string)
                        .replace("{name}", prospect.voiceAgentName)
                        .replace("{business}", prospect.businessName)}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <button
                        onClick={handleCallToggle}
                        disabled={callStatus === "connecting"}
                        className="btn-magnetic px-8 py-4 rounded-2xl flex-shrink-0 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{
                            background: callStatus === "active" ? "rgba(239,68,68,0.15)" : "#C9A84C",
                            color: callStatus === "active" ? "#ef4444" : "#0D0D12",
                            border: callStatus === "active" ? "1px solid rgba(239,68,68,0.3)" : "none",
                            fontWeight: 600,
                        }}
                    >
                        {callStatus === "connecting" ? (
                            <><Loader2 size={16} className="animate-spin" /> Connecting…</>
                        ) : callStatus === "active" ? (
                            <><PhoneOff size={16} /> {t.demo.voiceEnd}</>
                        ) : (
                            <><Phone size={16} /> {(t.demo.voiceCall as string).replace("{name}", prospect.voiceAgentName)}</>
                        )}
                    </button>

                    {callStatus !== "idle" && (
                        <div className="flex items-center gap-4">
                            <VoiceWave speaking={agentSpeaking} />
                            <span className="font-mono text-xs" style={{ color: "#C9A84C" }}>
                                {callStatus === "connecting"
                                    ? "Dialing…"
                                    : agentSpeaking
                                    ? (t.demo.voiceActive as string).replace("{name}", prospect.voiceAgentName)
                                    : "Listening…"}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 mt-5">
                    <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: isVapiLive ? "#4ade80" : "#C9A84C" }}
                    />
                    <p className="font-mono text-xs" style={{ color: "rgba(250,248,245,0.25)" }}>
                        {isVapiLive
                            ? `Live AI · ${prospect.voiceAgentName} · ${prospect.category}`
                            : `Simulation mode · Add VAPI keys to go live`}
                    </p>
                </div>
            </div>

            {/* ── Booking CTA ── */}
            <div
                className="w-full max-w-2xl rounded-3xl p-8 mt-6"
                style={{
                    background: "linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.04) 100%)",
                    border: "1px solid rgba(201,168,76,0.25)",
                }}
            >
                <div className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "#C9A84C" }}>
                    Prochaine étape · Next Step
                </div>
                <h2 className="font-heading text-2xl mb-3" style={{ color: "#FAF8F5" }}>
                    Impressionné ? Réservez votre{" "}
                    <span style={{ color: "#C9A84C" }}>AI Impact Assessment</span>
                </h2>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(250,248,245,0.55)" }}>
                    Un appel de 15 minutes pour voir exactement comment cette IA peut capturer et convertir
                    les prospects de <strong style={{ color: "#FAF8F5" }}>{prospect.businessName}</strong> — 24h/24, 7j/7.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    {bookingUrl ? (
                        <a
                            href={bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-magnetic btn-primary px-8 py-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-semibold"
                        >
                            <span className="btn-bg" />
                            <Calendar size={16} className="relative z-10" />
                            <span className="relative z-10">Réserver un créneau gratuit</span>
                            <ArrowRight size={16} className="relative z-10" />
                        </a>
                    ) : (
                        <div
                            className="px-8 py-4 rounded-2xl flex items-center gap-2 text-sm font-mono"
                            style={{ background: "rgba(201,168,76,0.08)", border: "1px dashed rgba(201,168,76,0.3)", color: "rgba(201,168,76,0.5)" }}
                        >
                            <Calendar size={16} />
                            Add NEXT_PUBLIC_BOOKING_URL to .env.local
                        </div>
                    )}
                </div>
            </div>

            {/* ── Lead capture ── */}
            <div
                className="w-full max-w-2xl rounded-3xl p-8 mt-6 mb-8"
                style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)" }}
            >
                {leadSubmitted ? (
                    <div className="text-center py-4">
                        <div className="font-drama text-3xl mb-2" style={{ color: "#C9A84C" }}>
                            {t.contact.successTitle}
                        </div>
                        <p className="font-mono text-sm" style={{ color: "rgba(250,248,245,0.5)" }}>
                            {t.contact.successBody}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "#C9A84C" }}>
                            {t.demo.leadBadge}
                        </div>
                        <h2 className="font-heading text-xl mb-6" style={{ color: "#FAF8F5" }}>
                            {t.demo.leadHeading}
                        </h2>
                        <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                            <input
                                required
                                placeholder={t.demo.leadNamePrefix}
                                value={lead.name}
                                onChange={(e) => setLead({ ...lead, name: e.target.value })}
                                className="rounded-2xl px-4 py-3 text-sm outline-none"
                                style={{
                                    background: "rgba(13,13,18,0.6)",
                                    border: "1px solid rgba(201,168,76,0.15)",
                                    color: "#FAF8F5",
                                }}
                            />
                            <input
                                required
                                type="email"
                                placeholder={t.demo.leadEmailPrefix}
                                value={lead.email}
                                onChange={(e) => setLead({ ...lead, email: e.target.value })}
                                className="rounded-2xl px-4 py-3 text-sm outline-none"
                                style={{
                                    background: "rgba(13,13,18,0.6)",
                                    border: "1px solid rgba(201,168,76,0.15)",
                                    color: "#FAF8F5",
                                }}
                            />
                            <button
                                type="submit"
                                disabled={leadSending}
                                className="btn-magnetic btn-primary py-4 rounded-2xl text-sm disabled:opacity-60"
                            >
                                <span className="btn-bg" />
                                <span className="relative z-10">
                                    {leadSending ? "Envoi…" : t.demo.leadCta}
                                </span>
                                {leadSending
                                    ? <Loader2 size={16} className="relative z-10 animate-spin" />
                                    : <ArrowRight size={16} className="relative z-10" />}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
