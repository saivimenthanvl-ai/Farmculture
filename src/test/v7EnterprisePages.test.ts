import { describe, it, expect } from "vitest";
import { dict, pathGet, Lang } from "../contexts/LanguageContext";

describe("Phase 11 V7 Enterprise Client-Ready Pages & Localization Verification", () => {
  const supportedLangs: Lang[] = ["en", "hi", "mr", "ta", "de", "pl", "fr", "es", "te", "ar"];

  it("verifies all V7 About page localization keys exist in all 10 supported languages", () => {
    const requiredAboutKeys = [
      "about.badge",
      "about.title",
      "about.heroDesc",
      "about.exploreServices",
      "about.card1Title",
      "about.card1Desc",
      "about.card2Title",
      "about.card2Desc",
      "about.card3Title",
      "about.card3Desc",
      "about.card4Title",
      "about.card4Desc",
      "about.missionTitle",
      "about.missionDesc",
      "about.whoWeServeTitle",
      "about.whoWeServeDesc",
      "about.audienceSmallholderTitle",
      "about.audienceSmallholderDesc",
      "about.audienceAgribusinessTitle",
      "about.audienceAgribusinessDesc",
      "about.audienceFpoTitle",
      "about.audienceFpoDesc",
      "about.audienceConsultantTitle",
      "about.audienceConsultantDesc",
      "about.principlesTitle",
      "about.portfolioTitle",
      "about.portfolioDesc",
      "about.viewServices",
    ];

    supportedLangs.forEach((lang) => {
      const langDict = dict[lang];
      expect(langDict, `Dictionary for ${lang} must exist`).toBeDefined();

      requiredAboutKeys.forEach((key) => {
        const val = pathGet(langDict, key) ?? langDict[key];
        expect(
          val,
          `Key "${key}" must be non-empty string in language "${lang}"`
        ).toBeTypeOf("string");
        expect(val.length).toBeGreaterThan(0);
      });
    });
  });

  it("verifies all V7 Service Portfolio localization keys exist in all 10 supported languages", () => {
    const requiredServiceKeys = [
      "services.badge",
      "services.title",
      "services.subtitle",
      "services.catCore",
      "services.catCoreDesc",
      "services.catMarket",
      "services.catMarketDesc",
      "services.catOperations",
      "services.catOperationsDesc",
      "services.catExperimental",
      "services.catExperimentalDesc",
      "services.statusAvailable",
      "services.statusBeta",
      "services.statusDemonstration",
      "services.statusPilot",
      "services.statusUnavailable",
      "services.cropDiagDesc",
      "services.cropDiagScope",
      "services.weatherDesc",
      "services.weatherScope",
      "services.healthDesc",
      "services.healthScope",
      "services.marketDesc",
      "services.marketScope",
      "services.schemesDesc",
      "services.schemesScope",
      "services.directoryDesc",
      "services.directoryScope",
      "services.farmRecordsDesc",
      "services.farmRecordsScope",
      "services.cropRecordsDesc",
      "services.cropRecordsScope",
      "services.storageDesc",
      "services.storageScope",
      "services.supportDesc",
      "services.supportScope",
      "services.predictorDesc",
      "services.predictorScope",
      "services.dronesDesc",
      "services.dronesScope",
      "services.irrigationDesc",
      "services.irrigationScope",
      "services.traceabilityDesc",
      "services.traceabilityScope",
      "services.operationalScope",
      "services.dataSource",
      "services.limitations",
      "services.accessTool",
      "services.explorePrototype",
    ];

    supportedLangs.forEach((lang) => {
      const langDict = dict[lang];
      expect(langDict, `Dictionary for ${lang} must exist`).toBeDefined();

      requiredServiceKeys.forEach((key) => {
        const val = pathGet(langDict, key) ?? langDict[key];
        expect(
          val,
          `Key "${key}" must be non-empty string in language "${lang}"`
        ).toBeTypeOf("string");
        expect(val.length).toBeGreaterThan(0);
      });
    });
  });

  it("verifies all V7 Farmer Dashboard localization keys exist in Tamil (ta) and all other 9 locales", () => {
    const requiredDashboardKeys = [
      "dashboard.portalBadge",
      "dashboard.cloudSync",
      "dashboard.guestMode",
      "dashboard.welcomeBack",
      "dashboard.subtitle",
      "dashboard.addFarmPlot",
      "dashboard.scanFoliage",
      "dashboard.tabOverview",
      "dashboard.tabFarms",
      "dashboard.tabCrops",
      "dashboard.kpiFarms",
      "dashboard.kpiFarmsUnit",
      "dashboard.kpiFarmsActive",
      "dashboard.kpiFarmsEmpty",
      "dashboard.kpiFarmsSub",
      "dashboard.kpiLand",
      "dashboard.kpiLandUnit",
      "dashboard.kpiLandActive",
      "dashboard.kpiLandEmpty",
      "dashboard.kpiLandSub",
      "dashboard.kpiCrops",
      "dashboard.kpiCropsUnit",
      "dashboard.kpiCropsActive",
      "dashboard.kpiCropsEmpty",
      "dashboard.kpiCropsSub",
      "dashboard.kpiScans",
      "dashboard.kpiScansUnit",
      "dashboard.kpiScansActive",
      "dashboard.kpiScansEmpty",
      "dashboard.kpiScansSub",
      "dashboard.emptyTitle",
      "dashboard.emptyDesc",
      "dashboard.emptyAction",
      "dashboard.holdingsTitle",
      "dashboard.holdingsSub",
      "dashboard.addPlot",
      "dashboard.remove",
      "dashboard.acres",
      "dashboard.recentDiagnostics",
      "dashboard.recentDiagnosticsSub",
      "dashboard.newScan",
      "dashboard.noDiagnostics",
      "dashboard.healthy",
      "dashboard.diseaseDetected",
      "dashboard.inconclusive",
      "dashboard.weatherTitle",
      "dashboard.weatherSub",
      "dashboard.mandiTitle",
      "dashboard.mandiSub",
      "dashboard.viewFullMarket",
      "dashboard.registeredPlotsTitle",
      "dashboard.registeredPlotsSub",
      "dashboard.activeCropsTitle",
      "dashboard.activeCropsSub",
      "dashboard.addCropRecord",
      "dashboard.noCropsYet",
      "dashboard.noCropsDesc",
      "dashboard.colPlot",
      "dashboard.colCrop",
      "dashboard.colArea",
      "dashboard.colPlantDate",
      "dashboard.colHarvestDate",
      "dashboard.colStage",
      "dashboard.registerFarmModalTitle",
      "dashboard.farmNameLabel",
      "dashboard.farmLocationLabel",
      "dashboard.farmStateLabel",
      "dashboard.totalAcresLabel",
      "dashboard.primaryCropsLabel",
      "dashboard.cancel",
      "dashboard.saving",
      "dashboard.savePlot",
      "dashboard.logCropModalTitle",
      "dashboard.selectFarmLabel",
      "dashboard.cropVarietyLabel",
      "dashboard.plantedAcreageLabel",
      "dashboard.plantingDateLabel",
      "dashboard.estHarvestLabel",
      "dashboard.growthStageLabel",
      "dashboard.saveCrop",
      "dashboard.syncNotice",
      "dashboard.confirmDelete",
    ];

    supportedLangs.forEach((lang) => {
      const langDict = dict[lang];
      expect(langDict, `Dictionary for ${lang} must exist`).toBeDefined();

      requiredDashboardKeys.forEach((key) => {
        const val = pathGet(langDict, key) ?? langDict[key];
        expect(
          val,
          `Dashboard key "${key}" must be non-empty string in language "${lang}"`
        ).toBeTypeOf("string");
        expect(val.length).toBeGreaterThan(0);
      });
    });
  });

  it("ensures Tamil (ta) dashboard specifically translates core metrics correctly", () => {
    const taDict = dict["ta"];
    expect(pathGet(taDict, "dashboard.portalBadge") ?? taDict["dashboard.portalBadge"]).toBe("விவசாயிகள் தளம்");
    expect(pathGet(taDict, "dashboard.kpiFarms") ?? taDict["dashboard.kpiFarms"]).toBe("பதிவு செய்த பண்ணைகள்");
    expect(pathGet(taDict, "dashboard.kpiLand") ?? taDict["dashboard.kpiLand"]).toBe("மொத்த சாகுபடி நிலம்");
    expect(pathGet(taDict, "dashboard.kpiCrops") ?? taDict["dashboard.kpiCrops"]).toBe("செயலில் உள்ள பயிர்கள்");
    expect(pathGet(taDict, "dashboard.kpiScans") ?? taDict["dashboard.kpiScans"]).toBe("இலை ஆய்வுகள்");
  });
});
