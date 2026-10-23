import React from "react";
import { AlertCircle, RefreshCw, FolderSearch } from "lucide-react";
import { Button } from "./Button";

export interface EmptyStateProps {
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: IconProp,
  title,
  description,
  action,
  className = "",
}) => {
  const renderedIcon = React.isValidElement(IconProp)
    ? IconProp
    : typeof IconProp === "function"
    ? React.createElement(IconProp as React.ComponentType<{ className?: string }>, {
        className: "w-8 h-8 text-[#A8A092]",
      })
    : <FolderSearch className="w-8 h-8 text-[#A8A092]" />;

  return (
    <div
      className={`p-8 sm:p-12 text-center rounded-2xl border-2 border-dashed border-[#D3CDC0] bg-[#FAF9F5] flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-white border border-[#E7E3D8] flex items-center justify-center shadow-2xs">
        {renderedIcon}
      </div>
      <div className="max-w-sm space-y-1">
        <h4 className="text-sm font-bold text-[#0F2E24]">{title}</h4>
        <p className="text-xs text-[#787266] leading-relaxed">{description}</p>
      </div>
      {action && (
        <Button
          variant="primary"
          size="sm"
          onClick={action.onClick}
          icon={action.icon}
          className="mt-2"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "An Error Occurred",
  message,
  onRetry,
  className = "",
}) => {
  return (
    <div
      className={`p-6 text-center rounded-2xl border border-[#C8553D]/30 bg-[#FAECE9] flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <div className="w-10 h-10 rounded-xl bg-white border border-[#C8553D]/40 text-[#C8553D] flex items-center justify-center">
        <AlertCircle className="w-5 h-5" />
      </div>
      <div className="max-w-md space-y-1">
        <h4 className="text-sm font-bold text-[#0F2E24]">{title}</h4>
        <p className="text-xs text-[#787266] leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          icon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Retry Request
        </Button>
      )}
    </div>
  );
};
