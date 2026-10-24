import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "./firebase";

export interface UserProfileRecord {
  uid: string;
  displayName: string | null;
  friendlyName: string;
  email: string | null;
  provider: string;
  photoURL?: string | null;
  emailVerified: boolean;
  createdAt?: any;
  lastLoginAt?: any;
  interfaceLocale?: string;
  region?: string;
  displayCurrency?: string;
}

/**
 * Resolves the authoritative display email from a Firebase User object.
 * Checks primary user.email first, then inspects providerData (e.g. google.com provider).
 */
export function resolveUserEmail(user: User | null): string | null {
  if (!user) return null;
  if (user.email && user.email.trim().length > 0) {
    return user.email.trim();
  }
  if (user.providerData && user.providerData.length > 0) {
    for (const provider of user.providerData) {
      if (provider.email && provider.email.trim().length > 0) {
        return provider.email.trim();
      }
    }
  }
  return null;
}

/**
 * Derives a human-friendly display name.
 */
export function deriveFriendlyName(user: User | null, profileFriendly?: string | null): string {
  if (profileFriendly && profileFriendly.trim().length > 0) {
    return profileFriendly.trim();
  }
  if (user?.displayName && user.displayName.trim().length > 0) {
    return user.displayName.trim();
  }
  const email = resolveUserEmail(user);
  if (email) {
    return email.split("@")[0];
  }
  return "Farmer";
}

/**
 * Synchronizes the Firebase Auth identity with the Firestore user profile.
 * - Guarantees the database profile always receives the authenticated email.
 * - Idempotently preserves existing user preferences (display name, currency, locale).
 * - Avoids overwriting creation timestamps on repeated logins.
 */
export async function syncUserProfile(
  user: User,
  providerOverride?: string
): Promise<UserProfileRecord> {
  const uid = user.uid;
  const userDocRef = doc(db, "users", uid);
  const resolvedEmail = resolveUserEmail(user);
  const detectedProvider =
    providerOverride ||
    (user.providerData.some((p) => p.providerId === "google.com")
      ? "google.com"
      : user.providerData.some((p) => p.providerId === "password")
      ? "password"
      : "custom");

  try {
    const existingSnap = await getDoc(userDocRef);
    if (existingSnap.exists()) {
      const data = existingSnap.data() as Partial<UserProfileRecord>;
      const existingFriendly = data.friendlyName || data.displayName;
      const finalFriendly = existingFriendly || deriveFriendlyName(user);

      // Perform a non-destructive merge that ensures email is synchronized
      const updates: Partial<UserProfileRecord> = {
        lastLoginAt: serverTimestamp(),
      };

      // If email was previously null or outdated, synchronize with authenticated email
      if (resolvedEmail && data.email !== resolvedEmail) {
        updates.email = resolvedEmail;
      }
      if (!data.provider || data.provider === "password") {
        updates.provider = detectedProvider;
      }
      if (!data.friendlyName) {
        updates.friendlyName = finalFriendly;
      }

      await setDoc(userDocRef, updates, { merge: true });

      return {
        uid,
        displayName: data.displayName || user.displayName || null,
        friendlyName: finalFriendly,
        email: resolvedEmail || data.email || null,
        provider: data.provider || detectedProvider,
        photoURL: data.photoURL || user.photoURL || null,
        emailVerified: user.emailVerified,
        createdAt: data.createdAt,
        lastLoginAt: data.lastLoginAt,
        interfaceLocale: data.interfaceLocale,
        region: data.region,
        displayCurrency: data.displayCurrency,
      };
    } else {
      // First-time profile creation for this UID
      const initialFriendly = deriveFriendlyName(user);
      const newProfile: UserProfileRecord = {
        uid,
        displayName: user.displayName || null,
        friendlyName: initialFriendly,
        email: resolvedEmail,
        provider: detectedProvider,
        photoURL: user.photoURL || null,
        emailVerified: user.emailVerified,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      };

      await setDoc(userDocRef, newProfile, { merge: true });
      return newProfile;
    }
  } catch (fsErr: any) {
    // Sanitized logging without exposing credentials or tokens
    console.warn("[Farmculture Auth] User profile sync deferred:", {
      operation: "syncUserProfile",
      code: fsErr?.code || "unknown",
      targetUidMask: `${uid.slice(0, 5)}...`,
    });

    // Return in-memory fallback derived from authenticated Firebase User
    return {
      uid,
      displayName: user.displayName || null,
      friendlyName: deriveFriendlyName(user),
      email: resolvedEmail,
      provider: detectedProvider,
      photoURL: user.photoURL || null,
      emailVerified: user.emailVerified,
    };
  }
}
