"use client";
import React from "react";
import { ProductCard } from "@/app/components/ProductCard";
import { ProductsListLayout } from "@/app/components/ProductsListLayout";

interface SearchedProductsListProps {
  products: any;
}

export const SearchedProductsList: React.FC<SearchedProductsListProps> = ({
  products,
}) => {
  return (
    <>
      {products.length ? (
        <ProductsListLayout customLayout="max-md:pt-2 max-sm:px-2 grid grid-cols-2 min-[540px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {products.map((product: any, i: number) => (
            <ProductCard
              key={i}
              dynamic={true}
              product={product}
              showDiscountLabel={false}
            />
          ))}
        </ProductsListLayout>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <h1 className="text-center font-heading text-xl font-semibold text-red-500">
            No Results Found
          </h1>
        </div>
      )}
    </>
  );
};
