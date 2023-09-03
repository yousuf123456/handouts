import React from "react";

import { getOrderRequest } from "@/app/actions/getOrderRequest";
import { SuccessBanner } from "./SuccessBanner";
import { RequestedItems } from "./RequestedItems";
import { OrderedProductType } from "@/app/types";
import { Cta } from "./Cta";

interface RequestResultProps {
  type: "Cancellation" | "Return";
  process: "pending" | "completed";
  requestId: string;
}

export const RequestResult: React.FC<RequestResultProps> = async ({
  requestId,
  process,
  type,
}) => {
  const orderRequest = await getOrderRequest(requestId, type);

  if (!orderRequest) {
    return <p>Sorry no cancellation request with such id was found</p>;
  }

  return (
    <div className="flex flex-col gap-12 sm:px-8 md:px-12 lg:px-24 xl:px-32">
      <SuccessBanner type={type} process={process} />

      <RequestedItems
        orderedProducts={
          orderRequest.orderedProducts as unknown as OrderedProductType[]
        }
        process={process}
      />

      <Cta type={type} requestId={requestId} />
    </div>
  );
};
