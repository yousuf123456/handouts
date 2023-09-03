"use client";
import React, { useEffect, useState } from "react";

import Checkbox from "@mui/material/Checkbox";
import { OrderedProductType } from "@/app/types";
import { SelectOptions } from "@/app/components/SelectOptions";
import { useAppDispatch } from "@/app/store/store";
import { OrderRequest_OrderedProductCard } from "../../../components/OrderRequest_OrderedProductCard";
import {
  selectOrderedProduct,
  setRequestReason,
  unselectOrderedProduct,
} from "@/app/store/features/orderRequestsSlice";
import { useMediaQuery } from "@mui/material";
import { SelectReasonModel } from "./SelectReasonModel";

interface SelectItemCardProps {
  requestType: "Cancellation" | "Return";
  orderedProduct: OrderedProductType;
  isPaymentPending: boolean;
  packageId: string;
}

export const SelectItemCard: React.FC<SelectItemCardProps> = ({
  isPaymentPending,
  orderedProduct,
  requestType,
  packageId,
}) => {
  const [selectedReason, setSelectedReason] = useState("");

  const reasons = [
    "Delievery time is too long",
    "Duplicate Order",
    "Mistaken Order",
    "Found cheaper somewhere else",
  ];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isPaymentPending) {
      const data = {
        packageId: packageId,
        orderedProductId: orderedProduct.id,
        reason: selectedReason,
      };
      dispatch(selectOrderedProduct(data));
    }
  }, [isPaymentPending]);

  const onCheckBoxClicked = (e: any) => {
    if (isPaymentPending) return;

    const data = {
      packageId: packageId,
      orderedProductId: orderedProduct.id,
      reason: selectedReason,
    };

    if (e.target.checked) dispatch(selectOrderedProduct(data));
    else dispatch(unselectOrderedProduct(data));
  };

  const onChange = (value: any) => {
    setSelectedReason(value);
  };

  useEffect(() => {
    const data = {
      packageId: packageId,
      orderedProductId: orderedProduct.id,
      reason: selectedReason,
    };

    dispatch(setRequestReason(data));
  }, [selectedReason]);

  const isMediumDevices = useMediaQuery("(max-width:768px)");

  return (
    <div className="w-full border-b-[1px] border-slate-200 py-4 lg:py-2">
      <div className="flex flex-col gap-0">
        <div className="flex items-start gap-1 sm:gap-3 md:gap-6">
          <Checkbox
            size={isMediumDevices ? "small" : "medium"}
            checked={isPaymentPending ? true : undefined}
            disabled={isPaymentPending}
            onClick={(e) => onCheckBoxClicked(e)}
          />

          <div className="w-full">
            <OrderRequest_OrderedProductCard
              orderedProduct={orderedProduct}
              showOnlyRequestStatus
              hidePrice
            />
          </div>

          <div className="hidden w-56 flex-shrink-0 lg:block xl:w-64">
            <SelectOptions
              label="Reason"
              options={reasons}
              onChange={onChange}
              disabled={isPaymentPending}
              placeHolder="Select A Reason"
            />
          </div>
        </div>

        {!isPaymentPending && (
          <SelectReasonModel
            onSelect={(value) => onChange(value)}
            requestType={requestType}
            reason={selectedReason}
          />
        )}
      </div>
    </div>
  );
};
