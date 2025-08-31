import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

type StorageItem = {
  name: string;
  location: string;      // e.g. "Salzungen, Germany" or "Województwo mazowieckie, Poland"
  priceInINR: number;    // your existing numeric price in rupees per kg/day
  // ...other fields
};

const INR_TO_EUR = 1 / 100;

function usesEuro(location: string, lang: string) {
  const euroLang = ["de", "pl"]; // per your request
  const euroCountry = /(germany|poland)/i.test(location);
  return euroCountry || euroLang.includes(lang);
}

function formatMoneyEUR(amount: number) {
  try {
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(amount);
  } catch {
    // fallback
    return `€${amount.toFixed(2)}`;
  }
}

function formatMoneyINR(amount: number) {
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(amount);
  } catch {
    return `₹${amount.toFixed(2)}`;
  }
}

export const ColdStorage: React.FC = () => {
  const { lang } = useLanguage();

  const storages: StorageItem[] = [
    {
      name: "Agrarcenter Buttlar",
      location: "Salzungen, Germany",
      priceInINR: 3, // ₹3 / kg / day
    },
    {
      name: "Smart Vegetables Innovations 2",
      location: "Województwo mazowieckie, Poland",
      priceInINR: 2.2, // ₹2.2 / kg / day
    },
    // ... your other entries
  ];

  return (
    <div className="space-y-6">
      {storages.map((s) => {
        const euro = usesEuro(s.location, lang);
        const priceDisplay = euro
          ? formatMoneyEUR(s.priceInINR * INR_TO_EUR)   // convert
          : formatMoneyINR(s.priceInINR);

        return (
          <div key={s.name} className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{s.name}</h3>
                <p className="text-gray-600">{s.location}</p>
              </div>
              <div className="text-right">
                <div className="text-green-700 font-bold">
                  {priceDisplay}
                </div>
                <div className="text-xs text-gray-500">per kg/day</div>
              </div>
            </div>
            {/* ...rest of your card */}
          </div>
        );
      })}
    </div>
  );
};
