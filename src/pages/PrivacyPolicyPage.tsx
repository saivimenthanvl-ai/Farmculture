import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  HelpCircle,
  Globe,
  FileText,
  Server,
  Printer,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";

export const PrivacyPolicyPage: React.FC = () => {
  const { t } = useLocalization();
  const [activeSection, setActiveSection] = useState("section-1");

  const sections = [
    { id: "section-1", title: "1. Platform Operator & Scope" },
    { id: "section-2", title: "2. Categories of Information" },
    { id: "section-3", title: "3. Lawful Basis & Processing" },
    { id: "section-4", title: "4. Infrastructure & Security" },
    { id: "section-5", title: "5. International Data Transfers" },
    { id: "section-6", title: "6. Data Rights & Erasure Workflow" },
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
            <Badge variant="success">
              {t("legal.privacyBadge") || "Data Protection Standard"}
            </Badge>
            <span className="text-xs text-[#787266]">· DPDP Act 2023 &amp; GDPR Compliant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2E24] tracking-tight font-display">
            {t("footerNav.privacyPolicy") || "Platform Privacy Policy"}
          </h1>
          <p className="text-xs text-[#787266] mt-1">
            {t("legal.privacyEffective") || "Effective Date: October 22, 2026 • Platform Operator: Farmculture AI Open-Source Initiative"}
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E7E3D8] hover:border-[#1C4A3A] text-xs font-bold text-[#0F2E24] transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Printer className="w-4 h-4 text-[#1C4A3A]" />
          <span>Print Policy</span>
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

            {/* Plain language summary box */}
            <div className="mt-5 p-3.5 bg-[#FAF9F5] rounded-xl border border-[#E7E3D8] text-xs space-y-2">
              <span className="font-bold text-[#0F2E24] block">Summary in Plain Language</span>
              <ul className="space-y-1 text-[#787266] text-[11px] leading-relaxed">
                <li>• No selling of farm, yield, or location data.</li>
                <li>• Ephemeral coordinates used only for weather.</li>
                <li>• Instant account &amp; data deletion available.</li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Right Column: Policy Content (8 cols) */}
        <main className="lg:col-span-8 space-y-8">
          <Callout variant="info" title="Independent Agronomic Software Notice">
            {t("legal.privacyNotice") ||
              "This Privacy Policy accurately describes the information handling practices of the Farmculture AI web application and agricultural decision-support tools. Farmculture AI is an independent software platform and is not an agency of the Indian Council of Agricultural Research (ICAR) or any government department."}
          </Callout>

          {/* 1. Identity of Operator */}
          <section id="section-1" className="agri-card p-6 space-y-3 scroll-mt-24">
            <h2 className="text-base sm:text-lg font-bold text-[#0F2E24] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#1C4A3A]" />
              1. Platform Operator Identity &amp; Scope
            </h2>
            <p className="text-xs sm:text-sm text-[#787266] leading-relaxed">
              Farmculture AI is an independent open-access agricultural decision-support software platform developed by individual contributors and agronomists across Bangalore and New Delhi, India. The platform is not an agency of the Indian Council of Agricultural Research (ICAR), the Ministry of Agriculture &amp; Farmers Welfare, or any state marketing board.
            </p>
            <p className="text-xs text-[#A8A092]">
              Corporate entity registration and formal statutory designations are tracked under project governance (Status: <em>Pre-incorporation / Open Software Project</em>).
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section id="section-2" className="agri-card p-6 space-y-3 scroll-mt-24">
            <h2 className="text-base sm:text-lg font-bold text-[#0F2E24] flex items-center gap-2">
              <Database className="w-5 h-5 text-[#1C4A3A]" />
              2. Categories of Information We Collect
            </h2>
            <p className="text-xs sm:text-sm text-[#787266] leading-relaxed">
              We collect and process minimal information strictly necessary to provide agricultural decision-support services:
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-[#787266]">
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E7E3D8]">
                <strong className="text-[#0F2E24]">Account Credentials:</strong> When you register or sign in, we process your email address, display name, and unique Firebase Authentication user ID (UID).
              </div>
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E7E3D8]">
                <strong className="text-[#0F2E24]">Uploaded Plant Imagery &amp; Diagnostic Records:</strong> Photographs of crop leaves submitted for disease diagnosis are processed using optical chromatic heuristics and stored strictly in your owner-partitioned storage folder (<code className="text-xs bg-white px-1.5 py-0.5 rounded border border-[#E7E3D8] font-mono">crop-assessments/{"{uid}"}/**</code>) to preserve your treatment log.
              </div>
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E7E3D8]">
                <strong className="text-[#0F2E24]">Approximate Regional Coordinates:</strong> With browser permission, coarse geographic latitude/longitude coordinates are used ephemerally to query hyperlocal weather models (Open-Meteo). We never track continuous background GPS coordinates.
              </div>
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E7E3D8]">
                <strong className="text-[#0F2E24]">Inquiries &amp; Support Requests:</strong> Subject lines, categories, and messages submitted via our authenticated contact form are stored securely to provide customer and agronomic support.
              </div>
            </div>
          </section>

          {/* 3. How Information is Used */}
          <section id="section-3" className="agri-card p-6 space-y-3 scroll-mt-24">
            <h2 className="text-base sm:text-lg font-bold text-[#0F2E24] flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#1C4A3A]" />
              3. How Information is Used &amp; Lawful Basis
            </h2>
            <p className="text-xs sm:text-sm text-[#787266] leading-relaxed">
              Data is processed strictly for the performance of platform tools requested by the user:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#787266] pl-2">
              <li>Authenticating user sessions and isolating private farm logs.</li>
              <li>Displaying regional commodity auction prices and localized agro-weather forecasts.</li>
              <li>Providing historical crop diagnosis and foliar health records.</li>
              <li>Investigating technical inquiries and managing account deletion requests.</li>
            </ul>
            <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E7E3D8] text-xs text-[#0F2E24] font-medium mt-3">
              <strong>Strict Zero-Monetization Policy:</strong> We do not sell, rent, monetize, or broker personal records, crop imagery, or farm coordinates to third-party ad networks or data syndicates.
            </div>
          </section>

          {/* 4. Infrastructure & Security */}
          <section id="section-4" className="agri-card p-6 space-y-3 scroll-mt-24">
            <h2 className="text-base sm:text-lg font-bold text-[#0F2E24] flex items-center gap-2">
              <Server className="w-5 h-5 text-[#1C4A3A]" />
              4. Infrastructure Providers &amp; Data Security
            </h2>
            <p className="text-xs sm:text-sm text-[#787266] leading-relaxed">
              Our services operate on hardened cloud infrastructure:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#787266] pl-2">
              <li>
                <strong>Google Firebase:</strong> Manages authentication, Firestore database, and encrypted storage. Access is enforced by verified server-side security rules ensuring users can only read or write their own documents.
              </li>
              <li>
                <strong>Open-Meteo GmbH:</strong> Open meteorological forecast endpoints are queried directly. Requests transmit coarse coordinates only; no user identifiers, emails, or UIDs are ever sent to Open-Meteo.
              </li>
              <li>
                <strong>Public Mandi Boards:</strong> Agmarknet (India) and European wholesale feeds are publicly fetched; no farmer personal data is transmitted to market boards.
              </li>
            </ul>
          </section>

          {/* 5. International Transfers */}
          <section id="section-5" className="agri-card p-6 space-y-3 scroll-mt-24">
            <h2 className="text-base sm:text-lg font-bold text-[#0F2E24] flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#1C4A3A]" />
              5. International Data Transfers
            </h2>
            <p className="text-xs sm:text-sm text-[#787266] leading-relaxed">
              Firebase services store data in Google Cloud regions across India, the United States, and the European Union, subject to Google Cloud standard contractual clauses and rigorous enterprise encryption in transit (TLS 1.3) and at rest (AES-256).
            </p>
          </section>

          {/* 6. Rights & Deletion */}
          <section id="section-6" className="agri-card p-6 space-y-3 scroll-mt-24">
            <h2 className="text-base sm:text-lg font-bold text-[#0F2E24] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#1C4A3A]" />
              6. Your Privacy Rights &amp; Operational Deletion Workflow
            </h2>
            <p className="text-xs sm:text-sm text-[#787266] leading-relaxed">
              Regardless of your jurisdiction (under India's DPDP Act 2023, EU/UK GDPR, California CCPA, or Australia's Privacy Act 1988), you have verifiable rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#787266] pl-2">
              <li>
                <strong>Access &amp; Export:</strong> Inspect your profile, view registered land plots, and review your historical foliar diagnosis records at any time.
              </li>
              <li>
                <strong>Self-Service Account &amp; Data Erasure:</strong> Authenticated users can permanently delete their account directly within{" "}
                <Link to="/profile" className="text-[#1C4A3A] font-bold hover:underline">
                  Account Settings (Danger Zone)
                </Link>
                . Initiating deletion triggers immediate, irreversible removal of your Firebase Authentication identity, user profile, registered farm plots, crop records, foliar disease inspection history, uploaded leaf photographs from cloud storage, and public review attributions.
              </li>
              <li>
                <strong>Lawful Retention Exceptions:</strong> In compliance with applicable statutory regulations, immutable audit logs of support inquiries and disaster-recovery backup snapshots are retained according to documented retention schedules (up to 180 days for audit records; rolling 30–60 days for encrypted disaster recovery snapshots). Once these retention windows expire, records are permanently expunged.
              </li>
              <li>
                <strong>Incomplete Deletion Inquiries:</strong> If you believe any personal identifier remains after executing account deletion, you may file an audit request through our{" "}
                <Link to="/contact" className="text-[#1C4A3A] font-bold hover:underline">
                  Support &amp; Privacy Desk
                </Link>
                .
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
