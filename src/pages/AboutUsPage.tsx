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
  Database,
  CloudSun,
  TrendingUp,
  ShieldAlert,
  Mail,
  ExternalLink,
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
        title="About Our Agricultural Mission & Data Governance"
        description="Learn about Farmculture AI's mission, authentic agronomic data provenance (Open-Meteo, AGMARKNET), engineering boundaries, and team contacts."
        canonicalPath="/about"
      />

      {/* Hero Section — Concise Mission Statement */}
      <section className="bg-gradient-to-br from-[#0F2E24] via-[#1C4A3A] to-[#0B231B] text-[#F6F4EE] rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#9BE564_1px,transparent_1px)] opacity-10 [background-size:20px_20px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9BE564]/15 border border-[#9BE564]/30 text-[#9BE564] text-xs font-semibold tracking-wide uppercase">
            <Wheat className="w-3.5 h-3.5" />
            <span>Farmculture AI · Agronomy Engineering</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-[#F6F4EE] leading-[1.15]">
            Transparent Agronomic Intelligence for Real Fields
          </h1>

          <p className="text-sm sm:text-base text-[#D4CEBF] leading-relaxed max-w-2xl">
            Farmculture AI is a purpose-built software initiative engineered to give smallholder farmers, FPOs, and agricultural advisors verified APMC arrival intelligence, hyper-local meteorological telemetry, and diagnostic foliar support — with zero vendor lock-in and zero fabricated claims.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <Link to="/services">
              <Button
                variant="accent"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Service Portfolio
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="secondary"
                size="md"
                icon={<Mail className="w-4 h-4" />}
              >
                Contact Engineers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How Our Data Works (Real Integration Provenance) */}
      <section className="space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C4A3A]">
            <Database className="w-4 h-4 text-[#1C4A3A]" />
            <span>Data Ingestion & Authenticity</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F2E24] tracking-tight mt-1">
            How Our Agricultural Data Works
          </h2>
          <p className="text-xs sm:text-sm text-[#787266] mt-0.5">
            Transparent data sources, sync cadences, and integration provenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Weather Data */}
          <div className="agri-card p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F3EE] flex items-center justify-center text-[#1C4A3A]">
              <CloudSun className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#0F2E24]">Hyperlocal Weather Telemetry</h3>
            <p className="text-xs text-[#787266] leading-relaxed">
              Sourced from Open-Meteo High-Resolution Ensemble Models (DWD ICON / ECMWF). Synchronized every 15 minutes with GPS fallback.
            </p>
            <div className="pt-2 border-t border-[#F3F1E9] text-[11px] font-mono text-[#1C4A3A] flex items-center justify-between">
              <span>Source: Open-Meteo API</span>
              <span className="font-bold">Sync: 15m</span>
            </div>
          </div>

          {/* Mandi Rates Data */}
          <div className="agri-card p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F3EE] flex items-center justify-center text-[#1C4A3A]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#0F2E24]">APMC Mandi Modal Prices</h3>
            <p className="text-xs text-[#787266] leading-relaxed">
              Ingested from Government of India AGMARKNET and data.gov.in wholesale records. Normalized per kg and quintal benchmarks.
            </p>
            <div className="pt-2 border-t border-[#F3F1E9] text-[11px] font-mono text-[#1C4A3A] flex items-center justify-between">
              <span>Source: AGMARKNET</span>
              <span className="font-bold">Sync: Daily</span>
            </div>
          </div>

          {/* Foliar AI Diagnostics */}
          <div className="agri-card p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F3EE] flex items-center justify-center text-[#1C4A3A]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#0F2E24]">Foliar Diagnostic Assistance</h3>
            <p className="text-xs text-[#787266] leading-relaxed">
              Mobile in-browser vision inference and verified extension advisory rules. Strictly bounded as decision support, not certified chemical prescriptions.
            </p>
            <div className="pt-2 border-t border-[#F3F1E9] text-[11px] font-mono text-[#1C4A3A] flex items-center justify-between">
              <span>Pipeline: Client TensorFlow</span>
              <span className="font-bold">Advisory Only</span>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency, Disclaimers & Operational Boundaries */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F5] border border-[#E7E3D8] space-y-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#E9A23B]" />
          <h2 className="text-lg font-bold text-[#0F2E24]">
            Data Transparency & Practical Limitations
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#575249] leading-relaxed">
          Agricultural environments have microclimatic variations, localized soil variance, and emergent pathogen mutations. Farmculture AI is explicitly designed as a <strong>decision-support tool</strong>. We do not claim to possess active military-grade satellite constellations or autonomous drone fleets. Where features operate in simulation or preview mode (such as Crop Health satellite indices and price forecasting), they are explicitly labeled as demonstration prototypes.
        </p>
        <div className="pt-1">
          <Link
            to="/disclaimer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1C4A3A] hover:text-[#0F2E24] underline"
          >
            <span>Review Full Agronomic Legal Disclaimer</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F2E24] tracking-tight">
            Who Farmculture Serves
          </h2>
          <p className="text-xs sm:text-sm text-[#787266] mt-0.5">
            Designed for the diverse participants of the agricultural supply chain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="agri-card p-5 space-y-2">
            <Users className="w-6 h-6 text-[#1C4A3A]" />
            <h3 className="font-bold text-sm text-[#0F2E24]">Smallholder Farmers</h3>
            <p className="text-xs text-[#787266] leading-relaxed">
              Timely mandi rate transparency, localized rainfall forecasts, and fast foliar disease assessment.
            </p>
          </div>

          <div className="agri-card p-5 space-y-2">
            <Building2 className="w-6 h-6 text-[#1C4A3A]" />
            <h3 className="font-bold text-sm text-[#0F2E24]">Agribusinesses</h3>
            <p className="text-xs text-[#787266] leading-relaxed">
              Procurement intelligence, cold storage tracking, and direct farmer-to-buyer relationships.
            </p>
          </div>

          <div className="agri-card p-5 space-y-2">
            <Network className="w-6 h-6 text-[#1C4A3A]" />
            <h3 className="font-bold text-sm text-[#0F2E24]">FPOs & Cooperatives</h3>
            <p className="text-xs text-[#787266] leading-relaxed">
              Aggregate land acreage monitoring, collective crop calendars, and harvest scheduling.
            </p>
          </div>

          <div className="agri-card p-5 space-y-2">
            <GraduationCap className="w-6 h-6 text-[#1C4A3A]" />
            <h3 className="font-bold text-sm text-[#0F2E24]">Agronomists & KVKs</h3>
            <p className="text-xs text-[#787266] leading-relaxed">
              Standardized inspection logs, digital pest observations, and verifiable agricultural extension support.
            </p>
          </div>
        </div>
      </section>

      {/* Team & Contact Section */}
      <section className="agri-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-[#0F2E24]">
            Engineering Team & Technical Contact
          </h3>
          <p className="text-xs text-[#787266]">
            Farmculture AI is maintained by software engineers, agronomists, and data researchers.
          </p>
          <p className="text-xs font-mono text-[#1C4A3A]">
            Direct email: support@farmculture.ai · Bangalore & New Delhi, India
          </p>
        </div>
        <Link to="/contact">
          <Button variant="primary" size="sm" icon={<Mail className="w-4 h-4" />}>
            Get in Touch
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default AboutUsPage;
