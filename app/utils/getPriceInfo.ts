import {
  CartItemProductType,
  Cart_FavouriteItemProductType,
  ProductInfo,
} from "../types";

export const getPriceInfo = (
  product:
    | ProductInfo
    | Cart_FavouriteItemProductType
    | CartItemProductType
    | undefined,
) => {
  const isPromoPriceExpired = () => {
    if (!product?.promoPriceEndingDate || !product.promoPriceStartingDate)
      return true;

    const currentDate = new Date();

    if (
      currentDate < product.promoPriceStartingDate ||
      currentDate > product.promoPriceEndingDate
    )
      return true;

    return false;
  };

  const onDiscount = !!product?.promoPrice && !isPromoPriceExpired();

  const currentPrice = () => {
    if (
      !product?.promoPrice ||
      !product.promoPriceEndingDate ||
      !product.promoPriceStartingDate
    )
      return product?.price;

    if (isPromoPriceExpired()) return product.price;

    return product.promoPrice;
  };

  const priceOff = (product?.price || 0) - (product?.promoPrice || 0);

  const priceOffLabel = priceOff + " Rs Off";

  return {
    discountOffLabel: priceOffLabel,
    currentPrice: currentPrice(),
    productOnSale: onDiscount,
    discountOff: priceOff,
  };
};
