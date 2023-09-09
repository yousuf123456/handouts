"use client";

import React from "react";
import { RatingBar } from "./RatingBar";
import { RatingStars } from "@/app/components/RatingStars";

interface ReviewsGaugeProps {
  avgRating: number | undefined;
  ratingsCount: number | undefined;
  detailedRatingsCount:
    | {
        [key: string]: number;
      }
    | undefined;
}

export const ReviewsGauge: React.FC<ReviewsGaugeProps> = ({
  avgRating,
  ratingsCount,
  detailedRatingsCount,
}) => {
  return (
    <div className="flex w-full max-md:justify-around max-sm:flex-col max-sm:gap-3 sm:items-center md:gap-28">
      <div className="flex gap-2 max-sm:items-center max-sm:justify-center sm:flex-col sm:gap-0">
        <h2 className="hidden font-text text-xl font-semibold text-themeSecondary sm:block md:text-2xl">
          {avgRating + "/5"}
        </h2>

        <h2 className="font-text text-sm font-semibold text-black sm:hidden">
          {avgRating + " Rating "}
        </h2>

        <div className="max-sm:flex max-sm:items-center max-sm:gap-2">
          <RatingStars
            defaultValue={avgRating ? avgRating : 0}
            iconSize="text-[14px] md:text-[16px]"
          />

          <p className="hidden font-text text-sm font-medium text-themeSecondary sm:block md:text-base">
            {ratingsCount + " Reviews"}
          </p>

          <p className="font-text text-xs font-semibold text-black sm:hidden">
            {"(" + ratingsCount + ")"}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 max-sm:w-full">
        <RatingBar
          label="5 Stars"
          ratingsCount={ratingsCount}
          ratingNumberCount={
            detailedRatingsCount ? detailedRatingsCount["5"] : undefined
          }
          ratingNumber={5}
        />

        <RatingBar
          label="4 Stars"
          ratingsCount={ratingsCount}
          ratingNumberCount={
            detailedRatingsCount ? detailedRatingsCount["4"] : undefined
          }
          ratingNumber={4}
        />

        <RatingBar
          label="3 Stars"
          ratingsCount={ratingsCount}
          ratingNumberCount={
            detailedRatingsCount ? detailedRatingsCount["3"] : undefined
          }
          ratingNumber={3}
        />

        <RatingBar
          label="2 Stars"
          ratingsCount={ratingsCount}
          ratingNumberCount={
            detailedRatingsCount ? detailedRatingsCount["2"] : undefined
          }
          ratingNumber={2}
        />

        <RatingBar
          label="1 Stars"
          ratingsCount={ratingsCount}
          ratingNumberCount={
            detailedRatingsCount ? detailedRatingsCount["1"] : undefined
          }
          ratingNumber={1}
        />
      </div>
    </div>
  );
};
