# Farmculture AI — Testing Strategy & Verification Register

## Test Framework
- **Test Runner:** Vitest (`v2.1.9`)
- **Environment:** jsdom (`v30.1.3`)
- **Assertion Engine:** Vitest + `@testing-library/jest-dom`

## Test Execution Command
```bash
npm test
```

## Active Test Suites (19 Tests Passing)

### 1. `src/test/cropDiagnosis.test.ts` (5 tests)
- `rejects empty 0-byte images`: Asserts `validateCropImage` fails with descriptive error.
- `rejects oversized files > 5MB`: Asserts validation failure on large files.
- `rejects unsupported file formats like pdf or text`: Asserts mime-type rejection.
- `abstains with clear explanation when non-plant / out-of-distribution image is provided`: Asserts abstention state and zero fabricated disease recommendations.
- `explicitly flags diagnostic assessment as preliminary unverified guidance rather than validated lab report`: Verifies provenance tag `verified: false` on heuristic output.

### 2. `src/test/marketPrices.test.ts` (3 tests)
- `normalizes incoming records and computes freshness badge based on observation date`: Tests date diff arithmetic and `live` tag assignment.
- `marks older prices as recent or historical rather than claiming live data`: Verifies honest date badge computation.
- `ensures every verified benchmark price contains explicit source and date provenance`: Asserts presence of APMC Mandi, price > 0, date, and source string.

### 3. `src/test/weatherService.test.ts` (5 tests)
- `decodes WMO weather codes accurately`: Tests WMO weather mapping.
- `generates high rainfall alert when rain probability exceeds 70%`: Verifies agro advisory trigger.
- `generates wind drift warning when wind speed exceeds 20 km/h`: Verifies spray drift warning.
- `fetches and parses live Open-Meteo weather payload`: Tests network contract parsing.
- `handles provider HTTP failures gracefully without falling back to synthetic fake data`: Verifies error propagation.

### 4. `src/test/firestoreRules.test.ts` (3 tests)
- `firestore.rules file exists and specifies version 2`: Validates syntax declaration.
- `enforces UID-based ownership on users collection`: Verifies `request.auth.uid == userId`.
- `prevents friendly-name document spoofing with default deny`: Verifies `allow read, write: if false;`.

### 5. `src/test/routing.test.ts` (2 tests)
- `App.tsx contains declared routes for core features and protected dashboard`: Verifies declarative routing paths.
- `vercel.json contains SPA rewrites to index.html`: Verifies Vercel deployment rewrite rules.

### 6. `src/test/sanity.test.ts` (1 test)
- `vitest test runner executes properly`: Confirms test runner environment health.
