# Farmculture

Farmculture is an friendly designer to help farmers with real-time insights, guidance, and decision-making support. It integrates artificial intelligence, weather data API and agricultural knowledge to enhance crop productivity and ensure sustainable farming practices.


---

## Features

- 🌤️ **Real-Time Weather Updates** – Location-based weather forecasts to help plan irrigation, sowing, and harvesting.
- 🌾 **Crop Recommendations** – Suggests the best crops based on soil type, climate, and season.
- 🐛 **Pest and Disease Alerts** – Notifies farmers about local pest outbreaks and preventive measures.
- 🪴 **Image-Based Plant Disease Detection** – Upload images of plants to detect possible diseases using AI.
- 🗣️ **Multilingual Voice & Chat Interface** – Communicate with the assistant in regional and international languages as well.
- 🌱 **Soil & Crop Health Analysis** – Uses AI to suggest fertilizer usage and soil improvement techniques.

---

## Techonologies

- **Frontend:** React
- **Backend:** Node.js,Firebase
- **AI/ML Models:** Machine Learning,TensorFlow, PyTorch, Hugging Face API
- **APIs & Data Sources:** Weather API, Satellite Data

---

## Use Case

- 🧑‍🌾 Farmers plan in advance to harvest seed
- 🌾 Early detection for crop diseases through image analysis and rectify it
- 🧪 Monitors air quality and weather in advance

---



##  Setup Instructions
# 1. Install Node JS
if installed check this
node-v
# 2. Create a React + Vite
npm create vite@latest
# 3. Navigate your folder
cd your_project_folder

npm install
# 4. Install Firebase if needed(Backend)
npm install firebase
# 5. Initialize the Firebase Settings
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "firebaseapp.com",
  projectId: "",
  storageBucket: "firebasestorage.app",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
# 6. Start the Development Server
npm run dev

# 7. Vercel Deployment
import your github in vercel it will do the rest make sure fix your bugs
https://vercel.com/saivimenthanvlai/farmcultureai/8145Syz56dvJoJViZ9yJztGQLq4c
