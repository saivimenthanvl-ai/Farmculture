// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Wheat, Mic, MicOff, UserCircle, Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

type HeaderProps = {
  isListening: boolean;
  onToggleListening: () => void;
};

const LANG_OPTIONS: { code: "en" | "de" | "hi" | "ta" | "es" | "fr" | "pt" | "pl"; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "hi", label: "HI" },
  { code: "ta", label: "TA" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
  { code: "pt", label: "PT" },
  { code: "pl", label: "PL" },
];

export const Header: React.FC<HeaderProps> = ({ isListening, onToggleListening }) => {
  // ✅ Use the hook, not raw context
  const { lang, setLanguage, t } = useLanguage();
  return (
    <header className="bg-white/70 backdrop-blur border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <Wheat className="w-6 h-6 text-green-600" />
          <span className="text-xl font-bold text-gray-800">Farmculture</span>
        </div>

        {/* Center actions */}
        <div className="flex items-center gap-3">
          {/* Voice toggle */}
          <button
            onClick={onToggleListening}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-gray-300 hover:border-gray-400 bg-white text-gray-700"
          >
            {isListening ? (
              <>
                <Mic className="w-4 h-4 text-green-600" />
                <span>Listening…</span>
              </>
            ) : (
              <>
                <MicOff className="w-4 h-4" />
                <span>{t("voiceAssistant")}</span>
              </>
            )}
          </button>

          {/* Language selector (uses lang & setLanguage so TS stops warning) */}
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-600" />
            <select
              value={lang}
              onChange={(e) => setLanguage(e.target.value as typeof LANG_OPTIONS[number]["code"])}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 bg-white"
              aria-label="Language"
              title="Language"
            >
              {LANG_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right side: Login */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <UserCircle className="w-4 h-4" />
            <span>{t("signIn") ?? "Sign in"}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
