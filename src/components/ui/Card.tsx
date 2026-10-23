import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "subtle";
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const variantStyles = {
    default: "bg-white border border-[#E7E3D8] shadow-xs",
    elevated: "bg-white border border-[#E7E3D8] shadow-md",
    subtle: "bg-[#FAF9F5] border border-[#E7E3D8]",
  }[variant];

  return (
    <div
      className={`rounded-2xl transition-all duration-150 ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <div className={`p-5 sm:p-6 pb-3 border-b border-[#F3F1E9] space-y-1 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <h3 className={`text-base font-bold text-[#0F2E24] font-display tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <p className={`text-xs text-[#787266] leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <div className={`p-5 sm:p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <div className={`p-4 sm:p-5 pt-3 border-t border-[#F3F1E9] bg-[#FAF9F5] rounded-b-2xl flex items-center justify-between ${className}`} {...props}>
    {children}
  </div>
);
