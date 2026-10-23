# Account Deletion Workflow and Confirmation Protocol

## 1. User Journey and UX Flow

1. **Accessing Settings**:
   - The user navigates to `/profile` or `/settings/account` (or selects "Settings" / "My Profile" in the top navigation).
2. **Danger Zone Discovery**:
   - The user scrolls to the bottom of the page, where a visually isolated **Danger Zone** section is rendered with clear warning borders (`border-[#C8553D]/30`) and semantic warning text.
3. **Triggering Deletion**:
   - The user clicks **Delete My Account**.
   - A modal dialog opens with a detailed description of what data is permanently destroyed.
4. **Typed Confirmation**:
   - The user must enter the exact confirmation word: `DELETE`.
   - The "Confirm Permanent Deletion" button remains strictly disabled until the exact match is provided.
5. **Fresh Authentication Verification**:
   - If the user logged in recently, deletion begins immediately.
   - If the login is stale, the interface presents a re-authentication prompt:
     - For email/password users: re-enter current password.
     - For Google OAuth users: click "Reauthenticate with Google" popup.
6. **Execution & Honest Progress**:
   - A loading state with a truthful status message (*"Deleting leaf image files… Purging farm and crop records… Removing account credentials…"*) is displayed.
7. **Completion & Redirection**:
   - All client storage (`localStorage`, `sessionStorage`) is purged.
   - The user is redirected to the home page with a notification that their account and data have been permanently removed.

---

## 2. Security Safeguards

- **No Remote UID Trust**: The deletion process never takes a target `uid` from an arbitrary query parameter or untrusted input. The active, authenticated `auth.currentUser.uid` is the sole source of identity truth.
- **Cross-User Protection**: Firestore security rules restrict delete operations on `/users/{userId}/**` solely to `request.auth.uid == userId`. Even if a compromised client attempts to pass another user's ID, the rules reject the operation immediately.
- **No Password Exposure**: Passwords used for reauthentication are submitted directly to the official Firebase Authentication client SDK (`EmailAuthProvider.credential`), never transmitted to custom backend endpoints or logged.
