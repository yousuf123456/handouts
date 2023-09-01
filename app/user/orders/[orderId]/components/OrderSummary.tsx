import React from "react";
import { OrderSummaryInfo } from "./OrderSummaryInfo";
import { Seperator } from "@/app/components/Seperator";

interface OrderSummaryProps {
  total: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ total }) => {
  return (
    <div className="flex flex-shrink-0 flex-grow flex-col gap-1 max-lg:w-full max-sm:items-center">
      <h3 className="font-text text-sm font-semibold text-black">
        Order Summary
      </h3>

      <div className="flex flex-col gap-2 rounded-sm p-3 shadow-cardShadow max-sm:w-full md:px-[10%] lg:px-3">
        <div className="flex flex-col gap-3">
          <OrderSummaryInfo Key="Subtotal" value={total} isTotal={false} />

          <OrderSummaryInfo Key="Delievery" value={150} isTotal={false} />
        </div>

        <Seperator />

        <OrderSummaryInfo Key="Total" value={total + 150} isTotal={true} />
      </div>
    </div>
  );
};
