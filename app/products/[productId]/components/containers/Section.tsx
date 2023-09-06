import { cn } from "@/lib/utils";
import clsx from "clsx";
import React from "react";

export const Section = ({
  children,
  variant,
  mode,
}: {
  children: React.ReactNode;
  mode: "full" | "padding";
  variant?: "differentiate";
}) => {
  return (
    <div className={cn(mode === "padding" && "max-sm:px-2", "w-full")}>
      <div
        className={cn(
          mode === "full"
            ? "max-sm:bg-white max-sm:px-4 max-sm:py-2"
            : "max-sm:rounded-md max-sm:bg-white max-sm:p-2",
          variant === "differentiate" && "bg-white px-4 py-2 sm:bg-slate-50",
          "w-full",
        )}
      >
        {children}
      </div>
    </div>
  );
};
