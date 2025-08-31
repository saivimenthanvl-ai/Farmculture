// src/types/firestore.ts

// Example User type
export interface User {
  id?: string;          // Firestore doc id (optional, since Firestore auto-generates)
  name: string;
  email: string;
  createdAt: Date;
}

// Example Crop type
export interface Crop {
  id?: string;
  name: string;
  type: string;
  season: string;
  farmerId: string;     // reference to User.uid
  createdAt: Date;
}

// Example MarketPrice type
export interface MarketPrice {
  id?: string;
  crop: string;
  price: number;
  location: string;
  date: Date;
}
