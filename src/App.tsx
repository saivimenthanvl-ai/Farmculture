import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";                 
import { Header } from "./components/Header";
import { FeatureCard } from "./components/FeatureCard";
import { CropDiagnosis } from "./components/CropDiagnosis";
import { MarketPrices } from "./components/MarketPrices";
import { GovernmentSchemes } from "./components/GovernmentSchemes";
import { VoiceAssistant } from "./components/VoiceAssistant";
import { RestaurantConnect } from "./components/RestaurantConnect";
import { ColdStorage } from "./components/ColdStorage"; 
import { AIMarketPredictor } from "./components/AIMarketPredictor";
import { CropHealthMonitor } from "./components/CropHealthMonitor";
import { DroneMonitoring } from "./components/DroneMonitoring";
import { SmartIrrigation } from "./components/SmartIrrigation";
import { WeatherInsights } from "./components/WeatherInsights";
import { BlockchainTraceability } from "./components/BlockchainTraceability";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import Footer from "./components/Footer";
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
    setIsListening(!isListening);
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
        return <AIMarketPredictor />;
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
              <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {t("welcome")}
              </h1>
              <p className="text-gray-600 text-xl mb-2">{t("subtitle")}</p>
              <p className="text-gray-500 text-lg">{t("yourAgriculturalPartner")}</p>
            </div>

            {/* Core Features */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                🌾 {t("coreAgriculturalTools")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                  icon={Camera}
                  title={t("cropDiagnosis")}
                  description={t("cropDiagnosisDesc")}
                  onClick={() => setActiveFeature("diagnosis")}
                />
                <FeatureCard
                  icon={TrendingUp}
                  title={t("marketPrices")}
                  description={t("marketPricesDesc")}
                  onClick={() => setActiveFeature("markets")}
                />
                <FeatureCard
                  icon={FileText}
                  title={t("govSchemes")}
                  description={t("govSchemesDesc")}
                  onClick={() => setActiveFeature("schemes")}
                />
                <FeatureCard
                  icon={Mic}
                  title={t("voiceAssistant")}
                  description={t("voiceAssistantDesc")}
                  onClick={() => setActiveFeature("voice")}
                />
                <FeatureCard
                  icon={Store}
                  title={t("restaurants")}
                  description={t("restaurantsDesc")}
                  onClick={() => setActiveFeature("restaurants")}
                />
                <FeatureCard
                  icon={Thermometer}
                  title={t("coldStorage")}
                  description={t("coldStorageDesc")}
                  onClick={() => setActiveFeature("storage")}
                />
              </div>
            </div>

            {/* Advanced AI Features */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                🤖 {t("advancedAIFeatures")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                  icon={Brain}
                  title={t("aiMarketPredictor")}
                  description={t("aiMarketPredictorDesc")}
                  onClick={() => setActiveFeature("predictor")}
                />
                <FeatureCard
                  icon={Satellite}
                  title={t("cropHealthMonitor")}
                  description={t("cropHealthMonitorDesc")}
                  onClick={() => setActiveFeature("health")}
                />
                <FeatureCard
                  icon={Plane}
                  title={t("droneMonitoring")}
                  description={t("droneMonitoringDesc")}
                  onClick={() => setActiveFeature("drones")}
                />
                <FeatureCard
                  icon={Droplets}
                  title={t("smartIrrigation")}
                  description={t("smartIrrigationDesc")}
                  onClick={() => setActiveFeature("irrigation")}
                />
                <FeatureCard
                  icon={Cloud}
                  title={t("weatherInsights")}
                  description={t("weatherInsightsDesc")}
                  onClick={() => setActiveFeature("weather")}
                />
                <FeatureCard
                  icon={Package}
                  title={t("blockchainTraceability")}
                  description={t("blockchainTraceabilityDesc")}
                  onClick={() => setActiveFeature("blockchain")}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mb-12 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="text-3xl font-bold text-green-600 mb-2">50,000+</div>
                <div className="text-gray-700 font-medium">{t("farmersHelped")}</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">98.5%</div>
                <div className="text-gray-700 font-medium">{t("diagnosisAccuracy")}</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-700 font-medium">{t("availableSupport")}</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                <div className="text-3xl font-bold text-orange-600 mb-2">2.5 million</div>
                <div className="text-gray-700 font-medium">{t("farmerIncomeIncreased")}</div>
              </div>
            </div>

            {/* Revolutionary Features Highlight */}
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-6 text-center">
                🚀 {t("revolutionaryAgriIntelligence")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
                  <Brain className="w-10 h-10 mb-4" />
                  <h3 className="font-bold text-lg mb-2">{t("aiMarketPrediction")}</h3>
                  <p className="text-purple-100 text-sm">{t("aiMarketPredictionDesc")}</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
                  <Satellite className="w-10 h-10 mb-4" />
                  <h3 className="font-bold text-lg mb-2">{t("satelliteMonitoring")}</h3>
                  <p className="text-blue-100 text-sm">{t("satelliteMonitoringDesc")}</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
                  <Package className="w-10 h-10 mb-4" />
                  <h3 className="font-bold text-lg mb-2">{t("blockchainTransparency")}</h3>
                  <p className="text-green-100 text-sm">{t("blockchainTransparencyDesc")}</p>
                </div>
              </div>
            </div>
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
            <span>{t("backToHome")}</span>
          </button>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">{renderContent()}</main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
