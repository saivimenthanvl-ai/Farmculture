# Personal Data Rights & Request Handling Procedures — Farmculture AI

**Document Version:** 1.0  
**Effective Date:** 2026-10-22  
**Target Roles:** Support Staff, Privacy Operations, Systems Administrators  

---

## 1. Overview & Principles
Farmculture AI guarantees data principals and data subjects the operational ability to exercise statutory rights under the Indian Digital Personal Data Protection Act 2023, EU/UK GDPR, and California CCPA/CPRA.

Core operating principles:
1. **Verification Before Disclosure:** No personal data or diagnostic archives will be released or wiped without verified ownership.
2. **Timely Processing:** Inquiries must be acknowledged within 48 hours and resolved within 30 calendar days.
3. **No Retaliation:** Access to non-account public features (mandi benchmarks, weather telemetry, scheme directories) is never contingent upon maintaining an account or surrendering privacy rights.

---

## 2. Supported Rights & Operational Workflows

### 2.1. Right of Access / Data Portability (Export)
- **Submission Channel:**
  - Authenticated user submits an inquiry via `/contact` selecting category **"Technical Support"** or **"Data Partnership & Research"** with subject `Data Access Request`.
  - Alternatively, email `support@farmculture.ai` from the registered email address.
- **Verification Protocol:**
  - Automated check: System verifies that the inquiry record in Firestore `/support_requests` has `userId == request.auth.uid` matching the target profile.
  - For email inquiries: A verification challenge token is sent to the registered email address.
- **Data Export Generation:**
  - User profile record from Firestore `users/{uid}`.
  - Diagnostic history records from `users/{uid}/assessments/**`.
  - Links to stored foliar leaf photographs in Firebase Storage `crop-assessments/{uid}/**`.
  - Export provided in machine-readable JSON format.

### 2.2. Right to Correction (Rectification)
- **Direct Self-Service:**
  - Users can update their display name, language preference, and regional market selection directly via user profile settings.
- **Staff-Assisted Rectification:**
  - If a user identifies erroneous transactional or audit records, they may submit a ticket via `/contact`.

### 2.3. Right to Erasure / Account Deletion
- **Submission Channel:**
  - Select **"Account Deletion Request"** in the category dropdown on `/contact`.
- **Pre-Deletion Warning:**
  - System notifies user that account deletion permanently removes access to saved diagnostic history and personalized crop logs.
- **Execution Steps:**
  1. Verify requester is the authenticated account owner.
  2. Delete user folder in Firebase Storage: `gs://[bucket]/crop-assessments/{uid}/**`.
  3. Delete user assessment subcollection: `firestore.delete('users/{uid}/assessments')`.
  4. Delete root user document: `firestore.delete('users/{uid}')`.
  5. Delete Firebase Authentication user record: `admin.auth().deleteUser(uid)`.
  6. Anonymize user UID in submitted reviews (`reviews/{id}`) or delete review upon explicit request.
  7. Confirm deletion status in ticket audit log.

### 2.4. Right to File a Grievance
- **Internal Escalation:**
  - If a user is dissatisfied with a support or rights outcome, inquiries can be escalated to `support@farmculture.ai` with the subject `Privacy Grievance Escalation`.
- **External Redressal:**
  - **India:** Data Protection Board of India (upon full operationalization of DPDP Rules 2025).
  - **EU/UK:** Respective national Data Protection Authority (e.g. CNIL in France, BfDI in Germany, AEPD in Spain, UODO in Poland, ICO in the UK).
  - **Australia:** Office of the Australian Information Commissioner (OAIC).
