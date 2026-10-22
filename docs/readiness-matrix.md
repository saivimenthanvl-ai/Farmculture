# Readiness Matrix — Farmculture AI

**Date:** 2026-10-22  
**Auditor:** Principal Full-Stack Architect, Security Engineer, QA Lead  
**Scope:** Stages 0 through 12 Verification  

---

## Allowed Statuses
- `NOT STARTED`
- `INVESTIGATING`
- `IMPLEMENTED — UNVERIFIED`
- `BLOCKED`
- `TEST FAILED`
- `VERIFIED`
- `DEPLOYED — VERIFIED`

---

| Gate | Description | Priority | Original Defect / Risk | Files Modified | Tests Executed | Status |
|---|---|---|---|---|---|---|
| **G1** | Complete Multi-Locale Translation | P1 | Raw keys in legal/auth (`auth.log_in`, `legal.privacyBadge`). | `src/contexts/LanguageContext.tsx` | `vitest run src/test/localizationCompleteness.test.ts src/test/loginRedirect.test.ts` | **VERIFIED** |
| **G2** | Weather: Location, Provider, Timestamps | P1 | Language dictated New Delhi location; missing timestamps; coordinate out-of-bounds risks. | `src/lib/weatherService.ts`<br/>`src/components/WeatherInsights.tsx` | `vitest run src/test/weatherService.test.ts` (7 tests) | **VERIFIED** |
| **G3** | Market Predictor Honest Disclosure | P0 | Unverified 85%/72% confidence claims. | `src/components/MarketPredictor.tsx` | Code audit & component build | **VERIFIED** |
| **G4** | Supply-Chain & Traceability Claims | P0 | "All stages verified on blockchain" claim on demo prototype. | `src/contexts/LanguageContext.tsx`<br/>`src/components/BlockchainTraceability.tsx` | Code audit & localization test | **VERIFIED** |
| **G5** | Privacy Policy & Agricultural Disclaimer | P1 | Raw legal keys; unverified government affiliation claims. | `src/pages/PrivacyPolicyPage.tsx`<br/>`src/pages/DisclaimerPage.tsx`<br/>`src/contexts/LanguageContext.tsx` | `vitest run src/test/footerAndLegal.test.ts` | **VERIFIED** |
| **G6** | Contact Us Backend Workflow | P1 | Submissions masked failure as success; input lengths unchecked. | `src/pages/ContactUsPage.tsx`<br/>`firestore.rules` | Vitest build & rule checks | **VERIFIED** |
| **G7** | Firebase Authorization & Isolation | P0 | "Missing or insufficient permissions"; missing Storage rules; cross-user exposure. | `firestore.rules`<br/>`storage.rules`<br/>`src/lib/firebase.ts` | `vitest run src/test/firestoreRules.test.ts` (5 tests) | **VERIFIED** |
| **G8** | Automated Testing & Build Validation | P1 | Unverified test passes; production bundle breakages. | `vitest.config.ts`<br/>`package.json` | `npm test -- --run` (59 tests passing)<br/>`npm run build` (Exit code 0) | **VERIFIED** |
| **G9** | End-to-End Farmer Assessment Workflow | P1 | In-browser scanner did not persist history under authenticated UID. | `src/lib/cropDiagnosisService.ts`<br/>`src/components/CropDiagnosis.tsx` | `vitest run src/test/cropDiagnosis.test.ts` (7 tests) | **VERIFIED** |
| **G10** | Authentic Market Benchmark & Currency Decoupling | P0 | Converted Indian mandis displayed for European capitals. | `src/lib/marketPriceService.ts`<br/>`src/lib/currencyService.ts` | `vitest run src/test/marketPrices.test.ts src/test/currencyService.test.ts` (11 tests) | **VERIFIED** |

