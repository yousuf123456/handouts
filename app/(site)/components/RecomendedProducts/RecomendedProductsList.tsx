import { getRecomendedProducts } from "@/app/actions/recomendations/getRecomendedProducts";
import { ProductCard } from "@/app/components/ProductCard";
import { ProductsListLayout } from "@/app/components/ProductsListLayout";
import {
  ProductCardType,
  fullCategoryDiscountedProductType,
} from "@/app/types";
import Image from "next/image";
import React from "react";

export const RecomendedProductsList = async () => {
  const recomendedProducts =
    (await getRecomendedProducts()) as unknown as ProductCardType[];

  if (!recomendedProducts) {
    return <p>Browse some products to start getting recomendations</p>;
  }

  return (
    <ProductsListLayout>
      {recomendedProducts.map((product, i) => (
        <ProductCard key={i} dynamic={true} product={product} />
      ))}
    </ProductsListLayout>
  );
};
