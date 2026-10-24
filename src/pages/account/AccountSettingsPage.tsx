import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  AlertTriangle,
  Trash2,
  Lock,
  Loader2,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocalization } from "@/contexts/LocalizationContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Dialog } from "@/components/ui/Dialog";
import {
  executeCompleteAccountDeletion,
  reauthenticateWithPassword,
  reauthenticateWithGoogle,
  DeletionProgress,
} from "@/lib/accountDeletionService";

export const AccountSettingsPage: React.FC = () => {
  const { user, profile, friendlyName, authoritativeEmail, loading } = useAuth();
  const { t } = useLocalization();
  const navigate = useNavigate();

  // Deletion Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [confirmationInput, setConfirmationInput] = useState("");
  const [isReauthModalOpen, setIsReauthModalOpen] = useState(false);
  const [reauthPassword, setReauthPassword] = useState("");
  const [isReauthenticating, setIsReauthenticating] = useState(false);
  const [reauthError, setReauthError] = useState<string | null>(null);

  // Deletion Execution State
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletionProgress, setDeletionProgress] = useState<DeletionProgress | null>(null);
  const [deletionError, setDeletionError] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <Loader2 className="w-8 h-8 text-[#1C4A3A] animate-spin mx-auto mb-3" />
        <p className="text-xs text-[#787266]">Loading account settings...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const memberSince = user.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : "Verified Member";

  const isPasswordUser = user.providerData.some((p) => p.providerId === "password");
  const isGoogleUser = user.providerData.some((p) => p.providerId === "google.com");

  // Handle Initial Deletion Trigger
  const handleInitiateDeletion = async () => {
    if (confirmationInput.trim().toUpperCase() !== "DELETE") {
      return;
    }

    setIsDeleting(true);
    setDeletionError(null);

    const res = await executeCompleteAccountDeletion(user, (progress) => {
      setDeletionProgress(progress);
    });

    if (res.success) {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      navigate("/");
    } else {
      setIsDeleting(false);
      // Check if reauthentication is required by Firebase
      if (
        res.error?.includes("requires-recent-login") ||
        res.error?.includes("CREDENTIAL_TOO_OLD_LOGIN_AGAIN")
      ) {
        setIsDeleteModalOpen(false);
        setIsReauthModalOpen(true);
      } else {
        setDeletionError(res.error || t("account.deletionFailed"));
      }
    }
  };

  // Handle Password Reauthentication
  const handlePasswordReauth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reauthPassword.trim()) return;

    setIsReauthenticating(true);
    setReauthError(null);

    try {
      await reauthenticateWithPassword(user, reauthPassword);
      setIsReauthModalOpen(false);
      setReauthPassword("");
      // Reopen deletion modal to proceed with fresh token
      setIsDeleteModalOpen(true);
    } catch (err: any) {
      console.error("[AccountSettings] Reauth error:", err);
      setReauthError(err?.message || "Invalid credentials. Please re-enter your password.");
    } finally {
      setIsReauthenticating(false);
    }
  };

  // Handle Google Reauthentication
  const handleGoogleReauth = async () => {
    setIsReauthenticating(true);
    setReauthError(null);

    try {
      await reauthenticateWithGoogle(user);
      setIsReauthModalOpen(false);
      setIsDeleteModalOpen(true);
    } catch (err: any) {
      console.error("[AccountSettings] Google reauth error:", err);
      setReauthError(err?.message || "Google authentication failed. Please try again.");
    } finally {
      setIsReauthenticating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-[#0F2E24] py-4">
      {/* Page Header */}
      <div className="space-y-1 pb-4 border-b border-[#E7E3D8]">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-[#0F2E24]">
          {t("account.settings")}
        </h1>
        <p className="text-xs sm:text-sm text-[#787266]">
          {t("account.profileSubtitle")}
        </p>
      </div>

      {/* Profile Overview Card */}
      <section className="agri-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-[#E7E3D8]">
          <User className="w-5 h-5 text-[#1C4A3A]" />
          <h2 className="text-base font-bold text-[#0F2E24]">
            {t("account.profileInfo")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#787266]">
              {t("account.displayName")}
            </span>
            <div className="text-sm font-bold text-[#0F2E24]">
              {friendlyName || user.displayName || "Cultivator"}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#787266]">
              {t("account.emailAddress")}
            </span>
            <div className="text-sm font-mono font-bold text-[#0F2E24] truncate">
              {authoritativeEmail || profile?.email || user.email || t("account.noEmailLinked") || "No email linked"}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#787266]">
              {t("account.joinedDate")}
            </span>
            <div className="text-sm font-semibold text-[#0F2E24] flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#1C4A3A]" />
              <span>{memberSince}</span>
            </div>
          </div>
        </div>
      </section>

      {/* DANGER ZONE — Clearly separated from normal actions */}
      <section className="rounded-2xl border-2 border-[#C8553D]/40 bg-[#FFF9F8] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#C8553D]/20">
          <div className="flex items-center gap-2 text-[#C8553D]">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="text-base font-extrabold tracking-wide uppercase">
              {t("account.dangerZone")}
            </h2>
          </div>
          <Badge variant="danger">{t("account.deleteAccount")}</Badge>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-sm font-bold text-[#0F2E24]">
              {t("account.deleteAccount")}
            </h3>
            <p className="text-xs text-[#787266] leading-relaxed">
              {t("account.deleteDesc")}
            </p>
          </div>

          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setConfirmationInput("");
              setDeletionError(null);
              setIsDeleteModalOpen(true);
            }}
            icon={<Trash2 className="w-4 h-4" />}
            className="shrink-0 font-bold"
          >
            {t("account.deleteButton")}
          </Button>
        </div>
      </section>

      {/* MODAL 1: PERMANENT ACCOUNT DELETION CONFIRMATION */}
      <Dialog
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        title={t("account.dialogTitle")}
        description={t("account.dialogDesc")}
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              disabled={isDeleting}
              onClick={() => setIsDeleteModalOpen(false)}
            >
              {t("account.cancel")}
            </Button>
            <Button
              variant="danger"
              size="sm"
              disabled={confirmationInput.trim().toUpperCase() !== "DELETE" || isDeleting}
              loading={isDeleting}
              onClick={handleInitiateDeletion}
              icon={<Trash2 className="w-4 h-4" />}
            >
              {t("account.confirmDelete")}
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs text-[#0F2E24]">
          {/* Data Expunged Notice */}
          <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E7E3D8] space-y-2">
            <span className="font-bold text-[#0F2E24] block">
              {t("account.dataDeletedNotice")}
            </span>
            <ul className="list-disc pl-4 space-y-1 text-[#787266]">
              <li>{t("account.itemFarms")}</li>
              <li>{t("account.itemCrops")}</li>
              <li>{t("account.itemPhotos")}</li>
              <li>{t("account.itemReviews")}</li>
            </ul>
          </div>

          {/* Legal Retention Disclosure */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-[#FAF9F5] border border-[#E7E3D8] text-[11px] text-[#787266]">
            <ShieldAlert className="w-4 h-4 text-[#E9A23B] shrink-0 mt-0.5" />
            <span>{t("account.retentionExceptions")}</span>
          </div>

          {/* Dynamic Progress indicator during active deletion */}
          {isDeleting && (
            <div className="p-3 rounded-xl bg-[#EDF4F0] border border-[#BDE7D1] flex items-center gap-2.5 text-xs text-[#1C4A3A]">
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              <span>{deletionProgress?.details || t("account.deleting")}</span>
            </div>
          )}

          {/* Deletion Error Feedback */}
          {deletionError && (
            <div className="p-3 rounded-xl bg-[#FFF2F0] border border-[#F3CEC9] text-[#C8553D] font-semibold text-xs">
              {deletionError}
            </div>
          )}

          {/* Strict Typed Confirmation */}
          <div className="space-y-1.5 pt-2 border-t border-[#E7E3D8]">
            <label className="agri-label block font-bold">
              {t("account.typeDeletePrompt")}
            </label>
            <input
              type="text"
              value={confirmationInput}
              onChange={(e) => setConfirmationInput(e.target.value)}
              disabled={isDeleting}
              placeholder="DELETE"
              className="w-full px-3 py-2 rounded-xl border border-[#D3CDC0] bg-white font-mono font-bold text-xs text-[#C8553D] focus:outline-none focus:ring-2 focus:ring-[#C8553D]"
            />
          </div>
        </div>
      </Dialog>

      {/* MODAL 2: REAUTHENTICATION PROMPT */}
      <Dialog
        isOpen={isReauthModalOpen}
        onClose={() => !isReauthenticating && setIsReauthModalOpen(false)}
        title={t("account.reauthRequired")}
        description={t("account.reauthDesc")}
      >
        <div className="space-y-4 text-xs">
          {reauthError && (
            <div className="p-3 rounded-xl bg-[#FFF2F0] border border-[#F3CEC9] text-[#C8553D] font-semibold">
              {reauthError}
            </div>
          )}

          {isPasswordUser && (
            <form onSubmit={handlePasswordReauth} className="space-y-3">
              <div>
                <label className="agri-label block mb-1">
                  {t("account.enterPassword")}
                </label>
                <input
                  type="password"
                  required
                  value={reauthPassword}
                  onChange={(e) => setReauthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-xl border border-[#D3CDC0] bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1C4A3A]"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsReauthModalOpen(false)}
                  disabled={isReauthenticating}
                >
                  {t("account.cancel")}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  loading={isReauthenticating}
                  icon={<Lock className="w-3.5 h-3.5" />}
                >
                  {t("account.reauthPassword")}
                </Button>
              </div>
            </form>
          )}

          {isGoogleUser && (
            <div className="space-y-3 pt-2">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={handleGoogleReauth}
                loading={isReauthenticating}
              >
                {t("account.reauthGoogle")}
              </Button>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default AccountSettingsPage;
