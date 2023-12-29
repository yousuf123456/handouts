import prisma from "../../libs/prismadb";
import {
  PRODUCTS_QUESTIONS_PER_PAGE,
  QuestionsPerBucketCount,
} from "@/app/constants/consts";
import { getPaginationPipeline } from "./getProduct_StoreReviewsById";

interface Params {
  productId: string;
  page?: number | undefined;
}

export const getProductQuestionsById = async (params: Params) => {
  const { productId, page } = params;

  if (!productId || productId === "undefined") return [];

  const storeId = (
    await prisma.product.findUnique({
      where: { id: productId },
      select: { storeId: true },
    })
  )?.storeId;

  if (!storeId) return [];

  const pipeline = [
    {
      $match: {
        storeId: { $oid: storeId },
      },
    },
  ];

  const paginatedPipeline = getPaginationPipeline({
    page,
    pipeline,
    itemsFieldName: "questions",
    ITEMS_PER_PAGE: PRODUCTS_QUESTIONS_PER_PAGE,
    ITEMS_PER_BUCKET_COUNT: QuestionsPerBucketCount,
  });

  const questionsData = (await prisma.questionsBucket.aggregateRaw({
    pipeline: paginatedPipeline,
  })) as any;

  return questionsData[0]?.questions || [];
};
