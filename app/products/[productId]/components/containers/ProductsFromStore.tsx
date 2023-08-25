import React from "react";

import { getStoreProducts } from "@/app/actions/getProductDetailsById/getStoreProducts";
import { ProductsFromSameStore } from "../ProductsFromSameStore";
import { Container } from "../Container";

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
    <div className="flex-shrink-0">
      <Container className="bg-transparent lg:bg-white">
        <ProductsFromSameStore products={productsFromSameStore} />
      </Container>
    </div>
  );
};
