import React from "react";
import { priceLabel } from "../utils/priceLabel";
import clsx from "clsx";
import { FormattedCurrency } from "./FormattedCurrency";
import { cn } from "../utils/cn";

interface ProductPriceProps {
  discountOff: () => number | null | undefined;
  isPercentOff: boolean | null | undefined;
  discountLabelsClassName?: string;
  productOnSale: () => boolean;
  price: number | undefined;
  discountOffLabel: any;
  containerCs?: string;
  className?: string;
  mode?: "flex-col";
}

export const ProductPrice: React.FC<ProductPriceProps> = ({
  productOnSale,
  discountOff,
  isPercentOff,
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
        "flex gap-2 max-sm:items-end sm:flex-col sm:gap-0",
        containerCs,
      )}
    >
      <h1
        className={cn(
          "font-heading text-xl font-medium text-themeBlue max-sm:leading-none sm:text-2xl lg:text-3xl",
          mode && "flex w-full justify-end",
          className,
        )}
      >
        <FormattedCurrency
          quantity={priceLabel(
            productOnSale(),
            isPercentOff,
            discountOff(),
            price,
          )}
        />
      </h1>

      {productOnSale() && (
        <div
          className={clsx(
            "flex items-end",
            mode ? "flex-col items-end gap-0" : "gap-2",
          )}
        >
          <p
            className={clsx(
              "font-text text-xs font-bold text-slate-500 sm:text-sm",
              discountLabelsClassName,
            )}
          >
            <s>
              <FormattedCurrency quantity={price!} />
            </s>
          </p>

          <p
            className={clsx(
              "font-text text-xs font-bold text-rose-600 sm:text-sm",
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
