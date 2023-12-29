"use client";
import React, { useState } from "react";

import { Avatar } from "@/app/components/Avatar";
import { RatingStars } from "@/app/components/RatingStars";
import { ReviewImageCard } from "./ReviewImageCard";
import { ImageModel } from "@/app/components/ImageModel";
import { HeaderInfo } from "./mini/HeaderInfo";
import { Review_Question } from "./mini/Review_Question";

import { RiStore3Fill } from "react-icons/ri";
import { HistoryReviewType } from "@/app/types";
import { Seperator } from "@/app/components/Seperator";
import { SellerRating } from "./SellerRating";
import { cn } from "@/app/utils/cn";

interface RatingAndReviewCardProps {
  ratingAndReview: HistoryReviewType;
  showStoreReviewToo?: boolean;
}

export const RatingAndReviewCard: React.FC<RatingAndReviewCardProps> = ({
  ratingAndReview,
  showStoreReviewToo,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-start gap-3 sm:gap-4">
        <div className="relative mt-[3px] h-6 w-6 flex-shrink-0 overflow-hidden rounded-full sm:h-7 sm:w-7 md:h-9 md:w-9">
          <Avatar image={ratingAndReview.userInformation.image} />
        </div>

        <div className="flex w-full gap-3 max-sm:flex-col sm:gap-6">
          <div
            className={cn(
              "flex flex-col gap-1 max-[560px]:w-full sm:gap-2",
              showStoreReviewToo && "w-full",
            )}
          >
            <div className="flex items-center justify-between gap-12">
              <HeaderInfo
                name={ratingAndReview.userInformation.name}
                date={ratingAndReview.createdAt.$date}
              />

              <div className="flex items-center gap-1">
                <RatingStars
                  defaultValue={ratingAndReview.rating || 0}
                  iconSize="text-[14px] md:text-[16px]"
                />
              </div>
            </div>

            <div>
              <Review_Question className="text-[13px] leading-[16px] sm:text-sm">
                {ratingAndReview.review}
              </Review_Question>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {ratingAndReview?.reviewImages?.map(
                (reviewImage: string, i: number) => (
                  <div key={i}>
                    <ImageModel
                      open={open}
                      image={reviewImage}
                      handleClose={handleClose}
                    />

                    <ReviewImageCard
                      image={reviewImage}
                      onClick={() => setOpen(true)}
                    />
                  </div>
                ),
              )}
            </div>
          </div>

          {showStoreReviewToo && (
            <Seperator vertical className="hidden h-auto sm:block" />
          )}

          {showStoreReviewToo && <Seperator className="sm:hidden" />}

          {showStoreReviewToo && (
            <div className="flex w-full flex-col gap-2">
              <SellerRating sellerRating={ratingAndReview.sellerResponse} />

              <Review_Question className="text-[13px] leading-[16px] sm:text-sm">
                {ratingAndReview.sellerReview}
              </Review_Question>
            </div>
          )}
        </div>
      </div>

      {ratingAndReview?.answer?.length && (
        <div className="flex flex-col gap-2 bg-green-50 p-4 pl-12">
          <div className="flex items-center gap-3">
            <RiStore3Fill className="h-8 w-8 text-slate-700" />

            <HeaderInfo
              name="Store Response"
              date={ratingAndReview.answeredAt.$date}
              className="text-base font-medium text-themeBlue"
            />
          </div>

          <Review_Question>{ratingAndReview.answer}</Review_Question>
        </div>
      )}
    </div>
  );
};
