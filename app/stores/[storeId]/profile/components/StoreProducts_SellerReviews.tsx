import React from "react";
import { ProductReviewsPieChart } from "./ProductReviewsPieChart";
import { SellerReviewsPieChart } from "./SellerReviewsPieChart";
import { getProduct_StoreReviewsById } from "@/app/actions/getProductDetailsById/getProduct_StoreReviewsById";
import { HistoryReviewType } from "@/app/types";
import { RatingAndReviewCard } from "@/app/products/[productId]/components/RatingAndReviewCard";
import { PaginationControl } from "@/app/user/components/PaginationControl";

interface StoreProducts_SellerReviewsProps {
  sellerReviewsData: {
    posRatings: number;
    neuRatings: number;
    negRatings: number;
    ratingsCount: number;
  };
  productReviewsData: {
    avgRating: number;
    ratingsCount: number;
    detailedRatingsCount: any;
  };

  storeId: string;
  searchParams: any;
}

export const StoreProducts_SellerReviews: React.FC<
  StoreProducts_SellerReviewsProps
> = async ({
  sellerReviewsData,
  productReviewsData,
  storeId,
  searchParams,
}) => {
  const reviews = (await getProduct_StoreReviewsById({
    storeID: storeId,
    getStoreReviews: true,
    page: searchParams.page,
    filter: searchParams.filter,
    sortBy: searchParams.sortBy,
    direction: searchParams.direction,
  })) as HistoryReviewType[];

  return (
    <div className="flex w-full flex-col gap-12">
      <div className="flex w-full justify-around gap-6 max-sm:flex-col xl:justify-between">
        <ProductReviewsPieChart productReviewsData={productReviewsData} />

        <SellerReviewsPieChart sellerReviewsData={sellerReviewsData} />
      </div>

      <div className="flex flex-col gap-8">
        {reviews.map((review, i) => (
          <RatingAndReviewCard
            key={i}
            ratingAndReview={review}
            showStoreReviewToo
          />
        ))}

        <PaginationControl count={4} ITEMS_PER_PAGE={2} />
      </div>
    </div>
  );
};
