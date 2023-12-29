import clsx from "clsx";
import React from "react";
import { FaFrown, FaMeh, FaSmile } from "react-icons/fa";

interface SellerRatingProps {
  sellerRating: number;
}

export const SellerRating: React.FC<SellerRatingProps> = ({ sellerRating }) => {
  const iconCs = "sm:w-7 sm:h-7 w-6 h-6 flex-shrink-0";

  const sellerResponseType =
    sellerRating === 1
      ? "negitive"
      : sellerRating === 2
      ? "neutral"
      : "positive";

  return (
    <div className="flex items-center gap-3">
      {sellerResponseType === "positive" ? (
        <FaSmile className={clsx(iconCs, "text-green-500")} />
      ) : sellerResponseType === "neutral" ? (
        <FaMeh className={clsx(iconCs, "text-yellow-500")} />
      ) : (
        <FaFrown className={clsx(iconCs, "text-red-500")} />
      )}

      <p className="font-roboto font-medium capitalize text-green-500">
        {sellerResponseType}
      </p>
    </div>
  );
};
