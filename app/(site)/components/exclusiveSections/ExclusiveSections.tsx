"use client";
import React from "react";
import { Heading } from "../Heading";
import { ExclusiveSection } from "./ExclusiveSection";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import clsx from "clsx";

import { useExclusiveSections } from "@/app/hooks/useExclusiveSections";
import { useBreakpoint } from "@/app/hooks/useBreakpoints";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

export const ExclusiveSections = () => {
  const exclusiveSections = useExclusiveSections();

  const chevronClassName =
    "z-50 w-6 h-full sm:w-8 cursor-pointer min-[900px]:hidden flex justify-center items-center transition-all bg-themeSecondary bg-opacity-30 hover:bg-opacity-60 text-white font-bold";

  const renderArrowPrev = (
    clickHandler: () => void,
    hasPrev: boolean,
    label: string,
  ) => (
    <HiChevronLeft
      className={clsx("absolute top-1/2 -translate-y-1/2", chevronClassName)}
      onClick={clickHandler}
    />
  );
  const renderArrowNext = (
    clickHandler: () => void,
    hasPrev: boolean,
    label: string,
  ) => (
    <HiChevronRight
      className={clsx(
        "absolute right-0 top-1/2 -translate-y-1/2",
        chevronClassName,
      )}
      onClick={clickHandler}
    />
  );

  const breakpoint = useBreakpoint();
  const showCarousel = breakpoint < 900;

  return (
    <div className="flex flex-col gap-1">
      <Heading>Explore Our Exclusive Sections</Heading>

      <div className="relative">
        <div
          id="cards-cont"
          className="relative hidden gap-4 overflow-hidden scrollbar-none min-[900px]:grid min-[900px]:grid-cols-3"
        >
          {exclusiveSections.map((exclusiveSection, index) => (
            <ExclusiveSection
              key={index}
              id={String(index)}
              image={exclusiveSection.image}
              text={exclusiveSection.text}
              className={clsx("")}
            />
          ))}
        </div>

        {showCarousel && (
          <Carousel
            preventMovementUntilSwipeScrollTolerance
            swipeScrollTolerance={50}
            axis="horizontal"
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            interval={4500}
            transitionTime={500}
            swipeable={true}
            showStatus={false}
            stopOnHover={false}
            renderArrowPrev={renderArrowPrev}
            renderArrowNext={renderArrowNext}
          >
            {exclusiveSections.map((exclusiveSection, index) => (
              <ExclusiveSection
                key={index}
                id={String(index)}
                image={exclusiveSection.image}
                text={exclusiveSection.text}
                className={clsx("")}
              />
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};
