
import prisma from "../libs/prismadb";

export const getUserReviewById = async (
  bucketId: string | undefined,
  reviewId: string | undefined,
) => {
  if (!bucketId || !reviewId) return undefined;

  const pipeline: any = [
    {
      $match: {
        _id: { $oid: bucketId },
      },
    },
    {
      $project: {
        ratingAndReviews: {
          $filter: {
            input: "$ratingAndReviews",
            as: "ratingAndReview",
            cond: {
              $eq: ["$$ratingAndReview._id", { $oid: reviewId }],
            },
          },
        },
      },
    },
  ];

  const productReviewData = (await prisma.ratingAndReviewBucket.aggregateRaw({
    pipeline,
  })) as any;

  const productReview = productReviewData[0]?.ratingAndReviews[0];

  if (!productReview) return undefined;

  productReview.bucketId = productReviewData[0]?._id.$oid;

  const pipeline2: any = [
    {
      $match: {
        "product.id": productReview?.productId.$oid,
      },
    },
  ];

  const orderedProducts = (await prisma.orderedProduct.aggregateRaw({
    pipeline: pipeline2,
  })) as any;

  return {
    productReview,
    orderedProduct: orderedProducts[0],
  };
};
