import { CtaLink } from "@/app/(site)/components/CtaLink";
import { Button } from "@/app/components/Button";
import { FormattedCurrency } from "@/app/components/FormattedCurrency";
import { format } from "date-fns";
import React from "react";
import { FaCrosshairs } from "react-icons/fa";
import { KeyValuePairInfo } from "./KeyValuePairInfo";
import clsx from "clsx";
import { cn } from "@/app/utils/cn";

interface Order_OrderRequestActionPanelProps {
  total?: number;
  status?: string;
  orderId?: string;
  requestedOn?: Date;
  showTotal?: boolean;
  hideCtas?: boolean;
  orderRequestId?: string;
  isOrderRequest?: boolean;
  cancelledOn?: Date | null;
  returnedOn?: Date | null;
  hideActionButton?: boolean;
  orderRequestStatus?: string;
  orderRequestType?: "Cancellations" | "Returns";
}

export const Order_OrderRequestActionPanel: React.FC<
  Order_OrderRequestActionPanelProps
> = ({
  orderRequestStatus,
  hideActionButton,
  orderRequestType,
  orderRequestId,
  isOrderRequest,
  cancelledOn,
  requestedOn,
  returnedOn,
  showTotal,
  hideCtas,
  orderId,
  status,
  total,
}) => {
  const href = isOrderRequest
    ? `/user/${orderRequestType?.toLowerCase()}/${orderRequestId}`
    : `/user/orders/${orderId}`;

  const isCancelled = orderRequestStatus === "Cancelled";
  const isReturned = orderRequestStatus === "Returned";

  return (
    <div className="flex items-center justify-between">
      <CtaLink href={href}>
        <h2 className="font-heading text-sm font-semibold text-slate-900 md:text-base xl:text-lg">
          {isOrderRequest ? (
            <KeyValuePairInfo
              Key={
                isCancelled
                  ? "Cancelled On : "
                  : isReturned
                  ? "Returned On"
                  : "Requested On : "
              }
              value={cancelledOn || returnedOn || requestedOn || null}
              keyClassName="text-sm md:text-base"
              valueClassName="text-sm md:text-base"
            />
          ) : (
            "Order ID: " + orderId
          )}
        </h2>
      </CtaLink>

      {showTotal && (
        <div className="mr-12 flex flex-col items-start gap-0">
          <p className="font-text text-sm text-slate-500">Total</p>

          <h3 className="font-text text-lg font-semibold text-slate-800">
            {total && <FormattedCurrency quantity={total} />}
          </h3>
        </div>
      )}

      {!hideCtas && (
        <div className={cn("hidden gap-3 sm:flex")}>
          {status === "Payment Pending" && (
            <Button className="bg-green-100 px-2 py-1.5 text-xs font-semibold text-green-500  hover:bg-green-100 hover:text-green-500 xl:px-3 xl:text-sm">
              Pay Now
            </Button>
          )}
          {!hideActionButton && (
            <CtaLink href={href}>
              <Button className="flex items-center justify-center gap-2 px-2 py-1.5 text-xs xl:px-3 xl:text-sm">
                {isOrderRequest ? "More Details" : "Track Order"}
                {!isOrderRequest && (
                  <FaCrosshairs className="h-4 w-4 text-white" />
                )}
              </Button>
            </CtaLink>
          )}
        </div>
      )}
    </div>
  );
};
