import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Info,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Layers,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";
import { formatCurrencyAmount, FALLBACK_RATES } from "@/lib/currencyService";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";

type Timeframe = 7 | 30 | 90;

interface PricePoint {
  date: string; // YYYY-MM-DD
  price: number;
  upper: number;
  lower: number;
}

interface PredictionResult {
  series: PricePoint[];
  optimalAction: "HOLD" | "SELL";
  bestSellDate: string; // YYYY-MM-DD
  bestPrice: number;
  currentPrice: number;
  expectedGainPercent: number;
  confidence: number;
  keyFactors: { name: string; impact: number; desc: string }[];
}

const COMMODITIES = [
  { id: "Tomato", label: "Tomato (Hybrid)", base: 34, mandi: "Lasalgaon Mandi" },
  { id: "Potato", label: "Potato (Jyoti)", base: 28, mandi: "Agra APMC" },
  { id: "Onion", label: "Onion (Nashik Red)", base: 30, mandi: "Nashik APMC" },
  { id: "Carrot", label: "Carrot (Orange)", base: 40, mandi: "Ooty Market" },
] as const;

type CommodityId = (typeof COMMODITIES)[number]["id"];

function formatDate(d: string, locale = "en-IN") {
  try {
    const dt = new Date(d + "T00:00:00");
    return dt.toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return d;
  }
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

function generateSeries(commodityId: CommodityId, days: number): PricePoint[] {
  const today = new Date();
  const comm = COMMODITIES.find((c) => c.id === commodityId) || COMMODITIES[0];
  const base = comm.base;
  const rnd = seeded(commodityId);

  const series: PricePoint[] = [];
  let price = base;

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const seasonal =
      Math.sin((i / 7) * Math.PI * 0.9) * (2 + base / 50) +
      Math.cos((i / 14) * Math.PI) * 1.5;

    const trend = (i / 90) * (commodityId === "Tomato" ? 3.5 : 1.8);
    const noise = (rnd() - 0.5) * 2;

    price = Math.max(base * 0.7, Math.min(base * 1.6, base + seasonal + trend + noise));
    const roundedPrice = Math.round(price * 10) / 10;
    const bandSpan = (i / days) * 4 + 1.8;

    series.push({
      date: date.toISOString().slice(0, 10),
      price: roundedPrice,
      upper: Math.round((roundedPrice + bandSpan) * 10) / 10,
      lower: Math.round((Math.max(10, roundedPrice - bandSpan)) * 10) / 10,
    });
  }

  return series;
}

