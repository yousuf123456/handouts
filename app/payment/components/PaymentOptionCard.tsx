import clsx from "clsx";
import React from "react";

import Image from "next/image";

interface PaymentOptionCardProps {
  label: string;
  image: string;
  isSelected: boolean;
  onClick: () => void;
}

export const PaymentOptionCard: React.FC<PaymentOptionCardProps> = ({
  label,
  image,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className="relative flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-center gap-6 rounded-sm bg-white sm:h-36 sm:w-36"
      onClick={onClick}
    >
      <div
        className={clsx(
          "relative overflow-visible",
          label === "Jazzcash"
            ? "h-10 w-20 sm:h-12 sm:w-24"
            : "h-8 w-8 sm:h-12 sm:w-12",
        )}
      >
        <Image src={image} alt="Icon" className="object-fit" fill />
      </div>

      <p className="text-center font-text text-sm font-semibold text-themeSecondary">
        {label}
      </p>

      <div
        className={clsx(
          "absolute -bottom-2 left-0 h-1 bg-blue-500 transition-all",
          isSelected ? "w-full" : "w-0",
        )}
      />
      <div
        className={clsx(
          "absolute -top-2 left-0 h-1 bg-blue-500 transition-all",
          isSelected ? "w-full" : "w-0",
        )}
      />
      <div
        className={clsx(
          "absolute -left-2 bottom-0 w-1 bg-blue-500 transition-all",
          isSelected ? "h-full" : "h-0",
        )}
      />
      <div
        className={clsx(
          "absolute -right-2 bottom-0 w-1 bg-blue-500 transition-all",
          isSelected ? "h-full" : "h-0",
        )}
      />
    </div>
  );
};
