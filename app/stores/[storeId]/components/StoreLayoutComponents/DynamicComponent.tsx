import React from "react";
import dynamic from "next/dynamic";
import { LayoutComponentType } from "@/app/types";

const FeaturedImageBanner = dynamic(
  () => import("./banners/FeaturedImageBanner"),
);

const FourImagesBanner_A = dynamic(
  () => import("./banners/FourImagesBanner_A"),
);

const FourImagesBanner_B = dynamic(
  () => import("./banners/FourImagesBanner_B"),
);

const ThreeImagesBanner_A = dynamic(
  () => import("./banners/ThreeImagesBanner_A"),
);

const ThreeImagesBanner_B = dynamic(
  () => import("./banners/ThreeImagesBanner_B"),
);

const ThreeImagesBanner_C = dynamic(
  () => import("./banners/ThreeImagesBanner_C"),
);

const CarouselBanner = dynamic(() => import("./banners/CarouselBanner"));

const UnderBudgetProducts = dynamic(
  () => import("./products/UnderBudgetProducts"),
);

const ProductsRecomendation = dynamic(
  () => import("./products/ProductsRecomendation"),
);

const SliderProductsRecomendation = dynamic(
  () => import("./products/SliderProductsRecomendation"),
);

const BannerSliderProducts = dynamic(
  () => import("./products/BannerSliderProducts"),
);

const Voucher = dynamic(() => import("./promotions/Voucher"));

const LayoutComponentsMap: { [key: string]: any } = {
  FeaturedImageBanner,
  ThreeImagesBanner_A,
  ThreeImagesBanner_B,
  ThreeImagesBanner_C,
  FourImagesBanner_A,
  FourImagesBanner_B,
  CarouselBanner,

  UnderBudgetProducts,
  BannerSliderProducts,
  ProductsRecomendation,
  SliderProductsRecomendation,

  Voucher,
};

interface DynamicComponentProps {
  layoutComponent: LayoutComponentType;
  storeId: string;
}

export const DynamicComponent: React.FC<DynamicComponentProps> = ({
  layoutComponent,
  storeId,
}) => {
  const doesLayoutComponentExists = Object.keys(LayoutComponentsMap).includes(
    layoutComponent.componentName,
  );

  const LayoutComponent = LayoutComponentsMap[layoutComponent.componentName];

  return (
    <div>
      {doesLayoutComponentExists && (
        <LayoutComponent data={layoutComponent.data} storeId={storeId} />
      )}
      {!doesLayoutComponentExists && <p>To Be Made</p>}
    </div>
  );
};
