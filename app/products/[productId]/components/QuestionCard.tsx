import React from "react";

import { HiQuestionMarkCircle, HiCheckCircle } from "react-icons/hi";
import { HeaderInfo } from "./mini/HeaderInfo";
import { Review_Question } from "./mini/Review_Question";
import clsx from "clsx";
import { QuestionType } from "@/app/types";

interface QuestionCardProps {
  // Have to make it real
  question: QuestionType;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const className = "text-xs md:text-sm";

  return (
    <div className="flex flex-col gap-4 rounded-md bg-white p-2 shadow-sm">
      <div className="flex items-center gap-4">
        <HiQuestionMarkCircle className="h-6 w-6 text-blue-500 sm:h-7 sm:w-7 md:h-8 md:w-8" />

        <div className="flex flex-col">
          <HeaderInfo
            name={question.userInformation.name}
            date={question.createdAt.$date}
          />

          <Review_Question className={className}>
            {question.query}
          </Review_Question>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <HiCheckCircle className="h-6 w-6 text-green-500 sm:h-7 sm:w-7 md:h-8 md:w-8" />
        {question.answer ? (
          <div className="flex flex-col">
            <HeaderInfo
              name={question.storeInformation.name}
              date={question.answeredAt.$date}
            />

            <Review_Question className={className}>
              {question.answer}
            </Review_Question>
          </div>
        ) : (
          <p className={clsx("font-text text-red-300", className)}>
            Not Answered Yet By The Store{" "}
            {"(" + question.storeInformation.name + ")"}!
          </p>
        )}
      </div>
    </div>
  );
};
