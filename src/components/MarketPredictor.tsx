import React, { useEffect, useMemo, useState } from "react";
import { Calendar, Info, RefreshCw, TrendingDown, TrendingUp } from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";
import { formatCurrencyAmount } from "@/lib/currencyService";
import { FALLBACK_RATES } from "@/lib/currencyService";

type Timeframe = 7 | 30 | 90;

interface PricePoint {
  date: string; // YYYY-MM-DD
  price: number;
}

interface PredictionResult {
  series: PricePoint[];
  optimalAction: "HOLD" | "SELL";
  bestSellDate: string; // YYYY-MM-DD
  bestPrice: number;
  currentPrice: number;
  keyFactors: string[];
}

const COMMODITIES = ["Potato", "Tomato", "Onion", "Carrot"] as const;
type Commodity = (typeof COMMODITIES)[number];

const BASE_PRICE: Record<Commodity, number> = {
  Potato: 28,
  Tomato: 34,
  Onion: 30,
  Carrot: 40,
};

function formatDate(d: string, locale = "en-IN") {
  try {
    const dt = new Date(d + "T00:00:00");
    return dt.toLocaleDateString(locale);
  } catch {
    return d;
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function seeded(seed: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6D2B79F5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateSeries(commodity: Commodity, days: number): PricePoint[] {
  const today = new Date();
  const base = BASE_PRICE[commodity];
  const rnd = seeded(commodity);

  const series: PricePoint[] = [];
  let price = base;

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const seasonal =
      Math.sin((i / 7) * Math.PI * 0.9) * (2 + (base / 50)) +
      Math.cos((i / 14) * Math.PI) * 1.5;

    const trend = (i / 90) * (commodity === "Tomato" ? 3 : 1.5);
    const noise = (rnd() - 0.5) * 2;

    price = clamp(base + seasonal + trend + noise, base * 0.7, base * 1.6);
    series.push({
      date: date.toISOString().slice(0, 10),
      price: Math.round(price * 10) / 10,
    });
  }

  return series;
}

function analyze(series: PricePoint[]) {
  if (series.length === 0) {
    return {
      optimalAction: "HOLD" as const,
      bestSellDate: "",
      bestPrice: 0,
      currentPrice: 0,
    };
  }

  const currentPrice = series[0].price;
  let maxP = currentPrice;
  let bestIdx = 0;

  for (let i = 0; i < series.length; i++) {
    if (series[i].price > maxP) {
      maxP = series[i].price;
      bestIdx = i;
    }
  }

  const optimalAction: "HOLD" | "SELL" =
    maxP > currentPrice * 1.05 && bestIdx > 2 ? "HOLD" : "SELL";

  const bestSellDate = series[bestIdx].date;
  const bestPrice = maxP;

  return {
    optimalAction,
    bestSellDate,
    bestPrice,
    currentPrice,
  };
}

const Sparkline: React.FC<{ data: PricePoint[] }> = ({ data }) => {
  if (!data || data.length === 0) return null;
  const W = 600;
  const H = 140;
  const padding = 16;

  const ys = data.map((d) => d.price);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanY = Math.max(1, maxY - minY);

  const maxX = Math.max(1, data.length - 1);

  const points = data.map((d, i) => {
    const x = padding + (i / maxX) * (W - padding * 2);
    const y = padding + (1 - (d.price - minY) / spanY) * (H - padding * 2);
    return `${x},${y}`;
  });

  const path = `M ${points.join(" L ")}`;

  const last = data[data.length - 1]?.price ?? 0;
  const first = data[0]?.price ?? 0;
  const up = last >= first;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-36">
      <rect x="0" y="0" width={W} height={H} rx="10" className="fill-gray-50" />
      <path d={path} fill="none" strokeWidth={2} className="stroke-gray-400" />
      <circle
        r={3.5}
        cx={padding + (maxX / maxX) * (W - padding * 2)}
        cy={
          padding +
          (1 - (last - minY) / spanY) * (H - padding * 2)
        }
        className="fill-gray-600"
      />
      <g transform={`translate(${W - 120}, ${H - 12})`} className="text-xs">
        {up ? (
          <g className="text-green-600 fill-green-600">
            <TrendingUp className="w-4 h-4 inline-block mr-1 align-text-bottom" />
            <text>+{Math.round(((last - first) / first) * 100)}%</text>
          </g>
        ) : (
          <g className="text-red-600 fill-red-600">
            <TrendingDown className="w-4 h-4 inline-block mr-1 align-text-bottom" />
            <text>{Math.round(((last - first) / first) * 100)}%</text>
          </g>
        )}
      </g>
    </svg>
  );
};

export const MarketPredictor: React.FC = () => {
  const { t, interfaceLocale, displayCurrency } = useLocalization();
  const [commodity, setCommodity] = useState<Commodity>("Tomato");
  const [timeframe, setTimeframe] = useState<Timeframe>(30);
  const [loading, setLoading] = useState(false);

  const result: PredictionResult | null = useMemo(() => {
    const series = generateSeries(commodity, timeframe);
    const base = analyze(series);
    const keyFactors = [
      t("predictor.factorRainfall") || "Rainfall deviation vs normal",
      t("predictor.factorArrivals") || "Nearby market arrivals",
      t("predictor.factorTransport") || "Fuel and transportation costs",
      t("predictor.factorFestival") || "Festival demand outlook",
    ];
    return { ...base, series, keyFactors };
  }, [commodity, timeframe, t]);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(id);
  }, [commodity, timeframe]);

  const handleRecalculate = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };

  // Convert INR prices to user's display currency
  const inrPerDisplay = FALLBACK_RATES[displayCurrency] || 1.0;
  const currentPriceConverted = (result?.currentPrice ?? 0) / inrPerDisplay;
  const bestPriceConverted = (result?.bestPrice ?? 0) / inrPerDisplay;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <div>
          <h2 className="text-2xl font-bold">{t("predictor.title")}</h2>
          <p className="text-gray-600">{t("predictor.subtitle")}</p>
        </div>
        <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
          {t("predictor.simulationBadge")}
        </span>
      </div>

      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
        <strong>{t("predictor.transparencyTitle")}:</strong> {t("predictor.transparencyDesc")}
      </div>

      {/* Controls */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("predictor.commodity")}
          </label>
          <select
            value={commodity}
            onChange={(e) => setCommodity(e.target.value as Commodity)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
          >
            {COMMODITIES.map((c) => (
              <option key={c} value={c}>
                {t(`market.commodities.${c.toLowerCase()}`) || t(c.toLowerCase()) || c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm block mb-2 font-medium text-gray-700">{t("predictor.timeframe")}</label>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(Number(e.target.value) as Timeframe)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
          >
            <option value={7}>7 {t("days") || "days"}</option>
            <option value={30}>30 {t("days") || "days"}</option>
            <option value={90}>90 {t("days") || "days"}</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleRecalculate}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg transition-colors font-medium text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {t("predictor.recalculate")}
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-6">
        <Sparkline data={result?.series ?? []} />
      </div>

      {/* Strategy & Confidence */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <h3 className="font-semibold text-gray-800 text-sm">{t("predictor.optimalStrategy")}</h3>
          <div className="mt-2 flex items-center gap-2">
            {result?.optimalAction === "HOLD" ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
            <span className="text-gray-800 text-sm font-medium">
              {result?.optimalAction === "HOLD"
                ? t("predictor.hold")
                : t("predictor.sell")}
            </span>
          </div>

          <div className="text-xs mt-2 text-gray-600">
            {t("predictor.bestSellDate")}:{" "}
            <span className="font-semibold text-gray-800">
              {result ? formatDate(result.bestSellDate, interfaceLocale) : "—"}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <h3 className="font-semibold text-gray-800 text-sm">Model Status &amp; Horizon</h3>
          <div className="text-xs mt-2 text-gray-700 space-y-1">
            <div className="flex justify-between">
              <span>Projection Mode:</span>
              <span className="font-semibold text-amber-700">Seasonal Heuristic</span>
            </div>
            <div className="flex justify-between">
              <span>Statistical Validation:</span>
              <span className="font-semibold text-gray-600">Pending Backtest</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div className="text-xs text-gray-700">
              {t("predictor.currentPrice")}:{" "}
              <span className="font-bold text-gray-900">
                {formatCurrencyAmount(currentPriceConverted, displayCurrency, interfaceLocale)} / kg
              </span>
            </div>
          </div>
          <div className="text-xs text-gray-700">
            {t("predictor.peakPrice")}:{" "}
            <span className="font-bold text-emerald-700">
              {formatCurrencyAmount(bestPriceConverted, displayCurrency, interfaceLocale)} / kg
            </span>
          </div>
        </div>
      </div>

      {/* Key Factors */}
      <div className="mt-6 bg-white rounded-lg">
        <h3 className="font-semibold text-gray-800 text-sm">{t("predictor.keyFactors")}</h3>
        <div className="mt-2 p-4 border border-gray-200 rounded-lg flex flex-col gap-2">
          {(result?.keyFactors ?? []).map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
              <Info className="w-4 h-4 mt-0.5 text-gray-500 shrink-0" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketPredictor;
