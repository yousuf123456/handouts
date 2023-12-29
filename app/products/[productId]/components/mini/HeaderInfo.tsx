import clsx from "clsx";
import { format } from "date-fns";
import React from "react";

interface HeaderInfoProps {
  date: string;
  name: string;
  className?: string;
}

export const HeaderInfo: React.FC<HeaderInfoProps> = ({
  date,
  name,
  className,
}) => {
  const ClassName =
    "text-[11px] flex-shrink-0 leading-[16px] md:text-xs font-text font-medium text-slate-600";

  return (
    <div className="flex gap-3">
      <p className={clsx(className, ClassName)}>{name}</p>

      <p className={clsx(className, ClassName)}>
        {format(new Date(date), "dd-MMM")}
      </p>
    </div>
  );
};
