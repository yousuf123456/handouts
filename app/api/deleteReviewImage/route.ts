import prisma from "@/app/libs/prismadb";

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

import googleDrive from "@/app/libs/googleDrive";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return new NextResponse("Unauthorised", { status: 403 });

    const {
      imageId,
      imageUrl,
      reviewId,
      bucketId,
      reviewImages,
      reviewImagesData,
    } = await req.json();

    await Promise.all([
      prisma.$runCommandRaw({
        findAndModify: "RatingAndReviewBucket",
        query: {
          _id: { $oid: bucketId },
          ratingAndReviews: { $elemMatch: { _id: { $oid: reviewId } } },
        },
        update: {
          $set: {
            "ratingAndReviews.$.reviewImages": reviewImages,
            "ratingAndReviews.$.reviewImagesData": reviewImagesData,
          },
        },
      }),
      googleDrive.files.delete({ fileId: imageId }),
    ]);

    return NextResponse.json("Deleted the review image succesfully");
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
