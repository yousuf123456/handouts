import { FormattedCurrency } from "@/app/components/FormattedCurrency";
import React from "react";

interface OrderSummaryProps {
  total: number;
  totalQuantity: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  total,
  totalQuantity,
}) => {
  return (
    <div className="h-36 w-full rounded-sm p-4 shadow-whiteCardShadow sm:w-80">
      <div className="flex h-full w-full flex-col justify-between">
        <h1 className="font-text text-base font-medium text-white sm:text-lg">
          Order Summary
        </h1>

        <div className="flex w-full justify-between">
          <h3 className="font-text text-xs text-white">
            {"Subtotal of " + totalQuantity + " items included shipping fee"}
          </h3>
          <p className="flex-shrink-0 font-text text-xs text-white">
            <FormattedCurrency quantity={total} />
          </p>
        </div>

        <div className="flex w-full justify-between">
          <h3 className="font-text text-base font-semibold text-green-500">
            Total Ammount
          </h3>
          <p className="flex-shrink-0 font-text text-base font-semibold text-green-500">
            <FormattedCurrency quantity={total} />
          </p>
        </div>
      </div>
    </div>
  );
};
