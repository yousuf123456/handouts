import React from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { RiWalletFill } from "react-icons/ri";

import { NavigationItem } from "@/app/components/NavigationItem";
import { HiCash } from "react-icons/hi";
import { Total_PlaceOrder } from "./Total_PlaceOrder";
import { ReduxProvider } from "@/app/context/ReduxProvider";
import { CartItemProductType } from "@/app/types";
import { AddressInfo } from "./AddressInfo";
import { BannerNavPanel } from "@/app/(site)/components/header/components/BannerNavPanel";

interface CheckoutBannerProps {
  fromCart: boolean | undefined;
  product: CartItemProductType[] | null;
}

export const CheckoutBanner = ({ fromCart, product }: CheckoutBannerProps) => {
  return (
    <div className="min-h-80 flex w-full flex-col items-center justify-between bg-slate-900 py-4">
      <BannerNavPanel heading="Checkout" />

      <div className="mt-3 flex items-center justify-center gap-0">
        <NavigationItem
          Icon={RiShoppingCart2Fill}
          className="bg-green-500"
          lineClassName="from-green-500 to-purple-600"
          label={`From ${fromCart ? "Cart" : "Shopping"}`}
        />
        <NavigationItem
          Icon={RiWalletFill}
          className="bg-purple-600"
          lineClassName="from-purple-600 to-rose-600"
          label="To Checkout"
          isSelected={true}
        />
        <NavigationItem
          Icon={HiCash}
          className="bg-rose-600"
          label="Next Payment"
          isLast={true}
        />
      </div>

      <div className="mb-3 mt-12 flex w-full items-center gap-0 px-2 max-lg:flex-col sm:px-16 md:items-start lg:mt-12 lg:gap-12 xl:gap-16 xl:px-24">
        <div className="relative flex-shrink-0 max-lg:order-2 max-sm:w-full md:-top-4 lg:top-0">
          <ReduxProvider>
            <AddressInfo />
          </ReduxProvider>
        </div>

        <ReduxProvider>
          <Total_PlaceOrder product={product} />
        </ReduxProvider>
      </div>
    </div>
  );
};
