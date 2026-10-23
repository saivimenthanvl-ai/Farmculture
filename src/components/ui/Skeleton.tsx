import React from "react";

export const Skeleton: React.FC<{
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}> = ({ className = "", variant = "rectangular" }) => {
  const variantClass = {
    text: "h-4 rounded-md",
    circular: "rounded-full",
    rectangular: "rounded-xl",
  }[variant];

  return (
    <div
      className={`animate-pulse bg-[#E7E3D8]/80 ${variantClass} ${className}`}
      aria-hidden="true"
    />
  );
};

export const CardSkeleton: React.FC = () => (
  <div className="agri-card p-5 space-y-3">
    <div className="flex items-center justify-between">
      <Skeleton className="w-24 h-3" variant="text" />
      <Skeleton className="w-6 h-6" variant="circular" />
    </div>
    <Skeleton className="w-32 h-8" variant="text" />
    <Skeleton className="w-full h-2" variant="text" />
  </div>
);
