import React, { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { Button } from "./Button";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = "md",
}) => {
  if (!isOpen) return null;

  const widthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  }[maxWidth];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div
        className={`bg-white rounded-2xl border border-[#E7E3D8] shadow-2xl w-full ${widthClass} overflow-hidden animate-in zoom-in-95 duration-150`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-5 border-b border-[#E7E3D8] bg-[#FAF9F5]">
          <div>
            <h3 id="dialog-title" className="text-base font-bold text-[#0F2E24]">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-[#787266] mt-0.5">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#787266] hover:text-[#0F2E24] hover:bg-[#E7E3D8]/50 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-2.5 p-4 border-t border-[#E7E3D8] bg-[#FAF9F5]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  loading?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDestructive = false,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={loading ? () => {} : onClose}
      title={title}
      maxWidth="sm"
      footer={
        <>
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={isDestructive ? "danger" : "primary"}
            size="sm"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-3">
        {isDestructive && (
          <div className="p-2 bg-[#FAECE9] rounded-xl text-[#C8553D] shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
        )}
        <p className="text-xs text-[#787266] leading-relaxed mt-0.5">{message}</p>
      </div>
    </Dialog>
  );
};
