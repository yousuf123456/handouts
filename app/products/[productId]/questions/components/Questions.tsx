import React from "react";
import prisma from "../../../../libs/prismadb";

import { getProductQuestionsById } from "@/app/actions/getProductDetailsById/getProductQuestionsById";
import { BreadCrumbs } from "@/app/user/orders/components/BreadCrumbs";
import { Textarea } from "@/components/ui/textarea";
import { DropQuestionForm } from "./DropQuestionForm";
import { QuestionsForum } from "./QuestionsForum";
import { Question } from "@prisma/client";

async function getProductQuestionsInfo(productId: string) {
  const productQuestionsInfo = (await prisma.product.findUnique({
    where: {
      id: productId,
    },

    select: {
      name: true,
      questionsCount: true,
    },
  })) as {
    name: string;
    questionsCount: number;
  };

  return productQuestionsInfo;
}

interface QuestionsProps {
  productId: string;
  page: number | undefined;
  cursor: string | undefined;
  prevPage: number | undefined;
}

export const Questions: React.FC<QuestionsProps> = async ({
  page,
  cursor,
  prevPage,
  productId,
}) => {
  const productQuestionsInfo = await getProductQuestionsInfo(productId);
  const questions = (await getProductQuestionsById({
    productId,
    page,
    prevPage,
    cursor,
  })) as unknown as Question[];

  const crumbs = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: productQuestionsInfo?.name,
      href: `/products/${productId}`,
    },
    {
      label: "questions",
      href: ``,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="hidden sm:block">
        <BreadCrumbs crumbs={crumbs} />
      </div>

      <QuestionsForum
        productId={productId}
        initialQuestions={questions}
        initialQuestionsCount={productQuestionsInfo.questionsCount}
      />
    </div>
  );
};
