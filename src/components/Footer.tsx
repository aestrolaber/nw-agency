"use client";
import { useLanguage } from "@/context/LanguageContext";

const footerHrefs = [
    ["#services", "#about", "#process", "#pricing"],
    ["/demo/legalplus", "#demo", "#demo", "#"],
    ["#", "#", "#"],
];

export default function Footer() {
    const { t } = useLanguage();
    const cols = t.footer.cols as { title: string; links: string[] }[];

    return (
        <footer className="relative" style={{ background: "#0D0D12", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
            <div className="rounded-t-[4rem] px-8 py-16 max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="font-heading text-3xl mb-3" style={{ color: "#FAF8F5" }}>
                            nw<span style={{ color: "#C9A84C" }}>.</span>
                        </div>
                        <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(250,248,245,0.4)" }}>
                            {t.footer.tagline}
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full pulse-dot" style={{ background: "#4ade80" }} />
                            <span className="font-mono text-xs" style={{ color: "rgba(250,248,245,0.4)" }}>
                                {t.footer.status}
                            </span>
                        </div>
                    </div>

                    {/* Nav Columns */}
                    {cols.map((col, ci) => (
                        <div key={col.title}>
                            <div className="font-mono text-xs uppercase tracking-widest mb-5" style={{ color: "#C9A84C" }}>
                                {col.title}
                            </div>
                            <ul className="flex flex-col gap-3">
                                {col.links.map((link, li) => (
                                    <li key={link}>
                                        <a
                                            href={footerHrefs[ci]?.[li] ?? "#"}
                                            className="text-sm transition-all duration-200 hover:-translate-y-px"
                                            style={{ color: "rgba(250,248,245,0.45)" }}
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4" style={{ borderTop: "1px solid rgba(201,168,76,0.08)" }}>
                    <span className="font-mono text-xs" style={{ color: "rgba(250,248,245,0.25)" }}>
                        {t.footer.copyright}
                    </span>
                    <span className="font-mono text-xs" style={{ color: "rgba(250,248,245,0.25)" }}>
                        {t.footer.credit}
                    </span>
                </div>
            </div>
        </footer>
    );
}
