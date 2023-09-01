"use client";
import React from "react";
import { SectionHeading } from "./SectionHeading";
import { RatingStarsForm } from "../RatingStarsForm";
import clsx from "clsx";
import { useMediaQuery } from "@mui/material";

interface OverAllRatingProps {
  href?: string;
  showOnly?: boolean;
  noLabelOnRes?: boolean;
  withoutBorder?: boolean;
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
  noLabelOnRes,
  withoutBorder,
  productRatingValue,
  productRatingHover,
  setProductRatingHover,
  setProductRatingValue,
}) => {
  const isSmallDevices = useMediaQuery("(max-width:640px)");

  return (
    <div className="w-full">
      <div
        className={clsx(
          "flex w-full flex-col",
          withoutBorder ? "gap-1" : "gap-3",
          !withoutBorder && "rounded-md border-[1px] border-slate-300 p-3",
        )}
      >
        <SectionHeading>Overall Rating :</SectionHeading>

        <div className="">
          <RatingStarsForm
            href={href}
            showOnly={showOnly}
            value={productRatingValue}
            hover={productRatingHover}
            noLabelOnRes={noLabelOnRes}
            setValue={setProductRatingValue}
            setHover={setProductRatingHover}
            size={size || (isSmallDevices ? "medium" : "large")}
          />
        </div>
      </div>
    </div>
  );
};
