import { useState } from "react";
import { Wheat, Mic, MicOff } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
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
  const navigate = useNavigate();

  const nameToShow = (friendlyName?.split(" ")[0] ?? "Farmer").slice(0, 16);
  const initial = nameToShow.charAt(0).toUpperCase();

  return (
    <header className="bg-green-600 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* left brand */}
        <div className="flex items-center gap-3">
          <Wheat className="w-7 h-7" />
          <HeaderBrand />
        </div>

        {/* right controls */}
        <div className="relative flex items-center gap-3">
          <LanguageSelector />

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
            // signed in: show name chip with small menu
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-lg bg-white text-emerald-700 hover:bg-emerald-50 px-3 py-2"
              >
                <span className="grid place-items-center h-6 w-6 rounded-full bg-emerald-600 text-white text-sm">
                  {initial}
                </span>
                <span className="font-medium">{nameToShow}</span>
              </button>

              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 w-40 rounded-xl border bg-white text-gray-800 shadow-lg overflow-hidden"
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
                    onClick={async () => {
                      setMenuOpen(false);
                      await signOut(auth);
                      navigate("/");
                    }}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            // not signed in: show login
            <Link
              to="/auth/login"
              className="px-4 py-2 rounded-lg bg-white text-emerald-700 hover:bg-emerald-50 font-medium"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
