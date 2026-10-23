# Legal Retention Exceptions and Data Disclosures

## 1. Regulatory Context
Under GDPR Article 17(3), the Indian Digital Personal Data Protection Act 2023 Section 8(7), and international commercial law, the right to erasure ("right to be forgotten") is subject to specific lawful exceptions where data retention is strictly necessary for legal compliance, fraud prevention, or resolving active legal claims.

---

## 2. Documented Retention Categories

| Category | Associated Entity | Lawful Basis | Permitted Retention Period | Safeguards Applied |
|:---|:---|:---|:---|:---|
| **Support Inquiries & Abuse Records** | `/support_requests` | Legitimate interests; legal defense against fraud or malicious conduct. | Retained up to 180 days in immutable audit state; personal email and names de-identified. | Read/write access blocked to general users (`allow update, delete: if false`). |
| **Encrypted Database Backups** | Google Cloud / Firestore Backups | Technical disaster recovery and business continuity. | Encrypted disaster-recovery snapshots cycle out automatically within 30 to 60 days. | Backups are immutable and inaccessible for day-to-day operations. Not restored except in total data loss event. |
| **Community Aggregate Statistics** | `/reviews` summary metrics | Statistical integrity of platform benchmarks. | Star ratings may be retained in anonymous aggregate totals; all reviewer identifiers, usernames, and profile linkages deleted. | Complete dissociation from deleted user UID. |

---

## 3. Truthful Transparency Disclosures
The Farmculture AI Privacy Policy explicitly informs users:
1. Immediate deletion applies to active operational databases (user profile, farms, crops, foliar diagnostics, and storage files).
2. Data stored in encrypted snapshot backups cannot be surgically expunged immediately and will age out according to the automated 30–60 day backup rotation schedule.
3. If an unresolved commercial dispute or technical fraud investigation exists, relevant support records are preserved under restrictive legal holds.
