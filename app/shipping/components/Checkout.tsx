"use client";
import { ReduxProvider } from "@/app/context/ReduxProvider";
import React, { useEffect, useState } from "react";
import { CheckoutBanner } from "./CheckoutBanner";
import { CheckoutItems } from "./CheckoutItems";
import {
  CartItemProductType,
  CombinationsType,
  VoucherType,
} from "@/app/types";
import { FreeShippingsType } from "../page";

interface CheckoutProps {
  fromCart: boolean;
  vouchers: VoucherType[];
  quantity: number | undefined;
  freeShippings: FreeShippingsType;
  product: CartItemProductType[] | null;
  combination: CombinationsType | null | undefined;
}

export const Checkout: React.FC<CheckoutProps> = ({
  product,
  vouchers,
  quantity,
  fromCart,
  combination,
  freeShippings,
}) => {
  const [appliedVouchers, setAppliedVouchers] = useState<{
    [key: string]: VoucherType;
  }>({});

  return (
    <div className="flex flex-col gap-0 overflow-x-hidden bg-slate-200 max-md:pb-16">
      <CheckoutBanner
        appliedVouchers={appliedVouchers}
        vouchers={vouchers}
        fromCart={fromCart}
        product={product}
      />

      <ReduxProvider>
        <CheckoutItems
          product={product}
          vouchers={vouchers}
          quantity={quantity}
          fromCart={fromCart}
          combination={combination}
          freeShippings={freeShippings}
          appliedVouchers={appliedVouchers}
          setAppliedVouchers={setAppliedVouchers}
        />
      </ReduxProvider>
    </div>
  );
};
