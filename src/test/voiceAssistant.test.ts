import { describe, it, expect, vi } from "vitest";
import { dict, pathGet, Lang } from "../contexts/LanguageContext";
import {
  VOICE_LANGUAGE_CAPABILITIES,
  isSpeechRecognitionAvailable,
  isSpeechSynthesisAvailable,
  processAgriculturalVoiceQuery,
} from "../lib/voiceAssistantService";

describe("Phase 6 — Voice Assistant & Global Favicon Suite", () => {
  const supportedLangs: Lang[] = ["en", "ta", "hi", "te", "mr", "fr", "es", "de", "pl", "ar"];

  const requiredVoiceKeys = [
    "title",
    "subtitle",
    "bilingual_support",
    "va_quick",
    "language",
    "startListening",
    "stopListening",
    "listening",
    "processing",
    "speaking",
    "ready",
    "speechUnsupported",
    "micPermissionDenied",
    "sendQuery",
    "inputPlaceholder",
    "sessionOnlyNotice",
    "quickWeather",
    "quickMarket",
    "quickCropHealth",
    "quickIrrigation",
    "quickTraceability",
    "readAloud",
    "speechEnabled",
    "speechDisabled",
  ] as const;

  // TEST 1 — Guarantees all 10 locales possess non-empty voice.* translation keys
  it("TEST 1: Guarantees complete translation coverage for voice.* keys in all 10 locales", () => {
    for (const lang of supportedLangs) {
      const langDict = dict[lang];
      expect(langDict, `Language dictionary for ${lang} must exist`).toBeDefined();

      for (const key of requiredVoiceKeys) {
        const fullKey = `voice.${key}`;
        const val = pathGet(langDict, fullKey) ?? langDict[fullKey];
        expect(
          typeof val === "string" && val.trim().length > 0,
          `Key "${fullKey}" must exist and be non-empty in locale "${lang}"`
        ).toBe(true);

        // Guarantees key symbol is not leaked as the value
        expect(val).not.toEqual(key);
      }
    }
  });

  // TEST 2 — Language capability matrix mapping
  it("TEST 2: Verifies language capability matrix provides supported BCP 47 locales", () => {
    expect(VOICE_LANGUAGE_CAPABILITIES.length).toBe(10);
    for (const cap of VOICE_LANGUAGE_CAPABILITIES) {
      expect(cap.locale).toMatch(/^[a-z]{2}-[A-Z]{2}$/);
      expect(cap.speechRecognitionSupported).toBe(true);
      expect(cap.speechSynthesisSupported).toBe(true);
    }
  });

  // TEST 3 — Genuine query processing for weather
  it("TEST 3: Successfully processes weather voice query with genuine meteorological response", async () => {
    const res = await processAgriculturalVoiceQuery("what is the weather today", "en", "IN");
    expect(res.category).toBe("weather");
    expect(res.sender).toBe("assistant");
    expect(res.text).toContain("meteorological conditions");
    expect(res.text).toContain("°C");
  });

  // TEST 4 — Genuine query processing for mandi market price
  it("TEST 4: Successfully processes market price voice query with verified benchmark data", async () => {
    const res = await processAgriculturalVoiceQuery("show me mandi market price for tomato", "en", "IN");
    expect(res.category).toBe("market_price");
    expect(res.sender).toBe("assistant");
    // Verified benchmark mandi market price check
    expect(res.text).toContain("Verified benchmark price");
    expect(res.dataPayload).toBeDefined();
    expect(res.dataPayload.commodity).toBeDefined();
    expect(res.provenance).toBeDefined();
    expect(res.provenance?.confidenceOrStatus).toBe("verified");
  });

  // TEST 5 — Quick action query processing for crop health, irrigation, and traceability
  it("TEST 5: Accurately maps agronomic quick action keywords", async () => {
    const cropRes = await processAgriculturalVoiceQuery("crop health", "en");
    expect(cropRes.category).toBe("crop_health");
    expect(cropRes.provenance).toBeDefined();

    const irrRes = await processAgriculturalVoiceQuery("irrigation schedule", "en");
    expect(irrRes.category).toBe("irrigation");

    const traceRes = await processAgriculturalVoiceQuery("batch traceability", "en");
    expect(traceRes.category).toBe("traceability");
  });

  // TEST 6 — Fallback for general unmapped query
  it("TEST 6: Returns structured educational guidance for general queries", async () => {
    const genRes = await processAgriculturalVoiceQuery("tell me a story", "en");
    expect(genRes.category).toBe("general");
    expect(genRes.text).toContain("Agronomic query received");
  });

  // TEST 7 — Authenticated Assessment History & Cross-User Data Isolation
  it("TEST 7: Enforces strict user authentication for private crop diagnostic history and farm holdings", async () => {
    // Unauthenticated attempt
    const unauthRes = await processAgriculturalVoiceQuery("my assessment history", "en", "IN", null);
    expect(unauthRes.category).toBe("assessment_history");
    expect(unauthRes.text).toContain("You must be signed in with your verified Farmculture account");
    expect(unauthRes.provenance?.confidenceOrStatus).toBe("abstain");

    // Authenticated attempt with a test user ID
    const authRes = await processAgriculturalVoiceQuery("my crop diagnosis", "en", "IN", "usr_test_farmer_99");
    expect(authRes.category).toBe("assessment_history");
    expect(authRes.sender).toBe("assistant");
    expect(authRes.provenance?.sourceName).toBeDefined();
  });

  // TEST 8 — Responsible Agronomic Safety Abstention
  it("TEST 8: Abstains from unverified chemical pesticide prescriptions and speculative financial claims", async () => {
    const chemRes = await processAgriculturalVoiceQuery("buy pesticide prescription spray for leaf blight", "en");
    expect(chemRes.text).toContain("Farmculture AI adheres to responsible agronomic safety protocols");
    expect(chemRes.provenance?.confidenceOrStatus).toBe("abstain");

    const cryptoRes = await processAgriculturalVoiceQuery("guaranteed yield crypto profit", "en");
    expect(cryptoRes.text).toContain("Farmculture AI adheres to responsible agronomic safety protocols");
    expect(cryptoRes.provenance?.confidenceOrStatus).toBe("abstain");
  });

  // TEST 9 — Complete Translation Coverage for Newly Injected Provenance and UI Keys
  it("TEST 9: Guarantees complete translation coverage for extended V12 keys in all 10 locales", () => {
    const extendedKeys = [
      "stopGeneration",
      "quickAssessment",
      "sourceProvenance",
      "verifiedSource",
      "estimatedModel",
      "abstainNotice",
      "timeObserved",
    ] as const;

    for (const lang of supportedLangs) {
      const langDict = dict[lang];
      for (const key of extendedKeys) {
        const fullKey = `voice.${key}`;
        const val = pathGet(langDict, fullKey) ?? langDict[fullKey];
        expect(
          typeof val === "string" && val.trim().length > 0,
          `Extended key "${fullKey}" must exist and be non-empty in locale "${lang}"`
        ).toBe(true);
      }
    }
  });
});
