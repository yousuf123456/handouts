import { cn } from "@/app/utils/cn";
import React from "react";
import { IconType } from "react-icons";

interface ServiceCardProps {
  Icon: IconType;
  label: string;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  Icon,
  label,
  className,
}) => {
  return (
    <div className="flex items-center gap-3">
      <Icon
        className={cn("h-4 w-4 text-themeSecondary md:h-5 md:w-5", className)}
      />

      <p className="text-xs font-medium capitalize text-black sm:text-sm">
        {label}
      </p>
    </div>
  );
};
