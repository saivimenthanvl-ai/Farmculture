# Baseline Audit — Farmculture AI

**Date:** 2026-10-21  
**Auditor:** Principal Full-Stack Engineer, Security Engineer, QA Lead  
**Repository:** Farmculture  
**Current Branch:** `main`  

---

## 1. Executive Summary

Farmculture AI is a Vite + React + TypeScript single-page application intended to support farmers with crop disease diagnosis, market price tracking, weather insights, voice assistance, and agricultural management tools.

The baseline audit reveals:
1. **Critical False Functionality & Synthetic Data:** The application presents hardcoded mock responses, arbitrary random numbers, and synthetic confidence scores across Crop Diagnosis (fabricated "Tomato Leaf Blight" 87%), Market Prices (fabricated 2025 static numbers without live API/provenance), Weather Insights (fabricated 28°C static mock weather), Crop Health Monitor, Drone Monitoring, and Smart Irrigation.
2. **Database & Configuration Fragmentation:** The codebase contains two conflicting Firebase configurations (`src/lib/firebase.ts` relying on `.env` with Vite env vars, and `src/firebase/config.ts` hardcoded to demo strings). The project is using **Cloud Firestore** and **Firebase Authentication**, but no Firebase security rules (`firestore.rules` or `database.rules.json`) exist in the repository. Realtime Database is not currently integrated, despite mentions in prior docs.
3. **Sensitive File Tracking:** `.env` containing live Firebase API keys (`VITE_FB_API_KEY`) is tracked in git index despite being listed in `.gitignore`.
4. **Broken Toolchain & Tests:** No automated tests exist (`vitest` exited with "No test files found" and code 1; `npm test` script is missing from `package.json`). ESLint fails immediately due to missing dependency `globals`.
5. **Architectural & Routing Defects (FC-21):** While `react-router-dom` is installed, feature navigation in `App.tsx` is completely controlled via local state (`activeFeature`), breaking deep linking, browser history (back/forward), refresh state, and direct URL navigation. `src/app/dashboard/page.tsx` is a 0-byte empty file.
6. **Authorization & Identity Defects (FC-08):** In `AuthContext.tsx`, Firestore fallback attempts to query `doc(db, "users", friendly)` using unverified client display names. In `LoginPage.tsx`, redirect URLs carry client-provided friendly names via query parameters (`/dashboard?name=...`). There are zero server-side security rules protecting the `users` collection or preventing cross-user reads/writes.

---

## 2. Technology Stack & Framework Inventory

| Layer | Declared / Detected Technology | Version | Notes / Status |
|---|---|---|---|
| **Build & Bundler** | Vite | `^5.4.0` (active: 5.4.8) | Working (`npm run build` succeeds) |
| **Language** | TypeScript | `^5.9.2` | Compiles with `tsc -b` |
| **UI Framework** | React / React DOM | `^18.3.1` | Note: `@types/react` is `^19.1.13` (minor version mismatch) |
| **Styling** | TailwindCSS + PostCSS | `^4.1.13` | Uses `@tailwindcss/postcss` |
| **Routing** | `react-router-dom` | `^7.9.1` | Installed, but App UI relies on component state switches |
| **Icons / UI** | `lucide-react`, `framer-motion` | `^0.544.0`, `^12.23.12` | Working |
| **Charts** | `chart.js`, `react-chartjs-2` | `^4.5.0`, `^5.3.0` | Used in monitoring/predictor components |
| **Authentication** | Firebase Auth | `^10.14.1` | Email/password & Google Auth initialized |
| **Database** | Firebase Firestore | `^10.14.1` | Used in AuthContext & Login; no Realtime DB in use |
| **Testing** | Vitest + Testing Library | `^2.1.9` | Installed in `devDependencies`, but 0 test files exist |
| **Linting** | ESLint + typescript-eslint | `10.13.0` | Broken on execution (missing `globals` package) |
| **Hosting Target** | Vercel | N/A | Missing `vercel.json` rewrite configuration for SPA routes |

---

## 3. Firebase & Security Architecture

### Configuration Split
- `src/lib/firebase.ts`: Correctly reads `import.meta.env.VITE_FB_*` variables and exports `auth` and `db` (Firestore).
- `src/firebase/config.ts`: Hardcodes placeholder demo strings (`"demo-api-key"`, `"farmculture-demo"`), yet is imported by `RestaurantConnect.tsx` and `ColdStorage.tsx`.

