import React from "react";
import { Button } from "./Button";
import clsx from "clsx";

interface MobileTotalProps {
  theme?: "native" | "green";
  subTotal: number;
  buttonLabel: string;
  onClick: () => void;
  productsAmmount: number;
}

export const MobileTotal: React.FC<MobileTotalProps> = ({
  buttonLabel,
  theme,
  productsAmmount,
  subTotal,
  onClick,
}) => {
  const bgColor = theme === "green" ? "bg-slate-900" : "bg-white";
  const textColor = theme === "green" ? "text-white" : "text-black";
  const priceColor = theme === "green" ? "text-green-500" : "text-themeBlue";

  return (
    <div
      className={clsx(
        "fixed bottom-0 left-0 right-0 z-[999] h-16 shadow-panelFootersShadow md:hidden",
        bgColor,
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 min-[420px]:px-8 sm:px-16">
        <div className="flex flex-col gap-0">
          <div className="relative -bottom-[2px] flex items-center gap-2">
            <p className={clsx("font-text text-xs font-light", textColor)}>
              Delievery:
            </p>
            <p className={clsx("text-xs", priceColor)}>Rs, {150}</p>
          </div>

          <div className="flex items-center gap-2">
            <h4 className={clsx("font-sans text-lg font-medium", textColor)}>
              Total:
            </h4>
            <h4 className={clsx("font-sans text-lg font-medium", priceColor)}>
              Rs, {subTotal + 150}
            </h4>
          </div>
        </div>

        <Button
          onClick={onClick}
          className={clsx(
            theme === "green" && "bg-green-500 hover:bg-green-500",
          )}
        >
          {buttonLabel} {"(" + productsAmmount + ")"}
        </Button>
      </div>
    </div>
  );
};
