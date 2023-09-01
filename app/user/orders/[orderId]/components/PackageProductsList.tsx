import React from "react";

import {
  CancellationRequestType,
  OrderedProductType,
  ReturnRequestType,
} from "@/app/types";
import { OrderRequest_OrderedProductCard } from "../../components/OrderRequest_OrderedProductCard";
import { CancellationRequest } from "@prisma/client";
import clsx from "clsx";

interface PackageProductsListProps {
  request?: CancellationRequestType | ReturnRequestType;
  packageOrderedProducts: OrderedProductType[];
  isOrderRequest?: boolean;
  isDelievered: boolean;
}

export const PackageProductsList: React.FC<PackageProductsListProps> = ({
  packageOrderedProducts,
  isOrderRequest,
  isDelievered,
  request,
}) => {
  const showReason = request?.status === "Cancelled";

  return (
    <div className="flex flex-col gap-3">
      {packageOrderedProducts.map((orderedProduct, i) => (
        <div
          className={clsx(
            isDelievered
              ? "pr-0 md:pr-4 lg:pr-8"
              : "pr-0 md:pr-4 lg:pr-[72px] xl:pr-24",
          )}
          key={i}
        >
          <OrderRequest_OrderedProductCard
            reason={orderedProduct.cancellationReason}
            showCancelButton={!isOrderRequest}
            orderedProduct={orderedProduct}
            hideCancelButton={isDelievered}
            showOnlyRequestStatus={true}
            isDelievered={isDelievered}
            showReason={showReason}
          />
        </div>
      ))}
    </div>
  );
};
