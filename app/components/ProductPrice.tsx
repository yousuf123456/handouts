import React from "react";
import clsx from "clsx";
import { FormattedCurrency } from "./FormattedCurrency";
import { cn } from "../utils/cn";

interface ProductPriceProps {
  discountOff: number | null | undefined;
  discountLabelsClassName?: string;
  price: number | undefined;
  productOnSale: boolean;
  discountOffLabel: any;
  currentprice: number;
  containerCs?: string;
  className?: string;
  mode?: "flex-col";
}

export const ProductPrice: React.FC<ProductPriceProps> = ({
  productOnSale,
  discountOff,
  currentprice,
  price,
  discountOffLabel,
  className,
  discountLabelsClassName,
  containerCs,
  mode,
}) => {
  return (
    <div
      className={cn(
        "flex-col gap-2 max-sm:items-end sm:flex-col sm:gap-0",
        containerCs,
      )}
    >
      <h1
        className={cn(
          "font-roboto text-xl font-medium text-themeBlue max-sm:leading-none sm:text-2xl lg:text-3xl",
          mode && "flex w-full sm:justify-end",
          className,
        )}
      >
        <FormattedCurrency quantity={currentprice} />
      </h1>

      {productOnSale && (
        <div
          className={clsx(
            "flex sm:items-end",
            mode ? "flex-col gap-0 sm:items-end" : "gap-2",
          )}
        >
          <p
            className={clsx(
              "font-roboto text-xs font-bold text-slate-500 sm:text-sm",
              discountLabelsClassName,
            )}
          >
            <s>
              <FormattedCurrency quantity={price!} />
            </s>
          </p>

          <p
            className={clsx(
              "font-roboto text-xs font-bold text-rose-600 sm:text-sm",
              discountLabelsClassName,
            )}
          >
            {discountOffLabel}
          </p>
        </div>
      )}
    </div>
  );
};
