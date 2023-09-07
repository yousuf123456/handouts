"use client";
import { Heading } from "@/app/(site)/components/Heading";
import { Question } from "@prisma/client";
import React, { useEffect, useState } from "react";

import { QuestionCard } from "./QuestionCard";
import { NoQuestions_ReviewsMessage } from "./mini/NoQuestions_ReviewsMessage";
import { CtaLink } from "@/app/(site)/components/CtaLink";
import { AskQuestionForm } from "./AskQuestionForm";
import { store, useAppSelector } from "@/app/store/store";

interface ProductQuestionsProps {
  initialQuestions: Question[] | null;
  productId: string;
}

export const ProductQuestions: React.FC<ProductQuestionsProps> = ({
  initialQuestions,
  productId,
}) => {
  const initialQuestionsCount = useAppSelector(
    (state) => state.productMinorInfo.questionsCount,
  );
  useEffect(() => {
    setQuestionsCount(initialQuestionsCount);
  }, [initialQuestionsCount]);

  const [questionsCount, setQuestionsCount] = useState(initialQuestionsCount);
  const [questions, setQuestions] = useState(initialQuestions);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0">
          <Heading>Questions</Heading>
          <p className="font-text text-sm font-medium">
            Total {questionsCount} Questions
          </p>
        </div>

        <div className="sm:hidden">
          <AskQuestionForm
            productId={productId}
            setQuestions={setQuestions}
            setQuestionsCount={setQuestionsCount}
          />
        </div>
      </div>

      <div className="hidden sm:block">
        <AskQuestionForm
          productId={productId}
          setQuestions={setQuestions}
          setQuestionsCount={setQuestionsCount}
        />
      </div>

      {questions?.length ? (
        <div className="flex flex-col gap-2 bg-neutral-100 p-1 sm:gap-3 sm:p-3">
          {questions.map((question, i) => (
            <QuestionCard key={i} question={question} />
          ))}
        </div>
      ) : (
        <NoQuestions_ReviewsMessage>
          No questions yet on this product !
        </NoQuestions_ReviewsMessage>
      )}

      {questions?.length !== 0 && (
        <CtaLink href={`/products/${productId}/questions`}>
          <p className="font-text text-sm font-semibold text-themeBlue underline max-sm:text-center sm:text-base">
            View All
          </p>
        </CtaLink>
      )}
    </div>
  );
};
