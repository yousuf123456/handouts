"use client";

import { SpinnerLoader } from "@/app/components/SpinnerLoader";
import {
  setCartItems,
  setHasBeenFetched,
} from "@/app/store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import {
  CartItemProductType,
  CombinationsType,
  VoucherType,
} from "@/app/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { CheckoutItemsList } from "./CheckoutItemsList";
import { FreeShippingsType } from "../page";

interface CheckoutItemsProps {
  vouchers: VoucherType[];
  quantity: number | undefined;
  fromCart: boolean | undefined;
  freeShippings: FreeShippingsType;
  product: CartItemProductType[] | null;
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

export const CheckoutItems: React.FC<CheckoutItemsProps> = ({
  product,
  vouchers,
  quantity,
  fromCart,
  combination,
  freeShippings,
  appliedVouchers,
  setAppliedVouchers,
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
        <div className="px-0 py-0 sm:px-8 md:px-16 lg:px-32 xl:px-48">
          <CheckoutItemsList
            fromCart={fromCart}
            vouchers={vouchers}
            quantity={quantity}
            combination={combination}
            freeShippings={freeShippings}
            products={product || cartItems}
            appliedVouchers={appliedVouchers}
            setAppliedVouchers={setAppliedVouchers}
          />
        </div>
      )}
    </>
  );
};
