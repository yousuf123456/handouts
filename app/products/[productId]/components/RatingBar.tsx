"use client";
import { RatingStars } from "@/app/components/RatingStars";
import styled from "@emotion/styled";
import { useMediaQuery } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import React, { useMemo } from "react";

interface RatingBarProps {
  label: string;
  ratingNumber: number;
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
    if (isSmallDivices) return "100%";
    if (isMediumDivices) return 192;

    return 248;
  };

  const getProgressBarHeight = () => {
    if (isSmallDivices) return 10;
    if (isMediumDivices) return 16;
    if (isLargeDevices) return 20;

    return 24;
  };

  const progressBarWidth = getProgressBarWidth();
  const progressBarHeight = getProgressBarHeight();

  const progressBarBorderRadius = isSmallDivices ? 12 : 0;

  return (
    <div className="flex w-full items-center gap-2 min-[440px]:gap-4 sm:gap-3">
      <div className="hidden sm:block">
        <RatingStars
          defaultValue={ratingNumber}
          iconSize="text-[14px] md:text-[16px]"
        />
      </div>

      <p className="w-12 flex-shrink-0 font-text text-xs font-semibold text-black sm:hidden">
        {label}
      </p>

      <div className="max-sm:w-full">
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

      <p className="w-7 text-center font-text text-xs font-bold text-black sm:text-sm md:text-base">
        {ratingNumberCount}
      </p>
    </div>
  );
};
