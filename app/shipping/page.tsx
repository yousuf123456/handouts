import React from "react";
import { getProductBeingShipped } from "../actions/getProductBeingShipped";
import { CheckoutBanner } from "./components/CheckoutBanner";
import { CheckoutItems } from "./components/CheckoutItems";
import { ReduxProvider } from "../context/ReduxProvider";
import { CombinationsType } from "../types";
import { json } from "stream/consumers";
import { getCurrentUser } from "../actions/getCurrentUser";

interface IParams {
  fromCart: string | undefined;
  productId: string | undefined;
  quantity: string | undefined;
  combination: string | undefined;
}

export default async function ShippingPage({
  searchParams,
}: {
  searchParams: IParams;
}) {
  const pendingShippedProduct = await getProductBeingShipped(
    searchParams.fromCart === "true",
    searchParams.productId,
  );

  return (
    <div className="flex flex-col gap-0 overflow-x-hidden bg-slate-200 max-md:pb-16">
      <CheckoutBanner
        fromCart={searchParams.fromCart === "true"}
        product={pendingShippedProduct}
      />

      <ReduxProvider>
        <CheckoutItems
          fromCart={searchParams.fromCart === "true"}
          product={pendingShippedProduct}
          quantity={
            searchParams.quantity ? parseInt(searchParams?.quantity) : undefined
          }
          combination={
            searchParams.combination && searchParams.combination !== "undefined"
              ? searchParams.combination === "null"
                ? null
                : JSON.parse(searchParams.combination)
              : undefined
          }
        />
      </ReduxProvider>
    </div>
  );
}
