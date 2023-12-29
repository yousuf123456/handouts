"use client";
import React, { useEffect, useState } from "react";

import clsx from "clsx";
import { Heading } from "../Heading";
import { ExclusiveSection } from "./ExclusiveSection";

import { useExclusiveSections } from "@/app/hooks/useExclusiveSections";
import { useBreakpoint } from "@/app/hooks/useBreakpoints";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/app/utils/cn";
import Autoplay from "embla-carousel-autoplay";

export const ExclusiveSections = () => {
  const [api, setApi] = useState<CarouselApi>();
  const exclusiveSections = useExclusiveSections();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const breakpoint = useBreakpoint();
  const showCarousel = breakpoint < 900;

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setSelectedIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const chevronCs =
    "absolute top-1/2 hidden -translate-y-1/2 justify-center sm:flex";

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
            setApi={setApi}
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 6000,
              }),
            ]}
          >
            <CarouselContent>
              {exclusiveSections.map((exclusiveSection, index) => (
                <CarouselItem key={index}>
                  <ExclusiveSection
                    key={index}
                    id={String(index)}
                    image={exclusiveSection.image}
                    text={exclusiveSection.text}
                    className={clsx("")}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselNext className={cn(chevronCs, "right-0")} />
            <CarouselPrevious className={cn(chevronCs, "left-0")} />

            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-3 sm:hidden">
              {Array.from({ length: exclusiveSections.length || 0 }).map(
                (_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-[6px] w-[6px] rounded-full bg-black opacity-30",
                      i === selectedIndex && "opacity-90",
                    )}
                  />
                ),
              )}
            </div>
          </Carousel>
        )}
      </div>
    </div>
  );
};
