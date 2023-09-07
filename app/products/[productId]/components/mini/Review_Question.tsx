import React, { ReactNode } from "react";

interface Review_Question {
  children: ReactNode;
}

export const Review_Question: React.FC<Review_Question> = ({ children }) => {
  return (
    <p className="font-text text-[13px] font-medium leading-[16px] text-black sm:text-sm">
      {children}
    </p>
  );
};
