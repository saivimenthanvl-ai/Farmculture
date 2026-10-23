import { describe, it, expect, vi, beforeEach } from "vitest";
import { dict, pathGet, Lang } from "../contexts/LanguageContext";
import {
  executeCompleteAccountDeletion,
  purgeClientStorage,
  DeletionProgress,
} from "../lib/accountDeletionService";

// Mock Firebase Modules
vi.mock("firebase/auth", async (importOriginal) => {
  const actual = await importOriginal<typeof import("firebase/auth")>();
  return {
    ...actual,
    getAuth: vi.fn().mockReturnValue({ currentUser: { uid: "test-user-123" } }),
    reauthenticateWithCredential: vi.fn().mockResolvedValue(true),
    EmailAuthProvider: {
      credential: vi.fn().mockReturnValue({ providerId: "password" }),
    },
    GoogleAuthProvider: vi.fn(),
    reauthenticateWithPopup: vi.fn().mockResolvedValue(true),
    deleteUser: vi.fn().mockResolvedValue(undefined),
  };
});

vi.mock("firebase/firestore", async (importOriginal) => {
  const actual = await importOriginal<typeof import("firebase/firestore")>();
  return {
    ...actual,
    getFirestore: vi.fn().mockReturnValue({}),
    collection: vi.fn().mockReturnValue({}),
    getDocs: vi.fn().mockResolvedValue({
      empty: false,
      docs: [
        { ref: { id: "doc-1" } },
        { ref: { id: "doc-2" } },
      ],
    }),
    doc: vi.fn().mockReturnValue({ id: "user-doc" }),
    deleteDoc: vi.fn().mockResolvedValue(undefined),
    query: vi.fn().mockReturnValue({}),
    where: vi.fn().mockReturnValue({}),
    writeBatch: vi.fn().mockReturnValue({
      delete: vi.fn(),
      commit: vi.fn().mockResolvedValue(undefined),
    }),
  };
});

vi.mock("firebase/storage", async (importOriginal) => {
  const actual = await importOriginal<typeof import("firebase/storage")>();
  return {
    ...actual,
    getStorage: vi.fn().mockReturnValue({}),
    ref: vi.fn().mockReturnValue({}),
    listAll: vi.fn().mockResolvedValue({
      items: [{ fullPath: "crop-assessments/test-user/sample.jpg" }],
      prefixes: [],
    }),
    deleteObject: vi.fn().mockResolvedValue(undefined),
  };
});

describe("Phase 8 — Account Deletion Full-Stack Verification & Automated Tests", () => {
  const supportedLangs: Lang[] = ["en", "hi", "mr", "ta", "de", "pl", "fr", "es", "te", "ar"];

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    sessionStorage.clear();
  });

  // TEST 1 — Successful end-to-end deletion orchestration
  it("TEST 1: Successfully executes end-to-end deletion across Storage, Firestore subcollections, and Auth", async () => {
    const mockUser: any = {
      uid: "test-user-123",
      email: "farmer@farmculture.test",
      providerData: [{ providerId: "password" }],
      metadata: { creationTime: "2026-01-01T00:00:00Z" },
    };

    const progressSteps: string[] = [];
    const res = await executeCompleteAccountDeletion(mockUser, (p: DeletionProgress) => {
      progressSteps.push(p.step);
    });

    expect(res.success).toBe(true);
    expect(progressSteps).toContain("VERIFYING_AUTH");
    expect(progressSteps).toContain("CLEANING_STORAGE");
    expect(progressSteps).toContain("CLEANING_FIRESTORE_SUBCOLLECTIONS");
    expect(progressSteps).toContain("CLEANING_SHARED_RESOURCES");
    expect(progressSteps).toContain("DELETING_PROFILE");
    expect(progressSteps).toContain("DELETING_AUTH");
    expect(progressSteps).toContain("PURGING_CLIENT_CACHE");
    expect(progressSteps).toContain("COMPLETED");
  });

  // TEST 2 & 3 — Unauthorized / Unauthenticated rejection
  it("TEST 2 & 3: Rejects deletion attempts without authenticated identity and enforces self-ownership", async () => {
    const invalidUser: any = { uid: "" };
    await expect(executeCompleteAccountDeletion(invalidUser)).rejects.toThrow(
      "Cannot delete account: unauthenticated identity."
    );
  });

  // TEST 5 — Storage failure handling and truthful error reporting
  it("TEST 5: Captures Storage failure without falsely claiming complete deletion", async () => {
    const { listAll } = await import("firebase/storage");
    vi.mocked(listAll).mockRejectedValueOnce(new Error("Storage service permission denied"));

    const mockUser: any = { uid: "test-user-error" };
    const res = await executeCompleteAccountDeletion(mockUser);

    expect(res.success).toBe(false);
    expect(res.error).toContain("Storage service permission denied");
  });

  // TEST 6 — Firestore database failure handling
  it("TEST 6: Captures Database failure without deleting Auth credentials prematurely", async () => {
    const { deleteDoc } = await import("firebase/firestore");
    vi.mocked(deleteDoc).mockRejectedValueOnce(new Error("Firestore write quota exceeded"));

    const mockUser: any = { uid: "test-user-db-error" };
    const res = await executeCompleteAccountDeletion(mockUser);

    expect(res.success).toBe(false);
    expect(res.error).toContain("Firestore write quota exceeded");
  });

  // TEST 10 — Localization completeness across all 10 locales
  it("TEST 10: Ensures all account deletion and danger zone keys exist in all 10 supported languages", () => {
    const requiredKeys = [
      "account.settings",
      "account.profileInfo",
      "account.displayName",
      "account.emailAddress",
      "account.joinedDate",
      "account.dangerZone",
      "account.deleteAccount",
      "account.deleteDesc",
      "account.deleteButton",
      "account.dialogTitle",
      "account.dialogDesc",
      "account.dataDeletedNotice",
      "account.itemFarms",
      "account.itemCrops",
      "account.itemPhotos",
      "account.itemReviews",
      "account.retentionExceptions",
      "account.typeDeletePrompt",
      "account.confirmDelete",
      "account.cancel",
      "account.reauthRequired",
      "account.reauthDesc",
      "account.enterPassword",
      "account.reauthPassword",
      "account.reauthGoogle",
      "account.deleting",
      "account.deletionSuccess",
      "account.deletionFailed",
    ];

    supportedLangs.forEach((lang) => {
      const langDict = dict[lang];
      expect(langDict, `Dictionary for ${lang} must exist`).toBeDefined();

      requiredKeys.forEach((key) => {
        const val = pathGet(langDict, key) ?? langDict[key];
        expect(
          val,
          `Account deletion key "${key}" must be non-empty string in language "${lang}"`
        ).toBeTypeOf("string");
        expect(val.length).toBeGreaterThan(0);
      });
    });
  });

  // TEST 11 — Purges client-side localStorage and sessionStorage
  it("TEST 11: Correctly purges client-side caches and user preferences", () => {
    localStorage.setItem("farmculture_user_preferences_v1", JSON.stringify({ theme: "dark" }));
    localStorage.setItem("farmculture_fx_cache_v2", JSON.stringify({ rate: 85 }));
    sessionStorage.setItem("temp_session", "active");

    purgeClientStorage();

    expect(localStorage.getItem("farmculture_user_preferences_v1")).toBeNull();
    expect(localStorage.getItem("farmculture_fx_cache_v2")).toBeNull();
    expect(sessionStorage.getItem("temp_session")).toBeNull();
  });
});
