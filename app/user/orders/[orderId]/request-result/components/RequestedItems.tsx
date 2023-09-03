import React from "react";

import { OrderedProductType } from "@/app/types";
import { OrderRequest_OrderedProductCard } from "../../../components/OrderRequest_OrderedProductCard";

interface RequestedItemsProps {
  orderedProducts: OrderedProductType[];
  process: "pending" | "completed";
}

export const RequestedItems: React.FC<RequestedItemsProps> = ({
  orderedProducts,
  process,
}) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <h3 className="text-center font-text text-base font-semibold text-slate-700">
        {process === "completed"
          ? "Cancelled Items (" + orderedProducts.length + ")"
          : "Requested Items (" + orderedProducts.length + ")"}
      </h3>

      {orderedProducts.map((orderedProduct, i) => (
        <OrderRequest_OrderedProductCard
          key={i}
          hidePrice={true}
          hideStatus={true}
          orderedProduct={orderedProduct}
        />
      ))}
    </div>
  );
};
