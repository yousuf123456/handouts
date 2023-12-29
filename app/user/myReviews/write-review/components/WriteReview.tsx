import React from "react";

import { getOrderedProductById } from "@/app/actions/getOrderedProductById";
import { getUserReviewById } from "@/app/actions/getUserReviewById";
import { WriteReviewForm } from "./WriteReviewForm";
import { OrderedProductType } from "@/app/types";

interface SearchParams {
  reviewId?: string;
  bucketId?: string;
  productId?: string;
  isHistory?: string;
  orderedProductId?: string;
}

interface WriteReviewProps {
  searchParams: SearchParams;
}

export const WriteReview: React.FC<WriteReviewProps> = async ({
  searchParams,
}) => {
  const isHistory = searchParams.isHistory === "true";
  let info;

  if (isHistory) {
    info = await getUserReviewById(
      searchParams.bucketId,
      searchParams.reviewId,
    );
  }

  if (isHistory && !info?.productReview) return;

  const orderedProduct =
    !isHistory && (await getOrderedProductById(searchParams.orderedProductId));

  const OrderedProduct = isHistory
    ? (info?.orderedProduct as OrderedProductType)
    : (orderedProduct as unknown as OrderedProductType);

  return (
    <WriteReviewForm
      isHistory={isHistory}
      bucketId={searchParams.bucketId}
      reviewId={searchParams.reviewId}
      OrderedProduct={OrderedProduct}
      givenReview={info?.productReview}
    />
  );
};
