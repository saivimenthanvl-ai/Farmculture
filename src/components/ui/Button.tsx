import React from "react";
import { Loader2 } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "accent";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3E8E8A] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2.5",
  }[size];

  const variantStyles = {
    primary:
      "bg-[#0F2E24] text-white hover:bg-[#1C4A3A] active:bg-[#0A2019] shadow-xs border border-[#0F2E24]",
    accent:
      "bg-[#9BE564] text-[#0F2E24] font-semibold hover:bg-[#8BD952] active:bg-[#7DC845] shadow-xs border border-[#8BD952]",
    secondary:
      "bg-white text-[#1B1F1C] border border-[#E7E3D8] hover:bg-[#FAF9F5] hover:border-[#D3CDC0] active:bg-[#F3F1E9] shadow-xs",
    ghost:
      "bg-transparent text-[#1B1F1C] hover:bg-[#F3F1E9] active:bg-[#E7E3D8]",
    danger:
      "bg-[#C8553D] text-white hover:bg-[#B3462F] active:bg-[#9E3924] shadow-xs border border-[#B3462F]",
  }[variant];

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
};
