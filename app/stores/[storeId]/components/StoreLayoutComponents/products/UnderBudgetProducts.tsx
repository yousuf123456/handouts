import React from "react";
import prisma from "@/app/libs/prismadb";
import { ProductCard } from "@/app/components/ProductCard";
import { Module } from "../Module";

export const getProducts = async (params: {
  productsSelection: "automatic" | "manual" | "filter";
  noOfProductsToShow?: number;
  underThisBudget?: number;
  productIds?: string[];
  storeId: string;
}) => {
  const {
    productsSelection,
    storeId,
    productIds,
    underThisBudget,
    noOfProductsToShow,
  } = params;

  if (
    productsSelection === "automatic" ||
    (productsSelection === "filter" && productIds?.length === 0)
  ) {
    const products = await prisma.product.findMany({
      where: {
        storeId,
        ...(underThisBudget && {
          price: {
            lte: underThisBudget,
          },
        }),
      },
      take: noOfProductsToShow || 10,
      select: {
        id: true,
        name: true,
        image: true,
        price: true,
        storeId: true,

        keywords: true,
        avgRating: true,
        attributes: true,

        ratingsCount: true,
        categoryTreeData: true,
        superTokensUserId: true,
      },
    });

    return products;
  }

  const products = await prisma.product.findMany({
    where: {
      storeId: storeId,
      id: {
        in: productIds,
      },
    },
    select: {
      id: true,
      name: true,
      image: true,
      price: true,
      storeId: true,

      keywords: true,
      avgRating: true,
      attributes: true,

      ratingsCount: true,
      categoryTreeData: true,
      superTokensUserId: true,
    },
  });

  return products;
};

interface UnderBudgetProductsProps {
  data: {
    productsSelection: "automatic" | "manual" | "filter";
    noOfProductsToShow?: number;
    hideModuleHeading?: string;
    moduleHeading?: string;
    products?: string[];
    budget: number;
  };
  storeId: string;
}

export default async function UnderBudgetProducts({
  data,
  storeId,
}: UnderBudgetProductsProps) {
  if (
    (data.productsSelection === "manual" ||
      data.productsSelection === "filter") &&
    data.products?.length === 0
  )
    return;

  const products = await getProducts({
    noOfProductsToShow: data.noOfProductsToShow,
    productsSelection: data.productsSelection,
    underThisBudget: data.budget,
    productIds: data.products,
    storeId,
  });

  if (products.length === 0) return;

  return (
    <Module hideModuleHeading>
      <h2 className="font-text text-base font-semibold text-themeSecondary md:text-lg">
        Under{" "}
        <span className="mx-2 rounded-sm bg-themeBlue px-3 py-0.5 font-roboto font-medium text-white">
          5000 Rs
        </span>{" "}
        Products
      </h2>

      <div className="flex gap-3 overflow-x-auto scrollbar-none">
        {products.map((product, i) => (
          <ProductCard key={i} product={product as any} />
        ))}
      </div>
    </Module>
  );
}
