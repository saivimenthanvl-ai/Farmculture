import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
  disabled?: boolean;
  badge?: string;
  badgeColor?: "green" | "blue" | "amber" | "purple";
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  onClick, 
  disabled = false,
  badge,
  badgeColor = "green"
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-left border-2 border-transparent ${
        disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:border-green-200 hover:scale-105 active:scale-95'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-green-100 rounded-lg">
          <Icon className="w-6 h-6 text-green-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
            {badge && (
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                badgeColor === "green" ? "bg-emerald-100 text-emerald-800 border border-emerald-300" :
                badgeColor === "blue" ? "bg-blue-100 text-blue-800 border border-blue-300" :
                badgeColor === "purple" ? "bg-purple-100 text-purple-800 border border-purple-300" :
                "bg-amber-100 text-amber-800 border border-amber-300"
              }`}>
                {badge}
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </button>
  );
};