"use client";

import { CtaLink } from "@/app/(site)/components/CtaLink";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

export const ToggleBar = () => {
  const searchParams = useSearchParams();
  const isHistory = searchParams.get("isHistory") === "true";

  const toggleBarItemCs =
    "px-3 py-1 text-sm sm:text-base font-text transition-all bg-white cursor-pointer";

  return (
    <div className="flex justify-center md:justify-start">
      <div className="w-fit rounded-sm bg-slate-100 p-2">
        <div className="flex gap-10 sm:gap-16">
          <CtaLink href="/user/myReviews?toBeReviewed=true&isHistory=false">
            <h3
              className={clsx(
                toggleBarItemCs,
                !isHistory
                  ? "rounded-sm bg-opacity-100 text-themeBlue"
                  : "bg-opacity-0 text-slate-500",
              )}
            >
              To Be Reviewed
            </h3>
          </CtaLink>

          <CtaLink href="/user/myReviews?toBeReviewed=false&isHistory=true">
            <h3
              className={clsx(
                toggleBarItemCs,
                isHistory
                  ? "bg-opacity-100 text-themeBlue"
                  : "bg-opacity-0 text-slate-500",
              )}
            >
              History
            </h3>
          </CtaLink>
        </div>
      </div>
    </div>
  );
};
