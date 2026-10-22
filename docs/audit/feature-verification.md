# Feature Verification & Production Status Register — Farmculture AI

**Date:** 2026-10-22  
**Auditor:** Principal Full-Stack Architect & QA Automation Lead  

---

## Objective Classification Criteria
- **VERIFIED & AVAILABLE:** Real functional implementation, validated inputs, authenticated authorization enforced, source provenance documented, passes automated integration/unit tests.
- **BETA / PILOT:** Operational feature under active testing; may require local device permissions or localized benchmark coverage.
- **DEMONSTRATION / SIMULATION:** Model simulation or hardware telemetry prototype; clearly labeled to avoid deceptive production claims.
- **COMING SOON:** Interface placeholder clearly identified as planned future capability.

---

## Feature Verification Matrix

| Route | Component | Auth Required | Data Source / Provider | Security Controls | Test Coverage | Operational Status |
|---|---|---|---|---|---|---|
| `/` | `HomePage` | No | Component registry & i18n dictionaries | Content sanitization | `routing.test.ts` | **VERIFIED & AVAILABLE** |
| `/crop-diagnosis` | `CropDiagnosis` | Optional for scan, Required for history | In-browser vegetative chromaticity analysis & Firestore history | File size limits (5MB), MIME verification, owner-restricted storage | `cropDiagnosis.test.ts` | **VERIFIED & AVAILABLE** |
| `/market-prices` | `MarketPrices` | No | Multi-Country benchmark records (Agmarknet, Rungis, BLE, Mercamadrid, Rybitwy, USDA) | Validated FX arithmetic, staleness indicators | `marketPrices.test.ts` | **VERIFIED & AVAILABLE** |
| `/weather` | `WeatherInsights` | No | Meteorological observation engine | Input bounds validation | `weatherService.test.ts` | **VERIFIED & AVAILABLE** |
| `/schemes` | `GovernmentSchemes` | No | Verified Indian agricultural scheme repository | Static link verification | Unit verified | **VERIFIED & AVAILABLE** |
| `/restaurants` | `RestaurantConnect` | Yes | Firestore `produce_orders` collection | Authenticated user linkage | Unit verified | **BETA** |
| `/storage` | `ColdStorage` | No | Multi-state warehouse catalog | Verified capacity specs | Unit verified | **VERIFIED & AVAILABLE** |
| `/predictor` | `MarketPredictor` | No | Seasonal heuristic projection algorithm | Simulation disclosure badge, no unverified confidence | Component test | **DEMONSTRATION** |
| `/crop-health` | `CropHealthMonitor` | No | Simulated satellite vegetation index | Simulation mode badge, educational guidance disclaimers | Component test | **DEMONSTRATION** |
| `/drones` | `DroneMonitoring` | No | Aerial telemetry simulation engine | Demonstration mode badge; live controls disabled | Component test | **DEMONSTRATION** |
| `/irrigation` | `SmartIrrigation` | No | Soil moisture sensor simulation | Simulation mode badge | Component test | **DEMONSTRATION** |
| `/traceability` | `BlockchainTraceability`| No | Prototype supply chain batch (TOM-2025-001) | Sample record disclaimer badge | Component test | **DEMONSTRATION** |
| `/reviews` | `ReviewCarousel` | Submission: Yes | Firestore `/reviews` collection | Owner-restricted update/delete, rating 1-5 validation | `reviewSystem.test.ts` | **VERIFIED & AVAILABLE** |
| `/dashboard` | `DashboardPage` | **Yes** | AuthContext & user profile | `ProtectedRoute` authentication check | `routing.test.ts` | **VERIFIED & AVAILABLE** |
| `/auth/login` | `LoginPage` | No | Firebase Auth | Open-redirect prevention (`getSafeReturnUrl`) | `loginRedirect.test.ts` | **VERIFIED & AVAILABLE** |
| `/about` | `AboutUsPage` | No | Static localized documentation | Static content | `footerAndLegal.test.ts` | **VERIFIED & AVAILABLE** |
| `/privacy-policy` | `PrivacyPolicyPage` | No | Technical privacy & data governance policies | Accurate data disclosures | `footerAndLegal.test.ts` | **VERIFIED & AVAILABLE** |
| `/contact` | `ContactUsPage` | Yes | Firestore `/support_requests` | Immutable audit log rule | Unit verified | **VERIFIED & AVAILABLE** |
