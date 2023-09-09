"use client";
import React, { useState } from "react";

import { Heading } from "@/app/(site)/components/Heading";
import { ProductInfo } from "@/app/types";
import { ProductSpec } from "./ProductSpec";

import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { Button } from "@/app/components/Button";

interface ProductDetailsProps {
  product: ProductInfo;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const productAttributes = product.attributes as {
    [key: string]: any;
  };

  const [showingMore, setShowingMore] = useState(false);

  return (
    <div
      id="details"
      className={clsx(
        "relative flex flex-col gap-4 overflow-hidden transition-all",
        !showingMore ? "h-96" : "h-auto pb-16",
      )}
    >
      <Heading>Product Details</Heading>

      <Link
        href="#details"
        className="absolute bottom-2 left-1/2 z-[39] -translate-x-1/2"
      >
        <Button
          onClick={() => setShowingMore((prev) => !prev)}
          variant="outline"
          className="absolute bottom-2 left-1/2 z-[39] w-64 flex-shrink-0 -translate-x-1/2"
        >
          {!showingMore ? "Show More" : "Show Less"}
        </Button>
      </Link>

      {!showingMore && (
        <div className="absolute bottom-12 left-0 h-12 w-full bg-gradient-to-t from-white to-transparent" />
      )}
      {!showingMore && (
        <div className="absolute bottom-0 left-0 h-12 w-full bg-white" />
      )}

      <div className="flex flex-col gap-6">
        <ul className="ml-6 list-disc">
          {product?.details.map((detail, i) => (
            <li key={i}>
              <p className="text-xs font-medium text-black sm:text-sm">
                {detail}
              </p>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-4">
          {product.detailedImages.map((img) => (
            <Image
              key={img}
              src={img || ""}
              width={1680}
              height={600}
              alt="Product Image"
              className="aspect-auto h-auto max-w-full object-cover"
            />
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <Heading>Product Specifications</Heading>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6">
            {Object.keys(productAttributes).map((Key: string, i) => (
              <ProductSpec key={i} Key={Key} value={productAttributes[Key]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
