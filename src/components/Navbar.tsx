"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
    const { lang, setLang, t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const navLinks = [
        { label: t.nav.services, href: "#services" },
        { label: t.nav.about, href: "#about" },
        { label: t.nav.demo, href: "/demo/legalplus" },
        { label: t.nav.contact, href: "#contact" },
    ];

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
            style={{ pointerEvents: "none" }}
        >
            <div
                className="flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full transition-all duration-500"
                style={{
                    pointerEvents: "all",
                    background: scrolled ? "rgba(13,13,18,0.75)" : "transparent",
                    backdropFilter: scrolled ? "blur(24px)" : "none",
                    border: scrolled ? "1px solid rgba(201,168,76,0.15)" : "1px solid transparent",
                    boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.4)" : "none",
                }}
            >
                {/* Logo */}
                <Link
                    href="/"
                    className="font-heading text-xl tracking-tight"
                    style={{ color: scrolled ? "#C9A84C" : "#FAF8F5" }}
                >
                    nw<span style={{ color: "#C9A84C" }}>.</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="font-mono text-sm transition-all duration-200 hover:-translate-y-px"
                            style={{ color: scrolled ? "#FAF8F5" : "rgba(250,248,245,0.8)" }}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Right side: Language toggle + CTA */}
                <div className="hidden md:flex items-center gap-3">
                    {/* EN / FR Toggle */}
                    <button
                        onClick={() => setLang(lang === "en" ? "fr" : "en")}
                        className="relative flex items-center rounded-full p-0.5 transition-all duration-300"
                        style={{
                            background: "rgba(42,42,53,0.8)",
                            border: "1px solid rgba(201,168,76,0.25)",
                            width: "72px",
                            height: "32px",
                        }}
                        aria-label="Toggle language"
                    >
                        {/* Sliding pill */}
                        <span
                            className="absolute top-0.5 bottom-0.5 rounded-full transition-all duration-300"
                            style={{
                                width: "34px",
                                background: "#C9A84C",
                                left: lang === "en" ? "2px" : "calc(100% - 36px)",
                            }}
                        />
                        <span
                            className="relative z-10 font-mono text-xs font-bold transition-colors duration-300 w-1/2 text-center"
                            style={{ color: lang === "en" ? "#0D0D12" : "rgba(250,248,245,0.5)" }}
                        >
                            EN
                        </span>
                        <span
                            className="relative z-10 font-mono text-xs font-bold transition-colors duration-300 w-1/2 text-center"
                            style={{ color: lang === "fr" ? "#0D0D12" : "rgba(250,248,245,0.5)" }}
                        >
                            FR
                        </span>
                    </button>

                    <a
                        href="#contact"
                        className="btn-magnetic btn-primary text-sm px-5 py-2"
                    >
                        <span className="btn-bg" />
                        <span>{t.nav.cta}</span>
                    </a>
                </div>

                {/* Mobile: lang toggle + hamburger */}
                <div className="md:hidden flex items-center gap-3">
                    <button
                        onClick={() => setLang(lang === "en" ? "fr" : "en")}
                        className="font-mono text-xs font-bold px-3 py-1.5 rounded-full"
                        style={{
                            background: "rgba(42,42,53,0.8)",
                            border: "1px solid rgba(201,168,76,0.25)",
                            color: "#C9A84C",
                        }}
                    >
                        {lang === "en" ? "FR" : "EN"}
                    </button>
                    <button
                        onClick={() => setOpen(!open)}
                        className="p-2 rounded-xl"
                        style={{ color: "#FAF8F5" }}
                    >
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div
                    className="absolute top-20 left-4 right-4 rounded-3xl p-6 flex flex-col gap-4"
                    style={{
                        pointerEvents: "all",
                        background: "rgba(13,13,18,0.95)",
                        backdropFilter: "blur(24px)",
                        border: "1px solid rgba(201,168,76,0.15)",
                    }}
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="font-mono text-sm py-2 border-b border-slate-800"
                            style={{ color: "#FAF8F5" }}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a href="#contact" className="btn-magnetic btn-primary mt-2">
                        <span className="btn-bg" />
                        <span>{t.nav.cta}</span>
                    </a>
                </div>
            )}
        </nav>
    );
}
