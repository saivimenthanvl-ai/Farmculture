import React, { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Menu, Search, User, LogOut, ChevronRight } from "lucide-react";
import { InternationalSelector } from "./InternationalSelector";
import { useLocalization } from "@/contexts/LocalizationContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { NAV_CATEGORIES } from "./navigation/AppSidebar";

interface HeaderProps {
  isListening: boolean;
  onToggleListening: () => void;
  onOpenMobileMenu?: () => void;
}

export default function Header({ isListening, onToggleListening, onOpenMobileMenu }: HeaderProps) {
  const { t } = useLocalization();
  const { user, loading, friendlyName } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const nameToShow = (friendlyName?.split(" ")[0] ?? "Farmer").slice(0, 16);
  const initial = nameToShow.charAt(0).toUpperCase();

  // Find active route label for breadcrumbs across all categorized items
  const allNavItems = NAV_CATEGORIES.flatMap((c) => c.items);
  const currentNav = allNavItems.find(
    (item) => item.path === location.pathname || item.path.split("?")[0] === location.pathname
  );

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 h-16 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E7E3D8] px-4 md:px-6 flex items-center justify-between">
      {/* Left: Mobile Menu Trigger + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-lg text-[#1C4A3A] hover:bg-[#F3F1E9] transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search / Command Palette Trigger */}
        <button
          onClick={() => {
            const ev = new KeyboardEvent("keydown", { key: "k", ctrlKey: true });
            window.dispatchEvent(ev);
          }}
          className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white border border-[#E7E3D8] hover:border-[#9BE564] text-[#787266] text-xs transition-colors shadow-2xs"
          title="Search modules (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5 text-[#1C4A3A]" />
          <span>Quick search…</span>
          <kbd className="hidden lg:inline-block px-1 py-0.2 rounded bg-[#FAF9F5] border border-[#D3CDC0] text-[10px] text-[#0F2E24] font-mono">
            Ctrl+K
          </kbd>
        </button>

        {/* Dynamic Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs">
          <Link
            to="/"
            className="text-[#787266] hover:text-[#0F2E24] font-medium transition-colors"
          >
            Farmculture
          </Link>
          {location.pathname !== "/" && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[#A8A092]" />
              <span className="font-semibold text-[#0F2E24] truncate max-w-[140px] sm:max-w-xs">
                {currentNav ? (t(currentNav.labelKey) || currentNav.defaultLabel) : location.pathname.replace("/", "")}
              </span>
            </>
          )}
        </nav>
      </div>

      {/* Right: Actions, Language/Currency, Voice Assistant & User Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Language & Currency Switcher */}
        <InternationalSelector />

        {/* Voice Assistant Mic Button */}
        <button
          onClick={onToggleListening}
          className={`p-2.5 rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3E8E8A] ${
            isListening
              ? "bg-[#C8553D] text-white animate-pulse shadow-sm"
              : "bg-[#EDF4F0] text-[#1C4A3A] hover:bg-[#E2EEE8] border border-[#BDE7D1]"
          }`}
          aria-label={isListening ? "Stop voice assistant" : "Activate voice assistant"}
          title={isListening ? "Listening…" : "Voice Assistant"}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        {/* Authentication Menu */}
        {loading ? (
          <div className="h-9 w-20 rounded-lg bg-[#E7E3D8] animate-pulse" />
        ) : user ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-haspopup="true"
              className="flex items-center gap-2 rounded-lg bg-white border border-[#E7E3D8] hover:border-[#D3CDC0] text-[#0F2E24] px-3 py-1.5 text-xs font-bold transition-all shadow-xs"
            >
              <span className="grid place-items-center h-5 w-5 rounded-full bg-[#0F2E24] text-white text-[10px]">
                {initial}
              </span>
              <span className="hidden sm:inline">{nameToShow}</span>
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 mt-2 w-52 rounded-xl border border-[#E7E3D8] bg-white text-[#1B1F1C] shadow-lg overflow-hidden py-1 z-50 text-xs animate-in fade-in zoom-in-95 duration-100"
                role="menu"
              >
                <div className="px-3.5 py-2.5 border-b border-[#F3F1E9] bg-[#FAF9F5]">
                  <p className="text-[10px] uppercase font-bold text-[#787266]">
                    {t("auth.signed_in") || "Signed in"}
                  </p>
                  <p className="font-semibold truncate text-[#0F2E24] mt-0.5">{user.email}</p>
                </div>

                <Link
                  to="/profile"
                  className="flex items-center gap-2 w-full px-3.5 py-2 hover:bg-[#EDF4F0] text-[#0F2E24] font-medium transition-colors"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  <User className="w-3.5 h-3.5 text-[#1C4A3A]" />
                  <span>{t("auth.profile") || "My Profile"}</span>
                </Link>

                <button
                  className="flex items-center gap-2 w-full text-left px-3.5 py-2 hover:bg-[#FAECE9] text-[#C8553D] font-medium border-t border-[#F3F1E9] transition-colors"
                  role="menuitem"
                  onClick={async () => {
                    setMenuOpen(false);
                    await signOut(auth);
                    navigate("/");
                  }}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t("auth.log_out") || "Log out"}</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/auth/login"
            className="px-3.5 py-1.5 rounded-lg bg-[#0F2E24] text-white hover:bg-[#1C4A3A] font-semibold text-xs transition-colors shadow-xs"
          >
            {t("auth.log_in") || "Log in"}
          </Link>
        )}
      </div>
    </header>
  );
}
