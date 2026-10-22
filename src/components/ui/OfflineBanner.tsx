import React, { useState, useEffect } from "react";
import { WifiOff, X } from "lucide-react";

export const OfflineBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setDismissed(false);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setDismissed(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline || dismissed) return null;

  return (
    <aside
      aria-label="Offline connection alert"
      className="bg-[#C8553D] text-white px-4 py-2 text-xs font-semibold flex items-center justify-between sticky top-16 z-50 animate-in slide-in-from-top duration-200"
    >
      <div className="flex items-center gap-2 max-w-7xl mx-auto flex-1">
        <WifiOff className="w-4 h-4 shrink-0" />
        <span>
          <strong>Offline Mode:</strong> Internet connection lost. Farm data and cached mandi prices remain available locally via Progressive Web App storage.
        </span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="p-1 text-white/80 hover:text-white rounded-md"
        aria-label="Dismiss offline banner"
      >
        <X className="w-4 h-4" />
      </button>
    </aside>
  );
};

export default OfflineBanner;
