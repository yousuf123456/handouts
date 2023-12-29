"use client";

import { RatingStars } from "@/app/components/RatingStars";
import { RatingBar } from "@/app/products/[productId]/components/RatingBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface ProductReviewsPieChartProps {
  productReviewsData: {
    avgRating: number;
    ratingsCount: number;
    detailedRatingsCount: any;
  };
}

export const ProductReviewsPieChart: React.FC<ProductReviewsPieChartProps> = ({
  productReviewsData,
}) => {
  return (
    <Card className="w-full sm:max-w-[320px]">
      <CardContent className="px-3 py-0">
        <CardHeader className="flex flex-col gap-0 px-3 py-3">
          <CardTitle className="text-base font-semibold max-sm:text-center lg:text-lg">
            Total {productReviewsData.ratingsCount} Product Ratings
          </CardTitle>

          <div className="flex w-full items-center gap-3 max-sm:justify-center">
            <RatingStars
              defaultValue={productReviewsData.avgRating}
              iconSize="lg:w-6 lg:h-6 w-[18px] h-[18px] sm:w-5 sm:h-5"
            />

            <p className="font-roboto text-sm text-black">
              {" ( " + productReviewsData.avgRating + " ) "}
            </p>
          </div>
        </CardHeader>

        <div className="flex flex-col gap-4 py-6">
          <RatingBar
            smallSizeOnly
            label="1 Stars"
            ratingsCount={productReviewsData.ratingsCount}
            ratingNumber={1}
            ratingNumberCount={
              productReviewsData.detailedRatingsCount["1"] || undefined
            }
          />

          <RatingBar
            smallSizeOnly
            label="2 Stars"
            ratingsCount={productReviewsData.ratingsCount}
            ratingNumber={2}
            ratingNumberCount={
              productReviewsData.detailedRatingsCount["2"] || undefined
            }
          />

          <RatingBar
            smallSizeOnly
            label="3 Stars"
            ratingsCount={productReviewsData.ratingsCount}
            ratingNumber={3}
            ratingNumberCount={
              productReviewsData.detailedRatingsCount["3"] || undefined
            }
          />

          <RatingBar
            smallSizeOnly
            label="4 Stars"
            ratingsCount={productReviewsData.ratingsCount}
            ratingNumber={4}
            ratingNumberCount={
              productReviewsData.detailedRatingsCount["4"] || undefined
            }
          />

          <RatingBar
            smallSizeOnly
            label="5 Stars"
            ratingsCount={productReviewsData.ratingsCount}
            ratingNumber={5}
            ratingNumberCount={
              productReviewsData.detailedRatingsCount["5"] || undefined
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};
