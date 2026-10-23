import { describe, it, expect } from "vitest";
import {
  SUPPORTED_LOCALES,
  LOCALES,
  REGIONS,
  CURRENCIES,
} from "../lib/localeConfig";
import { dict } from "../contexts/LanguageContext";

describe("Industrial V6 Localization and Navigation Coverage", () => {
  const REQUIRED_NAV_KEYS = [
    "navigation.overview",
    "navigation.dashboard",
    "navigation.myFarm",
    "navigation.farms",
    "navigation.cropRecords",
    "navigation.history",
    "navigation.intelligence",
    "navigation.cropDiagnosis",
    "navigation.marketPrices",
    "navigation.weather",
    "navigation.schemes",
    "navigation.marketServices",
    "navigation.buyerDirectory",
    "navigation.coldStorage",
    "navigation.support",
    "navigation.experimental",
    "navigation.predictor",
    "navigation.cropHealth",
    "navigation.drones",
    "navigation.irrigation",
    "navigation.traceability",
    "navigation.account",
    "navigation.profile",
    "navigation.settings",
    "navigation.logout",
  ];

  const SUPPORTED_LANGS = ["en", "fr", "es", "de", "pl", "hi", "mr", "ta", "te", "ar"] as const;

  it("verifies all 10 language dictionaries contain every task navigation key", () => {
    SUPPORTED_LANGS.forEach((lang) => {
      const table = dict[lang];
      expect(table, `Dictionary for '${lang}' should exist`).toBeDefined();

      REQUIRED_NAV_KEYS.forEach((key) => {
        const val = table[key];
        expect(
          val,
          `Key '${key}' should be translated in '${lang}' dictionary`
        ).toBeDefined();
        expect(
          typeof val,
          `Key '${key}' in '${lang}' should be a non-empty string`
        ).toBe("string");
        expect(val.length).toBeGreaterThan(0);
      });
    });
  });

  it("verifies French, Spanish, German, Polish and Arabic have localized Overview & Dashboard", () => {
    expect(dict.fr["navigation.overview"]).toBe("Vue d'ensemble");
    expect(dict.fr["navigation.dashboard"]).toBe("Tableau de bord");
    expect(dict.es["navigation.overview"]).toBe("Resumen");
    expect(dict.de["navigation.overview"]).toBe("Übersicht");
    expect(dict.pl["navigation.overview"]).toBe("Przegląd");
    expect(dict.ar["navigation.overview"]).toBe("نظرة عامة");
  });
});
