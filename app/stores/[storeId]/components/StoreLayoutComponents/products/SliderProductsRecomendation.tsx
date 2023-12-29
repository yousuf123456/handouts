import React from "react";

import { Module } from "../Module";
import { getProducts } from "./UnderBudgetProducts";
import { ProductCard } from "@/app/components/ProductCard";
import { ProductsListLayout } from "@/app/components/ProductsListLayout";

interface ProductsRecomendationProps {
  data: {
    products: string[];
    moduleHeading?: string;
    noOfProdutsToShow?: number;
    hideModuleHeading?: boolean;
    productsSelection: "automatic" | "manual" | "filter";
  };

  storeId: string;
}

export default async function SliderProductsRecomendation({
  data,
  storeId,
}: ProductsRecomendationProps) {
  if (
    (data.productsSelection === "manual" ||
      data.productsSelection === "filter") &&
    data.products?.length === 0
  )
    return;

  const products = await getProducts({
    storeId,
    productsSelection: data.productsSelection,
    noOfProductsToShow: data.noOfProdutsToShow,
    productIds: data.products,
  });

  if (products.length === 0) return;

  return (
    <Module
      moduleHeading={data.moduleHeading}
      hideModuleHeading={data.hideModuleHeading}
    >
      <div className="flex gap-3 overflow-x-auto scrollbar-none">
        {products.map((product, i) => (
          <ProductCard key={i} product={product as any} />
        ))}
      </div>
    </Module>
  );
}
