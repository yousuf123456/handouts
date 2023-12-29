"use client";
import React from "react";
import Link from "next/link";

import { ProductCardType, fullCategoryDiscountedProductType } from "../types";
import { RatingStars } from "./RatingStars";

import { getPriceInfo } from "../utils/getPriceInfo";
import { ProductImage } from "./ProductImage";
import { FormattedCurrency } from "./FormattedCurrency";
import { cn } from "../utils/cn";
import clsx from "clsx";
import axios from "axios";

interface ProductCardProps {
  product: ProductCardType | fullCategoryDiscountedProductType;
  showDiscountLabel?: boolean;
  dynamic?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  dynamic,
  showDiscountLabel,
}) => {
  const { productOnSale, discountOff, discountOffLabel, currentPrice } =
    getPriceInfo(product as any);

  //@ts-ignore
  const productId = product?.id || product?._id?.$oid;
  //36 sm40 lg48

  const onClick = () => {
    const productData = {
      categoryTreeData: product.categoryTreeData,
      attributes: product.attributes,
      keywords: product.keywords,
      name: product.name,
    };

    axios.post("../../../api/browsingHistoryAdd", {
      productData: productData,
      productId: product.id,
    });

    axios.post("../api/productClick", {
      productId: productId,
      //@ts-ignore
      storeId: product.storeId,
      superTokensUserId: product.superTokensUserId,
    });
  };

  return (
    <div onClick={onClick}>
      <Link href={`/products/${productId}`}>
        <div
          className={cn(
            "group relative flex flex-col gap-2 overflow-hidden rounded-[2px] bg-white pb-2 transition-all sm:hover:shadow-cardHoverShadow",
            dynamic ? "w-full" : "w-[152px] sm:w-40 lg:w-48",
          )}
        >
          {productOnSale && showDiscountLabel && (
            <div className="absolute left-0 top-0 z-50 rounded-tl-sm bg-rose-500 px-2 py-1 transition-all">
              <p className="font-text text-xs font-extrabold tracking-wide text-white sm:text-sm">
                {discountOffLabel}
              </p>
            </div>
          )}
          <div
            className={clsx(
              "relative overflow-hidden",
              dynamic ? " aspect-1 h-auto w-auto" : "h-[152px] sm:h-40 lg:h-48",
            )}
          >
            <ProductImage src={product.image!} loading="lazy" />
          </div>

          <div className="flex flex-col gap-1 px-1 sm:px-2">
            <h2 className="line-clamp-2 h-8 w-full overflow-hidden font-text text-xs font-semibold tracking-wide">
              {product?.name?.slice(0, 50)}
            </h2>

            <div>
              <div className="flex items-center gap-1 sm:gap-2">
                <h2 className="font-text text-sm font-semibold tracking-wide text-blue-600 sm:text-base md:text-lg">
                  <FormattedCurrency quantity={currentPrice!} />
                </h2>
                {productOnSale && (
                  <p className="font-text text-[10px] font-semibold opacity-75 sm:text-xs">
                    <s>
                      <FormattedCurrency quantity={product.price} />
                    </s>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1">
                <RatingStars
                  defaultValue={product.avgRating}
                  iconSize="text-[14px] md:text-[16px]"
                />

                <p className="font-text text-[12px] font-semibold text-slate-500">
                  {(product.avgRating || 0) + "/5"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
