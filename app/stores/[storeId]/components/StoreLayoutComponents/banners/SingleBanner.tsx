import React from "react";
import Image from "next/image";
import { PlacholderImage } from "../PlaceholderImage";
import { Module } from "../Module";

interface SingleBannerProps {
  data: {
    banner?: string;
    moduleHeading?: string;
    hideModuleHeading?: boolean;
  };
}

export default function SingleBanner({ data }: SingleBannerProps) {
  if (!data.banner) return;

  return (
    <Module
      moduleHeading={data.moduleHeading}
      hideModuleHeading={data.hideModuleHeading}
    >
      <div className="relative aspect-2 h-auto w-full min-[540px]:aspect-3 lg:aspect-4">
        {data.banner ? (
          <Image
            alt="Banner"
            src={data.banner}
            fill
            className=" object-cover"
          />
        ) : (
          <PlacholderImage className="h-auto w-10 sm:w-12 lg:w-14" />
        )}
      </div>
    </Module>
  );
}
