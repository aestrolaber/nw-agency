"use client";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Philosophy() {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const line1Ref = useRef<HTMLParagraphElement>(null);
    const line2Ref = useRef<HTMLParagraphElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const init = async () => {
            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);
            const ctx = gsap.context(() => {
                /* Label fade-up */
                gsap.fromTo(labelRef.current, { y: 20, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
                    scrollTrigger: { trigger: labelRef.current, start: "top 80%" },
                });
                /* Word-by-word reveal */
                [line1Ref.current, line2Ref.current].forEach((el, i) => {
                    if (!el) return;
                    const words = el.querySelectorAll(".word");
                    gsap.fromTo(words, { y: 32, opacity: 0 }, {
                        y: 0, opacity: 1, duration: 0.75, ease: "power3.out", stagger: 0.045, delay: i * 0.25,
                        scrollTrigger: { trigger: el, start: "top 78%" },
                    });
                });
            }, sectionRef);
            return () => ctx.revert();
        };
        const cleanup = init();
        return () => { cleanup.then((fn) => fn?.()); };
    }, []);

    const wrapWords = (text: string) =>
        text.split(" ").map((word, i) => (
            <span key={i} className="word inline-block opacity-0 mr-[0.25em]">{word}</span>
        ));

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative section overflow-hidden"
            style={{ background: "#181820" }}
        >
            {/* Texture background */}
            <div
                className="absolute inset-0 bg-center bg-cover"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=60')",
                    opacity: 0.07,
                }}
            />

            {/* Champagne radial glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
                }}
            />

            {/* Decorative vertical rule */}
            <div
                className="absolute left-8 md:left-16 top-24 bottom-24 w-px"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.25), transparent)" }}
            />

            <div className="relative max-w-4xl mx-auto">
                {/* Label */}
                <div ref={labelRef} className="flex items-center gap-3 mb-14 opacity-0">
                    <div className="w-8 h-px" style={{ background: "#C9A84C" }} />
                    <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#C9A84C" }}>
                        {t.philosophy.label}
                    </span>
                </div>

                {/* First line — muted, smaller */}
                <p
                    ref={line1Ref}
                    className="font-heading mb-10"
                    style={{
                        color: "rgba(250,248,245,0.42)",
                        fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)",
                        lineHeight: 1.55,
                        letterSpacing: "-0.02em",
                    }}
                >
                    {wrapWords(t.philosophy.line1)}
                </p>

                {/* Second line — massive, dramatic */}
                <p
                    ref={line2Ref}
                    className="font-drama"
                    style={{
                        color: "#FAF8F5",
                        fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
                        lineHeight: 1.12,
                        letterSpacing: "-0.02em",
                    }}
                >
                    {wrapWords(t.philosophy.line2)}{" "}
                    <span className="shimmer-text">{t.philosophy.accent}</span>
                    {"  "}{wrapWords(t.philosophy.line3)}
                </p>
            </div>
        </section>
    );
}
