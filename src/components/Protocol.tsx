"use client";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

/* ── SVG Animations ── */
function HelixSVG() {
    return (
        <svg width="90" height="90" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="52" stroke="rgba(201,168,76,0.06)" strokeWidth="1" />
            <circle cx="60" cy="60" r="36" stroke="rgba(201,168,76,0.18)" strokeWidth="1">
                <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="8s" repeatCount="indefinite" />
            </circle>
            <circle cx="60" cy="60" r="18" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="5 4">
                <animateTransform attributeName="transform" type="rotate" from="360 60 60" to="0 60 60" dur="5s" repeatCount="indefinite" />
            </circle>
            <circle cx="60" cy="24" r="4.5" fill="#C9A84C" opacity="0.85">
                <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="8s" repeatCount="indefinite" />
            </circle>
            <circle cx="60" cy="96" r="3" fill="rgba(201,168,76,0.4)">
                <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="8s" repeatCount="indefinite" />
            </circle>
        </svg>
    );
}

function LaserSVG() {
    return (
        <svg width="90" height="90" viewBox="0 0 120 120" fill="none">
            {Array.from({ length: 5 }).map((_, row) =>
                Array.from({ length: 7 }).map((_, col) => (
                    <circle
                        key={`${row}-${col}`}
                        cx={10 + col * 17}
                        cy={28 + row * 16}
                        r="2.2"
                        fill="rgba(201,168,76,0.2)"
                    />
                ))
            )}
            <rect x="0" y="58" width="120" height="2.5" fill="url(#lg2)" opacity="0.9">
                <animateMotion path="M0,-55 V55" dur="2.8s" repeatCount="indefinite" />
            </rect>
            <defs>
                <linearGradient id="lg2" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#C9A84C" />
                    <stop offset="100%" stopColor="transparent" />
                </linearGradient>
            </defs>
        </svg>
    );
}

function WaveformSVG() {
    return (
        <svg width="120" height="50" viewBox="0 0 140 50" fill="none">
            <path
                d="M0,25 Q12,4 24,25 Q36,46 48,25 Q60,4 72,25 Q84,46 96,25 Q108,4 120,25 Q132,46 140,25"
                stroke="#C9A84C"
                strokeWidth="2"
                fill="none"
                strokeDasharray="240"
                strokeDashoffset="240"
            >
                <animate attributeName="stroke-dashoffset" from="240" to="0" dur="2s" repeatCount="indefinite" />
            </path>
            <path
                d="M0,25 Q12,13 24,25 Q36,37 48,25 Q60,13 72,25 Q84,37 96,25 Q108,13 120,25 Q132,37 140,25"
                stroke="rgba(201,168,76,0.12)"
                strokeWidth="1.5"
                fill="none"
            />
        </svg>
    );
}

