"use client";

import React from "react";
import { CtaLink } from "@/app/(site)/components/CtaLink";
import { usePathname } from "next/navigation";

interface Refund_ReviewCtaProps {
  orderedProductId: string | undefined;
  isDelievered: boolean | undefined;
  hasBeenReviewed?: boolean;
  productId: string;
}

export const Refund_ReviewCta: React.FC<Refund_ReviewCtaProps> = ({
  orderedProductId,
  hasBeenReviewed,
  isDelievered,
  productId,
}) => {
  const pathname = usePathname();

  return (
    <>
      {isDelievered && (
        <div className="flex flex-shrink-0 flex-col gap-2 max-sm:w-12 sm:pt-2">
          <CtaLink href={`${pathname}/request?type=Return`}>
            <p className="cursor-pointer text-xs font-medium text-themeBlue sm:text-sm">
              Return / Refund
            </p>
          </CtaLink>

          {!hasBeenReviewed && (
            <CtaLink
              href={`/user/myReviews/write-review?productId=${orderedProductId}&orderedProductId=${productId}&isHistory=false`}
            >
              <p className="cursor-pointer text-xs font-medium text-themeBlue sm:text-sm">
                Review
              </p>
            </CtaLink>
          )}
        </div>
      )}
    </>
  );
};
