"use client";
import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Pricing() {
    const { t } = useLanguage();
    const tiers = t.pricing.tiers as {
        name: string; price: string; sub: string; desc: string; features: string[]; cta: string;
    }[];

    return (
        <section className="section" style={{ background: "#2A2A35" }}>
            <div className="max-w-6xl mx-auto">
                <div className="mb-16 text-center">
                    <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#C9A84C" }}>
                        {t.pricing.label}
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl" style={{ color: "#FAF8F5" }}>
                        {t.pricing.heading1}{" "}
                        <span className="font-drama" style={{ color: "#C9A84C" }}>{t.pricing.heading2}</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    {tiers.map((tier, idx) => {
                        const highlight = idx === 1;
                        return (
                            <div
                                key={tier.name}
                                className="rounded-3xl p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    background: highlight ? "#C9A84C" : "rgba(13,13,18,0.7)",
                                    border: highlight ? "none" : "1px solid rgba(201,168,76,0.12)",
                                    transform: highlight ? "scale(1.04)" : "scale(1)",
                                    boxShadow: highlight ? "0 20px 60px rgba(201,168,76,0.2)" : "none",
                                }}
                            >
                                <div>
                                    <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: highlight ? "#0D0D12" : "#C9A84C" }}>
                                        {tier.name}
                                    </div>
                                    <div className="flex items-end gap-1">
                                        <span className="font-heading text-5xl" style={{ color: highlight ? "#0D0D12" : "#FAF8F5" }}>{tier.price}</span>
                                        <span className="font-mono text-sm mb-2" style={{ color: highlight ? "rgba(13,13,18,0.6)" : "rgba(250,248,245,0.4)" }}>{tier.sub}</span>
                                    </div>
                                    <p className="text-sm mt-3 leading-relaxed" style={{ color: highlight ? "rgba(13,13,18,0.7)" : "rgba(250,248,245,0.5)" }}>{tier.desc}</p>
                                </div>
                                <ul className="flex flex-col gap-3">
                                    {tier.features.map((f) => (
                                        <li key={f} className="flex items-start gap-3 text-sm">
                                            <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: highlight ? "#0D0D12" : "#C9A84C" }} />
                                            <span style={{ color: highlight ? "#0D0D12" : "rgba(250,248,245,0.7)" }}>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a href="#contact" className="btn-magnetic mt-auto text-center py-3 rounded-2xl font-heading text-sm" style={{
                                    background: highlight ? "#0D0D12" : "rgba(201,168,76,0.1)",
                                    color: "#C9A84C",
                                    border: "1px solid rgba(201,168,76,0.3)",
                                }}>
                                    <span className="btn-bg" style={{ background: highlight ? "#2A2A35" : "#C9A84C" }} />
                                    <span>{tier.cta}</span>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
