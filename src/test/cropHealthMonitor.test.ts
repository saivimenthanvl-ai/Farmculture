import { describe, it, expect } from "vitest";
import { dict, pathGet, Lang } from "../contexts/LanguageContext";

describe("Phase 1 — Crop Health Monitor Localization & Truthfulness Verification", () => {
  const supportedLangs: Lang[] = ["en", "hi", "mr", "ta", "de", "pl", "fr", "es", "te", "ar"];

  it("verifies all Crop Health Monitor keys exist across all 10 supported languages", () => {
    const requiredKeys = [
      "health.title",
      "health.subtitle",
      "health.simulationMode",
      "health.simulationNotice",
      "health.aiScan",
      "health.scanning",
      "health.yourFields",
      "health.fieldNorth",
      "health.fieldSouth",
      "health.fieldEast",
      "health.cropType",
      "health.cropCabbage",
      "health.growthStage",
      "health.predictedYield",
      "health.expectedHarvest",
      "health.cropIssues",
      "health.lastScan",
      "health.issuesFound",
      "health.stageFlowering",
      "health.stageBulbDev",
      "health.stageHeadFormation",
      "health.allGood",
      "health.noIssuesDetected",
      "health.healthy",
      "health.diseaseIssue",
      "health.pestIssue",
      "health.nutrientIssue",
      "health.issueLeafBlight",
      "health.recoFungicide",
      "health.issueAphids",
      "health.recoNeem",
      "health.issueNitrogen",
      "health.recoUrea",
      "health.confidence",
      "health.hoursAgo",
      "health.dayAgo",
      "health.justNow",
      "health.analyzingSat",
    ];

    supportedLangs.forEach((lang) => {
      const langDict = dict[lang];
      expect(langDict, `Dictionary for ${lang} must exist`).toBeDefined();

      requiredKeys.forEach((key) => {
        const val = pathGet(langDict, key) ?? langDict[key];
        expect(
          val,
          `Key "${key}" must be non-empty string in language "${lang}"`
        ).toBeTypeOf("string");
        expect(val.length).toBeGreaterThan(0);
      });
    });
  });

  it("ensures Tamil translation contains no raw keys or English leaks for Crop Health Monitor", () => {
    const taDict = dict["ta"];
    expect(pathGet(taDict, "health.fieldNorth") ?? taDict["health.fieldNorth"]).toBe("வடக்கு மாதிரி நிலம்");
    expect(pathGet(taDict, "health.fieldSouth") ?? taDict["health.fieldSouth"]).toBe("தெற்கு மாதிரி நிலம்");
    expect(pathGet(taDict, "health.stageFlowering") ?? taDict["health.stageFlowering"]).toBe("பூக்கும் நிலை");
    expect(pathGet(taDict, "health.stageBulbDev") ?? taDict["health.stageBulbDev"]).toBe("கிழங்கு வளர்ச்சி");
    expect(pathGet(taDict, "health.stageHeadFormation") ?? taDict["health.stageHeadFormation"]).toBe("தலை அமைக்கும் நிலை");
  });

  it("verifies honest demonstration framing without unsupported live claims", () => {
    const enTitle = pathGet(dict.en, "health.title") ?? dict.en["health.title"];
    const enNotice = pathGet(dict.en, "health.simulationNotice") ?? dict.en["health.simulationNotice"];

    expect(enTitle).toContain("Demonstration Prototype");
    expect(enNotice).toContain("sample field observations");
    expect(enNotice).toContain("Do not apply chemical pesticides or fertilizers without certified local agronomist diagnosis");
  });
});
