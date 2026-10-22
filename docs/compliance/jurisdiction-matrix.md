# Multi-Jurisdiction Data Protection & Legal Requirements Matrix — Farmculture AI

**Document Version:** 1.0  
**Effective Date:** 2026-10-22  
**Compliance Lead:** Privacy Engineering Lead & DevSecOps Lead  
**Publication Status:** DRAFT — LEGAL REVIEW REQUIRED  

---

## 1. Statutory Scope & Methodology
Farmculture AI evaluates compliance obligations based on actual operational architecture:
- Indian operations and users (Primary focus: DPDP Act 2023, IT Act 2000, IT Rules 2021).
- European Union users (GDPR Regulation (EU) 2016/679).
- United Kingdom users (UK GDPR, Data Protection Act 2018).
- United States users (FTC Act Section 5, COPPA, California CCPA/CPRA).
- Australia users (Privacy Act 1988, Australian Privacy Principles).

Status classifications:
- `APPLICABLE — VERIFIED`: Obligation applies and technical/operational controls are implemented and verified.
- `APPLICABLE — NOT IMPLEMENTED`: Obligation applies but mechanism is absent.
- `POTENTIALLY APPLICABLE`: Applicability depends on pending corporate thresholds or legal entity incorporation.
- `NOT APPLICABLE — WITH REASON`: Threshold or activity does not trigger the statutory rule.
- `LEGAL REVIEW REQUIRED`: Requires legal counsel evaluation.

---

## 2. Jurisdiction Requirements Evaluation

### 2.1. India: Digital Personal Data Protection Act, 2023 (DPDPA) & IT Rules
| Requirement | Statutory Basis | Operational Status | Technical Implementation & Evidence |
| :--- | :--- | :--- | :--- |
| **Notice on Collection** | Section 5, DPDPA | `APPLICABLE — VERIFIED` | Clear notice at registration and `/privacy-policy` detailing data categories and purpose of processing. |
| **Consent & Purpose Limitation** | Section 6, DPDPA | `APPLICABLE — VERIFIED` | Data collected solely for agricultural decision support; no secondary advertising monetization. |
| **Data Principal Right to Access** | Section 11, DPDPA | `APPLICABLE — VERIFIED` | Authenticated users can view their profile and historical diagnosis logs in UI; `/contact` intake for comprehensive export. |
| **Data Principal Right to Correction & Erasure** | Section 12, DPDPA | `APPLICABLE — VERIFIED` | Direct profile update in UI; account deletion request category in `/contact` writing to Firestore `support_requests`. |
| **Grievance Redressal Mechanism** | Section 13, DPDPA | `POTENTIALLY APPLICABLE` | Support queue active at `support@farmculture.ai` and `/contact`; formal statutory Grievance Officer name requires corporate owner confirmation. |
| **Children's Data Restrictions** | Section 9, DPDPA | `APPLICABLE — VERIFIED` | Platform Terms restrict registration to adults 18+; no behavioral tracking of minors. |
| **Significant Data Fiduciary (SDF) Obligations** | Section 10, DPDPA | `NOT APPLICABLE — WITH REASON` | Farmculture AI does not process high-volume critical data or pose systemic national security risks. |

---

### 2.2. European Union & United Kingdom: GDPR / UK GDPR
| Requirement | Statutory Basis | Operational Status | Technical Implementation & Evidence |
| :--- | :--- | :--- | :--- |
| **Lawful Basis for Processing** | Article 6(1)(b) & (f) | `APPLICABLE — VERIFIED` | Contractual necessity for user accounts and legitimate interests for decision-support tools. |
| **Transparency (Articles 13 & 14)** | Articles 13, 14 GDPR | `APPLICABLE — VERIFIED` | `/privacy-policy` details processing purposes, storage durations, and third-party processors (Firebase, Open-Meteo). |
| **Data Subject Rights (Access, Rectification, Erasure)** | Articles 15–17 GDPR | `APPLICABLE — VERIFIED` | Implemented in account settings and verified Firestore support queue (`support_requests`). |
| **Security of Processing** | Article 32 GDPR | `APPLICABLE — VERIFIED` | HTTPS TLS 1.3 in transit; AES-256 at rest; owner-partitioned Firestore & Storage security rules. |
| **International Data Transfers** | Articles 44–49 GDPR | `APPLICABLE — VERIFIED` | Firebase Standard Contractual Clauses (SCCs); Open-Meteo processed within the EU (Germany). |
| **EU/UK Representative & DPO** | Articles 27 & 37 GDPR | `POTENTIALLY APPLICABLE` | [OWNER CONFIRMATION REQUIRED — To be appointed upon formal commercial EU establishment]. |
| **Cookie Consent (ePrivacy)** | ePrivacy Directive | `APPLICABLE — VERIFIED` | No non-essential tracking cookies or advertising pixels embedded. Essential session tokens only. |

---

### 2.3. United States: FTC Act, COPPA & State Laws (CCPA/CPRA)
| Requirement | Statutory Basis | Operational Status | Technical Implementation & Evidence |
| :--- | :--- | :--- | :--- |
| **Truth in Advertising & Claims** | FTC Act Section 5 | `APPLICABLE — VERIFIED` | Elimination of unverified claims (e.g. false blockchain guarantees, 100% diagnostic claims, simulated government affiliations). Clear disclaimers on AI heuristics and APMC prices. |
| **Children's Online Privacy (COPPA)** | 15 U.S.C. 6501 | `APPLICABLE — VERIFIED` | Service directed at agricultural adults (18+); no collection of personal information from children under 13. |
| **CCPA/CPRA Consumer Rights** | Cal. Civ. Code § 1798.100 | `NOT APPLICABLE — WITH REASON` | Farmculture AI does not exceed CCPA revenue thresholds ($25M+) or process data of 100,000+ CA consumers. However, rights to know, delete, and opt-out are voluntarily respected. |

---

### 2.4. Australia: Privacy Act 1988 & Australian Privacy Principles (APPs)
| Requirement | Statutory Basis | Operational Status | Technical Implementation & Evidence |
| :--- | :--- | :--- | :--- |
| **Open and Transparent Management (APP 1)** | Privacy Act 1988, APP 1 | `APPLICABLE — VERIFIED` | Publicly accessible, clearly written privacy policy detailing data practices. |
| **Collection of Solicited Information (APP 3 & 5)** | APPs 3 & 5 | `APPLICABLE — VERIFIED` | Collection limited strictly to user account details and coarse coordinates for weather queries. |
| **Cross-Border Disclosure (APP 8)** | APP 8 | `APPLICABLE — VERIFIED` | Disclosed in privacy policy that Firebase servers are located in secure Google Cloud regions. |
| **Quality & Security of Personal Info (APP 10 & 11)** | APPs 10 & 11 | `APPLICABLE — VERIFIED` | Access controls, granular Firestore rules, and authenticated user integrity. |
