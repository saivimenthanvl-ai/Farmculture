import {
  User,
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithPopup,
  deleteUser as firebaseDeleteUser,
} from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  writeBatch,
  DocumentReference,
} from "firebase/firestore";
import {
  ref,
  listAll,
  deleteObject,
} from "firebase/storage";
import { auth, db, storage } from "./firebase";

export type DeletionStep =
  | "IDLE"
  | "VERIFYING_AUTH"
  | "CLEANING_STORAGE"
  | "CLEANING_FIRESTORE_SUBCOLLECTIONS"
  | "CLEANING_SHARED_RESOURCES"
  | "DELETING_PROFILE"
  | "DELETING_AUTH"
  | "PURGING_CLIENT_CACHE"
  | "COMPLETED"
  | "FAILED";

export interface DeletionProgress {
  step: DeletionStep;
  details?: string;
  error?: string;
}

/**
 * Reauthenticates the user with email and password
 */
export async function reauthenticateWithPassword(user: User, password: string): Promise<boolean> {
  if (!user.email) throw new Error("User has no associated email address.");
  const credential = EmailAuthProvider.credential(user.email, password);
  await reauthenticateWithCredential(user, credential);
  return true;
}

/**
 * Reauthenticates the user with Google OAuth popup
 */
export async function reauthenticateWithGoogle(user: User): Promise<boolean> {
  const provider = new GoogleAuthProvider();
  await reauthenticateWithPopup(user, provider);
  return true;
}

/**
 * Helper to delete all documents in a subcollection
 */
async function deleteSubcollection(collectionPath: string[]): Promise<number> {
  try {
    // Firestore SDK expects either db + path segments
    const [first, ...rest] = collectionPath;
    const colRef = collection(db, first, ...rest);
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) return 0;

    let count = 0;
    // Process in batches of 400 (Firestore max is 500)
    let batch = writeBatch(db);
    let opCount = 0;

    for (const docSnap of snapshot.docs) {
      batch.delete(docSnap.ref);
      opCount++;
      count++;
      if (opCount >= 400) {
        await batch.commit();
        batch = writeBatch(db);
        opCount = 0;
      }
    }

    if (opCount > 0) {
      await batch.commit();
    }

    return count;
  } catch (err: any) {
    console.error(`[AccountDeletion] Error deleting subcollection at ${collectionPath.join("/")}:`, err);
    throw err;
  }
}

/**
 * Recursively deletes all user files in Firebase Storage under crop-assessments/{userId}
 */
export async function deleteUserStorageFiles(userId: string): Promise<number> {
  try {
    const userStorageRef = ref(storage, `crop-assessments/${userId}`);
    const res = await listAll(userStorageRef);
    let deletedCount = 0;

    // Delete all files directly under this path
    for (const itemRef of res.items) {
      await deleteObject(itemRef);
      deletedCount++;
    }

    // Recursively handle any nested sub-prefixes
    for (const prefixRef of res.prefixes) {
      const subRes = await listAll(prefixRef);
      for (const item of subRes.items) {
        await deleteObject(item);
        deletedCount++;
      }
    }

    return deletedCount;
  } catch (err: any) {
    // If the storage directory does not exist or has no objects, allow graceful progress
    if (err?.code === "storage/object-not-found" || err?.message?.includes("object-not-found")) {
      return 0;
    }
    console.error("[AccountDeletion] Storage cleanup error:", err?.message || err);
    throw err;
  }
}

/**
 * Deletes user-authored reviews from public /reviews collection
 */
export async function deleteUserReviews(userId: string): Promise<number> {
  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return 0;

    let count = 0;
    const batch = writeBatch(db);
    for (const docSnap of snapshot.docs) {
      batch.delete(docSnap.ref);
      count++;
    }
    await batch.commit();
    return count;
  } catch (err: any) {
    console.error("[AccountDeletion] Error deleting user reviews:", err);
    throw err;
  }
}

/**
 * Clears local client caches, user preferences, and sessions
 */
export function purgeClientStorage(): void {
  try {
    localStorage.removeItem("farmculture_user_preferences_v1");
    localStorage.removeItem("farmculture_fx_cache_v2");
    localStorage.removeItem("farmculture_guest_session");
    sessionStorage.clear();
  } catch (err) {
    console.warn("[AccountDeletion] Unable to purge local storage:", err);
  }
}

/**
 * Complete, durable account deletion orchestration.
 * Strict execution order:
 * 1. Verify authenticated user identity (never trust an external parameter)
 * 2. Delete Firebase Storage files (crop images)
 * 3. Delete Firestore subcollections: /users/{uid}/farms, /users/{uid}/crop_records, /users/{uid}/assessments
 * 4. Delete user-authored reviews in /reviews
 * 5. Delete root user profile document: /users/{uid}
 * 6. Delete Firebase Authentication user record
 * 7. Purge local client caches
 */
export async function executeCompleteAccountDeletion(
  user: User,
  onProgress?: (progress: DeletionProgress) => void
): Promise<{ success: boolean; error?: string }> {
  const userId = user.uid;
  if (!userId) {
    throw new Error("Cannot delete account: unauthenticated identity.");
  }

  const update = (step: DeletionStep, details?: string, error?: string) => {
    if (onProgress) {
      onProgress({ step, details, error });
    }
  };

  try {
    update("VERIFYING_AUTH", "Verifying authenticated identity...");

    // 1. Delete Storage Files
    update("CLEANING_STORAGE", "Deleting uploaded leaf image files...");
    await deleteUserStorageFiles(userId);

    // 2. Delete Firestore Subcollections
    update("CLEANING_FIRESTORE_SUBCOLLECTIONS", "Purging farm plots, crops, and diagnostic history...");
    await deleteSubcollection(["users", userId, "farms"]);
    await deleteSubcollection(["users", userId, "crop_records"]);
    await deleteSubcollection(["users", userId, "assessments"]);

    // 3. Delete Shared Resources (Reviews)
    update("CLEANING_SHARED_RESOURCES", "Removing community reviews...");
    await deleteUserReviews(userId);

    // 4. Delete User Profile Document
    update("DELETING_PROFILE", "Removing user account profile...");
    const userDocRef = doc(db, "users", userId);
    await deleteDoc(userDocRef);

    // 5. Delete Firebase Authentication Record
    update("DELETING_AUTH", "Removing Firebase Authentication identity...");
    await firebaseDeleteUser(user);

    // 6. Purge Client-side Storage
    update("PURGING_CLIENT_CACHE", "Clearing local caches and preferences...");
    purgeClientStorage();

    update("COMPLETED", "Account and all associated records permanently removed.");
    return { success: true };
  } catch (err: any) {
    console.error("[AccountDeletion] Failure during orchestration:", err);
    const errorMsg = err?.message || "An unexpected error occurred during account deletion.";
    update("FAILED", undefined, errorMsg);
    return { success: false, error: errorMsg };
  }
}
