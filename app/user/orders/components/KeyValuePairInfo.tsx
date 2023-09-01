import clsx from "clsx";
import { format } from "date-fns";
import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface KeyValuePairInfoProps {
  Key: string;
  value: string | Date | null;
  Icon?: IconType;
  keyClassName?: string;
  valueClassName?: string;
}

export const KeyValuePairInfo: React.FC<KeyValuePairInfoProps> = ({
  Key,
  value,
  Icon,
  keyClassName,
  valueClassName,
}) => {
  if (!value) return;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-1">
        {Icon ? (
          <Icon className=" h-[14px] w-[14px] text-green-500 md:h-4 md:w-4" />
        ) : null}
        <p className={twMerge(clsx("text-sm text-slate-500", keyClassName))}>
          {Key}
        </p>
      </div>

      {typeof value !== "string" ? (
        <p className={clsx("text-sm text-black", valueClassName)}>
          {format(value, "do MMMM Y HH:mm")}
        </p>
      ) : (
        <p className={clsx("font-text text-sm text-black", valueClassName)}>
          {value}
        </p>
      )}
    </div>
  );
};
