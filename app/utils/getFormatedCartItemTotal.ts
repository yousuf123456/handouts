import { CartItemType, CombinationsType, FormatedCartItemType } from "../types";
import { getPriceInfo } from "./getPriceInfo";

export const getFormatedCartItemTotal = (
  formatedCartItemType: FormatedCartItemType,
) => {
  let total = 0;

  formatedCartItemType.cartItems.forEach((cartItem) => {
    const selectedCombination =
      cartItem.selectedCombination as CombinationsType;

    const { currentPrice } = getPriceInfo(cartItem.product);

    if (selectedCombination) {
      const price = (currentPrice || 0) * cartItem.quantity;
      total += price;
    } else {
      const price = (currentPrice || 0) * cartItem.quantity;
      total += price;
    }
  });

  return Math.round(total);
};
