import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type AuthValue = {
  user: User | null;
  loading: boolean;
  friendlyName: string | null;
};

const AuthContext = createContext<AuthValue>({
  user: null,
  loading: true,
  friendlyName: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [friendlyName, setFriendlyName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // derive a safe, short display name
  const deriveFriendly = (u: User | null) => {
    if (!u) return null;
    if (u.displayName?.trim()) return u.displayName.trim();
    if (u.email) return u.email.split("@")[0];
    return "Farmer";
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setLoading(true);

      if (!u) {
        setFriendlyName(null);
        setLoading(false);
        return;
      }

      // start with a local/fallback
      let friendly = deriveFriendly(u);

      // Authoritative lookup strictly by authenticated UID (FC-08)
      try {
        const byUid = await getDoc(doc(db, "users", u.uid));
        if (byUid.exists()) {
          const data = byUid.data() as { friendlyName?: string; displayName?: string };
          friendly = data?.friendlyName ?? data?.displayName ?? friendly;
        }
      } catch {
        // Fallback to local derived name on offline or read errors
      }

      setFriendlyName(friendly ?? null);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const value = useMemo(
    () => ({ user, loading, friendlyName }),
    [user, loading, friendlyName]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
