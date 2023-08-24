"use client";

import { SpinnerLoader } from "@/app/components/SpinnerLoader";
import {
  setCartItems,
  setHasBeenFetched,
} from "@/app/store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { CartItemProductType, CombinationsType } from "@/app/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { CheckoutItemsList } from "./CheckoutItemsList";

interface CheckoutItemsProps {
  fromCart: boolean | undefined;
  product: CartItemProductType[] | null;
  quantity: number | undefined;
  combination: CombinationsType | null | undefined;
}

export const CheckoutItems: React.FC<CheckoutItemsProps> = ({
  fromCart,
  product,
  quantity,
  combination,
}) => {
  const dispatch = useAppDispatch();
  const hasBeenFetched = useAppSelector((state) => state.cart.hasBeenFetched);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!hasBeenFetched && fromCart) {
      setIsLoading(true);
      axios
        .post("../../api/getCart")
        .then((res) => {
          dispatch(setCartItems(res.data.cartItems));
          dispatch(setHasBeenFetched(true));
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => setIsLoading(false));
    }
  }, [hasBeenFetched, fromCart]);

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const session = useSession();

  return (
    <>
      {isLoading || session.status === "loading" ? (
        <SpinnerLoader />
      ) : (
        <div className="px-3 py-3 sm:px-8 md:px-16 lg:px-32 xl:px-48">
          <CheckoutItemsList
            products={product || cartItems}
            fromCart={fromCart}
            quantity={quantity}
            combination={combination}
          />
        </div>
      )}
    </>
  );
};
