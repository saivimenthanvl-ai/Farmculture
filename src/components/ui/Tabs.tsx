import React from "react";

export interface TabsProps {
  tabs: { id: string; label: string; count?: number; icon?: React.ReactNode }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = "",
}) => {
  return (
    <div
      role="tablist"
      className={`flex items-center gap-1 p-1 bg-[#FAF9F5] border border-[#E7E3D8] rounded-xl overflow-x-auto ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap select-none ${
              isActive
                ? "bg-[#0F2E24] text-white shadow-2xs"
                : "text-[#787266] hover:text-[#0F2E24] hover:bg-white"
            }`}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? "bg-[#1C4A3A] text-[#9BE564]"
                    : "bg-[#E7E3D8] text-[#0F2E24]"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
