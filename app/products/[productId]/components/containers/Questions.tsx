import React from "react";

import { ProductQuestions } from "../ProductQuestions";
import { ReduxProvider } from "@/app/context/ReduxProvider";
import { getProductQuestionsById } from "@/app/actions/getProductDetailsById/getProductQuestionsById";
import { QuestionType } from "@/app/types";

interface QuestionsProps {
  productId: string;
}

export default async function Questions({ productId }: QuestionsProps) {
  const questions = (await getProductQuestionsById({
    productId,
  })) as unknown as QuestionType[];

  // const questionsCount = store.getState().productMinorInfo.questionsCount;

  return (
    <ReduxProvider>
      <ProductQuestions initialQuestions={questions} productId={productId} />
    </ReduxProvider>
  );
}
