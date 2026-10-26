# Farmculture AI — Enterprise Agronomy Intelligence Platform

Farmculture AI is a production-engineered agronomy software platform designed for Indian smallholder farmers, Farmer Producer Organizations (FPOs), agribusinesses, and agricultural extension advisors. It delivers verified APMC mandi arrival intelligence, hyper-local meteorological telemetry, and foliar diagnostic assistance.

---

## 🎨 Enterprise Design System & Tokens

Farmculture AI enforces a restrained, high-contrast agronomic visual palette. **Blue, purple, and indigo accents are strictly prohibited** in presentation layers.

## 🛡️ Data Provenance & Real Data vs Demonstration

| Data Domain | Provider / Source | Update Cadence | Behavior / Status |
| :--- | :--- | :--- | :--- |
| **Hyperlocal Weather** | Open-Meteo High-Resolution Ensemble Models (DWD ICON / ECMWF) | 15 Minutes | Live API with cached regional fallback |
| **APMC Mandi Rates** | Government of India AGMARKNET & data.gov.in wholesale records | Daily | Real quotes per kg/quintal |
| **Foliar Diagnosis** | Client TensorFlow vision model + KVK advisory rules | Real-Time | Bounded decision support |
| **Crop Health Remote Sensing** | Sentinel-2 multispectral vegetation index simulation | Periodic Sample Pass | Isolated sample data behind a dismissible banner |
| **Market Predictor** | Econometric seasonal heuristic models | On-Demand | Forecast simulation (not yet backtested) |

---

## 🚀 Development & Testing Commands

```bash
# Install dependencies
npm install

# Start local development server (Vite)
npm run dev

# Run Vitest automated test suite (20 suites, 91 tests)
npm test

# Production build & TypeScript check
npm run build
```

---

## 📋 Production Readiness Matrix & Audit History

For comprehensive audit logs, checklist evaluations, and security registers:
- [`docs/audit/reel-checklist-assessment.md`](docs/audit/reel-checklist-assessment.md) — 10-point technical web quality audit.
- [`docs/audit/defect-register.md`](docs/audit/defect-register.md) — Issue registry & verified resolutions.
- [`docs/readiness-matrix.md`](docs/readiness-matrix.md) — Enterprise readiness matrix across all modules.

---

## 🏗️ End-to-End System Architecture

The following diagrams describe the application workflow from user entry to production delivery. External data and demonstration-only modules are separated intentionally.

### 1. Application & Data Flow

```mermaid
flowchart TD
    A[Farmer / FPO / Agribusiness / Advisor] --> B[Browser or Mobile Web]
    B --> C[React + TypeScript / Vite Application]
    C --> D[React Router and App Layout]
    D --> E[Language and Localization Providers]
    E --> F{User action}

    F --> G[Public Agricultural Tools]
    F --> H[Authentication / Account]
    F --> I[Experimental Modules]

    G --> J[Market Prices]
    G --> K[Weather Insights]
    G --> L[Crop Diagnosis]
    G --> M[Government Schemes and Service Directories]

    J --> N[APMC / AGMARKNET via data.gov.in]
    K --> O[Open-Meteo Weather API]
    L --> P[Assessment and Advisory Logic]

    H --> Q[Firebase Authentication]
    Q --> R{Authorized session?}
    R -->|Yes| S[Protected Dashboard / Profile]
    R -->|No| T[Login / Verification Workflow]
    T --> Q

    S --> U[Farm and Crop Record Services]
    U --> V[(Firebase Firestore)]
    S --> W[Assessment History / Account Settings]
    W --> V

    I --> X[Price Forecast / Crop Health / Drones / Irrigation / Traceability]
    X --> Y[Explicit Sample / Simulation / Pilot Status]

    N --> Z[Validate, normalize and display source / timestamp]
    O --> Z
    P --> Z
    V --> AA[Owner-Scoped Data Views]
    Z --> AB[UI Results, Limitations and Error States]
    Y --> AB
    AA --> AB
    AB --> B
```

**Data trust boundary:** External market and weather data are subject to availability, geographic coverage, provider timestamps, and fallback behavior. Experimental outputs are not equivalent to verified field measurements. Protected records must remain subject to Firebase Authentication and deployed Firestore security rules.

### 2. Development-to-Deployment Lifecycle

```mermaid
flowchart TD
    A[Requirements and Agricultural Use Cases] --> B[Design Tokens / Accessibility / Localization]
    B --> C[React Components and Feature Implementation]
    C --> D[Firebase Rules and Service Integrations]
    D --> E[Local Development: npm run dev]
    E --> F[Static Analysis: npm run lint]
    F --> G[Automated Tests: npm test]
    G --> H[TypeScript Check and Vite Build: npm run build]
    H --> I{All quality gates pass?}
    I -->|No| J[Repair Defects and Re-run Checks]
    J --> C
    I -->|Yes| K[Git Commit and GitHub Main Branch]
    K --> L[Vercel Build and Hosting]
    L --> M[Post-Deployment Verification]
    M --> N{Authentication, Data, Localization, Mobile and Accessibility OK?}
    N -->|No| J
    N -->|Yes| O[Production Release / Monitoring / Incident Response]
    O --> P[Feedback and Improvement Backlog]
    P --> A
```

### 3. Principal Source Files

| Layer | Main Implementation | Responsibility |
| :--- | :--- | :--- |
| Application shell | `src/App.tsx` | React Router, page composition and access boundaries |
| UI system | `src/index.css`, `src/components/ui/` | Design tokens, reusable primitives and focus styling |
| Navigation | `src/components/navigation/AppSidebar.tsx` | Sidebar, experimental feature grouping and mobile tabs |
| Localization | `src/contexts/LanguageContext.tsx`, `src/lib/localeConfig.ts`, `src/lib/formatters.ts` | Translations, locale/region choices and number/date formatting |
| Authentication | `src/contexts/AuthContext.tsx`, `src/components/ProtectedRoute.tsx` | Session handling and guarded views |
| Agricultural records | `src/lib/farmService.ts`, `firestore.rules` | Farm records and database access controls |
| Weather | `src/lib/weatherService.ts` | Open-Meteo requests and derived agricultural alerts |
| Testing | `src/test/` | Automated component, feature and service checks |
| Delivery | `vite.config.ts`, `vercel.json` | Build configuration and SPA hosting rules |

**Verification note:** This is an implementation-oriented architecture diagram, not proof that every external service or production control is operational. Test counts, provider refresh frequencies, model claims, and accessibility conformance must be verified against the running build before being treated as certification.
