import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Tractor,
  FileSpreadsheet,
  History,
  Camera,
  TrendingUp,
  Cloud,
  FileText,
  Store,
  Thermometer,
  Headphones,
  Brain,
  Satellite,
  Plane,
  Droplets,
  Package,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
} from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export interface NavCategory {
  categoryKey: string;
  defaultCategory: string;
  items: {
    labelKey: string;
    defaultLabel: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    isExperimental?: boolean;
    badge?: string;
  }[];
}

export const NAV_CATEGORIES: NavCategory[] = [
  {
    categoryKey: "navigation.overview",
    defaultCategory: "Overview",
    items: [
      {
        labelKey: "navigation.dashboard",
        defaultLabel: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    categoryKey: "navigation.myFarm",
    defaultCategory: "My Farm",
    items: [
      {
        labelKey: "navigation.farms",
        defaultLabel: "Farms & Plots",
        path: "/dashboard?tab=farms",
        icon: Tractor,
      },
      {
        labelKey: "navigation.cropRecords",
        defaultLabel: "Crop Records",
        path: "/dashboard?tab=crops",
        icon: FileSpreadsheet,
      },
      {
        labelKey: "navigation.history",
        defaultLabel: "Assessment History",
        path: "/crop-diagnosis?tab=history",
        icon: History,
      },
    ],
  },
  {
    categoryKey: "navigation.intelligence",
    defaultCategory: "Agricultural Intelligence",
    items: [
      {
        labelKey: "navigation.cropDiagnosis",
        defaultLabel: "Crop Diagnosis",
        path: "/crop-diagnosis",
        icon: Camera,
      },
      {
        labelKey: "navigation.marketPrices",
        defaultLabel: "Market Prices",
        path: "/market-prices",
        icon: TrendingUp,
      },
      {
        labelKey: "navigation.weather",
        defaultLabel: "Weather Insights",
        path: "/weather",
        icon: Cloud,
      },
      {
        labelKey: "navigation.schemes",
        defaultLabel: "Government Schemes",
        path: "/schemes",
        icon: FileText,
      },
    ],
  },
  {
    categoryKey: "navigation.marketServices",
    defaultCategory: "Market & Services",
    items: [
      {
        labelKey: "navigation.buyerDirectory",
        defaultLabel: "Buyer Directory",
        path: "/restaurants",
        icon: Store,
      },
      {
        labelKey: "navigation.coldStorage",
        defaultLabel: "Cold Storage",
        path: "/storage",
        icon: Thermometer,
      },
      {
        labelKey: "navigation.support",
        defaultLabel: "Support & Contact",
        path: "/contact",
        icon: Headphones,
      },
    ],
  },
  {
    categoryKey: "navigation.experimental",
    defaultCategory: "Experimental Prototypes",
    items: [
      {
        labelKey: "navigation.predictor",
        defaultLabel: "Price Predictor",
        path: "/predictor",
        icon: Brain,
        isExperimental: true,
      },
      {
        labelKey: "navigation.cropHealth",
        defaultLabel: "Crop Health Satellite",
        path: "/crop-health",
        icon: Satellite,
        isExperimental: true,
      },
      {
        labelKey: "navigation.drones",
        defaultLabel: "Drone Monitoring",
        path: "/drones",
        icon: Plane,
        isExperimental: true,
      },
      {
        labelKey: "navigation.irrigation",
        defaultLabel: "Smart Irrigation",
        path: "/irrigation",
        icon: Droplets,
        isExperimental: true,
      },
      {
        labelKey: "navigation.traceability",
        defaultLabel: "Product Passport",
        path: "/traceability",
        icon: Package,
        isExperimental: true,
      },
    ],
  },
];

export const AppSidebar: React.FC<{
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}> = ({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }) => {
  const { t } = useLocalization();
  const { user } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onCloseMobile();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0F2E24] text-white border-r border-[#1C4A3A]">
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#1C4A3A]">
        <Link to="/" className="flex items-center gap-2.5 overflow-hidden" onClick={onCloseMobile}>
          <div className="w-9 h-9 rounded-lg bg-[#9BE564] text-[#0F2E24] flex items-center justify-center font-extrabold text-lg shrink-0 shadow-xs">
            F
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <span className="font-extrabold text-base tracking-tight font-display text-white">
                Farmculture AI
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

      {/* Navigation Sections */}
      <nav className="flex-1 py-3 px-2 space-y-4 overflow-y-auto">
        {NAV_CATEGORIES.map((category) => (
          <div key={category.categoryKey} className="space-y-1">
            {!collapsed && (
              <div className="px-3 pt-1 pb-1 text-[10px] uppercase font-bold tracking-wider text-emerald-300/70 flex items-center justify-between">
                <span>{t(category.categoryKey) || category.defaultCategory}</span>
                {category.categoryKey === "navigation.experimental" && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#E9A23B]/20 text-[#E9A23B] font-mono lowercase">
                    demo
                  </span>
                )}
              </div>
            )}
            {category.items.map((item) => {
              const Icon = item.icon;
              // Check active status by matching pathname or search tab
              const isActive =
                item.path.includes("?")
                  ? location.pathname + location.search === item.path
                  : location.pathname === item.path && !location.search;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                    isActive
                      ? "bg-[#9BE564] text-[#0F2E24] shadow-xs font-bold"
                      : "text-emerald-100/90 hover:bg-[#1C4A3A] hover:text-white"
                  }`}
                  title={item.defaultLabel}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-[#0F2E24]" : "text-emerald-300"
                    }`}
                  />
                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <span className="truncate">{t(item.labelKey) || item.defaultLabel}</span>
                      {item.isExperimental && (
                        <span className="text-[9px] font-mono text-emerald-300/80 group-hover:text-emerald-200">
                          preview
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        ))}

        {/* Account Group */}
        {user && (
          <div className="pt-2 border-t border-[#1C4A3A] space-y-1">
            {!collapsed && (
              <div className="px-3 pb-1 text-[10px] uppercase font-bold tracking-wider text-emerald-300/70">
                {t("navigation.account") || "Account"}
              </div>
            )}
            <Link
              to="/profile"
              onClick={onCloseMobile}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-100/90 hover:bg-[#1C4A3A] hover:text-white"
            >
              <User className="w-4 h-4 text-emerald-300 shrink-0" />
              {!collapsed && <span>{t("navigation.profile") || "My Profile"}</span>}
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#FAECE9] hover:bg-[#C8553D]/30 transition-colors"
            >
              <LogOut className="w-4 h-4 text-[#C8553D] shrink-0" />
              {!collapsed && <span>{t("navigation.logout") || "Sign Out"}</span>}
            </button>
          </div>
        )}
      </nav>

      {/* Telemetry Status Footer */}
      {!collapsed && (
        <div className="p-3 mx-2 mb-3 bg-[#1C4A3A]/80 border border-[#265B47] rounded-xl text-[11px] text-emerald-100">
          <div className="flex items-center gap-1.5 font-bold text-[#9BE564] mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9BE564] animate-pulse" />
            <span>Open-Meteo &amp; APMC Sync</span>
          </div>
          <p className="text-[10px] text-emerald-200/80 leading-snug">
            Authentic meteorological and wholesale mandi feeds
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
    {
      path: "/dashboard",
      labelKey: "navigation.dashboard",
      defaultLabel: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/crop-diagnosis",
      labelKey: "navigation.cropDiagnosis",
      defaultLabel: "Diagnosis",
      icon: Camera,
    },
    {
      path: "/market-prices",
      labelKey: "navigation.marketPrices",
      defaultLabel: "Prices",
      icon: TrendingUp,
    },
    {
      path: "/weather",
      labelKey: "navigation.weather",
      defaultLabel: "Weather",
      icon: Cloud,
    },
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
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-bold transition-colors ${
              isActive ? "text-[#9BE564]" : "text-emerald-200/70 hover:text-white"
            }`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="truncate max-w-[64px]">{t(tab.labelKey) || tab.defaultLabel}</span>
          </Link>
        );
      })}
    </div>
  );
};
