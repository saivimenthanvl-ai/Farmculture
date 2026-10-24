import React, { createContext, useContext, useEffect, useMemo, useState, useRef } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  syncUserProfile,
  resolveUserEmail,
  deriveFriendlyName,
  UserProfileRecord,
} from "@/lib/userProfileService";

export type AuthStateStatus =
  | "INITIALIZING"
  | "SIGNED_OUT"
  | "SIGNED_IN"
  | "PROFILE_LOADING"
  | "PROFILE_ERROR";

export type AuthValue = {
  user: User | null;
  profile: UserProfileRecord | null;
  loading: boolean;
  status: AuthStateStatus;
  friendlyName: string | null;
  authoritativeEmail: string | null;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthValue>({
  user: null,
  profile: null,
  loading: true,
  status: "INITIALIZING",
  friendlyName: null,
  authoritativeEmail: null,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfileRecord | null>(null);
  const [friendlyName, setFriendlyName] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthStateStatus>("INITIALIZING");
  const [loading, setLoading] = useState(true);

  // Active UID tracking to prevent stale asynchronous race conditions during account switching
  const activeUidRef = useRef<string | null>(null);

  const loadProfileForUser = async (u: User) => {
    const currentUid = u.uid;
    activeUidRef.current = currentUid;
    setStatus("PROFILE_LOADING");

    try {
      const synchedProfile = await syncUserProfile(u);
      
      // Prevent stale response from overwriting newer user if account changed mid-flight
      if (activeUidRef.current !== currentUid) {
        return;
      }

      setProfile(synchedProfile);
      setFriendlyName(synchedProfile.friendlyName || deriveFriendlyName(u));
      setStatus("SIGNED_IN");
      setLoading(false);
    } catch (err: any) {
      if (activeUidRef.current !== currentUid) return;

      console.warn("[Farmculture Auth] Profile load error; falling back to local user data:", {
        code: err?.code || "unknown",
      });
      setProfile(null);
      setFriendlyName(deriveFriendlyName(u));
      setStatus("PROFILE_ERROR");
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        activeUidRef.current = null;
        setUser(null);
        setProfile(null);
        setFriendlyName(null);
        setStatus("SIGNED_OUT");
        setLoading(false);
        return;
      }

      setUser(u);
      setLoading(true);
      await loadProfileForUser(u);
    });

    return () => {
      activeUidRef.current = null;
      unsub();
    };
  }, []);

  const authoritativeEmail = useMemo(() => {
    return resolveUserEmail(user) || profile?.email || null;
  }, [user, profile]);

  const handleSignOut = async () => {
    activeUidRef.current = null;
    setUser(null);
    setProfile(null);
    setFriendlyName(null);
    setStatus("SIGNED_OUT");
    await firebaseSignOut(auth);
  };

  const refreshProfile = async () => {
    if (user) {
      await loadProfileForUser(user);
    }
  };

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      status,
      friendlyName,
      authoritativeEmail,
      signOut: handleSignOut,
      refreshProfile,
    }),
    [user, profile, loading, status, friendlyName, authoritativeEmail]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
