"use client";
import { cn } from "@/app/utils/cn";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

export const Testemonials = () => {
  const buttonsCs = "absolute top-1/2 -translate-y-1/2";

  return (
    <div className="w-full">
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 3 }, (_, index) => (
            <CarouselItem key={index}>
              <div
                key={index}
                className="flex h-80 w-full items-center justify-center bg-themeBlue bg-opacity-50"
              >
                <h1 className="font-text text-lg font-semibold text-white">
                  Slides Here
                </h1>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselNext className={cn(buttonsCs, "right-2 md:right-5")} />
        <CarouselPrevious className={cn(buttonsCs, "left-2 md:left-5")} />
      </Carousel>
    </div>
  );
};
