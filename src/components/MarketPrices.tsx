import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus, Search, MapPin } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

type Trend = "up" | "down" | "stable";

interface MarketPrice {
  commodity: string;
  price: number; // base currency = INR
  unit: string;
  trend: Trend;
  change: number; // %
  market: string;
  date: string;   // yyyy-mm-dd
}

// --- i18n strings ---
const I18N = {
  en: {
    title: "Market Prices",
    subtitle: "Real-time prices from markets",
    searchPlaceholder: "Search for commodity...",
    noResults: "No commodities found matching your search.",
    priceAlertTitle: "Price Alert",
    priceAlertText:
      "Tomato prices have increased by 12% in the last week. Consider selling if you have ready stock.",
    unit: "per kg",
  },
  de: {
    title: "Marktpreise",
    subtitle: "Echtzeitpreise aus den Märkten",
    searchPlaceholder: "Nach Ware suchen…",
    noResults: "Keine Waren passend zur Suche gefunden.",
    priceAlertTitle: "Preisalarm",
    priceAlertText:
      "Die Tomatenpreise sind in der letzten Woche um 12 % gestiegen. Erwägen Sie den Verkauf bei vorhandenem Bestand.",
    unit: "pro kg",
  },
  hi: {
    title: "बाज़ार भाव",
    subtitle: "बाज़ारों से रीयल-टाइम मूल्य",
    searchPlaceholder: "फसल/वस्तु खोजें…",
    noResults: "आपकी खोज से मेल खाती कोई वस्तु नहीं मिली।",
    priceAlertTitle: "मूल्य चेतावनी",
    priceAlertText:
      "पिछले सप्ताह टमाटर के दाम 12% बढ़े हैं। यदि स्टॉक तैयार है तो बिक्री पर विचार करें।",
    unit: "प्रति किग्रा",
  },
  ta: {
    title: "சந்தை விலை",
    subtitle: "சந்தைகளில் இருந்து நேரடி விலை",
    searchPlaceholder: "பொருளைத் தேடவும்…",
    noResults: "தேடலுக்கு பொருந்தும் பொருட்கள் இல்லை.",
    priceAlertTitle: "விலை எச்சரிக்கை",
    priceAlertText:
      "கடந்த வாரத்தில் தக்காளி விலை 12% உயர்ந்துள்ளது. தயாரான இருப்பு இருந்தால் விற்பனை செய்ய பரிசீலிக்கவும்.",
    unit: "கிலோக்கு",
  },
  es: {
    title: "Precios de mercado",
    subtitle: "Precios en tiempo real de los mercados",
    searchPlaceholder: "Buscar producto…",
    noResults: "No se encontraron productos que coincidan con tu búsqueda.",
    priceAlertTitle: "Alerta de precios",
    priceAlertText:
      "El precio del tomate ha subido un 12% en la última semana. Considera vender si tienes stock listo.",
    unit: "por kg",
  },
  fr: {
    title: "Prix du marché",
    subtitle: "Prix en temps réel des marchés",
    searchPlaceholder: "Rechercher une denrée…",
    noResults: "Aucune denrée ne correspond à votre recherche.",
    priceAlertTitle: "Alerte prix",
    priceAlertText:
      "Le prix de la tomate a augmenté de 12 % cette semaine. Envisagez de vendre si vous avez du stock prêt.",
    unit: "par kg",
  },
  pt: {
    title: "Preços de mercado",
    subtitle: "Preços em tempo real dos mercados",
    searchPlaceholder: "Pesquisar mercadoria…",
    noResults: "Nenhuma mercadoria encontrada para a sua pesquisa.",
    priceAlertTitle: "Alerta de preços",
    priceAlertText:
      "O preço do tomate aumentou 12% na última semana. Considere vender se tiver estoque pronto.",
    unit: "por kg",
  },
  pl: {
    title: "Ceny rynkowe",
    subtitle: "Ceny w czasie rzeczywistym z rynków",
    searchPlaceholder: "Szukaj towaru…",
    noResults: "Nie znaleziono towarów pasujących do wyszukiwania.",
    priceAlertTitle: "Alert cenowy",
    priceAlertText:
      "Ceny pomidorów wzrosły o 12% w ostatnim tygodniu. Rozważ sprzedaż, jeśli masz gotowy zapas.",
    unit: "za kg",
  },
} as const;

type Lang = keyof typeof I18N;

// languages that should display € and show capital city
const EURO_LANGS = new Set<Lang>(["de", "es", "fr", "pt", "pl"]);

// static capitals
const CAPITAL_BY_LANG: Partial<Record<Lang, string>> = {
  de: "Berlin",
  es: "Madrid",
  fr: "Paris",
  pt: "Madeira",
  pl: "Warszawa",
};

// very simple INR→EUR conversion (approx). Adjust if you want.
const INR_PER_EUR = 100;

export const MarketPrices: React.FC = () => {
  const { lang } = useLanguage(); // expects your LanguageContext to expose current code
  const t = I18N[(lang as Lang) ?? "en"];

  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // helpers
  const currencySymbol = EURO_LANGS.has(lang as Lang) ? "€" : "₹";
  const toDisplayPrice = (inr: number) =>
    EURO_LANGS.has(lang as Lang) ? (inr / INR_PER_EUR) : inr;

  const formatPrice = (val: number) =>
    EURO_LANGS.has(lang as Lang) ? val.toFixed(2) : val.toString();

  useEffect(() => {
    const fetchPrices = async () => {
      await new Promise((r) => setTimeout(r, 800));
      const mockPrices: MarketPrice[] = [
        { commodity: "Tomato", price: 45, unit: "per kg", trend: "up", change: 12, market: "Chennai", date: "2025-01-19" },
        { commodity: "Onion", price: 100, unit: "per kg", trend: "down", change: -5, market: "Bandra", date: "2025-01-19" },
        { commodity: "Potato", price: 200, unit: "per kg", trend: "stable", change: 0, market: "Madurai", date: "2025-01-19" },
        { commodity: "Cabbage", price: 150, unit: "per kg", trend: "up", change: 8, market: "Pune", date: "2025-01-19" },
      ];
      setPrices(mockPrices);
      setLoading(false);
    };
    fetchPrices();
  }, []);

  const filtered = prices.filter((p) =>
    p.commodity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTrendIcon = (trend: Trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: Trend) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto" />
          <p className="mt-4 text-gray-600">{t.subtitle}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((p, idx) => {
          const displayPrice = toDisplayPrice(p.price);
          const displayMarket =
            EURO_LANGS.has(lang as Lang) ? CAPITAL_BY_LANG[lang as Lang] ?? p.market : p.market;

          return (
            <div
              key={idx}
              className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{p.commodity}</h3>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(p.trend)}
                  <span className={`text-sm font-medium ${getTrendColor(p.trend)}`}>
                    {p.change > 0 ? "+" : ""}
                    {p.change}%
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <span className="text-2xl font-bold text-gray-800">
                  {currencySymbol}
                  {formatPrice(displayPrice)}
                </span>
                <span className="text-gray-600 ml-2">
                  {/* unify the unit text to localized string */}
                  {t.unit}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{displayMarket}</span>
                </div>
                <span>{p.date}</span>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">{t.noResults}</p>
        </div>
      )}

      {/* Alert */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">{t.priceAlertTitle}</h4>
        <p className="text-blue-700 text-sm">{t.priceAlertText}</p>
      </div>
    </div>
  );
};
