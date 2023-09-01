"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

interface SectionHeadingProps {
  children: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => {
  const pathname = usePathname();
  const isHistoryReviewsPage = pathname === "/user/myReviews";

  return (
    <h4
      className={cn(
        "flex-shrink-0 font-text text-sm font-semibold text-black md:text-base",
        isHistoryReviewsPage && "hidden sm:block",
      )}
    >
      {children}
    </h4>
  );
};
