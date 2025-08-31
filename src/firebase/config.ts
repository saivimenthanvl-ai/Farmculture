// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics,logEvent } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDJGoIN2mSXKNYpobLrH_714wAhTua6N6o",
  authDomain: "farmcultureai.firebaseapp.com",
  projectId: "farmcultureai",
  storageBucket: "farmcultureai.firebasestorage.app",
  messagingSenderId: "38022247529",
  appId: "1:38022247529:web:1ec7cf608df583827b1ef8",
  measurementId: "G-MQ1TF169JT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
logEvent(analytics, "login", { method: "Google" });