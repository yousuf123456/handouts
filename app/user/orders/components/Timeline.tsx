import React from "react";
import { KeyValuePairInfo } from "./KeyValuePairInfo";
import { FaPlane } from "react-icons/fa";

interface TimelineProps {
  createdAt?: Date;
  orderId?: string;
  isOrderRequest?: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({
  orderId,
  createdAt,
  isOrderRequest,
}) => {
  return (
    <div className="flex items-center gap-4">
      <KeyValuePairInfo
        keyClassName="text-xs sm:text-sm"
        valueClassName="text-xs sm:text-sm"
        Key={!isOrderRequest ? "Placed At : " : "Order Id : "}
        value={isOrderRequest ? orderId || null : createdAt || null}
      />
    </div>
  );
};
