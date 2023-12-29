import React, { Suspense } from "react";

import { Heading } from "@/app/(site)/components/Heading";
import { getProductInfoById } from "@/app/actions/getProductDetailsById/getProductInfoById";

import { getSimilarProducts } from "@/app/actions/recomendations/getSimilarProducts";
import { ProductCard } from "@/app/components/ProductCard";
import { ProductsListLayout } from "@/app/components/ProductsListLayout";
import { ProductCardType } from "@/app/types";
import { Container } from "../Container";
import { SimilarProductsLoading } from "./loadings/SimilarProductsLoading";

interface SimilarProductsProps {
  productId: string;
}

export default async function SimilarProducts({
  productId,
}: SimilarProductsProps) {
  const productInfo = (await getProductInfoById(productId)) as any;

  const productData = {
    name: productInfo?.name,
    keywords: productInfo?.keywords,
    attributes: productInfo?.attributes,
    categoryTreeData: productInfo?.categoryTreeData,
  };

  const similarProducts = (await getSimilarProducts(
    productData,
    productId,
  )) as unknown as ProductCardType[];

  if (!(similarProducts?.length > 0)) return;

  return (
    <Container>
      <Suspense key="similarProducts" fallback={<SimilarProductsLoading />}>
        <div className="flex flex-col gap-4">
          <Heading>Similar Products</Heading>

          <ProductsListLayout className="lg:grid-cols-4 xl:grid-cols-5">
            {similarProducts.map((product, i) => (
              <ProductCard dynamic key={i} product={product} />
            ))}
          </ProductsListLayout>
        </div>
      </Suspense>
    </Container>
  );
}
