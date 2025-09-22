// src/components/FooterIntl.tsx
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Supported language codes
type Lang = "en" | "hi" | "ta" | "de" | "pl" | "fr" | "es" | "te";

const STRINGS: Record<
  Lang,
  {
    brand: string;
    tagline: string;
    poweredBy: string;
    technologies: string;
    copyright: string;
  }
> = {
  en: {
    brand: "Farmculture",
    tagline:
      "Revolutionizing Agriculture with AI Technology & Blockchain Traceability",
    poweredBy: "Powered by",
    technologies: "Technologies",
    copyright:
      "Helping farmers with small contribution towards society.",
  },
  hi: {
    brand: "कृषि संस्कृति",
    tagline:
      "एआई तकनीक और ब्लॉकचेन ट्रेसबिलिटी के साथ कृषि में क्रांति",
    poweredBy: "द्वारा संचालित",
    technologies: "प्रौद्योगिकियाँ",
    copyright:
      "समाज की ओर छोटे योगदान के साथ किसानों की सहायता करना।",
  },
  ta: {
    brand: "பண்பாடு",
    tagline:
      "ஏஐ தொழில்நுட்பம் மற்றும் பிளாக்செயின் கண்காணிப்புடன் வேளாண்மையில் புரட்சி",
    poweredBy: "இயக்குவது",
    technologies: "தொழில்நுட்பங்கள்",
    copyright:
      "சமூகத்திற்கு சிறிய பங்களிப்புடன் விவசாயிகளுக்கு உதவுகிறோம்.",
  },
  de: {
    brand: "Landwirtschaft",
    tagline:
      "Revolutionierung der Landwirtschaft mit KI-Technologie & Blockchain-Nachverfolgbarkeit",
    poweredBy: "Bereitgestellt von",
    technologies: "Technologien",
    copyright:
      "Unterstützt Landwirte mit einem kleinen Beitrag für die Gesellschaft.",
  },
  pl: {
    brand: "Farmkultura",
    tagline:
      "Rewolucja w rolnictwie dzięki technologii AI i identyfikowalności blockchain",
    poweredBy: "Zasilane przez",
    technologies: "Technologie",
    copyright:
      "Wspieramy rolników małym wkładem dla społeczeństwa.",
  },
  fr: {
    brand: "Culture agricole",
    tagline:
      "Révolutionner l’agriculture grâce à l’IA et la traçabilité blockchain",
    poweredBy: "Propulsé par",
    technologies: "Technologies",
    copyright:
      "Aider les agriculteurs avec une petite contribution à la société.",
  },
  es: {
    brand: "Cultura agrícola",
    tagline:
      "Revolucionando la agricultura con IA y trazabilidad blockchain",
    poweredBy: "Impulsado por",
    technologies: "Tecnologías",
    copyright:
      "Ayudando a los agricultores con una pequeña contribución a la sociedad.",
  },
  te:{
    brand: "వ్యవసాయ సంస్కృతి",
    tagline:"ఏఐ సాంకేతికత మరియు బ్లాక్‌చెయిన్ సాక్ష్యతతో వ్యవసాయాన్ని మారుస్తున్నది",
    poweredBy: "శక్తివంతమైన",
    technologies: "సాంకేతికతలు",
    copyright: "సమాజానికి చిన్న సహాయం అందించటం అందుకు రైతులకు సహాయం చేయడం.",
  }
};

// Map aliases like "en-US" → "en"
function normalizeLang(input?: string | null): Lang {
  const raw = (input || "en").toLowerCase();
  const base = raw.split("-")[0] as Lang;
  const allowed: Lang[] = ["en", "hi", "ta", "de", "pl", "fr", "es","te"];
  return allowed.includes(base) ? base : "en";
}

export default function FooterIntl({ lang }: { lang?: Lang }) {
  // Try context (if it exposes lang) → prop → localStorage → <html lang> → 'en'
  let ctxLang: string | undefined;
  try {
    ctxLang = (useLanguage() as unknown as { lang?: string })?.lang;
  } catch {
    /* ignore if not available here */
  }

  const selected =
    lang ??
    normalizeLang(ctxLang) ??
    normalizeLang(
      typeof window !== "undefined" ? localStorage.getItem("lang") : undefined
    ) ??
    normalizeLang(
      typeof document !== "undefined"
        ? document.documentElement.lang
        : undefined
    ) ??
    "en";

  const S = STRINGS[selected];
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16">
      {/* thin gradient bar to match your design */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-400/70 via-sky-400/70 to-purple-400/70" />
      <div className="bg-[#111a27] text-gray-300">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <h2 className="text-xl font-semibold text-gray-100">{S.brand}</h2>
          <p className="mt-2 text-sm text-gray-400">{S.tagline}</p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {/* Powered by */}
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
              <p className="text-xs uppercase tracking-wider text-gray-400">
                {S.poweredBy}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">
                  Google AI
                </span>
                <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">
                  Firebase
                </span>
                <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">
                  Vertex AI
                </span>
              </div>
            </div>

            {/* Technologies */}
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
              <p className="text-xs uppercase tracking-wider text-gray-400">
                {S.technologies}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">
                  Machine Learning
                </span>
                <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">
                  Blockchain
                </span>
              </div>
            </div>
          </div>

          <hr className="my-8 border-white/10" />

          <p className="text-xs text-gray-400">
            © {2025} {S.brand}. {S.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
