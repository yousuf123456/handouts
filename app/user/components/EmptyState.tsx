import React from "react";
import { IconType } from "react-icons";

interface EmptyStateProps {
  Icon: IconType;
  label: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ Icon, label }) => {
  return (
    <div className="mt-6 flex h-full w-full flex-col items-center justify-center gap-3 sm:mt-4 sm:gap-4 md:gap-6">
      <Icon className="h-9 w-9  text-slate-400 sm:h-10 sm:w-10 md:h-12 md:w-12" />

      <h1 className="text-center font-text text-base font-semibold capitalize text-slate-500 sm:text-lg md:text-xl">
        {label}
      </h1>
    </div>
  );
};
