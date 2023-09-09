"use client";
import React, { useState } from "react";

import Rating from "@mui/material/Rating";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { cn } from "@/app/utils/cn";

const labels: { [index: string]: string } = {
  1: "Very Poor",
  2: "Poor",
  3: "Neutral",
  4: "Satisfactory",
  5: "Delightfull",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

interface RatingStarsFormProps {
  href?: string;
  value: number;
  hover?: number;
  showOnly?: boolean;
  noLabelOnRes?: boolean;
  size?: "small" | "medium" | "large";
  setHover?: React.Dispatch<React.SetStateAction<number>>;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
}

export const RatingStarsForm: React.FC<RatingStarsFormProps> = ({
  href,
  size,
  value,
  hover,
  showOnly,
  setHover,
  setValue,
  noLabelOnRes,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => href && router.push(href)}
      className={clsx(
        "flex w-full items-center justify-center gap-2",
        href && "cursor-pointer",
      )}
    >
      <Rating
        name="hover-feedback"
        value={value}
        getLabelText={getLabelText}
        size={size || "medium"}
        onChange={(event: any, newValue: any) => {
          if (newValue !== null && setValue) setValue(newValue);
        }}
        onChangeActive={(event: any, newHover: any) => {
          if (setHover) setHover(newHover);
        }}
        icon={
          <div>
            <FaStar fontSize={"inherit"} className="mx-1 hover:text-red-300" />
          </div>
        }
        emptyIcon={
          <div>
            <FaStar fontSize={"inherit"} className="mx-1 text-slate-300" />
          </div>
        }
        readOnly={showOnly}
      />

      <p
        className={cn(
          "hidden w-20 text-sm text-black md:block",
          noLabelOnRes && "hidden lg:block",
        )}
      >
        {
          //@ts-ignore
          labels[hover ? (hover !== -1 ? hover : value) : value]
        }
      </p>
    </div>
  );
};
