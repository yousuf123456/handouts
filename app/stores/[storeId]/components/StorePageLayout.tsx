import React from "react";
import { LayoutComponentType } from "@/app/types";
import { JustForYou } from "./StoreLayoutComponents/products/JustForYou";
import { DynamicComponent } from "./StoreLayoutComponents/DynamicComponent";
import CarouselBanner from "./StoreLayoutComponents/banners/CarouselBanner";

export const StorePageLayout = ({
  layout,
  storeId,
}: {
  layout: LayoutComponentType[];
  storeId: string;
}) => {
  return (
    <div className="flex flex-col gap-16 max-sm:px-3">
      {layout.map((layoutComponent, i) => {
        if (i === 0 || i === layout.length - 1) return;

        return (
          <DynamicComponent
            layoutComponent={layoutComponent}
            storeId={storeId}
            key={i}
          />
        );
      })}

      <CarouselBanner data={{ image1: "", image2: "" }} />
      <JustForYou storeId={storeId} />
    </div>
  );
};
