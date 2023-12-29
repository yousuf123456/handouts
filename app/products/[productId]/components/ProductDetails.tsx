"use client";
import React, { useState } from "react";

import { Heading } from "@/app/(site)/components/Heading";
import { ProductInfo } from "@/app/types";
import { ProductSpec } from "./ProductSpec";

import clsx from "clsx";
import { Button } from "@/app/components/Button";

import sanitize from "xss";

interface ProductDetailsProps {
  product: ProductInfo;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const productAttributes = product.attributes as {
    [key: string]: any;
  };

  const [showingMore, setShowingMore] = useState(false);

  let productSpecifications: { [key: string]: any }[] = [];

  Object.keys(productAttributes || {}).map((attributeName) => {
    if (productAttributes[attributeName]) {
      productSpecifications.push({
        [attributeName]: productAttributes[attributeName],
      });
    }

    return;
  });

  const sanitizedDescription = sanitize(product.descriptionQuillData || "");

  const sanitizedHighlights = sanitize(product.highlightsQuillData || "");

  return (
    <div
      id="details"
      className={clsx(
        "relative flex flex-col gap-4 overflow-hidden pb-24 transition-all",
        !showingMore ? "max-h-[384px]" : "h-auto pb-16",
      )}
    >
      <Heading>Product Details</Heading>

      <Button
        variant="outline"
        onClick={() => setShowingMore((prev) => !prev)}
        className="absolute bottom-2 left-1/2 z-[39] w-40 flex-shrink-0 -translate-x-1/2 max-sm:text-xs sm:w-64"
      >
        {!showingMore ? "Show More" : "Show Less"}
      </Button>

      {!showingMore && (
        <div className="absolute bottom-12 left-0 h-12 w-full bg-gradient-to-t from-white to-transparent" />
      )}

      {!showingMore && (
        <div className="absolute bottom-0 left-0 h-12 w-full bg-white" />
      )}

      <div className="flex flex-col gap-6">
        {product.descriptionQuillData && (
          <div
            className="ml-5 hidden text-xs font-medium text-black sm:block sm:text-sm [&_ul]:list-disc"
            dangerouslySetInnerHTML={{
              __html: sanitizedDescription,
            }}
          ></div>
        )}

        {product.highlightsQuillData && (
          <div
            className="ml-5 text-xs font-medium text-black sm:hidden sm:text-sm [&_ul]:list-disc"
            dangerouslySetInnerHTML={{
              __html: sanitizedHighlights,
            }}
          ></div>
        )}

        {productSpecifications.length > 0 && (
          <div className="flex flex-col gap-4">
            <Heading>Product Specifications</Heading>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6">
              {productSpecifications.map((specification, i) => (
                <ProductSpec
                  key={i}
                  Key={Object.keys(specification)[0]}
                  value={Object.values(specification)[0]}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
