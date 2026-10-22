# Current System Architecture — Farmculture AI

**Date:** 2026-10-22  
**Auditor / Architect:** Principal Full-Stack Architect, Security Engineer, QA Lead  
**Application:** Farmculture AI  
**Repository Branch:** `main`

---

## 1. System Overview

Farmculture AI is a client-side Single Page Application (SPA) built with React 18, TypeScript 5, Vite 5, TailwindCSS 4, and Firebase v10 SDK. The system provides agricultural intelligence, market commodity tracking, crop disease inspection, and community tools for farmers globally and regionally.

```mermaid
graph TD
  User([Farmer / Browser]) --> Router[React Router v7 / SPA Engine]
  Router --> Layout[AppLayout with Global Header & Footer]
  Layout --> Routes[Route Registry]
  
  subgraph Frontend State & Contexts
    LangCtx[LanguageContext & i18n Dictionary]
    AuthCtx[AuthContext / Firebase Auth Observer]
    LocCtx[LocalizationContext: Currency & Region]
  end

  Routes --> Home[HomePage Grid]
  Routes --> Diag[Crop Diagnosis Workflow]
  Routes --> Market[Market Prices & FX Engine]
  Routes --> Reviews[Community Reviews & Moderation]
  Routes --> Adv[Advanced Sim Modules: Drones, Satellite, Predictor]
  Routes --> Dash[Protected Farmer Dashboard]

  subgraph Cloud Infrastructure (Firebase)
    FBAuth[Firebase Authentication: Email/Password & Google OAuth]
    Firestore[(Cloud Firestore: users, reviews, support_requests)]
    FBStorage[(Firebase Storage: Crop Image Assets)]
  end

  AuthCtx --> FBAuth
  Dash --> Firestore
  Diag --> FBStorage
  Diag --> Firestore
  Reviews --> Firestore
```

---

## 2. Directory Structure

```
Farmculture/
├── .env / .env.example       # Firebase web configuration
├── docs/                     # Architecture, audit, and security specifications
│   ├── architecture/         # System design and data-flow specifications
│   └── audit/                # Defect register, baseline audit, security findings
├── firestore.rules           # Cloud Firestore security rules (v2)
├── firebase.json             # Firebase emulator and rules configuration
├── package.json              # Dependencies and build scripts
├── src/
│   ├── app/                  # Route views (LoginPage, DashboardPage)
│   ├── components/           # Core feature components & widgets
│   ├── contexts/             # Global contexts (Auth, Language, Localization)
│   ├── lib/                  # Services (market prices, currency, reviews, crop diagnosis)
│   ├── pages/                # Informational & legal pages (About, Privacy, Contact)
│   └── test/                 # Vitest automated test suites
├── vercel.json               # SPA rewrites configuration for production deployment
└── vite.config.ts            # Vite bundler configuration
```

---

## 3. Technology Stack Inventory

| Component | Technology | Version | Purpose |
|---|---|---|---|
| **Language** | TypeScript | `^5.9.2` | Static typing, interface contracts |
| **Bundler / Runtime** | Vite | `^5.4.8` | Development server and production roll-up |
| **UI Framework** | React | `^18.3.1` | Component-based interface rendering |
| **Styling** | TailwindCSS + PostCSS | `^4.1.13` | Utility styling and responsive layouts |
| **Routing** | `react-router-dom` | `^7.9.1` | Client-side routing, protected routes, deep-linking |
| **Authentication** | Firebase Auth | `^10.14.1` | Identity management (Email/Password, Google OAuth) |
| **Database** | Cloud Firestore | `^10.14.1` | Document storage (`users`, `reviews`, `support_requests`) |
| **Storage** | Firebase Storage | `^10.14.1` | Binary image storage for crop leaf specimens |
| **Testing** | Vitest + RTL | `^2.1.9` | Unit, integration, security rules, and localization tests |
| **Hosting Target** | Vercel | Production | Serverless Edge CDN with SPA rewrites |

---

## 4. Key Services & Boundaries

1. **`src/lib/firebase.ts`**:
   - Centralizes client SDK initialization using `import.meta.env.VITE_FB_*` variables.
   - Exports authoritative instances of `auth`, `db` (Firestore), and `storage`.
2. **`src/contexts/AuthContext.tsx`**:
   - Listens to `onAuthStateChanged`.
   - Resolves user profile strictly by authenticated `users/{uid}` lookup.
3. **`src/lib/marketPriceService.ts`**:
   - Standardized multi-country agricultural market database covering India (Agmarknet benchmark), France (RNM Rungis), Germany (BLE Großmarkt), Spain (Mercamadrid), Poland (Rybitwy Kraków), UK (New Covent Garden), US (USDA AMS), and Australia (Sydney Markets).
4. **`src/lib/currencyService.ts`**:
   - FX engine decoupling user display preferences (e.g. EUR, PLN, USD, GBP, INR) from source market currencies.
5. **`src/lib/cropDiagnosisService.ts`**:
   - Evidence-based crop leaf classification, chromatic vegetative excess verification, size/MIME validation, and strict abstention logic.
6. **`src/lib/reviewService.ts`**:
   - Authenticated review creation, rating bounds validation (1-5), and un-fabricated average statistics.
