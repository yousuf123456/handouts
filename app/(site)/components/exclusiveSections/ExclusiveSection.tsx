"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/app/components/Button";
import clsx from "clsx";

interface ExclusiveSectionProps {
  image: string;
  text: string;
  id: string;
  className: string;
}

export const ExclusiveSection: React.FC<ExclusiveSectionProps> = ({
  image,
  text,
  id,
  className,
}) => {
  return (
    <div
      id={id}
      className={clsx(
        "relative h-56 w-full px-0 min-[470px]:h-72 sm:px-24 min-[900px]:h-52 min-[900px]:px-0 min-[1100px]:h-64",
        className,
      )}
    >
      <Image
        src={image}
        alt="Image"
        fill
        loading="lazy"
        className="object-cover px-0 sm:px-16 min-[900px]:px-0"
      />

      <h1 className="relative top-3 inline bg-themeSecondary bg-opacity-50 px-2 font-heading text-xl font-bold text-white sm:text-2xl">
        {text}
      </h1>

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <Button variant="default" className="bg-opacity-75 text-xs sm:text-sm">
          Explore
        </Button>
      </div>
    </div>
  );
};
