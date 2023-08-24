import { ProductImage } from "@/app/components/ProductImage";
import { ProductPrice } from "@/app/components/ProductPrice";
import { CartItemProductType, CombinationsType } from "@/app/types";
import { getPriceInfo } from "@/app/utils/getPriceInfo";
import React from "react";

interface CheckoutItemProductCardProps {
  product: CartItemProductType;
  quantity: number;
  selectedCombination: CombinationsType | null;
}

export const CheckoutItemProductCard: React.FC<
  CheckoutItemProductCardProps
> = ({ product, quantity, selectedCombination }) => {
  const { productOnSale, discountOff, isPercentOff, discountOffLabel } =
    getPriceInfo(product);

  return (
    <div className="flex w-full justify-between">
      <div className="flex w-full gap-4">
        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-[2px]">
          <ProductImage src={product.image} />
        </div>

        <div className="flex w-full flex-col gap-1">
          <h3 className="line-clamp-3 font-text text-xs font-medium sm:text-sm">
            {product.name}
          </h3>

          <div className="flex w-full items-start justify-between">
            <div className="sm:hidden">
              <ProductPrice
                productOnSale={productOnSale}
                discountOff={discountOff}
                isPercentOff={isPercentOff}
                discountOffLabel={discountOffLabel}
                price={product.price}
                className="text-sm font-semibold text-themeSecondary"
                discountLabelsClassName="text-xs"
              />
            </div>
            <p className="font-text text-xs">{"Qty:" + quantity}</p>
          </div>
        </div>
      </div>

      <div className="hidden flex-shrink-0 sm:block">
        <ProductPrice
          productOnSale={productOnSale}
          discountOff={discountOff}
          isPercentOff={isPercentOff}
          discountOffLabel={discountOffLabel}
          price={product.price}
          className="mb-1 text-sm font-semibold text-themeSecondary"
          discountLabelsClassName="text-xs"
          mode="flex-col"
        />
      </div>
    </div>
  );
};
