import React from "react";
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";

export type CalloutVariant = "info" | "warning" | "success" | "danger";

export interface CalloutProps {
  title?: string;
  children: React.ReactNode;
  variant?: CalloutVariant;
  className?: string;
}

export const Callout: React.FC<CalloutProps> = ({
  title,
  children,
  variant = "info",
  className = "",
}) => {
  const config = {
    info: {
      bg: "bg-[#EDF4F0]",
      border: "border-[#BDE7D1]",
      text: "text-[#0F2E24]",
      titleColor: "text-[#0F2E24]",
      icon: Info,
      iconColor: "text-[#1C4A3A]",
    },
    warning: {
      bg: "bg-[#FDF3E3]",
      border: "border-[#F6D7A6]",
      text: "text-[#784708]",
      titleColor: "text-[#623602]",
      icon: AlertTriangle,
      iconColor: "text-[#9A6216]",
    },
    success: {
      bg: "bg-[#EBF8F1]",
      border: "border-[#BDE7D1]",
      text: "text-[#1E6845]",
      titleColor: "text-[#124B30]",
      icon: CheckCircle,
      iconColor: "text-[#2F9E6B]",
    },
    danger: {
      bg: "bg-[#FAECE9]",
      border: "border-[#F0BCB2]",
      text: "text-[#8C3421]",
      titleColor: "text-[#692112]",
      icon: AlertCircle,
      iconColor: "text-[#C8553D]",
    },
  }[variant];

  const Icon = config.icon;

  return (
    <div
      className={`p-4 rounded-xl border ${config.bg} ${config.border} flex items-start gap-3 text-xs leading-relaxed ${className}`}
    >
      <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${config.iconColor}`} />
      <div className="space-y-1">
        {title && <h4 className={`font-bold ${config.titleColor}`}>{title}</h4>}
        <div className={config.text}>{children}</div>
      </div>
    </div>
  );
};
