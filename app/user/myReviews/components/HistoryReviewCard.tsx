import React from "react";
import { ReviewCardHeader } from "./ReviewCardHeader";
import { ProductDesc } from "../write-review/components/newDesign/ProductDesc";
import { OverAllRating } from "../write-review/components/newDesign/OverAllRating";
import { ServiceRatings } from "../write-review/components/newDesign/ServiceRatings";

import Image from "next/image";
import Link from "next/link";
import { HistoryReviewType } from "@/app/types";

interface HistoryReviewCardProps {
  review: HistoryReviewType;
}

export const HistoryReviewCard: React.FC<HistoryReviewCardProps> = ({
  review,
}) => {
  const href = `/user/myReviews/write-review?reviewId=${review._id.$oid}&bucketId=${review.bucketId}&isHistory=true`;

  return (
    <div className="w-full border-b-2 border-r-slate-300 px-0 py-6 min-[1120px]:pr-16 xl:pr-24">
      <div className="flex flex-col gap-2">
        <ReviewCardHeader
          storeName={review.product.storeName}
          //@ts-ignore
          purchasedAt={review.product.purchasedAt}
        />

        <div className="flex w-full flex-col gap-3 sm:gap-4">
          <div className="flex w-full gap-4">
            <div className="flex w-full flex-shrink-0 lg:w-[60%]">
              <ProductDesc product={review.product} />
            </div>

            <div className="hidden w-full lg:block">
              <OverAllRating
                showOnly
                href={href}
                size="small"
                productRatingValue={review.rating || 0}
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-between">
            <div className="flex items-start">
              <div className="w-52 lg:hidden">
                <div className="w-fit">
                  <OverAllRating
                    showOnly
                    href={href}
                    size="small"
                    withoutBorder
                    noLabelOnRes
                    productRatingValue={review.rating || 0}
                  />
                </div>
              </div>

              <div className="hidden sm:block">
                <ServiceRatings
                  showOnly
                  horizontal
                  href={href}
                  noLabelOnRes
                  withOutBorder
                  compact={true}
                  storeRatingValue={review.sellerResponse}
                />
              </div>
            </div>

            <Link href={href}>
              <div className="cursor-pointer rounded-sm border-2 border-themeBlue px-2 py-0.5">
                <p className="font-sans text-xs text-themeBlue sm:text-sm">
                  Edit
                </p>
              </div>
            </Link>
          </div>

          <p className="font-sans text-sm text-black">{review.review}</p>

          {review.reviewImages.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {review.reviewImages.map((image: string, i: number) => (
                <div
                  key={i}
                  className="relative flex h-16 w-16 items-center overflow-hidden rounded-sm bg-slate-200"
                >
                  <Image
                    alt="Image"
                    src={image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-auto w-full"
                  />
                </div>
              ))}
            </div>
          )}
          {/* <div className="flex w-full flex-col gap-2">
            <ProductReview
              href={href}
              compact={true}
              showOnly={true}
              hideForms={true}
              showGivenReview={review.review.length > 0}
              showReviewImages={true}
              imageAlignment="center"
              orderedProduct={review}
              givenReview={review.review}
              reviewImages={review.reviewImages}
              productRatingValue={review.rating}
            />
          </div>

          <div className="w-[2px] bg-slate-300" />

          <div className="flex flex-col gap-2">
            <StoreReview
              href={href}
              compact={true}
              showOnly={true}
              hideForms={true}
              showGivenReview={review.sellerReview.length > 0}
              givenReview={review.sellerReview}
              storeName={review.product.storeName}
              storeRatingValue={review.sellerResponse}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};
