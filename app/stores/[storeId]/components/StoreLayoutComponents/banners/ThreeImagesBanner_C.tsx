import React from "react";
import Image from "next/image";
import { PlacholderImage } from "../PlaceholderImage";
import { Module } from "../Module";

interface ThreeImagesBanner_CProps {
  data: {
    banner1?: string;
    banner2?: string;
    banner3?: string;
    moduleHeading?: string;
    hideModuleHeading?: boolean;
  };
}

export default function ThreeImagesBanner_C({
  data,
}: ThreeImagesBanner_CProps) {
  // if(!data.banner1 || !data.banner2 || !data.banner3) return

  return (
    <Module
      moduleHeading={data.moduleHeading}
      hideModuleHeading={data.hideModuleHeading}
    >
      <div className="grid grid-cols-1 gap-4">
        <div className="relative aspect-3 h-auto w-full ">
          {data.banner1 ? (
            <Image
              alt="Banner 1"
              src={data.banner1}
              fill
              className=" object-cover"
            />
          ) : (
            <PlacholderImage className="h-auto w-8" />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 min-[520px]:mx-8 min-[520px]:gap-8">
          <div className="relative aspect-1 h-auto w-full ">
            {data.banner2 ? (
              <Image
                alt="Banner 2"
                src={data.banner2}
                fill
                className=" object-cover"
              />
            ) : (
              <PlacholderImage className="h-auto w-8" />
            )}
          </div>
          <div className="relative aspect-1 h-auto w-full ">
            {data.banner3 ? (
              <Image
                alt="Banner 3"
                src={data.banner3}
                fill
                className=" object-cover"
              />
            ) : (
              <PlacholderImage className="h-auto w-8" />
            )}
          </div>
        </div>
      </div>
    </Module>
  );
}
