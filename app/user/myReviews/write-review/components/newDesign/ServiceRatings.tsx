import React from "react";
import { SectionHeading } from "./SectionHeading";
import { ResponsesForm } from "../ResponsesForm";
import clsx from "clsx";
import { cn } from "@/app/utils/cn";
import useMediaQuery from "@mui/material/useMediaQuery";

interface ServiceRatingsProps {
  href?: string;
  compact?: boolean;
  showOnly?: boolean;
  horizontal?: boolean;
  noLabelOnRes?: boolean;
  withOutBorder?: boolean;
  storeRatingHover?: number;
  storeRatingValue: number | null;
  setStoreRatingValue?:
    | React.Dispatch<React.SetStateAction<number | null>>
    | undefined;

  setStoreRatingHover?:
    | React.Dispatch<React.SetStateAction<number>>
    | undefined;
}

export const ServiceRatings: React.FC<ServiceRatingsProps> = ({
  href,
  compact,
  showOnly,
  horizontal,
  noLabelOnRes,
  withOutBorder,
  storeRatingHover,
  storeRatingValue,
  setStoreRatingHover,
  setStoreRatingValue,
}) => {
  return (
    <div
      className={cn(
        "flex",
        !horizontal && "flex-col",
        horizontal && "items-start md:items-center",
        withOutBorder ? "gap-1" : "gap-3",
        !withOutBorder && "rounded-md border-[1px] border-slate-300 p-3",
      )}
    >
      <SectionHeading>Seller Rating :</SectionHeading>

      <div className={clsx(!horizontal && "w-full")}>
        <ResponsesForm
          href={href}
          compact={compact}
          showOnly={showOnly}
          value={storeRatingValue}
          hover={storeRatingHover}
          noLabelOnRes={noLabelOnRes}
          setValue={setStoreRatingValue}
          setHover={setStoreRatingHover}
        />
      </div>
    </div>
  );
};
