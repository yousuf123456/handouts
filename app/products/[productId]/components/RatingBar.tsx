"use client";
import { cn } from "@/lib/utils";
import styled from "@emotion/styled";

import { useMediaQuery } from "@mui/material";
import { RatingStars } from "@/app/components/RatingStars";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import React, { useMemo } from "react";

interface RatingBarProps {
  label: string;
  ratingNumber: number;
  smallSizeOnly?: boolean;
  ratingsCount: number | undefined;
  ratingNumberCount: number | undefined;
}

const StyledLinearProgressBar = styled(LinearProgress)({
  [`&.${linearProgressClasses.determinate}`]: { backgroundColor: "#fde047" },
  [`&.${linearProgressClasses.determinate} > .${linearProgressClasses.bar1Determinate}`]:
    { backgroundColor: "#fde047" },
});

export const RatingBar: React.FC<RatingBarProps> = ({
  label,
  ratingNumber,
  ratingsCount,
  smallSizeOnly,
  ratingNumberCount,
}) => {
  const ratingPercentage = useMemo(() => {
    if (ratingsCount && ratingNumberCount) {
      return (ratingNumberCount / ratingsCount) * 100;
    }
    return 0;
  }, [ratingNumberCount, ratingsCount]);

  const isLargeDevices = useMediaQuery("(max-width:1024px)");
  const isMediumDivices = useMediaQuery("(max-width:768px)");
  const isSmallDivices = useMediaQuery("(max-width:640px)");

  const getProgressBarWidth = () => {
    if (isSmallDivices || smallSizeOnly) return "100%";
    if (isMediumDivices) return 192;

    return 248;
  };

  const getProgressBarHeight = () => {
    if (isSmallDivices || smallSizeOnly) return 10;
    if (isMediumDivices) return 16;
    if (isLargeDevices) return 20;

    return 24;
  };

  const progressBarWidth = getProgressBarWidth();
  const progressBarHeight = getProgressBarHeight();

  const progressBarBorderRadius = isSmallDivices || smallSizeOnly ? 12 : 0;

  return (
    <div className="flex w-full items-center gap-2 min-[440px]:gap-4 sm:gap-3">
      <div className={cn("hidden", !smallSizeOnly && "sm:block")}>
        <RatingStars
          defaultValue={ratingNumber}
          iconSize="text-[14px] md:text-[16px]"
        />
      </div>

      <p
        className={cn(
          "w-12 flex-shrink-0 font-roboto text-xs text-black sm:hidden",
          smallSizeOnly && "sm:block",
        )}
      >
        {label}
      </p>

      <div className={cn("max-sm:w-full", smallSizeOnly && "w-full")}>
        <StyledLinearProgressBar
          value={ratingPercentage}
          style={{ backgroundColor: "#f5f5f5" }}
          variant="determinate"
          sx={{
            color: "#fcd34d",
            height: progressBarHeight,
            width: progressBarWidth,
            borderRadius: progressBarBorderRadius,
          }}
        />
      </div>

      <p
        className={cn(
          "w-7 text-center font-roboto text-xs text-black",
          !smallSizeOnly && "sm:text-sm md:text-base",
        )}
      >
        {ratingNumberCount}
      </p>
    </div>
  );
};
