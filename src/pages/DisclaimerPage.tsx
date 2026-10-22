import React from "react";
import { AlertTriangle, ShieldAlert, BookOpen, Scale, CloudRain } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const DisclaimerPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-lg space-y-8 text-gray-800">
      <div>
        <div className="flex items-center gap-2 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <AlertTriangle className="w-4 h-4" />
          <span>{t("legal.disclaimerBadge") || "Agricultural Decision Support Advisory"}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          {t("footerNav.disclaimer") || "Agricultural Disclaimer"}
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          {t("legal.disclaimerReviewed") || "Last Reviewed: October 22, 2026 • Farmculture AI Agronomic Review Group"}
        </p>
      </div>

      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed space-y-2">
        <p className="font-bold">
          {t("legal.disclaimerNoticeTitle") || "Important Notice to Farmers, Agronomists, and Users:"}
        </p>
        <p>
          {t("legal.disclaimerNoticeBody") ||
            "Farmculture AI provides computational decision-support tools, heuristic image analysis, and open-source data aggregation. The information presented on this platform is for educational and advisory reference only and does not constitute guaranteed agricultural, financial, or legal advice."}
        </p>
      </div>

      {/* 1. Crop Disease Inspection Limitations */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-600" />
          1. Crop Disease Inspection Limitations &amp; Diagnostic Abstention
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Automated plant foliar symptom inspection relies on visual chromatic heuristics and computer vision patterns. Diagnostic accuracy is subject to lighting conditions, image resolution, concurrent fungal/bacterial co-infections, or soil nutrient deficiencies. Our algorithm includes diagnostic abstention when an uploaded photograph does not present distinct foliar plant symptoms.
        </p>
        <p className="text-xs text-amber-900 bg-amber-50/50 p-3 rounded-lg border border-amber-100 leading-relaxed">
          <strong>Chemical Safety Warning:</strong> Never apply restricted fungicides, synthetic pesticides, or undertake drastic crop eradication solely based on an automated digital assessment. Always seek in-person confirmation from an accredited agricultural extension officer, Krishi Vigyan Kendra (KVK) specialist, or certified plant pathologist.
        </p>
      </section>

      {/* 2. Market Prices & Currency Conversion */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-600" />
          2. Wholesale Market Rates &amp; Currency Equivalents
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Commodity price records display modal wholesale auction prices recorded by state Agricultural Produce Market Committees (APMC) through Agmarknet, alongside official European wholesale boards (BLE Germany, FranceAgriMer, MAPA Spain, MRiRW Poland).
        </p>
        <p className="text-xs text-gray-500 leading-relaxed">
          Modal rates reflect historical auction averages and fluctuate based on harvest grade, moisture percentage, freight transport costs, and daily market arrivals. Converted international currencies are illustrative estimates calculated at reference exchange rates and do not represent localized buyer offers in destination countries.
        </p>
      </section>

      {/* 3. Weather Forecasts & Agronomic Telemetry */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <CloudRain className="w-5 h-5 text-amber-600" />
          3. Meteorological Forecasts &amp; Microclimate Variance
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Hyperlocal weather forecasts and advisory telemetry are generated using mathematical prediction models retrieved from the Open-Meteo API. Atmospheric dynamics change unpredictably. Farmculture AI accepts no liability for yield variations, delayed planting, or scheduling decisions resulting from localized microclimate fluctuations.
        </p>
      </section>

      {/* 4. Independent Project Scope */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-600" />
          4. Independent Status &amp; Non-Endorsement
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Farmculture AI is an independent software initiative. References to government welfare schemes, subsidy portals, or state APMC mandis are provided solely for public informational convenience and does not imply official government sponsorship, partnership, or endorsement.
        </p>
      </section>
    </div>
  );
};

export default DisclaimerPage;
