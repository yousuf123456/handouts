import { getRecomendedProducts } from "@/app/actions/recomendations/getRecomendedProducts";
import { ProductCard } from "@/app/components/ProductCard";
import { ProductsListLayout } from "@/app/components/ProductsListLayout";
import React from "react";
import { Module } from "../Module";

interface JustForYouProps {
  storeId: string;
}

export const JustForYou = async ({ storeId }: JustForYouProps) => {
  const recomendedProducts = (await getRecomendedProducts({
    fromSpecificStore: true,
    storeId: storeId,
  })) as any;

  if (!recomendedProducts.length) return;

  return (
    <Module moduleHeading="Just For You">
      <div className="flex flex-col gap-4">
        <ProductsListLayout>
          {recomendedProducts.map((product: any, i: number) => (
            <ProductCard key={i} dynamic={true} product={product} />
          ))}
        </ProductsListLayout>
      </div>
    </Module>
  );
};