export default function Protocol() {
    const { t } = useLanguage();

    /* Individual refs — avoids React hooks-in-loop lint warning */
    const sectionRef = useRef<HTMLElement>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const card0 = useRef<HTMLDivElement>(null);
    const card1 = useRef<HTMLDivElement>(null);
    const card2 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let cleanup: (() => void) | undefined;
        const init = async () => {
            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            const ctx = gsap.context(() => {
                const area = scrollAreaRef.current;

                /* === Phase 1: 0% → 33% — card1 slides in, card0 recedes === */
                gsap.fromTo(card1.current, { yPercent: 100 }, {
                    yPercent: 0,
                    ease: "none",
                    scrollTrigger: { trigger: area, start: "top top", end: "33% top", scrub: 1.5 },
                });
                gsap.to(card0.current, {
                    scale: 0.9, opacity: 0.45, filter: "blur(8px)", ease: "none",
                    scrollTrigger: { trigger: area, start: "top top", end: "33% top", scrub: 1.5 },
                });

                /* === Phase 2: 33% → 66% — card2 slides in, card1 recedes, card0 further === */
                gsap.fromTo(card2.current, { yPercent: 100 }, {
                    yPercent: 0,
                    ease: "none",
                    scrollTrigger: { trigger: area, start: "33% top", end: "66% top", scrub: 1.5 },
                });
                gsap.to(card1.current, {
                    scale: 0.9, opacity: 0.45, filter: "blur(8px)", ease: "none",
                    scrollTrigger: { trigger: area, start: "33% top", end: "66% top", scrub: 1.5 },
                });
                gsap.to(card0.current, {
                    scale: 0.82, opacity: 0.2, ease: "none",
                    scrollTrigger: { trigger: area, start: "33% top", end: "66% top", scrub: 1.5 },
                });
            }, sectionRef);

            cleanup = () => ctx.revert();
        };
        init();
        return () => cleanup?.();
    }, []);

    const steps = t.protocol.steps as { num: string; title: string; desc: string }[];
    const cardRefs = [card0, card1, card2];
    const svgs = [<HelixSVG key="helix" />, <LaserSVG key="laser" />, <WaveformSVG key="wave" />];

    /* Second and third cards get a subtle accent tint */
    const cardStyle = (i: number) => ({
        background: i === 1 ? "rgba(201,168,76,0.055)" : "rgba(30,30,40,0.85)",
        border: `1px solid ${i === 1 ? "rgba(201,168,76,0.28)" : "rgba(201,168,76,0.1)"}`,
        backdropFilter: "blur(24px)",
    });

    return (
        <section ref={sectionRef} style={{ background: "#0D0D12" }}>
            {/* ── Section Header ── */}
            <div className="px-8 pt-24 pb-20 md:px-16 max-w-6xl mx-auto">
                <div className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: "#C9A84C" }}>
                    {t.protocol.label}
                </div>
                <h2
                    className="font-heading"
                    style={{ color: "#FAF8F5", fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.04em" }}
                >
                    {t.protocol.heading1}{" "}
                    <span className="font-drama" style={{ color: "#C9A84C" }}>{t.protocol.heading2}</span>
                </h2>
            </div>

            {/* ── Sticky Scroll Area (300vh) ── */}
            <div ref={scrollAreaRef} style={{ height: "300vh" }}>
                <div
                    className="sticky top-0 overflow-hidden"
                    style={{ height: "100dvh" }}
                >
                    {cardRefs.map((ref, i) => (
                        <div
                            key={i}
                            ref={ref}
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                                zIndex: i + 1,
                                /* Cards 1 & 2 start off-screen below */
                                transform: i === 0 ? "none" : "translateY(100%)",
                                padding: "5rem 1.5rem 1.5rem",
                            }}
                        >
                            <div
                                className="w-full max-w-4xl rounded-[2.5rem] p-10 md:p-14"
                                style={cardStyle(i)}
                            >
                                {/* Card top row: step num + SVG */}
                                <div className="flex items-start justify-between mb-10">
                                    <span
                                        className="font-mono font-bold leading-none"
                                        style={{
                                            fontSize: "clamp(4.5rem, 10vw, 7rem)",
                                            color: "rgba(201,168,76,0.1)",
                                        }}
                                    >
                                        {steps[i].num}
                                    </span>
                                    <div style={{ opacity: 0.75 }}>{svgs[i]}</div>
                                </div>

                                {/* Title + description */}
                                <div className="max-w-2xl">
                                    <h3
                                        className="font-heading mb-5"
                                        style={{
                                            color: "#FAF8F5",
                                            fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                                            letterSpacing: "-0.035em",
                                        }}
                                    >
                                        {steps[i].title}
                                    </h3>
                                    <p
                                        className="leading-relaxed"
                                        style={{
                                            color: "rgba(250,248,245,0.55)",
                                            fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                                        }}
                                    >
                                        {steps[i].desc}
                                    </p>
                                </div>

                                {/* Step dots indicator */}
                                <div className="flex items-center gap-3 mt-12">
                                    {steps.map((_, pi) => (
                                        <div
                                            key={pi}
                                            className="rounded-full"
                                            style={{
                                                width: pi === i ? "2rem" : "0.45rem",
                                                height: "0.35rem",
                                                background: pi === i ? "#C9A84C" : "rgba(201,168,76,0.18)",
                                                transition: "width 0.3s ease",
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
