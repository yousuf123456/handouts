import React from "react";
import { PurchasedTimeline } from "./PurchasedTimeline";

interface ReviewCardHeaderProps {
  storeName: string;
  purchasedAt: Date;
}

export const ReviewCardHeader: React.FC<ReviewCardHeaderProps> = ({
  storeName,
  purchasedAt,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-text text-sm font-semibold text-black underline md:hidden">
        {storeName}
      </p>

      <PurchasedTimeline purchasedAt={purchasedAt} />
    </div>
  );
};
