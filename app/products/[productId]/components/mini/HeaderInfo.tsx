import clsx from "clsx";
import { format } from "date-fns";
import React from "react";

interface HeaderInfoProps {
  date: Date;
  name: string;
  className?: string;
}

export const HeaderInfo: React.FC<HeaderInfoProps> = ({
  date,
  name,
  className,
}) => {
  const ClassName = "text-xs font-text font-medium text-slate-600";

  return (
    <div className="flex gap-3">
      <p className={clsx(className, ClassName)}>{name}</p>

      <p className={clsx(className, ClassName)}>
        {typeof date === "object" ? format(date, "do /MMMM/ Y") : "Just now"}
      </p>
    </div>
  );
};
