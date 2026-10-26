import React from "react";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
  disabled?: boolean;
  badge?: string;
  badgeColor?: "green" | "blue" | "amber" | "purple" | "teal" | "lime";
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  onClick,
  disabled = false,
  badge,
  badgeColor = "green",
}) => {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`w-full p-5 bg-white rounded-2xl border border-[#E7E3D8] hover:border-[#9BE564] hover:shadow-sm focus-within:border-[#3F7517] transition-colors duration-150 text-left cursor-pointer flex flex-col justify-between ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2 bg-[#FAF9F5] rounded-lg text-[#1C4A3A] shrink-0">
          <Icon className="w-5 h-5 text-[#1C4A3A]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-[#0F2E24] text-sm tracking-tight">{title}</h3>
            {badge && (
              <span
                className={`text-[11px] font-semibold tracking-normal px-2 py-0.5 rounded-full shrink-0 ${
                  badgeColor === "lime" || badgeColor === "green"
                    ? "bg-[#E8F9DC] text-[#0F2E24] border border-[#9BE564]/50"
                    : badgeColor === "amber"
                    ? "bg-[#FDF4E7] text-[#E9A23B] border border-[#E9A23B]/40"
                    : "bg-[#FAF9F5] text-[#1C4A3A] border border-[#3E8E8A]/40"
                }`}
              >
                {badge}
              </span>
            )}
          </div>
          <p className="text-[#575249] text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;