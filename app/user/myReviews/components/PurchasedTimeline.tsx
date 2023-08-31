import React from "react";
import { KeyValuePairInfo } from "../../orders/components/KeyValuePairInfo";

import { HiClock } from "react-icons/hi";

interface PurchasedTimelineProps {
  purchasedAt: Date;
}

export const PurchasedTimeline: React.FC<PurchasedTimelineProps> = ({
  purchasedAt,
}) => {
  return (
    <KeyValuePairInfo
      Key="Purchased on"
      value={purchasedAt}
      keyClassName="sm:text-sm text-xs text-green-500 font-medium"
      valueClassName="sm:text-sm text-xs text-green-500 font-medium"
      Icon={HiClock}
    />
  );
};
