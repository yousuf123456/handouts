import React, { ReactNode } from "react";

interface NoQuestions_ReviewsMessageProps {
  children: ReactNode;
}

export const NoQuestions_ReviewsMessage: React.FC<
  NoQuestions_ReviewsMessageProps
> = ({ children }) => {
  return (
    <h1 className="text-center font-roboto text-sm text-slate-600 sm:text-base lg:text-lg">
      {children}
    </h1>
  );
};
