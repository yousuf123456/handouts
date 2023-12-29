import React from "react";
import prisma from "../../../../libs/prismadb";

import { ReviewsGauge } from "../../components/ReviewsGauge";
import { BreadCrumbs } from "@/app/user/orders/components/BreadCrumbs";
import { getProduct_StoreReviewsById } from "@/app/actions/getProductDetailsById/getProduct_StoreReviewsById";

import { RatingAndReviewCard } from "../../components/RatingAndReviewCard";
import { PaginationControl } from "@/app/user/components/PaginationControl";
import { PRODUCTS_REVIEWS_PER_PAGE } from "@/app/constants/consts";
import { Heading } from "@/app/(site)/components/Heading";
import { Seperator } from "@/app/components/Seperator";
import { SortAndFilters } from "./SortAndFilters";

import { NoQuestions_ReviewsMessage } from "../../components/mini/NoQuestions_ReviewsMessage";
import { HistoryReviewType } from "@/app/types";

interface ReviewsProps {
  productId: string;
  filter: string | undefined;
  sortBy: "rating" | undefined;
  pageNumber: number | undefined;
  direction: "desc" | "asc" | undefined;
}

async function getProductReviewInfo(productId: string) {
  const productReviewInfo = (await prisma.product.findUnique({
    where: {
      id: productId,
    },

    select: {
      name: true,
      avgRating: true,
      ratingsCount: true,
      detailedRatingsCount: true,
    },
  })) as {
    name: string;
    avgRating: number;
    ratingsCount: number;
    detailedRatingsCount: any;
  };

  return productReviewInfo;
}

export const Reviews: React.FC<ReviewsProps> = async ({
  pageNumber,
  productId,
  direction,
  filter,
  sortBy,
}) => {
  const productReviewInfo = await getProductReviewInfo(productId);

  const productReviews = (await getProduct_StoreReviewsById({
    productId,
    page: pageNumber,
    sortBy,
    direction,
    filter,
  })) as unknown as HistoryReviewType[];

  const crumbs = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: productReviewInfo.name,
      href: `/products/${productId}`,
    },
    {
      label: "customer-reviews",
      href: ``,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="hidden sm:block">
        <BreadCrumbs crumbs={crumbs} />
      </div>

      <div className="mt-3 flex flex-col gap-3">
        <Heading className="hidden sm:block">
          Product Reviews For {productReviewInfo.name}
        </Heading>

        <Seperator className="hidden sm:block" />

        <div className="my-4 flex justify-start">
          <ReviewsGauge
            avgRating={productReviewInfo.avgRating}
            ratingsCount={productReviewInfo.ratingsCount}
            detailedRatingsCount={productReviewInfo.detailedRatingsCount}
          />
        </div>

        <Seperator />

        <SortAndFilters />

        <Seperator />

        {productReviews.length !== 0 ? (
          <div className="mt-4 flex flex-col gap-8">
            {productReviews.map((productReview, i) => (
              <RatingAndReviewCard key={i} ratingAndReview={productReview} />
            ))}
          </div>
        ) : (
          <NoQuestions_ReviewsMessage>
            No Reviews Yet On This Product
          </NoQuestions_ReviewsMessage>
        )}

        {productReviews.length !== 0 && (
          <div className="flex justify-start">
            <div className="w-fit">
              <PaginationControl
                jumpingDisabled={false}
                ITEMS_PER_PAGE={PRODUCTS_REVIEWS_PER_PAGE}
                count={
                  filter
                    ? productReviewInfo.detailedRatingsCount[filter]
                    : productReviewInfo.ratingsCount
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
