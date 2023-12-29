import { CartItemType, OrderedProductType } from "../types";
// outdated function
export const convertToCartItems = (
  orderedProducts: OrderedProductType[],
): CartItemType[] => {
  const convertedCartItems = orderedProducts.map((orderedProduct) => {
    const convertedCartItem = {
      id: "random",
      quantity: orderedProduct.quantity,
      selectedCombination: orderedProduct.selectedCombination,
      userId: "random",
      productId: orderedProduct.id,
      product: {
        id: orderedProduct.id,
        name: orderedProduct.product.name,
        image: orderedProduct.product.image,
        storeName: orderedProduct.product.storeName,
        storeId: orderedProduct.product.storeId,
        price: orderedProduct.priceAtOrderTime,
        category: orderedProduct.product.category,
        superTokensUserId: orderedProduct.superTokensUserId,
        discount: null,
      },
    };

    return convertedCartItem;
  });

  return convertedCartItems as any;
};