### Tracked Sensitive Files
- Git index tracking: `100644 4fef42e8... .env`
- `.env` contains live web configuration values.
- **Action Required:** Remove `.env` from git tracking cache (`git rm --cached .env`), provide `.env.example`, ensure `.gitignore` ignores `.env`.

### Identity & Authorization (FC-08)
- `AuthContext.tsx` line 54 queries Firestore at `doc(db, "users", friendly)` where `friendly` is derived from `user.displayName` or `email.split('@')[0]`. An attacker or unauthenticated user could create or impersonate records if friendly names collide or if client-side names are trusted.
- In `LoginPage.tsx`, users are written to `doc(db, "users", uid)` with `{ uid, displayName, email, provider, friendlyName }`.
- There are **zero** Firestore rules (`firestore.rules`) in the repository.

---

## 4. False Functionality & Synthetic Data Audit

1. **Crop Diagnosis (`src/components/CropDiagnosis.tsx`)**:
   - `analyzeCrop()` runs a `setTimeout(3000)` and returns a hardcoded object:
     `{ disease: "Tomato Leaf Blight", confidence: 87, severity: "medium", treatment: "...", prevention: "..." }`.
   - Any uploaded image (including non-plants, blank images, cars, humans) receives a 87% confident "Tomato Leaf Blight" diagnosis.
   - Violates Rule #6, Rule #8, and Stage 1 acceptance criteria.

2. **Market Prices (`src/components/MarketPrices.tsx`)**:
   - Runs `setTimeout(800)` and displays static mock prices dated `2025-01-19` for Carrot, Tomato, Rice, Onion, Groundnut.
   - Displays synthetic trend percentages (`+50%`, `-20%`) as if they are live market feeds.
   - Lacks real provenance, data provider, freshness indicators, or failure/staleness handling.

3. **Weather Insights (`src/components/WeatherInsights.tsx`)**:
   - Runs `setTimeout(2000)` and displays fixed mock weather (`28°C`, `75%` humidity, fixed 5-day forecast, synthetic alerts).
   - No location detection, no Open-Meteo / Weather API integration, and no failure states.

4. **Other Components with Mock Data**:
   - `MarketPredictor.tsx`: Uses seeded pseudo-random formula (`seeded()`) to fabricate 7/30/90-day price predictions.
   - `CropHealthMonitor.tsx`: Static mock field records with fake 87% confidence scores.
   - `DroneMonitoring.tsx`: Static mock drone telemetries with fake GPS coordinates and images.
   - `SmartIrrigation.tsx`: Static mock soil moisture values and simulated pump triggers.
   - `BlockchainTraceability.tsx`: Hardcoded batch `TOM-2025-001` with fabricated blockchain verification stages.
   - `RestaurantConnect.tsx` and `ColdStorage.tsx`: Contain commented out `// In a real app, this would fetch/save to Firebase` with static mock arrays.

---

## 5. Routing & Navigation Audit (FC-21)

- `src/App.tsx` wraps `<AppContent />` in `<BrowserRouter>` with 3 routes:
  - `/` -> `<AppContent />`
  - `/auth/login` -> `<LoginPage />`
  - `/dashboard` -> `<AppContent />`
- Within `<AppContent />`, the rendered view is controlled entirely by `const [activeFeature, setActiveFeature] = useState<ActiveFeature>("home")`.
- When clicking "Crop Diagnosis", URL remains `/` or `/dashboard`. Refreshing resets the view to home. Deep links like `/crop-diagnosis`, `/market-prices`, `/weather` 404 or fail.
- Direct URL access and browser Back/Forward navigation are completely broken.
- No protected route boundary exists: an unauthenticated user on `/dashboard` sees the exact same content as `/`.

---

## 6. Baseline Command Execution Results

1. **Build (`npm run build`)**: PASS
   - Output: `dist/index.html` (0.48 kB), `dist/assets/index-CaXXoOlv.css` (45.46 kB), `dist/assets/index-Bbeh8HAb.js` (891.69 kB).
2. **Typecheck (`tsc -b`)**: PASS (clean).
3. **Vitest (`npx vitest run`)**: FAIL (Exit code 1: No test files found).
4. **Lint (`npx eslint .`)**: FAIL (Exit code 1: `Cannot find package 'globals'`).
5. **Git Status**: Changes unstaged in `dist/` and `package.json`. `.env` is tracked in git index.
