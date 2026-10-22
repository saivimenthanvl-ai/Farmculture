import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, Eye, Database, HelpCircle, Globe, FileText, Server } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const PrivacyPolicyPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-lg space-y-8 text-gray-800">
      <div>
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>{t("legal.privacyBadge") || "Farmculture AI Privacy Standard"}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          {t("footerNav.privacyPolicy") || "Privacy Policy"}
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          {t("legal.privacyEffective") || "Effective Date: October 22, 2026 • Platform Operator: Farmculture AI Open-Source Initiative"}
        </p>
      </div>

      <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
        <strong>{t("legal.noticePrefix") || "Notice:"}</strong>{" "}
        {t("legal.privacyNotice") ||
          "This Privacy Policy accurately describes the information handling practices of the Farmculture AI web application and agricultural decision-support tools. Farmculture AI is an independent software platform and is not an agency of the Indian Council of Agricultural Research (ICAR) or any government department."}
      </div>

      {/* 1. Identity of Operator */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-600" />
          1. Platform Operator Identity &amp; Scope
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Farmculture AI is an independent open-access agricultural decision-support software platform developed by individual contributors and agronomists across Bangalore and New Delhi, India. The platform is not an agency of the Indian Council of Agricultural Research (ICAR), the Ministry of Agriculture &amp; Farmers Welfare, or any state marketing board.
        </p>
        <p className="text-xs text-gray-500">
          Corporate entity registration and formal statutory designations are tracked under project governance (Status: <em>Pre-incorporation / Open Software Project</em>).
        </p>
      </section>

      {/* 2. Information We Collect */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-600" />
          2. Categories of Information We Collect
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          We collect and process minimal information strictly necessary to provide agricultural decision-support services:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600 pl-2">
          <li>
            <strong>Account Credentials:</strong> When you register or sign in, we process your email address, display name, and unique Firebase Authentication user ID (UID).
          </li>
          <li>
            <strong>Uploaded Plant Imagery &amp; Diagnostic Records:</strong> Photographs of crop leaves submitted for disease diagnosis are processed using optical chromatic heuristics and stored strictly in your owner-partitioned storage folder (<code className="text-xs bg-gray-100 px-1 py-0.5 rounded">crop-assessments/{"{uid}"}/**</code>) to preserve your treatment log.
          </li>
          <li>
            <strong>Approximate Regional Coordinates:</strong> With browser permission, coarse geographic latitude/longitude coordinates are used ephemerally to query hyperlocal weather models (Open-Meteo). We never track continuous background GPS coordinates.
          </li>
          <li>
            <strong>Inquiries &amp; Support Requests:</strong> Subject lines, categories, and messages submitted via our authenticated contact form are stored securely to provide customer and agronomic support.
          </li>
          <li>
            <strong>Community Reviews:</strong> Testimonials, star ratings, and display names submitted voluntarily to share field feedback.
          </li>
        </ul>
      </section>

      {/* 3. How Information is Used & Lawful Basis */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Eye className="w-5 h-5 text-emerald-600" />
          3. How Information is Used &amp; Lawful Basis
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Data is processed strictly for the performance of platform tools requested by the user:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 pl-2">
          <li>Authenticating user sessions and isolating private farm logs.</li>
          <li>Displaying regional commodity auction prices and localized agro-weather forecasts.</li>
          <li>Providing historical crop diagnosis and foliar health records.</li>
          <li>Investigating technical inquiries and managing account deletion requests.</li>
        </ul>
        <p className="text-sm text-gray-600 leading-relaxed mt-2">
          <strong>No Behavioral Advertising or Monetization:</strong> We do not sell, rent, monetize, or broker personal records, crop imagery, or farm coordinates to third-party ad networks or data syndicates.
        </p>
      </section>

      {/* 4. Service Providers & Architecture */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Server className="w-5 h-5 text-emerald-600" />
          4. Infrastructure Providers &amp; Data Security
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Our services operate on hardened cloud infrastructure:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 pl-2">
          <li>
            <strong>Google Firebase (Alphabet Inc.):</strong> Manages authentication, Firestore database, and encrypted storage. Access is enforced by verified server-side security rules ensuring users can only read or write their own documents.
          </li>
          <li>
            <strong>Open-Meteo GmbH:</strong> Open meteorological forecast endpoints are queried directly. Requests transmit coarse coordinates only; no user identifiers, emails, or UIDs are ever sent to Open-Meteo.
          </li>
          <li>
            <strong>Public Market Boards:</strong> Agmarknet (India) and European wholesale feeds are publicly fetched; no farmer personal data is transmitted to market boards.
          </li>
        </ul>
      </section>

      {/* 5. International Data Transfers */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Globe className="w-5 h-5 text-emerald-600" />
          5. International Data Transfers
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Firebase services may store data in Google Cloud regions across India, the United States, and the European Union, subject to Google Cloud standard contractual clauses and rigorous enterprise encryption in transit (TLS 1.3) and at rest (AES-256).
        </p>
      </section>

      {/* 6. Data Principal Rights & Account Deletion */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          6. Your Privacy Rights &amp; Operational Deletion Workflow
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Regardless of your jurisdiction (under India's DPDP Act 2023, EU/UK GDPR, California CCPA, or Australia's Privacy Act 1988), you have verifiable rights regarding your personal information:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600 pl-2">
          <li>
            <strong>Access &amp; Export:</strong> Inspect your profile and export your historical foliar diagnosis records.
          </li>
          <li>
            <strong>Correction:</strong> Update your profile settings and preferred regional market parameters directly.
          </li>
          <li>
            <strong>Account &amp; Data Erasure:</strong> To delete your account, saved images, and historical logs, submit a ticket via our{" "}
            <Link to="/contact" className="text-emerald-700 font-semibold hover:underline">
              Contact &amp; Support Portal
            </Link>{" "}
            selecting the <em>"Account Deletion Request"</em> category. Deletion requests are processed across Firebase Authentication, Firestore, and Storage upon ownership verification.
          </li>
          <li>
            <strong>Privacy Inquiries:</strong> Unauthenticated users or non-account holders may contact our privacy desk directly at{" "}
            <a href="mailto:support@farmculture.ai" className="text-emerald-700 font-semibold hover:underline">
              support@farmculture.ai
            </a>
            .
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
