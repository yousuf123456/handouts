import React from "react";

import { OrderedProductType } from "@/app/types";
import { OrderRequest_OrderedProductCard } from "../../orders/components/OrderRequest_OrderedProductCard";
import { PurchasedTimeline } from "./PurchasedTimeline";
import { ReviewCta } from "./ReviewCta";
import { ProductImage } from "@/app/components/ProductImage";
import { ToBeReviewedProductDesc } from "./ToBeReviewedProductDesc";
import { ReviewCardHeader } from "./ReviewCardHeader";

type ProductInfo = {};

interface ToBeReviewedProductCardProps {
  toBeReviewedProduct: OrderedProductType;
  purchasedAt: Date;
}

export const ToBeReviewedProductCard: React.FC<
  ToBeReviewedProductCardProps
> = ({ toBeReviewedProduct, purchasedAt }) => {
  return (
    <div className="w-full border-b-2 border-slate-300 px-0 py-3 lg:pr-8 min-[1120px]:pr-20 xl:pr-36">
      <div className="flex w-full flex-col gap-4 sm:gap-5">
        <ReviewCardHeader
          storeName={toBeReviewedProduct.product.storeName}
          purchasedAt={purchasedAt}
        />

        <div className="flex w-full gap-4 max-md:items-center max-[560px]:items-start">
          <ToBeReviewedProductDesc toBeReviewedProduct={toBeReviewedProduct} />

          <div className="ml-4 hidden w-[2px] bg-slate-300 md:block" />

          <ReviewCta
            storeName={toBeReviewedProduct.product.storeName}
            productId={toBeReviewedProduct.product.id}
            orderedProductId={toBeReviewedProduct.id}
            isHistory={false}
          />
        </div>
      </div>
    </div>
  );
};
