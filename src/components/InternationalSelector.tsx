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
      {/* Trigger Button: Shows flag + currency + locale code */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 bg-white/95 text-gray-800 rounded-lg border border-gray-200 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-semibold transition-all"
        title="Change Language, Country or Display Currency"
        aria-label="Localization settings"
      >
        <span className="text-base leading-none">{currentRegion?.flag || "🌐"}</span>
        <span className="uppercase text-gray-700">{interfaceLocale}</span>
        <span className="text-gray-400">•</span>
        <span className="text-emerald-700 font-bold">{displayCurrency}</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
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
