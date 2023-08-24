import React from "react";
import clsx from "clsx";
import { IconType } from "react-icons";

interface NavigationItemProps {
  label: string;
  Icon: IconType;
  isLast?: boolean;
  className?: string;
  isSelected?: boolean;
  lineClassName?: string;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  Icon,
  label,
  isLast,
  className,
  isSelected,
  lineClassName,
}) => {
  return (
    <div className="flex items-center gap-0">
      <div
        className={clsx(
          "relative z-[99] flex items-center justify-center rounded-full p-2",
          isSelected && "p-3",
          className,
        )}
      >
        <Icon
          className={clsx(
            "h-[18px] w-[18px] text-white sm:h-5 sm:w-5 md:h-6 md:w-6",
            isSelected && "h-[22px] w-[22px] sm:h-6 sm:w-6 md:h-7 md:w-7",
          )}
        />

        <p
          className={clsx(
            "absolute -bottom-6 left-1/2 flex w-[64px] -translate-x-1/2 justify-center whitespace-nowrap font-text text-[10px] font-medium tracking-wide text-white sm:w-32 sm:text-xs",
          )}
        >
          {label}
        </p>
      </div>

      {!isLast && (
        <div
          className={clsx(
            "h-[2px] w-[88px] bg-gradient-to-r min-[400px]:w-28 min-[460px]:w-40 sm:w-52 md:w-64 lg:w-80 xl:w-96",
            lineClassName,
          )}
        />
      )}
    </div>
  );
};
