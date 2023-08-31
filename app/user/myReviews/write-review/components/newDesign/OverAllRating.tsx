import React from "react";
import { SectionHeading } from "./SectionHeading";
import { RatingStarsForm } from "../RatingStarsForm";

interface OverAllRatingProps {
  href?: string;
  showOnly?: boolean;
  productRatingValue: number;
  size?: "large" | "medium" | "small";
  productRatingHover?: number | undefined;

  setProductRatingValue?:
    | React.Dispatch<React.SetStateAction<number>>
    | undefined;
  setProductRatingHover?:
    | React.Dispatch<React.SetStateAction<number>>
    | undefined;
}

export const OverAllRating: React.FC<OverAllRatingProps> = ({
  size,
  href,
  showOnly,
  productRatingValue,
  productRatingHover,
  setProductRatingHover,
  setProductRatingValue,
}) => {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-3 rounded-md border-[1px] border-slate-300 p-3">
        <SectionHeading>Overall Rating</SectionHeading>

        <div className="">
          <RatingStarsForm
            href={href}
            showOnly={showOnly}
            size={size || "large"}
            value={productRatingValue}
            hover={productRatingHover}
            setValue={setProductRatingValue}
            setHover={setProductRatingHover}
          />
        </div>
      </div>
    </div>
  );
};
