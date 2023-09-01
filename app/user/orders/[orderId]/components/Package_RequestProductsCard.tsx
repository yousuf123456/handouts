import React from "react";

import {
  CancellationRequestType,
  OrderedProductType,
  PackageType,
  ReturnRequestType,
  StatusType,
  cancellationSteps,
  returnSteps,
} from "@/app/types";
import { OrderProgressTracker } from "./OrderProgressTracker";
import { PackageCardHeader } from "./PackageCardHeader";
import { PackageProductsList } from "./PackageProductsList";

interface Package_RequestProductsCardProps {
  Package?: PackageType;
  packageNumber?: number;
  isOrderRequest?: boolean;
  orderRequestType?: "Cancellation" | "Return";
  request?: CancellationRequestType | ReturnRequestType;
}

export const Package_RequestProductsCard: React.FC<
  Package_RequestProductsCardProps
> = ({ request, Package, packageNumber, isOrderRequest, orderRequestType }) => {
  const orderedProducts =
    (Package?.orderedProducts as unknown as OrderedProductType[]) ||
    request?.orderedProducts;

  const packageInCancellationProcess = cancellationSteps.includes(
    Package?.status || "",
  );
  const packageInReturnProcess = returnSteps.includes(Package?.status || "");

  const isDelievered = Package?.status === "Delievered";

  const returnRequest = request as ReturnRequestType;
  const packageStatus = isOrderRequest
    ? (request?.status as StatusType)
    : (Package?.status as StatusType);

  return (
    <div className="w-full rounded-sm border-[1px] border-slate-300 p-3">
      <div className="flex w-full flex-col gap-8">
        {!isOrderRequest && (
          <PackageCardHeader
            hideTimeline={
              packageInCancellationProcess || packageInReturnProcess
            }
            packageStatus={packageStatus}
            storeName={orderedProducts[0].product.storeName}
            delieveredAt={Package?.delieveredAt}
            packageNumber={packageNumber}
            isDelievered={isDelievered}
          />
        )}

        {!packageInCancellationProcess && !packageInReturnProcess && (
          <OrderProgressTracker
            approved={!!returnRequest?.approved}
            rejected={!!returnRequest?.rejected}
            status={Package?.status as StatusType}
            orderRequestStatus={request?.status}
            orderRequestType={orderRequestType}
            isOrderRequest={isOrderRequest}
          />
        )}

        <PackageProductsList
          packageOrderedProducts={orderedProducts}
          isOrderRequest={isOrderRequest}
          isDelievered={isDelievered}
          request={request}
        />
      </div>
    </div>
  );
};
