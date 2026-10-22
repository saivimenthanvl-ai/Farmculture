import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  MapPin,
  Calendar,
  Info,
  ShieldCheck,
  RefreshCw,
  Globe,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLocalization } from "@/contexts/LocalizationContext";
import { getMarketPrices, MarketPriceRecord } from "@/lib/marketPriceService";
import {
  getExchangeRate,
  convertMarketPrice,
  formatCurrencyAmount,
  ConvertedPrice,
  CurrencyRate,
} from "@/lib/currencyService";
import { REGIONS, SupportedRegion } from "@/lib/localeConfig";

export const MarketPrices: React.FC = () => {
  const {
    interfaceLocale,
    displayCurrency,
    marketCountry,
    setMarketCountry,
    marketCity,
    setMarketCity,
    t,
  } = useLocalization();

  const [prices, setPrices] = useState<MarketPriceRecord[]>([]);
  const [fxRate, setFxRate] = useState<CurrencyRate | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const [marketData, rateData] = await Promise.all([
        getMarketPrices(marketCountry),
        getExchangeRate(displayCurrency).catch(() => null),
      ]);
      setPrices(marketData);
      setFxRate(rateData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [marketCountry, displayCurrency]);

  // Extract unique cities / markets for location filter
  const uniqueLocations = [
    "All",
    ...Array.from(new Set(prices.map((p) => p.city || p.market))),
  ];

  const filteredPrices = prices.filter((p) => {
    const commodityKey = `market.commodities.${p.commodity.toLowerCase()}`;
    const localizedCommodity = t(commodityKey);
    const matchesSearch =
      p.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (localizedCommodity && localizedCommodity.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      marketCity === "All" || p.city === marketCity || p.market === marketCity;
    return matchesSearch && matchesLocation;
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-rose-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-emerald-700 bg-emerald-50";
      case "down":
        return "text-rose-700 bg-rose-50";
      default:
        return "text-gray-700 bg-gray-50";
    }
  };

  const getFreshnessBadge = (freshness: MarketPriceRecord["freshness"]) => {
    switch (freshness) {
      case "live":
        return (
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            {t("market.liveToday")}
          </span>
        );
      case "recent":
        return (
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            {t("market.recentReport")}
          </span>
        );
      case "historical":
        return (
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
            {t("market.benchmarkRef")}
          </span>
        );
    }
  };

  // Supported market countries to select from
  const availableMarketCountries: { code: SupportedRegion; name: string; flag: string }[] = [
    { code: "FR", name: REGIONS.FR.name, flag: REGIONS.FR.flag },
    { code: "DE", name: REGIONS.DE.name, flag: REGIONS.DE.flag },
    { code: "ES", name: REGIONS.ES.name, flag: REGIONS.ES.flag },
    { code: "PL", name: REGIONS.PL.name, flag: REGIONS.PL.flag },
    { code: "GB", name: REGIONS.GB.name, flag: REGIONS.GB.flag },
    { code: "US", name: REGIONS.US.name, flag: REGIONS.US.flag },
    { code: "AU", name: REGIONS.AU.name, flag: REGIONS.AU.flag },
    { code: "IN", name: REGIONS.IN.name, flag: REGIONS.IN.flag },
  ];

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">
            {t("market.loadingPrices")}
          </p>
        </div>
      </div>
    );
  }

  const currentCountryInfo = REGIONS[marketCountry] || REGIONS.IN;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      {/* Navigation & Header */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t("market.backToHome")}</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {t("market.title")}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 mt-1">
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
                {t("market.verifiedProvenance")}
              </span>
              <span>•</span>
              <span>
                {marketCountry === "IN"
                  ? t("market.sourceAgmarknet")
                  : `${t("market.sourceLabel")} ${currentCountryInfo.name} Agricultural Reporting`}
              </span>
            </div>
          </div>

          {/* Currency & Refresh Action */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t("market.displayCurrencyLabel")} <strong>{displayCurrency}</strong></span>
              {fxRate && displayCurrency !== "INR" && (
                <span className="text-emerald-700 font-mono">
                  (1 {displayCurrency} = ₹{fxRate.rate.toFixed(2)})
                </span>
              )}
            </div>
            <button
              onClick={loadData}
              className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              title={t("market.refreshData")}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Country Selection & Filters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Country Selector */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            {t("market.selectCountry")}
          </label>
          <select
            value={marketCountry}
            onChange={(e) => {
              setMarketCountry(e.target.value as SupportedRegion);
              setMarketCity("All");
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
          >
            {availableMarketCountries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* City / Location Filter */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            {t("market.filterByLocation")}
          </label>
          <select
            value={marketCity}
            onChange={(e) => setMarketCity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
          >
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc === "All" ? t("market.filterAllMarkets") : loc}
              </option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            {t("market.searchCommodity")}
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t("market.search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>

      {/* Commodity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPrices.map((price) => {
          const isConverted = displayCurrency !== price.currency;
          const converted: ConvertedPrice = convertMarketPrice(
            price.price,
            price.currency,
            price.unit,
            displayCurrency,
            fxRate
          );

          // Original formatted price
          const originalFormatted = formatCurrencyAmount(
            price.price,
            price.currency,
            interfaceLocale
          );

          return (
            <div
              key={price.commodityId || price.market + price.commodity}
              className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-800">
                    {t(`market.commodities.${price.commodity.toLowerCase()}`) || price.commodity}
                  </h3>
                  {getFreshnessBadge(price.freshness)}
                </div>

                {/* Primary Price Display (In original observation currency) */}
                <div className="space-y-1 mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-gray-900">
                      {originalFormatted}
                    </span>
                    <span className="text-sm text-gray-500">
                      {t("market.perUnit")} {price.unit}
                    </span>
                    <span
                      className={`ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${getTrendColor(
                        price.trend
                      )}`}
                    >
                      {getTrendIcon(price.trend)}
                      {price.change > 0 ? `+${price.change}%` : `${price.change}%`}
                    </span>
                  </div>

                  {/* Converted Price (Displayed separately if user prefers a different currency) */}
                  {isConverted && (
                    <div className="p-2.5 rounded-lg bg-white border border-gray-200 text-xs text-gray-700 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-emerald-800">
                          {t("market.approx")} {converted.amount !== null
                            ? formatCurrencyAmount(converted.amount, displayCurrency, interfaceLocale)
                            : "N/A"}{" "}
                          / {price.unit}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          {t("market.fxDate")} {converted.conversionRateDate || "Recent"}
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-800">
                        {t("market.convertedFrom")} {price.currency} — {t("market.notLocalQuote")}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Provenance Footer */}
              <div className="pt-3 border-t border-gray-200 text-xs text-gray-600 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 font-medium text-gray-700">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{price.market}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{price.observationDate}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-500">
                  <span className="truncate" title={price.source}>
                    {t("market.sourceLabel")} {price.source}
                  </span>
                  {price.sourceURL && (
                    <a
                      href={price.sourceURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline shrink-0 ml-2"
                    >
                      {t("market.provenanceLink")}
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State: Truthful handling when no prices found or unsupported location */}
      {filteredPrices.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200 p-6 space-y-3">
          <p className="text-gray-800 font-semibold text-sm">
            {t("market.noPricesAvailable")}
          </p>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            {t("market.noPricesSubtitle")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSearchTerm("");
                setMarketCity("All");
              }}
              className="px-3.5 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100"
            >
              {t("market.clearFilters")}
            </button>
            <button
              onClick={() => {
                setMarketCountry("IN");
                setMarketCity("All");
              }}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
            >
              {t("market.viewIndianMandis")}
            </button>
          </div>
        </div>
      )}

      {/* Provenance & Market Disclosure Notice */}
      <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-700 mt-0.5 shrink-0" />
        <div className="text-xs text-emerald-900 space-y-1">
          <h4 className="font-semibold text-emerald-800">
            {t("market.policyTitle")}
          </h4>
          <p>
            {t("market.policyDesc")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;
