import { describe, it, expect, vi, beforeEach } from "vitest";
import fs from "fs";
import path from "path";
import { User } from "firebase/auth";
import {
  resolveUserEmail,
  deriveFriendlyName,
  syncUserProfile,
} from "../lib/userProfileService";

// Mock Firebase Firestore methods
vi.mock("firebase/firestore", () => {
  const store = new Map<string, any>();
  return {
    getFirestore: vi.fn(),
    doc: vi.fn((_db, coll, id) => ({ path: `${coll}/${id}`, id })),
    serverTimestamp: vi.fn(() => "2026-10-24T12:00:00.000Z"),
    getDoc: vi.fn(async (docRef) => {
      const data = store.get(docRef.path);
      return {
        exists: () => !!data,
        data: () => data,
      };
    }),
    setDoc: vi.fn(async (docRef, updates, options) => {
      const current = store.get(docRef.path) || {};
      if (options?.merge) {
        store.set(docRef.path, { ...current, ...updates });
      } else {
        store.set(docRef.path, updates);
      }
    }),
    __store: store,
  };
});

describe("V11 — Authentication, Email Synchronization, and Favicon Suite", () => {
  beforeEach(async () => {
    const firestoreMock = (await import("firebase/firestore")) as any;
    if (firestoreMock.__store) {
      firestoreMock.__store.clear();
    }
  });

  // TEST 1 — Authoritative email resolution from primary user.email
  it("resolves email from user.email when present", () => {
    const mockUser = {
      uid: "user-123",
      email: "cultivator@farmculture.ai",
      providerData: [],
    } as unknown as User;

    expect(resolveUserEmail(mockUser)).toBe("cultivator@farmculture.ai");
  });

  // TEST 2 — Authoritative email resolution from providerData (e.g. Google OAuth)
  it("resolves email from providerData when primary user.email is null or empty", () => {
    const mockUser = {
      uid: "google-uid-456",
      email: null,
      providerData: [
        {
          providerId: "google.com",
          email: "saravanan.farmer@gmail.com",
        },
      ],
    } as unknown as User;

    expect(resolveUserEmail(mockUser)).toBe("saravanan.farmer@gmail.com");
  });

  // TEST 3 — Derives friendly display name accurately without leaking raw identifiers
  it("derives friendly display name with precedence: profile -> displayName -> email prefix -> default", () => {
    expect(deriveFriendlyName(null, "Ramesh")).toBe("Ramesh");

    const userWithDisplay = {
      uid: "u1",
      displayName: "Ramesh Patel",
      email: "ramesh@farmculture.ai",
    } as unknown as User;
    expect(deriveFriendlyName(userWithDisplay, null)).toBe("Ramesh Patel");

    const userEmailOnly = {
      uid: "u2",
      displayName: null,
      email: "ananya.sharma@example.com",
      providerData: [],
    } as unknown as User;
    expect(deriveFriendlyName(userEmailOnly, null)).toBe("ananya.sharma");

    const emptyUser = {
      uid: "u3",
      displayName: null,
      email: null,
      providerData: [],
    } as unknown as User;
    expect(deriveFriendlyName(emptyUser, null)).toBe("Farmer");
  });

  // TEST 4 — Syncs user profile into Firestore and guarantees email is persisted
  it("creates initial user profile in Firestore with authenticated email and provider info", async () => {
    const mockUser = {
      uid: "user-abc-1",
      displayName: "Vikram Reddy",
      email: "vikram@farmculture.ai",
      emailVerified: true,
      providerData: [{ providerId: "google.com", email: "vikram@farmculture.ai" }],
    } as unknown as User;

    const profile = await syncUserProfile(mockUser);
    expect(profile.uid).toBe("user-abc-1");
    expect(profile.email).toBe("vikram@farmculture.ai");
    expect(profile.provider).toBe("google.com");
    expect(profile.friendlyName).toBe("Vikram Reddy");
  });

  // TEST 5 — Account switching test: Account A -> Account B isolation
  it("switches accounts without cross-polluting profile email or names", async () => {
    const accountA = {
      uid: "uid-account-a",
      displayName: "Farmer A",
      email: "account.a@example.com",
      providerData: [{ providerId: "google.com", email: "account.a@example.com" }],
    } as unknown as User;

    const accountB = {
      uid: "uid-account-b",
      displayName: "Farmer B",
      email: "account.b@example.com",
      providerData: [{ providerId: "google.com", email: "account.b@example.com" }],
    } as unknown as User;

    const profileA = await syncUserProfile(accountA);
    const profileB = await syncUserProfile(accountB);

    expect(profileA.uid).toBe("uid-account-a");
    expect(profileA.email).toBe("account.a@example.com");

    expect(profileB.uid).toBe("uid-account-b");
    expect(profileB.email).toBe("account.b@example.com");

    // Re-query account A to verify its data was never overwritten by account B
    const profileAReloaded = await syncUserProfile(accountA);
    expect(profileAReloaded.email).toBe("account.a@example.com");
    expect(profileAReloaded.friendlyName).toBe("Farmer A");
  });

  // TEST 6 — Favicon assets exist in all standard formats in /public
  it("verifies multi-format favicon assets and site.webmanifest exist in public directory", () => {
    const publicDir = path.join(__dirname, "..", "..", "public");

    const requiredAssets = [
      "farmculture.svg",
      "favicon.ico",
      "favicon-16x16.png",
      "favicon-32x32.png",
      "apple-touch-icon.png",
      "android-chrome-192x192.png",
      "android-chrome-512x512.png",
      "site.webmanifest",
    ];

    for (const asset of requiredAssets) {
      const assetPath = path.join(publicDir, asset);
      expect(fs.existsSync(assetPath), `Asset ${asset} must exist in public/`).toBe(true);
    }

    // Verify index.html references the standard favicon assets
    const indexPath = path.join(__dirname, "..", "..", "index.html");
    const indexContent = fs.readFileSync(indexPath, "utf8");
    expect(indexContent).toContain('href="/favicon.ico"');
    expect(indexContent).toContain('href="/farmculture.svg"');
    expect(indexContent).toContain('href="/favicon-32x32.png"');
    expect(indexContent).toContain('href="/favicon-16x16.png"');
    expect(indexContent).toContain('href="/apple-touch-icon.png"');
    expect(indexContent).toContain('href="/site.webmanifest"');
  });
});
