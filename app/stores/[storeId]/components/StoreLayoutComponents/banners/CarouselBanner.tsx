"use client";

import React from "react";
import Image from "next/image";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import clsx from "clsx";
import { cn } from "@/lib/utils";
import { Module } from "../Module";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CarouselBannerProps {
  data: {
    [key: string]: string;
  };
}

export default function CarouselBanner({ data }: CarouselBannerProps) {
  const images = Object.values(data);

  console.log(images, data);
  if (images.length === 0) return;

  const buttonsCs = "absolute top-1/2 -translate-y-1/2";

  return (
    <Module
      moduleHeading={data.moduleHeading}
      hideModuleHeading={data.hideModuleHeading as unknown as boolean}
    >
      <div className="relative w-full">
        <Carousel>
          <CarouselContent>
            {images.map((image, i) => (
              <CarouselItem key={i}>
                <div
                  className={cn(
                    "relative flex aspect-2 h-auto w-full items-center justify-center bg-neutral-100",
                    "min-[540px]:aspect-3 lg:aspect-4",
                  )}
                >
                  {image ? (
                    <Image
                      fill
                      src={image}
                      alt="Banner"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className={clsx("relative h-9 w-12", "md:h-10 md:w-14")}
                    >
                      <Image
                        fill
                        src={"/images/placeholders/imagePlaceholder.jpg"}
                        alt="Image Placeholder"
                      />
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselNext className={cn(buttonsCs, "right-2 md:right-6")} />
          <CarouselPrevious className={cn(buttonsCs, "left-2 md:left-6 ")} />
        </Carousel>
      </div>
    </Module>
  );
}
