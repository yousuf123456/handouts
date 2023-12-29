import React from "react";
import { getProducts } from "./UnderBudgetProducts";
import { ProductCard } from "@/app/components/ProductCard";

import Image from "next/image";
import { Module } from "../Module";

interface BannerSliderProductsProps {
  data: {
    banner?: string;
    products: string[];
    moduleHeading?: string;
    noOfProdutsToShow?: number;
    hideModuleHeading?: boolean;
    productsSelection: "automatic" | "manual" | "filter";
  };

  storeId: string;
}

export default async function BannerSliderProducts({
  data,
  storeId,
}: BannerSliderProductsProps) {
  if (
    ((data.productsSelection === "manual" ||
      data.productsSelection === "filter") &&
      data.products?.length === 0) ||
    !data.banner
  )
    return;

  const products = await getProducts({
    productIds: data.products,
    storeId,
    productsSelection: data.productsSelection,
    noOfProductsToShow: data.noOfProdutsToShow,
  });

  if (products.length === 0) return;

  return (
    <Module
      moduleHeading={data.moduleHeading}
      hideModuleHeading={data.hideModuleHeading}
    >
      <div className="flex flex-col gap-4">
        <div className="relative aspect-2 h-auto w-full min-[540px]:aspect-3 lg:aspect-4">
          {
            <Image
              fill
              alt="Banner"
              src={data.banner}
              className=" object-cover"
            />
          }
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-none">
          {products.map((product, i) => (
            <ProductCard key={i} product={product as any} />
          ))}
        </div>
      </div>
    </Module>
  );
}
