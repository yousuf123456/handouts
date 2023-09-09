"use client";

import React, { useState } from "react";

import { ProductReview } from "./ProductReview";
import { StoreReview } from "./StoreReview";
import { OrderedProductType } from "@/app/types";
import { LoadingButton } from "@/app/components/LoadingButton";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import axios from "axios";
import { ProductDesc } from "./newDesign/ProductDesc";
import { OverAllRating } from "./newDesign/OverAllRating";
import { ServiceRatings } from "./newDesign/ServiceRatings";
import { AddImages } from "./newDesign/AddImages";
import { WrittenReview } from "./newDesign/WrittenReview";

interface WriteReviewFormProps {
  OrderedProduct: OrderedProductType;
  isHistory: boolean;
  reviewId: string | undefined;
  givenReview: any;
}

export const WriteReviewForm: React.FC<WriteReviewFormProps> = ({
  OrderedProduct,
  givenReview,
  isHistory,
  reviewId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [productRatingValue, setProductRatingValue] = useState<number>(
    givenReview?.rating || 5,
  );
  const [productRatingHover, setProductRatingHover] = useState<number>(-1);

  const [storeRatingValue, setStoreRatingValue] = useState<number | null>(
    givenReview?.sellerResponse || 3,
  );
  const [storeRatingHover, setStoreRatingHover] = useState<number>(-1);

  const [review, setReview] = useState(givenReview?.review || "");
  const [sellerReview, setSellerReview] = useState(
    givenReview?.sellerReview || "",
  );

  const [images, setImages] = useState<string[]>(
    givenReview?.reviewImages || [],
  );

  const router = useRouter();

  const previousProductRating = givenReview?.rating;

  const previousStoreResponseIncrementData = {
    posRatings: givenReview?.sellerResponse === 3 ? -1 : 0,
    neuRatings: givenReview?.sellerResponse === 2 ? -1 : 0,
    negRatings: givenReview?.sellerResponse === 1 ? -1 : 0,
  };

  const onSubmit = () => {
    setIsLoading(true);

    const ratingData = {
      sellerResponse: storeRatingValue,
      rating: productRatingValue,
      sellerReview: sellerReview,
      reviewImages: images,
      review: review,
    };

    const storeResponseIncrementData = {
      posRatings: !isHistory
        ? storeRatingValue === 3
          ? 1
          : 0
        : previousStoreResponseIncrementData.posRatings +
          (storeRatingValue === 3 ? 1 : 0),
      neuRatings: !isHistory
        ? storeRatingValue === 2
          ? 1
          : 0
        : previousStoreResponseIncrementData.neuRatings +
          (storeRatingValue === 2 ? 1 : 0),
      negRatings: !isHistory
        ? storeRatingValue === 1
          ? 1
          : 0
        : previousStoreResponseIncrementData.negRatings +
          (storeRatingValue === 1 ? 1 : 0),
    };

    const data = {
      reviewId,
      isHistory,
      ratingData,
      storeResponseIncrementData,
      orderedProductId: OrderedProduct.id,
      productId: OrderedProduct.product.id,
      storeId: OrderedProduct.product.storeId,
      previousProductRating: previousProductRating
        ? previousProductRating.toString()
        : previousProductRating,
      ratingToIncrease: isHistory
        ? productRatingValue - previousProductRating
        : productRatingValue,
    };

    axios
      .post("../../../../api/writeReview", data)
      .then((res) => {
        toast.success("Thanks for your feedback");
        router.push("/user/myReviews?toBeReviewed=false&isHistory=true");
        router.refresh();
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex w-full flex-col gap-12">
      <div className="flex w-full flex-col gap-6 max-sm:pb-12">
        <ProductDesc product={OrderedProduct.product} />

        <OverAllRating
          productRatingValue={productRatingValue}
          productRatingHover={productRatingHover}
          setProductRatingHover={setProductRatingHover}
          setProductRatingValue={setProductRatingValue}
        />

        <ServiceRatings
          storeRatingValue={storeRatingValue}
          storeRatingHover={storeRatingHover}
          setStoreRatingValue={setStoreRatingValue}
          setStoreRatingHover={setStoreRatingHover}
        />

        <AddImages images={images} setImages={setImages} />

        <WrittenReview review={review} setReview={setReview} />
      </div>

      <div className="bottom-0 left-0 right-0 flex w-full justify-center max-sm:fixed">
        <LoadingButton
          onClick={onSubmit}
          disabled={isLoading}
          isLoading={isLoading}
          className="flex h-9 w-full justify-center text-base sm:h-11 sm:w-48"
        >
          Submit
        </LoadingButton>
      </div>
    </div>
  );
};
