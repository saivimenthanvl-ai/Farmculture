// src/firebase/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJGoIN2mSXKNYpobLrH_714wAhTua6N6o",   // from your console
  authDomain: "farmcultureai.firebaseapp.com",
  projectId: "farmcultureai",
  storageBucket: "farmcultureai.appspot.com",
  messagingSenderId: "38022247529",                   // your project number
  appId: "1:38022247529:web:1ec7cf608df583827b1ef8"          // copy exact App ID from console
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
