"use client";

import { Question } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Seperator } from "@/app/components/Seperator";
import { QuestionCard } from "../../components/QuestionCard";
import { PaginationControl } from "@/app/user/components/PaginationControl";
import { PRODUCTS_QUESTIONS_PER_PAGE } from "@/app/constants/consts";
import { NoQuestions_ReviewsMessage } from "../../components/mini/NoQuestions_ReviewsMessage";
import { AskQuestionForm } from "../../components/AskQuestionForm";

interface QuestionsForumProps {
  initialQuestions: Question[];
  initialQuestionsCount: number;
  productId: string;
}

export const QuestionsForum: React.FC<QuestionsForumProps> = ({
  initialQuestionsCount,
  initialQuestions,
  productId,
}) => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [questionsCount, setQuestionsCount] = useState(initialQuestionsCount);

  useEffect(() => {
    setQuestions(initialQuestions);
  }, [initialQuestions]);

  const firstQuestion = questions[0];
  const lastQuestion = questions[questions.length - 1];

  return (
    <div className="flex flex-col gap-6">
      <Seperator className="hidden sm:block" />

      <div className="hidden sm:block">
        <AskQuestionForm
          //@ts-ignore

          setQuestionsCount={setQuestionsCount}
          setQuestions={setQuestions}
          productId={productId}
        />
      </div>

      <Seperator className="hidden sm:block" />

      {questions.length !== 0 ? (
        <div className="flex flex-col gap-4">
          <div className="flex w-full items-center justify-between">
            <p className="font-text text-sm md:text-base">
              Total {questionsCount} questions on this product
            </p>

            <div className="sm:hidden">
              <AskQuestionForm
                //@ts-ignore

                setQuestionsCount={setQuestionsCount}
                setQuestions={setQuestions}
                productId={productId}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 bg-neutral-100 p-1 sm:gap-3 sm:p-3">
            {questions.map((question, i) => (
              <QuestionCard key={i} question={question} />
            ))}
          </div>
        </div>
      ) : (
        <NoQuestions_ReviewsMessage>
          No questions asked on this product yet
        </NoQuestions_ReviewsMessage>
      )}

      {questions.length !== 0 && (
        <div className="w-fit">
          <PaginationControl
            count={questionsCount}
            jumpingDisabled={true}
            lastCursor={lastQuestion.id}
            firstCursor={firstQuestion.id}
            ITEMS_PER_PAGE={PRODUCTS_QUESTIONS_PER_PAGE}
          />
        </div>
      )}
    </div>
  );
};
