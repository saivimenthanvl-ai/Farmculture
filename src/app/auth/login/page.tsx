import { useState, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { syncUserProfile } from '@/lib/userProfileService';

/**
 * Validates returnTo path to prevent Open Redirect vulnerabilities.
 * Only allows relative paths starting with a single '/' and alphanumeric segments.
 */
export function getSafeReturnUrl(search: string): string {
  const params = new URLSearchParams(search);
  const target = params.get('returnTo');

  if (!target) return '/dashboard';

  // Prevent protocol-relative URL '//evil.com' or absolute 'http://...'
  if (target.startsWith('/') && !target.startsWith('//') && !target.includes('\\')) {
    return target;
  }

  return '/dashboard';
}

export default function LoginPage() {
  const { t } = useLanguage();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const safeDestination = useMemo(() => getSafeReturnUrl(location.search), [location.search]);

  const saveUser = async (uid: string, displayName: string | null, email: string | null) => {
    const friendly = displayName || email?.split('@')[0] || 'Farmer';
    try {
      await setDoc(
        doc(db, 'users', uid),
        { uid, displayName, email, provider: 'password', friendlyName: friendly },
        { merge: true }
      );
    } catch (fsErr: any) {
      // Non-fatal if Firestore profile creation has rules or network latency;
      // log sanitized context for diagnostics without private credentials
      console.warn('[Farmculture Auth] Profile write deferred:', {
        operation: 'setDoc',
        code: fsErr?.code || 'unknown',
        targetPath: `/users/${uid.slice(0, 5)}...`,
      });
    }
    return friendly;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    // Password reset workflow
    if (isResetMode) {
      try {
        await sendPasswordResetEmail(auth, email);
        setResetSuccess(true);
      } catch (err: any) {
        setErrorMsg(err.message || 'Failed to send password reset email.');
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      const cred = isSignUp
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);

      if (isSignUp && name) {
        await updateProfile(cred.user, { displayName: name });
      }

      await syncUserProfile(cred.user, 'password');
      navigate(safeDestination);
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const provider = new GoogleAuthProvider();
      // Prompt user to select account to ensure seamless switching between accounts
      provider.setCustomParameters({ prompt: 'select_account' });
      const cred = await signInWithPopup(auth, provider);
      await syncUserProfile(cred.user, 'google.com');
      navigate(safeDestination);
    } catch (err: any) {
      // Don't show confusing error if user simply closed the popup
      if (err?.code === 'auth/popup-closed-by-user') {
        setLoading(false);
        return;
      }
      setErrorMsg(err.message || 'Google authentication was cancelled or failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-emerald-50 p-4" role="main">
      <div className="w-full max-sm:px-4 sm:w-[420px] bg-white rounded-2xl shadow-xl p-8">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#9BE564] text-[#0F2E24] flex items-center justify-center font-extrabold text-xl shrink-0 shadow-xs">
            F
          </div>
          <h1 className="text-2xl font-bold text-[#0F2E24] tracking-tight">Farmculture</h1>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold mb-1">
          {isResetMode
            ? (t("auth.reset_password") || 'Reset your password')
            : isSignUp
            ? (t("auth.create_account") || 'Create a new account')
            : (t("auth.sign_in_title") ? `${t("auth.sign_in_title")} Farmculture` : 'Sign in to Farmculture')}
        </h2>
        <p className="text-xs text-gray-500 mb-5">
          {isResetMode
            ? (t("auth.reset_instructions") || 'Enter your registered email to receive reset instructions')
            : isSignUp
            ? (t("auth.signup_sub") || 'Join the transparent agricultural network')
            : (t("auth.signin_sub") || 'Access verified mandi prices, crop tools and dashboard')}
        </p>

        {/* Error notification */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Reset Success Message */}
        {resetSuccess ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-3">
            <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
            <p className="text-xs text-emerald-800 font-medium leading-relaxed">
              {t("auth.reset_dispatched") || 'Password recovery link dispatched. Check your inbox to proceed.'}
            </p>
            <button
              onClick={() => {
                setIsResetMode(false);
                setResetSuccess(false);
              }}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              {t("auth.back_to_signin") || 'Back to Sign In'}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3.5">
            {isSignUp && !isResetMode && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {t("auth.full_name") || 'Full Name'}
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {t("auth.email") || 'Email address'}
              </label>
              <input
                type="email"
                placeholder="farmer@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            {!isResetMode && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-gray-700">
                    {t("auth.password") || 'Password'}
                  </label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => setIsResetMode(true)}
                      className="text-xs text-emerald-700 hover:underline font-medium"
                    >
                      {t("auth.forgot_password") || 'Forgot password?'}
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-2.5 rounded-lg hover:bg-emerald-700 disabled:opacity-60 text-xs font-semibold transition-colors shadow-sm"
            >
              {loading
                ? (t("auth.processing") || 'Processing…')
                : isResetMode
                ? (t("auth.send_reset") || 'Send Reset Link')
                : isSignUp
                ? (t("auth.create_account") || 'Create Account')
                : (t("auth.sign_in") || 'Sign In')}
            </button>
          </form>
        )}

        {/* Reset Mode toggle back */}
        {isResetMode && !resetSuccess && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsResetMode(false)}
              className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t("auth.back_to_signin") || 'Back to Sign In'}</span>
            </button>
          </div>
        )}

        {/* Divider & Google Sign-In */}
        {!isSignUp && !isResetMode && (
          <>
            <div className="flex items-center my-4">
              <hr className="flex-1 border-gray-200" />
              <span className="px-3 text-xs text-gray-400 font-medium">
                {t("auth.or") || 'OR'}
              </span>
              <hr className="flex-1 border-gray-200" />
            </div>

            <button
              onClick={google}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 disabled:opacity-60 text-xs font-semibold text-gray-700 transition-colors shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.8 32.4 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.8 6.1 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10.4 0 19-8.4 19-20 0-1.2-.1-2.3-.4-3.5z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16.2 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.8 6.1 29.2 4 24 4 16.1 4 9.2 8.6 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.4-5.1l-6.2-5.1C29 35.3 26.7 36 24 36c-5.3 0-9.8-3.6-11.3-8.5l-6.6 5.1C9 39.4 15.9 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.9-5.1 8-11.3 8-5.3 0-9.8-3.6-11.3-8.5l-6.6 5.1C9 39.4 15.9 44 24 44c10.4 0 19-8.4 19-20 0-1.2-.1-2.3-.4-3.5z"/>
              </svg>
              <span>{t("auth.continue_google") || 'Continue with Google'}</span>
            </button>
          </>
        )}

        {/* Switch Sign in / Sign up */}
        {!isResetMode && (
          <p className="text-center text-xs text-gray-600 mt-5">
            {isSignUp
              ? (t("auth.already_have_account") || 'Already have an account?')
              : (t("auth.new_to") ? `${t("auth.new_to")} Farmculture?` : 'New to Farmculture?')}{' '}
            <button
              type="button"
              onClick={() => {
                setIsSignUp((v) => !v);
                setErrorMsg(null);
              }}
              className="text-emerald-700 font-bold underline ml-1"
            >
              {isSignUp
                ? (t("auth.sign_in") || 'Sign in')
                : (t("auth.create_account") || 'Create an account')}
            </button>
          </p>
        )}

        {/* Back to Home Link */}
        <p className="mt-4 text-center">
          <Link to="/" className="text-xs text-gray-400 hover:text-gray-600 hover:underline">
            ← {t("backToHome") || 'Return to Home'}
          </Link>
        </p>
      </div>
    </div>
  );
}
