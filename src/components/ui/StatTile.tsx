import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface StatTileProps {
  label?: string;
  title?: string;
  value: string | number;
  unit?: string;
  delta?:
    | string
    | {
        value: string | number;
        isPositive?: boolean;
        neutral?: boolean;
        text?: string;
      };
  deltaType?: "increase" | "decrease" | "neutral";
  subtitle?: string;
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  sparkline?: number[];
  className?: string;
}

export const StatTile: React.FC<StatTileProps> = ({
  label,
  title,
  value,
  unit,
  delta,
  deltaType = "neutral",
  subtitle,
  icon: IconProp,
  sparkline,
  className = "",
}) => {
  const displayLabel = title || label || "";

  // Render icon whether it's a ReactNode or a ComponentType
  const renderedIcon = React.isValidElement(IconProp)
    ? IconProp
    : typeof IconProp === "function"
    ? React.createElement(IconProp as React.ComponentType<{ className?: string }>, { className: "w-4 h-4" })
    : null;

  const deltaObj =
    typeof delta === "string"
      ? {
          value: delta,
          isPositive: deltaType === "increase",
          neutral: deltaType === "neutral",
        }
      : delta;
  return (
    <div
      className={`agri-card p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden ${className}`}
    >
      {/* Header Label + Icon */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="agri-label">{displayLabel}</span>
        {renderedIcon && <span className="text-[#1C4A3A] p-1.5 rounded-lg bg-[#EDF4F0]">{renderedIcon}</span>}
      </div>

      {/* Numerical Value + Unit */}
      <div className="flex items-baseline gap-1.5 my-1">
        <span className="text-3xl font-extrabold text-[#0F2E24] tracking-tight tabular-nums font-display">
          {value}
        </span>
        {unit && <span className="text-sm font-medium text-[#787266]">{unit}</span>}
      </div>

      {/* Delta indicator + Subtitle */}
      <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-[#F3F1E9] text-xs">
        {deltaObj && (
          <div
            className={`inline-flex items-center gap-1 font-semibold ${
              deltaObj.neutral
                ? "text-[#787266]"
                : deltaObj.isPositive
                ? "text-[#2F9E6B]"
                : "text-[#C8553D]"
            }`}
          >
            {deltaObj.neutral ? (
              <Minus className="w-3.5 h-3.5" />
            ) : deltaObj.isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>{deltaObj.value}</span>
            {deltaObj.text && <span className="text-[#A8A092] font-normal">{deltaObj.text}</span>}
          </div>
        )}
        {subtitle && <span className="text-[#787266] text-[11px] truncate">{subtitle}</span>}
      </div>
    </div>
  );
};
