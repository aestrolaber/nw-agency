"use client";
import { useState } from "react";
import { ArrowRight, Mail, Phone, Building2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
    const { t } = useLanguage();
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", url: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const fields = [
        { id: "name", label: t.contact.fields.name, icon: <Mail size={14} />, placeholder: t.contact.placeholders.name, type: "text" },
        { id: "email", label: t.contact.fields.email, icon: <Mail size={14} />, placeholder: t.contact.placeholders.email, type: "email" },
        { id: "phone", label: t.contact.fields.phone, icon: <Phone size={14} />, placeholder: t.contact.placeholders.phone, type: "tel" },
        { id: "business", label: t.contact.fields.business, icon: <Building2 size={14} />, placeholder: t.contact.placeholders.business, type: "text" },
    ];

    return (
        <section id="contact" className="section" style={{ background: "#0D0D12" }}>
            <div className="max-w-4xl mx-auto">
                <div className="mb-12">
                    <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#C9A84C" }}>
                        {t.contact.label}
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl mb-4" style={{ color: "#FAF8F5" }}>
                        {t.contact.heading1}{" "}
                        <span className="font-drama" style={{ color: "#C9A84C" }}>{t.contact.heading2}</span>
                    </h2>
                    <p className="text-base leading-relaxed max-w-xl" style={{ color: "rgba(250,248,245,0.55)" }}>
                        {t.contact.body}
                    </p>
                </div>

                {submitted ? (
                    <div className="rounded-3xl p-12 text-center" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
                        <div className="font-drama text-5xl mb-4" style={{ color: "#C9A84C" }}>{t.contact.successTitle}</div>
                        <p className="font-mono text-sm" style={{ color: "rgba(250,248,245,0.6)" }}>{t.contact.successBody}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ background: "rgba(42,42,53,0.4)", border: "1px solid rgba(201,168,76,0.1)" }}>
                        {fields.map((field) => (
                            <div key={field.id} className="flex flex-col gap-2">
                                <label className="font-mono text-xs uppercase tracking-widest" style={{ color: "#C9A84C" }}>
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    required
                                    placeholder={field.placeholder}
                                    value={form[field.id as keyof typeof form]}
                                    onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                                    className="rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-200"
                                    style={{ background: "rgba(13,13,18,0.6)", border: "1px solid rgba(201,168,76,0.15)", color: "#FAF8F5" }}
                                />
                            </div>
                        ))}
                        <div className="md:col-span-2 flex flex-col gap-2">
                            <label className="font-mono text-xs uppercase tracking-widest" style={{ color: "#C9A84C" }}>
                                {t.contact.fields.url}
                            </label>
                            <input
                                type="url"
                                placeholder={t.contact.placeholders.url}
                                value={form.url}
                                onChange={(e) => setForm({ ...form, url: e.target.value })}
                                className="rounded-2xl px-4 py-3 text-sm outline-none"
                                style={{ background: "rgba(13,13,18,0.6)", border: "1px solid rgba(201,168,76,0.15)", color: "#FAF8F5" }}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" className="btn-magnetic btn-primary w-full py-4 text-base rounded-2xl">
                                <span className="btn-bg" />
                                <span>{t.contact.cta}</span>
                                <ArrowRight size={18} className="relative z-10" />
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}
