import {
  CartItemType,
  CartItemProductType,
  FormatedCartItemType,
  CombinationsType,
} from "../types";

//Formats the cart items for the checkout page
type storeObjecType = {
  storeId: string;
  storeName: string;
  cartItems: {
    quantity: number;
    selectedCombination: CombinationsType;
    product: CartItemProductType;
  }[];
};

const createStoreObject = (storeName: string, storeId: string) => {
  const storeObject: storeObjecType = {
    storeId: storeId,
    storeName: storeName,
    cartItems: [],
  };

  return storeObject;
};

export const formatCartItems = (cartItems: CartItemType[]) => {
  let formatedCartItems: FormatedCartItemType[] = [];
  let createdStoreInfo: { i: number; name: string }[] = [];

  cartItems.forEach((cartItem) => {
    const storeName = cartItem.product.storeName;
    const storeId = cartItem.product.storeId;
    const alreadyCreatedStoreObject = createdStoreInfo.filter(
      (info) => info.name === storeName,
    );
    const storeObjectisAlreadyCreated = alreadyCreatedStoreObject.length > 0;

    if (storeObjectisAlreadyCreated) {
      const createdStore = formatedCartItems[alreadyCreatedStoreObject[0].i];
      const newFormatedCartItem = {
        quantity: cartItem.quantity,
        selectedCombination:
          cartItem.selectedCombination as unknown as CombinationsType,
        product: cartItem.product,
      };
      createdStore.cartItems.push(newFormatedCartItem);
    } else {
      const storeObject: FormatedCartItemType = createStoreObject(
        storeName,
        storeId,
      );
      const newFormatedCartItem = {
        quantity: cartItem.quantity,
        selectedCombination:
          cartItem.selectedCombination as unknown as CombinationsType,
        product: cartItem.product,
      };
      storeObject.cartItems.push(newFormatedCartItem);
      formatedCartItems.push(storeObject);
      createdStoreInfo.push({
        name: storeName,
        i: formatedCartItems.length - 1,
      });
    }
  });

  return formatedCartItems;
};
