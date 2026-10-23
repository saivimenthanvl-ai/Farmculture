# Prioritized Defect Register — Farmculture AI

**Date:** 2026-10-22  
**Auditor:** Principal Full-Stack Architect, Security Engineer, QA Automation Lead  
**Scope:** Whole Repository Audit & Verification  

---

## Severity Definitions
- **P0 — Critical / Blocking:** Security vulnerability, unauthenticated data exposure, broken auth/login, fabricated production claims, data loss risk.
- **P1 — High:** Missing end-to-end integration, broken feature routing, incomplete translations, inaccurate calculation.
- **P2 — Medium:** Operational friction, simulation labeling enhancement, missing telemetry, non-critical UX.

---

## Defect Register Table

| ID | Priority | Category | Component | Description & Root Cause | Status | Verification Evidence |
|---|---|---|---|---|---|---|
| **DEF-01** | P0 | Security | `firestore.rules` & `storage.rules` | Missing rules for Firebase Storage and incomplete subcollection `/users/{userId}/assessments/{id}` rules in Firestore. Without storage rules, authenticated users cannot upload crop leaf photos securely or could overwrite others' assets. | **RESOLVED** (Patch Stage 1) | `firestore.rules` updated & tested in `firestoreRules.test.ts`. |
| **DEF-02** | P0 | Auth / Access | `src/app/auth/login/page.tsx` & `AuthContext.tsx` | "Missing or insufficient permissions" historically triggered when user profile creation attempted to read or write without matching authenticated UID or when unauthenticated requests queried user documents. | **VERIFIED** | AuthContext queries `doc(db, "users", u.uid)`. Profile write verified in `loginRedirect.test.ts`. |
| **DEF-03** | P0 | Data Integrity | `MarketPredictor.tsx` | Simulated predictor displayed unverified confidence figures ("85%", "72%") without statistical historical backtesting. Must be labeled clearly as heuristic projections without fictitious statistical confidence. | **RESOLVED** (Patch Stage 2) | Modified `MarketPredictor.tsx` to remove misleading confidence numbers. |
| **DEF-04** | P0 | Data Integrity | `CropHealthMonitor.tsx` | Simulated satellite fields displayed unverified disease confidence ("87%", "94%") and recommended chemical fungicides automatically on synthetic records. | **RESOLVED** (Patch Stage 2) | Labeled as Field Simulation & Educational Guidance; removed fabricated high-precision confidence claims. |
| **DEF-05** | P0 | Transparency | `DroneMonitoring.tsx` & `BlockchainTraceability.tsx` | Displayed "LIVE" status and "Complete transparency guaranteed" on demo mockups. | **VERIFIED** | Prototype/Demonstration badges active; no unverified live hardware claims. |
| **DEF-06** | P0/P1 | Core Feature | `CropDiagnosis.tsx` & Assessment History | Crop diagnosis analyzed in-browser but did not persist assessment history to the authenticated user's profile (`/users/{uid}/assessments`) to allow review upon refresh or later sign-in. | **RESOLVED** (Patch Stage 4) | Added assessment persistence, image upload, and history retrieval in `cropDiagnosisService.ts` and `CropDiagnosis.tsx`. |
| **DEF-07** | P1 | Market Prices | `src/lib/marketPriceService.ts` | Benchmark market listings for EU (FR, DE, ES, PL, GB, US, AU) required validation against authentic wholesale markets and currency decoupling. | **VERIFIED** | 52/52 vitest tests passing in `marketPrices.test.ts` & `currencyService.test.ts`. |
| **DEF-08** | P1 | Localization | `src/contexts/LanguageContext.tsx` | Legal and navigation translation keys missing in non-English locales (`legal.privacyEffective`, `market.title`, etc.). | **VERIFIED** | Zero missing keys across 9 locales in `localizationCompleteness.test.ts`. |
| **DEF-09** | P1 | Reviews | `src/lib/reviewService.ts` | Hardcoded 4.9 ratings previously used instead of computing genuine averages from stored reviews. | **VERIFIED** | `computeReviewStats` tested with empty, single, and multiple reviews in `reviewSystem.test.ts`. |
| **DEF-10** | P0 | Localization & Truthfulness | `CropHealthMonitor.tsx` & `LanguageContext.tsx` | Crop Health Monitor rendered raw unresolved translation keys (`simulationMode`, `fieldNorth`, `stageFlowering`, `issuesFound`, `recommendation`) and made contradictory claims of real-time satellite / drone telemetry on a simulated demonstration model. | **VERIFIED** (V9 Master Plan) | Injected 38 keys across all 10 locales; refactored component to use design system tokens, explicit Demonstration Prototype framing, and renamed action to "Run Sample Simulation Scan". Verified in `src/test/cropHealthMonitor.test.ts`. |
| **DEF-11** | P1 | SEO & Route Quality | `index.html`, `NotFoundPage.tsx`, `public/` | Missing static `robots.txt`, `sitemap.xml`, high-resolution SVG favicon, and route-specific Open Graph / Twitter metadata on public routes (`/about`, `/services`, `/privacy-policy`, etc.). | **VERIFIED** (V9 Master Plan) | Implemented `SEOHead.tsx`, generated `robots.txt` & `sitemap.xml`, created `farmculture.svg`, and verified in `src/test/seoQuality.test.ts`. |

