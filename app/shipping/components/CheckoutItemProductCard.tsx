import { ProductImage } from "@/app/components/ProductImage";
import { ProductPrice } from "@/app/components/ProductPrice";
import { CartItemProductType, CombinationsType } from "@/app/types";
import { getPriceInfo } from "@/app/utils/getPriceInfo";
import React from "react";
import { VoucherAppliedPreview } from "./VoucherAppliedPreview";

interface CheckoutItemProductCardProps {
  quantity: number;
  product: CartItemProductType;
  showVoucherPreview?: boolean;
  appliedVoucherPrevInfo?:
    | undefined
    | {
        discountType: string;
        discountPrice: number;
      };
  selectedCombination: CombinationsType | null;
}

export const CheckoutItemProductCard: React.FC<
  CheckoutItemProductCardProps
> = ({
  product,
  quantity,
  selectedCombination,
  showVoucherPreview,
  appliedVoucherPrevInfo,
}) => {
  const { productOnSale, discountOff, currentPrice, discountOffLabel } =
    getPriceInfo((selectedCombination as any) || product);

  return (
    <div className="flex w-full justify-between">
      <div className="flex w-full gap-4">
        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-[2px]">
          <ProductImage src={product.image} />
        </div>

        <div className="flex w-full flex-col gap-1">
          <h3 className="line-clamp-3 font-roboto text-sm font-medium">
            {product.name}
          </h3>

          <div className="flex w-full items-start justify-between">
            <div className="flex items-center gap-3 sm:hidden">
              <ProductPrice
                mode="flex-col"
                price={product.price}
                discountOff={discountOff}
                currentprice={currentPrice!}
                productOnSale={productOnSale}
                discountLabelsClassName="text-xs"
                discountOffLabel={discountOffLabel}
                className="mb-1 text-sm font-medium text-black sm:text-sm lg:text-sm"
              />

              {showVoucherPreview && appliedVoucherPrevInfo && (
                <VoucherAppliedPreview
                  withCheck
                  discountType={appliedVoucherPrevInfo.discountType}
                  discountPrice={appliedVoucherPrevInfo.discountPrice}
                />
              )}
            </div>
            <p className="font-roboto text-xs">{"Qty:" + quantity}</p>
          </div>
        </div>
      </div>

      <div className="hidden flex-shrink-0 sm:block">
        <div className="flex items-end gap-4">
          {showVoucherPreview && appliedVoucherPrevInfo && (
            <VoucherAppliedPreview
              withCheck
              discountType={appliedVoucherPrevInfo.discountType}
              discountPrice={appliedVoucherPrevInfo.discountPrice}
            />
          )}

          <ProductPrice
            productOnSale={productOnSale}
            discountOff={discountOff}
            currentprice={currentPrice!}
            discountOffLabel={discountOffLabel}
            price={product.price}
            className="mb-1 text-sm text-themeSecondary sm:text-sm lg:text-sm"
            discountLabelsClassName="text-xs sm:text-xs"
            mode="flex-col"
          />
        </div>
      </div>
    </div>
  );
};
