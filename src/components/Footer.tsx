import React from "react";
import { Link } from "react-router-dom";
import { Wheat, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-16 bg-[#0F2E24] text-[#D4CEBF] border-t border-[#1C4A3A]">
      {/* Subtle brand hairline accent */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#1C4A3A] via-[#9BE564] to-[#1C4A3A]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2 text-white">
              <Wheat className="w-6 h-6 text-[#9BE564]" />
              <span className="text-xl font-bold tracking-tight font-display text-white">Farmculture AI</span>
            </div>
            <p className="text-xs text-[#A8A092] leading-relaxed">
              {t("footerNav.brandSummary")}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#9BE564] font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>{t("footerNav.evidenceSupport")}</span>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {t("footerNav.ourServices")}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/crop-diagnosis" className="hover:text-emerald-400 transition-colors">
                  {t("crop_diagnosis")}
                </Link>
              </li>
              <li>
                <Link to="/market-prices" className="hover:text-emerald-400 transition-colors">
                  {t("market_prices")}
                </Link>
              </li>
              <li>
                <Link to="/weather" className="hover:text-emerald-400 transition-colors">
                  {t("weather_insights")}
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="hover:text-emerald-400 transition-colors">
                  {t("govt_schemes")}
                </Link>
              </li>
              <li>
                <Link to="/assistant" className="hover:text-emerald-400 transition-colors">
                  {t("voice_assistant")}
                </Link>
              </li>
              <li>
                <Link to="/storage" className="hover:text-emerald-400 transition-colors">
                  {t("cold_storage")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Information & Legal Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {t("footerNav.infoLegal")}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  {t("footerNav.aboutUs")}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-emerald-400 transition-colors">
                  {t("footerNav.servicePortfolio")}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-emerald-400 transition-colors">
                  {t("footerNav.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-emerald-400 transition-colors">
                  {t("footerNav.disclaimer")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">
                  {t("footerNav.contactUs")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Transparency & Contact Summary */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {t("footerNav.supportCommunity")}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              {t("footerNav.supportPrompt")}
            </p>
            <Link
              to="/contact"
              className="inline-block px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
            >
              {t("footerNav.getInTouch")}
            </Link>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <p>© 2026 Farmculture AI. {t("footerNav.allRights")}</p>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/privacy-policy" className="hover:underline">{t("footerNav.privacy")}</Link>
            <Link to="/disclaimer" className="hover:underline">{t("footerNav.disclaimer")}</Link>
            <Link to="/contact" className="hover:underline">{t("footerNav.contact")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
