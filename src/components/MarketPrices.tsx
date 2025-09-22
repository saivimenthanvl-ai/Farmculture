import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus, Search, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MarketPrice {
  commodity: string;
  price: number;
  unit: string;
  trend: "up" | "down" | "stable";
  change: number;
  market: string;
  date: string;
  currency: "INR";
}

const localeFromLanguage: Record<string, string> = {
  en: "en-IN",
  hi: "hi-IN",
  ta: "ta-IN",
  de: "de-DE",
  pl: "pl-PL",
  fr: "fr-FR",
  es: "es-ES",
  te: "te-IN",
};

const MarketPrices: React.FC = () => {
  const { t, lang, language } = useLanguage(); // `language` kept for legacy alias support
  const activeLang = lang ?? (language as string);
  const activeLocale = localeFromLanguage[activeLang] ?? "en-IN";

  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Currency-aware formatter
  const formatCurrency = (amount: number, currency: MarketPrice["currency"]) =>
    new Intl.NumberFormat(activeLocale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);

  useEffect(() => {
    // Simulated fetch
    const fetchPrices = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockPrices: MarketPrice[] = [
        {
          commodity: "Carrot",
          price: 60,
          unit: "per kg",
          trend: "down",
          change: -20,
          market: "Mumbai",
          date: "2025-01-19",
          currency: "INR",
        },
        {
          commodity: "Tomato",
          price: 32.04,
          unit: "per kg",
          trend: "down",
          change: -10,
          market: "Delhi",
          date: "2025-01-19",
          currency: "INR",
        },
        {
          commodity: "Rice",
          price: 35.96,
          unit: "per kg",
          trend: "up",
          change: +50,
          market: "Punjab",
          date: "2025-01-19",
          currency: "INR",
        },
        {
          commodity: "Onion",
          price: 45,
          unit: "per kg",
          trend: "up",
          change: +9,
          market: "Banglore",
          date: "2025-01-19",
          currency: "INR",
        },
        {
          commodity: "Groundnut",
          price: 50.6,
          unit: "per kg",
          trend: "up",
          change: +8,
          market: "Chennai",
          date: "2025-01-19",
          currency: "INR",
        },
      ];

      setPrices(mockPrices);
      setLoading(false);
    };

    fetchPrices();
  }, []);

  const filteredPrices = prices.filter((p) =>
    p.commodity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const commodityLabel = (name: string) => {
    const key = `commodities.${name.toLowerCase()}`;
    const translated = t(key);
    return translated === key ? name : translated;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Fetching latest market price...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Title & search (translated) */}
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t("market.title")}
          </h2>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t("market.search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPrices.map((price, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {commodityLabel(price.commodity)}
                </h3>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(price.trend)}
                  <span
                    className={`text-sm font-medium ${getTrendColor(
                      price.trend
                    )}`}
                  >
                    {price.change > 0 ? "+" : ""}
                    {price.change}%
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <span className="text-2xl font-bold text-gray-800">
                  {formatCurrency(price.price, price.currency)}
                </span>
                {/* use translated unit label */}
                <span className="text-gray-600 ml-2">{t("units.perKg")}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{price.market}</span>
                </div>
                <span>{price.date}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredPrices.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">
              No commodities found matching your search.
            </p>
          </div>
        )}

        {/* Alert box (translated) */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">
            {t("market.alertTitle")}
          </h4>
          <p className="text-blue-700 text-sm">{t("market.alertMsg")}</p>
        </div>
      </div>
    </>
  );
};

export default MarketPrices;
