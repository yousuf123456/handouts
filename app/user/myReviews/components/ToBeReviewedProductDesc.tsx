import { ProductImage } from "@/app/components/ProductImage";
import { OrderedProductType } from "@/app/types";
import React from "react";

interface ToBeReviewedProductDescProps {
  toBeReviewedProduct: OrderedProductType;
}

export const ToBeReviewedProductDesc: React.FC<
  ToBeReviewedProductDescProps
> = ({ toBeReviewedProduct }) => {
  return (
    <div className="flex h-full w-full items-start gap-4">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm sm:h-[72px] sm:w-[72px] lg:h-20 lg:w-20">
        <ProductImage src={toBeReviewedProduct.product.image || ""} />
      </div>

      <h3 className="font-text text-xs font-medium text-slate-800 min-[480px]:text-sm lg:text-base">
        {toBeReviewedProduct.product.name}
      </h3>
    </div>
  );
};
