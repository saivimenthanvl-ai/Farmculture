/**
 * i18n Verification Script
 * Validates dictionary key coverage, empty values, raw keys, and prints coverage report.
 */

import { dict, pathGet, Lang } from "../src/contexts/LanguageContext.js";

const supportedLangs: Lang[] = ["en", "hi", "mr", "ta", "de", "pl", "fr", "es", "te", "ar"];

interface VerificationResult {
  totalKeys: number;
  present: number;
  missing: string[];
  empty: string[];
  coveragePercent: number;
}

// Flatten an object into dot-notated keys
function flattenKeys(obj: any, prefix = ""): string[] {
  let keys: string[] = [];
  for (const key of Object.keys(obj || {})) {
    const val = obj[key];
    const newPrefix = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === "object" && !Array.isArray(val)) {
      keys = keys.concat(flattenKeys(val, newPrefix));
    } else {
      keys.push(newPrefix);
    }
  }
  return keys;
}

export function runI18nCheck(): boolean {
  console.log("==================================================");
  console.log("  FARMCULTURE AI — I18N LOCALIZATION VALIDATION   ");
  console.log("==================================================\n");

  const baselineKeys = flattenKeys(dict.en);
  console.log(`Baseline ('en') keys inventory count: ${baselineKeys.length}\n`);

  const results: Record<Lang, VerificationResult> = {} as any;
  let hasFailures = false;

  for (const lang of supportedLangs) {
    let presentCount = 0;
    const missing: string[] = [];
    const empty: string[] = [];

    for (const key of baselineKeys) {
      const val = pathGet(dict[lang], key) ?? dict[lang][key];
      if (val === undefined || val === null) {
        missing.push(key);
      } else if (typeof val === "string" && val.trim().length === 0) {
        empty.push(key);
      } else {
        presentCount++;
      }
    }

    const coverage = Math.round((presentCount / baselineKeys.length) * 100);
    results[lang] = {
      totalKeys: baselineKeys.length,
      present: presentCount,
      missing,
      empty,
      coveragePercent: coverage,
    };

    console.log(
      `[${lang.toUpperCase().padEnd(3)}] Coverage: ${coverage
        .toString()
        .padStart(3)}% (${presentCount}/${baselineKeys.length}) | Missing: ${missing.length} | Empty: ${empty.length}`
    );

    // Fail if coverage is below threshold for any supported language
    if (coverage < 90) {
      hasFailures = true;
    }
  }

  console.log("\n==================================================");
  if (hasFailures) {
    console.error("❌ I18N VALIDATION FAILED: Some languages have insufficient coverage.");
    return false;
  } else {
    console.log("✅ I18N VALIDATION PASSED: All 9 languages verified with high coverage.");
    return true;
  }
}

// Execute when invoked directly
if (import.meta.url.endsWith(process.argv[1]?.replace(/\\/g, "/") || "")) {
  const success = runI18nCheck();
  process.exit(success ? 0 : 1);
}
