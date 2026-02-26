"use client";
import { useEffect, useRef, useState } from "react";
import { Activity, Zap, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/* ── Card 1: Diagnostic Shuffler ── */
function ShufflerCard() {
    const { t } = useLanguage();
    const stats = [t.features.card1.stat1, t.features.card1.stat2, t.features.card1.stat3];
    const shuffleData = [
        { stat: "$12,400 / mo", ...stats[0] },
        { stat: "67%", ...stats[1] },
        { stat: "3.2×", ...stats[2] },
    ];
    const [cards, setCards] = useState(shuffleData);

    // Re-sync when language changes
    useEffect(() => {
        setCards([
            { stat: "$12,400 / mo", ...stats[0] },
            { stat: "67%", ...stats[1] },
            { stat: "3.2×", ...stats[2] },
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [t]);

    useEffect(() => {
        const id = setInterval(() => {
            setCards((prev) => {
                const next = [...prev];
                const last = next.pop()!;
                next.unshift(last);
                return next;
            });
        }, 3000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="feature-card flex flex-col h-full min-h-[320px]">
            <div className="flex items-center gap-2 mb-6">
                <Activity size={16} style={{ color: "#C9A84C" }} />
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "#C9A84C" }}>
                    {t.features.card1.label}
                </span>
            </div>
            <p className="font-heading text-xl mb-6" style={{ color: "#FAF8F5" }}>{t.features.card1.title}</p>
            <div className="relative flex-1 flex flex-col gap-3">
                {cards.map((card, i) => (
                    <div
                        key={card.title}
                        className="rounded-2xl p-4 flex items-center justify-between transition-all duration-700"
                        style={{
                            background: i === 0 ? "rgba(201,168,76,0.12)" : "rgba(42,42,53,0.5)",
                            border: `1px solid ${i === 0 ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.05)"}`,
                            transform: i === 0 ? "scale(1.02)" : i === 1 ? "scale(0.98)" : "scale(0.95)",
                            opacity: i === 0 ? 1 : i === 1 ? 0.7 : 0.4,
                        }}
                    >
                        <div>
                            <div className="font-heading text-sm" style={{ color: "#FAF8F5" }}>{card.title}</div>
                            <div className="font-mono text-xs mt-0.5" style={{ color: "rgba(250,248,245,0.5)" }}>{card.sub}</div>
                        </div>
                        <div className="font-drama text-2xl" style={{ color: "#C9A84C" }}>{card.stat}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── Card 2: Telemetry Typewriter ── */
function TypewriterCard() {
    const { t } = useLanguage();
    const [lines, setLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const messages = t.features.card2.messages as string[];

    // Reset when language changes
    useEffect(() => {
        setLines([]);
        setCurrentLine(0);
        setCharIdx(0);
        setDisplayed("");
    }, [t]);

    useEffect(() => {
        const msg = messages[currentLine % messages.length];
        if (charIdx < msg.length) {
            const timer = setTimeout(() => {
                setDisplayed((p) => p + msg[charIdx]);
                setCharIdx((c) => c + 1);
            }, 35);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                setLines((prev) => [...prev.slice(-4), displayed]);
                setDisplayed("");
                setCharIdx(0);
                setCurrentLine((l) => l + 1);
            }, 900);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [charIdx, currentLine, t]);

    return (
        <div className="feature-card flex flex-col h-full min-h-[320px]">
            <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full pulse-dot" style={{ background: "#C9A84C" }} />
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "#C9A84C" }}>
                    {t.features.card2.label}
                </span>
            </div>
            <p className="font-heading text-xl mb-6" style={{ color: "#FAF8F5" }}>{t.features.card2.title}</p>
            <div className="flex-1 rounded-2xl p-4 font-mono text-xs flex flex-col justify-end gap-2" style={{ background: "rgba(13,13,18,0.7)", border: "1px solid rgba(201,168,76,0.08)" }}>
                {lines.map((line, i) => (
                    <div key={i} style={{ color: "rgba(250,248,245,0.45)" }}>{line}</div>
                ))}
                <div style={{ color: "#C9A84C" }}>
                    {displayed}<span className="cursor-blink">▮</span>
                </div>
            </div>
        </div>
    );
}

/* ── Card 3: Cursor Protocol Scheduler ── */
const days = ["S", "M", "T", "W", "T", "F", "S"];

function SchedulerCard() {
    const { t } = useLanguage();
    const [activeDay, setActiveDay] = useState<number | null>(null);
    const [saved, setSaved] = useState(false);
    const [pressing, setPressing] = useState(false);

    useEffect(() => {
        const run = async () => {
            for (let d = 1; d <= 5; d++) {
                await new Promise((r) => setTimeout(r, 700 * d));
                setActiveDay(d);
            }
            await new Promise((r) => setTimeout(r, 400));
            setPressing(true);
            await new Promise((r) => setTimeout(r, 200));
            setPressing(false);
            setSaved(true);
            await new Promise((r) => setTimeout(r, 2000));
            setActiveDay(null);
            setSaved(false);
        };
        run();
        const id = setInterval(run, 6000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="feature-card flex flex-col h-full min-h-[320px]">
            <div className="flex items-center gap-2 mb-6">
                <Calendar size={16} style={{ color: "#C9A84C" }} />
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "#C9A84C" }}>
                    {t.features.card3.label}
                </span>
            </div>
            <p className="font-heading text-xl mb-6" style={{ color: "#FAF8F5" }}>{t.features.card3.title}</p>
            <div className="flex-1 flex flex-col justify-center gap-6">
                <div className="flex gap-2 justify-between">
                    {days.map((d, i) => (
                        <div key={i} className="flex-1 aspect-square rounded-xl flex items-center justify-center font-mono text-sm font-bold transition-all duration-300" style={{
                            background: activeDay !== null && i <= activeDay ? "rgba(201,168,76,0.2)" : "rgba(42,42,53,0.5)",
                            border: `1px solid ${activeDay !== null && i === activeDay ? "#C9A84C" : activeDay !== null && i < activeDay ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.06)"}`,
                            color: activeDay !== null && i <= activeDay ? "#C9A84C" : "rgba(250,248,245,0.35)",
                            transform: activeDay !== null && i === activeDay ? "scale(1.1)" : "scale(1)",
                        }}>
                            {d}
                        </div>
                    ))}
                </div>
                <button className="btn-magnetic w-full py-3 rounded-2xl font-heading text-sm transition-all duration-200" style={{
                    background: saved ? "#C9A84C" : "rgba(201,168,76,0.1)",
                    color: saved ? "#0D0D12" : "#C9A84C",
                    border: "1px solid rgba(201,168,76,0.3)",
                    transform: pressing ? "scale(0.95)" : "scale(1)",
                }}>
                    <span>{saved ? t.features.card3.active : t.features.card3.deploy}</span>
                </button>
            </div>
        </div>
    );
}

/* ── Features Section ── */
export default function Features() {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const init = async () => {
            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);
            const ctx = gsap.context(() => {
                gsap.fromTo(titleRef.current, { y: 30, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
                    scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
                });
                gsap.fromTo(".feature-card", { y: 50, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.15,
                    scrollTrigger: { trigger: ".feature-card", start: "top 85%" },
                });
            }, sectionRef);
            return () => ctx.revert();
        };
        const cleanup = init();
        return () => { cleanup.then((fn) => fn?.()); };
    }, []);

    return (
        <section id="services" ref={sectionRef} className="section" style={{ background: "#0D0D12" }}>
            <div className="max-w-6xl mx-auto">
                <div ref={titleRef} className="mb-16 opacity-0">
                    <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#C9A84C" }}>
                        {t.features.label}
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl leading-tight" style={{ color: "#FAF8F5" }}>
                        {t.features.heading1}{" "}
                        <span className="font-drama" style={{ color: "#C9A84C" }}>{t.features.heading2}</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ShufflerCard />
                    <TypewriterCard />
                    <SchedulerCard />
                </div>
            </div>
        </section>
    );
}
