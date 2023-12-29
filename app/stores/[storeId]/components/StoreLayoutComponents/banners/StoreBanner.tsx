import React from "react";
import Image from "next/image";
import { PlacholderImage } from "../PlaceholderImage";
import { cn } from "@/app/utils/cn";
import { Navigation } from "./Navigation";

interface StoreBannerProps {
  data: {
    isColorBanner?: boolean;
    bannerColor?: string;
    storeName?: string;
    banner?: string;
    logo?: string;
  };
  storeId: string;
  section: "homepage" | "products" | "profile";
}

export const StoreBanner: React.FC<StoreBannerProps> = ({
  data,
  storeId,
  section,
}) => {
  return (
    <div className="relative flex w-full flex-col gap-5">
      <div
        className="relative aspect-3 h-auto w-full sm:aspect-4 lg:aspect-5"
        style={
          data.isColorBanner ? { backgroundColor: data.bannerColor } : undefined
        }
      >
        {!data.isColorBanner &&
          (data.banner ? (
            <Image
              alt="Store Banner"
              fill={!!data.banner}
              className={cn("object-cover", !data.banner && "h-auto w-16")}
              src={data.banner || "/imagePlaceholder.jpg"}
            />
          ) : (
            <PlacholderImage className="h-auto w-10 sm:w-14 lg:w-16" />
          ))}
      </div>

      <div className="flex justify-center px-0 md:justify-between lg:px-6 xl:px-12">
        <div className="absolute left-5 top-5 flex gap-4 md:static">
          <div className="relative h-16 w-16 overflow-hidden lg:h-20 lg:w-20">
            {data.logo ? (
              <Image
                src={data.logo}
                alt="Store Logo"
                fill
                className=" object-cover"
              />
            ) : (
              <PlacholderImage
                className="h-auto w-6 sm:w-7 lg:w-9"
                ContainerCs="bg-blue-200 md:bg-blue-100"
              />
            )}
          </div>

          <div className="flex flex-col gap-0">
            <p className="font-text text-sm font-semibold text-black sm:text-base sm:text-themeBlue">
              {data.storeName || "Store Name Here"}
            </p>
          </div>
        </div>

        <Navigation storeId={storeId} currentSection={section} />
      </div>
    </div>
  );
};
