import { describe, it, expect, vi } from "vitest";
import {
  saveFarm,
  getUserFarms,
  deleteFarm,
  saveCropRecord,
  getUserCropRecords,
  FarmRecord,
} from "../lib/farmService";

// Mock Firebase Firestore methods
vi.mock("firebase/firestore", () => {
  const store = new Map<string, any>();
  return {
    getFirestore: vi.fn(),
    doc: vi.fn((_db, ...parts) => ({ path: parts.join("/") })),
    collection: vi.fn((_db, ...parts) => ({ path: parts.join("/") })),
    setDoc: vi.fn(async (ref, data) => {
      store.set(ref.path, data);
    }),
    getDocs: vi.fn(async (colRef) => {
      const docs: any[] = [];
      for (const [k, v] of store.entries()) {
        if (k.startsWith(colRef.path)) {
          docs.push({ data: () => v });
        }
      }
      return docs;
    }),
    deleteDoc: vi.fn(async (ref) => {
      store.delete(ref.path);
    }),
  };
});

describe("Industrial V6 Farm & Crop Records Service", () => {
  const testUserId = "farmer_auth_12345";

  it("fails gracefully when userId is missing", async () => {
    const res = await saveFarm("", {
      name: "Valley Farm",
      location: "Pune",
      state: "Maharashtra",
      totalAcres: 10,
      primaryCrops: ["Tomato"],
    });
    expect(res.success).toBe(false);
    expect(res.error).toBe("Authentication required");
  });

  it("creates and retrieves a farm plot for authenticated user", async () => {
    const createRes = await saveFarm(testUserId, {
      name: "Sahyadri Plot 1",
      location: "Niphad, Nashik",
      state: "Maharashtra",
      totalAcres: 7.5,
      primaryCrops: ["Onion", "Tomato"],
      soilType: "Black cotton soil",
      irrigationType: "Drip",
    });

    expect(createRes.success).toBe(true);
    expect(createRes.id).toBeDefined();

    const farms = await getUserFarms(testUserId);
    expect(farms.length).toBeGreaterThan(0);
    const found = farms.find((f) => f.name === "Sahyadri Plot 1");
    expect(found).toBeDefined();
    expect(found?.totalAcres).toBe(7.5);
    expect(found?.primaryCrops).toContain("Onion");
  });

  it("persists active crop cycle records under user profile", async () => {
    const cropRes = await saveCropRecord(testUserId, {
      farmId: "farm_1",
      cropName: "Tomato (Hybrid Abhinav)",
      areaAcres: 3.5,
      plantingDate: "2026-10-15",
      status: "vegetative",
    });

    expect(cropRes.success).toBe(true);
    expect(cropRes.id).toBeDefined();

    const crops = await getUserCropRecords(testUserId);
    expect(crops.length).toBeGreaterThan(0);
    expect(crops.find((c) => c.cropName === "Tomato (Hybrid Abhinav)")).toBeDefined();
  });
});
