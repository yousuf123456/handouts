import React from "react";
import { NavigationItem } from "../../components/NavigationItem";

import { RiShoppingCart2Fill } from "react-icons/ri";
import { RiStore3Fill } from "react-icons/ri";
import { RiWalletFill } from "react-icons/ri";
import { Total_Checkout } from "./Total_Checkout";
import { ReduxProvider } from "@/app/context/ReduxProvider";
import { BannerNavPanel } from "@/app/(site)/components/header/components/BannerNavPanel";

export const CartBanner = () => {
  return (
    <div className="flex h-40 w-full flex-col justify-center gap-8 bg-slate-900 sm:h-40 sm:gap-12 sm:px-[8%] md:h-72 lg:px-[15%]">
      <BannerNavPanel heading="Cart" />

      <div className="relative mb-6 flex w-full items-center justify-center gap-0 sm:mb-4 md:mt-4">
        <NavigationItem
          Icon={RiStore3Fill}
          className="bg-yellow-500"
          lineClassName="from-yellow-500 to-green-500"
          label="From Shop"
        />
        <NavigationItem
          Icon={RiShoppingCart2Fill}
          className="bg-green-500"
          lineClassName="from-green-500 to-purple-500"
          label="To Cart"
          isSelected={true}
        />
        <NavigationItem
          Icon={RiWalletFill}
          className="bg-purple-600"
          label="Next Checkout"
          isLast={true}
        />
      </div>

      <ReduxProvider>
        <Total_Checkout />
      </ReduxProvider>
    </div>
  );
};
