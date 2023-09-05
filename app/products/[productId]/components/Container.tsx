import { cn } from "@/app/utils/cn";
import React from "react";

export const Container = ({
  id,
  children,
  className,
  noPadding,
  noPaddingOnRes,
  wFit,
}: {
  id?: string;
  children: React.ReactNode;
  noPadding?: boolean;
  className?: string;
  noPaddingOnRes?: boolean;
  wFit?: boolean;
}) => {
  return (
    <div
      id={id}
      className={cn(
        "h-full bg-white lg:drop-shadow-lg",
        noPadding ? "p-0" : !noPaddingOnRes && "p-3 min-[520px]:p-4",
        noPaddingOnRes && "p-0 sm:p-4",
        wFit ? "w-fit" : "w-full",
        className,
      )}
    >
      {children}
    </div>
  );
};
