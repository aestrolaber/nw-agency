"use client";
import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const metrics = [
    { value: "24/7", label: "Always On" },
    { value: "< 48h", label: "Go Live" },
    { value: "3.2×", label: "Avg. ROI" },
];

export default function Hero() {
    const { t } = useLanguage();
    const heroRef = useRef<HTMLElement>(null);
    const textRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        let cleanup: (() => void) | undefined;
        const init = async () => {
            const { gsap } = await import("gsap");
            const ctx = gsap.context(() => {
                // Main text stagger
                const els = textRefs.current.filter(Boolean);
                gsap.fromTo(
                    els,
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.1, delay: 0.3 }
                );
                // Floating metric badges
                gsap.fromTo(
                    ".hero-metric",
                    { x: 30, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.12, delay: 1.1 }
                );
                // Decorative line
                gsap.fromTo(
                    ".hero-divider",
                    { scaleX: 0, opacity: 0 },
                    { scaleX: 1, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.85, transformOrigin: "left center" }
                );
            }, heroRef);
            cleanup = () => ctx.revert();
        };
        init();
        return () => cleanup?.();
    }, []);

    const addRef = (el: HTMLElement | null, i: number) => { textRefs.current[i] = el; };

    return (
        <section
            id="hero"
            ref={heroRef}
            className="relative w-full overflow-hidden"
            style={{ height: "100dvh", minHeight: "700px" }}
        >
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80')",
                    transform: "scale(1.04)",
                }}
            />

            {/* Gradient overlays */}
            <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, #0D0D12 0%, rgba(13,13,18,0.9) 50%, rgba(13,13,18,0.5) 100%)" }}
            />
            <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(100deg, rgba(13,13,18,0.98) 0%, rgba(13,13,18,0.6) 55%, rgba(13,13,18,0.15) 100%)" }}
            />

            {/* Champagne radial glow — top center */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 70% 40% at 30% 100%, rgba(201,168,76,0.07) 0%, transparent 70%)",
                }}
            />

            {/* Decorative grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(201,168,76,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.035) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                    maskImage: "linear-gradient(to right, transparent, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.6) 70%, transparent)",
                }}
            />

            {/* Main content — bottom left */}
            <div className="absolute bottom-0 left-0 w-full lg:w-3/4 px-8 pb-20 md:px-16 md:pb-24">
                {/* Badge */}
                <div
                    ref={(el) => addRef(el as HTMLElement, 0)}
                    className="inline-flex items-center gap-2 mb-8 opacity-0"
                >
                    <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "#C9A84C" }} />
                    <span className="font-mono text-xs tracking-[0.28em] uppercase" style={{ color: "#C9A84C" }}>
                        {t.hero.badge}
                    </span>
                </div>

                {/* Headline */}
                <h1 className="mb-2 leading-none">
                    <span
                        ref={(el) => addRef(el as HTMLElement, 1)}
                        className="block font-heading opacity-0"
                        style={{
                            color: "#FAF8F5",
                            fontSize: "clamp(3rem, 7vw, 5.5rem)",
                            letterSpacing: "-0.045em",
                        }}
                    >
                        {t.hero.line1}
                    </span>
                    <span
                        ref={(el) => addRef(el as HTMLElement, 2)}
                        className="block font-drama opacity-0"
                        style={{
                            color: "#C9A84C",
                            lineHeight: 1.05,
                            fontSize: "clamp(4rem, 11vw, 9rem)",
                        }}
                    >
                        {t.hero.line2}
                    </span>
                </h1>

                {/* Thin divider */}
                <div
                    className="hero-divider w-20 h-px mb-8 opacity-0"
                    style={{ background: "rgba(201,168,76,0.45)" }}
                />

                {/* Body */}
                <p
                    ref={(el) => addRef(el as HTMLElement, 3)}
                    className="text-base md:text-lg max-w-lg leading-relaxed mb-10 opacity-0"
                    style={{ color: "rgba(250,248,245,0.58)" }}
                >
                    {t.hero.body}
                </p>

                {/* CTAs */}
                <div
                    ref={(el) => addRef(el as HTMLElement, 4)}
                    className="flex flex-col sm:flex-row gap-4 opacity-0"
                >
                    <a href="#contact" className="btn-magnetic btn-primary text-base px-8 py-4">
                        <span className="btn-bg" />
                        <span>{t.hero.cta1}</span>
                        <ArrowRight size={16} className="relative z-10" />
                    </a>
                    <a href="/demo/legalplus" className="btn-magnetic btn-outline text-base px-8 py-4">
                        <span className="btn-bg" />
                        <span>{t.hero.cta2}</span>
                    </a>
                </div>
            </div>

            {/* Floating metrics — right side, desktop only */}
            <div className="absolute top-1/2 right-10 md:right-16 -translate-y-1/2 hidden md:flex flex-col gap-3">
                {metrics.map((m, i) => (
                    <div
                        key={i}
                        className="hero-metric opacity-0 rounded-2xl px-6 py-4"
                        style={{
                            background: "rgba(13,13,18,0.65)",
                            border: "1px solid rgba(201,168,76,0.18)",
                            backdropFilter: "blur(16px)",
                            minWidth: "130px",
                        }}
                    >
                        <div
                            className="font-heading text-2xl"
                            style={{ color: "#C9A84C", letterSpacing: "-0.03em" }}
                        >
                            {m.value}
                        </div>
                        <div
                            className="font-mono text-xs uppercase tracking-widest mt-1"
                            style={{ color: "rgba(250,248,245,0.4)" }}
                        >
                            {m.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2" style={{ opacity: 0.35 }}>
                <span className="font-mono text-xs" style={{ color: "#FAF8F5" }}>{t.hero.scroll}</span>
                <ChevronDown size={14} className="animate-bounce" style={{ color: "#C9A84C" }} />
            </div>
        </section>
    );
}
