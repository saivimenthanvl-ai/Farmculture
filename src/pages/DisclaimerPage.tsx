import React, { useState } from "react";
import {
  AlertTriangle,
  ShieldAlert,
  BookOpen,
  Scale,
  CloudRain,
  Printer,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";

export const DisclaimerPage: React.FC = () => {
  const { t } = useLocalization();
  const [activeSection, setActiveSection] = useState("section-1");

  const sections = [
    { id: "section-1", title: "1. Foliar Disease Diagnostic Limits" },
    { id: "section-2", title: "2. Mandi Rates & Reference Prices" },
    { id: "section-3", title: "3. Microclimate Meteorological Telemetry" },
    { id: "section-4", title: "4. Independent Open Project Status" },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E3D8]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="warning">
              {t("legal.disclaimerBadge") || "Agricultural Advisory Notice"}
            </Badge>
            <span className="text-xs text-[#787266]">· Decision Support Only</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2E24] tracking-tight font-display">
            {t("footerNav.disclaimer") || "Agricultural Advisory Disclaimer"}
          </h1>
          <p className="text-xs text-[#787266] mt-1">
            {t("legal.disclaimerReviewed") || "Last Reviewed: October 22, 2026 • Farmculture AI Agronomic Review Group"}
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E7E3D8] hover:border-[#1C4A3A] text-xs font-bold text-[#0F2E24] transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Printer className="w-4 h-4 text-[#1C4A3A]" />
          <span>Print Disclaimer</span>
        </button>
      </div>

      {/* Two-Column Layout with Sticky Table of Contents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sticky Rail: Table of Contents (4 cols) */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="agri-card p-5 sticky top-20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#787266] mb-3">
              Table of Contents
            </h3>
            <nav className="space-y-1">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                    activeSection === sec.id
                      ? "bg-[#1C4A3A] text-white"
                      : "text-[#787266] hover:bg-[#FAF9F5] hover:text-[#0F2E24]"
                  }`}
                >
                  <span className="truncate">{sec.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-70" />
                </button>
              ))}
            </nav>

            <div className="mt-5 p-3.5 bg-[#FAF9F5] rounded-xl border border-[#E7E3D8] text-xs space-y-2">
              <span className="font-bold text-[#0F2E24] block">Key Farmer Notice</span>
              <p className="text-[#787266] text-[11px] leading-relaxed">
                Always confirm disease diagnoses with a certified KVK agricultural extension officer before applying restricted pesticides.
              </p>
            </div>
          </div>
        </aside>

        {/* Right Column: Disclaimer Sections (8 cols) */}
        <main className="lg:col-span-8 space-y-8">
          <Callout variant="warning" title={t("legal.disclaimerNoticeTitle") || "Important Notice to Farmers, Agronomists, and Users:"}>
            {t("legal.disclaimerNoticeBody") ||
              "Farmculture AI provides computational decision-support tools, heuristic image analysis, and open-source data aggregation. The information presented on this platform is for educational and advisory reference only and does not constitute guaranteed agricultural, financial, or legal advice."}
          </Callout>

          {/* 1. Crop Disease Inspection Limitations */}
          <section id="section-1" className="agri-card p-6 space-y-3 scroll-mt-24">
            <h2 className="text-base sm:text-lg font-bold text-[#0F2E24] flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#C8553D]" />
              1. Crop Disease Inspection Limitations &amp; Diagnostic Abstention
            </h2>
            <p className="text-xs sm:text-sm text-[#787266] leading-relaxed">
              Automated plant foliar symptom inspection relies on visual chromatic heuristics and computer vision patterns. Diagnostic accuracy is subject to lighting conditions, image resolution, concurrent fungal/bacterial co-infections, or soil nutrient deficiencies. Our algorithm includes diagnostic abstention when an uploaded photograph does not present distinct foliar plant symptoms.
            </p>
            <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E7E3D8] text-xs text-[#0F2E24] leading-relaxed">
              <strong>Chemical Application Safety:</strong> Never apply restricted fungicides, synthetic pesticides, or undertake drastic crop eradication solely based on an automated digital assessment. Always seek in-person confirmation from an accredited agricultural extension officer, Krishi Vigyan Kendra (KVK) specialist, or certified plant pathologist.
            </div>
          </section>

          {/* 2. Market Prices & Currency Conversion */}
          <section id="section-2" className="agri-card p-6 space-y-3 scroll-mt-24">
            <h2 className="text-base sm:text-lg font-bold text-[#0F2E24] flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#1C4A3A]" />
              2. Wholesale Market Rates &amp; Currency Equivalents
            </h2>
            <p className="text-xs sm:text-sm text-[#787266] leading-relaxed">
              Commodity price records display modal wholesale auction prices recorded by state Agricultural Produce Market Committees (APMC) through Agmarknet, alongside official European wholesale boards.
            </p>
            <p className="text-xs text-[#787266] leading-relaxed">
              Modal rates reflect historical auction averages and fluctuate based on harvest grade, moisture percentage, freight transport costs, and daily market arrivals. Converted international currencies are illustrative estimates calculated at reference exchange rates and do not represent localized buyer offers in destination countries.
            </p>
          </section>

          {/* 3. Weather Forecasts */}
          <section id="section-3" className="agri-card p-6 space-y-3 scroll-mt-24">
            <h2 className="text-base sm:text-lg font-bold text-[#0F2E24] flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-[#1C4A3A]" />
              3. Meteorological Forecasts &amp; Microclimate Variance
            </h2>
            <p className="text-xs sm:text-sm text-[#787266] leading-relaxed">
              Hyperlocal weather forecasts and advisory telemetry are generated using mathematical prediction models retrieved from the Open-Meteo API. Atmospheric dynamics change unpredictably. Farmculture AI accepts no liability for yield variations, delayed planting, or scheduling decisions resulting from localized microclimate fluctuations.
            </p>
          </section>

          {/* 4. Independent Scope */}
          <section id="section-4" className="agri-card p-6 space-y-3 scroll-mt-24">
            <h2 className="text-base sm:text-lg font-bold text-[#0F2E24] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#1C4A3A]" />
              4. Independent Status &amp; Non-Endorsement
            </h2>
            <p className="text-xs sm:text-sm text-[#787266] leading-relaxed">
              Farmculture AI is an independent software initiative. References to government welfare schemes, subsidy portals, or state APMC mandis are provided solely for public informational convenience and does not imply official government sponsorship, partnership, or endorsement.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DisclaimerPage;
