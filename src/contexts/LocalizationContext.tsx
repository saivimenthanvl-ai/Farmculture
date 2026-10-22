import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  PropsWithChildren,
} from "react";
import {
  SupportedLocale,
  SupportedRegion,
  SupportedCurrency,
  LOCALES,
  REGIONS,
  CURRENCIES,
  DEFAULT_PREFERENCES,
  UserPreferences,
} from "@/lib/localeConfig";
import { useAuth } from "./AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { dict, Lang, pathGet } from "./LanguageContext";

export interface LocalizationContextValue {
  // Locale
  interfaceLocale: SupportedLocale;
  setInterfaceLocale: (locale: SupportedLocale) => void;
  // Region
  region: SupportedRegion;
  setRegion: (region: SupportedRegion) => void;
  // Market Geography (strictly decoupled from language & currency)
  marketCountry: SupportedRegion;
  setMarketCountry: (country: SupportedRegion) => void;
  marketCity: string;
  setMarketCity: (city: string) => void;
  // Currency
  displayCurrency: SupportedCurrency;
  setDisplayCurrency: (currency: SupportedCurrency) => void;
  // Metadata
  isRtl: boolean;
  currencyPreferenceSource: UserPreferences["currencyPreferenceSource"];
  // Translation
  t: (key: string) => string;
  // Legacy aliases
  lang: string;
  setLang: (lang: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const LocalizationContext = createContext<LocalizationContextValue | undefined>(undefined);

const PREFS_STORAGE_KEY = "farmculture_user_preferences_v1";

// Translations for Arabic and core locales
const arabicTranslations: Record<string, string> = {
  welcome: "مرحباً بكم في ثقافة المزرعة",
  subtitle: "شبكة الاستخبارات الزراعية الموثوقة",
  tagline: "تمكين المزارعين بأحدث تقنيات الذكاء الاصطناعي",
  agriculture_tools: "أدوات زراعية",
  crop_diagnosis: "تشخيص المحاصيل",
  crop_diagnosis_desc: "كشف فوري ودقيق لأمراض المحاصيل بالذكاء الاصطناعي",
  market_prices: "أسعار السوق",
  market_prices_desc: "تتبع أسعار السلع الزراعية والمحاصيل لحظياً",
  govt_schemes: "المبادرات والبرامج",
  govt_schemes_desc: "الوصول إلى برامج الدعم والإعانات الزراعية",
  voice_assistant: "المساعد الصوتي",
  voice_assistant_desc: "مساعدة صوتية دون استخدام اليدين بلغتك",
  restaurants: "المطاعم وتجار الجملة",
  restaurants_desc: "ربط الإنتاج الزراعي مباشرة مع المشترين",
  cold_storage: "المستودعات والتبريد",
  cold_storage_desc: "إدارة ومراقبة سلسلة التبريد والتخزين",
  advanced_features: "الميزات المتقدمة",
  market_predictor: "توقعات السوق",
  market_predictor_desc: "توقعات مدعومة بالبيانات لقرارات بيع أفضل",
  crop_health_monitor: "مراقبة صحة المحاصيل",
  crop_health_monitor_desc: "تحليلات الحقول عبر الأقمار الصناعية والاستشعار",
  drone_monitoring: "المراقبة بالطائرات المسيرة",
  drone_monitoring_desc: "تصوير جوي عالي الدقة للزراعة الدقيقة",
  smart_irrigation: "الري الذكي",
  smart_irrigation_desc: "أنظمة ري آلية موفرة للمياه",
  weather_insights: "بيانات الطقس",
  weather_insights_desc: "تنبؤات جوية دقيقة وتنبيهات مناخية زراعية",
  blockchain_traceability: "تتبع البلوك تشين",
  blockchain_traceability_desc: "شفافية سلسلة التوريد من المزرعة للمستهلك",
  "Back To Home": "العودة للرئيسية",
  "brand": "ثقافة المزرعة",
  "brand_tagline": "مساعدك الزراعي الموثوق",
  "market.title": "أسعار السلع في الأسواق",
  "market.search": "ابحث عن سلعة أو سوق...",
};

export const LocalizationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();

  // Load initial preferences from local storage or defaults
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(PREFS_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.interfaceLocale && LOCALES[parsed.interfaceLocale as SupportedLocale]) {
            return parsed;
          }
        }
      } catch {
        // ignore storage parse error
      }
    }
    return DEFAULT_PREFERENCES;
  });

  // Sync with Firestore profile if user is logged in
  useEffect(() => {
    if (user && preferences.currencyPreferenceSource === "explicit") {
      // Save authenticated preference to Firestore profile asynchronously
      updateDoc(doc(db, "users", user.uid), {
        interfaceLocale: preferences.interfaceLocale,
        region: preferences.region,
        displayCurrency: preferences.displayCurrency,
      }).catch(() => {
        // silent fail on network/security rule mismatch
      });
    }
  }, [user, preferences]);

  // Sync RTL and lang attribute in DOM
  useEffect(() => {
    if (typeof document !== "undefined") {
      const localeInfo = LOCALES[preferences.interfaceLocale];
      document.documentElement.lang = preferences.interfaceLocale;
      document.documentElement.dir = localeInfo?.isRtl ? "rtl" : "ltr";
    }
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(preferences));
      } catch {
        // ignore storage write error
      }
    }
  }, [preferences]);

  const setInterfaceLocale = (locale: SupportedLocale) => {
    const localeInfo = LOCALES[locale];
    if (!localeInfo) return;

    setPreferences((prev) => {
      const next: UserPreferences = {
        ...prev,
        interfaceLocale: locale,
        region: prev.currencyPreferenceSource === "explicit" ? prev.region : localeInfo.region,
        displayCurrency: prev.currencyPreferenceSource === "explicit" ? prev.displayCurrency : localeInfo.defaultCurrency,
      };
      if (typeof localStorage !== "undefined") {
        try {
          localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(next));
          localStorage.setItem("lang", locale.split("-")[0]);
        } catch {
          // ignore
        }
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("farmculture-locale-change"));
      }
      return next;
    });
  };

  const setRegion = (region: SupportedRegion) => {
    const regionInfo = REGIONS[region];
    if (!regionInfo) return;

    setPreferences((prev) => ({
      ...prev,
      region,
      // Default marketCountry to region if not explicitly set separately
      marketCountry: prev.marketCountry || region,
      // If currency wasn't explicitly set separately, adopt region's default currency
      displayCurrency: prev.currencyPreferenceSource === "explicit" ? prev.displayCurrency : regionInfo.defaultCurrency,
    }));
  };

  const setMarketCountry = (marketCountry: SupportedRegion) => {
    if (!REGIONS[marketCountry]) return;
    setPreferences((prev) => ({
      ...prev,
      marketCountry,
      marketCity: "All",
    }));
  };

  const setMarketCity = (marketCity: string) => {
    setPreferences((prev) => ({
      ...prev,
      marketCity,
    }));
  };

  const setDisplayCurrency = (currency: SupportedCurrency) => {
    if (!CURRENCIES[currency]) return;
    setPreferences((prev) => ({
      ...prev,
      displayCurrency: currency,
      currencyPreferenceSource: "explicit",
    }));
  };

  // Unified translation resolver connected to application dictionary
  const t = useMemo(() => {
    const locale = preferences.interfaceLocale;
    const baseLang = locale.split("-")[0] as Lang;
    const table = dict[baseLang] || dict.en;
    const fallbackTable = dict.en;

    return (key: string): string => {
      // Check unified dictionary (supports both dot notation and flat keys)
      const v = pathGet(table, key) ?? table[key];
      if (typeof v === "string") return v;

      // Check legacy arabicTranslations if Arabic locale
      if (baseLang === "ar" && arabicTranslations[key]) {
        return arabicTranslations[key];
      }

      // Check English fallback dictionary
      const fb = pathGet(fallbackTable, key) ?? fallbackTable[key];
      if (typeof fb === "string") return fb;

      // Dev-only fallback warning: logs in console, never shows raw key symbol in production UI
      if (import.meta.env?.DEV) {
        console.warn(`[i18n] ⚠ key missing: "${key}" (locale: ${locale})`);
      }
      return key.split(".").pop() || key;
    };
  }, [preferences.interfaceLocale]);

  // Legacy language string
  const lang = preferences.interfaceLocale.split("-")[0];

  const currentMarketCountry = preferences.marketCountry || preferences.region || 'IN';
  const currentMarketCity = preferences.marketCity || 'All';

  const value = useMemo<LocalizationContextValue>(() => ({
    interfaceLocale: preferences.interfaceLocale,
    setInterfaceLocale,
    region: preferences.region,
    setRegion,
    marketCountry: currentMarketCountry,
    setMarketCountry,
    marketCity: currentMarketCity,
    setMarketCity,
    displayCurrency: preferences.displayCurrency,
    setDisplayCurrency,
    isRtl: LOCALES[preferences.interfaceLocale]?.isRtl || false,
    currencyPreferenceSource: preferences.currencyPreferenceSource,
    t,
    lang,
    setLang: (l: string) => {
      // Find matching locale or default
      const match = (Object.keys(LOCALES) as SupportedLocale[]).find((loc) => loc.startsWith(l));
      if (match) setInterfaceLocale(match);
    },
    language: lang,
    setLanguage: (l: string) => {
      const match = (Object.keys(LOCALES) as SupportedLocale[]).find((loc) => loc.startsWith(l));
      if (match) setInterfaceLocale(match);
    },
  }), [preferences, currentMarketCountry, currentMarketCity, t, lang]);

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const ctx = useContext(LocalizationContext);
  if (!ctx) throw new Error("useLocalization must be used within LocalizationProvider");
  return ctx;
};
