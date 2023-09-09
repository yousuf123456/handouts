import React from "react";
import { ProductQuestions } from "../ProductQuestions";
import { getProductQuestionsById } from "@/app/actions/getProductDetailsById/getProductQuestionsById";
import { ReduxProvider } from "@/app/context/ReduxProvider";
import { Question } from "@prisma/client";
import { heavyAction } from "@/app/actions/heavyAction";

interface QuestionsProps {
  productId: string;
}

export default async function Questions({ productId }: QuestionsProps) {
  await new Promise((resolver) => setTimeout(resolver, 5000));
  const questions = (await getProductQuestionsById({
    productId,
  })) as unknown as Question[];

  // const questionsCount = store.getState().productMinorInfo.questionsCount;

  return (
    <ReduxProvider>
      <ProductQuestions initialQuestions={questions} productId={productId} />
    </ReduxProvider>
  );
}
