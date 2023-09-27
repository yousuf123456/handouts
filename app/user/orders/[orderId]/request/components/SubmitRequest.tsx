"use client";
import React, { useState } from "react";

import { LoadingButton } from "@/app/components/LoadingButton";
import { useAppSelector } from "@/app/store/store";
import { PackageType } from "@/app/types";
import { getUpdatedPackages } from "@/app/utils/getUpdatedPackages";
import { useRouter } from "next/navigation";

import axios from "axios";
import { find, includes } from "lodash";

interface SubmitRequestProps {
  packages: PackageType[];
  orderId: string;
  type: "Cancellation" | "Return";
}

export const SubmitRequest: React.FC<SubmitRequestProps> = ({
  packages,
  orderId,
  type,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const selectedOrderedProducts = useAppSelector(
    (state) => state.orderRequests.selectedOrderedProducts,
  );
  const isAgreedToPolicies = useAppSelector(
    (state) => state.orderRequests.isAgreedToPolicies,
  );
  const proofImages = useAppSelector(
    (state) => state.orderRequests.proofImages,
  );
  const feedback = useAppSelector((state) => state.orderRequests.feedback);

  const reasonNotGiven = selectedOrderedProducts.filter(
    (orderedProduct) => orderedProduct.reason.length === 0,
  );

  const router = useRouter();

  const onClick = () => {
    const { updatedOrderedProducts, updatedPackagesWithUpdatedStatus } =
      getUpdatedPackages(packages, selectedOrderedProducts, type);

    let storeIds: { id: string }[] = [];

    updatedOrderedProducts.map((orderedProduct) => {
      if (find(storeIds, { id: orderedProduct.storeId })) return;
      storeIds.push({ id: orderedProduct.storeId });
    });

    setIsLoading(true);
    axios
      .post("../../../../../api/orderRequest", {
        updatedPackages: updatedPackagesWithUpdatedStatus,
        updatedOrderedProducts: updatedOrderedProducts,
        orderFeedback: feedback,
        proofImages: proofImages,
        storeIds: storeIds,
        orderId: orderId,
        type: type,
      })
      .then((res) => {
        router.push(
          `/user/orders/${orderId}/request-result?type=${type}&requestId=${res.data.requestId}&process=${res.data.process}`,
        );
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const disabled =
    !isAgreedToPolicies ||
    !selectedOrderedProducts.length ||
    reasonNotGiven.length > 0;

  return (
    <div className="flex w-full justify-end">
      <LoadingButton
        onClick={onClick}
        disabled={isLoading || disabled}
        isLoading={isLoading}
      >
        Submit Request
      </LoadingButton>
    </div>
  );
};
