import { FreeShippingsType } from "../shipping/page";
import { CartItemProductType, CombinationsType, VoucherType } from "../types";
import { formatCartItems } from "./formatCartItems";

import { getPriceInfo } from "./getPriceInfo";
import { Prisma } from "@prisma/client";

type ItemsType = {
  id?: string;
  userId?: string;
  quantity: number;
  productId?: string;
  product: CartItemProductType;
  selectedCombination: CombinationsType | null | Prisma.JsonValue;
}[];

interface Params {
  items: ItemsType;
  appliedVoucher?: VoucherType;
  freeShippings?: FreeShippingsType;
  appliedVouchers?: { [key: string]: VoucherType };
}

export function getTotal(params: Params) {
  const { items, appliedVoucher, appliedVouchers, freeShippings } = params;

  let subTotal = 0;
  let productsAmmount = 0;

  const formatedItems = formatCartItems(items as any);
  const freeShippingAvailableStores: { [key: string]: boolean } = {};

  formatedItems.map((item) => {
    item.cartItems.forEach((cartItem) => {
      const selectedCombination =
        cartItem.selectedCombination as CombinationsType;

      const { currentPrice } = getPriceInfo(
        (selectedCombination as any) || cartItem.product,
      );

      productsAmmount += cartItem.quantity;

      let productPrice = 0;

      productPrice = currentPrice! * cartItem.quantity;

      if (appliedVouchers) {
        const voucher = appliedVouchers[cartItem.product.storeId];

        if (voucher) {
          if (voucher.discountType === "Money Value")
            productPrice = productPrice - voucher.discountOffValue;
          else {
            const percentageToKeep = (100 - voucher.discountOffValue) / 100;
            productPrice = productPrice * percentageToKeep;
          }

          subTotal += productPrice;
        } else subTotal += productPrice;
      } else subTotal += productPrice;
    });

    if (!freeShippings) return;

    const freeShippingsOfThisStoreBuckets = freeShippings.filter(
      (freeShippingFromStore) =>
        freeShippingFromStore.storeId.$oid === item.storeId,
    );

    const freeShippingPromosOfThisStore = freeShippingsOfThisStoreBuckets
      .flatMap((freeShippingsOfThisStoreBucket) =>
        freeShippingsOfThisStoreBucket.freeShipping.map(
          (freeShippingPromo) => freeShippingPromo,
        ),
      )
      .flat();

    if (freeShippingPromosOfThisStore.length > 0) {
      freeShippingPromosOfThisStore.map((freeShippingPromo) => {
        if (
          freeShippingPromo.applicableOn === "Entire Store" &&
          freeShippingPromo.condition === "No Condition"
        )
          return (freeShippingAvailableStores[item.storeId] = true);

        if (
          freeShippingPromo.applicableOn === "Entire Store" &&
          freeShippingPromo.condition === "Min Order Value"
        ) {
          let freeShippingProductsTotal = 0;

          items.map((cartItem) => {
            const selectedCombination =
              cartItem.selectedCombination as CombinationsType;

            const { currentPrice } = getPriceInfo(
              (selectedCombination as any) || cartItem.product,
            );

            freeShippingProductsTotal += currentPrice!;
          });

          if (freeShippingProductsTotal >= freeShippingPromo.minOrderValue)
            return (freeShippingAvailableStores[item.storeId] = true);
        }

        if (
          freeShippingPromo.applicableOn === "Specific Products" &&
          freeShippingPromo.condition === "No Condition"
        )
          return (freeShippingAvailableStores[item.storeId] = true);

        if (
          freeShippingPromo.applicableOn === "Specific Products" &&
          freeShippingPromo.condition === "Min Order Value"
        ) {
          const freeShippingCartItems = item.cartItems.filter((cartItem) =>
            freeShippingPromo.productIds.includes(cartItem.product.id),
          );

          let freeShippingProductsTotal = 0;

          freeShippingCartItems.map((cartItem) => {
            const selectedCombination =
              cartItem.selectedCombination as CombinationsType;

            const { currentPrice } = getPriceInfo(
              (selectedCombination as any) || cartItem.product,
            );

            freeShippingProductsTotal += currentPrice!;
          });

          if (freeShippingProductsTotal >= freeShippingPromo.minOrderValue)
            return (freeShippingAvailableStores[item.storeId] = true);
        }
      });
    }
  });

  subTotal = Math.round(subTotal);

  if (appliedVoucher) {
    if (appliedVoucher.discountType === "Money Value")
      subTotal = subTotal - appliedVoucher.discountOffValue;
    else {
      const percentageToKeep = (100 - appliedVoucher.discountOffValue) / 100;
      subTotal = subTotal * percentageToKeep;
    }
  }

  return {
    subTotal: subTotal,
    freeShippingAvailableStores,
    productsAmmount: productsAmmount,
  };
}
