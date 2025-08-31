// src/firebase/index.ts
import { initializeApp } from "firebase/app";
import { getFirestore,collection,CollectionReference,} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import type { User, Crop, MarketPrice } from "../types/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBShJr9T-f_j9wWqMa9vnoKJ0eRrxpBfXU",
  authDomain: "project-kisan-48276.firebaseapp.com",
  projectId: "project-kisan-48276",
  storageBucket: "project-kisan-48276.appspot.com",
  messagingSenderId: "411186630441",
  appId: "1:411186630441:web:0123456789abcdef",
  measurementId: "G-97N7RCNZY9",
};

// Init Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// 🔥 Typed collection helper
const createCollection = <T = unknown>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

// Export strongly typed collections
export const usersCol = createCollection<User>("users");
export const cropsCol = createCollection<Crop>("crops");
export const marketPricesCol = createCollection<MarketPrice>("marketPrices");
