import { db } from "./firebase";
import { collection, doc, getDocs, setDoc, deleteDoc, updateDoc } from "firebase/firestore";

export interface FarmRecord {
  id: string;
  userId: string;
  name: string;
  location: string;
  state: string;
  totalAcres: number;
  primaryCrops: string[];
  soilType?: string;
  irrigationType?: string;
  createdAt: string;
}

export interface CropRecord {
  id: string;
  farmId: string;
  userId: string;
  cropName: string;
  variety?: string;
  areaAcres: number;
  plantingDate: string;
  expectedHarvestDate?: string;
  status: "sown" | "vegetative" | "flowering" | "ready_harvest" | "harvested";
  notes?: string;
  createdAt: string;
}

/**
 * Saves or creates a farm under /users/{userId}/farms/{farmId}
 */
export async function saveFarm(
  userId: string,
  data: Omit<FarmRecord, "id" | "userId" | "createdAt">,
  farmId?: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!userId) return { success: false, error: "Authentication required" };

  const id = farmId || `farm_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const createdAt = new Date().toISOString();

  try {
    const farmRef = doc(db, "users", userId, "farms", id);
    const payload: FarmRecord = {
      ...data,
      id,
      userId,
      createdAt,
    };
    await setDoc(farmRef, payload, { merge: true });
    return { success: true, id };
  } catch (err: any) {
    console.error("[farmService] Error saving farm:", err);
    return { success: false, error: err.message || "Failed to save farm" };
  }
}

/**
 * Retrieves all farms owned by the user under /users/{userId}/farms
 */
export async function getUserFarms(userId: string): Promise<FarmRecord[]> {
  if (!userId) return [];
  try {
    const farmsRef = collection(db, "users", userId, "farms");
    const snapshot = await getDocs(farmsRef);
    const farms: FarmRecord[] = [];
    snapshot.forEach((d) => {
      farms.push(d.data() as FarmRecord);
    });
    return farms.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  } catch (err) {
    console.warn("[farmService] Error loading farms:", err);
    return [];
  }
}

/**
 * Deletes a farm record under /users/{userId}/farms/{farmId}
 */
export async function deleteFarm(
  userId: string,
  farmId: string
): Promise<{ success: boolean; error?: string }> {
  if (!userId || !farmId) return { success: false, error: "Missing parameters" };
  try {
    const farmRef = doc(db, "users", userId, "farms", farmId);
    await deleteDoc(farmRef);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete farm" };
  }
}

/**
 * Saves or creates a crop record under /users/{userId}/crop_records/{cropId}
 */
export async function saveCropRecord(
  userId: string,
  data: Omit<CropRecord, "id" | "userId" | "createdAt">,
  cropId?: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!userId) return { success: false, error: "Authentication required" };

  const id = cropId || `crop_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const createdAt = new Date().toISOString();

  try {
    const cropRef = doc(db, "users", userId, "crop_records", id);
    const payload: CropRecord = {
      ...data,
      id,
      userId,
      createdAt,
    };
    await setDoc(cropRef, payload, { merge: true });
    return { success: true, id };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save crop record" };
  }
}

/**
 * Retrieves all crop records for an authenticated user
 */
export async function getUserCropRecords(userId: string): Promise<CropRecord[]> {
  if (!userId) return [];
  try {
    const cropRef = collection(db, "users", userId, "crop_records");
    const snapshot = await getDocs(cropRef);
    const records: CropRecord[] = [];
    snapshot.forEach((d) => {
      records.push(d.data() as CropRecord);
    });
    return records.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  } catch (err) {
    console.warn("[farmService] Error loading crop records:", err);
    return [];
  }
}
