import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

import prisma from "../../libs/prismadb";
import { QuestionsPerBucketCount } from "@/app/constants/consts";
import ObjectID from "bson-objectid";

export async function POST(req: Request) {
  try {
    const currentUser = (await getCurrentUser()) as any;

    if (!currentUser || !currentUser.id) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }

    const { productId, query } = await req.json();

    const product = await prisma.product.update({
      where: {
        id: productId,
      },

      data: {
        questionsCount: {
          increment: 1,
        },
      },

      select: {
        id: true,
        name: true,
        image: true,
        questionsCount: true,
        store: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (product.questionsCount === 0) {
      await prisma.product.update({
        where: { id: product.id },
        data: { questionsCount: 1 },
      });
    }

    const question = {
      _id: { $oid: ObjectID().toHexString() },
      query: query,
      userInformation: {
        name: currentUser.name,
        image: currentUser.image,
      },
      storeInformation: {
        name: product?.store.name,
      },
      userId: { $oid: currentUser.id },
      createdAt: { $date: new Date().toISOString() },
    };

    const createdQuestionData = (await prisma.$runCommandRaw({
      findAndModify: "QuestionsBucket",
      query: {
        storeId: { $oid: product.store.id },
        productId: { $oid: product.id },
        count: {
          $lt: QuestionsPerBucketCount,
        },
      },
      update: {
        $push: {
          questions: {
            $each: [question],
            $position: 0,
          },
        },
        $inc: {
          count: 1,
        },
        $setOnInsert: {
          productInformation: {
            name: product.name,
            image: product.image,
          },
          productId: { $oid: productId },
          storeId: { $oid: product.store.id },
        },
      },
      upsert: true,
    })) as any;

    return NextResponse.json(question);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
