import prisma from "../../libs/prismadb";

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { RatingAndReviewBucketCount } from "@/app/constants/consts";
import ObjectID from "bson-objectid";

export async function POST(req: Request) {
  try {
    const currentUser = (await getCurrentUser()) as any;
    if (!currentUser || !currentUser.id) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }

    const {
      storeId,
      reviewId,
      bucketId,
      productId,
      isHistory,
      ratingData,
      orderedProductId,
      ratingToIncrease,
      previousProductRating,
      storeResponseIncrementData,
    } = await req.json();

    const createdAt = new Date();

    if (!isHistory) {
      await prisma.orderedProduct.update({
        where: {
          id: orderedProductId,
        },

        data: {
          hasBeenReviewed: true,
        },
      });
    }

    await prisma.store.update({
      where: {
        id: storeId,
      },

      data: {
        ratingsCount: { increment: !isHistory ? 1 : 0 },
        posRatings: { increment: storeResponseIncrementData.posRatings },
        neuRatings: { increment: storeResponseIncrementData.neuRatings },
        negRatings: { increment: storeResponseIncrementData.negRatings },
      },
    });

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },

      select: {
        detailedRatingsCount: true,
        ratingsCount: true,
        ratingsSum: true,
        storeName: true,
        image: true,
        name: true,
        id: true,
      },
    });

    if (!product)
      return new NextResponse("Inavalid Product Id", { status: 404 });

    const newRatingsSum = product?.ratingsSum + ratingToIncrease;
    const newRatingsCount = isHistory
      ? product?.ratingsCount!
      : product?.ratingsCount! + 1;

    const newAvgRating = newRatingsSum / newRatingsCount;
    const newDetailedRatingsCount = product?.detailedRatingsCount as {
      [key: string]: number;
    };

    newDetailedRatingsCount[ratingData.rating.toString()] =
      newDetailedRatingsCount[ratingData.rating.toString()] + 1;

    if (isHistory) {
      newDetailedRatingsCount[previousProductRating] =
        newDetailedRatingsCount[previousProductRating] - 1;
    }

    await prisma.product.update({
      where: {
        id: productId,
      },

      data: {
        avgRating: newAvgRating,
        ratingsSum: newRatingsSum,
        ratingsCount: newRatingsCount,
        detailedRatingsCount: newDetailedRatingsCount,
      },
    });

    if (isHistory) {
      let fieldsToUpdate: any = {};
      Object.keys(ratingData).map(
        (key) =>
          (fieldsToUpdate[`ratingAndReviews.$.${key}`] = ratingData[key]),
      );

      const updatedReview = await prisma.$runCommandRaw({
        findAndModify: "RatingAndReviewBucket",
        query: {
          _id: { $oid: bucketId },
          ratingAndReviews: { $elemMatch: { _id: { $oid: reviewId } } },
        },
        update: {
          $set: fieldsToUpdate,
        },
      });

      return NextResponse.json("Updated the review successfully");
    }

    const ratingAndReview = {
      ...ratingData,
      createdAt: { $date: createdAt.toISOString() },
      _id: { $oid: ObjectID().toHexString() },
      userInformation: {
        name: currentUser.name,
        image: currentUser.image,
      },
      product: {
        id: productId,
        name: product.name,
        image: product.image,
        storeName: product.storeName,
      },
      storeId: { $oid: storeId },
      productId: { $oid: productId },
      userId: { $oid: currentUser.id },
      orderedProductId: { $oid: orderedProductId },
    };

    const productInformation = {
      name: product.name,
      image: product.image,
    };

    const createdReview = await prisma.$runCommandRaw({
      findAndModify: "RatingAndReviewBucket",

      query: {
        productId: { $oid: productId },
        count: { $lt: RatingAndReviewBucketCount },
      },

      update: {
        $push: {
          ratingAndReviews: {
            $each: [ratingAndReview],
            $position: 0,
          },
        },

        $inc: {
          count: 1,
        },

        $setOnInsert: {
          productInformation,
          storeId: { $oid: storeId },
          productId: { $oid: productId },
        },
      },

      upsert: true,
    });

    return NextResponse.json("Created A Review Successfully");
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
