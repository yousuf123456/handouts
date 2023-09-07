import { Heading } from "@/app/(site)/components/Heading";
import { getProductInfoById } from "@/app/actions/getProductDetailsById/getProductInfoById";
import { getSimilarProducts } from "@/app/actions/recomendations/getSimilarProducts";
import { ProductCard } from "@/app/components/ProductCard";
import { ProductsListLayout } from "@/app/components/ProductsListLayout";
import { ProductCardType } from "@/app/types";
import React from "react";

interface SimilarProductsProps {
  productId: string;
}

export const SimilarProducts: React.FC<SimilarProductsProps> = async ({
  productId,
}) => {
  const productInfo = await getProductInfoById(productId);

  const productData = {
    name: productInfo?.name,
    keywords: productInfo?.keywords,
    attributes: productInfo?.attributes,
    description: productInfo?.description,
    categoryTreeData: productInfo?.categoryTreeData,
  };

  const similarProducts = (await getSimilarProducts(
    productData,
    productId,
  )) as unknown as ProductCardType[];

  return (
    <div className="flex flex-col gap-4">
      <Heading>Similar Products</Heading>

      <ProductsListLayout className="lg:grid-cols-4 xl:grid-cols-5">
        {similarProducts.map((product, i) => (
          <ProductCard dynamic key={i} product={product} />
        ))}
      </ProductsListLayout>
    </div>
  );
};
