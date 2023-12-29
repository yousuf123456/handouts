import prisma from "../libs/prismadb";

import { getCurrentUser } from "./getCurrentUser";
import { REVIEWS_PER_PAGE } from "../constants/consts";
import { HistoryReviewType, OrderedProductType } from "../types";
import { getOffsetPaginationQuery as getPrismaOffsetPaginationQuery } from "./getUserOrders";

const getOffsetPaginationQuery = (params: {
  pipeline: any;
  ITEMS_PER_PAGE: number;
  page: number | undefined;
}) => {
  const { pipeline, ITEMS_PER_PAGE, page } = params;
  const itemsToSkip = ((page || 1) - 1) * ITEMS_PER_PAGE;

  pipeline[2].$facet.docs.push({ $skip: itemsToSkip });

  return pipeline;
};

type Parameters = {
  page?: number | undefined;
  toBeReviewedReviews?: boolean;
};

export const getUserReviews = async (paramters: Parameters = {}) => {
  const { page, toBeReviewedReviews } = paramters;

  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  if (toBeReviewedReviews) {
    let query: any = {
      orderBy: {
        id: "desc",
      },

      where: {
        status: "Delievered",
        hasBeenReviewed: false,

        package: {
          order: {
            customerId: currentUser.id,
          },
        },
      },

      take: REVIEWS_PER_PAGE,
    };

    const updatedQuery = getPrismaOffsetPaginationQuery({
      page,
      query: { ...query },
      ITEMS_PER_PAGE: REVIEWS_PER_PAGE,
    });

    const ToBeReviewedReviews = await prisma.$transaction([
      prisma.orderedProduct.count({
        where: query.where,
      }),

      prisma.orderedProduct.findMany(updatedQuery),
    ]);

    const ToBeReviewedReviewsData =
      ToBeReviewedReviews[1] as OrderedProductType[];
    const ToBeReviewedReviewsCount = ToBeReviewedReviews[0] || 0;

    return {
      data: ToBeReviewedReviewsData,
      count: ToBeReviewedReviewsCount,
    };
  }

  const hasBeenReviewedOrderedProducts = (await prisma.orderedProduct.findMany({
    where: {
      status: "Delievered",

      package: {
        order: {
          customerId: currentUser.id,
        },
      },
    },
  })) as OrderedProductType[];

  const delieveredProductInfo = hasBeenReviewedOrderedProducts.map(
    (orderedProduct) => {
      return {
        id: orderedProduct.product.id,
        purchasedAt: orderedProduct.createdAt,
      };
    },
  );

  const delieveredProductObjectIds = delieveredProductInfo.map(
    (productInfo) => ({
      $oid: productInfo.id,
    }),
  );

  let pipeline = [
    {
      $match: {
        $expr: {
          $in: ["$productId", delieveredProductObjectIds],
        },
      },
    },
    {
      $unwind: "$ratingAndReviews",
    },
    {
      $match: {
        "ratingAndReviews.userId": { $oid: currentUser.id },
      },
    },
    {
      $facet: {
        count: [{ $count: "total" }],
        docs: [
          {
            $sort: {
              _id: -1,
            },
          },
          {
            $limit: REVIEWS_PER_PAGE,
          },
        ],
      },
    },
    {
      $unwind: "$count",
    },
    {
      $project: {
        "docs._id": 1,
        "docs.ratingAndReviews": 1,
        count: 1,
      },
    },
  ] as any;

  const updatedQuery = getOffsetPaginationQuery({
    page,
    pipeline: pipeline,
    ITEMS_PER_PAGE: REVIEWS_PER_PAGE,
  });

  const HistoryReviewsData = (await prisma.ratingAndReviewBucket.aggregateRaw({
    pipeline: updatedQuery,
  })) as any;

  const totalHistoryReviews = HistoryReviewsData[0]?.count?.total || 0;

  const HistoryReviews = HistoryReviewsData[0].docs.map(
    (historyReviewData: any) => ({
      bucketId: historyReviewData._id.$oid,
      ...historyReviewData.ratingAndReviews,
    }),
  ) as HistoryReviewType[];

  const withPurchasedDateHistoryReviews = HistoryReviews.map((review) => {
    const updatedHistoryReview = {
      ...review,
      product: {
        ...review.product,
        purchasedAt: delieveredProductInfo.filter(
          (productInfo) => productInfo.id === review.product.id,
        )[0].purchasedAt,
      },
    };

    return updatedHistoryReview;
  });

  return {
    data: withPurchasedDateHistoryReviews,
    count: totalHistoryReviews,
  };
};
