import React from "react";
import { ProductReviews } from "../ProductReviews";
import { getProductReviewsById } from "@/app/actions/getProductDetailsById/getProductReviewsById";
import { ReduxProvider } from "@/app/context/ReduxProvider";
import { RatingAndReview } from "@prisma/client";
import { heavyAction } from "@/app/actions/heavyAction";

interface ReviewsProps {
  productId: string;
}

export const Reviews: React.FC<ReviewsProps> = async ({ productId }) => {
  const ratingAndReviews = (await getProductReviewsById({
    productId,
  })) as unknown as RatingAndReview[];

  return (
    <ReduxProvider>
      <ProductReviews ratingAndReviews={ratingAndReviews} />
    </ReduxProvider>
  );
};
