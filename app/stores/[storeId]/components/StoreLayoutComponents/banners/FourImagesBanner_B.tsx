import React from "react";
import Image from "next/image";
import { PlacholderImage } from "../PlaceholderImage";
import { Module } from "../Module";

interface FourImagesBanner_BProps {
  data: {
    banner1?: string;
    banner2?: string;
    banner3?: string;
    banner4?: string;
    moduleHeading?: string;
    hideModuleHeading?: boolean;
  };
}

export default function FourImagesBanner_B({ data }: FourImagesBanner_BProps) {
  // if( !data.banner1 || !data.banner2 || !data.banner3 || !data.banner4)  return

  return (
    <Module
      moduleHeading={data.moduleHeading}
      hideModuleHeading={data.hideModuleHeading}
    >
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-8 items-center gap-4 lg:grid-cols-10">
          <div className="relative col-span-6 aspect-3 lg:col-span-8 lg:aspect-4 ">
            {data.banner1 ? (
              <Image
                alt="Banner 1"
                src={data.banner1}
                fill
                className=" object-cover"
              />
            ) : (
              <PlacholderImage className="h-auto w-9" />
            )}
          </div>
          <div className="relative col-span-2 aspect-1 ">
            {data.banner2 ? (
              <Image
                alt="Banner 2"
                src={data.banner2}
                fill
                className=" object-cover"
              />
            ) : (
              <PlacholderImage className="h-auto w-9" />
            )}
          </div>
        </div>

        <div className="grid grid-cols-8 items-center gap-4 lg:grid-cols-10">
          <div className="relative col-span-2 aspect-1 ">
            {data.banner3 ? (
              <Image
                alt="Banner 3"
                src={data.banner3}
                fill
                className=" object-cover"
              />
            ) : (
              <PlacholderImage className="h-auto w-9" />
            )}
          </div>
          <div className="relative col-span-6 aspect-3 lg:col-span-8 lg:aspect-4 ">
            {data.banner4 ? (
              <Image
                alt="Banner 4"
                src={data.banner4}
                fill
                className=" object-cover"
              />
            ) : (
              <PlacholderImage className="h-auto w-9" />
            )}
          </div>
        </div>
      </div>
    </Module>
  );
}
