# Farmculture AI — Enterprise Agronomy Intelligence Platform

Farmculture AI is a production-engineered agronomy software platform designed for Indian smallholder farmers, Farmer Producer Organizations (FPOs), agribusinesses, and agricultural extension advisors. It delivers verified APMC mandi arrival intelligence, hyper-local meteorological telemetry, and foliar diagnostic assistance.

---

## End-to-End System Architecture

The diagrams below describe the application structure and user journey implemented in this repository. They separate external data sources and demonstration features rather than presenting simulations as live integrations.

### 1. Platform architecture: entry point to output

\`\`\`mermaid
flowchart TD
    A[Farmer / FPO / Agricultural Advisor] --> B[Browser or Mobile Web]
    B --> C[Vercel Hosted React + TypeScript SPA]
    C --> D[React Router]
    D --> E[Application Shell: Header, Sidebar, Footer]
    E --> F[Language and Region Preferences]
    F --> G{Selected Feature}
    G --> H[Public Agricultural Tools]
    G --> I[Account and Farm Workspace]
    G --> J[Experimental Demonstrations]
    H --> K[Market Prices / Weather / Crop Diagnosis / Schemes]
    I --> L{Firebase Authentication}
    L -->|Verified signed-in user| M[Protected Dashboard and Profile]
    L -->|Not authenticated| N[Sign In / Verification Flow]
    M --> O[Farm Records / Crop Records / Assessments]
    O --> P[(Cloud Firestore)]
    K --> Q[Domain Services and External Sources]
    Q --> R[Market Data Sources / Open-Meteo]
    K --> S[Crop Image Assessment]
    S --> T[Result with uncertainty and advisory limits]
    J --> U[Demo-labelled Predictor / Drone / Remote Sensing / Irrigation / Traceability]
    P --> V[User-facing records and history]
    R --> W[Source-labelled market and weather results]
    U --> X[Clearly labelled sample outputs]
\`\`\`

### 2. User workflow: from visiting the site to using a service

\`\`\`mermaid
flowchart TD
    Start([Open Farmculture AI]) --> Home[Landing Page / Choose Language and Region]
    Home --> Choice{Choose workflow}
    Choice -->|Browse tools| Public[Open Public Feature]
    Choice -->|Manage farm| Auth{Authenticated and authorized?}
    Auth -->|No| Login[Sign in / Register]
    Login --> Verify[Complete required email verification]
    Verify --> Auth
    Auth -->|Yes| Dashboard[Farm Dashboard]
    Dashboard --> CRUD[Create / View / Update Farm and Crop Records]
    CRUD --> Rules[Firestore Rules / Ownership Checks]
    Rules --> Database[(Firestore User Data)]
    Database --> Dashboard
    Public --> Domain{Feature type}
    Domain -->|Market| Market[Request market quotes]
    Domain -->|Weather| Weather[Request weather observations]
    Domain -->|Crop diagnosis| Diagnosis[Validate and assess crop input]
    Domain -->|Experimental| Demo[Load clearly-labelled demonstration]
    Market --> Provenance[Display source / location / currency / freshness]
    Weather --> Provenance
    Diagnosis --> Caution[Display bounded result, uncertainty, and next steps]
    Demo --> Disclosure[Display demonstration and limitations]
    Provenance --> End([User reviews the result])
    Caution --> End
    Disclosure --> End
\`\`\`

### 3. Authentication and user-data boundary

\`\`\`mermaid
sequenceDiagram
    actor User
    participant UI as React Application
    participant Auth as Firebase Authentication
    participant Guard as ProtectedRoute
    participant DB as Cloud Firestore
    User->>UI: Open dashboard
    UI->>Auth: Observe sign-in state
    Auth-->>UI: Current user or signed-out state
    UI->>Guard: Evaluate protected route
    alt Signed out or verification incomplete
        Guard-->>User: Redirect to login / verification
    else Signed in and permitted
        Guard-->>UI: Render dashboard
        UI->>DB: Read /users/{uid}/farms and crop records
        Note over DB: Security rules must enforce ownership
        DB-->>UI: Permitted user records
        UI-->>User: Render farm workspace
    end
\`\`\`

### 4. Information provenance and trust boundaries

| Feature | Input or integration | Output | Disclosure / boundary |
| --- | --- | --- | --- |
| Market prices | Market data service, including government and regional reference sources | Commodity quotes and formatted currencies | Check source, unit, market and observation timestamp before relying on a quote |
| Weather | Open-Meteo weather integration | Regional forecast and weather information | Forecasts are estimates; cached or unavailable observations must not appear live |
| Crop diagnosis | User-supplied crop images and assessment service | Bounded crop-health guidance | Do not present uncertain classifications as confirmed diagnosis |
| Farmer dashboard | Authenticated records | Farm and crop history | Firebase Authentication plus server-enforced Firestore security rules |
| Experimental modules | Sample data and simulation logic | Predictor, drone, remote-sensing and related demonstrations | Not equivalent to live hardware, verified satellite data or validated forecasting |

### 5. Localization and presentation pipeline

\`\`\`mermaid
flowchart LR
    A[User locale and region selection] --> B[localeConfig.ts]
    B --> C[LanguageContext dictionary]
    B --> D[LocalizationContext]
    C --> E[Translated UI labels]
    D --> F[Date / Number / Currency formatting]
    E --> G[Accessible React UI]
    F --> G
    G --> H[Responsive light / dark presentation]
\`\`\`

The repository defines ten base translation languages in \`src/contexts/LanguageContext.tsx\` and 16 locale variants in \`src/lib/localeConfig.ts\`. Region, interface language and currency are separate settings. Arabic is an RTL language. To add a language, update the supported locale types and language dictionary, provide translated user-facing strings, then run localization tests. Do not assume adding a locale code alone translates every page.

### 6. Design-system implementation

| Layer | Implementation |
| --- | --- |
| Colors | Forest green \`#0F2E24\`, lime \`#9BE564\`, warm paper \`#F6F4EE\`, semantic status colors |
| Typography | Bricolage Grotesque headings; Plus Jakarta Sans and script-specific fallbacks for body text |
| UI primitives | Custom Button, Badge, FeatureCard and shared application/navigation components |
| Spacing and surfaces | Consistent Tailwind spacing utilities, neutral borders and restrained elevation |
| Accessibility | Semantic landmarks, keyboard focus styles, responsive navigation and localized content |

Primary design tokens are in [\`src/index.css\`](src/index.css); see [\`docs/design-system.md\`](docs/design-system.md) for the reference guide. Actual contrast, motion preferences and multilingual layouts require browser-level verification.

### 7. Development-to-release workflow

\`\`\`mermaid
flowchart TD
    A[Clone Repository] --> B[Install Node.js and Dependencies]
    B --> C[Configure Local Environment from .env.example]
    C --> D[Run Vite Development Server]
    D --> E[Implement or Review Changes]
    E --> F[Run Lint]
    F --> G[Run Automated Vitest Suite]
    G --> H[Run TypeScript and Production Build]
    H --> I{All checks pass?}
    I -->|No| E
    I -->|Yes| J[Review Firebase Security Rules and Data Access]
    J --> K[Verify Routes, Mobile Layout, Localization and Accessibility]
    K --> L[Commit and Review Pull Request]
    L --> M[Merge through approved workflow]
    M --> N[Deploy Hosting and Required Firebase Configuration]
    N --> O[Post-deployment Smoke Tests and Operational Monitoring]
    O --> P([Production Release])
\`\`\`

\`\`\`bash
npm install
npm run dev
npm run lint
npm test
npm run build
npm run i18n:check
\`\`\`

These commands are available in [\`package.json\`](package.json). The diagrams specify the expected release process; they do **not** certify that a particular deployment passed every gate.

### 8. Repository structure and engineering references

\`\`\`text
src/
  App.tsx                 # React Router and application layout
  app/                    # Login and dashboard views
  components/             # Agricultural features and reusable UI
  contexts/               # Authentication, language and localization
  lib/                    # Service and integration logic
  pages/                  # Informational and account pages
  test/                   # Automated test suites
docs/
  architecture/           # Detailed system and data-flow notes
  audit/                  # Findings, issue records and checklists
\`\`\`

- [Current architecture](docs/architecture/current-system.md)
- [Data flow](docs/architecture/data-flow.md)
- [Design system](docs/design-system.md)
- [Security findings](docs/audit/security-findings.md)
- [Readiness matrix](docs/readiness-matrix.md)
- [Testing guidance](docs/testing.md)
- [Deployment checklist](docs/deployment-checklist.md)

**Release status:** Repository documentation is a reference, not independent evidence of production readiness. Verify current CI results, deployed Firebase rules, email verification behavior, external data freshness and end-to-end user workflows before making a production-readiness claim.
