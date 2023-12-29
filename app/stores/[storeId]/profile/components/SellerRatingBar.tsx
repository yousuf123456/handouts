"use client";

import React from "react";

import LinearProgress from "@mui/material/LinearProgress";
import { FaFrown, FaMeh, FaSmile } from "react-icons/fa";
import { cn } from "@/app/utils/cn";

interface SellerRatingBarProps {
  rating: "pos" | "neu" | "neg";
  ratingCount: number;
  value: number;
}

export const SellerRatingBar: React.FC<SellerRatingBarProps> = ({
  ratingCount,
  rating,
  value,
}) => {
  const iconCs = " h-6 w-6 flex-shrink-0";

  return (
    <div
      className={cn(
        "flex items-center gap-3 ",
        rating === "pos" && "text-green-500",
        rating === "neu" && "text-yellow-500",
        rating === "neg" && "text-red-500",
      )}
    >
      {rating === "pos" ? (
        <FaSmile className={cn(iconCs, " text-green-500")} />
      ) : rating === "neu" ? (
        <FaMeh className={cn(iconCs, " text-yellow-500")} />
      ) : (
        <FaFrown className={cn(iconCs, " text-red-500")} />
      )}

      <LinearProgress
        value={value}
        color="inherit"
        variant="determinate"
        sx={{
          height: 10,
          width: "100%",
          borderRadius: 12,
          backgroundColor:
            rating === "pos"
              ? "#bbf7d0"
              : rating === "neu"
              ? "#fef08a"
              : "#fecaca",
        }}
      />

      <p className={"w-7 text-center font-text text-xs font-bold text-black"}>
        {ratingCount + " " + rating}
      </p>
    </div>
  );
};
