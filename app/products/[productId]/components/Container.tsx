import { cn } from "@/app/utils/cn";
import React from "react";

export const Container = ({
  children,
  className,
  noPadding,
  wFit,
}: {
  children: React.ReactNode;
  noPadding?: boolean;
  className?: string;
  wFit?: boolean;
}) => {
  return (
    <div
      className={cn(
        "h-full bg-white drop-shadow-lg",
        noPadding ? "p-0" : "p-4",
        wFit ? "w-fit" : "w-full",
        className,
      )}
    >
      {children}
    </div>
  );
};
