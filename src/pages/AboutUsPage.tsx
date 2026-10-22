import React from "react";
import { Link } from "react-router-dom";
import { Wheat, Globe, ShieldCheck, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const AboutUsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-lg space-y-8 text-gray-800">
      <div>
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <Wheat className="w-4 h-4" />
          <span>{t("about.badge") || "About Farmculture AI"}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          {t("about.title") || "Empowering Agriculture Through Transparent Technology"}
        </h1>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          {t("about.heroDesc") ||
            "Farmculture AI was created to provide smallholder farmers, agribusinesses, and agronomists with trustworthy, evidence-based digital tools. We believe that technology in agriculture must be honest, transparent, and grounded in real-world data."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 space-y-2">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <h3 className="font-bold text-sm text-gray-800">
            {t("about.card1Title") || "Truthful Intelligence"}
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t("about.card1Desc") ||
              "We reject synthetic or fabricated confidence scores. Our crop inspection workflows prioritize diagnostic abstention when images are inconclusive."}
          </p>
        </div>

        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 space-y-2">
          <Globe className="w-6 h-6 text-blue-600" />
          <h3 className="font-bold text-sm text-gray-800">
            {t("about.card2Title") || "Market Transparency"}
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t("about.card2Desc") ||
              "Real mandi modal prices reported from APMC committees across India, accompanied by verified observation dates and source provenance."}
          </p>
        </div>

        <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 space-y-2">
          <HeartHandshake className="w-6 h-6 text-purple-600" />
          <h3 className="font-bold text-sm text-gray-800">
            {t("about.card3Title") || "Multilingual Access"}
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t("about.card3Desc") ||
              "Bilingual and multi-regional accessibility spanning Indian languages, European languages, and Arabic, with flexible currency conversion."}
          </p>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800">
          {t("about.missionTitle") || "Our Mission"}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {t("about.missionDesc") ||
            "Modern farmers face volatile weather events, opaque wholesale market pricing, and emerging crop diseases. Farmculture AI bridges the digital divide by aggregating verified open agricultural records, open-source meteorological telemetry, and lightweight computer vision algorithms into an accessible, responsive web application."}
        </p>
      </section>

      <section className="p-6 bg-gradient-to-r from-emerald-600 to-green-700 rounded-xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">
            {t("about.portfolioTitle") || "Explore Our Service Portfolio"}
          </h3>
          <p className="text-xs text-emerald-100 mt-1">
            {t("about.portfolioDesc") || "Learn more about our tools and technical specifications."}
          </p>
        </div>
        <Link
          to="/services"
          className="px-4 py-2 bg-white text-emerald-800 rounded-lg font-semibold text-xs hover:bg-emerald-50 transition-colors shadow-sm shrink-0"
        >
          {t("about.viewServices") || "View Services"}
        </Link>
      </section>
    </div>
  );
};

export default AboutUsPage;
