import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import translations, { SupportedLang, TranslationKey } from "../i18n/translations";

export type LanguageContextType = {
  lang: SupportedLang;
  setLanguage: (l: SupportedLang) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [lang, setLang] = useState<SupportedLang>("en");

  // load once
  useEffect(() => {
    const saved = localStorage.getItem("lang") as SupportedLang | null;
    if (saved && ["en","de","hi","ta","es","fr","pt","pl"].includes(saved)) {
      setLang(saved);
    }
  }, []);

  // persist on change
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

const t = useMemo(
  () => (key: TranslationKey) => {
    const val = translations[lang]?.[key] ?? translations.en[key];
    return val as string; // en always has the key
  },
  [lang]
);

  const value = useMemo(
    () => ({ lang, setLanguage: setLang, t }),
    [lang, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};
