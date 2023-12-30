"use client";
import React, { useEffect, useState } from "react";

import {
  setCartItems,
  setHasBeenFetched,
} from "@/app/store/features/cartSlice";

import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { CartItemsList } from "./CartItemsList";
import { SpinnerLoader } from "@/app/components/SpinnerLoader";
import { useSession } from "next-auth/react";
import axios from "axios";
import { EmptyStatus } from "@/app/components/EmptyStatus";

export const CartItems = () => {
  const [isLoading, setIsLoading] = useState(false);
  const hasBeenFetched = useAppSelector((state) => state.cart.hasBeenFetched);
  const dispatch = useAppDispatch();

  const session = useSession();

  useEffect(() => {
    if (!hasBeenFetched) {
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
  }, [hasBeenFetched]);

  const cartItems = useAppSelector((state) => state.cart.cartItems);

  if (!isLoading && session.status !== "loading" && cartItems.length === 0) {
    return <EmptyStatus label="Your cart is empty!" />;
  }

  return (
    <>
      {isLoading || session.status === "loading" ? (
        <SpinnerLoader />
      ) : (
        <div className="w-full px-4 py-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
          <div className="flex w-full flex-col gap-2 sm:gap-6">
            <h2 className="font-text text-base font-semibold text-themeSecondary sm:text-xl">
              Cart Items{" "}
              <span className="text-themeBlue">
                {"(" + cartItems.length + ")"}
              </span>
            </h2>

            <div className="flex w-full">
              <CartItemsList cartItems={cartItems} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
