import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SellerRatingBar } from "./SellerRatingBar";

interface SellerReviewsPieChartProps {
  sellerReviewsData: {
    posRatings: number;
    neuRatings: number;
    negRatings: number;
    ratingsCount: number;
  };
}

export const SellerReviewsPieChart: React.FC<SellerReviewsPieChartProps> = ({
  sellerReviewsData,
}) => {
  const posRatingsPer =
    (sellerReviewsData.posRatings / sellerReviewsData.ratingsCount) * 100;

  const neuRatingsPer =
    (sellerReviewsData.neuRatings / sellerReviewsData.ratingsCount) * 100;

  const negRatingsPer =
    (sellerReviewsData.negRatings / sellerReviewsData.ratingsCount) * 100;

  return (
    <Card className="w-full py-0 pb-0 sm:max-w-[320px]">
      <CardContent className="px-3 py-0">
        <CardHeader className="flex flex-col gap-0 px-3 py-3">
          <CardTitle className="text-base font-semibold max-sm:text-center lg:text-lg">
            Total {sellerReviewsData.ratingsCount} Seller Ratings
          </CardTitle>
        </CardHeader>

        <div className="flex flex-col gap-4 py-6">
          <SellerRatingBar
            ratingCount={sellerReviewsData.posRatings}
            rating="pos"
            value={posRatingsPer}
          />

          <SellerRatingBar
            ratingCount={sellerReviewsData.neuRatings}
            rating="neu"
            value={neuRatingsPer}
          />

          <SellerRatingBar
            ratingCount={sellerReviewsData.negRatings}
            rating="neg"
            value={negRatingsPer}
          />
        </div>
      </CardContent>
    </Card>
  );
};
