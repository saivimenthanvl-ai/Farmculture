# Compliance Open Questions & Owner Confirmations — Farmculture AI

**Document Version:** 1.0  
**Effective Date:** 2026-10-22  
**Owner Action Required:** Mandatory review before commercial public release  

---

## 1. Questions Requiring Platform Owner Action

| Ref # | Category | Question for Platform Owner | Impact if Unresolved | Default Compliance Posture Taken |
| :--- | :--- | :--- | :--- | :--- |
| **OQ-01** | Corporate Structure | Is Farmculture AI operating as a registered Private Limited Company, LLP, or an unincorporated open-source initiative? | Determines statutory entity name, registered office address in `/privacy-policy` and `/contact`. | Listed as "Farmculture AI Open-Source Initiative" with note: `[OWNER CONFIRMATION REQUIRED — Pre-incorporation]`. |
| **OQ-02** | Registered Address | What is the official statutory postal address for legal notices and service of process? | Required under Indian Companies Act / IT Rules and EU GDPR Art. 13. | Bangalore & New Delhi listed as development centers; statutory postal address marked `[OWNER CONFIRMATION REQUIRED]`. |
| **OQ-03** | Data Protection Officer (DPO) | Will an official DPO / Grievance Officer be designated with a dedicated email and physical notice channel? | Required under Indian IT Rules 2021 and DPDP Act 2023 for formal grievance escalation. | Support email `support@farmculture.ai` designated as default intake point. |
| **OQ-04** | Commercial Monitization & Billing | Are there plans to introduce paid subscription tiers, transaction fees on Produce Direct, or payment processing? | Would trigger PCI-DSS compliance, GST/sales tax reporting, and consumer contract terms. | Currently strictly non-commercial open access. No payment gateways integrated. |
| **OQ-05** | Cloud Storage Region | Has the production Firebase project been provisioned in `asia-south1` (Mumbai) or multi-region `us-central1`? | Relevant for Indian cross-border data transfer rules under DPDP Act 2023. | Disclosed as Google Cloud multi-region infrastructure with standard contractual safeguards. |
