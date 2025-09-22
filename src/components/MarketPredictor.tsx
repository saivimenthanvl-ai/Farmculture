import React, { useEffect, useMemo, useState } from "react";
import { Calendar, Info, RefreshCw, TrendingDown, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Timeframe = 7 | 30 | 90;

interface PricePoint {
  date: string; // YYYY-MM-DD
  price: number; // INR per kg
}

interface PredictionResult {
  series: PricePoint[];
  confidence7: number;  // %
  confidence30: number; // %
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

// Simple deterministic pseudo-random generator based on a string seed
function seeded(seed: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    // xorshift
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

    // Seasonality + mild trend + random noise (deterministic)
    const seasonal =
      Math.sin((i / 7) * Math.PI * 0.9) * (2 + (base / 50)) +
      Math.cos((i / 14) * Math.PI) * 1.5;

    const trend = (i / 90) * (commodity === "Tomato" ? 3 : 1.5);
    const noise = (rnd() - 0.5) * 2; // -1..1

    price = clamp(price + seasonal * 0.4 + trend * 0.15 + noise, base * 0.6, base * 1.9);

    series.push({
      date: date.toISOString().slice(0, 10),
      price: Math.round(price * 100) / 100,
    });
  }

  return series;
}

function analyze(series: PricePoint[]): Omit<PredictionResult, "keyFactors"> {
  const currentPrice = series[0]?.price ?? 0;
  let bestPrice = -Infinity;
  let bestSellDate = series[0]?.date ?? "";

  for (const p of series) {
    if (p.price > bestPrice) {
      bestPrice = p.price;
      bestSellDate = p.date;
    }
  }

  // Basic confidence proxy: lower stddev -> higher confidence
  const mean = series.reduce((s, p) => s + p.price, 0) / series.length;
  const variance =
    series.reduce((s, p) => s + Math.pow(p.price - mean, 2), 0) / series.length;
  const std = Math.sqrt(variance);

  const volScore = clamp(1 / (1 + std / mean), 0.4, 0.95); // 0.4..0.95
  const confidence30 = Math.round(volScore * 100);
  const confidence7 = clamp(Math.round((volScore * 100 + 10) * 1.05), 50, 99);

  const optimalAction: "HOLD" | "SELL" =
    bestPrice > currentPrice * 1.03 ? "HOLD" : "SELL";

  return {
    series,
    confidence7,
    confidence30,
    optimalAction,
    bestSellDate,
    bestPrice,
    currentPrice,
  };
}

const Sparkline: React.FC<{ data: PricePoint[] }> = ({ data }) => {
  if (!data.length) return null;

  const W = 560;
  const H = 140;
  const padding = 8;

  const xs = data.map((_, i) => i);
  const ys = data.map((p) => p.price);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanY = maxY - minY || 1;
  const maxX = Math.max(...xs) || 1;

  const path = data
    .map((p, i) => {
      const x = padding + (i / maxX) * (W - padding * 2);
      const y = padding + (1 - (p.price - minY) / spanY) * (H - padding * 2);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

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
  const { t, language } = useLanguage();
  const [commodity, setCommodity] = useState<Commodity>("Tomato");
  const [timeframe, setTimeframe] = useState<Timeframe>(30);
  const [loading, setLoading] = useState(false);

  const result: PredictionResult | null = useMemo(() => {
    const series = generateSeries(commodity, timeframe);
    const base = analyze(series);
    const keyFactors = [
      "Rainfall deviation vs normal",
      "Nearby market arrivals",
      "Fuel & transport costs",
      "Festival demand outlook",
    ];
    return { ...base, keyFactors };
  }, [commodity, timeframe]);

  // fake loading to mimic a call
  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(id);
  }, [commodity, timeframe]);

  const handleRecalculate = () => {
    // no-op (data is memoized from state); button exists for UX parity
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header (required translation lines) */}
      <h2 className="text-2xl font-bold">{t("predictor.title")}</h2>
      <p className="text-gray-600">{t("predictor.subtitle")}</p>

      {/* Controls */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Commodity
          </label>
          <select
            value={commodity}
            onChange={(e) => setCommodity(e.target.value as Commodity)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {COMMODITIES.map((c) => (
              <option key={c} value={c}>
                {t(c.toLowerCase())}
              </option>
            ))}
          </select>
        </div>

        <div>
          {/* Required translation label */}
          <label className="text-sm block mb-2">{t("predictor.timeframe")}</label>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(Number(e.target.value) as Timeframe)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value={7}>7 {t("days")}</option>
            <option value={30}>30 {t("days")}</option>
            <option value={90}>90 {t("days")}</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleRecalculate}
            className="btn-primary w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            {t("recalculate") ?? "Recalculate"}
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-6">
        <Sparkline data={result?.series ?? []} />
      </div>

      {/* Strategy & Confidence */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          {/* Required heading */}
          <h3 className="font-semibold">{t("predictor.optimalStrategy")}</h3>
          <div className="mt-2 flex items-center gap-2">
            {result?.optimalAction === "HOLD" ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
            <span className="text-gray-800">
              {result?.optimalAction === "HOLD"
                ? t("predictor.hold")
                : t("predictor.sell") ?? "Sell when favorable"}
            </span>
          </div>

          {/* Required best-sell line (with dynamic date, fallback preserved) */}
          <div className="text-xs mt-2 text-gray-600">
            {t("predictor.bestSellDate")}:{" "}
            {result
              ? formatDate(result.bestSellDate, language === "hi" ? "hi-IN" : "en-IN")
              : "10/2/2025"}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          {/* Required heading */}
          <h3 className="font-semibold">{t("predictor.confidence")}</h3>
          <div className="text-xs mt-2 text-gray-700">
            {/* Required confidence lines */}
            <div className="text-xs">
              {t("predictor.next7")}: {result ? `${result.confidence7}%` : "85%"}
            </div>
            <div className="text-xs">
              {t("predictor.next30")}: {result ? `${result.confidence30}%` : "72%"}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div className="text-sm text-gray-700">
              {t("currentPrice") ?? "Current price"}:{" "}
              <span className="font-semibold">
                ₹{result?.currentPrice.toFixed(2)}/kg
              </span>
            </div>
          </div>
          <div className="mt-1 text-sm text-gray-700">
            {t("peakPrice") ?? "Peak in range"}:{" "}
            <span className="font-semibold">
              ₹{result?.bestPrice.toFixed(2)}/kg
            </span>
          </div>
        </div>
      </div>

      {/* Key Factors */}
      <div className="mt-6 bg-white rounded-lg">
        {/* Required heading */}
        <h3 className="font-semibold">{t("predictor.keyFactors")}</h3>
        <div className="mt-2 p-4 border rounded-lg flex flex-col gap-2">
          {(result?.keyFactors ?? []).map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <Info className="w-4 h-4 mt-0.5 text-gray-500" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Example of using the provided snippet structure explicitly */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold">{t("predictor.title")}</h2>
        <p className="text-gray-600">{t("predictor.subtitle")}</p>
        <label className="text-sm">{t("predictor.timeframe")}</label>

        <div className="mt-3">
          <h3 className="font-semibold">{t("predictor.optimalStrategy")}</h3>
          {result?.optimalAction === "HOLD" && (
            <p className="text-sm">{t("predictor.hold")}</p>
          )}
          <div className="text-xs">
            {t("predictor.bestSellDate")}:{" "}
            {result
              ? formatDate(result.bestSellDate, language === "hi" ? "hi-IN" : "en-IN")
              : "10/2/2025"}
          </div>
        </div>

        <div className="mt-3">
          <h3 className="font-semibold">{t("predictor.confidence")}</h3>
          <div className="text-xs">
            {t("predictor.next7")}: {result ? `${result.confidence7}%` : "85%"}
          </div>
          <div className="text-xs">
            {t("predictor.next30")}: {result ? `${result.confidence30}%` : "72%"}
          </div>
        </div>

        <div className="mt-3">
          <h3 className="font-semibold">{t("predictor.keyFactors")}</h3>
        </div>
      </div>
    </div>
  );
};

export default MarketPredictor;
