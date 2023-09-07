import { Heading } from "@/app/(site)/components/Heading";
import { ProductCard } from "@/app/components/ProductCard";
import { ProductsListLayout } from "@/app/components/ProductsListLayout";
import { CardProductType } from "@/app/types";
import React from "react";

interface ProductsFromSameStoreProps {
  products: CardProductType[];
}

export const ProductsFromSameStore: React.FC<ProductsFromSameStoreProps> = ({
  products,
}) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <Heading>From the Same Store</Heading>

      <div className="hidden w-full gap-3 lg:grid lg:grid-cols-1 lg:gap-0">
        {products.map((product, i) => (
          <ProductCard key={i} product={product as any} />
        ))}
      </div>

      <div className="lg:hidden">
        <ProductsListLayout>
          {products.map((product, i) => (
            <ProductCard dynamic key={i} product={product as any} />
          ))}
        </ProductsListLayout>
      </div>
    </div>
  );
};
