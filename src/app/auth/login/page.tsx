// src/app/auth/login/page.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
// If you don't have this component yet, comment it out and keep the <span> logo fallback.
// import FarmcultureLogo from '@/components/icons/FarmcultureLogo';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const saveUser = async (uid: string, displayName: string | null, email: string | null) => {
    const friendly = displayName || email?.split('@')[0] || 'Farmer';
    await setDoc(
      doc(db, 'users', uid), // use uid as doc id to avoid collisions
      { uid, displayName, email, provider: 'password', friendlyName: friendly },
      { merge: true }
    );
    return friendly;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const cred = isSignUp
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);

      if (isSignUp && name) {
        await updateProfile(cred.user, { displayName: name });
      }

      const friendlyName = await saveUser(cred.user.uid, cred.user.displayName, cred.user.email);
      navigate(`/dashboard?name=${encodeURIComponent(friendlyName ?? '')}`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    setLoading(true);
    try {
      const cred = await signInWithPopup(auth, new GoogleAuthProvider());
      const friendlyName = await saveUser(cred.user.uid, cred.user.displayName, cred.user.email);
      navigate(`/dashboard?name=${encodeURIComponent(friendlyName ?? '')}`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-emerald-50" role="main">
      <div className="w-full max-sm:px-4 sm:w-[400px] bg-white rounded-2xl shadow-xl p-8">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-6">
          {/* <FarmcultureLogo className="h-10 w-auto shrink-0 -mt-0.5" /> */}
          <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-100 text-emerald-700 font-bold">
            🌾
          </span>
          <h1 className="text-2xl font-bold text-emerald-700 tracking-tight">Farmculture</h1>
        </div>

        <h2 className="text-xl font-semibold mb-2">
          {isSignUp ? 'Create a new account' : 'Sign in to Farmculture'}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {isSignUp ? 'Join the largest agricultural network' : 'Welcome back, farmer!'}
        </p>

        <form onSubmit={submit} className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Full name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? 'Please wait…' : isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>

        {/* Divider */}
        {!isSignUp && (
          <>
            <div className="flex items-center my-4">
              <hr className="flex-1" />
              <span className="px-3 text-xs text-gray-400">OR</span>
              <hr className="flex-1" />
            </div>

            {/* Google button */}
            <button
              onClick={google}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg hover:bg-gray-50 disabled:opacity-60"
            >
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.8 32.4 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.8 6.1 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10.4 0 19-8.4 19-20 0-1.2-.1-2.3-.4-3.5z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16.2 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.8 6.1 29.2 4 24 4 16.1 4 9.2 8.6 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.4-5.1l-6.2-5.1C29 35.3 26.7 36 24 36c-5.3 0-9.8-3.6-11.3-8.5l-6.6 5.1C9 39.4 15.9 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.9-5.1 8-11.3 8-5.3 0-9.8-3.6-11.3-8.5l-6.6 5.1C9 39.4 15.9 44 24 44c10.4 0 19-8.4 19-20 0-1.2-.1-2.3-.4-3.5z"/>
              </svg>
              Continue with Google
            </button>
          </>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          {isSignUp ? 'Already have an account?' : 'New to Farmculture?'}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp((v) => !v)}
            className="text-emerald-700 font-medium underline"
          >
            {isSignUp ? 'Sign in' : 'Create an account'}
          </button>
        </p>

        <p className="mt-4 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:underline">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
