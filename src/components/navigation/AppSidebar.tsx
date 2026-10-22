import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Camera,
  TrendingUp,
  Brain,
  Cloud,
  FileText,
  Package,
  ShieldCheck,
  Menu,
  X,
  Compass,
} from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";

export interface NavItem {
  labelKey: string;
  defaultLabel: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const NAV_ITEMS: NavItem[] = [
  { labelKey: "navigation.dashboard", defaultLabel: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { labelKey: "crop_diagnosis", defaultLabel: "Crop Diagnosis", path: "/crop-diagnosis", icon: Camera },
  { labelKey: "market_prices", defaultLabel: "Market Prices", path: "/market-prices", icon: TrendingUp },
  { labelKey: "market_predictor", defaultLabel: "Price Predictor", path: "/market-predictor", icon: Brain },
  { labelKey: "weather_insights", defaultLabel: "Weather Telemetry", path: "/weather", icon: Cloud },
  { labelKey: "blockchain_traceability", defaultLabel: "Product Passport", path: "/traceability", icon: Package },
  { labelKey: "govt_schemes", defaultLabel: "Schemes & Grants", path: "/schemes", icon: FileText },
  { labelKey: "footerNav.disclaimer", defaultLabel: "Advisory Disclaimer", path: "/disclaimer", icon: ShieldCheck },
];

export const AppSidebar: React.FC<{
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}> = ({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }) => {
  const { t } = useLocalization();
  const location = useLocation();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0F2E24] text-white border-r border-[#1C4A3A]">
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#1C4A3A]">
        <Link to="/" className="flex items-center gap-2.5 overflow-hidden" onClick={onCloseMobile}>
          <div className="w-9 h-9 rounded-lg bg-[#9BE564] text-[#0F2E24] flex items-center justify-center font-extrabold text-lg shrink-0 shadow-sm">
            F
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <span className="font-extrabold text-base tracking-tight font-display text-white">
                Farmculture
              </span>
              <span className="block text-[10px] text-[#9BE564] font-semibold tracking-wider uppercase">
                Agronomy Lab
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-[#1C4A3A] transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label="Toggle sidebar collapse"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] uppercase font-bold tracking-wider text-emerald-300/70">
          {!collapsed && (t("navigation.mainTools") || "Agricultural Tools")}
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? "bg-[#9BE564] text-[#0F2E24] shadow-sm font-bold"
                  : "text-emerald-100/90 hover:bg-[#1C4A3A] hover:text-white"
              }`}
              title={item.defaultLabel}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#0F2E24]" : "text-emerald-300"}`} />
              {!collapsed && <span>{t(item.labelKey) || item.defaultLabel}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Model & Source Status Pill */}
      {!collapsed && (
        <div className="p-3 mx-2 mb-3 bg-[#1C4A3A]/80 border border-[#265B47] rounded-xl text-[11px] text-emerald-100">
          <div className="flex items-center gap-1.5 font-bold text-[#9BE564] mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9BE564] animate-pulse" />
            <span>Telemetry Active</span>
          </div>
          <p className="text-[10px] text-emerald-200/80 leading-snug">
            Live feeds: APMC Mandis &amp; Open-Meteo
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block shrink-0 transition-all duration-200 ease-out z-30 sticky top-0 h-screen ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-xs animate-in fade-in duration-150"
          onClick={onCloseMobile}
        >
          <div
            className="w-72 h-full bg-[#0F2E24] animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export const MobileTabBar: React.FC = () => {
  const location = useLocation();
  const { t } = useLocalization();

  const mobileTabs = [
    { path: "/dashboard", labelKey: "navigation.dashboard", defaultLabel: "Home", icon: LayoutDashboard },
    { path: "/crop-diagnosis", labelKey: "crop_diagnosis", defaultLabel: "Diagnosis", icon: Camera },
    { path: "/market-prices", labelKey: "market_prices", defaultLabel: "Prices", icon: TrendingUp },
    { path: "/market-predictor", labelKey: "market_predictor", defaultLabel: "Predictor", icon: Brain },
    { path: "/weather", labelKey: "weather_insights", defaultLabel: "Weather", icon: Cloud },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 bg-[#0F2E24] border-t border-[#1C4A3A] px-2 py-1.5 flex items-center justify-around z-40 md:hidden">
      {mobileTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.path;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors ${
              isActive ? "text-[#9BE564]" : "text-emerald-200/80 hover:text-white"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="truncate max-w-[56px]">{t(tab.labelKey) || tab.defaultLabel}</span>
          </Link>
        );
      })}
    </div>
  );
};
