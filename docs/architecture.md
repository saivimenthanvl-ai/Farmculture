# Farmculture AI — Architecture Specification

## 1. System Overview

Farmculture AI is a client-side Single Page Application (SPA) designed with React, TypeScript, and Vite, deployed on Vercel with Cloud Firestore and Firebase Authentication backends.

```
                         [ Vercel Edge CDN ]
                                 │
                   SPA Routes / Rewrites (vercel.json)
                                 │
                     ┌───────────┴───────────┐
                     ▼                       ▼
            Public Feature Routes      Protected Routes
           - /crop-diagnosis          - /dashboard
           - /market-prices
           - /weather
           - /schemes
           - /assistant
           - /restaurants
           - /storage
           - /predictor
           - /drones
           - /irrigation
           - /traceability
                     │                       │
                     └───────────┬───────────┘
                                 │
                     ┌───────────┴───────────┐
                     ▼                       ▼
          [ External Live Providers ]   [ Google Firebase ]
          - Open-Meteo Weather API      - Firebase Authentication
          - Agmarknet / APMC Mandis     - Cloud Firestore (users/{uid})
```

## 2. Security Architecture (FC-08)

1. **Authentication:**
   - Handled via `firebase/auth` (`signInWithEmailAndPassword`, `createUserWithEmailAndPassword`, `signInWithPopup` with Google).
   - Authoritative identity is strictly the Firebase `User.uid`.
2. **Database & Authorization:**
   - Single consolidated config module: [firebase.ts](file:///c:/Users/saivi/Downloads/Farmculture/src/lib/firebase.ts).
   - No friendly name document indexing. User records are stored strictly at `/users/{userId}` where `{userId}` must match `request.auth.uid`.
   - Security enforced server-side via [firestore.rules](file:///c:/Users/saivi/Downloads/Farmculture/firestore.rules).
3. **Environment Security:**
   - `.env` removed from git tracking cache; `.env.example` provided.

## 3. Data Integrity & Provenance Policy

1. **Crop Diagnosis:**
   - Validates input format, size, and foliage excess index.
   - Abstains when non-plant or out-of-distribution inputs are provided.
   - Clearly marks heuristic assessments as preliminary unverified guidance.
2. **Market Prices:**
   - Normalized schema with source provenance, APMC Mandi locations, observation dates, and calculated freshness tags (`live`, `recent`, `historical`).
3. **Weather Insights:**
   - Queries real live meteorological telemetry from Open-Meteo API.
   - Computes genuine agronomic thresholds (rain delay warnings, wind spray drift warnings, fungal humidity alerts).
   - Handles network failures with explicit retry states rather than fake temperatures.
4. **Demonstration & Simulation Tools:**
   - Simulation badges explicitly disclose the econometric / sensor projection nature of `MarketPredictor`, `DroneMonitoring`, `SmartIrrigation`, and `BlockchainTraceability`.
