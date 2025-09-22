// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import { FeatureCard } from "./components/FeatureCard";
import { CropDiagnosis } from "./components/CropDiagnosis";
import MarketPrices from "./components/MarketPrices";
import { GovernmentSchemes } from "./components/GovernmentSchemes";
import VoiceAssistant from "./components/VoiceAssistant";
import LoginPage from "./app/auth/login/page";
import { RestaurantConnect } from "./components/RestaurantConnect";
import { ColdStorage } from "./components/ColdStorage";
import { MarketPredictor } from "./components/MarketPredictor";
import { CropHealthMonitor } from "./components/CropHealthMonitor";
import { DroneMonitoring } from "./components/DroneMonitoring";
import { SmartIrrigation } from "./components/SmartIrrigation";
import { WeatherInsights } from "./components/WeatherInsights";
import { BlockchainTraceability } from "./components/BlockchainTraceability";

// Providers
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";

// Multilingual footer (replaces old Footer)
import FooterIntl from "@/components/FooterIntl";

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

type ActiveFeature =
  | "home"
  | "diagnosis"
  | "markets"
  | "schemes"
  | "voice"
  | "restaurants"
  | "storage"
  | "predictor"
  | "health"
  | "drones"
  | "irrigation"
  | "weather"
  | "blockchain";

function AppContent() {
  const [activeFeature, setActiveFeature] = useState<ActiveFeature>("home");
  const [isListening, setIsListening] = useState(false);
  const { t } = useLanguage();

  const toggleListening = () => {
    setIsListening((s) => !s);
    if (!isListening) setActiveFeature("voice");
  };

  const renderContent = () => {
    switch (activeFeature) {
      case "diagnosis":
        return <CropDiagnosis />;
      case "markets":
        return <MarketPrices />;
      case "schemes":
        return <GovernmentSchemes />;
      case "voice":
        return (
          <VoiceAssistant
            isListening={isListening}
            onToggleListening={toggleListening}
          />
        );
      case "restaurants":
        return <RestaurantConnect />;
      case "storage":
        return <ColdStorage />;
      case "predictor":
        return <MarketPredictor />;
      case "health":
        return <CropHealthMonitor />;
      case "drones":
        return <DroneMonitoring />;
      case "irrigation":
        return <SmartIrrigation />;
      case "weather":
        return <WeatherInsights />;
      case "blockchain":
        return <BlockchainTraceability />;
      default:
        return (
          <div className="max-w-6xl mx-auto p-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {t("welcome")}
              </h1>
              <p className="text-gray-600 text-xl mb-2">{t("subtitle")}</p>
              <p className="text-gray-500 text-lg">{t("tagline")}</p>
            </div>

            {/* Core Features */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {t("agriculture_tools")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                  icon={Camera}
                  title={t("crop_diagnosis")}
                  description={t("crop_diagnosis_desc")}
                  onClick={() => setActiveFeature("diagnosis")}
                />
                <FeatureCard
                  icon={TrendingUp}
                  title={t("market_prices")}
                  description={t("market_prices_desc")}
                  onClick={() => setActiveFeature("markets")}
                />
                <FeatureCard
                  icon={FileText}
                  title={t("govt_schemes")}
                  description={t("govt_schemes_desc")}
                  onClick={() => setActiveFeature("schemes")}
                />
                <FeatureCard
                  icon={Mic}
                  title={t("voice_assistant")}
                  description={t("voice_assistant_desc")}
                  onClick={() => setActiveFeature("voice")}
                />
                <FeatureCard
                  icon={Store}
                  title={t("restaurants")}
                  description={t("restaurants_desc")}
                  onClick={() => setActiveFeature("restaurants")}
                />
                <FeatureCard
                  icon={Thermometer}
                  title={t("cold_storage")}
                  description={t("cold_storage_desc")}
                  onClick={() => setActiveFeature("storage")}
                />
              </div>
            </div>

            {/* Advanced Features */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                {t("advanced_features")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                  icon={Brain}
                  title={t("market_predictor")}
                  description={t("market_predictor_desc")}
                  onClick={() => setActiveFeature("predictor")}
                />
                <FeatureCard
                  icon={Satellite}
                  title={t("crop_health_monitor")}
                  description={t("crop_health_monitor_desc")}
                  onClick={() => setActiveFeature("health")}
                />
                <FeatureCard
                  icon={Plane}
                  title={t("drone_monitoring")}
                  description={t("drone_monitoring_desc")}
                  onClick={() => setActiveFeature("drones")}
                />
                <FeatureCard
                  icon={Droplets}
                  title={t("smart_irrigation")}
                  description={t("smart_irrigation_desc")}
                  onClick={() => setActiveFeature("irrigation")}
                />
                <FeatureCard
                  icon={Cloud}
                  title={t("weather_insights")}
                  description={t("weather_insights_desc")}
                  onClick={() => setActiveFeature("weather")}
                />
                <FeatureCard
                  icon={Package}
                  title={t("blockchain_traceability")}
                  description={t("blockchain_traceability_desc")}
                  onClick={() => setActiveFeature("blockchain")}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-green-100 rounded-xl border border-green-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  100,000
                </div>
                <div className="text-gray-700 font-medium">
                  {t("farmers_helped_label")}
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  98.5%
                </div>
                <div className="text-gray-700 font-medium">
                  {t("diagnosis_accuracy_label")}
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  24/7
                </div>
                <div className="text-gray-700 font-medium">
                  {t("support_system_label")}
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  2.5 M
                </div>
                <div className="text-gray-700 font-medium">
                  {t("farmer_income_increased_label")}
                </div>
              </div>
            </div>

            {/* Revolutionary Highlights */}
            <section className="mt-12">
              <div className="rounded-2xl p-[1px] bg-gradient-to-r from-green-600 via-green-600 to-green-600">
                <div className="rounded-2xl bg-white/5 backdrop-blur-sm px-6 py-8">
                  <h2 className="text-center text-white text-2xl md:text-3xl font-bold mb-6">
                    {t("revolutionary_agriculture")}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                    <div className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-sm">
                      <Brain className="w-8 h-8 mb-3 opacity-90" />
                      <h3 className="font-semibold">{t("market_prediction")}</h3>
                      <p className="mt-1 text-white/90 text-sm">
                        {t("market_prediction_desc")}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-sm">
                      <Satellite className="w-8 h-8 mb-3 opacity-90" />
                      <h3 className="font-semibold">
                        {t("satellite_monitoring")}
                      </h3>
                      <p className="mt-1 text-white/90 text-sm">
                        {t("satellite_monitoring_desc")}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-sm">
                      <Package className="w-8 h-8 mb-3 opacity-90" />
                      <h3 className="font-semibold">
                        {t("blockchain_transparency")}
                      </h3>
                      <p className="mt-1 text-white/90 text-sm">
                        {t("blockchain_transparency_desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Header isListening={isListening} onToggleListening={toggleListening} />

      {activeFeature !== "home" && (
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => setActiveFeature("home")}
            className="mb-4 text-green-600 hover:text-green-700 font-medium flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <span>←</span>
            <span>{t("Back To Home")}</span>
          </button>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">{renderContent()}</main>

      {/* Multilingual footer */}
      <FooterIntl />
    </div>
  );
}

/* -------------------- ROUTER -------------------- */
function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/auth/login" element={<LoginPage />} />
            {/* show the same UI on /dashboard */}
            <Route path="/dashboard" element={<AppContent />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
