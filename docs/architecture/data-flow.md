# Data Flow & Security Model — Farmculture AI

**Date:** 2026-10-22  
**Auditor:** Principal Full-Stack Architect, Security Engineer  
**Status:** Baseline Audited  

---

## 1. Authentication & Profile Retrieval Data Flow

```mermaid
sequenceDiagram
  autonumber
  actor Farmer as Authenticated Farmer
  participant Client as React Client (AuthContext / LoginPage)
  participant Auth as Firebase Auth Service
  participant Firestore as Cloud Firestore (/users/{uid})

  Farmer->>Client: Enters credentials or clicks Google OAuth
  Client->>Auth: signInWithEmailAndPassword / signInWithPopup
  Auth-->>Client: Returns Firebase User credential (uid, email, displayName)
  Client->>Firestore: setDoc(/users/{uid}, {uid, displayName, email, friendlyName}, merge: true)
  Note over Client,Firestore: Protected by firestore.rules: request.auth.uid == userId
  Firestore-->>Client: Acknowledged write
  Client->>Firestore: getDoc(/users/{uid})
  Firestore-->>Client: Returns authoritative farmer profile
  Client-->>Farmer: Updates AuthContext state & redirects safely
```

### Security Invariants (FC-08)
- No user profile can be retrieved or written using arbitrary query parameters or unverified client strings.
- Profile path is strictly `/users/{userId}` where `request.auth.uid == userId`.
- Cross-user reads and writes are rejected with `PERMISSION_DENIED`.

---

## 2. Core Farmer Crop Diagnosis & Assessment Flow

```mermaid
sequenceDiagram
  autonumber
  actor Farmer as Authenticated Farmer
  participant UI as CropDiagnosis Component
  participant Val as Image Validation Engine
  participant Engine as Leaf Heuristic & Quality Classifier
  participant Storage as Firebase Storage (/crop-assessments/{uid}/...)
  participant Firestore as Cloud Firestore (/users/{uid}/assessments/{id})

  Farmer->>UI: Selects leaf photo (File object)
  UI->>Val: validateCropImage(file)
  alt File Invalid (>5MB, non-image MIME, empty)
    Val-->>UI: Rejects with specific validation error
    UI-->>Farmer: Displays error without executing inference
  else File Valid
    Val-->>UI: Passes validation
    Farmer->>UI: Clicks "Analyze Plant Specimen"
    UI->>Engine: analyzeCropLeaf(imageSource)
    Note over Engine: Calculates green chromaticity excess (2G - R - B)
    alt Non-plant or insufficient vegetative area (<12%)
      Engine-->>UI: Returns status: 'abstain' with clear explanation
      UI-->>Farmer: Displays honest abstention card & guidelines
    else Valid Leaf Specimen
      Engine-->>UI: Returns preliminary heuristic diagnosis & provenance
      UI->>Storage: uploadBytes(/crop-assessments/{uid}/{assessmentId}.jpg)
      Storage-->>UI: Returns downloadURL
      UI->>Firestore: addDoc(/users/{uid}/assessments, {assessmentId, crop, condition, confidence, ...})
      Firestore-->>UI: Persisted assessment record
      UI-->>Farmer: Displays diagnosis, treatment, prevention, and saves to History
    end
  end
```

---

## 3. Market Commodity Pricing & FX Data Flow

```mermaid
graph LR
  A[Multi-Country Market Catalog<br/>IN, FR, DE, ES, PL, GB, US, AU] --> B[marketPriceService.ts]
  B --> C[Regional Commodity Filter<br/>Country & City Match]
  C --> D[Source Observation Record<br/>Original Currency & Unit]
  D --> E[FX Engine: currencyService.ts<br/>ECB/RBI Provenance Rates]
  E --> F[MarketPrices UI Component]
  F --> G[Dual Price Display:<br/>1. Original Wholesale Benchmark<br/>2. Converted Local Preference]
```

### Truthfulness Invariant
- Indian APMC mandi prices are never renamed or converted to masquerade as European wholesale markets.
- All benchmark prices disclose country, market name, commodity, observation date, and original unit.

---

## 4. Community Reviews Flow & Moderation

```mermaid
sequenceDiagram
  autonumber
  actor Farmer as Authenticated Member
  participant UI as Review Form / ReviewCarousel
  participant Service as reviewService.ts
  participant Firestore as Cloud Firestore (/reviews/{reviewId})

  Farmer->>UI: Submits rating (1-5) and reviewText (>=5 chars)
  UI->>Service: submitUserReview(userId, displayName, submission)
  Note over Service: Validates userId == auth.uid & input bounds
  Service->>Firestore: addDoc(/reviews, {userId, displayName, rating, reviewText, ...})
  Firestore-->>Service: docRef.id
  Service-->>UI: Success
  UI->>Service: getApprovedReviews()
  Service->>Firestore: query(reviews, where moderationStatus == 'approved')
  Firestore-->>Service: Actual approved records
  Service->>Service: computeReviewStats(reviews)
  Note over Service: Calculates genuine mathematical average; no hardcoded 4.9
  Service-->>UI: Renders verified community feedback carousel
```
