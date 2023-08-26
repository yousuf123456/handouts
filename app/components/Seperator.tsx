import React from "react";
import { cn } from "../utils/cn";

interface SeperatorProps {
  className?: string;
}

export const Seperator: React.FC<SeperatorProps> = ({ className }) => {
  return (
    <hr
      className={cn("my-1 h-[1px] w-full border-none bg-slate-300", className)}
    />
  );
};
