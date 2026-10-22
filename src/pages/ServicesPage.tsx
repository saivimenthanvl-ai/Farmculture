import React from "react";
import { Link } from "react-router-dom";
import {
  Camera,
  TrendingUp,
  Cloud,
  FileText,
  Mic,
  Store,
  Thermometer,
  ShieldAlert,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ServicesPage: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      title: t("crop_diagnosis") || "Crop Disease Diagnosis",
      path: "/crop-diagnosis",
      icon: Camera,
      color: "text-emerald-600 bg-emerald-50",
      description:
        t("services.cropDiagDesc") ||
        "Upload close-up photographs of crop leaves for foliar chromatic analysis and symptom assessment. Incorporates automatic abstention when non-plant or out-of-distribution imagery is uploaded.",
      limitations:
        t("services.cropDiagLimit") ||
        "Provides preliminary heuristic assessments, not a substitute for laboratory pathogen culture.",
    },
    {
      title: t("market_prices") || "Wholesale Market Prices",
      path: "/market-prices",
      icon: TrendingUp,
      color: "text-blue-600 bg-blue-50",
      description:
        t("services.marketDesc") ||
        "Daily modal auction prices reported by APMC state mandis across India, with live international currency conversion at reference exchange rates.",
      limitations:
        t("services.marketLimit") ||
        "Converted currencies are reference estimates and do not represent local prices in overseas markets.",
    },
    {
      title: t("weather_insights") || "Hyperlocal Weather Telemetry",
      path: "/weather",
      icon: Cloud,
      color: "text-sky-600 bg-sky-50",
      description:
        t("services.weatherDesc") ||
        "Live meteorological data querying Open-Meteo API, providing real-time temperature, precipitation probability, humidity, UV index, and agronomic advisory alerts.",
      limitations:
        t("services.weatherLimit") ||
        "Forecasts are mathematical approximations subject to rapid atmospheric shifts.",
    },
    {
      title: t("govt_schemes") || "Government Agricultural Schemes",
      path: "/schemes",
      icon: FileText,
      color: "text-amber-600 bg-amber-50",
      description:
        t("services.schemesDesc") ||
        "Verified repository of central and state financial assistance, subsidies, micro-irrigation grants, and soil health programs.",
      limitations:
        t("services.schemesLimit") ||
        "Application deadlines, eligibility criteria, and fund disbursements are managed exclusively by respective government ministries.",
    },
    {
      title: t("voice_assistant") || "Multilingual Voice Assistant",
      path: "/assistant",
      icon: Mic,
      color: "text-purple-600 bg-purple-50",
      description:
        t("services.assistantDesc") ||
        "Hands-free agricultural querying and quick command recognition in regional Indian and international languages.",
      limitations:
        t("services.assistantLimit") ||
        "Voice recognition functionality requires browser microphone access and supported Web Speech API runtime.",
    },
    {
      title: t("restaurants") || "Direct Produce Market (Buyer Connect)",
      path: "/restaurants",
      icon: Store,
      color: "text-rose-600 bg-rose-50",
      description:
        t("services.restaurantsDesc") ||
        "Direct wholesale procurement directory linking farm harvests with bulk commercial buyers, restaurants, and aggregators.",
      limitations:
        t("services.restaurantsLimit") ||
        "Transactions and trade fulfillment require bilateral agreement between buyer and seller.",
    },
    {
      title: t("cold_storage") || "Cold Chain Storage Locator",
      path: "/storage",
      icon: Thermometer,
      color: "text-indigo-600 bg-indigo-50",
      description:
        t("services.storageDesc") ||
        "Directory of temperature-controlled post-harvest preservation facilities, ripening chambers, and regional warehouses.",
      limitations:
        t("services.storageLimit") ||
        "Space availability and tariff schedules require direct confirmation with individual warehouse operators.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-lg space-y-8 text-gray-800">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          {t("footerNav.servicePortfolio") || "Service Portfolio"}
        </h1>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          {t("services.subtitle") ||
            "Comprehensive catalog of active digital tools, data feeds, and agricultural support features provided by Farmculture AI."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((svc) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.path}
              className="p-6 rounded-xl border border-gray-200 bg-gray-50 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${svc.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">{svc.title}</h2>
                <p className="text-xs text-gray-600 leading-relaxed">{svc.description}</p>
                <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-start gap-2 text-[11px] text-gray-500">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>{t("services.operationalScope") || "Operational Scope:"}</strong>{" "}
                    {svc.limitations}
                  </span>
                </div>
              </div>

              <Link
                to={svc.path}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                <span>{t("services.accessTool") || "Access Tool"}</span>
                <span>→</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesPage;
