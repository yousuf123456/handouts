import React from "react";
import { ReviewCardHeader } from "./ReviewCardHeader";
import { ProductDesc } from "../write-review/components/newDesign/ProductDesc";
import { OverAllRating } from "../write-review/components/newDesign/OverAllRating";
import { ServiceRatings } from "../write-review/components/newDesign/ServiceRatings";

import Image from "next/image";
import Link from "next/link";

interface HistoryReviewCardProps {
  review: any;
}

export const HistoryReviewCard: React.FC<HistoryReviewCardProps> = ({
  review,
}) => {
  const href = `/user/myReviews/write-review?reviewId=${review.id}&isHistory=true`;

  return (
    <div className="w-full border-b-2 border-r-slate-300 px-0 py-6 min-[1120px]:pr-16 xl:pr-24">
      <div className="flex flex-col gap-2">
        <ReviewCardHeader
          storeName={review.product.storeName}
          purchasedAt={review.product.purchasedAt}
        />

        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full gap-4">
            <div className="flex w-[70%] flex-shrink-0">
              <ProductDesc product={review.product} />
            </div>

            <OverAllRating
              showOnly
              href={href}
              size="small"
              productRatingValue={review.rating}
            />
          </div>

          <div className="flex w-full items-center justify-between">
            <ServiceRatings
              showOnly
              horizontal
              href={href}
              compact={true}
              withOutBorder={true}
              storeRatingValue={review.sellerResponse}
            />

            <Link href={href}>
              <div className="cursor-pointer rounded-sm border-2 border-themeBlue px-2 py-0.5">
                <p className="font-sans text-sm text-themeBlue">Edit</p>
              </div>
            </Link>
          </div>

          <p className="font-sans text-sm text-black">{review.review}</p>

          {review.reviewImages.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {review.reviewImages.map((image: string, i: number) => (
                <div
                  key={i}
                  className="relative h-16 w-16 overflow-hidden rounded-md"
                >
                  <Image alt="Image" fill src={image} />
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
