import React from "react";
import { ProductReviews } from "../ProductReviews";
import { getProduct_StoreReviewsById } from "@/app/actions/getProductDetailsById/getProduct_StoreReviewsById";
import { ReduxProvider } from "@/app/context/ReduxProvider";
import { HistoryReviewType } from "@/app/types";

interface ReviewsProps {
  productId: string;
}

export default async function Reviews({ productId }: ReviewsProps) {
  const ratingAndReviews = (await getProduct_StoreReviewsById({
    productId,
  })) as unknown as HistoryReviewType[];

  return (
    <ReduxProvider>
      <ProductReviews ratingAndReviews={ratingAndReviews} />
    </ReduxProvider>
  );
}
