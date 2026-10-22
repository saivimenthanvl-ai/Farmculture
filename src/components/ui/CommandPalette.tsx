import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, LayoutDashboard, Camera, TrendingUp, Brain, Cloud, Package, FileText, ArrowRight } from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";

interface CommandItem {
  id: string;
  title: string;
  category: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const CommandPalette: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { t } = useLocalization();

  const commands: CommandItem[] = [
    { id: "dashboard", title: t("navigation.dashboard") || "Dashboard", category: "Navigation", path: "/dashboard", icon: LayoutDashboard },
    { id: "crop-diagnosis", title: t("crop_diagnosis") || "Crop Disease Diagnosis", category: "Agronomy", path: "/crop-diagnosis", icon: Camera },
    { id: "market-prices", title: t("market_prices") || "Mandi Market Prices", category: "Market", path: "/market-prices", icon: TrendingUp },
    { id: "predictor", title: t("market_predictor") || "Price Predictor & Simulation", category: "Market", path: "/predictor", icon: Brain },
    { id: "weather", title: t("weather_insights") || "Agro-Weather Telemetry", category: "Agronomy", path: "/weather", icon: Cloud },
    { id: "traceability", title: t("blockchain_traceability") || "Product Passport (Traceability)", category: "Supply Chain", path: "/traceability", icon: Package },
    { id: "schemes", title: t("govt_schemes") || "Government Schemes & Subsidies", category: "Policy", path: "/schemes", icon: FileText },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-in fade-in duration-100"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-[#E7E3D8] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3.5 border-b border-[#E7E3D8] gap-3 bg-[#FAF9F5]">
          <Search className="w-5 h-5 text-[#1C4A3A]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, commodities, weather telemetry (Ctrl+K)..."
            className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-[#0F2E24] placeholder:text-[#A8A092]"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#787266] hover:text-[#0F2E24] hover:bg-[#E7E3D8]/50"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto p-2 divide-y divide-[#F3F1E9]">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#787266]">
              No agricultural modules matching &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => {
                    navigate(cmd.path);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#EDF4F0] text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF9F5] border border-[#E7E3D8] flex items-center justify-center text-[#1C4A3A] group-hover:border-[#9BE564] group-hover:bg-white">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F2E24]">{cmd.title}</div>
                      <div className="text-[10px] text-[#787266] font-medium">{cmd.category}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#A8A092] group-hover:text-[#1C4A3A] group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2 border-t border-[#E7E3D8] bg-[#FAF9F5] flex items-center justify-between text-[11px] text-[#787266]">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#D3CDC0] text-[#0F2E24] text-[10px] font-mono">ESC</kbd> to exit</span>
          <span className="font-semibold text-[#1C4A3A]">Farmculture Lab v2.2</span>
        </div>
      </div>
    </div>
  );
};
