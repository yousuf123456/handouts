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
      <Icon className={cn("h-5 w-5 text-black", className)} />

      <p className="font-text text-sm capitalize text-black">{label}</p>
    </div>
  );
};
