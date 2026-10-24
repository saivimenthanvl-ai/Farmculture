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
import AccountSettingsPage from "./pages/account/AccountSettingsPage";

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
import { OfflineBanner } from "./components/ui/OfflineBanner";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import SEOHead from "./components/SEOHead";

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

      {/* Skip to Main Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0F2E24] focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#9BE564] text-xs font-bold"
      >
        Skip to main agricultural workspace
      </a>

      {/* Main Workspace Body: Scrolls independently while sidebar stays pinned */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto pb-16 md:pb-0 [scrollbar-width:thin] [scrollbar-color:#D3CDC0_transparent]">
        <Header
          isListening={isListening}
          onToggleListening={() => setIsListening((v) => !v)}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* PWA Offline Network Banner */}
        <OfflineBanner />

        <main id="main-content" role="main" className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto focus:outline-none">
          <ErrorBoundary>
            <Outlet context={{ isListening, setIsListening }} />
          </ErrorBoundary>
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
    <div className="max-w-7xl mx-auto space-y-8">
      <SEOHead
        title="Agri-Intelligence & Mandi Telemetry"
        description="Verify real APMC mandi arrival prices, access AI foliar disease assistance, and examine demonstration agricultural models."
        canonicalPath="/"
      />
      {/* Hero Welcome Banner */}
      <div className="bg-[#0F2E24] text-white rounded-3xl p-6 sm:p-10 border border-[#1C4A3A] shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C4A3A] border border-[#2F9E6B]/40 text-[#9BE564] text-xs font-bold uppercase tracking-wider">
            <span>●</span>
            <span>Agricultural Intelligence Platform</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            {t("welcome")}
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            {t("subtitle")}
          </p>
          <p className="text-xs sm:text-sm text-emerald-200/70 font-mono">
            {t("tagline")}
          </p>
        </div>
      </div>

      {/* Core Features */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0F2E24]">
              {t("agriculture_tools")}
            </h2>
            <p className="text-xs text-[#787266]">Essential daily operational tools for cultivators</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/crop-diagnosis" className="block">
            <FeatureCard
              icon={Camera}
              title={t("crop_diagnosis")}
              description={t("crop_diagnosis_desc")}
              badge="Verified"
              badgeColor="lime"
            />
          </Link>
          <Link to="/market-prices" className="block">
            <FeatureCard
              icon={TrendingUp}
              title={t("market_prices")}
              description={t("market_prices_desc")}
              badge="Live APMC"
              badgeColor="green"
            />
          </Link>
          <Link to="/schemes" className="block">
            <FeatureCard
              icon={FileText}
              title={t("govt_schemes")}
              description={t("govt_schemes_desc")}
              badge="Verified"
              badgeColor="green"
            />
          </Link>
          <Link to="/assistant" className="block">
            <FeatureCard
              icon={Mic}
              title={t("voice_assistant")}
              description={t("voice_assistant_desc")}
              badge={t("home.badgeVoice")}
              badgeColor="teal"
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
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0F2E24]">
              {t("advanced_features")}
            </h2>
            <p className="text-xs text-[#787266]">Empirical telemetry and predictive agronomic models</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/predictor" className="block">
            <FeatureCard
              icon={Brain}
              title={t("market_predictor")}
              description={t("market_predictor_desc")}
              badge={t("home.badgePredictor")}
              badgeColor="teal"
            />
          </Link>
          <Link to="/crop-health" className="block">
            <FeatureCard
              icon={Satellite}
              title={t("crop_health_monitor")}
              description={t("crop_health_monitor_desc")}
              badge={t("home.badgeHealth")}
              badgeColor="teal"
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
              badgeColor="teal"
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

      {/* Factual Operational Architecture Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-[#E7E3D8]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#1C4A3A] mb-1">{t("home.mandiSourced")}</div>
          <div className="text-sm font-bold text-[#0F2E24]">{t("home.apmcProvenance")}</div>
          <p className="text-xs text-[#787266] mt-1 leading-relaxed">{t("home.mandiDesc")}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E7E3D8]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#3E8E8A] mb-1">{t("home.evidenceBased")}</div>
          <div className="text-sm font-bold text-[#0F2E24]">{t("home.cropDiagTitle")}</div>
          <p className="text-xs text-[#787266] mt-1 leading-relaxed">{t("home.cropDiagDesc")}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E7E3D8]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#2F9E6B] mb-1">{t("home.multilingual")}</div>
          <div className="text-sm font-bold text-[#0F2E24]">{t("home.globalRegional")}</div>
          <p className="text-xs text-[#787266] mt-1 leading-relaxed">{t("home.multilingualDesc")}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E7E3D8]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#E9A23B] mb-1">{t("home.zeroLockin")}</div>
          <div className="text-sm font-bold text-[#0F2E24]">{t("home.openDirectory")}</div>
          <p className="text-xs text-[#787266] mt-1 leading-relaxed">{t("home.openDirectoryDesc")}</p>
        </div>
      </div>

      {/* Community Reviews Section */}
      <ReviewCarousel />
    </div>
  );
}

/** Voice Assistant Wrapper */
function VoiceAssistantRoute() {
  return <VoiceAssistant />;
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
                <Route path="/profile" element={<AccountSettingsPage />} />
                <Route path="/settings/account" element={<AccountSettingsPage />} />
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
