import { Prisma } from "@prisma/client";
import { CartItemProductType, CombinationsType } from "../types";
import { getPriceInfo } from "./getPriceInfo";

type ItemType = {
  id?: string;
  userId?: string;
  productId?: string;
  quantity: number;
  selectedCombination: CombinationsType | null | Prisma.JsonValue;
  product: CartItemProductType;
};

export const getProductPrice = (product: ItemType) => {
  const selectedCombination = product?.selectedCombination as CombinationsType;
  const { productOnSale, discountOff, currentPrice } = getPriceInfo(
    product.product,
  );

  if (selectedCombination) {
    const price = (currentPrice || 0) * product.quantity;
    return price;
  } else {
    const price = (currentPrice || 0) * product.quantity;
    return price;
  }
};
