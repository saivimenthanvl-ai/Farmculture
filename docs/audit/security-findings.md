# Security Findings & Threat Model — Farmculture AI

**Date:** 2026-10-22  
**Auditor:** Principal Firebase Security Engineer & DevSecOps Lead  
**Scope:** Client code, Authentication, Firestore & Storage rules, Secrets management  

---

## 1. Threat Model & Assets

### Critical Assets:
1. **Farmer Authentication & Identity:** UID, Email, Display name.
2. **Private Farm & Assessment Data:** Uploaded plant leaf images, location coordinates, historical crop health diagnoses.
3. **User-Generated Content:** Reviews and ratings (prevent impersonation, spam, or cross-user deletion).
4. **Third-Party API Credentials:** Firebase Web API keys, Weather API keys (prevent unauthorized quota consumption).

### Threat Vectors & Mitigations:

| Threat Vector | Potential Impact | Implemented Mitigation | Verification |
|---|---|---|---|
| **Client-side UID Spoofing** | Attacker accesses or modifies another farmer's profile or assessments. | Firestore Security Rules enforce `request.auth.uid == userId` on all document and subcollection reads/writes. | Checked in `firestoreRules.test.ts`. |
| **Cross-User Image Access / Overwrite** | Attacker modifies or views other users' uploaded crop diagnosis photos. | Storage Security Rules enforce `request.auth.uid == userId` for paths `/crop-assessments/{userId}/{allPaths=**}`. | Configured in `storage.rules`. |
| **Open Redirect Vulnerability** | Attacker crafts a malicious login link (`?returnTo=https://attacker.com`). | `getSafeReturnUrl()` in `LoginPage.tsx` strictly rejects protocol-relative URLs (`//`) and absolute URLs, allowing only internal relative paths (`/`). | Tested in `loginRedirect.test.ts`. |
| **Review Impersonation** | Attacker writes a fake review under another user's name or UID. | Rules reject any review write where `request.resource.data.userId != request.auth.uid`. | Tested in `reviewSystem.test.ts`. |
| **Privileged Credential Leakage** | Exposing Firebase Admin SDK private keys in frontend bundles. | Frontend bundle exclusively uses client-side public configuration (`import.meta.env.VITE_FB_*`); zero private service account keys are bundled or tracked. | Verified via static grep & build analysis. |
| **Denial of Service via Huge Uploads** | Malicious actor uploads a multi-gigabyte file causing memory crashes. | `validateCropImage()` enforces a 5MB maximum file size and strictly checks MIME types (`image/jpeg`, `image/png`, `image/webp`). | Tested in `cropDiagnosis.test.ts`. |

---

## 2. Security Rules Audit

### Firestore Rules (`firestore.rules`):
- `rules_version = '2'`: Confirmed.
- **`match /users/{userId}`**: Owner-restricted read, create, update, delete (`request.auth.uid == userId`).
- **`match /users/{userId}/assessments/{assessmentId}`**: Subcollection for crop diagnostic history is owner-restricted.
- **`match /reviews/{reviewId}`**: Public read for approved reviews; author-only update/delete; strict schema validation on creation.
- **Default Deny**: `match /{document=**} { allow read, write: if false; }` prevents exposure of unlisted collections.

### Storage Rules (`storage.rules`):
- Dedicated rules file protecting bucket paths:
  ```
  rules_version = '2';
  service firebase.storage {
    match /b/{bucket}/o {
      match /crop-assessments/{userId}/{allPaths=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      match /{allPaths=**} {
        allow read, write: if false;
      }
    }
  }
  ```
