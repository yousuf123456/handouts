import { StatusType, cancellationSteps, returnSteps } from "@/app/types";
import clsx from "clsx";
import React from "react";

export const Status = ({
  status,
  showOnlyRequestStatus,
}: {
  status: StatusType;
  showOnlyRequestStatus?: boolean;
}) => {
  const styles = {
    "Payment Pending": "bg-yellow-100 text-yellow-500",
    Processing: "bg-pink-100 text-pink-500",
    Shipped: "bg-blue-100 text-blue-500",
    Delievered: "bg-green-100 text-green-500",
    Cancelled: "bg-red-100 text-red-500",
    "Cancellation in Process": "bg-pink-100 text-pink-500",
    "Return in Process": "bg-pink-100 text-pink-500",
  };

  const statusCs = clsx(
    "w-fit h-fit px-2 py-[3px] md:px-3 md:py-1 rounded-md",
    styles[status],
  );

  return (
    <>
      {showOnlyRequestStatus ? (
        (cancellationSteps.includes(status) ||
          returnSteps.includes(status)) && (
          <div className={statusCs}>
            <p className="text-[10px] font-medium leading-3 sm:text-xs">
              {status}
            </p>
          </div>
        )
      ) : (
        <div className={statusCs}>
          <p className="text-[10px] font-medium leading-3 sm:text-xs">
            {status}
          </p>
        </div>
      )}
    </>
  );
};
