import { useState, useRef, useEffect } from "react";
import { Wheat, Mic, MicOff } from "lucide-react";
import { InternationalSelector } from "./InternationalSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  isListening: boolean;
  onToggleListening: () => void;
}

/** Small brand block that uses translations */
function HeaderBrand() {
  const { t } = useLanguage();
  return (
    <div className="leading-tight">
      <h1 className="text-xl font-bold">{t("brand")}</h1>
      <p className="text-green-100 text-sm">{t("brand_tagline")}</p>
    </div>
  );
}

export default function Header({ isListening, onToggleListening }: HeaderProps) {
  const { t } = useLanguage();
  const { user, loading, friendlyName } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const nameToShow = (friendlyName?.split(" ")[0] ?? "Farmer").slice(0, 16);
  const initial = nameToShow.charAt(0).toUpperCase();

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    if (!menuOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="bg-green-600 text-white p-4 shadow-lg relative z-30">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* left brand */}
        <div className="flex items-center gap-3">
          <Wheat className="w-7 h-7" />
          <HeaderBrand />
        </div>

        {/* right controls */}
        <div className="relative flex items-center gap-3">
          <InternationalSelector />

          {/* mic */}
          <button
            onClick={onToggleListening}
            className={`p-3 rounded-full transition-all duration-200 ${
              isListening
                ? "bg-red-500 hover:bg-red-600 animate-pulse"
                : "bg-emerald-500 hover:bg-emerald-400"
            }`}
            aria-label={isListening ? "Stop listening" : "Start voice assistant"}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* auth area */}
          {loading ? (
            // tiny skeleton while auth initializes
            <div className="h-10 w-24 rounded-lg bg-white/30 animate-pulse" />
          ) : user ? (
            // signed in: show name chip with accessible dropdown
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
                className="flex items-center gap-2 rounded-lg bg-white text-emerald-700 hover:bg-emerald-50 px-3 py-2 text-sm font-semibold transition-colors shadow-xs"
              >
                <span className="grid place-items-center h-6 w-6 rounded-full bg-emerald-600 text-white text-xs">
                  {initial}
                </span>
                <span>{nameToShow}</span>
              </button>

              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white text-gray-800 shadow-xl overflow-hidden py-1 z-50 text-sm"
                  role="menu"
                >
                  <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/50">
                    <p className="text-xs text-gray-500">{t("auth.signed_in") || "Signed in"}</p>
                    <p className="font-semibold truncate text-xs text-gray-900">{user.email}</p>
                  </div>

                  <Link
                    to="/dashboard"
                    className="block w-full text-left px-4 py-2 hover:bg-emerald-50 text-emerald-800 transition-colors"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                  >
                    {t("auth.profile") || "My Profile"}
                  </Link>

                  <button
                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 border-t border-gray-100 transition-colors"
                    role="menuitem"
                    onClick={async () => {
                      setMenuOpen(false);
                      await signOut(auth);
                      navigate("/");
                    }}
                  >
                    {t("auth.log_out") || "Log out"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            // not signed in: show login
            <Link
              to="/auth/login"
              className="px-4 py-2 rounded-lg bg-white text-emerald-700 hover:bg-emerald-50 font-medium text-sm transition-colors shadow-xs"
            >
              {t("auth.log_in") || "Log in"}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
