import React, { useState, useRef, useEffect } from "react";
import { Globe, DollarSign, MapPin, Check, ChevronDown } from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";
import {
  LOCALES,
  REGIONS,
  CURRENCIES,
  SupportedLocale,
  SupportedRegion,
  SupportedCurrency,
} from "@/lib/localeConfig";

export const InternationalSelector: React.FC = () => {
  const {
    interfaceLocale,
    setInterfaceLocale,
    region,
    setRegion,
    displayCurrency,
    setDisplayCurrency,
  } = useLocalization();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"locale" | "region" | "currency">("locale");
  const menuRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLocale = LOCALES[interfaceLocale];
  const currentRegion = REGIONS[region];
  const currentCurrency = CURRENCIES[displayCurrency];

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button: Clean balanced flag + locale + currency with design tokens */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white text-[#0F2E24] rounded-lg border border-[#E7E3D8] hover:border-[#1C4A3A] shadow-2xs hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3E8E8A] text-xs font-semibold transition-all"
        title="Change Language, Region or Currency"
        aria-label="Localization settings"
        aria-expanded={isOpen}
      >
        <span className="text-sm leading-none shrink-0" aria-hidden="true">{currentRegion?.flag || "🌐"}</span>
        <span className="uppercase text-[#3B3832] font-mono text-[11px]">{interfaceLocale.split("-")[0]}</span>
        <span className="text-[#D3CDC0] text-[10px]">•</span>
        <span className="text-[#1C4A3A] font-bold text-[11px] font-mono">{displayCurrency}</span>
        <ChevronDown className="w-3.5 h-3.5 text-[#787266] shrink-0" />
      </button>

      {/* Selector Dropdown Modal */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden text-gray-800 animate-in fade-in zoom-in-95 duration-100">
          {/* Header Tabs */}
          <div className="flex border-b border-gray-100 bg-gray-50 text-xs font-medium">
            <button
              onClick={() => setActiveTab("locale")}
              className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                activeTab === "locale"
                  ? "border-emerald-600 text-emerald-800 font-bold bg-white"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Language
            </button>
            <button
              onClick={() => setActiveTab("region")}
              className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                activeTab === "region"
                  ? "border-emerald-600 text-emerald-800 font-bold bg-white"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              Region
            </button>
            <button
              onClick={() => setActiveTab("currency")}
              className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                activeTab === "currency"
                  ? "border-emerald-600 text-emerald-800 font-bold bg-white"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              Currency
            </button>
          </div>

          {/* Tab 1: Locales */}
          {activeTab === "locale" && (
            <div className="max-h-64 overflow-y-auto divide-y divide-gray-50 p-1">
              {(Object.keys(LOCALES) as SupportedLocale[]).map((locKey) => {
                const item = LOCALES[locKey];
                const isSelected = interfaceLocale === locKey;
                return (
                  <button
                    key={locKey}
                    onClick={() => {
                      setInterfaceLocale(locKey);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs transition-colors ${
                      isSelected
                        ? "bg-emerald-50 text-emerald-900 font-bold"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{item.code}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Tab 2: Country / Regions */}
          {activeTab === "region" && (
            <div className="max-h-64 overflow-y-auto divide-y divide-gray-50 p-1">
              {(Object.keys(REGIONS) as SupportedRegion[]).map((regKey) => {
                const item = REGIONS[regKey];
                const isSelected = region === regKey;
                return (
                  <button
                    key={regKey}
                    onClick={() => {
                      setRegion(regKey);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs transition-colors ${
                      isSelected
                        ? "bg-emerald-50 text-emerald-900 font-bold"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{item.flag}</span>
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-[10px] text-gray-400">
                          Default Currency: {item.defaultCurrency}
                          {item.nationalCurrency && (
                            <span className="text-amber-700 ml-1">
                              (National: {item.nationalCurrency})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Tab 3: Display Currencies */}
          {activeTab === "currency" && (
            <div className="max-h-64 overflow-y-auto divide-y divide-gray-50 p-1">
              {(Object.keys(CURRENCIES) as SupportedCurrency[]).map((currKey) => {
                const item = CURRENCIES[currKey];
                const isSelected = displayCurrency === currKey;
                return (
                  <button
                    key={currKey}
                    onClick={() => {
                      setDisplayCurrency(currKey);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs transition-colors ${
                      isSelected
                        ? "bg-emerald-50 text-emerald-900 font-bold"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center font-bold text-gray-700">
                        {item.symbol}
                      </span>
                      <div>
                        <div className="font-semibold">{item.code} — {item.name}</div>
                        <div className="text-[10px] text-gray-400">Decimals: {item.minorUnits}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Footer Transparency Note */}
          <div className="p-2 bg-gray-50 border-t border-gray-100 text-[10px] text-gray-500 text-center">
            Settings persist locally and sync across authenticated sessions.
          </div>
        </div>
      )}
    </div>
  );
};

export default InternationalSelector;
