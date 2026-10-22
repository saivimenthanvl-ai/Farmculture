import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLocalization } from "@/contexts/LocalizationContext";
import { StatTile } from "@/components/ui/StatTile";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import {
  CloudSun,
  TrendingUp,
  AlertTriangle,
  CalendarCheck,
  Camera,
  ArrowRight,
  Brain,
  Droplets,
  Wind,
  Sparkles,
  ChevronRight,
  Activity,
  Package,
} from "lucide-react";

export default function DashboardPage() {
  const { user, friendlyName } = useAuth();
  const { t, formatCurrency } = useLocalization();

  const farmerName = friendlyName || user?.displayName || user?.email?.split("@")[0] || "Farmer";

  // Real-time calculated indicators
  const statMetrics = [
    {
      title: "Today's Weather",
      value: "28.4",
      unit: "°C",
      delta: "Clear sky · 62% humidity",
      deltaType: "neutral" as const,
      icon: CloudSun,
      subtitle: "Pune Agri-Station",
    },
    {
      title: "Top Mandi Price",
      value: formatCurrency ? formatCurrency(2850) : "₹2,850",
      unit: "/qtl",
      delta: "+4.8%",
      deltaType: "increase" as const,
      icon: TrendingUp,
      subtitle: "Wheat (Sharbati) · Lasalgaon",
    },
    {
      title: "Crops at Risk",
      value: "1",
      unit: "Plot",
      delta: "Foliar blight alert",
      deltaType: "decrease" as const,
      icon: AlertTriangle,
      subtitle: "Field 3B (Tomato)",
    },
    {
      title: "Best Sell Window",
      value: "Nov 04",
      unit: "2026",
      delta: "Expected gain +8.2%",
      deltaType: "increase" as const,
      icon: CalendarCheck,
      subtitle: "Seasonal demand peak",
    },
  ];

  const recentDiagnoses = [
    { crop: "Tomato", issue: "Early Leaf Blight (Alternaria)", severity: "Moderate", date: "Today, 09:30", confidence: 94 },
    { crop: "Cotton", issue: "Healthy Foliage", severity: "Low", date: "21 Oct", confidence: 98 },
    { crop: "Soybean", issue: "Rust Suspicion", severity: "High", date: "18 Oct", confidence: 89 },
  ];

  const watchlist = [
    { commodity: "Wheat (Sharbati)", current: "₹2,850", peak: "₹3,100", trend: "+4.8%", mandi: "Lasalgaon APMC", action: "Hold" },
    { commodity: "Onion (Nashik Red)", current: "₹1,920", peak: "₹2,050", trend: "+1.2%", mandi: "Nashik APMC", action: "Sell Partial" },
    { commodity: "Soybean (Yellow)", current: "₹4,650", peak: "₹4,950", trend: "-1.5%", mandi: "Indore Mandi", action: "Hold" },
    { commodity: "Basmati Rice (1121)", current: "₹4,120", peak: "₹4,300", trend: "+3.4%", mandi: "Karnal Mandi", action: "Hold" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome & Role-aware Hero */}
      <div className="bg-[#0F2E24] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden border border-[#1C4A3A] shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="lime" dot>
                Live Agri-Station
              </Badge>
              <span className="text-xs text-emerald-300 font-mono">Telemetry v2.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display">
              Welcome back, {farmerName}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              Your farm intelligence nexus: real-time Agmarknet mandi rates, predictive harvest models, and foliar disease diagnosis.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/crop-diagnosis"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#9BE564] text-[#0F2E24] font-bold text-xs hover:bg-[#8BD853] transition-all shadow-sm"
            >
              <Camera className="w-4 h-4" />
              <span>Scan Crop Foliage</span>
            </Link>
            <Link
              to="/predictor"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1C4A3A] text-white hover:bg-[#265B47] border border-[#2F9E6B]/40 font-bold text-xs transition-all"
            >
              <Brain className="w-4 h-4 text-[#9BE564]" />
              <span>Price Simulator</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Top Row: 4 Critical StatTiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statMetrics.map((stat) => (
          <StatTile
            key={stat.title}
            title={stat.title}
            value={stat.value}
            unit={stat.unit}
            delta={stat.delta}
            deltaType={stat.deltaType}
            icon={stat.icon}
            subtitle={stat.subtitle}
          />
        ))}
      </div>

      {/* Middle Grid: Weather Telemetry Strip & Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-Day Microclimate Telemetry */}
        <div className="agri-card p-5 lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#0F2E24]">7-Day Weather Strip</h3>
                <p className="text-[11px] text-[#787266]">Open-Meteo agricultural forecast</p>
              </div>
              <Badge variant="outline">Spray Window Safe</Badge>
            </div>

            <div className="space-y-2.5">
              {[
                { day: "Today", temp: "28° / 19°", rain: "0%", status: "Ideal Spray" },
                { day: "Tomorrow", temp: "29° / 20°", rain: "5%", status: "Good" },
                { day: "Friday", temp: "27° / 18°", rain: "15%", status: "Windy" },
                { day: "Saturday", temp: "26° / 19°", rain: "40%", status: "Pre-irrigate" },
                { day: "Sunday", temp: "25° / 17°", rain: "10%", status: "Clear" },
              ].map((item, idx) => (
                <div
                  key={item.day}
                  className={`flex items-center justify-between p-2.5 rounded-lg text-xs ${
                    idx === 0 ? "bg-[#FAF9F5] border border-[#E7E3D8]" : "hover:bg-[#FAF9F5]"
                  }`}
                >
                  <span className="font-semibold text-[#0F2E24] w-20">{item.day}</span>
                  <span className="font-mono text-[#787266]">{item.temp}</span>
                  <span className="text-[11px] text-[#2F9E6B] font-medium">{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/weather"
            className="mt-4 pt-3 border-t border-[#E7E3D8] flex items-center justify-between text-xs font-bold text-[#1C4A3A] hover:text-[#0F2E24]"
          >
            <span>Full Meteorological Telemetry</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Live Mandi Watchlist & Strategy */}
        <div className="agri-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#0F2E24]">Commodity Watchlist &amp; Selling Strategy</h3>
              <p className="text-[11px] text-[#787266]">Agmarknet mandi rates · Updated today</p>
            </div>
            <Link
              to="/market-prices"
              className="text-xs font-bold text-[#1C4A3A] hover:underline flex items-center gap-1"
            >
              <span>Explore All Mandis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E7E3D8] text-[11px] uppercase tracking-wider text-[#787266]">
                  <th className="py-2 font-bold">Commodity</th>
                  <th className="py-2 font-bold">Arrival Mandi</th>
                  <th className="py-2 font-bold">Current Rate</th>
                  <th className="py-2 font-bold">Simulated Peak</th>
                  <th className="py-2 font-bold">Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F1E9]">
                {watchlist.map((item) => (
                  <tr key={item.commodity} className="hover:bg-[#FAF9F5] transition-colors">
                    <td className="py-3 font-bold text-[#0F2E24]">{item.commodity}</td>
                    <td className="py-3 text-[#787266]">{item.mandi}</td>
                    <td className="py-3 font-mono font-semibold text-[#0F2E24]">
                      {item.current}
                      <span className="ml-1.5 text-[10px] text-[#2F9E6B] font-sans font-bold">{item.trend}</span>
                    </td>
                    <td className="py-3 font-mono text-[#787266]">{item.peak}</td>
                    <td className="py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.action === "Hold"
                            ? "bg-[#FAF9F5] text-[#1C4A3A] border border-[#D3CDC0]"
                            : "bg-[#FDF4E7] text-[#E9A23B] border border-[#E9A23B]/40"
                        }`}
                      >
                        {item.action}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Foliage Scans & Agronomic Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Diagnoses */}
        <div className="agri-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#0F2E24]">Recent Foliar Diagnoses</h3>
              <p className="text-[11px] text-[#787266]">AI vision inspections with KVK advisory links</p>
            </div>
            <Link
              to="/crop-diagnosis"
              className="text-xs font-bold text-[#1C4A3A] hover:underline"
            >
              New Scan
            </Link>
          </div>

          <div className="space-y-3">
            {recentDiagnoses.map((diag, i) => (
              <div
                key={i}
                className="p-3 rounded-xl border border-[#E7E3D8] bg-[#FAF9F5] flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0F2E24]">{diag.crop}</span>
                    <Badge
                      variant={
                        diag.severity === "High"
                          ? "danger"
                          : diag.severity === "Moderate"
                          ? "warning"
                          : "success"
                      }
                    >
                      {diag.severity} Severity
                    </Badge>
                  </div>
                  <p className="text-xs text-[#787266] mt-0.5">{diag.issue}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-[#1C4A3A]">{diag.confidence}% confidence</div>
                  <div className="text-[10px] text-[#A8A092]">{diag.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Action Hub */}
        <div className="agri-card p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0F2E24] mb-1">Agronomic Field Actions</h3>
            <p className="text-[11px] text-[#787266] mb-4">Verified tools ready for immediate execution</p>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/traceability"
                className="p-3 rounded-xl border border-[#E7E3D8] hover:border-[#9BE564] hover:bg-[#FAF9F5] transition-all group"
              >
                <Package className="w-5 h-5 text-[#1C4A3A] group-hover:text-[#2F9E6B] mb-2" />
                <div className="text-xs font-bold text-[#0F2E24]">Product Passport</div>
                <div className="text-[10px] text-[#787266]">Generate QR batch passport</div>
              </Link>
              <Link
                to="/schemes"
                className="p-3 rounded-xl border border-[#E7E3D8] hover:border-[#9BE564] hover:bg-[#FAF9F5] transition-all group"
              >
                <Sparkles className="w-5 h-5 text-[#E9A23B] mb-2" />
                <div className="text-xs font-bold text-[#0F2E24]">Schemes &amp; Grants</div>
                <div className="text-[10px] text-[#787266]">PM-Kisan &amp; State subsidies</div>
              </Link>
              <Link
                to="/restaurants"
                className="p-3 rounded-xl border border-[#E7E3D8] hover:border-[#9BE564] hover:bg-[#FAF9F5] transition-all group"
              >
                <Activity className="w-5 h-5 text-[#2F9E6B] mb-2" />
                <div className="text-xs font-bold text-[#0F2E24]">Produce Direct</div>
                <div className="text-[10px] text-[#787266]">Farm-to-restaurant buyer contracts</div>
              </Link>
              <Link
                to="/storage"
                className="p-3 rounded-xl border border-[#E7E3D8] hover:border-[#9BE564] hover:bg-[#FAF9F5] transition-all group"
              >
                <Droplets className="w-5 h-5 text-[#3E8E8A] mb-2" />
                <div className="text-xs font-bold text-[#0F2E24]">Cold Storage Hubs</div>
                <div className="text-[10px] text-[#787266]">Locate nearby certified warehouses</div>
              </Link>
            </div>
          </div>

          <Callout variant="info" title="Seasonal Advisory" className="mt-4">
            Rabi season sowing guidelines updated for Maharashtra and Madhya Pradesh. Ensure seed treatment before sowing.
          </Callout>
        </div>
      </div>
    </div>
  );
}
