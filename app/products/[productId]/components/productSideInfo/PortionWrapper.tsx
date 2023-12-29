import { cn } from "@/app/utils/cn";
import React from "react";

interface PortionWrapperProps {
  children: React.ReactNode;
  className?: string;
  portionName: string;
}

export const PortionWrapper: React.FC<PortionWrapperProps> = ({
  children,
  className,
  portionName,
}) => {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <p className="font-roboto text-sm font-medium text-black">
        {portionName}
      </p>
      {children}
    </div>
  );
};
