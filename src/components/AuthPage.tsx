import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const resetFeedback = () => { setErr(null); setMsg(null); };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { user } = await signInWithEmailAndPassword(auth, email.trim(), password);
        setMsg(`Welcome back, ${user.email ?? "user"}!`);
        // TODO: navigate("/dashboard");
      } else {
        // Basic client-side checks (optional)
        if (name.trim().length < 2) throw new Error("Please enter your name");
        if (password.length < 6) throw new Error("Password must be at least 6 characters");

        const { user } = await createUserWithEmailAndPassword(auth, email.trim(), password);
        // Set display name
        await updateProfile(user, { displayName: name.trim() });
        // Send verification email (recommended)
        await sendEmailVerification(user);
        setMsg("Account created! Please check your email for verification.");
        setMode("signin");
        setPassword("");
      }
    } catch (e: any) {
      setErr(e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onForgot = async () => {
    resetFeedback();
    if (!email) { setErr("Enter your email to receive reset link"); return; }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMsg("Password reset link sent to your email.");
    } catch (e: any) {
      setErr(e.message ?? "Could not send reset email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl font-semibold mb-4">
          {mode === "signin" ? "Sign in" : "Create your account"}
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-sm mb-1">Full name</label>
              <input
                className="w-full border rounded-lg px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sai Vimenthan"
                autoComplete="name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sai@user.com"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              required
            />
            {mode === "signup" && (
              <p className="text-xs text-gray-500 mt-1">Min 6 characters recommended.</p>
            )}
          </div>

          {err && <div className="text-red-600 text-sm">{err}</div>}
          {msg && <div className="text-green-700 text-sm">{msg}</div>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white rounded-lg py-2 font-medium disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Please wait..." : mode === "signin" ? "Sign in" : "Sign up"}
          </button>
        </form>

        <div className="flex items-center justify-between mt-4 text-sm">
          <button
            className="text-green-700 hover:underline"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin"
              ? "New here? Create an account"
              : "Already have an account? Sign in"}
          </button>

          {mode === "signin" && (
            <button className="text-gray-600 hover:underline" onClick={onForgot}>
              Forgot password?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
