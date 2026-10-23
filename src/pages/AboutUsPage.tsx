import React from "react";
import { Link } from "react-router-dom";
import {
  Wheat,
  ShieldCheck,
  Globe,
  HeartHandshake,
  Users,
  Building2,
  Network,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import SEOHead from "@/components/SEOHead";

export const AboutUsPage: React.FC = () => {
  const { t } = useLocalization();

  return (
    <div className="max-w-5xl mx-auto space-y-10 text-[#0F2E24] py-4">
      <SEOHead
        title="About Our Agricultural Mission"
        description="Learn about Farmculture AI's mission, responsible agricultural engineering principles, and data transparency."
        canonicalPath="/about"
      />
      {/* Hero Section — Aligned with Reference A */}
      <section className="bg-gradient-to-br from-[#0F2E24] via-[#1C4A3A] to-[#0B231B] text-[#F6F4EE] rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        {/* Subtle decorative geometric overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#9BE564_1px,transparent_1px)] opacity-10 [background-size:20px_20px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9BE564]/15 border border-[#9BE564]/30 text-[#9BE564] text-xs font-semibold tracking-wide uppercase">
            <Wheat className="w-3.5 h-3.5" />
            <span>{t("about.badge")}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-[#F6F4EE] leading-[1.15]">
            {t("about.title")}
          </h1>

          <p className="text-sm sm:text-base text-[#D4CEBF] leading-relaxed max-w-2xl">
            {t("about.heroDesc")}
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <Link to="/services">
              <Button
                variant="accent"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {t("about.exploreServices")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Mission Statement */}
      <section className="agri-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C4A3A]">
          <CheckCircle2 className="w-4 h-4 text-[#1C4A3A]" />
          <span>{t("about.missionTitle")}</span>
        </div>
        <p className="text-base sm:text-lg text-[#0F2E24] font-medium leading-relaxed">
          {t("about.missionDesc")}
        </p>
      </section>

      {/* Who We Serve — Core Intended Audiences */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F2E24] tracking-tight">
            {t("about.whoWeServeTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-[#787266] mt-0.5">
            {t("about.whoWeServeDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Smallholders */}
          <div className="agri-card p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E8F3EE] flex items-center justify-center text-[#1C4A3A]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#0F2E24]">
                {t("about.audienceSmallholderTitle")}
              </h3>
              <p className="text-xs text-[#787266] leading-relaxed">
                {t("about.audienceSmallholderDesc")}
              </p>
            </div>
          </div>

          {/* Agribusinesses */}
          <div className="agri-card p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E8F3EE] flex items-center justify-center text-[#1C4A3A]">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#0F2E24]">
                {t("about.audienceAgribusinessTitle")}
              </h3>
              <p className="text-xs text-[#787266] leading-relaxed">
                {t("about.audienceAgribusinessDesc")}
              </p>
            </div>
          </div>

          {/* FPOs and Cooperatives */}
          <div className="agri-card p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E8F3EE] flex items-center justify-center text-[#1C4A3A]">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#0F2E24]">
                {t("about.audienceFpoTitle")}
              </h3>
              <p className="text-xs text-[#787266] leading-relaxed">
                {t("about.audienceFpoDesc")}
              </p>
            </div>
          </div>

          {/* Consultants & Institutions */}
          <div className="agri-card p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E8F3EE] flex items-center justify-center text-[#1C4A3A]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#0F2E24]">
                {t("about.audienceConsultantTitle")}
              </h3>
              <p className="text-xs text-[#787266] leading-relaxed">
                {t("about.audienceConsultantDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F2E24] tracking-tight">
            {t("about.principlesTitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="agri-card p-5 space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#1C4A3A]" />
            <h3 className="font-bold text-sm text-[#0F2E24]">{t("about.card1Title")}</h3>
            <p className="text-xs text-[#787266] leading-relaxed">{t("about.card1Desc")}</p>
          </div>

          <div className="agri-card p-5 space-y-2">
            <Sparkles className="w-6 h-6 text-[#1C4A3A]" />
            <h3 className="font-bold text-sm text-[#0F2E24]">{t("about.card2Title")}</h3>
            <p className="text-xs text-[#787266] leading-relaxed">{t("about.card2Desc")}</p>
          </div>

          <div className="agri-card p-5 space-y-2">
            <Globe className="w-6 h-6 text-[#1C4A3A]" />
            <h3 className="font-bold text-sm text-[#0F2E24]">{t("about.card3Title")}</h3>
            <p className="text-xs text-[#787266] leading-relaxed">{t("about.card3Desc")}</p>
          </div>

          <div className="agri-card p-5 space-y-2">
            <HeartHandshake className="w-6 h-6 text-[#1C4A3A]" />
            <h3 className="font-bold text-sm text-[#0F2E24]">{t("about.card4Title")}</h3>
            <p className="text-xs text-[#787266] leading-relaxed">{t("about.card4Desc")}</p>
          </div>
        </div>
      </section>

      {/* Footer Call to Action Linking to Service Portfolio */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#1C4A3A] text-[#F6F4EE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <h3 className="text-lg font-bold font-display text-[#F6F4EE]">
            {t("about.portfolioTitle")}
          </h3>
          <p className="text-xs text-[#D4CEBF]">
            {t("about.portfolioDesc")}
          </p>
        </div>
        <Link to="/services" className="shrink-0">
          <Button
            variant="accent"
            size="sm"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {t("about.viewServices")}
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default AboutUsPage;
