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

export interface FormImageType {
  url: string;
  file?: File;
  isDeleting?: boolean;
}

interface WriteReviewFormProps {
  OrderedProduct: OrderedProductType;
  reviewId: string | undefined;
  bucketId: string | undefined;
  isHistory: boolean;
  givenReview: any;
}

export const WriteReviewForm: React.FC<WriteReviewFormProps> = ({
  OrderedProduct,
  givenReview,
  isHistory,
  reviewId,
  bucketId,
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

  const initialImages = givenReview?.reviewImages
    ? givenReview.reviewImages?.map((image: string) => ({ url: image }))
    : [];

  const [images, setImages] = useState<FormImageType[]>(initialImages);

  const router = useRouter();

  const previousProductRating = givenReview?.rating;

  const previousStoreResponseIncrementData = {
    posRatings: givenReview?.sellerResponse === 3 ? -1 : 0,
    neuRatings: givenReview?.sellerResponse === 2 ? -1 : 0,
    negRatings: givenReview?.sellerResponse === 1 ? -1 : 0,
  };

  const onSubmit = async () => {
    setIsLoading(true);

    const resp = await uploadReviewImages();
    if (!resp) {
      setIsLoading(false);
      toast.error("Seomthing goes wrong");
    }

    const ratingData = {
      reviewImagesData: resp?.reviewImagesData,
      reviewImages: resp?.reviewImages,
      sellerResponse: storeRatingValue,
      rating: productRatingValue,
      sellerReview: sellerReview,
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
      bucketId: givenReview.bucketId,
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

  const uploadReviewImages = async () => {
    const imagesNotToBeUploaded = images.filter((img) => !img.file);
    const imagesToUpload = images.filter((img) => img.file);

    if (imagesToUpload.length === 0)
      return {
        reviewImages: imagesNotToBeUploaded.map((img) => img.url),
        reviewImagesData: givenReview?.reviewImagesData,
      };

    const imagesFormData = new FormData();
    imagesToUpload.map((img, i) =>
      imagesFormData.append(`image-${i}`, img.file!),
    );

    const res = await axios.post(
      "../../../../api/uploadToDrive",
      imagesFormData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    if (res.status !== 500 && res.status !== 400 && res.status !== 401) {
      const imageUrls = imagesNotToBeUploaded.map((img) => img.url);
      const newReviewImagesData = givenReview?.reviewImagesData
        ? [...givenReview.reviewImagesData]
        : [];

      res.data.imagesData.map((imgData: { id: string; url: string }) => {
        imageUrls.push(imgData.url);
        newReviewImagesData.push(imgData);
      });

      return { reviewImages: imageUrls, reviewImagesData: newReviewImagesData };
    }
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

        <AddImages
          images={images}
          bucketId={bucketId}
          reviewId={reviewId}
          setImages={setImages}
          isEditingReview={!!reviewId}
          reviewImagesData={givenReview?.reviewImagesData}
        />

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
