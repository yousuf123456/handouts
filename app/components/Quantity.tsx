import React from "react";
import { Button } from "./Button";
import clsx from "clsx";
import { cn } from "../utils/cn";

interface QuantityProps {
  quantity: number;
  isCartItem?: boolean;
  setQuantity?: React.Dispatch<React.SetStateAction<number>>;
  onIncrease?: (didDecrement: boolean) => void;
  onDecrease?: (didDecrement: boolean) => void;
}

export const Quantity: React.FC<QuantityProps> = ({
  quantity,
  isCartItem,
  setQuantity,
  onIncrease,
  onDecrease,
}) => {
  const quantityButtonsCs = cn(
    "flex justify-center items-center w-6 h-6 p-[3px] sm:w-7 sm:h-7 sm:p-1 font-text text-xs sm:text-base bg-white text-black hover:bg-slate-100 rounded-[3px]",
  );

  const onQuantityIncrease = () => {
    if (setQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const onQuantityDecrease = () => {
    if (setQuantity) {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  return (
    <div className="flex gap-1">
      <Button
        disabled={quantity === 1}
        className={cn(
          quantityButtonsCs,
          quantity === 1 && "cursor-not-allowed opacity-50 hover:bg-slate-200",
        )}
        onClick={() => {
          if (isCartItem && onDecrease) {
            onDecrease(true);
          } else onQuantityDecrease();
        }}
      >
        -
      </Button>

      <div className="flex h-5 w-5 items-center justify-center rounded-[3px] bg-white sm:h-6 sm:w-9 sm:bg-slate-100">
        <p className="font-roboto text-sm text-black sm:text-base">
          {quantity}
        </p>
      </div>

      <Button
        className={quantityButtonsCs}
        onClick={() => {
          if (isCartItem && onIncrease) {
            onIncrease(false);
          } else onQuantityIncrease();
        }}
      >
        +
      </Button>
    </div>
  );
};
