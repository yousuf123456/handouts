"use client";

import React from "react";
import { Button } from "@/app/components/Button";
import { useParams } from "next/navigation";
import { CtaLink } from "@/app/(site)/components/CtaLink";

interface OrderActionsProps {
  orderStatus: string;
  orderId: string | undefined;
  orderRequestId: string | undefined;
  isOrderRequest: boolean | undefined;
  orderRequestType: "Cancellations" | "Returns" | undefined;
}

export const OrderActions: React.FC<OrderActionsProps> = ({
  orderId,
  orderStatus,
  orderRequestId,
  isOrderRequest,
  orderRequestType,
}) => {
  const href = isOrderRequest
    ? `/user/${orderRequestType?.toLowerCase()}/${orderRequestId}`
    : `/user/orders/${orderId}`;

  return (
    <div className="mt-4 flex w-full justify-end gap-3 sm:hidden">
      {orderStatus === "Payment Pending" && (
        <Button
          variant="outline"
          size="sm"
          className="border-green-400 text-[11px] leading-3 text-green-400 hover:bg-green-400"
        >
          Pay Now
        </Button>
      )}

      {!isOrderRequest && (
        <CtaLink href={href}>
          <Button size="sm" variant="outline" className="text-[11px] leading-3">
            Manage Order
          </Button>
        </CtaLink>
      )}
    </div>
  );
};
