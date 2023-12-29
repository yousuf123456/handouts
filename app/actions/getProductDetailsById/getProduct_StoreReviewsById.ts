import prisma from "../../libs/prismadb";
import {
  PRODUCTS_REVIEWS_PER_PAGE,
  RatingAndReviewBucketCount,
} from "@/app/constants/consts";

function calculatePaginationInfo(
  pageNumber: number,
  reviewsPerPage: number,
  ITEMS_PER_BUCKET_COUNT: number,
) {
  const reviewsPerBucketCount = ITEMS_PER_BUCKET_COUNT;

  const bucketsToSkip = Math.floor(
    ((pageNumber - 1) * reviewsPerPage) / reviewsPerBucketCount,
  );

  const pageIndex = (pageNumber - 1) % (reviewsPerBucketCount / reviewsPerPage);
  const startReviewIndex = pageIndex * reviewsPerPage;
  const endReviewIndex = startReviewIndex + reviewsPerPage;

  return {
    bucketsToSkip,
    splicingIndices: [startReviewIndex, endReviewIndex], // Adjusting end index to match array indices
  };
}

interface getPaginationPipelineParams {
  pipeline: any;
  isSorting?: boolean;
  isFiltering?: boolean;
  ITEMS_PER_PAGE: number;
  itemsFieldName: string;
  page: number | undefined;
  filter?: string | undefined;
  sortBy?: "rating" | undefined;
  ITEMS_PER_BUCKET_COUNT: number;
  direction?: "desc" | "asc" | undefined;
}

export function getPaginationPipeline(params: getPaginationPipelineParams) {
  const {
    page,
    sortBy,
    filter,
    pipeline,
    isSorting,
    direction,
    isFiltering,
    ITEMS_PER_PAGE,
    itemsFieldName,
    ITEMS_PER_BUCKET_COUNT,
  } = params;

  const { bucketsToSkip, splicingIndices } = calculatePaginationInfo(
    page || 1,
    ITEMS_PER_PAGE,
    ITEMS_PER_BUCKET_COUNT,
  );

  const unwindedDocsToSkip = ((page || 1) - 1) * ITEMS_PER_PAGE;

  if (isSorting || isFiltering) {
    pipeline.push({ $unwind: `$${itemsFieldName}` });
  }

  if (isSorting) {
    pipeline.push({
      $sort: {
        [`${itemsFieldName}.${sortBy}`]: direction === "desc" ? -1 : 1,
      },
    });
  }

  if (isFiltering) {
    pipeline.push({
      $match: {
        [`${itemsFieldName}.rating`]: parseInt(filter || "5"),
      },
    });
  }

  if (bucketsToSkip !== 0 || unwindedDocsToSkip !== 0) {
    if (isSorting || isFiltering) {
      pipeline.push({
        $skip: unwindedDocsToSkip,
      });
    } else {
      pipeline.push({
        $skip: bucketsToSkip,
      });
    }
  }

  if (isSorting || isFiltering) {
    pipeline.push({
      $limit: ITEMS_PER_PAGE,
    });
  } else pipeline.push({ $limit: 1 });

  if (!isSorting && !isFiltering) {
    pipeline.push({
      $project: {
        [itemsFieldName]: {
          $slice: [
            `$${itemsFieldName}`,
            splicingIndices[0],
            splicingIndices[1],
          ],
        },
      },
    });
  }

  return pipeline;
}

interface Parameters {
  productId?: string;
  page?: number | undefined;
  getStoreReviews?: boolean;
  filter?: string | undefined;
  storeID?: string | undefined;
  sortBy?: "rating" | undefined;
  direction?: "desc" | "asc" | undefined;
}

export const getProduct_StoreReviewsById = async (
  parameters: Parameters = {},
) => {
  const {
    productId,
    direction,
    sortBy,
    filter,
    page,
    getStoreReviews,
    storeID,
  } = parameters;

  if (
    (productId === undefined ||
      productId === "undefined" ||
      productId === null) &&
    !getStoreReviews
  ) {
    return null;
  }

  const storeId =
    storeID ||
    (
      await prisma.product.findUnique({
        where: { id: productId },
        select: { storeId: true },
      })
    )?.storeId;

  if (!storeId) return null;

  let pipeline: any = [];

  pipeline.push({
    $match: {
      storeId: { $oid: storeId },
      ...(!getStoreReviews && { productId: { $oid: productId } }),
    },
  });

  const isSorting = !!(sortBy && direction);
  const ITEMS_PER_PAGE = PRODUCTS_REVIEWS_PER_PAGE;

  const paginatedPipeline = getPaginationPipeline({
    page,
    sortBy,
    filter,
    direction,
    ITEMS_PER_PAGE,
    isSorting: isSorting,
    isFiltering: !!filter,
    pipeline: [...pipeline],
    itemsFieldName: "ratingAndReviews",
    ITEMS_PER_BUCKET_COUNT: RatingAndReviewBucketCount,
  });

  const reviewsData = (await prisma.ratingAndReviewBucket.aggregateRaw({
    pipeline: paginatedPipeline,
  })) as any;

  const reviews = reviewsData?.flatMap((productReviewData: any) =>
    Array.isArray(productReviewData.ratingAndReviews)
      ? productReviewData.ratingAndReviews
      : [productReviewData.ratingAndReviews],
  );

  if (!reviews) return null;

  return reviews;
};
