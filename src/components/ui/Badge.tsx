import React from "react";

export type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "lime" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className = "",
  ...props
}) => {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px] font-semibold tracking-wide",
    md: "px-2.5 py-1 text-xs font-semibold tracking-wide",
  }[size];

  const variantStyles = {
    default: "bg-[#F3F1E9] text-[#262421] border border-[#E7E3D8]",
    success: "bg-[#EBF8F1] text-[#1E6845] border border-[#BDE7D1]",
    warning: "bg-[#FDF3E3] text-[#9A6216] border border-[#F6D7A6]",
    danger: "bg-[#FAECE9] text-[#8C3421] border border-[#F0BCB2]",
    info: "bg-[#EAF4F3] text-[#28605D] border border-[#B7D7D5]",
    lime: "bg-[#E8F9DC] text-[#2F5712] border border-[#C5F0A4]",
    outline: "bg-transparent text-[#575249] border border-[#D3CDC0]",
  }[variant];

  const dotColors = {
    default: "bg-[#787266]",
    success: "bg-[#2F9E6B]",
    warning: "bg-[#E9A23B]",
    danger: "bg-[#C8553D]",
    info: "bg-[#3E8E8A]",
    lime: "bg-[#3F7517]",
    outline: "bg-[#A8A092]",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full select-none ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors}`} />}
      {children}
    </span>
  );
};
