# Personal Data Inventory & Systems Processing Register — Farmculture AI

**Document Version:** 1.0  
**Effective Date:** 2026-10-22  
**Status:** TECHNICAL VERIFIED — LEGAL REVIEW REQUIRED  

---

## 1. Executive Summary
This document provides an evidence-based inventory of personal data collected, stored, and processed by the Farmculture AI web application and its backend infrastructure (Firebase). Each data category is mapped to its operational purpose, processor/recipient, storage system, geographic location, retention policy, and deletion mechanism.

---

## 2. Data Elements & Processing Inventory

| Category | Specific Data Elements | Purpose | Source | Processor / Storage | Storage Location | Retention Period | Deletion Mechanism |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Account Identity** | Email address, User Display Name, Firebase Authentication UID | User authentication, session management, access control to private farm records | User Input / Google OAuth | Google Firebase Authentication & Cloud Firestore (`users/{uid}`) | Google Cloud multi-region (US/asia-south1 per Firebase setup) | Duration of account lifecycle + 30 days grace | Account deletion request via `/contact` or programmatic deletion API |
| **Crop Foliar Photos** | Uploaded leaf images, visual chromatic crops | Plant disease symptom heuristic assessment | User camera/upload | Client-side Canvas memory & Firebase Storage (`crop-assessments/{uid}/**`) | Google Cloud Storage bucket | Saved in user folder until deleted by user or account closure | User deletion from history or account wipe |
| **Image Metadata** | EXIF timestamp, dimensions (GPS stripped where detected) | Diagnostic verification & timestamping | User uploaded file headers | Stripped/Ephemeral during client-side resize & canvas read | Not persisted separately | Immediate (client memory) | Automatic upon session completion |
| **Diagnostic History** | Crop name, suspected disease, symptoms detected, confidence indicator | Historical agronomic log, treatment reminder reference | Heuristic engine output | Cloud Firestore (`users/{uid}/assessments/{id}`) | Cloud Firestore | Duration of account lifecycle | Deletable directly by user in UI or via account closure |
| **Location Telemetry** | Coarse latitude/longitude (rounded coordinates) | Querying regional weather telemetry & advisory conditions | Browser Geolocation API (user consented) | Ephemeral in browser query params to Open-Meteo REST API | Never stored in Firestore or database | Ephemeral (duration of HTTP request) | Automatic upon request termination |
| **Support Inquiries** | Subject, inquiry category, detailed message, email, UID | Technical support, bug resolution, privacy/deletion inquiries | User submission on `/contact` | Cloud Firestore (`support_requests/{id}`) | Cloud Firestore | 180 days for audit & resolution tracking | Restricted admin review & purge after resolution |
| **Reviews & Feedback** | User display name, star rating (1–5), textual review, UID | Public community testimonials | User submission on `/reviews` | Cloud Firestore (`reviews/{id}`) | Cloud Firestore | Indefinite until withdrawn by author | Author can update or delete review in UI |
| **HTTP & Device Logs** | IP address, User-Agent, request timestamps | Network security, DDoS prevention, rate limiting | Web browser HTTP headers | Hosting platform (Vercel / Firebase Hosting edge logs) | Edge server logs | 14 to 30 days standard rotating log | Automatic edge log rotation |

---

## 3. External Third-Party Processors & Service Providers

### 3.1. Google Firebase (Alphabet Inc.)
- **Services Used:** Firebase Authentication, Cloud Firestore, Firebase Storage, Firebase Hosting.
- **Data Shared:** Email, UID, display name, user-generated crop records, foliar images.
- **Security Safeguards:** HTTPS in transit, AES-256 encryption at rest, owner-restricted Firebase Security Rules enforcing `request.auth.uid == userId`.
- **DPA / Contractual Basis:** Google Cloud Data Processing and Security Terms (Model Contractual Clauses).

### 3.2. Open-Meteo GmbH
- **Services Used:** Weather forecast and agro-meteorological telemetry API (`api.open-meteo.com`).
- **Data Shared:** Coarse geographic coordinates (latitude and longitude).
- **No PII Transmitted:** Requests contain **zero** personal identifiers (no email, no UID, no device ID, no API tokens).
- **Processing Location:** Germany / European Union.

### 3.3. Public Commodity Data Providers (Read-Only Public Data)
- **Agmarknet (India):** Directorate of Marketing & Inspection, Ministry of Agriculture.
- **FranceAgriMer (France), BLE (Germany), MAPA (Spain), MRiRW (Poland), Defra (UK), USDA (US):** Public market price records.
- **Data Flow Direction:** One-way ingress. No farmer personal data or transaction records are transmitted to market boards.

---

## 4. What Farmculture AI Does NOT Do
1. **No Behavioral Ad Tracking:** No third-party ad pixels (Meta Pixel, TikTok Pixel, Google AdSense) are loaded.
2. **No Data Brokerage:** Farm records and yield data are never sold or shared with seed, chemical, or financial syndicates.
3. **No Continuous Background Geolocation:** Location is accessed only on-demand when the user clicks weather lookup.
4. **No Financial Transactions:** No credit card, bank account, or payment processing occurs on the platform.
