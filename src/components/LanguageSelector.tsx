// src/components/LanguageSelector.tsx
import React from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import type { SupportedLang } from "../i18n/translations";

type LangOption = { code: SupportedLang; name: string; flag: string };

export const LanguageSelector: React.FC = () => {
  const { lang, setLanguage, t } = useLanguage(); // current selection & setter

  const languages: LangOption[] = [
    { code: "en", name: "English",   flag: "🇺🇸" },
    { code: "de", name: "Deutsch",   flag: "🇩🇪" },
    { code: "hi", name: "हिंदी",     flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்",      flag: "🇮🇳" },
    { code: "es", name: "Español",   flag: "🇪🇸" },
    { code: "fr", name: "Français",  flag: "🇫🇷" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "pl", name: "Polski",    flag: "🇵🇱" },
  ];

  return (
    <div className="relative group">
      <button
        type="button"
        className="flex items-center space-x-2 px-3 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-200"
        aria-haspopup="menu"
        aria-label={t("language")}
        title={t("language")}
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium">{t("language")}</span>
      </button>

      <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((opt, i) => (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLanguage(opt.code)}
            className={[
              "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200",
              lang === opt.code ? "bg-green-50 text-green-700" : "text-gray-700",
              i === 0 ? "rounded-t-lg" : "",
              i === languages.length - 1 ? "rounded-b-lg" : "",
            ].join(" ")}
            role="menuitem"
          >
            <span className="text-lg leading-none">{opt.flag}</span>
            <span className="font-medium">{opt.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
