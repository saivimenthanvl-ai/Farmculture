// src/App.tsx
import { BrowserRouter, Routes, Route, Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import { FeatureCard } from "./components/FeatureCard";
import { CropDiagnosis } from "./components/CropDiagnosis";
import MarketPrices from "./components/MarketPrices";
import { GovernmentSchemes } from "./components/GovernmentSchemes";
import VoiceAssistant from "./components/VoiceAssistant";
import LoginPage from "./app/auth/login/page";
import DashboardPage from "./app/dashboard/page";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./components/NotFoundPage";

import { RestaurantConnect } from "./components/RestaurantConnect";
import { ColdStorage } from "./components/ColdStorage";
import { MarketPredictor } from "./components/MarketPredictor";
import { CropHealthMonitor } from "./components/CropHealthMonitor";
import { DroneMonitoring } from "./components/DroneMonitoring";
import { SmartIrrigation } from "./components/SmartIrrigation";
import { WeatherInsights } from "./components/WeatherInsights";
import { BlockchainTraceability } from "./components/BlockchainTraceability";

// Informational & Legal Pages
import AboutUsPage from "./pages/AboutUsPage";
import ServicesPage from "./pages/ServicesPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import ContactUsPage from "./pages/ContactUsPage";

// Providers
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";

// Reviews System
import ReviewCarousel from "@/components/ReviewCarousel";

// Modern authentic footer
import Footer from "@/components/Footer";

// Icons
import {
  Camera,
  TrendingUp,
  FileText,
  Mic,
  Store,
  Thermometer,
  Brain,
  Satellite,
  Plane,
  Droplets,
  Cloud,
  Package,
} from "lucide-react";

import { AppSidebar, MobileTabBar } from "./components/navigation/AppSidebar";
import { CommandPalette } from "./components/ui/CommandPalette";

/** Shared Layout with AppSidebar, Sticky Header, Command Palette, and MobileTabBar */
function AppLayout() {
  const [isListening, setIsListening] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Listen for Ctrl+K / Cmd+K to toggle command palette
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F4EE] flex text-[#1B1F1C]">
      {/* App Sidebar */}
      <AppSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <Header
          isListening={isListening}
          onToggleListening={() => setIsListening((v) => !v)}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto">
          <Outlet context={{ isListening, setIsListening }} />
        </main>

        <Footer />
      </div>

      {/* Mobile Tab Bar */}
      <MobileTabBar />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}

/** Homepage Grid */
function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{t("welcome")}</h1>
        <p className="text-gray-600 text-xl mb-2">{t("subtitle")}</p>
        <p className="text-gray-500 text-lg">{t("tagline")}</p>
      </div>

      {/* Core Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {t("agriculture_tools")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/crop-diagnosis" className="block">
            <FeatureCard
              icon={Camera}
              title={t("crop_diagnosis")}
              description={t("crop_diagnosis_desc")}
              badge="Verified & Available"
              badgeColor="green"
            />
          </Link>
          <Link to="/market-prices" className="block">
            <FeatureCard
              icon={TrendingUp}
              title={t("market_prices")}
              description={t("market_prices_desc")}
              badge="Verified & Available"
              badgeColor="green"
            />
          </Link>
          <Link to="/schemes" className="block">
            <FeatureCard
              icon={FileText}
              title={t("govt_schemes")}
              description={t("govt_schemes_desc")}
              badge="Verified & Available"
              badgeColor="green"
            />
          </Link>
          <Link to="/assistant" className="block">
            <FeatureCard
              icon={Mic}
              title={t("voice_assistant")}
              description={t("voice_assistant_desc")}
              badge={t("home.badgeVoice")}
              badgeColor="blue"
            />
          </Link>
          <Link to="/restaurants" className="block">
            <FeatureCard
              icon={Store}
              title={t("restaurants")}
              description={t("restaurants_desc")}
              badge={t("home.badgeVerified")}
              badgeColor="green"
            />
          </Link>
          <Link to="/storage" className="block">
            <FeatureCard
              icon={Thermometer}
              title={t("cold_storage")}
              description={t("cold_storage_desc")}
              badge={t("home.badgeVerified")}
              badgeColor="green"
            />
          </Link>
        </div>
      </div>

      {/* Advanced Features & Precision Roadmap */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {t("advanced_features")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/predictor" className="block">
            <FeatureCard
              icon={Brain}
              title={t("market_predictor")}
              description={t("market_predictor_desc")}
              badge={t("home.badgePredictor")}
              badgeColor="blue"
            />
          </Link>
          <Link to="/crop-health" className="block">
            <FeatureCard
              icon={Satellite}
              title={t("crop_health_monitor")}
              description={t("crop_health_monitor_desc")}
              badge={t("home.badgeHealth")}
              badgeColor="blue"
            />
          </Link>
          <Link to="/drones" className="block">
            <FeatureCard
              icon={Plane}
              title={t("drone_monitoring")}
              description={t("drone_monitoring_desc")}
              badge={t("home.badgePilot")}
              badgeColor="amber"
            />
          </Link>
          <Link to="/irrigation" className="block">
            <FeatureCard
              icon={Droplets}
              title={t("smart_irrigation")}
              description={t("smart_irrigation_desc")}
              badge={t("home.badgeIrrigation")}
              badgeColor="blue"
            />
          </Link>
          <Link to="/weather" className="block">
            <FeatureCard
              icon={Cloud}
              title={t("weather_insights")}
              description={t("weather_insights_desc")}
              badge={t("home.badgeVerified")}
              badgeColor="green"
            />
          </Link>
          <Link to="/traceability" className="block">
            <FeatureCard
              icon={Package}
              title={t("blockchain_traceability")}
              description={t("blockchain_traceability_desc")}
              badge={t("home.badgeTraceability")}
              badgeColor="amber"
            />
          </Link>
        </div>
      </div>

      {/* Factual Operational Architecture (Replaces unverified marketing superlatives) */}
      <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">{t("home.mandiSourced")}</div>
          <div className="text-lg font-bold text-gray-900">{t("home.apmcProvenance")}</div>
          <p className="text-xs text-gray-500 mt-1">{t("home.mandiDesc")}</p>
        </div>
        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">{t("home.evidenceBased")}</div>
          <div className="text-lg font-bold text-gray-900">{t("home.cropDiagTitle")}</div>
          <p className="text-xs text-gray-500 mt-1">{t("home.cropDiagDesc")}</p>
        </div>
        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">{t("home.multilingual")}</div>
          <div className="text-lg font-bold text-gray-900">{t("home.globalRegional")}</div>
          <p className="text-xs text-gray-500 mt-1">{t("home.multilingualDesc")}</p>
        </div>
        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">{t("home.zeroLockin")}</div>
          <div className="text-lg font-bold text-gray-900">{t("home.openDirectory")}</div>
          <p className="text-xs text-gray-500 mt-1">{t("home.openDirectoryDesc")}</p>
        </div>
      </div>

      {/* Genuine Community Reviews Section */}
      <ReviewCarousel />

      {/* Revolutionary Highlights */}
      <section className="mt-8">
        <div className="rounded-2xl p-[1px] bg-gradient-to-r from-green-600 via-green-600 to-green-600">
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm px-6 py-8">
            <h2 className="text-center text-white text-2xl md:text-3xl font-bold mb-6">
              {t("revolutionary_agriculture")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
              <div className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-sm">
                <Brain className="w-8 h-8 mb-3 opacity-90" />
                <h3 className="font-semibold">{t("market_prediction")}</h3>
                <p className="mt-1 text-white/90 text-sm">{t("market_prediction_desc")}</p>
              </div>

              <div className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-sm">
                <Satellite className="w-8 h-8 mb-3 opacity-90" />
                <h3 className="font-semibold">{t("satellite_monitoring")}</h3>
                <p className="mt-1 text-white/90 text-sm">{t("satellite_monitoring_desc")}</p>
              </div>

              <div className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-sm">
                <Package className="w-8 h-8 mb-3 opacity-90" />
                <h3 className="font-semibold">{t("blockchain_transparency")}</h3>
                <p className="mt-1 text-white/90 text-sm">{t("blockchain_transparency_desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/** Voice Assistant Wrapper */
function VoiceAssistantRoute() {
  const [isListening, setIsListening] = useState(false);
  return (
    <VoiceAssistant
      isListening={isListening}
      onToggleListening={() => setIsListening((v) => !v)}
    />
  );
}

import { LocalizationProvider } from "./contexts/LocalizationContext";

/* -------------------- MAIN APP WITH FC-21 ROUTING -------------------- */
export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <LocalizationProvider>
          <BrowserRouter>
          <Routes>
            {/* Public Layout Routes */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/crop-diagnosis" element={<CropDiagnosis />} />
              <Route path="/market-prices" element={<MarketPrices />} />
              <Route path="/weather" element={<WeatherInsights />} />
              <Route path="/schemes" element={<GovernmentSchemes />} />
              <Route path="/assistant" element={<VoiceAssistantRoute />} />
              <Route path="/restaurants" element={<RestaurantConnect />} />
              <Route path="/storage" element={<ColdStorage />} />
              <Route path="/predictor" element={<MarketPredictor />} />
              <Route path="/crop-health" element={<CropHealthMonitor />} />
              <Route path="/drones" element={<DroneMonitoring />} />
              <Route path="/irrigation" element={<SmartIrrigation />} />
              <Route path="/traceability" element={<BlockchainTraceability />} />

              {/* Informational & Legal Routes (Phase 4 & 5) */}
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/contact" element={<ContactUsPage />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
              </Route>

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Auth Screen (Isolated) */}
            <Route path="/auth/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
        </LocalizationProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
