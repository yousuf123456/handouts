import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface Review_Question {
  children: ReactNode;
  className?: string;
}

export const Review_Question: React.FC<Review_Question> = ({
  children,
  className,
}) => {
  return (
    <p className={cn("font-roboto text-sm font-medium text-black", className)}>
      {children}
    </p>
  );
};
