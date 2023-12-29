import React from "react";
import Image from "next/image";
import { PlacholderImage } from "../PlaceholderImage";
import { Module } from "../Module";

interface ThreeImagesBanner_B {
  data: {
    banner1?: string;
    banner2?: string;
    banner3?: string;
    moduleHeading?: string;
    hideModuleHeading?: boolean;
  };
}

export default function ThreeImagesBanner_B({ data }: ThreeImagesBanner_B) {
  // if (!data.banner1 || !data.banner2 || !data.banner3) return

  return (
    <Module
      moduleHeading={data.moduleHeading}
      hideModuleHeading={data.hideModuleHeading}
    >
      <div className="grid grid-cols-5 items-center gap-4">
        <div className="relative col-span-3 aspect-2 md:aspect-3 ">
          {data.banner2 ? (
            <Image
              alt="Banner 1"
              src={data.banner2}
              fill
              className=" object-cover"
            />
          ) : (
            <PlacholderImage className="h-auto w-10 lg:w-14" />
          )}
        </div>

        <div className="relative col-span-1 aspect-1 h-auto ">
          {data.banner1 ? (
            <Image
              alt="Banner 2"
              src={data.banner1}
              fill
              className=" object-cover"
            />
          ) : (
            <PlacholderImage className="h-auto w-10 lg:w-14" />
          )}
        </div>

        <div className="relative col-span-1 aspect-1 h-auto ">
          {data.banner3 ? (
            <Image
              alt="Banner 3"
              src={data.banner3}
              fill
              className=" object-cover"
            />
          ) : (
            <PlacholderImage className="h-auto w-10 lg:w-14" />
          )}
        </div>
      </div>
    </Module>
  );
}