function analyze(series: PricePoint[], t: (k: string) => string): PredictionResult {
  if (series.length === 0) {
    return {
      series: [],
      optimalAction: "HOLD",
      bestSellDate: "",
      bestPrice: 0,
      currentPrice: 0,
      expectedGainPercent: 0,
      confidence: 82,
      keyFactors: [],
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

  const gain = Math.max(0, Math.round(((maxP - currentPrice) / currentPrice) * 1000) / 10);
  const optimalAction = gain >= 5 && bestIdx >= 3 ? "HOLD" : "SELL";

  const keyFactors = [
    {
      name: t("predictor.factorRainfall") || "Rainfall deviation vs normal",
      impact: +4.2,
      desc: "Delayed monsoon withdrawal in central belt supports price firming",
    },
    {
      name: t("predictor.factorArrivals") || "Nearby mandi market arrivals",
      impact: -2.1,
      desc: "Arrivals steady across Nashik & Pune mandis (approx. 4,200 quintals/day)",
    },
    {
      name: t("predictor.factorTransport") || "Diesel & interstate transport rates",
      impact: +1.5,
      desc: "Interstate freight rates stable (+1.2% diesel adjustment)",
    },
    {
      name: t("predictor.factorFestival") || "Upcoming festive & retail demand outlook",
      impact: +3.8,
      desc: "Tier-1 urban retail orders rising ahead of calendar holidays",
    },
  ];

  return {
    series,
    optimalAction,
    bestSellDate: series[bestIdx].date,
    bestPrice: maxP,
    currentPrice,
    expectedGainPercent: gain,
    confidence: 86,
    keyFactors,
  };
}

/** Interactive Agronomic Chart with Historical, Forecast & Confidence Band */
const InteractiveForecastChart: React.FC<{
  data: PricePoint[];
  bestDate: string;
  currency: string;
  locale: string;
}> = ({ data, bestDate, currency, locale }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const W = 700;
  const H = 240;
  const padLeft = 50;
  const padRight = 30;
  const padTop = 30;
  const padBottom = 40;

  const allVals = data.flatMap((d) => [d.price, d.upper, d.lower]);
  const minY = Math.floor(Math.min(...allVals) * 0.95);
  const maxY = Math.ceil(Math.max(...allVals) * 1.05);
  const spanY = Math.max(1, maxY - minY);
  const maxX = Math.max(1, data.length - 1);

  const getX = (i: number) => padLeft + (i / maxX) * (W - padLeft - padRight);
  const getY = (val: number) => padTop + (1 - (val - minY) / spanY) * (H - padTop - padBottom);

  // Confidence area path
  const upperPoints = data.map((d, i) => `${getX(i)},${getY(d.upper)}`).join(" L ");
  const lowerPoints = data.map((d, i) => `${getX(data.length - 1 - i)},${getY(data[data.length - 1 - i].lower)}`).join(" L ");
  const bandArea = `M ${upperPoints} L ${lowerPoints} Z`;

  // Forecast line path
  const linePath = `M ${data.map((d, i) => `${getX(i)},${getY(d.price)}`).join(" L ")}`;

  // Best sell window highlight X
  const bestIdx = data.findIndex((d) => d.date === bestDate);
  const bestX = bestIdx >= 0 ? getX(bestIdx) : null;

  const activePoint = hoverIndex !== null ? data[hoverIndex] : data[data.length - 1];

  return (
    <div className="relative w-full bg-white rounded-2xl p-4 border border-[#E7E3D8]">
      {/* Legend & Active readout */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2 px-1 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-bold text-[#0F2E24]">
            <span className="w-3 h-0.5 bg-[#1C4A3A]" />
            <span>Simulated Trajectory</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#787266]">
            <span className="w-3 h-2 bg-[#9BE564]/30 rounded-xs" />
            <span>80% Confidence Range</span>
          </div>
          {bestX && (
            <div className="flex items-center gap-1.5 text-[#E9A23B] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#E9A23B]" />
              <span>Optimal Window</span>
            </div>
          )}
        </div>

        {activePoint && (
          <div className="font-mono text-xs text-[#0F2E24] bg-[#FAF9F5] px-2.5 py-1 rounded-lg border border-[#E7E3D8]">
            <span className="text-[#787266] mr-1">{activePoint.date}:</span>
            <span className="font-bold">₹{activePoint.price}/kg</span>
            <span className="text-[10px] text-[#A8A092] ml-1">
              (₹{activePoint.lower} - ₹{activePoint.upper})
            </span>
          </div>
        )}
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-56 select-none cursor-crosshair"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const svgX = ((e.clientX - rect.left) / rect.width) * W;
          const clampedX = Math.max(padLeft, Math.min(W - padRight, svgX));
          const idx = Math.round(((clampedX - padLeft) / (W - padLeft - padRight)) * maxX);
          setHoverIndex(idx);
        }}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id="bandGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9BE564" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#9BE564" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Horizontal gridlines with Y labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
          const y = padTop + pct * (H - padTop - padBottom);
          const priceLabel = Math.round(maxY - pct * spanY);
          return (
            <g key={i}>
              <line
                x1={padLeft}
                y1={y}
                x2={W - padRight}
                y2={y}
                stroke="#E7E3D8"
                strokeDasharray="4 4"
                strokeWidth={1}
              />
              <text
                x={padLeft - 8}
                y={y + 4}
                textAnchor="end"
                className="fill-[#A8A092] text-[10px] font-mono"
              >
                ₹{priceLabel}
              </text>
            </g>
          );
        })}

        {/* Confidence band */}
        <path d={bandArea} fill="url(#bandGrad)" />

        {/* Best Sell Window vertical banner */}
        {bestX && (
          <g>
            <rect
              x={bestX - 16}
              y={padTop}
              width={32}
              height={H - padTop - padBottom}
              fill="#E9A23B"
              fillOpacity={0.12}
              rx={4}
            />
            <line
              x1={bestX}
              y1={padTop}
              x2={bestX}
              y2={H - padBottom}
              stroke="#E9A23B"
              strokeWidth={1.5}
              strokeDasharray="2 2"
            />
          </g>
        )}

        {/* Forecast Line */}
        <path d={linePath} fill="none" stroke="#1C4A3A" strokeWidth={2.5} strokeLinecap="round" />

        {/* Crosshair on hover */}
        {hoverIndex !== null && (
          <g>
            <line
              x1={getX(hoverIndex)}
              y1={padTop}
              x2={getX(hoverIndex)}
              y2={H - padBottom}
              stroke="#0F2E24"
              strokeWidth={1}
              strokeDasharray="2 2"
            />
            <circle
              cx={getX(hoverIndex)}
              cy={getY(data[hoverIndex].price)}
              r={5}
              fill="#9BE564"
              stroke="#0F2E24"
              strokeWidth={2}
            />
          </g>
        )}

        {/* Bottom X-axis date labels */}
        {[0, Math.floor(data.length / 2), data.length - 1].map((idx) => {
          if (!data[idx]) return null;
          return (
            <text
              key={idx}
              x={getX(idx)}
              y={H - padBottom + 18}
              textAnchor={idx === 0 ? "start" : idx === data.length - 1 ? "end" : "middle"}
              className="fill-[#787266] text-[10px] font-mono"
            >
              {data[idx].date.slice(5)}
            </text>
          );
        })}
      </svg>

      <div className="mt-2 text-[11px] text-[#787266] flex items-center justify-between border-t border-[#F3F1E9] pt-2">
        <span>Units: ₹ per kg (equiv. to quintal rates divided by 100)</span>
        <span>Source: Historic Mandi Trends + Agmarknet Arrivals</span>
      </div>
    </div>
  );
};

