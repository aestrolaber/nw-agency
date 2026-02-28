"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function formatMAD(n: number) {
    return n.toLocaleString("fr-MA").replace(/\s/g, "\u202f");
}

export default function Pricing() {
    const { t } = useLanguage();
    const [annual, setAnnual] = useState(false);
    const tiers = t.pricing.tiers as {
        name: string; price: string; sub: string; desc: string; features: string[]; cta: string;
    }[];

    // Parse base monthly price (remove non-digit chars), apply 20% annual discount
    function getPrice(rawPrice: string) {
        const monthly = parseInt(rawPrice.replace(/\D/g, ""), 10);
        if (annual) {
            const discounted = Math.round(monthly * 0.8);
            return formatMAD(discounted);
        }
        return formatMAD(monthly);
    }

    function getSub(rawSub: string) {
        // rawSub is like "MAD/mois" or "MAD/month"
        const perMonth = rawSub.includes("mois") ? "MAD/mois" : "MAD/month";
        return annual
            ? (rawSub.includes("mois") ? "MAD/mois, facturé annuellement" : "MAD/month, billed annually")
            : perMonth;
    }

    function getSavings(rawPrice: string) {
        const monthly = parseInt(rawPrice.replace(/\D/g, ""), 10);
        return formatMAD(monthly * 12 - Math.round(monthly * 0.8) * 12);
    }

    return (
        <section className="section" style={{ background: "#2A2A35" }}>
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center">
                    <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#C9A84C" }}>
                        {t.pricing.label}
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl mb-10" style={{ color: "#FAF8F5" }}>
                        {t.pricing.heading1}{" "}
                        <span className="font-drama" style={{ color: "#C9A84C" }}>{t.pricing.heading2}</span>
                    </h2>

                    {/* Billing toggle */}
                    <div className="inline-flex items-center gap-4 rounded-full px-2 py-2" style={{ background: "rgba(13,13,18,0.5)", border: "1px solid rgba(201,168,76,0.15)" }}>
                        <button
                            onClick={() => setAnnual(false)}
                            className="rounded-full px-5 py-2 font-mono text-sm transition-all duration-200"
                            style={{
                                background: !annual ? "#C9A84C" : "transparent",
                                color: !annual ? "#0D0D12" : "rgba(250,248,245,0.5)",
                                fontWeight: !annual ? 700 : 400,
                            }}
                        >
                            {t.pricing.monthly ?? "Mensuel"}
                        </button>
                        <button
                            onClick={() => setAnnual(true)}
                            className="rounded-full px-5 py-2 font-mono text-sm transition-all duration-200 flex items-center gap-2"
                            style={{
                                background: annual ? "#C9A84C" : "transparent",
                                color: annual ? "#0D0D12" : "rgba(250,248,245,0.5)",
                                fontWeight: annual ? 700 : 400,
                            }}
                        >
                            {t.pricing.annual ?? "Annuel"}
                            <span
                                className="text-xs font-bold px-2 py-0.5 rounded-full"
                                style={{
                                    background: annual ? "#0D0D12" : "rgba(201,168,76,0.2)",
                                    color: annual ? "#C9A84C" : "#C9A84C",
                                }}
                            >
                                −20%
                            </span>
                        </button>
                    </div>
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
                                    <div className="flex items-end gap-1 flex-wrap">
                                        <span className="font-heading text-5xl" style={{ color: highlight ? "#0D0D12" : "#FAF8F5" }}>
                                            {getPrice(tier.price)}
                                        </span>
                                        <span className="font-mono text-xs mb-2 leading-tight max-w-[120px]" style={{ color: highlight ? "rgba(13,13,18,0.6)" : "rgba(250,248,245,0.4)" }}>
                                            {getSub(tier.sub)}
                                        </span>
                                    </div>
                                    {annual && (
                                        <div className="mt-1 text-xs font-mono font-bold" style={{ color: highlight ? "rgba(13,13,18,0.7)" : "#C9A84C" }}>
                                            {t.pricing.saveLabel ?? "Économie"} {getSavings(tier.price)} MAD/an
                                        </div>
                                    )}
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
                                    <span className="btn-bg" style={{ background: highlight ? "#2A2A35" : "#0D0D12" }} />
                                    <span style={{ position: "relative", zIndex: 10 }}>{tier.cta}</span>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
