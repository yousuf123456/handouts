"use client";
import React, { useState } from "react";

import { OrderedProductType, PackageType } from "@/app/types";
import { SelectItemCard } from "./SelectItemCard";
import { Heading } from "./Heading";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { SelectOptions } from "@/app/components/SelectOptions";
import { setRequestReasonForAll } from "@/app/store/features/orderRequestsSlice";
import { HiChevronDown, HiPlus } from "react-icons/hi";
import { SelectReasonModel } from "./SelectReasonModel";
import { reasons } from "@/app/constants/selectOptions";
import { useMediaQuery } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { Package } from "lucide-react";
import clsx from "clsx";

interface SelectItemsListProps {
  requestType: "Cancellation" | "Return";
  packages: PackageType[];
}

export const SelectItemsList: React.FC<SelectItemsListProps> = ({
  requestType,
  packages,
}) => {
  const [showingAll, setShowingAll] = useState(false);

  const isPaymentPending = () => {
    let isPaymentPending = true;
    packages.map((Package) => {
      if (Package.status !== "Payment Pending") isPaymentPending = false;
    });

    return isPaymentPending;
  };

  const getProductsCount = () => {
    let productsCount = 0;
    packages.map((Package) => {
      productsCount += Package.orderedProducts?.length || 0;
    });

    return productsCount;
  };

  const selectedOrderedProducts = useAppSelector(
    (state) => state.orderRequests.selectedOrderedProducts,
  );
  const reason = selectedOrderedProducts.length
    ? selectedOrderedProducts[0].reason
    : undefined;
  const dispatch = useAppDispatch();

  const onChange = (value: string) => {
    dispatch(setRequestReasonForAll(value));
  };

  const isSmallDevices = useMediaQuery("(max-width:640px)");

  return (
    <div className="flex flex-col gap-4">
      <Heading>
        {requestType === "Cancellation"
          ? "Select Items to Cancel"
          : "Select Items to Return"}
      </Heading>

      <div className="flex-col gap-2">
        {isPaymentPending() && (
          <div className="hidden items-center justify-between lg:flex">
            <p className="font-text text-sm text-blue-500">
              Please complete the payment process to select the indivisual items
              to cancel
            </p>

            <div className="w-56 flex-shrink-0 xl:w-64">
              <SelectOptions
                label="Reason"
                options={reasons}
                onChange={(value) => onChange(value)}
                placeHolder="Select A Reason"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-0">
          {packages.map((Package) => {
            if (!Package.orderedProducts) return;

            const orderedProducts =
              Package.orderedProducts as unknown as OrderedProductType[];
            return orderedProducts.map((orderedProduct, i) =>
              isPaymentPending() &&
              isSmallDevices &&
              !showingAll &&
              i !== 0 ? null : (
                <SelectItemCard
                  key={i}
                  packageId={Package.id}
                  requestType={requestType}
                  isPaymentPending={isPaymentPending()}
                  orderedProduct={orderedProduct as OrderedProductType}
                />
              ),
            );
          })}

          {isPaymentPending() && isSmallDevices && (
            <div
              onClick={() => setShowingAll(!showingAll)}
              className="mt-2 w-full cursor-pointer rounded-md bg-green-100 px-4 py-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaTimes className="h-3 w-3 text-green-400" />
                  <p className="text-xs font-medium text-green-400">
                    {getProductsCount()} Items To Be Cancelled Together
                  </p>
                </div>

                <HiChevronDown
                  className={clsx(
                    "h-4 w-4 text-green-400 transition-all",
                    showingAll && "rotate-180",
                  )}
                />
              </div>
            </div>
          )}
        </div>

        {isPaymentPending() && (
          <SelectReasonModel
            reason={reason}
            requestType={requestType}
            onSelect={(value) => onChange(value)}
          />
        )}
      </div>
    </div>
  );
};
