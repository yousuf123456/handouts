import React from "react";

import { getStoreProducts } from "@/app/actions/getProductDetailsById/getStoreProducts";
import { ProductsFromSameStore } from "../ProductsFromSameStore";
import { Container } from "../Container";
import { heavyAction } from "@/app/actions/heavyAction";

interface ProductsFromStoreProps {
  productId: string;
}

export const ProductsFromStore: React.FC<ProductsFromStoreProps> = async ({
  productId,
}) => {
  const productsFromSameStore = await getStoreProducts(productId);

  if (!productsFromSameStore) {
    return;
  }

  return (
    <div className="flex-shrink-0 max-lg:w-full">
      <Container>
        <ProductsFromSameStore products={productsFromSameStore} />
      </Container>
    </div>
  );
};
