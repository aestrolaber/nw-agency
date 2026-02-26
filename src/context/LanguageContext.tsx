"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { translations, type Lang } from "@/lib/translations";

// Use a loose record type so both en & fr literals are assignable
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyTranslation = Record<string, any>;

interface LanguageContextType {
    lang: Lang;
    setLang: (l: Lang) => void;
    t: AnyTranslation;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: "fr",
    setLang: () => { },
    t: translations.fr,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>("fr");
    return (
        <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