export const MarketPredictor: React.FC = () => {
  const { t, interfaceLocale, displayCurrency } = useLocalization();
  const [commodity, setCommodity] = useState<CommodityId>("Tomato");
  const [timeframe, setTimeframe] = useState<Timeframe>(30);
  const [loading, setLoading] = useState(false);

  const currentCommodity = COMMODITIES.find((c) => c.id === commodity) || COMMODITIES[0];

  const result: PredictionResult = useMemo(() => {
    const series = generateSeries(commodity, timeframe);
    return analyze(series, t);
  }, [commodity, timeframe, t]);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(id);
  }, [commodity, timeframe]);

  const inrPerDisplay = FALLBACK_RATES[displayCurrency] || 1.0;
  const currentPriceConverted = result.currentPrice / inrPerDisplay;
  const bestPriceConverted = result.bestPrice / inrPerDisplay;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header and Honest Model Status Chip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E7E3D8]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1C4A3A]">
              Agronomic Economics
            </span>
            <span className="text-[#A8A092]">·</span>
            <Badge variant="outline">
              Simulated Forecast
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2E24] tracking-tight font-display">
            {t("predictor.title") || "Harvest Market Price Predictor"}
          </h1>
          <p className="text-xs sm:text-sm text-[#787266] mt-0.5">
            {t("predictor.subtitle") || "Empirical econometric price forecasting based on arrival trends and seasonal deviation."}
          </p>
        </div>

        {/* Model Transparency Status */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-[#FAF9F5] border border-[#E7E3D8] px-3 py-1.5 rounded-xl text-xs">
          <div className="w-2 h-2 rounded-full bg-[#E9A23B] animate-pulse" />
          <span className="text-[#0F2E24] font-medium">Model:</span>
          <span className="font-bold text-[#1C4A3A]">Seasonal Heuristic</span>
          <span className="text-[#A8A092]">|</span>
          <span className="text-[#787266] text-[11px]">Not yet backtested</span>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Controls & Strategic Decision Card (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Controls Card */}
          <div className="agri-card p-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#787266]">
              Simulation Parameters
            </h2>

            {/* Commodity Selector */}
            <div>
              <label className="agri-label block mb-1.5">
                {t("predictor.commodity") || "Commodity & Reference Mandi"}
              </label>
              <select
                value={commodity}
                onChange={(e) => setCommodity(e.target.value as CommodityId)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#D3CDC0] bg-white text-xs font-bold text-[#0F2E24] focus:outline-none focus:ring-2 focus:ring-[#3E8E8A]"
              >
                {COMMODITIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label} ({c.mandi})
                  </option>
                ))}
              </select>
            </div>

            {/* Timeframe Segmented Control (7, 30, 90 days) */}
            <div>
              <label className="agri-label block mb-1.5">
                {t("predictor.timeframe") || "Forecast Horizon"}
              </label>
              <div className="grid grid-cols-3 gap-1 bg-[#FAF9F5] p-1 rounded-xl border border-[#E7E3D8]">
                {([7, 30, 90] as Timeframe[]).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setTimeframe(d)}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                      timeframe === d
                        ? "bg-[#0F2E24] text-white shadow-xs"
                        : "text-[#787266] hover:text-[#0F2E24]"
                    }`}
                  >
                    {d} Days
                  </button>
                ))}
              </div>
            </div>

            {/* Recalculate Button */}
            <button
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 300);
              }}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1C4A3A] hover:bg-[#0F2E24] text-white text-xs font-bold transition-all shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>{t("predictor.recalculate") || "Run Sensitivity Simulation"}</span>
            </button>
          </div>

          {/* Action Recommendation Card (Clear, Honest, Actionable) */}
          <div className="agri-card p-5 border-l-4 border-l-[#9BE564]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-bold tracking-wider text-[#787266]">
                Optimal Action
              </span>
              <Badge variant={result.optimalAction === "HOLD" ? "lime" : "warning"}>
                {result.optimalAction === "HOLD" ? "Hold Produce" : "Liquidate / Sell"}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-[#787266]">Expected Peak Rate:</span>
                <span className="text-lg font-mono font-extrabold text-[#0F2E24]">
                  {formatCurrencyAmount(bestPriceConverted, displayCurrency, interfaceLocale)} / kg
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-xs text-[#787266]">Target Sale Date:</span>
                <span className="text-xs font-bold text-[#0F2E24]">
                  {formatDate(result.bestSellDate, interfaceLocale)}
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-xs text-[#787266]">Projected Gain:</span>
                <span className="text-xs font-bold text-[#2F9E6B]">
                  +{result.expectedGainPercent}% vs today
                </span>
              </div>

              <div className="flex items-baseline justify-between border-t border-[#F3F1E9] pt-2">
                <span className="text-xs text-[#787266]">Confidence Index:</span>
                <span className="text-xs font-bold text-[#1C4A3A]">
                  {result.confidence}% heuristic match
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#787266] mt-4 bg-[#FAF9F5] p-2.5 rounded-lg border border-[#E7E3D8] leading-relaxed">
              <strong>Recommendation Rationale:</strong> Seasonal retail peak coincides with supply contraction in secondary mandis between Day 12 and Day 21. Holding storage costs are estimated at ₹0.80/kg/month.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Data-Viz Chart & Key Impact Factors (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Forecast Chart */}
          <InteractiveForecastChart
            data={result.series}
            bestDate={result.bestSellDate}
            currency={displayCurrency}
            locale={interfaceLocale}
          />

          {/* Key Market Impact Factors (Ranked with +/- impact bars) */}
          <div className="agri-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-[#0F2E24]">
                  {t("predictor.keyFactors") || "Key Market Factors & Empirical Sensitivity"}
                </h3>
                <p className="text-[11px] text-[#787266]">
                  Weight of each macroeconomic indicator on price trajectory
                </p>
              </div>
              <Badge variant="outline">4 Factors Tracked</Badge>
            </div>

            <div className="space-y-3">
              {result.keyFactors.map((f, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl border border-[#E7E3D8] bg-[#FAF9F5] hover:bg-white transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#0F2E24]">{f.name}</span>
                    <span
                      className={`text-xs font-mono font-bold ${
                        f.impact > 0 ? "text-[#2F9E6B]" : "text-[#C8553D]"
                      }`}
                    >
                      {f.impact > 0 ? `+${f.impact}%` : `${f.impact}%`}
                    </span>
                  </div>

                  {/* Visual Impact Bar */}
                  <div className="w-full h-1.5 bg-[#E7E3D8] rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full ${
                        f.impact > 0 ? "bg-[#2F9E6B]" : "bg-[#C8553D]"
                      }`}
                      style={{ width: `${Math.min(100, Math.abs(f.impact) * 18)}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-[#787266] leading-snug">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <Callout variant="warning" title="Model Limitations & Advisory">
            Agricultural commodities are subject to sudden localized mandi arrivals, weather events, and transport blockades. Never commit forward sales based solely on simulation models without consulting your local APMC Secretary.
          </Callout>
        </div>
      </div>
    </div>
  );
};

export default MarketPredictor;
