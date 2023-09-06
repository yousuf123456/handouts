import { RatingStars } from "@/app/components/RatingStars";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import React from "react";
import { HiChevronRight } from "react-icons/hi";

interface ProductRatingProps {
  avgRating: number;
  ratingsCount: number;
}

export const ProductRating: React.FC<ProductRatingProps> = ({
  avgRating,
  ratingsCount,
}) => {
  const isSmallDevices = useMediaQuery("(max-width:640px)");

  const onClick = () => {
    const ratingsElement = document.getElementById("ratings");
    const topScrollPos =
      ratingsElement?.getBoundingClientRect().top! + window.scrollY;
    window.scrollTo({
      behavior: "smooth",
      top: topScrollPos - 50,
    });
  };

  return (
    <div onClick={onClick} className="flex cursor-pointer items-center gap-1">
      <RatingStars
        iconSize="text-[16px] min-[520px]:text-[18px] sm:text-[20px] md:text-[22px] lg:text-[18px]"
        defaultValue={avgRating}
      />

      <p className="text-xs font-medium text-black sm:text-sm">
        {" "}
        {avgRating + "/5"}
      </p>

      <p className="text-xs font-medium text-black sm:text-sm">
        {"(" + ratingsCount + ")"}
      </p>

      <HiChevronRight className="h-4 w-4 text-black" />
    </div>
  );
};
