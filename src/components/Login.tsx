// src/components/Login.tsx
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

async function addUser() {
  await addDoc(collection(db, "users"), {
    name: "Sai",
    createdAt: new Date(),
  });
}

type LoginProps = {
  onClose?: () => void;
};

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100 relative">
        {onClose && (
          <button
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        )}
        <h1 className="text-2xl font-bold mb-6">Sign in</h1>
        <form className="space-y-4">
          <input
            type="email"
            className="w-full rounded-lg border px-3 py-2"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full rounded-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
