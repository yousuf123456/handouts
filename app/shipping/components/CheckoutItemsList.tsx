import {
  CartItemProductType,
  CartItemType,
  CombinationsType,
  VoucherType,
} from "@/app/types";
import { formatCartItems } from "@/app/utils/formatCartItems";
import React from "react";
import { CheckoutItemCard } from "./CheckoutItemCard";
import { FreeShippingsType } from "../page";

interface CheckoutItemsListProps {
  vouchers: VoucherType[];
  quantity: number | undefined;
  fromCart: boolean | undefined;
  freeShippings: FreeShippingsType;
  products: CartItemType[] | CartItemProductType[];
  combination: CombinationsType | null | undefined;
  appliedVouchers: {
    [key: string]: VoucherType;
  };
  setAppliedVouchers: React.Dispatch<
    React.SetStateAction<{
      [key: string]: VoucherType;
    }>
  >;
}

export const CheckoutItemsList: React.FC<CheckoutItemsListProps> = ({
  quantity,
  vouchers,
  products,
  fromCart,
  combination,
  freeShippings,
  appliedVouchers,
  setAppliedVouchers,
}) => {
  let productsToBeFormated;
  if (fromCart) productsToBeFormated = products;
  else
    productsToBeFormated = [
      {
        quantity: quantity,
        selectedCombination: combination,
        id: "any",
        userId: "any",
        productId: "any",
        product: products[0],
      },
    ];

  //@ts-ignore
  const formatedProducts = formatCartItems(productsToBeFormated);

  return (
    <div className="flex w-full flex-col gap-3">
      {formatedProducts.map((formatedProduct, i) => {
        const collectedVouchersFromThisStore = vouchers.filter(
          (voucher) => voucher.storeId === formatedProduct.storeId,
        );

        const appliedVoucher = appliedVouchers[formatedProduct.storeId];

        return (
          <CheckoutItemCard
            key={i}
            freeShippings={freeShippings}
            checkoutItem={formatedProduct}
            appliedVoucher={appliedVoucher}
            setAppliedVouchers={setAppliedVouchers}
            collectedVouchers={collectedVouchersFromThisStore}
          />
        );
      })}
    </div>
  );
};
