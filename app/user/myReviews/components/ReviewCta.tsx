import { CtaLink } from "@/app/(site)/components/CtaLink";
import { Button } from "@/app/components/Button";
import React from "react";

interface ReviewCtaProps {
  storeName: string;
  productId: string;
  isHistory: boolean;
  orderedProductId: string;
}

export const ReviewCta: React.FC<ReviewCtaProps> = ({
  storeName,
  productId,
  isHistory,
  orderedProductId,
}) => {
  const searchParams = `orderedProductId=${orderedProductId}&productId=${productId}&isHistory=${isHistory}`;

  return (
    <div className="flex w-fit flex-shrink-0 flex-col justify-between sm:w-28 md:w-48 md:pt-2">
      <div className="hidden items-center gap-2 md:flex">
        <p className="flex-shrink-0 font-text text-xs text-slate-500">
          Sold By
        </p>

        <p className="line-clamp-1 font-text text-sm text-themeBlue">
          {storeName}
        </p>
      </div>

      <CtaLink href={`/user/myReviews/write-review?${searchParams}`}>
        <div className="flex w-full justify-center">
          <Button
            variant="outline"
            className="hidden h-8 w-full items-center justify-center md:flex"
          >
            Review
          </Button>

          <Button className="rounded-md px-2 text-xs min-[560px]:px-3 min-[560px]:text-sm md:hidden">
            Review
          </Button>
        </div>
      </CtaLink>
    </div>
  );
};
