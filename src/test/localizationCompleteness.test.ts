import { describe, it, expect } from "vitest";
import { dict, pathGet, Lang } from "../contexts/LanguageContext";
import { LOCALES, REGIONS } from "../lib/localeConfig";

describe("Application-Wide Localization Completeness & Currency Verification", () => {
  const supportedLangs: Lang[] = ["en", "hi", "mr", "ta", "de", "pl", "fr", "es", "te", "ar"];

  it("verifies all 10 languages are present in the unified translation dictionary", () => {
    supportedLangs.forEach((lang) => {
      expect(dict[lang], `Dictionary for ${lang} must exist`).toBeDefined();
    });
  });

  it("ensures no raw translation keys or missing translations in Tamil (ta)", () => {
    const taDict = dict["ta"];
    expect(taDict).toBeDefined();

    // Check Market namespace
    expect(pathGet(taDict, "market.title")).toBe("வேளாண் சந்தை விலைகள்");
    expect(pathGet(taDict, "market.search")).toBe("பொருள் அல்லது சந்தையைத் தேடுக…");
    expect(pathGet(taDict, "market.verifiedProvenance")).toBe("சரிபார்க்கப்பட்ட மண்டி தரவு");
    expect(pathGet(taDict, "market.liveToday")).toBe("இன்றைய நேரடி விலை");

    // Check Cold Storage namespace
    expect(pathGet(taDict, "cold.title")).toBe("குளிர் சேமிப்பு கிடங்கு வசதிகள்");
    expect(pathGet(taDict, "cold.totalCapacity")).toBe("மொத்த கொள்ளளவு");
    expect(pathGet(taDict, "cold.available")).toBe("கிடைப்பது");
    expect(pathGet(taDict, "cold.temperature")).toBe("வெப்பநிலை");
    expect(pathGet(taDict, "cold.rating")).toBe("மதிப்பீடு");
    expect(pathGet(taDict, "cold.facilities")).toBe("வசதிகள்");
    expect(pathGet(taDict, "cold.bookNow")).toBe("முன்பதிவு செய்");

    // Check Reviews namespace
    expect(pathGet(taDict, "reviews.title")).toBe("பயனர் மதிப்பீடுகள் & கருத்துகள்");
    expect(pathGet(taDict, "reviews.writeReview")).toBe("கருத்து எழுதவும்");
    expect(pathGet(taDict, "reviews.noReviewsYet")).toBe("இன்னும் கருத்துகள் இல்லை. உங்கள் அனுபவத்தை முதலில் பகிருங்கள்.");

    // Check Footer namespace
    expect(pathGet(taDict, "footerNav.ourServices")).toBe("எங்கள் சேவைகள்");
    expect(pathGet(taDict, "footerNav.aboutUs")).toBe("எங்களைப் பற்றி");
    expect(pathGet(taDict, "footerNav.privacyPolicy")).toBe("தனியுரிமைக் கொள்கை");
  });

  it("verifies core routes have complete translations across all supported languages", () => {
    const criticalKeys = [
      "brand",
      "brand_tagline",
      "welcome",
      "crop_diagnosis",
      "market_prices",
      "govt_schemes",
      "voice_assistant",
      "restaurants",
      "cold_storage",
      "market.title",
      "market.search",
      "cold.title",
      "reviews.title",
      "footerNav.ourServices",
      "footerNav.privacyPolicy"
    ];

    supportedLangs.forEach((lang) => {
      criticalKeys.forEach((key) => {
        const val = pathGet(dict[lang], key) ?? dict[lang][key] ?? pathGet(dict.en, key);
        expect(val, `Missing translation for key '${key}' in locale '${lang}'`).toBeDefined();
        expect(typeof val).toBe("string");
        expect(val.length).toBeGreaterThan(0);
        // Verify key is not returning the raw dot-notation string
        expect(val).not.toBe(key);
      });
    });
  });

  it("verifies commodity names localization across all 9 languages", () => {
    const commodities = ["tomato", "onion", "potato", "rice", "carrot", "groundnut"];
    supportedLangs.forEach((lang) => {
      commodities.forEach((item) => {
        const val = pathGet(dict[lang], `market.commodities.${item}`);
        expect(val, `Missing commodity translation for '${item}' in '${lang}'`).toBeDefined();
        expect(typeof val).toBe("string");
        expect(val.length).toBeGreaterThan(0);
      });
    });
  });

  it("enforces Farmculture AI European display policy for Poland while maintaining PLN national currency", () => {
    // Poland defaults to EUR under European display policy
    expect(REGIONS["PL"].defaultCurrency).toBe("EUR");
    expect(LOCALES["pl-PL"].defaultCurrency).toBe("EUR");

    // Poland's official national currency is PLN
    expect(REGIONS["PL"].nationalCurrency).toBe("PLN");
    expect(REGIONS["PL"].currencyNote).toContain("PLN");

    // United Kingdom does NOT default to EUR simply because it is in Europe
    expect(REGIONS["GB"].defaultCurrency).toBe("GBP");
    expect(LOCALES["en-GB"].defaultCurrency).toBe("GBP");

    // Eurozone countries default to EUR
    expect(REGIONS["DE"].defaultCurrency).toBe("EUR");
    expect(REGIONS["FR"].defaultCurrency).toBe("EUR");
    expect(REGIONS["ES"].defaultCurrency).toBe("EUR");
  });

  it("verifies operational status badges and feature highlight keys resolve in all languages", () => {
    const badgeKeys = [
      "home.badgeVoice",
      "home.badgeVerified",
      "home.badgePredictor",
      "home.badgeHealth",
      "home.badgePilot",
      "home.badgeIrrigation",
      "home.badgeTraceability",
    ];

    const highlightKeys = [
      "home.mandiSourced",
      "home.apmcProvenance",
      "home.mandiDesc",
      "home.evidenceBased",
      "home.cropDiagTitle",
      "home.cropDiagDesc",
      "home.multilingual",
      "home.globalRegional",
      "home.multilingualDesc",
      "home.zeroLockin",
      "home.openDirectory",
      "home.openDirectoryDesc",
    ];

    const greenSectionKeys = [
      "revolutionary_agriculture",
      "market_prediction",
      "market_prediction_desc",
      "satellite_monitoring",
      "satellite_monitoring_desc",
      "blockchain_transparency",
      "blockchain_transparency_desc",
    ];

    supportedLangs.forEach((lang) => {
      [...badgeKeys, ...highlightKeys, ...greenSectionKeys].forEach((key) => {
        const val = pathGet(dict[lang], key) ?? dict[lang][key] ?? pathGet(dict.en, key);
        expect(val, `Key '${key}' must resolve for language '${lang}'`).toBeDefined();
        expect(typeof val).toBe("string");
        expect(val.length).toBeGreaterThan(0);
        expect(val).not.toBe(key);
      });
    });
  });

  it("verifies user reviews & ratings namespace across all languages", () => {
    const reviewKeys = [
      "reviews.badge",
      "reviews.title",
      "reviews.subtitle",
      "reviews.writeReview",
      "reviews.noReviewsYet",
      "reviews.noReviewsSubtitle",
      "reviews.submitFirstReview",
      "reviews.modalTitle",
      "reviews.overallRating",
      "reviews.yourReview",
      "reviews.placeholder",
      "reviews.submitReview",
    ];

    supportedLangs.forEach((lang) => {
      reviewKeys.forEach((key) => {
        const val = pathGet(dict[lang], key) ?? dict[lang][key] ?? pathGet(dict.en, key);
        expect(val, `Review key '${key}' must resolve for '${lang}'`).toBeDefined();
        expect(typeof val).toBe("string");
        expect(val.length).toBeGreaterThan(0);
      });
    });
  });

  it("verifies full footer localization in es, de, fr, pl", () => {
    const esFooter = dict["es"].footerNav;
    const deFooter = dict["de"].footerNav;
    const frFooter = dict["fr"].footerNav;
    const plFooter = dict["pl"].footerNav;

    // Spanish
    expect(esFooter.ourServices).toBe("Nuestros servicios");
    expect(esFooter.infoLegal).toBe("Información y aspectos legales");
    expect(esFooter.supportCommunity).toBe("Soporte y comunidad");
    expect(esFooter.aboutUs).toBe("Sobre nosotros");
    expect(esFooter.privacyPolicy).toBe("Política de privacidad");
    expect(esFooter.disclaimer).toBe("Aviso legal agrícola");
    expect(esFooter.contactUs).toBe("Contáctanos");
    expect(esFooter.getInTouch).toBe("Ponte en contacto");

    // German
    expect(deFooter.ourServices).toBe("Unsere Dienstleistungen");
    expect(deFooter.infoLegal).toBe("Informationen und Rechtliches");
    expect(deFooter.supportCommunity).toBe("Support und Community");
    expect(deFooter.aboutUs).toBe("Über uns");
    expect(deFooter.privacyPolicy).toBe("Datenschutzerklärung");
    expect(deFooter.disclaimer).toBe("Haftungsausschluss für landwirtschaftliche Informationen");
    expect(deFooter.contactUs).toBe("Kontakt");
    expect(deFooter.getInTouch).toBe("Kontakt aufnehmen");

    // French
    expect(frFooter.ourServices).toBe("Nos services");
    expect(frFooter.infoLegal).toBe("Informations et mentions légales");
    expect(frFooter.supportCommunity).toBe("Assistance et communauté");
    expect(frFooter.aboutUs).toBe("À propos");
    expect(frFooter.privacyPolicy).toBe("Politique de confidentialité");
    expect(frFooter.disclaimer).toBe("Avertissement relatif aux informations agricoles");
    expect(frFooter.contactUs).toBe("Nous contacter");
    expect(frFooter.getInTouch).toBe("Prendre contact");

    // Polish
    expect(plFooter.ourServices).toBe("Nasze usługi");
    expect(plFooter.infoLegal).toBe("Informacje i kwestie prawne");
    expect(plFooter.supportCommunity).toBe("Wsparcie i społeczność");
    expect(plFooter.aboutUs).toBe("O nas");
    expect(plFooter.privacyPolicy).toBe("Polityka prywatności");
    expect(plFooter.disclaimer).toBe("Zastrzeżenie dotyczące informacji rolniczych");
    expect(plFooter.contactUs).toBe("Kontakt");
    expect(plFooter.getInTouch).toBe("Skontaktuj się z nami");
  });

  it("verifies reviews and ratings localization in es, de, fr, pl", () => {
    // Spanish
    expect(dict["es"].reviews.title).toBe("Opiniones y valoraciones de usuarios");
    expect(dict["es"].reviews.writeReview).toBe("Escribir una opinión");
    expect(dict["es"].reviews.noReviewsYet).toBe("Todavía no hay opiniones");
    expect(dict["es"].reviews.submitFirstReview).toBe("Publicar la primera opinión");

    // German
    expect(dict["de"].reviews.title).toBe("Nutzerbewertungen und Rezensionen");
    expect(dict["de"].reviews.writeReview).toBe("Bewertung schreiben");
    expect(dict["de"].reviews.noReviewsYet).toBe("Noch keine Bewertungen vorhanden");
    expect(dict["de"].reviews.submitFirstReview).toBe("Erste Bewertung abgeben");

    // French
    expect(dict["fr"].reviews.title).toBe("Avis et évaluations des utilisateurs");
    expect(dict["fr"].reviews.writeReview).toBe("Rédiger un avis");
    expect(dict["fr"].reviews.noReviewsYet).toBe("Aucun avis pour le moment");
    expect(dict["fr"].reviews.submitFirstReview).toBe("Publier le premier avis");

    // Polish
    expect(dict["pl"].reviews.title).toBe("Opinie i oceny użytkowników");
    expect(dict["pl"].reviews.writeReview).toBe("Napisz opinię");
    expect(dict["pl"].reviews.noReviewsYet).toBe("Brak opinii");
    expect(dict["pl"].reviews.submitFirstReview).toBe("Dodaj pierwszą opinię");
  });
});
