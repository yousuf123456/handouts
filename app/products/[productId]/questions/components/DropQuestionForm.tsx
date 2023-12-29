"use client";
import React, { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/app/components/LoadingButton";
import { PRODUCTS_QUESTIONS_PER_PAGE } from "@/app/constants/consts";

import axios from "axios";
import { useSession } from "next-auth/react";
import { CtaLink } from "@/app/(site)/components/CtaLink";
import { QuestionType } from "@/app/types";

interface DropQuestionFormProps {
  productId: string;
  setQuestionsCount: React.Dispatch<React.SetStateAction<number>>;
  setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
}

export const DropQuestionForm: React.FC<DropQuestionFormProps> = ({
  productId,
  setQuestions,
  setQuestionsCount,
}) => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const askQuestion = () => {
    if (!question) {
      return;
    }
    setQuestion("");
    setIsLoading(true);
    axios
      .post("../../../api/askQuestion", {
        productId: productId,
        query: question,
      })
      .then((res) => {
        if (res.data) {
          const question: QuestionType = res.data;
          setQuestions((prev: QuestionType[]) => {
            if (prev.length === PRODUCTS_QUESTIONS_PER_PAGE) prev.pop();
            return [question, ...prev];
          });
          setQuestionsCount((prev) => prev! + 1);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const session = useSession();

  if (session.status === "unauthenticated") {
    return (
      <p className="font-text text-sm">
        <CtaLink href="/user/sign?type=SIGN%20IN">
          <span className="mr-2 text-themeBlue underline">Login</span>
        </CtaLink>
        or
        <CtaLink href="/user/sign?type=SIGN%20UP">
          <span className="mx-2 text-themeBlue underline">
            Create Handouts Accout
          </span>
        </CtaLink>
        to ask a question about this product.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium">Drop your question here.</p>

      <div className="relative">
        <Textarea
          maxLength={300}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <p className="absolute bottom-2 right-3 text-xs text-black">
          {question.length + " / 300"}
        </p>
      </div>

      <div className="w-fit">
        <LoadingButton
          disabled={isLoading}
          isLoading={isLoading}
          onClick={askQuestion}
        >
          Ask Question
        </LoadingButton>
      </div>
    </div>
  );
};
