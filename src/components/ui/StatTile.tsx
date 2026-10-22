import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface StatTileProps {
  label: string;
  value: string | number;
  unit?: string;
  delta?: {
    value: string | number;
    isPositive?: boolean;
    neutral?: boolean;
    text?: string;
  };
  subtitle?: string;
  icon?: React.ReactNode;
  sparkline?: number[];
  className?: string;
}

export const StatTile: React.FC<StatTileProps> = ({
  label,
  value,
  unit,
  delta,
  subtitle,
  icon,
  sparkline,
  className = "",
}) => {
  return (
    <div
      className={`agri-card p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden ${className}`}
    >
      {/* Header Label + Icon */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="agri-label">{label}</span>
        {icon && <span className="text-[#1C4A3A] p-1.5 rounded-lg bg-[#EDF4F0]">{icon}</span>}
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
        {delta && (
          <div
            className={`inline-flex items-center gap-1 font-semibold ${
              delta.neutral
                ? "text-[#787266]"
                : delta.isPositive
                ? "text-[#2F9E6B]"
                : "text-[#C8553D]"
            }`}
          >
            {delta.neutral ? (
              <Minus className="w-3.5 h-3.5" />
            ) : delta.isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>{delta.value}</span>
            {delta.text && <span className="text-[#A8A092] font-normal">{delta.text}</span>}
          </div>
        )}
        {subtitle && <span className="text-[#787266] text-[11px] truncate">{subtitle}</span>}
      </div>
    </div>
  );
};
