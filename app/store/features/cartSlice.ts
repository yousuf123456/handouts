import { CartItemType } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { find } from "lodash";

interface CartState {
  cartItems: CartItemType[];
  cartItemsCount: number;
  hasBeenFetched: boolean;
}

const initialState: CartState = {
  cartItems: [],
  cartItemsCount: 0,
  hasBeenFetched: false,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItemType[]>) => {
      state.cartItems = action.payload;
    },

    addCartItem: (state, action: PayloadAction<CartItemType>) => {
      const alreadyExistingCartItem = find(state.cartItems, {
        id: action.payload.id,
      });
      if (alreadyExistingCartItem) {
        const index = state.cartItems.indexOf(alreadyExistingCartItem);
        state.cartItems[index] = action.payload;
      } else {
        state.cartItems.push(action.payload);
      }
    },

    updateCartItem: (
      state,
      action: PayloadAction<{ cartItemId: string; quantity: number }>,
    ) => {
      state.cartItems = state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.cartItemId) {
          return { ...cartItem, quantity: action.payload.quantity };
        }

        return cartItem;
      });
    },

    deleteCartItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload,
      );
    },

    setCartItemsCount: (state, action: PayloadAction<number>) => {
      state.cartItemsCount = action.payload;
    },

    incrementCartItemsCount: (state, action: PayloadAction<number>) => {
      state.cartItemsCount += action.payload;
    },

    setHasBeenFetched: (state, action: PayloadAction<boolean>) => {
      state.hasBeenFetched = action.payload;
    },

    flushCart: (state) => {
      state.cartItems = [];
      state.cartItemsCount = 0;
    },
  },
});

export default CartSlice.reducer;
export const {
  setCartItems,
  addCartItem,
  setCartItemsCount,
  incrementCartItemsCount,
  setHasBeenFetched,
  updateCartItem,
  deleteCartItem,
  flushCart,
} = CartSlice.actions;
