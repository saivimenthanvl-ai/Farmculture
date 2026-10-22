# Platform Operator Facts & Corporate Disclosures — Farmculture AI

**Document Version:** 1.0  
**Date:** 2026-10-22  
**Compliance Reviewer:** Privacy Engineering Lead & DevSecOps Lead  
**Publication Status:** DRAFT — LEGAL REVIEW REQUIRED  

---

## 1. Operating Identity and Organization
- **Operator Name:** Farmculture AI Open-Source Initiative
- **Legal Form:** Independent software application / Open agricultural intelligence platform
- **Country of Origin:** India
- **Government Affiliation:** NONE. Farmculture AI is **not** an agency of the Indian Council of Agricultural Research (ICAR), the Ministry of Agriculture & Farmers Welfare, or any public department.
- **Corporate Registration Status:** [OWNER CONFIRMATION REQUIRED — Pre-incorporation open software project]
- **Registered Address:** [OWNER CONFIRMATION REQUIRED — To be supplied upon corporate registration]
- **Operational Centers:** Bangalore & New Delhi, India

---

## 2. Platform Nature and Commercial Scope
- **Commercial vs. Non-Commercial:** Currently non-commercial open access. No subscription fees, paywalls, or premium tiers are billed to users.
- **Advertising / Analytics:** No third-party behavioral ad trackers or advertising networks (e.g. Google AdSense, Meta Pixel) are embedded in client bundles.
- **E-Commerce & Payments:** No payment gateway (Stripe, Razorpay, PayPal) is integrated in production client code. Produce Direct (`RestaurantConnect.tsx`) is a peer-to-peer contact directory.
- **Age Restriction:** Platform services are directed at adult agricultural producers and farmers aged 18 and older. Registration of minors is not intended.

---

## 3. Contact and Governance Information
- **Support & Privacy Email:** `support@farmculture.ai`
- **Data Protection Officer (DPO):** [OWNER CONFIRMATION REQUIRED — Under Indian DPDP Act 2023 / EU GDPR, formal appointment to be confirmed upon corporate scaling]
- **Grievance Officer (India):** [OWNER CONFIRMATION REQUIRED — Formal statutory designation per IT Rules 2021]
- **Agronomic Helpline Disclosure:** 1800-180-1551 is the Government of India Kisan Call Centre, listed purely as a public agricultural service reference and is not operated by Farmculture AI.

---

## 4. Technical Data Processing Boundaries
- **Authentication:** Firebase Authentication (Email/Password & Google OAuth).
- **User Document Storage:** Cloud Firestore (`users/{uid}`), protected by owner-restricted rules.
- **Image Storage:** Firebase Storage (`crop-assessments/{uid}/**`), strictly partitioned by authenticated UID.
- **External Meteorological Data:** Open-Meteo public REST API. Requests transmit coarse latitude/longitude without transmitting user email, name, or UID.
- **Commodity Price Benchmarks:** Agmarknet (India), FranceAgriMer (France), BLE (Germany), MAPA (Spain), MRiRW (Poland), Defra (UK), USDA AMS (US), Sydney Markets (Australia).
