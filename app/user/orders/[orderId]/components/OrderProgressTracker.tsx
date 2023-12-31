import { StatusType } from "@/app/types";
import React from "react";
import { ProgressIndicator } from "./ProgressIndicator";
import { ReduxProvider } from "@/app/context/ReduxProvider";
import clsx from "clsx";
import { cn } from "@/app/utils/cn";

interface OrderProgressTrackerProps {
  orderRequestType?: "Cancellation" | "Return";
  orderRequestStatus?: string;
  isOrderRequest?: boolean;
  approved?: boolean;
  rejected?: boolean;
  status?: StatusType;
}

export const OrderProgressTracker: React.FC<OrderProgressTrackerProps> = ({
  status,
  approved,
  rejected,
  isOrderRequest,
  orderRequestType,
  orderRequestStatus,
}) => {
  const returnOrderRequestProgressSteps = [
    "Return in Process",
    "Approved / Rejected",
    "Refund Pending",
    "Refunded",
  ];
  const normalOrderProgressSteps = [
    "Payment Pending",
    "Processing",
    "Shipped",
    "Delievered",
  ];
  const cancellationOrderRequestProgressSteps = [
    "Cancellation in Process",
    "Cancelled",
  ];

  const progressSteps = !isOrderRequest
    ? normalOrderProgressSteps
    : orderRequestType === "Cancellation"
    ? cancellationOrderRequestProgressSteps
    : returnOrderRequestProgressSteps;

  const isDelievered = status === "Delievered";
  const isCancelled = orderRequestStatus === "Cancelled";

  return (
    <div
      className={cn(
        "mb-6 items-center justify-center gap-0",
        !isOrderRequest ? "hidden md:flex" : "flex",
      )}
    >
      <ReduxProvider>
        {progressSteps.map((step, i) => (
          <ProgressIndicator
            key={i}
            label={step}
            approved={approved}
            rejected={rejected}
            isOrderRequest={isOrderRequest}
            orderRequestType={orderRequestType}
            isLast={i === progressSteps.length - 1}
            statusesAfterApprovedOrRejectedStatus={
              progressSteps.indexOf(step) >
              progressSteps.indexOf("Approved / Rejected")
            }
            currentlyBeingDone={
              isOrderRequest
                ? i === progressSteps.indexOf(orderRequestStatus!) &&
                  !isCancelled
                : i === progressSteps.indexOf(status!) && !isDelievered
            }
            isDone={
              approved || rejected
                ? rejected
                  ? true
                  : progressSteps.indexOf(step) <=
                    progressSteps.indexOf("Approved / Rejected")
                : isOrderRequest
                ? i < progressSteps.indexOf(orderRequestStatus!) || isCancelled
                : i < progressSteps.indexOf(status!) || isDelievered
            }
          />
        ))}
      </ReduxProvider>
    </div>
  );
};
